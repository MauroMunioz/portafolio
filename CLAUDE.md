# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # eslint over the whole project
```

No test suite is configured.

## Architecture

Single-page portfolio built with Vite + React 18 (JS/JSX, not TypeScript). Styling is Tailwind CSS; animations use `framer-motion`; 3D scenes use `three` via `@react-three/fiber` and `@react-three/drei`. `react-router-dom`'s `BrowserRouter` wraps the app but there are no routes/pages — it's a single scrolling page assembled from sections.

**Page composition** — `src/App.jsx` renders one fixed sequence of section components: `Navbar`, `Hero`, `About`, `Experience`, `Tech`, `Works`, `Feedbacks`, `Contact`, `StarsCanvas`. All are re-exported through `src/components/index.js`, so import consumers from there, not the individual files.

**Section wrapper HOC** — `src/hoc/SectionWrapper.jsx` wraps a section component with a `motion.section`, applies shared `styles.padding`, and injects a `<span id={idName}>` used as a scroll anchor for `Navbar` links. Sections that should animate in and be scroll-linkable are exported as `SectionWrapper(Component, "idName")` rather than the raw component (see the bottom of files like `About.jsx`, `Tech.jsx`).

**Canvas components** — `src/components/canvas/` holds the three.js scenes (`Ball`, `Computers`, `Earth`, `Stars`), each a self-contained `@react-three/fiber` `<Canvas>` with its own `Suspense`/`Preload`/loading fallback (`Loader.jsx`). These are imported individually where used (e.g. `BallCanvas` inside `Tech.jsx`, `StarsCanvas` in `App.jsx`) and are the main source of runtime perf cost — avoid adding more full-screen canvases without checking mobile performance.

**Content data** — `src/constants/index.js` is the single source of truth for section content (`services`, `technologies`, `experiences`, `testimonials`, `projects`, `navLinks`). Components map over this data rather than hardcoding content; update this file to change site copy/projects instead of editing JSX.

**Assets** — all images/icons live in `src/assets/` and are re-exported through `src/assets/index.js`; import them from there (`import { reactjs, mongodb } from "../assets"`), matching the pattern already used in `constants/index.js`.

**Shared motion variants** — `src/utils/motion.js` exports variant factories (`textVariant`, `fadeIn`, `zoomIn`, `slideIn`, `staggerContainer`) consumed by `framer-motion`'s `variants` prop throughout components and `SectionWrapper`. Reuse these instead of writing new inline variants.

**Shared style tokens** — `src/styles.js` centralizes recurring Tailwind class strings (heading/subtext sizes, padding). Reference `styles.xxx` instead of repeating the class strings.

**Tailwind theme** — custom colors (`primary`, `secondary`, `tertiary`, `black-100/200`, `white-100`), the `card` box-shadow, and the `hero-pattern` background image are defined in `tailwind.config.js`; use these tokens rather than arbitrary hex values.
