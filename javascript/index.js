// Register plugins once so all timelines can use ScrollTrigger.
gsap.registerPlugin(ScrollTrigger);

// Utility: animate heading rows the same way for visual continuity.
const animateHeadingRow = (selector) => {
  const heading = document.querySelector(`${selector} .section-heading`);
  const line = document.querySelector(`${selector} .heading-line`);

  if (!heading || !line) return;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: selector,
        start: "top 84%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      heading,
      { opacity: 0, y: 30, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" },
    )
    .fromTo(
      line,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
      "-=0.35",
    );
};

document.addEventListener("DOMContentLoaded", async () => {
  const navBracket = document.querySelector(".nav-bracket");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("primary-nav");
  const navLinks = document.querySelectorAll(".main-nav .nav-pill");
  let imageManifest = null;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const saveDataMode = navigator.connection?.saveData === true;
  const shouldLimitMotion = prefersReducedMotion || saveDataMode;

  // Apply data/images.manifest.json so image sources are managed from one file.
  const applyImageManifest = async () => {
    try {
      const response = await fetch("data/images.manifest.json", {
        cache: "no-store",
      });

      if (!response.ok) return;

      imageManifest = await response.json();
      const collections = Object.values(imageManifest.collections || {});
      const firstImageByTarget = new Map();

      collections.forEach((images) => {
        if (!Array.isArray(images)) return;

        images.forEach((image) => {
          if (!image?.target || !image?.url) return;
          if (!firstImageByTarget.has(image.target)) {
            firstImageByTarget.set(image.target, image);
          }
        });
      });

      firstImageByTarget.forEach((image, target) => {
        const element = document.querySelector(target);
        if (!element) return;

        element.src = image.url;
        if (image.alt) {
          element.alt = image.alt;
        }

        if (image.id) {
          element.dataset.imageId = image.id;
        }
      });
    } catch (error) {
      // Keep inline image fallbacks when manifest is missing or unavailable.
    }
  };

  await applyImageManifest();

  // Mobile navigation interactions.
  if (navBracket && navToggle && mainNav) {
    const closeMenu = () => {
      navBracket.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation menu");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navBracket.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
      if (
        navBracket.classList.contains("menu-open") &&
        !navBracket.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // Entrance sequence for the top of the page.
  const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

  gsap.fromTo(
    ".page-container",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 },
  );

  introTl
    .fromTo(
      ".nav-pill",
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.11 },
    )
    .fromTo(
      ".hero-content > *",
      { opacity: 0, x: -55 },
      { opacity: 1, x: 0, duration: 0.9, stagger: 0.2 },
      "-=0.2",
    )
    .fromTo(
      ".hero-image",
      { opacity: 0, scale: 0.82, rotation: -5 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.25,
        ease: "power3.out",
      },
      "-=0.45",
    )
    .fromTo(
      ".hero-image-backdrop",
      { top: 0, left: 0 },
      { top: 20, left: 20, duration: 0.72 },
      "-=0.5",
    );

  // Chapter transition overlays animate like a pulse between scenes.
  gsap.utils.toArray(".story-transition span").forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0, opacity: 0.2, transformOrigin: "left center" },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line.parentElement,
          start: "top 90%",
          end: "bottom 40%",
          scrub: 0.8,
        },
      },
    );
  });

  // Hero hover motion keeps the header alive without being distracting.
  const imgWrapper = document.querySelector(".hero-image-wrapper");
  const backdrop = document.querySelector(".hero-image-backdrop");

  if (imgWrapper && backdrop) {
    imgWrapper.addEventListener("mouseenter", () => {
      gsap.to(backdrop, {
        top: 30,
        left: 30,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    imgWrapper.addEventListener("mouseleave", () => {
      gsap.to(backdrop, {
        top: 20,
        left: 20,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }

  // Shared heading reveals for each chapter block.
  [
    ".roots-section",
    ".origin-section",
    ".journey-section",
    ".timeline-section",
    ".highlights-section",
    ".gallery-section",
    ".graduation-section",
    ".next-chapter-section",
  ].forEach(animateHeadingRow);

  // Chapter 02: redesigned Why UJ storyboard reveal.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".origin-section",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      ".origin-intro-card",
      { opacity: 0, x: -45 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
    )
    .fromTo(
      ".origin-main-visual",
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
      "-=0.55",
    )
    .fromTo(
      ".origin-mini-card",
      { opacity: 0, y: 40, rotate: (idx) => (idx % 2 === 0 ? -4 : 4) },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "back.out(1.25)",
      },
      "-=0.55",
    )
    .fromTo(
      ".origin-quote-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" },
      "-=0.35",
    );

  // Root story cards reveal in a light stagger to set the pre-UJ tone.
  gsap.fromTo(
    ".roots-card",
    { opacity: 0, y: 26, rotate: (idx) => (idx % 2 === 0 ? -1.2 : 1.2) },
    {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.85,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".roots-section",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    ".inner-page-entry",
    { opacity: 0, y: 20, x: -15 },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.75,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".inner-page-entry",
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    ".entry-button",
    { opacity: 0, scale: 0.92 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      delay: 0.15,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: ".inner-page-entry",
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Chapter 03: main journey reveal + photo strip cascade.
  const journeyTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".journey-section",
      start: "top 74%",
      toggleActions: "play none none reverse",
    },
  });

  journeyTl
    .fromTo(
      ".journey-image-tall",
      { opacity: 0, clipPath: "inset(100% 0 0 0)" },
      {
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        duration: 1.35,
        ease: "power4.out",
      },
    )
    .fromTo(
      ".journey-content .section-paragraph",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.95, stagger: 0.2, ease: "power3.out" },
      "-=0.82",
    )
    .fromTo(
      ".journey-image-small",
      { opacity: 0, scale: 0.84, rotation: 4 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.95,
        ease: "back.out(1.4)",
      },
      "-=0.45",
    )
    .fromTo(
      ".journey-photo-strip img",
      { opacity: 0, y: 28, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.18 },
      "-=0.35",
    );

  const smallImage = document.querySelector(".journey-image-small");
  if (smallImage) {
    smallImage.addEventListener("mouseenter", () => {
      gsap.to(smallImage, { rotation: -3, scale: 1.02, duration: 0.3 });
    });

    smallImage.addEventListener("mouseleave", () => {
      gsap.to(smallImage, { rotation: 0, scale: 1, duration: 0.3 });
    });
  }

  // Chapter 04: timeline cards reveal in sequence.
  const timelineCards = gsap.utils.toArray(".timeline-card");
  timelineCards.forEach((card, idx) => {
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 40,
        x: idx % 2 === 0 ? -15 : 15,
        rotate: idx % 2 === 0 ? -1.2 : 1.2,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        rotate: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // Chapter 05: turning point uses stronger contrast in movement.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".turning-section",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      ".turning-copy > *",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.88, stagger: 0.18 },
    )
    .fromTo(
      ".turning-photo-stack img",
      { opacity: 0, scale: 0.86, rotate: (i) => (i === 0 ? -7 : 7) },
      {
        opacity: 1,
        scale: 1,
        rotate: (i) => (i === 0 ? -2 : 2),
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)",
      },
      "-=0.35",
    )
    .fromTo(
      ".turning-note",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.2",
    );

  // Chapter 06: highlights panel reveal.
  const highlightsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".highlights-section",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  });

  highlightsTl
    .fromTo(
      ".sidebar-item",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.62 },
    )
    .fromTo(
      ".vertical-divider",
      { scaleY: 0, transformOrigin: "top center" },
      { scaleY: 1, duration: 0.78 },
      "-=0.3",
    )
    .fromTo(
      ".tab-pane.active .accordion-item",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.62 },
      "-=0.4",
    );

  // Chapter 07: gallery pop-in and subtle parallax.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".gallery-section",
        start: "top 76%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      ".grid-item",
      { opacity: 0, scale: 0.86, y: 34 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.92,
        stagger: 0.16,
        ease: "back.out(1.15)",
      },
    );

  if (!shouldLimitMotion) {
    gsap.utils.toArray(".grid-item img").forEach((img) => {
      gsap.to(img, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // Keep the same grid while cycling through more photos over time.
  const gallerySquareImg = document.querySelector(".grid-img-square img");
  const galleryWideImg = document.querySelector(".grid-img-wide img");
  const galleryTallImg = document.querySelector(".grid-img-tall img");

  const preloadImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(url);
      image.onerror = reject;
      image.src = url;
    });

  const shuffle = (items) => {
    const copy = [...items];
    for (let idx = copy.length - 1; idx > 0; idx -= 1) {
      const swapIdx = Math.floor(Math.random() * (idx + 1));
      [copy[idx], copy[swapIdx]] = [copy[swapIdx], copy[idx]];
    }
    return copy;
  };

  const buildSlotState = (element, extraPhotos) => {
    if (!element) return null;

    const fallbackPhoto = {
      src: element.currentSrc || element.src,
      alt: element.alt || "Gallery memory",
    };

    const uniquePool = [fallbackPhoto, ...extraPhotos].filter(
      (photo, idx, arr) =>
        arr.findIndex((item) => item.src === photo.src) === idx,
    );

    return {
      element,
      pool: uniquePool,
      queue: shuffle(uniquePool),
      isAnimating: false,
    };
  };

  const getCollectionPhotos = (collectionName) => {
    const collection = imageManifest?.collections?.[collectionName];
    if (!Array.isArray(collection)) return [];

    return collection
      .filter((item) => item?.url)
      .map((item) => ({
        src: item.url,
        alt: item.alt || "Gallery memory",
      }));
  };

  const cameraRollSlots = [
    buildSlotState(gallerySquareImg, getCollectionPhotos("cameraRollSquare")),
    buildSlotState(galleryWideImg, getCollectionPhotos("cameraRollWide")),
    buildSlotState(galleryTallImg, getCollectionPhotos("cameraRollTall")),
  ].filter(Boolean);

  const takeNextPhoto = (slotState) => {
    const currentSrc = slotState.element.currentSrc || slotState.element.src;

    if (!slotState.queue.length) {
      slotState.queue = shuffle(
        slotState.pool.filter((photo) => photo.src !== currentSrc),
      );
    }

    let nextPhoto = slotState.queue.shift();

    if (!nextPhoto || nextPhoto.src === currentSrc) {
      nextPhoto = slotState.pool.find((photo) => photo.src !== currentSrc);
    }

    return nextPhoto || null;
  };

  const rotateSlot = async (slotState) => {
    if (!slotState || slotState.isAnimating) return;

    const nextPhoto = takeNextPhoto(slotState);
    if (!nextPhoto) return;

    slotState.isAnimating = true;

    try {
      await preloadImage(nextPhoto.src);

      gsap.to(slotState.element, {
        opacity: 0,
        duration: 0.34,
        ease: "power2.inOut",
        onComplete: () => {
          slotState.element.src = nextPhoto.src;
          slotState.element.alt = nextPhoto.alt;

          gsap.to(slotState.element, {
            opacity: 1,
            duration: 0.42,
            ease: "power2.out",
            onComplete: () => {
              slotState.isAnimating = false;
            },
          });
        },
      });
    } catch (error) {
      slotState.isAnimating = false;
    }
  };

  if (cameraRollSlots.length) {
    let slotCursor = 0;
    let rotationIntervalId = null;

    const startGalleryRotation = () => {
      const slotState = cameraRollSlots[slotCursor];
      rotateSlot(slotState);
      slotCursor = (slotCursor + 1) % cameraRollSlots.length;
    };

    const beginAutoRotation = () => {
      if (rotationIntervalId !== null) return;
      rotationIntervalId = window.setInterval(startGalleryRotation, 2500);
    };

    const stopAutoRotation = () => {
      if (rotationIntervalId === null) return;
      window.clearInterval(rotationIntervalId);
      rotationIntervalId = null;
    };

    if (!shouldLimitMotion) {
      beginAutoRotation();
    }

    const galleryContainer = document.querySelector(".gallery-grid-container");
    if (galleryContainer) {
      galleryContainer.addEventListener("mouseenter", stopAutoRotation);
      galleryContainer.addEventListener("mouseleave", beginAutoRotation);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoRotation();
      } else if (!shouldLimitMotion) {
        beginAutoRotation();
      }
    });
  }

  // Chapter 08: cinematic graduation reveal.
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".graduation-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      ".graduation-hero-photo img",
      { opacity: 0, scale: 1.08, filter: "saturate(0.7)" },
      {
        opacity: 1,
        scale: 1,
        filter: "saturate(1)",
        duration: 1.3,
        ease: "power3.out",
      },
    )
    .fromTo(
      ".graduation-copy > p",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.92 },
      "-=0.55",
    )
    .fromTo(
      ".graduation-mini-grid img",
      { opacity: 0, x: 22 },
      { opacity: 1, x: 0, stagger: 0.18, duration: 0.82 },
      "-=0.35",
    );

  // Close chapter reveal.
  gsap.fromTo(
    ".next-chapter-layout > *",
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.95,
      stagger: 0.26,
      scrollTrigger: {
        trigger: ".next-chapter-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  // Reading progress: a compact chapter tracker that does not alter layout.
  const progressRoot = document.querySelector(".chapter-progress");
  const progressValue = document.querySelector(".chapter-progress-value");
  const progressTitle = document.querySelector(".chapter-progress-title");
  const storySections = Array.from(
    document.querySelectorAll("main section[id]"),
  );

  const getSectionTitle = (section) => {
    const heading = section.querySelector(".section-heading");
    if (heading) return heading.textContent.trim();

    const chapterTag = section.querySelector(".chapter-tag");
    if (chapterTag) {
      const raw = chapterTag.textContent.trim();
      return raw.includes("·") ? raw.split("·")[1].trim() : raw;
    }

    return section.id
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const updateChapterProgress = (activeIndex) => {
    if (!progressRoot || !progressValue || !progressTitle) return;
    if (activeIndex < 0 || activeIndex >= storySections.length) return;

    progressValue.textContent = `${activeIndex + 1}/${storySections.length}`;
    progressTitle.textContent = getSectionTitle(storySections[activeIndex]);
  };

  if (progressRoot && storySections.length) {
    updateChapterProgress(0);

    const progressObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const activeSection = visibleEntries[0].target;
        const activeIndex = storySections.indexOf(activeSection);
        updateChapterProgress(activeIndex);
      },
      {
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-8% 0px -38% 0px",
      },
    );

    storySections.forEach((section) => progressObserver.observe(section));
  }

  // Tabs: keyboard-friendly behavior with ARIA semantics.
  const tabList = document.querySelector(".sidebar-list");
  const tabTriggers = Array.from(document.querySelectorAll(".sidebar-item"));
  const tabPanes = Array.from(document.querySelectorAll(".tab-pane"));

  if (tabList) {
    tabList.setAttribute("role", "tablist");
    tabList.setAttribute("aria-label", "Highlights categories");
  }

  const activateTab = (trigger, shouldFocus = false) => {
    const targetId = trigger.getAttribute("data-tab");
    const targetPane = targetId ? document.getElementById(targetId) : null;
    if (!targetPane) return;

    tabTriggers.forEach((tab) => {
      const isActive = tab === trigger;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    tabPanes.forEach((pane) => {
      const isActive = pane === targetPane;
      pane.classList.toggle("active", isActive);
      pane.hidden = !isActive;
    });

    if (shouldFocus) {
      trigger.focus();
    }

    if (!shouldLimitMotion) {
      gsap.fromTo(
        targetPane.querySelectorAll(".accordion-item"),
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
      );
    }
  };

  tabTriggers.forEach((trigger, index) => {
    const targetId = trigger.getAttribute("data-tab");
    const triggerId = trigger.id || `highlights-tab-${index + 1}`;
    trigger.id = triggerId;
    trigger.setAttribute("role", "tab");
    trigger.setAttribute("aria-controls", targetId || "");
    trigger.setAttribute(
      "aria-selected",
      String(trigger.classList.contains("active")),
    );
    trigger.setAttribute(
      "tabindex",
      trigger.classList.contains("active") ? "0" : "-1",
    );

    trigger.addEventListener("click", () => activateTab(trigger));
    trigger.addEventListener("keydown", (event) => {
      const key = event.key;
      const currentIndex = tabTriggers.indexOf(trigger);
      let nextIndex = currentIndex;

      if (key === "ArrowRight" || key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % tabTriggers.length;
      } else if (key === "ArrowLeft" || key === "ArrowUp") {
        nextIndex =
          (currentIndex - 1 + tabTriggers.length) % tabTriggers.length;
      } else if (key === "Home") {
        nextIndex = 0;
      } else if (key === "End") {
        nextIndex = tabTriggers.length - 1;
      } else if (key === " " || key === "Enter") {
        event.preventDefault();
        activateTab(trigger);
        return;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(tabTriggers[nextIndex], true);
    });
  });

  tabPanes.forEach((pane) => {
    const tab = tabTriggers.find(
      (item) => item.getAttribute("data-tab") === pane.id,
    );
    pane.setAttribute("role", "tabpanel");
    pane.setAttribute("tabindex", "0");
    pane.hidden = !pane.classList.contains("active");
    if (tab) {
      pane.setAttribute("aria-labelledby", tab.id);
    }
  });

  // Accordion: one-open-at-a-time with ARIA state sync.
  const allAccordionItems = Array.from(
    document.querySelectorAll(".accordion-item"),
  );

  const closeAccordionItem = (item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    if (!header || !content) return;

    item.classList.remove("is-open");
    header.setAttribute("aria-expanded", "false");

    gsap.to(content, {
      height: 0,
      duration: shouldLimitMotion ? 0 : 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        content.hidden = true;
      },
    });
  };

  const openAccordionItem = (item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const inner = item.querySelector(".accordion-inner");
    if (!header || !content || !inner) return;

    item.classList.add("is-open");
    header.setAttribute("aria-expanded", "true");
    content.hidden = false;

    gsap.to(content, {
      height: inner.offsetHeight,
      duration: shouldLimitMotion ? 0 : 0.4,
      ease: "power2.inOut",
    });
  };

  allAccordionItems.forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    if (!header || !content) return;

    const headerId = header.id || `accordion-header-${index + 1}`;
    const panelId = content.id || `accordion-panel-${index + 1}`;

    header.id = headerId;
    content.id = panelId;
    header.setAttribute("aria-controls", panelId);
    header.setAttribute(
      "aria-expanded",
      String(item.classList.contains("is-open")),
    );
    content.setAttribute("role", "region");
    content.setAttribute("aria-labelledby", headerId);
    content.hidden = !item.classList.contains("is-open");
  });

  allAccordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    if (!header) return;

    header.addEventListener("click", () => {
      const currentTab = item.closest(".tab-pane");
      if (!currentTab) return;

      const isOpen = item.classList.contains("is-open");

      currentTab.querySelectorAll(".accordion-item").forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("is-open")) {
          closeAccordionItem(otherItem);
        }
      });

      if (isOpen) {
        closeAccordionItem(item);
      } else {
        openAccordionItem(item);
      }
    });
  });

  if (tabTriggers.length) {
    const initialActiveTab =
      tabTriggers.find((trigger) => trigger.classList.contains("active")) ||
      tabTriggers[0];
    activateTab(initialActiveTab);
  }
});
