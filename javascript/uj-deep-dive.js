/* UJ DEEP DIVE PAGE — ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// INTRO SEQUENCE
// ─────────────────────────────────────────────────────────────────────

function initIntroSequence() {
  const navPills = document.querySelectorAll(".nav-pill");
  const heroContent = document.querySelector(".uj-hero-content");
  const heroTitle = document.querySelector(".uj-hero-title");
  const heroSubtitle = document.querySelector(".uj-hero-subtitle");
  const heroDesc = document.querySelector(".uj-hero-desc");
  const heroBg = document.querySelector(".uj-hero-bg");

  const tl = gsap.timeline();

  // Nav pills: rotate + scale
  tl.from(
    navPills,
    {
      duration: 0.5,
      opacity: 0,
      scale: 0.8,
      rotationZ: -3,
      stagger: 0.08,
      ease: "back.out",
    },
    0,
  );

  // Hero bg: subtle zoom + fade
  tl.from(
    heroBg,
    {
      duration: 1.2,
      scale: 1.15,
      opacity: 0.1,
      ease: "power2.out",
    },
    0,
  );

  // Hero title: slide from left
  tl.from(
    heroTitle,
    {
      duration: 0.8,
      opacity: 0,
      x: -60,
      ease: "power3.out",
    },
    0.15,
  );

  // Hero subtitle: fade + scale
  tl.from(
    heroSubtitle,
    {
      duration: 0.6,
      opacity: 0,
      scale: 0.92,
      ease: "power2.out",
    },
    0.35,
  );

  // Hero desc: reveal
  tl.from(
    heroDesc,
    {
      duration: 0.7,
      opacity: 0,
      y: 20,
      ease: "power2.out",
    },
    0.5,
  );
}

// ─────────────────────────────────────────────────────────────────────
// LECTURERS SECTION
// ─────────────────────────────────────────────────────────────────────

function initLecturerAnimations() {
  const lecturersSection = document.querySelector(".uj-lecturers-section");
  const lecturerCards = document.querySelectorAll(".lecturer-card");
  const lecturerHeaders = document.querySelectorAll(".lecturer-header");
  const lecturerInfluence = document.querySelectorAll(".lecturer-influence");

  // Staggered entrance from bottom-up
  gsap.from(lecturerCards, {
    scrollTrigger: {
      trigger: lecturersSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    y: 40,
    stagger: 0.12,
    ease: "power3.out",
  });

  // Icons: pop + rotate entrance
  document.querySelectorAll(".lecturer-icon").forEach((icon, i) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: lecturersSection,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      scale: 0,
      rotationZ: -12,
      ease: "back.out",
      delay: i * 0.12 + 0.2,
    });
  });

  // Influence badge: slide from right
  gsap.from(lecturerInfluence, {
    scrollTrigger: {
      trigger: lecturersSection,
      start: "top 78%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    opacity: 0,
    x: 30,
    stagger: 0.12,
    ease: "power2.out",
  });

  // Hover: lift + top border draw
  lecturerCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -8,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// SEMESTERS & MODULES
// ─────────────────────────────────────────────────────────────────────

function initSemesterAnimations() {
  const semesterBlocks = document.querySelectorAll(".semester-block");

  semesterBlocks.forEach((block, blockIndex) => {
    const moduleCards = block.querySelectorAll(".module-card");
    const semesterHeader = block.querySelector(".semester-header");
    const semesterMarker = block.querySelector(".semester-marker");

    // Semester marker
    gsap.from(semesterMarker, {
      scrollTrigger: {
        trigger: block,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      scale: 0.8,
      ease: "back.out",
    });

    // Semester header title
    gsap.from(semesterHeader, {
      scrollTrigger: {
        trigger: block,
        start: "top 84%",
        toggleActions: "play none none reverse",
      },
      duration: 0.7,
      opacity: 0,
      y: 15,
      ease: "power2.out",
    });

    // Module cards: offset stagger with rotation
    gsap.from(moduleCards, {
      scrollTrigger: {
        trigger: block,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      y: 30,
      rotationZ: (i) => (i % 2 === 0 ? -1.5 : 1.5),
      stagger: 0.1,
      ease: "power2.out",
    });

    // Module cards hover: scale + lift
    moduleCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          y: -4,
          duration: 0.4,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// LAB WORK SECTION
// ─────────────────────────────────────────────────────────────────────

function initLabAnimations() {
  const labItems = document.querySelectorAll(".lab-showcase-item");
  const labImages = document.querySelectorAll(".lab-image img");

  labItems.forEach((item, i) => {
    const isEven = i % 2 === 0;
    const labContent = item.querySelector(".lab-content");
    const labImage = item.querySelector(".lab-image");

    // Content: slide from left/right based on position
    gsap.from(labContent, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      x: isEven ? -50 : 50,
      ease: "power3.out",
    });

    // Image: fade + scale
    gsap.from(labImage, {
      scrollTrigger: {
        trigger: item,
        start: "top 83%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      scale: 0.9,
      ease: "power2.out",
      delay: 0.15,
    });
  });

  // Image hover: scale zoom
  labImages.forEach((img) => {
    const container = img.closest(".lab-image");
    container.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.12, duration: 0.5, ease: "power2.out" });
    });
    container.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────────────────────────────

function initProjectAnimations() {
  const projectCards = document.querySelectorAll(".project-card");
  const projectHeaders = document.querySelectorAll(".project-header");
  const projectImages = document.querySelectorAll(".project-image");

  projectCards.forEach((card, i) => {
    // Card entrance: alternate left-right
    const startX = i % 2 === 0 ? -60 : 60;
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 0.8,
      opacity: 0,
      x: startX,
      ease: "power3.out",
    });

    // Header background color fade
    gsap.from(card.querySelector(".project-header"), {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 0.7,
      backgroundColor: "rgba(163, 42, 214, 0)",
      ease: "power2.out",
      delay: 0.2,
    });

    // Project image: scale entrance
    gsap.from(card.querySelector(".project-image"), {
      scrollTrigger: {
        trigger: card,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      duration: 0.7,
      opacity: 0,
      scale: 0.95,
      ease: "power2.out",
      delay: 0.3,
    });
  });

  // Project image hover: zoom
  projectImages.forEach((img) => {
    const container = img;
    container.addEventListener("mouseenter", () => {
      gsap.to(img.querySelector("img"), {
        scale: 1.08,
        duration: 0.5,
        ease: "power2.out",
      });
    });
    container.addEventListener("mouseleave", () => {
      gsap.to(img.querySelector("img"), {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// SKILLS PROGRESSION
// ─────────────────────────────────────────────────────────────────────

function initSkillsAnimations() {
  const skillsDomain = document.querySelectorAll(".skill-domain");
  const skillBars = document.querySelectorAll(".skill-fill");

  // Skill domains: stagger entrance bottom-up
  gsap.from(skillsDomain, {
    scrollTrigger: {
      trigger: document.querySelector(".uj-skills-section"),
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    y: 40,
    stagger: 0.15,
    ease: "power2.out",
  });

  // Skill bars: animate width from 0 to final width
  skillBars.forEach((bar, i) => {
    const finalWidth = bar.style.width;
    gsap.from(bar, {
      scrollTrigger: {
        trigger: document.querySelector(".uj-skills-section"),
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
      width: "0%",
      duration: 0.8,
      ease: "power2.out",
      delay: i * 0.08 + 0.3,
    });
  });

  // Skill titles: fade in
  document.querySelectorAll(".skill-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title.closest(".skill-domain"),
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      ease: "power2.out",
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// BREAKTHROUGH SECTION
// ─────────────────────────────────────────────────────────────────────

function initBreakthroughAnimations() {
  const breakthroughContent = document.querySelector(".breakthrough-content");
  const breakthroughMarker = document.querySelector(".breakthrough-marker");
  const breakthroughTitle = document.querySelector(
    ".uj-breakthrough-section h2",
  );
  const breakthroughParagraphs = document.querySelectorAll(
    ".breakthrough-narrative p",
  );

  // Marker
  gsap.from(breakthroughMarker, {
    scrollTrigger: {
      trigger: breakthroughContent,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    opacity: 0,
    scale: 0.8,
    ease: "back.out",
  });

  // Title: scale + rotate entrance
  gsap.from(breakthroughTitle, {
    scrollTrigger: {
      trigger: breakthroughContent,
      start: "top 87%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    scale: 0.9,
    ease: "back.out",
  });

  // Paragraphs: fade + move down stagger
  gsap.from(breakthroughParagraphs, {
    scrollTrigger: {
      trigger: breakthroughContent,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    y: 20,
    stagger: 0.15,
    ease: "power2.out",
  });
}

// ─────────────────────────────────────────────────────────────────────
// REFLECTION SECTION
// ─────────────────────────────────────────────────────────────────────

function initReflectionAnimations() {
  const reflectionContainer = document.querySelector(".reflection-container");
  const reflectionGrid = document.querySelector(".reflection-grid");
  const reflectionPoints = document.querySelectorAll(".reflection-point");
  const reflectionClosing = document.querySelector(".reflection-closing");

  // Reflection section heading
  gsap.from(reflectionContainer.querySelector("h2"), {
    scrollTrigger: {
      trigger: reflectionContainer,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: "power2.out",
  });

  // Reflection points: bounce/ scale entrance with stagger
  gsap.from(reflectionPoints, {
    scrollTrigger: {
      trigger: reflectionGrid,
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.85,
    stagger: 0.12,
    ease: "back.out",
  });

  // Reflection point borders: grow
  reflectionPoints.forEach((point, i) => {
    gsap.from(point, {
      scrollTrigger: {
        trigger: reflectionGrid,
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      borderColor: "rgba(163, 42, 214, 0)",
      ease: "power2.out",
      delay: i * 0.12 + 0.2,
    });
  });

  // Reflection closing: fade + move up
  gsap.from(reflectionClosing, {
    scrollTrigger: {
      trigger: reflectionClosing,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: "power2.out",
  });

  // Hover effect on reflection points: lift + shadow
  reflectionPoints.forEach((point) => {
    point.addEventListener("mouseenter", () => {
      gsap.to(point, {
        y: -6,
        boxShadow: "8px 8px 0 rgba(50, 12, 64, 0.15)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
    point.addEventListener("mouseleave", () => {
      gsap.to(point, {
        y: 0,
        boxShadow: "none",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────

function initCtaAnimations() {
  const ctaSection = document.querySelector(".uj-nav-section");
  const ctaHeading = document.querySelector(".uj-nav-section h2");
  const ctaButtons = document.querySelectorAll(".nav-cta-button");

  // CTA heading
  gsap.from(ctaHeading, {
    scrollTrigger: {
      trigger: ctaSection,
      start: "top 90%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: "power2.out",
  });

  // CTA buttons: scale entrance with rotation
  gsap.from(ctaButtons, {
    scrollTrigger: {
      trigger: ctaSection,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.8,
    rotationZ: (i) => (i % 2 === 0 ? -2 : 2),
    stagger: 0.15,
    ease: "back.out",
  });

  // Button hover
  ctaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.08,
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// INIT ALL
// ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initIntroSequence();
  initLecturerAnimations();
  initSemesterAnimations();
  initLabAnimations();
  initProjectAnimations();
  initSkillsAnimations();
  initBreakthroughAnimations();
  initReflectionAnimations();
  initCtaAnimations();
});
