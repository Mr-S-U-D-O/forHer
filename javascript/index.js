// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Set up initial GSAP timeline
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // 1. Animate the Main Container Border (draws it in)
  gsap.fromTo(
    ".page-container",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 },
  );

  // 2. Animate the Navigation Pills popping in one by one
  tl.fromTo(
    ".nav-pill",
    { opacity: 0, y: -20, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
  );

  // 3. Slide in the Hero Text (Title, Date, Desc)
  tl.fromTo(
    ".hero-content > *",
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 },
    "-=0.2", // Overlap slightly with the nav animation
  );

  // 4. Pop in the Hero Image
  tl.fromTo(
    ".hero-image",
    { opacity: 0, scale: 0.8, rotation: -5 },
    { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
    "-=0.4",
  );

  // 5. Slide out the offset backdrop behind the image
  tl.fromTo(
    ".hero-image-backdrop",
    { top: 0, left: 0 },
    { top: 20, left: 20, duration: 0.5 },
    "-=0.5",
  );

  // Interactive Hover Animation for the Image
  const imgWrapper = document.querySelector(".hero-image-wrapper");
  const backdrop = document.querySelector(".hero-image-backdrop");

  imgWrapper.addEventListener("mouseenter", () => {
    gsap.to(backdrop, { top: 30, left: 30, duration: 0.3, ease: "power2.out" });
  });

  imgWrapper.addEventListener("mouseleave", () => {
    gsap.to(backdrop, { top: 20, left: 20, duration: 0.3, ease: "power2.out" });
  });
});


// Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    // --- SECTION 2 ANIMATIONS --- //
    
    const journeyTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".journey-section",
            start: "top 75%", // Triggers when the top of the section hits 75% down the viewport
            toggleActions: "play none none reverse" // Plays on scroll down, reverses on scroll back up
        }
    });

    // 1. Reveal the tall image stretching up
    journeyTl.fromTo(".journey-image-tall",
        { opacity: 0, clipPath: "inset(100% 0 0 0)" }, // Starts clipped to the bottom
        { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out" }
    );

    // 2. Slide in the text content
    journeyTl.fromTo(".journey-content > h2, .journey-content > p",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" },
        "-=0.8" // Overlap with image reveal
    );

    // 3. Pop in the small image with a slight rotation
    journeyTl.fromTo(".journey-image-small",
        { opacity: 0, scale: 0.8, rotation: 5 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.4"
    );

    // Hover effect for the small image
    const smallImage = document.querySelector(".journey-image-small");
    smallImage.addEventListener("mouseenter", () => {
        gsap.to(smallImage, { rotation: -3, scale: 1.02, duration: 0.3 });
    });
    smallImage.addEventListener("mouseleave", () => {
        gsap.to(smallImage, { rotation: 0, scale: 1, duration: 0.3 });
    });

    // --- SECTION 3 ANIMATIONS --- //
    
    const galleryTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".gallery-section",
            start: "top 75%", 
            toggleActions: "play none none reverse"
        }
    });

    // 1. Animate the Heading Text
    galleryTl.fromTo(".gallery-header .section-heading",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    // 2. Animate the Line stretching out next to the heading
    galleryTl.fromTo(".heading-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
        "-=0.3"
    );

    // 3. Stagger the grid items popping in
    // Using an elastic 'back' ease makes them bounce slightly when they appear
    const gridItems = gsap.utils.toArray(".grid-item");
    
    galleryTl.fromTo(gridItems,
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "back.out(1.2)" },
        "-=0.4"
    );

    // --- SECTION 4: TABS & ACCORDION LOGIC --- //

    // 1. Scroll Animations (Same as before)
    const highlightsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".highlights-section",
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });

    highlightsTl.fromTo(".section-header-row .section-heading", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".section-header-row .heading-line", { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.3")
      .fromTo(".sidebar-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 }, "-=0.5")
      .fromTo(".vertical-divider", { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, duration: 0.6 }, "-=0.4")
      .fromTo(".tab-pane.active .accordion-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

    // 2. Tab Switching Logic
    const tabTriggers = document.querySelectorAll(".sidebar-item");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            // Remove active class from all triggers
            tabTriggers.forEach(t => t.classList.remove("active"));
            // Add active class to clicked trigger
            trigger.classList.add("active");

            // Get target tab ID
            const targetId = trigger.getAttribute("data-tab");

            // Hide all panes
            tabPanes.forEach(pane => {
                pane.classList.remove("active");
            });

            // Show target pane
            const targetPane = document.getElementById(targetId);
            targetPane.classList.add("active");

            // Optional: Re-trigger GSAP animation for the newly shown accordion items
            gsap.fromTo(targetPane.querySelectorAll(".accordion-item"), 
                { opacity: 0, y: 15 }, 
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
            );
        });
    });

    // 3. Accordion Logic (Updated to handle items across all tabs)
    const allAccordionHeaders = document.querySelectorAll(".accordion-header");

    allAccordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const item = this.parentElement;
            const content = item.querySelector(".accordion-content");
            const inner = item.querySelector(".accordion-inner");
            const isOpen = item.classList.contains("is-open");
            const currentTab = item.closest(".tab-pane"); // Get the tab pane this item belongs to

            // Close other accordions *only within the same tab pane*
            currentTab.querySelectorAll(".accordion-item").forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains("is-open")) {
                    otherItem.classList.remove("is-open");
                    const otherContent = otherItem.querySelector(".accordion-content");
                    gsap.to(otherContent, { height: 0, duration: 0.4, ease: "power2.inOut" });
                }
            });

            // Toggle current accordion
            if (!isOpen) {
                item.classList.add("is-open");
                const targetHeight = inner.offsetHeight; 
                gsap.to(content, { height: targetHeight, duration: 0.4, ease: "power2.inOut" });
            } else {
                item.classList.remove("is-open");
                gsap.to(content, { height: 0, duration: 0.4, ease: "power2.inOut" });
            }
        });
    });