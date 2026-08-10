# Vaibhav Shukla — Portfolio

A single-page, Awwwards-style portfolio built with Next.js, Framer Motion,
GSAP, and React Three Fiber (Three.js). Dual dark/light themes, a wireframe
3D "knowledge graph" hero, smooth-scroll (Lenis), scroll-driven reveals, and
a fully data-driven content layer sourced from the resume.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — theme tokens defined once in `globals.css`, dark/light via a `.dark` class
- **Framer Motion** — micro-interactions, magnetic buttons, page-level transitions
- **GSAP + ScrollTrigger + SplitText** — text reveals, the experience-timeline scroll progress
- **React Three Fiber / drei / Three.js** — the hero's wireframe icosahedron scene
- **Lenis** — smooth scrolling, synced to GSAP's ticker

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/                  # root layout, global CSS, page assembly
  components/
    layout/             # Navbar, Footer, Preloader, ThemeToggle, SmoothScroll, CustomCursor, Grain
    sections/           # Hero, About, Skills, Experience, Projects, Education, Contact
      hero/              # HeroCanvas (R3F), HeroScene, RoleCycler
      projects/          # ProjectCard, ProjectThumbnail (generative SVG visuals)
    ui/                 # Reveal text, Magnetic wrapper, Counter, Marquee, SectionHeading
  hooks/                # useMediaQuery, useThemeColors
  lib/                  # data.ts (all resume content), theme-context, lenis singleton, utils
```

## Content

All resume copy (experience, skills, projects, education, certifications,
contact links) lives in [`src/lib/data.ts`](src/lib/data.ts) — edit that file
to update copy anywhere on the site.

## Notes

- Project thumbnails are generative SVG placeholders (no live screenshots yet
  were available) — swap `ProjectThumbnail` for real images/GIFs per project
  whenever you have them.
- The contact form is intentionally just `mailto:` + social links — no
  backend required.
- Respects `prefers-reduced-motion` throughout (skips the preloader, 3D
  scene, cursor, and scroll-linked animations).
