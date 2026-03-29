#!/usr/bin/env node

/**
 * Build image manifest from data/images.json.
 *
 * Optional upload mode:
 * - Set IMAGE_UPLOAD_PROVIDER=cloudinary
 * - Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET
 *
 * Usage:
 * node javascript/build-images.js
 * node javascript/build-images.js --validate-only
 * node javascript/build-images.js --fail-on-warning
 */

const fs = require("node:fs/promises");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT, "data", "images.json");
const OUTPUT_FILE = path.join(ROOT, "data", "images.manifest.json");
const HTML_FILE = path.join(ROOT, "index.html");

const parseArgs = (argv) => {
  const args = new Set(argv.slice(2));
  return {
    validateOnly: args.has("--validate-only"),
    failOnWarning:
      args.has("--fail-on-warning") ||
      process.env.BUILD_FAIL_ON_WARNING === "1",
  };
};

const options = parseArgs(process.argv);

const provider = process.env.IMAGE_UPLOAD_PROVIDER || "none";
const concurrency = Number(process.env.IMAGE_BUILD_CONCURRENCY || 8);

const requiredKeys = ["id", "source", "alt", "target"];

const isHttpUrl = (value) => /^https?:\/\//i.test(value);
const isLocalPath = (value) => typeof value === "string" && !isHttpUrl(value);

const warnings = [];

const warn = (message) => {
  warnings.push(message);
  console.warn(`WARNING: ${message}`);
};

const toPublicId = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

const normalizeSourcePath = (source) => source.replace(/\\/g, "/");

const toPublicPath = (source) => {
  const normalized = normalizeSourcePath(source)
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return normalized;
};

const mapLimit = async (items, limit, mapper) => {
  const safeLimit = Number.isFinite(limit) && limit > 0 ? Math.floor(limit) : 1;
  const results = new Array(items.length);
  let cursor = 0;

  const worker = async () => {
    while (cursor < items.length) {
      const idx = cursor;
      cursor += 1;
      results[idx] = await mapper(items[idx], idx);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(safeLimit, items.length) }, () => worker()),
  );

  return results;
};

