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
