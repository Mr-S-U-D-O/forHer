if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const animateHeadingRow = (selector) => {
  if (!window.gsap || !window.ScrollTrigger) return;

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

  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  gsap.fromTo(
    ".page-container",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 },
  );

  gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .fromTo(
      ".nav-pill",
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.72, stagger: 0.1 },
    )
    .fromTo(
      ".hero-editorial > *",
      { opacity: 0, x: -45 },
      { opacity: 1, x: 0, duration: 0.9, stagger: 0.18 },
      "-=0.2",
    )
    .fromTo(
      ".stack-card",
      { opacity: 0, y: 24, rotate: (idx) => (idx === 0 ? -2 : 2) },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.95,
        stagger: 0.14,
        ease: "back.out(1.2)",
      },
      "-=0.45",
    );

  gsap.utils.toArray(".story-transition span").forEach((line) => {
    gsap.fromTo(
      line,
      { scaleX: 0, opacity: 0.25, transformOrigin: "left center" },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1,
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

  [".inside-jokes", ".voice-notes", ".future-routes"].forEach(
    animateHeadingRow,
  );

  gsap.fromTo(
    ".joke-note",
    { opacity: 0, y: 32, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.84,
      stagger: 0.14,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".inside-jokes",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    ".board-photo",
    { opacity: 0, x: 25, scale: 0.96 },
    {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".inside-jokes",
        start: "top 76%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap.fromTo(
    ".chat-bubble",
    { opacity: 0, y: 22, x: (idx) => (idx % 2 === 0 ? -20 : 20) },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.75,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".voice-notes",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".pact-section",
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    })
    .fromTo(
      ".pact-copy > *",
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.14 },
    )
    .fromTo(
      ".pact-photo",
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.95, ease: "power3.out" },
      "-=0.45",
    );

  gsap.fromTo(
    ".route-card",
    { opacity: 0, y: 18, rotate: (idx) => (idx % 2 === 0 ? -1 : 1) },
    {
      opacity: 1,
      y: 0,
      rotate: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".future-routes",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    },
  );

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
      return raw.includes("-") ? raw.split("-")[1].trim() : raw;
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
});
