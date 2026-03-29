/* SCHOOL YEARS PAGE — ANIMATIONS & INTERACTIONS */

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────
// INTRO SEQUENCE
// ─────────────────────────────────────────────────────────────────────

function initIntroSequence() {
  const navPills = document.querySelectorAll(".nav-pill");
  const heroContent = document.querySelector(".school-hero-content");
  const heroTitle = document.querySelector(".school-hero-title");
  const heroSubtitle = document.querySelector(".school-hero-subtitle");
  const heroDesc = document.querySelector(".school-hero-desc");
  const heroBg = document.querySelector(".school-hero-bg");

  const tl = gsap.timeline();

  // Nav pills: rotate + scale entrance
  tl.from(
    navPills,
    {
      duration: 0.5,
      opacity: 0,
      scale: 0.8,
      rotationZ: -3,
      stagger: 0.08,
      ease: "back.out"
    },
    0
  );

  // Hero bg: subtle zoom + fade
  tl.from(
    heroBg,
    {
      duration: 1.2,
      scale: 1.15,
      opacity: 0.1,
      ease: "power2.out"
    },
    0
  );

  // Hero title: split line entrance from left
  tl.from(
    heroTitle,
    {
      duration: 0.8,
      opacity: 0,
      x: -60,
      ease: "power3.out"
    },
    0.15
  );

  // Hero subtitle: fade + scale
  tl.from(
    heroSubtitle,
    {
      duration: 0.6,
      opacity: 0,
      scale: 0.92,
      ease: "power2.out"
    },
    0.35
  );

  // Hero desc: line-by-line reveal effect
  tl.from(
    heroDesc,
    {
      duration: 0.7,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    },
    0.5
  );
}

// ─────────────────────────────────────────────────────────────────────
// PRIMARY SCHOOL SECTION
// ─────────────────────────────────────────────────────────────────────

