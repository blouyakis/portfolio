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
projects/             one page per project
css/
  base.css            design tokens (color, type, spacing) and resets
  layout.css          page structure and components
  components.css      typography assignment and form/focus styles
js/main.js            scroll-spy navigation and the hero slideshow
assets/icons/         logo and favicon
assets/images/        hero photographs
```

## Notes

**Colors.** All values live as custom properties in `css/base.css`. The bright pink
`#F22D92` measures 3.55:1 against the page background, which clears WCAG AA for large
text only — it is used for the hero accent, the photo frame, and decoration, never for
body text. `#8C5270` carries interactive elements and `#A8356F` carries small labels;
both clear AA on every surface in the palette.

**Hero slideshow.** Add a photo by dropping a 1600×670 file in `assets/images/` and
adding one `<img class="hero-slide">` to the slideshow block in `index.html`. The
navigation dots, rotation, and lazy-loading all derive from the number of images
present — there is no list to keep in sync. It pauses on hover and honors
`prefers-reduced-motion`.

## License

The source code is MIT licensed — see [LICENSE](./LICENSE).

The photographs, logo, and written content are © 2026 Bobbi Louyakis, all rights
reserved, and are not covered by that license.
