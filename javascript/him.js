if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
  const navBracket = document.querySelector(".nav-bracket");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("primary-nav");
  const navLinks = document.querySelectorAll(".main-nav .nav-pill");

  const lockRoot = document.getElementById("vault-lock");
  const mainRoot = document.getElementById("vault-main");
  const form = document.getElementById("vault-form");
  const input = document.getElementById("vault-password");
  const feedback = document.getElementById("vault-feedback");
  const hintOutput = document.getElementById("hint-output");
  const hintButton = document.getElementById("hint-btn");
  const attemptDots = Array.from(
    document.querySelectorAll(".attempt-meter .dot"),
  );

  const moduleTabs = Array.from(document.querySelectorAll(".module-tab"));
  const modulePanels = Array.from(document.querySelectorAll(".module-panel"));

  // Change this value to set the private page password.
  const SECRET_PASSWORD = "myalways";
  const SESSION_KEY = "him-vault-unlocked";

  const hints = [
    "Hint 1: One word, all lowercase.",
    "Hint 2: It starts with 'm'.",
    "Hint 3: It ends with 'ways'.",
    "Hint 4: Think commitment language.",
  ];

  let attempts = 0;
  let hintIndex = 0;

  const setFeedback = (message, state) => {
    if (!feedback) return;
    feedback.textContent = message;

    feedback.style.background = "rgba(27, 74, 68, 0.08)";
    feedback.style.color = "var(--primary-color)";

    if (state === "error") {
      feedback.style.background = "rgba(158, 47, 33, 0.12)";
      feedback.style.color = "#7a2419";
    }

    if (state === "success") {
      feedback.style.background = "rgba(26, 112, 64, 0.14)";
      feedback.style.color = "#1a5d35";
    }
  };

  const updateAttemptMeter = () => {
    attemptDots.forEach((dot, idx) => {
      dot.classList.toggle("used", idx < attempts && attempts < 5);
      dot.classList.toggle("maxed", attempts >= 5);
    });
  };

  const revealNextHint = (auto = false) => {
    if (!hintOutput) return;

    if (hintIndex < hints.length) {
      hintOutput.textContent = hints[hintIndex];
      hintIndex += 1;
      return;
    }

    if (auto) {
      hintOutput.textContent =
        "No new hint left. Slow down, breathe, and try the phrase that means forever to you.";
    }
  };

  const unlockVault = () => {
    if (!lockRoot || !mainRoot) return;

    sessionStorage.setItem(SESSION_KEY, "1");
    setFeedback("Vault unlocked. Welcome to his private chapter.", "success");

    lockRoot.style.display = "none";
    mainRoot.hidden = false;

    if (window.gsap) {
      gsap.fromTo(
        ".vault-main",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );
    }
  };

  const activatePanel = (tab) => {
    const target = tab.getAttribute("data-panel");
    const panel = target ? document.getElementById(target) : null;
    if (!panel) return;

    moduleTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    modulePanels.forEach((item) => {
      const active = item === panel;
      item.classList.toggle("active", active);
      item.hidden = !active;
    });
  };

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    unlockVault();
  }

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

  if (hintButton) {
    hintButton.addEventListener("click", () => {
      revealNextHint();
    });
  }

  if (form && input) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const attempt = input.value.trim();

      if (attempt.length === 0) {
        setFeedback("Enter the passphrase first.", "error");
        return;
      }

      if (attempt === SECRET_PASSWORD) {
        unlockVault();
        return;
      }

      attempts += 1;
      updateAttemptMeter();
      setFeedback("Not yet. That passphrase is incorrect.", "error");

      if (window.gsap && lockRoot) {
        gsap.fromTo(
          lockRoot,
          { x: -7 },
          {
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            clearProps: "x",
          },
        );
      }

      if (attempts === 2 || attempts === 4) {
        revealNextHint(true);
      }

      if (attempts >= 5) {
        setFeedback(
          "Still locked. Take a breath and use the strongest hint before trying again.",
          "error",
        );
      }

      input.select();
    });
  }

  moduleTabs.forEach((tab) => {
    tab.addEventListener("click", () => activatePanel(tab));
  });

  if (window.gsap) {
    gsap.fromTo(
      ".page-container",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
    );

    gsap.fromTo(
      ".nav-pill",
      { opacity: 0, y: -15, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08 },
    );

    if (!mainRoot || mainRoot.hidden) {
      gsap.fromTo(
        ".vault-lock > *",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
      );
    }
  }
});
