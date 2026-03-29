/* NEXT CHAPTER PAGE — ANIMATIONS */

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// INTRO SEQUENCE
// ─────────────────────────────────────────────────────────────────────

function initIntroSequence() {
  const navPills = document.querySelectorAll(".nav-pill");
  const heroContent = document.querySelector(".nc-hero-content");
  const heroTitle = document.querySelector(".nc-hero-title");
  const heroSubtitle = document.querySelector(".nc-hero-subtitle");
  const heroDesc = document.querySelector(".nc-hero-desc");
  const heroBg = document.querySelector(".nc-hero-bg");

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
// IMMEDIATE NEXT SECTION
// ─────────────────────────────────────────────────────────────────────

function initImmediateAnimations() {
  const immediateSection = document.querySelector(".nc-immediate-section");
  const immediateCards = document.querySelectorAll(".immediate-card");
  const taskLists = document.querySelectorAll(".task-list");

  // Section heading
  gsap.from(immediateSection.querySelector("h2"), {
    scrollTrigger: {
      trigger: immediateSection,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: "power2.out",
  });

  // Immediate cards: slide from left with timeline bullet animation
  immediateCards.forEach((card, i) => {
    const marker = card.querySelector(".immediate-phase");
    const dotMarker = card.querySelector(".immediate-card");

    // Card entrance
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      duration: 0.7,
      opacity: 0,
      x: -40,
      ease: "power3.out",
    });

    // Dot marker pop
    gsap.from(dotMarker, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      duration: 0.5,
      width: 0,
      height: 0,
      ease: "back.out",
      delay: 0.15,
    });

    // Phase label fade
    gsap.from(marker, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      ease: "power2.out",
      delay: 0.1,
    });
  });

  // Task list items: stagger from top-left
  taskLists.forEach((list) => {
    const items = list.querySelectorAll("li");
    gsap.from(items, {
      scrollTrigger: {
        trigger: list.closest(".immediate-card"),
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
      duration: 0.5,
      opacity: 0,
      x: -15,
      stagger: 0.08,
      ease: "power2.out",
    });
  });

  // Card hover: slide right
  immediateCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        x: 8,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        x: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// PATHWAY SECTION
// ─────────────────────────────────────────────────────────────────────

function initPathwayAnimations() {
  const pathwayGrid = document.querySelector(".pathway-grid");
  const pathwayPhases = document.querySelectorAll(".pathway-phase");

  // Pathway heading
  gsap.from(document.querySelector(".nc-pathway-section h2"), {
    scrollTrigger: {
      trigger: pathwayGrid,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: "power2.out",
  });

  // Pathway phases: stagger entrance with scale
  gsap.from(pathwayPhases, {
    scrollTrigger: {
      trigger: pathwayGrid,
      start: "top 83%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.85,
    y: 30,
    stagger: 0.12,
    ease: "back.out",
  });

  // Phase numbers: fade in and shift
  document.querySelectorAll(".phase-number").forEach((num, i) => {
    gsap.from(num, {
      scrollTrigger: {
        trigger: pathwayPhases[i],
        start: "top 83%",
        toggleActions: "play none none reverse",
      },
      duration: 0.6,
      opacity: 0,
      x: -20,
      ease: "power2.out",
      delay: 0.15,
    });
  });

  // Phase goals: reveal list
  document.querySelectorAll(".phase-goals").forEach((goals) => {
    const liItems = goals.querySelectorAll("li");
    gsap.from(liItems, {
      scrollTrigger: {
        trigger: goals.closest(".pathway-phase"),
        start: "top 82%",
        toggleActions: "play none none reverse",
      },
      duration: 0.5,
      opacity: 0,
      x: -10,
      stagger: 0.06,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  // Pathway hover: lift + top border draw
  pathwayPhases.forEach((phase) => {
    phase.addEventListener("mouseenter", () => {
      gsap.to(phase, {
        y: -6,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
    phase.addEventListener("mouseleave", () => {
      gsap.to(phase, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// GROWTH TRACKS SECTION
// ─────────────────────────────────────────────────────────────────────

function initGrowthAnimations() {
  const growthTracks = document.querySelectorAll(".growth-track");
  const trackItems = document.querySelectorAll(".track-item");
  const connector = document.querySelector(".growth-connector");

  // Growth tracks: simultaneous slide from left/right
  gsap.from(document.querySelector(".growth-track-career"), {
    scrollTrigger: {
      trigger: document.querySelector(".nc-growth-section"),
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    x: -50,
    ease: "power3.out",
  });

  gsap.from(document.querySelector(".growth-track-personal"), {
    scrollTrigger: {
      trigger: document.querySelector(".nc-growth-section"),
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    x: 50,
    ease: "power3.out",
  });

  // Connector: fade + scale
  gsap.from(connector, {
    scrollTrigger: {
      trigger: document.querySelector(".nc-growth-section"),
      start: "top 78%",
      toggleActions: "play none none reverse",
    },
    duration: 0.9,
    opacity: 0,
    scale: 0.8,
    ease: "back.out",
  });

  // Track items: stagger within each track
  document
    .querySelectorAll(".growth-track-career .track-item")
    .forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: document.querySelector(".growth-track-career"),
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.6,
        opacity: 0,
        y: 15,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2 + i * 0.1,
      });
    });

  document
    .querySelectorAll(".growth-track-personal .track-item")
    .forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: document.querySelector(".growth-track-personal"),
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.6,
        opacity: 0,
        y: 15,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2 + i * 0.1,
      });
    });
}

// ─────────────────────────────────────────────────────────────────────
// VISION SECTION
// ─────────────────────────────────────────────────────────────────────

function initVisionAnimations() {
  const visionBox = document.querySelector(".vision-box");
  const visionMarker = document.querySelector(".vision-marker");
  const visionTitle = document.querySelector(".vision-box h2");
  const visionParagraphs = document.querySelectorAll(".vision-statement p");
  const visionPillars = document.querySelectorAll(".pillar");

  // Vision marker
  gsap.from(visionMarker, {
    scrollTrigger: {
      trigger: visionBox,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    opacity: 0,
    scale: 0.8,
    ease: "back.out",
  });

  // Vision title: scale + rotate
  gsap.from(visionTitle, {
    scrollTrigger: {
      trigger: visionBox,
      start: "top 87%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    scale: 0.9,
    rotationZ: -1,
    ease: "back.out",
  });

  // Vision paragraphs: stagger fade + move down
  gsap.from(visionParagraphs, {
    scrollTrigger: {
      trigger: visionBox,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    y: 20,
    stagger: 0.15,
    ease: "power2.out",
  });

  // Vision pillars: bounce entrance with stagger
  gsap.from(visionPillars, {
    scrollTrigger: {
      trigger: document.querySelector(".vision-pillars"),
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.85,
    y: 25,
    stagger: 0.1,
    ease: "back.out",
  });

  // Pillar hover: lift
  visionPillars.forEach((pillar) => {
    pillar.addEventListener("mouseenter", () => {
      gsap.to(pillar, {
        y: -6,
        boxShadow: "8px 8px 0 rgba(50, 12, 64, 0.12)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
    pillar.addEventListener("mouseleave", () => {
      gsap.to(pillar, {
        y: 0,
        boxShadow: "none",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// CHALLENGES SECTION
// ─────────────────────────────────────────────────────────────────────

function initChallengeAnimations() {
  const challengeCards = document.querySelectorAll(".challenge-card");

  // Challenge heading
  gsap.from(document.querySelector(".nc-challenges-section h2"), {
    scrollTrigger: {
      trigger: document.querySelector(".nc-challenges-section"),
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: "power2.out",
  });

  // Challenge cards: stagger entrance with scale
  gsap.from(challengeCards, {
    scrollTrigger: {
      trigger: document.querySelector(".challenges-grid"),
      start: "top 82%",
      toggleActions: "play none none reverse",
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.88,
    y: 30,
    stagger: 0.12,
    ease: "back.out",
  });

  // Card hover: slide up + bg change
  challengeCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -6,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// COMMITMENT SECTION
// ─────────────────────────────────────────────────────────────────────

function initCommitmentAnimations() {
  const commitmentBox = document.querySelector(".commitment-box");
  const commitmentTitle = document.querySelector(".commitment-box h2");
  const commitmentParagraphs = document.querySelectorAll(
    ".commitment-text > p",
  );
  const commitmentItems = document.querySelectorAll(".commitment-list li");

  // Commitment title
  gsap.from(commitmentTitle, {
    scrollTrigger: {
      trigger: commitmentBox,
      start: "top 88%",
      toggleActions: "play none none reverse",
    },
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: "power2.out",
  });

  // Commitment paragraphs: fade + scale
  gsap.from(commitmentParagraphs, {
    scrollTrigger: {
      trigger: commitmentBox,
      start: "top 87%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    opacity: 0,
    scale: 0.95,
    stagger: 0.12,
    ease: "power2.out",
  });

  // Commitment list items: slide from left with checkmark
  gsap.from(commitmentItems, {
    scrollTrigger: {
      trigger: document.querySelector(".commitment-list"),
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    duration: 0.6,
    opacity: 0,
    x: -30,
    stagger: 0.1,
    ease: "power2.out",
  });

  // List item checkmarks: scale entrance
  document
    .querySelectorAll(".commitment-list li::before")
    .forEach((marker, i) => {
      gsap.from(marker, {
        scrollTrigger: {
          trigger: document.querySelector(".commitment-list"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        duration: 0.5,
        scale: 0,
        ease: "back.out",
        delay: i * 0.1 + 0.15,
      });
    });
}

// ─────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────

function initCtaAnimations() {
  const ctaSection = document.querySelector(".nc-nav-section");
  const ctaHeading = document.querySelector(".nc-nav-section h2");
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

  // CTA buttons: scale + rotate entrance
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
  initImmediateAnimations();
  initPathwayAnimations();
  initGrowthAnimations();
  initVisionAnimations();
  initChallengeAnimations();
  initCommitmentAnimations();
  initCtaAnimations();
});
