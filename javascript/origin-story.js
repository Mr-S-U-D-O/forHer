// Origin Story Page JS - Animations and Interactivity

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", async () => {
  const navBracket = document.querySelector(".nav-bracket");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("primary-nav");
  const navLinks = document.querySelectorAll(".main-nav .nav-pill");
  let imageManifest = null;

  // Apply image manifest if available
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
        if (image.alt) element.alt = image.alt;
        if (image.id) element.dataset.imageId = image.id;
      });
    } catch (error) {
      // Fallback to inline images
    }
  };

  await applyImageManifest();

  // Mobile navigation
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
        isOpen ? "Close navigation menu" : "Open navigation menu"
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

  // Entrance sequence
  const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

  gsap.fromTo(
    ".page-container",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 }
  );

  introTl
    .fromTo(
      ".nav-pill",
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.11 }
    )
    .fromTo(
      ".origin-hero-content > *",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.9, stagger: 0.18 },
      "-=0.3"
    )
    .fromTo(
      ".origin-hero-image",
      { opacity: 0, scale: 0.85, rotation: -3 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.15,
        ease: "power3.out",
      },
      "-=0.5"
    );

  // Story transition lines
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
      }
    );
  });

  // Animate section headings
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
        { opacity: 1, y: 0, skewY: 0, duration: 1, ease: "power4.out" }
      )
      .fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.1, ease: "power3.inOut" },
        "-=0.35"
      );
  };

  [
    ".origin-hometown-section",
    ".origin-childhood-section",
    ".origin-family-section",
    ".origin-influences-section",
    ".origin-ambition-section",
    ".origin-bridge-section",
  ].forEach(animateHeadingRow);

  // Hometown gallery card hover effects
  gsap.utils.toArray(".hometown-image-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Hometown gallery reveal
  gsap.fromTo(
    ".hometown-image-card",
    { opacity: 0, y: 20, rotate: (idx) => (idx % 2 === 0 ? -1 : 1) },
    {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hometown-gallery",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Childhood memory items reveal
  gsap.fromTo(
    ".memory-item",
    { opacity: 0, x: -30 },
    {
      opacity: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".childhood-memory-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Moments strip reveal
  gsap.fromTo(
    ".moment-card",
    { opacity: 0, scale: 0.9, y: 15 },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.3)",
      scrollTrigger: {
        trigger: ".moments-strip",
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Family cards reveal
  gsap.fromTo(
    ".family-card",
    { opacity: 0, y: 25, rotate: (idx) => (idx % 2 === 0 ? -1.5 : 1.5) },
    {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".family-dynamics-grid",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Family photo cards with subtle hover
  gsap.utils.toArray(".family-photo-small, .family-photo-tall").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  // Influence cards reveal
  gsap.fromTo(
    ".influence-card",
    { opacity: 0, y: 30, x: (idx) => (idx % 2 === 0 ? -30 : 30) },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".influences-carousel",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Timeline items stagger reveal
  gsap.fromTo(
    ".timeline-item",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".ambition-timeline",
        start: "top 76%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Bridge section fade-in
  gsap.fromTo(
    ".origin-bridge-section",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".origin-bridge-section",
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // CTA button scale on enter
  gsap.fromTo(
    ".cta-button",
    { opacity: 0, scale: 0.85 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      delay: 0.3,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: ".origin-cta-section",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // CTA button hover
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("mouseenter", () => {
      gsap.to(ctaButton, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    ctaButton.addEventListener("mouseleave", () => {
      gsap.to(ctaButton, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  }

  // Highlight boxes subtle pulse
  gsap.utils.toArray(".hometown-highlight-box, .timeline-content, .influence-card").forEach((box) => {
    gsap.to(box, {
      boxShadow:
        "0 0 20px rgba(165, 42, 214, 0.15), 8px 8px 0 rgba(50, 12, 64, 0.08)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: box,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
  });
});
