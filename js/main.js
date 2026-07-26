const navLinks = Array.from(document.querySelectorAll(".nav-link"));

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActive = (id) => {
  navLinks.forEach((link) =>
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`),
  );
};

// Highlight immediately on click so the sidebar responds before the
// smooth scroll finishes.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActive(link.getAttribute("href").slice(1));
  });
});

// Then let scroll position take over. The margins define a band across the
// upper third of the viewport — whichever section is crossing it wins.
const observer = new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => setActive(entry.target.id));
  },
  { rootMargin: "-15% 0px -75% 0px" },
);

sections.forEach((section) => observer.observe(section));

// The final section is often too short to reach the band, so pin it once the
// page is scrolled to the bottom.
window.addEventListener("scroll", () => {
  const atBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

  if (atBottom && sections.length) {
    setActive(sections[sections.length - 1].id);
  }
});

if (sections.length) {
  setActive(sections[0].id);
}

// --- Hero slideshow -------------------------------------------------------
// Reads however many .hero-slide images are in the markup and builds the dots
// to match, so adding a photo means adding one <img> and nothing else.

const SLIDE_INTERVAL = 5000;

document.querySelectorAll("[data-slideshow]").forEach((show) => {
  const slides = Array.from(show.querySelectorAll(".hero-slide"));

  // One photo isn't a slideshow — leave it as a plain image.
  if (slides.length < 2) return;

  // Only the first slide needs to load right away.
  slides.slice(1).forEach((slide) => slide.setAttribute("loading", "lazy"));

  const dots = document.createElement("div");
  dots.className = "slideshow-dots";

  const buttons = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slideshow-dot";
    dot.setAttribute("aria-label", `Show photo ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => {
      show.dataset.paused = "true"; // a deliberate choice wins over the timer
      go(i);
    });
    dots.append(dot);
    return dot;
  });

  show.after(dots);

  let current = 0;

  const go = (next) => {
    current = (next + slides.length) % slides.length;
    slides.forEach((slide, i) =>
      slide.classList.toggle("is-active", i === current),
    );
    buttons.forEach((dot, i) =>
      dot.setAttribute("aria-current", i === current ? "true" : "false"),
    );
  };

  go(0);

  // Respect people who've asked the OS to reduce motion — they still get the
  // dots, just no movement they didn't ask for.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  setInterval(() => {
    if (show.dataset.paused !== "true") go(current + 1);
  }, SLIDE_INTERVAL);

  // Don't advance out from under someone reading or tabbing through it.
  const pause = () => (show.dataset.paused = "true");
  const resume = () => (show.dataset.paused = "false");

  show.addEventListener("mouseenter", pause);
  show.addEventListener("mouseleave", resume);
  dots.addEventListener("focusin", pause);
  dots.addEventListener("focusout", resume);
});
