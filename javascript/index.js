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

document.addEventListener("DOMContentLoaded", () => {
  const navBracket = document.querySelector(".nav-bracket");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("primary-nav");
  const navLinks = document.querySelectorAll(".main-nav .nav-pill");

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

  // Tabs: switch visible pane with entry animation.
  const tabTriggers = document.querySelectorAll(".sidebar-item");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      tabTriggers.forEach((t) => t.classList.remove("active"));
      trigger.classList.add("active");

      const targetId = trigger.getAttribute("data-tab");

      tabPanes.forEach((pane) => pane.classList.remove("active"));

      const targetPane = document.getElementById(targetId);
      if (!targetPane) return;

      targetPane.classList.add("active");

      gsap.fromTo(
        targetPane.querySelectorAll(".accordion-item"),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" },
      );
    });
  });

  // Accordion: one-open-at-a-time behavior scoped by tab pane.
  const allAccordionHeaders = document.querySelectorAll(".accordion-header");

  allAccordionHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const item = this.parentElement;
      const content = item.querySelector(".accordion-content");
      const inner = item.querySelector(".accordion-inner");
      const isOpen = item.classList.contains("is-open");
      const currentTab = item.closest(".tab-pane");

      if (!content || !inner || !currentTab) return;

      currentTab.querySelectorAll(".accordion-item").forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("is-open")) {
          otherItem.classList.remove("is-open");
          const otherContent = otherItem.querySelector(".accordion-content");
          if (otherContent) {
            gsap.to(otherContent, {
              height: 0,
              duration: 0.4,
              ease: "power2.inOut",
            });
          }
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");
        gsap.to(content, {
          height: inner.offsetHeight,
          duration: 0.4,
          ease: "power2.inOut",
        });
      } else {
        item.classList.remove("is-open");
        gsap.to(content, { height: 0, duration: 0.4, ease: "power2.inOut" });
      }
    });
  });
});
