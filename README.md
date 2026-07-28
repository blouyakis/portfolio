# Bobbi Louyakis — Portfolio

Personal portfolio site for Bobbi Louyakis — full-stack developer, mariner, and EMT
on the South Coast of Massachusetts.

Built as a static site with no framework, no build step, and no dependencies:
HTML5, CSS3, and vanilla ES6 JavaScript.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Overview, projects, skills, grant work, experience, service, education, contact |
| `grant.html` | Massachusetts Clean Energy Center training grant — what it covers and how to apply |
| `projects/gardenbook.html` | Full-stack garden planning app (Node, Express, MongoDB, React 19) |
| `projects/cashin.html` | Android personal finance app (Kotlin, Jetpack Compose, Firebase) |
| `projects/agenda-agent.html` | Meeting agenda generator (Node, Express, MongoDB Atlas) |

## Running it locally

No build step is required. Either open the file directly:

```
open index.html
```

Or serve it, which gives you auto-reload on save:

```
live-server
```

## Structure

```
index.html            homepage
grant.html            grant program details
404.html              not-found page (GitHub Pages serves this automatically)
robots.txt            crawler policy, points at the sitemap
sitemap.xml           the five public URLs
projects/             one page per project
css/
  base.css            design tokens (color, type, spacing) and resets
  layout.css          page structure and components
  components.css      typography assignment and form/focus styles
js/main.js            scroll-spy navigation and the hero slideshow
assets/icons/         logo and favicon
assets/images/        hero photographs and the link-preview card
assets/images/projects/  web-sized screenshots for the project pages
assets/bobbi-louyakis-resume.pdf  linked from the contact section
```

Screenshot originals live in `assets/screenshots/` and are gitignored — they run
to tens of megabytes. Only the resized copies under `assets/images/projects/` are
committed.

## Notes

**Colors.** All values live as custom properties in `css/base.css`. The bright pink
`#F22D92` measures 3.55:1 against the page background, which clears WCAG AA for large
text only — it is used for the hero accent, the photo frame, and decoration, never for
body text. `#8C5270` carries interactive elements and `#A8356F` carries small labels;
both clear AA on every surface in the palette.

**Hero slideshow.** Add a photo by dropping a 1600×670 file in `assets/images/` and
adding one `<img class="hero-slide">` to the slideshow block in `index.html`. The
navigation dots, rotation, and deferred loading all derive from the number of images
present — there is no list to keep in sync. Only the first photo is fetched on load;
the rest attach their `src` when first shown. It pauses on hover, has an explicit
Pause control (WCAG 2.2.2), and honors `prefers-reduced-motion`.

**Link previews.** Each page carries Open Graph tags and a canonical URL. `og:image`
must be an absolute URL, so those point at `https://blouyakis.github.io/portfolio/…`
— if the site ever moves to a custom domain, update the URLs in the five page heads,
`sitemap.xml`, `robots.txt`, and the root-relative paths in `404.html`.

## License

The source code is MIT licensed — see [LICENSE](./LICENSE).

The photographs, logo, and written content are © 2026 Bobbi Louyakis, all rights
reserved, and are not covered by that license.