function initPrimarySchoolAnimations() {
  const primarySection = document.querySelector(".school-primary-section");
  const primaryTitle = document.querySelector(".primary-era-title");
  const timelineDots = document.querySelectorAll(".timeline-dot");
  const primaryPhotos = document.querySelectorAll(".primary-photo-grid figure");
  const insightBox = document.querySelector(".section-insight-box");
  const insightItems = document.querySelectorAll(".insight-item");

  // Section marker reveal
  const marker = document.querySelector(".school-section-marker");
  gsap.from(marker, {
    scrollTrigger: {
      trigger: primarySection,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    duration: 0.6,
    opacity: 0,
    scale: 0.9,
    ease: "back.out"
  });

  // Title slide from left
  gsap.from(primaryTitle, {
    scrollTrigger: {
      trigger: primarySection,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    duration: 0.8,
    opacity: 0,
    x: -50,
    ease: "power3.out"
  });

  // Timeline dots: cascade from left with left border draw
  gsap.from(timelineDots, {
    scrollTrigger: {
      trigger: primarySection,
      start: "top 75%",
      toggleActions: "play none none reverse"
    },
    duration: 0.6,
    opacity: 0,
    x: -30,
    stagger: 0.12,
    ease: "power2.out"
  });

  // Timeline dot circles: scale entrance
  document.querySelectorAll(".timeline-dot::before").forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: primarySection,
        start: "top 75%",
        toggleActions: "play none none reverse"
      },
      duration: 0.5,
      scale: 0,
      ease: "back.out",
      delay: i * 0.12 + 0.3
    });
  });

  // Primary photos: fade + scale stagger
  gsap.from(primaryPhotos, {
    scrollTrigger: {
      trigger: primarySection,
      start: "top 70%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.92,
    stagger: 0.15,
    ease: "power2.out"
  });

  // Insight box: slide up + fade
  gsap.from(insightBox, {
    scrollTrigger: {
      trigger: insightBox,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    duration: 0.8,
    opacity: 0,
    y: 40,
    ease: "power3.out"
  });

  // Insight items: stagger cascade
  gsap.from(insightItems, {
    scrollTrigger: {
      trigger: insightBox,
      start: "top 82%",
      toggleActions: "play none none reverse"
    },
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power2.out"
  });

  // Hover effect: photos lift + brighten
  primaryPhotos.forEach((photo) => {
    photo.addEventListener("mouseenter", () => {
      gsap.to(photo, { y: -8, duration: 0.4, ease: "power2.out" });
    });
    photo.addEventListener("mouseleave", () => {
      gsap.to(photo, { y: 0, duration: 0.4, ease: "power2.out" });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// HIGH SCHOOL SECTION
// ─────────────────────────────────────────────────────────────────────

function initHighSchoolAnimations() {
  const secondarySection = document.querySelector(".school-secondary-section");
  const introBlock = document.querySelector(".secondary-intro-block");
  const gradeCards = document.querySelectorAll(".grade-card");
  const gradePhotos = document.querySelectorAll(".grade-photo img");

  // Intro block fade + move
  gsap.from(introBlock, {
    scrollTrigger: {
      trigger: secondarySection,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    duration: 0.9,
    opacity: 0,
    y: 30,
    ease: "power2.out"
  });

  // Grade cards: alternating entrance (left/right)
  gradeCards.forEach((card, i) => {
    const isEven = i % 2 === 0;
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      duration: 0.7,
      opacity: 0,
      x: isEven ? -60 : 60,
      ease: "power3.out"
    });

    // Grade header sep line draw effect (fake it with scale-x)
    const sepLine = card.querySelector(".grade-header");
    gsap.from(sepLine, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      duration: 0.6,
      scaleX: 0,
      transformOrigin: isEven ? "left" : "right",
      opacity: 0,
      ease: "power2.out",
      delay: 0.2
    });
  });

  // Grade numbers: counter effect (count up)
  document.querySelectorAll(".grade-number").forEach((num, i) => {
    const cardIndex = i + 8; // Grade 8 onwards
    gsap.to(
      { val: 0 },
      {
        scrollTrigger: {
          trigger: num.closest(".grade-card"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        val: cardIndex,
        duration: 0.7,
        snap: { val: 1 },
        onUpdate: function () {
          num.textContent = Math.floor(this.targets()[0].val);
        },
        ease: "power2.out"
      }
    );
  });

  // Grade photos zoom on scroll trigger
  gradePhotos.forEach((photo) => {
    gsap.from(photo, {
      scrollTrigger: {
        trigger: photo.closest(".grade-card"),
        start: "top 78%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      scale: 1.15,
      opacity: 0.3,
      ease: "power2.out"
    });
  });

  // Grade cards: hover effect (lift + shadow)
  gradeCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -6,
        duration: 0.35,
        ease: "power2.out",
        boxShadow: "8px 12px 20px rgba(50, 12, 64, 0.15)"
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        boxShadow: "8px 8px 0 rgba(50, 12, 64, 0.1)"
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// FRIENDSHIPS SECTION
// ─────────────────────────────────────────────────────────────────────

function initFriendshipAnimations() {
  const friendProfiles = document.querySelectorAll(".friend-profile");
  const friendPhotos = document.querySelectorAll(".friend-photo-side img");

  // Friend profile cards: staggered entrance with rotation
  friendProfiles.forEach((profile, i) => {
    const isEven = i % 2 === 0;
    gsap.from(profile, {
      scrollTrigger: {
        trigger: profile,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      duration: 0.8,
      opacity: 0,
      x: isEven ? -60 : 60,
      rotationZ: isEven ? -1.5 : 1.5,
      ease: "power3.out"
    });
  });

  // Friend photos: fade + scale with stagger
  friendPhotos.forEach((photo, i) => {
    gsap.from(photo.closest(".friend-photo-side"), {
      scrollTrigger: {
        trigger: photo.closest(".friend-profile"),
        start: "top 83%",
        toggleActions: "play none none reverse"
      },
      duration: 0.7,
      opacity: 0,
      scale: 0.85,
      stagger: 0.1,
      ease: "back.out",
      delay: 0.15
    });
  });

  // Friend photo hover: zoom + border glow
  friendPhotos.forEach((photo) => {
    const container = photo.closest(".friend-photo-side");
    container.addEventListener("mouseenter", () => {
      gsap.to(photo, { scale: 1.1, duration: 0.5, ease: "power2.out" });
      gsap.to(container, {
        boxShadow:
          "8px 8px 0 rgba(163, 42, 214, 0.3), inset 0 0 0 2px rgba(163, 42, 214, 0.4)",
        duration: 0.4
      });
    });
    container.addEventListener("mouseleave", () => {
      gsap.to(photo, { scale: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(container, {
        boxShadow: "8px 8px 0 rgba(50, 12, 64, 0.12)",
        duration: 0.4
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS SECTION
// ─────────────────────────────────────────────────────────────────────

function initAchievementAnimations() {
  const achievementCards = document.querySelectorAll(".achievement-card");

  // Achievement heading animation
  gsap.from(
    document.querySelector(".school-achievements-section h2"),
    {
      scrollTrigger: {
        trigger: document.querySelector(".school-achievements-section"),
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      duration: 0.7,
      opacity: 0,
      y: -20,
      ease: "power2.out"
    }
  );

  // Achievement cards: scale + rotate entrance with stagger
  gsap.from(achievementCards, {
    scrollTrigger: {
      trigger: document.querySelector(".achievement-wall"),
      start: "top 82%",
      toggleActions: "play none none reverse"
    },
    duration: 0.8,
    opacity: 0,
    scale: 0.8,
    rotationZ: gsap.utils.distribute({
      amount: 4,
      from: "center",
      ease: "sine.inOut"
    }),
    stagger: 0.12,
    ease: "back.out"
  });

  // Achievement icons: pop entrance
  document.querySelectorAll(".achievement-icon").forEach((icon, i) => {
    gsap.from(icon, {
      scrollTrigger: {
        trigger: achievementCards[i],
        start: "top 82%",
        toggleActions: "play none none reverse"
      },
      duration: 0.6,
      scale: 0,
      ease: "back.out",
      delay: 0.15 + i * 0.12
    });
  });

  // Achievement cards hover: scale up + shadow
  achievementCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        y: -8,
        duration: 0.35,
        ease: "power2.out"
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// AMBITION SHIFT SECTION
// ─────────────────────────────────────────────────────────────────────

function initAmbitionShiftAnimations() {
  const ambitionSection = document.querySelector(".school-ambition-shift-section");
  const ambitionColumn = document.querySelector(".ambition-shift-column");
  const ambitionPhoto = document.querySelector(".ambition-shift-photo-block");
  const valuesList = document.querySelector(".values-list");
  const valuesItems = document.querySelectorAll(".values-list li");

  // Ambition column: slide from left
  gsap.from(ambitionColumn, {
    scrollTrigger: {
      trigger: ambitionSection,
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    duration: 0.9,
    opacity: 0,
    x: -50,
    ease: "power3.out"
  });

  // Ambition photo: fade + scale from right
  gsap.from(ambitionPhoto, {
    scrollTrigger: {
      trigger: ambitionSection,
      start: "top 78%",
      toggleActions: "play none none reverse"
    },
    duration: 0.9,
    opacity: 0,
    x: 50,
    scale: 0.9,
    ease: "power3.out"
  });

  // Values list: slide in + reveal items
  gsap.from(valuesList, {
    scrollTrigger: {
      trigger: valuesList,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    y: 20,
    ease: "power2.out"
  });

  gsap.from(valuesItems, {
    scrollTrigger: {
      trigger: valuesList,
      start: "top 84%",
      toggleActions: "play none none reverse"
    },
    duration: 0.6,
    opacity: 0,
    x: -20,
    stagger: 0.08,
    ease: "power2.out"
  });

  // Values items hover: shift x
  valuesItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(item, { x: 10, duration: 0.3, ease: "power2.out" });
    });
    item.addEventListener("mouseleave", () => {
      gsap.to(item, { x: 0, duration: 0.3, ease: "power2.out" });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// REFLECTION SECTION
// ─────────────────────────────────────────────────────────────────────

function initReflectionAnimations() {
  const reflectionSection = document.querySelector(".school-reflection-section");
  const reflectionQuote = document.querySelector(".reflection-quote");
  const reflectionWords = document.querySelector(".reflection-final-words");

  // Quote fade + scale with rotation
  gsap.from(reflectionQuote, {
    scrollTrigger: {
      trigger: reflectionSection,
      start: "top 82%",
      toggleActions: "play none none reverse"
    },
    duration: 0.9,
    opacity: 0,
    scale: 0.95,
    rotationZ: -2,
    ease: "power2.out"
  });

  // Final words paragraphs: line-by-line approach
  const paragraphs = document.querySelectorAll(".reflection-final-words p");
  gsap.from(paragraphs, {
    scrollTrigger: {
      trigger: reflectionWords,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    y: 15,
    stagger: 0.15,
    ease: "power2.out"
  });
}

// ─────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────

function initCtaAnimations() {
  const ctaSection = document.querySelector(".school-nav-section");
  const ctaHeading = document.querySelector(".school-nav-section h2");
  const ctaButtons = document.querySelectorAll(".nav-cta-button");

  // CTA heading
  gsap.from(ctaHeading, {
    scrollTrigger: {
      trigger: ctaSection,
      start: "top 90%",
      toggleActions: "play none none reverse"
    },
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: "power2.out"
  });

  // CTA buttons: scale entrance with rotation
  gsap.from(ctaButtons, {
    scrollTrigger: {
      trigger: ctaSection,
      start: "top 88%",
      toggleActions: "play none none reverse"
    },
    duration: 0.7,
    opacity: 0,
    scale: 0.8,
    rotationZ: (i) => (i % 2 === 0 ? -2 : 2),
    stagger: 0.15,
    ease: "back.out"
  });

  // Button hover effects
  ctaButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.08,
        y: -4,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────
// INIT ALL
// ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initIntroSequence();
  initPrimarySchoolAnimations();
  initHighSchoolAnimations();
  initFriendshipAnimations();
  initAchievementAnimations();
  initAmbitionShiftAnimations();
  initReflectionAnimations();
  initCtaAnimations();
});
