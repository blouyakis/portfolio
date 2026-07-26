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

  // These sit stacked in the viewport, so loading="lazy" would fetch them all
  // on first paint anyway. Hold the URL in data-src and attach it only once
  // the slide is first needed, so the hero costs one photo instead of four.
  slides.slice(1).forEach((slide) => {
    slide.dataset.src = slide.src;
    slide.removeAttribute("src");
  });

  const load = (slide) => {
    if (slide.dataset.src) {
      slide.src = slide.dataset.src;
      delete slide.dataset.src;
    }
  };

  const controls = document.createElement("div");
  controls.className = "slideshow-controls";

  const dots = document.createElement("div");
  dots.className = "slideshow-dots";
  dots.setAttribute("role", "group");
  dots.setAttribute("aria-label", "Choose a photo");

  const buttons = slides.map((slide, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slideshow-dot";
    dot.setAttribute("aria-label", `Show photo ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => {
      // Picking a photo is a deliberate choice — stop rotating for good, and
      // keep it stopped. Hovering away must not quietly restart it.
      stopped = true;
      syncToggle();
      go(i);
    });
    dots.append(dot);
    return dot;
  });

  // WCAG 2.2.2: anything that moves for more than five seconds needs a way to
  // stop it that doesn't depend on hovering.
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "slideshow-toggle";

  controls.append(dots, toggle);
  show.after(controls);

  let current = 0;
  let stopped = false; // set by the viewer; hover must never clear it
  let hovering = false; // transient, from pointer or focus

  const go = (next) => {
    current = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
      if (i === current) load(slide);
    });
    buttons.forEach((dot, i) =>
      dot.setAttribute("aria-current", i === current ? "true" : "false"),
    );
    // Warm the next one so the cross-fade has something to fade to.
    load(slides[(current + 1) % slides.length]);
  };

  const syncToggle = () => {
    toggle.textContent = stopped ? "Play" : "Pause";
    toggle.setAttribute(
      "aria-label",
      stopped ? "Play the photo slideshow" : "Pause the photo slideshow",
    );
  };

  toggle.addEventListener("click", () => {
    stopped = !stopped;
    syncToggle();
  });

  go(0);
  syncToggle();

  // Respect people who've asked the OS to reduce motion — they still get the
  // dots and the control, just no movement they didn't ask for.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stopped = true;
    syncToggle();
    return;
  }

  setInterval(() => {
    if (!stopped && !hovering) go(current + 1);
  }, SLIDE_INTERVAL);

  // Don't advance out from under someone reading or tabbing through it.
  show.addEventListener("mouseenter", () => (hovering = true));
  show.addEventListener("mouseleave", () => (hovering = false));
  controls.addEventListener("focusin", () => (hovering = true));
  controls.addEventListener("focusout", () => (hovering = false));
});