const uploadToCloudinary = async (sourcePath, publicId) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary upload requires CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET.",
    );
  }

  const absolutePath = path.isAbsolute(sourcePath)
    ? sourcePath
    : path.join(ROOT, sourcePath);

  const fileBuffer = await fs.readFile(absolutePath);
  const blob = new Blob([fileBuffer]);

  const form = new FormData();
  form.append("file", blob, path.basename(sourcePath));
  form.append("upload_preset", uploadPreset);
  form.append("public_id", publicId);
  form.append("folder", "forher");

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, { method: "POST", body: form });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Cloudinary upload failed (${response.status}): ${body}`);
  }

  const payload = await response.json();
  return payload.secure_url;
};

const assertLocalFileExists = async (source, imageRef) => {
  const absolutePath = path.isAbsolute(source)
    ? source
    : path.join(ROOT, source);
  try {
    await fs.access(absolutePath);
  } catch {
    throw new Error(`Missing local image file '${source}' for ${imageRef}.`);
  }
};

const validateImage = (item, collectionName, idx) => {
  requiredKeys.forEach((key) => {
    if (!item[key] || typeof item[key] !== "string") {
      throw new Error(
        `Invalid image at collections.${collectionName}[${idx}].${key}: expected non-empty string.`,
      );
    }
  });

  if (!item.target.startsWith(".") && !item.target.startsWith("#")) {
    throw new Error(
      `Invalid image target at collections.${collectionName}[${idx}].target: use a CSS selector starting with '.' or '#'.`,
    );
  }

  if (
    Object.prototype.hasOwnProperty.call(item, "runtimeOnly") &&
    typeof item.runtimeOnly !== "boolean"
  ) {
    throw new Error(
      `Invalid image at collections.${collectionName}[${idx}].runtimeOnly: expected boolean when provided.`,
    );
  }
};

const resolveOutputUrl = async (item, imageRef) => {
  if (isHttpUrl(item.source)) {
    return item.source;
  }

  if (provider === "cloudinary") {
    return uploadToCloudinary(item.source, toPublicId(item.id));
  }

  if (provider === "none") {
    await assertLocalFileExists(item.source, imageRef);
    return toPublicPath(item.source);
  }

  throw new Error(
    `Image '${item.id}' uses local source '${item.source}' but IMAGE_UPLOAD_PROVIDER is not configured.`,
  );
};

const extractImageSourcesFromHtml = (html) => {
  const sourceList = [];
  const imageTagRegex = /<img\b[^>]*\bsrc\s*=\s*"([^"]+)"/gi;

  let match = imageTagRegex.exec(html);
  while (match) {
    sourceList.push(match[1]);
    match = imageTagRegex.exec(html);
  }

  return sourceList;
};

const validateCoverageAgainstHtml = async (flatImages) => {
  const html = await fs.readFile(HTML_FILE, "utf8");
  const htmlSources = extractImageSourcesFromHtml(html);
  const jsonSources = new Set(
    flatImages.map((image) => {
      if (isHttpUrl(image.source)) return image.source;
      return toPublicPath(image.source);
    }),
  );

  const missingInJson = htmlSources.filter(
    (source) => !jsonSources.has(source),
  );

  const htmlSourceSet = new Set(htmlSources);
  const unusedInHtml = flatImages.filter((image) => {
    if (image.runtimeOnly === true) return false;
    if (isHttpUrl(image.source)) {
      return !htmlSourceSet.has(image.source);
    }
    return !htmlSourceSet.has(toPublicPath(image.source));
  });

  if (missingInJson.length) {
    warn(
      `Found ${missingInJson.length} <img> source(s) in index.html that are not represented in data/images.json.`,
    );
    missingInJson.forEach((src) => warn(`Unmapped HTML source: ${src}`));
  }

  if (unusedInHtml.length) {
    warn(
      `Found ${unusedInHtml.length} image entry(ies) in data/images.json that are not used in inline HTML src values (may be intentional for rotators).`,
    );
  }
};

const main = async () => {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  const config = JSON.parse(raw);

  const collections = config.collections || {};
  const collectionEntries = Object.entries(collections);

  if (!collectionEntries.length) {
    throw new Error("No collections found in data/images.json.");
  }

  const flatImages = [];
  const ids = new Set();
  const duplicatedIds = [];

  for (const [collectionName, images] of collectionEntries) {
    if (!Array.isArray(images)) {
      throw new Error(`collections.${collectionName} must be an array.`);
    }

    images.forEach((item, idx) => {
      validateImage(item, collectionName, idx);

      const imageRef = `collections.${collectionName}[${idx}]`;

      if (ids.has(item.id)) {
        duplicatedIds.push(item.id);
      } else {
        ids.add(item.id);
      }

      flatImages.push({
        ...item,
        collectionName,
        idx,
        imageRef,
        runtimeOnly: item.runtimeOnly === true,
      });
    });
  }

  if (duplicatedIds.length) {
    throw new Error(
      `Duplicate image id(s) found: ${Array.from(new Set(duplicatedIds)).join(", ")}`,
    );
  }

  const simpleSelectorTokens = flatImages
    .map((image) => image.target)
    .filter((selector) => selector.startsWith(".") || selector.startsWith("#"))
    .map((selector) => selector.split(/[\s>:+~]/)[0])
    .filter(Boolean);

  const html = await fs.readFile(HTML_FILE, "utf8");
  simpleSelectorTokens.forEach((token) => {
    if (token.startsWith(".") && !html.includes(`class="${token.slice(1)}`)) {
      const className = token.slice(1);
      if (!new RegExp(`class=\"[^\"]*\\b${className}\\b`).test(html)) {
        warn(
          `Target selector token '${token}' was not found in index.html class attributes.`,
        );
      }
    }
    if (token.startsWith("#") && !html.includes(`id="${token.slice(1)}"`)) {
      warn(`Target selector token '${token}' was not found in index.html ids.`);
    }
  });

  await validateCoverageAgainstHtml(flatImages);

  const manifest = {
    generatedAt: new Date().toISOString(),
    provider,
    stats: {
      totalCollections: collectionEntries.length,
      totalImages: flatImages.length,
    },
    collections: {},
    byId: {},
  };

  const resolvedFlatImages = await mapLimit(
    flatImages,
    concurrency,
    async (image) => {
      const url = await resolveOutputUrl(image, image.imageRef);
      return {
        id: image.id,
        alt: image.alt,
        target: image.target,
        placement: image.placement || "",
        url,
        collection: image.collectionName,
        source: image.source,
      };
    },
  );

  resolvedFlatImages.forEach((image) => {
    if (!manifest.collections[image.collection]) {
      manifest.collections[image.collection] = [];
    }

    const payload = {
      id: image.id,
      alt: image.alt,
      target: image.target,
      placement: image.placement,
      url: image.url,
    };

    manifest.collections[image.collection].push(payload);
    manifest.byId[image.id] = payload;
  });

  Object.keys(manifest.collections).forEach((collectionName) => {
    manifest.collections[collectionName].sort((a, b) =>
      a.id.localeCompare(b.id),
    );
  });

  if (!options.validateOnly) {
    await fs.writeFile(
      OUTPUT_FILE,
      `${JSON.stringify(manifest, null, 2)}\n`,
      "utf8",
    );
  }

  if (options.validateOnly) {
    console.log(
      "Validation succeeded. Manifest was not written (--validate-only).",
    );
  } else {
    console.log(
      `Image manifest generated: ${path.relative(ROOT, OUTPUT_FILE)}`,
    );
  }
  console.log(`Provider: ${provider}`);
  console.log(`Collections: ${manifest.stats.totalCollections}`);
  console.log(`Images: ${manifest.stats.totalImages}`);

  if (warnings.length) {
    console.log(`Warnings: ${warnings.length}`);
    if (options.failOnWarning) {
      process.exitCode = 1;
    }
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
