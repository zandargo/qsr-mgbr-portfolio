# Portfolio Development Plan

This plan converts the architecture in `docs/structure.md` into small, implementation-friendly phases.

## Working Rules

- Keep each task small enough for one focused coding session.
- Prefer finishing one section end-to-end before starting the next.
- Validate visual behavior on desktop and mobile in every phase.
- Commit after each completed phase.

## Phase 1 - Foundation And Tooling

### Goals

- Confirm baseline app health.
- Install and wire all required libraries.
- Establish shared style tokens and base project structure.

### Subtasks

- [x] Run the app and verify current Quasar starter loads without errors.
- [x] Install dependencies: animejs, lenis, vue3-apexcharts, @iconify/vue, embla-carousel-vue, vanilla-tilt.
- [x] Decide if PrismJS is needed now; if yes, install prismjs, else defer. (Deferred for now.)
- [x] Create component folders from the architecture map under `src/components/`.
- [x] Create composable placeholders in `src/composables/`.
- [x] Add global CSS variables for colors and glass tokens in `src/css/app.scss`.
- [x] Add typography variables and spacing scale tokens.
- [x] Define reusable utility classes (glow border, glass panel, section container).
- [x] Verify no style regressions in the existing page.

### Acceptance

- App starts cleanly.
- Required libraries are installed.
- Base design tokens exist and are applied globally.

## Phase 2 - App Shell And Section Scaffolding

### Goals

- Build the full section skeleton in App.vue with stable IDs for navigation.

### Subtasks

- [x] Replace starter content in `src/App.vue` with section components in architecture order.
- [x] Add semantic section wrappers and IDs (hero, biography, soft-skills, technical-skills, experience, projects, gallery, links, contact).
- [x] Add temporary placeholder content in each component to validate layout flow.
- [x] Ensure section spacing and top offsets work for anchored scrolling.
- [x] Confirm render order and z-index layering support fixed background.

### Acceptance

- All section components render in one-page flow.
- Section IDs are stable and usable by navigation.

## Phase 3 - BackgroundLayer Core

### Goals

- Implement persistent multi-layer background.

### Subtasks

- [x] Create `BackgroundLayer.vue` with fixed full-screen container and negative z-index.
- [x] Implement Layer A radial gradients with CSS variables.
- [x] Animate gradient positions slowly with Anime.js (30-40s alternate loop).
- [x] Add Layer B scaffold using inline SVG paths for PCB network.
- [x] Add Layer C subtle film noise overlay with very low opacity.
- [x] Ensure pointer events are disabled for background layers.
- [x] Validate readability of foreground text over background.

### Acceptance

- Background is persistent, subtle, and non-distracting.
- Performance remains smooth on desktop and mobile.

## Phase 4 - Circuit Pulse Animation

### Goals

- Add moving pulses through PCB paths and expose trigger hooks.

### Subtasks

- [x] Create `CircuitBoard.vue` for SVG path definitions.
- [x] Build `useCircuitAnimation.js` composable.
- [x] Animate pulse elements along paths using Anime.js motion paths.
- [x] Add start/stop controls for lifecycle-safe mount/unmount.
- [x] Expose a method to trigger a pulse burst for project modal open.
- [ ] Verify animation CPU cost stays low.

### Acceptance

- Pulses move through PCB paths smoothly.
- Pulse burst can be triggered externally.

## Phase 5 - Navigation And Smooth Scrolling

### Goals

- Build desktop and mobile navigation with smooth section scroll.

### Subtasks

- [x] Create `NavigationBar.vue` with logo and section links.
- [x] Implement desktop glass navbar styling and active underline animation.
- [x] Implement mobile full-screen overlay menu.
- [x] Add open/close transitions for mobile menu.
- [x] Create `useLenis.js` and initialize Lenis once at app level.
- [x] Connect nav links to smooth scrolling with section offset handling.
- [x] Add active section tracking via IntersectionObserver.
- [x] Validate keyboard navigation and focus management for mobile menu.

### Acceptance

- Desktop and mobile navigation are fully functional.
- Smooth scrolling and active indicators work reliably.

## Phase 6 - Hero Section And Signature Animations

### Goals

- Build the hero as the visual anchor with scramble title and rotating tags.

### Subtasks

- [x] Create `HeroSection.vue` layout with logo, name, subtitle, CTA links, and scroll hint.
- [x] Create `ScrambleTitle.vue` and `useScrambleText.js` using Anime.js v4 utilities.
- [x] Configure scramble sequence from obfuscated text to final name.
- [x] Build subtitle rotating tech tags via Anime.js timeline.
- [x] Add social/action buttons with hover states and icon integration.
- [x] Build `useMouseGlow.js` for subtle cursor glow and trailing effect.
- [x] Add graceful fallback for touch devices (disable cursor effect).

### Acceptance

- Hero fills first viewport and animations run smoothly.
- CTA buttons and scroll hint are functional.

## Phase 7 - Biography Timeline

### Goals

- Create a two-column desktop timeline and centered mobile flow.

### Subtasks

- [ ] Create `BiographySection.vue` structure with photo area and timeline container.
- [ ] Create `TimelineCard.vue` with alternating left/right desktop layout.
- [ ] Add center vertical line and progressive fill element.
- [ ] Create `useIntersectionReveal.js` for reveal-on-scroll behaviors.
- [ ] Animate card entrance and line fill with Anime.js.
- [ ] Add responsive breakpoint behavior for single-column mobile timeline.
- [ ] Verify chronological readability and spacing.

### Acceptance

- Timeline reveals progressively and remains readable on mobile.

## Phase 8 - Soft Skills Radar Chart

### Goals

- Replace bars with animated radar chart and floating traits.

### Subtasks

- [ ] Register ApexCharts plugin for Vue 3.
- [ ] Create `RadarChart.vue` with configured radar options and series values.
- [ ] Create `SoftSkillsSection.vue` wrapper with heading and chart zone.
- [ ] Add responsive chart sizing rules.
- [ ] Add floating trait labels around the chart.
- [ ] Animate trait entrance with Anime.js stagger.
- [ ] Add hover glow/scale interactions for traits.

### Acceptance

- Radar chart renders with correct categories and responsive behavior.
- Floating traits animate and remain accessible.

## Phase 9 - Technical Skills Gauges

### Goals

- Build category-based cards with custom circular SVG gauges.

### Subtasks

- [ ] Create `TechnicalSkillsSection.vue` with Frontend, Engineering, Automation groups.
- [ ] Create reusable `SkillGauge.vue` using SVG circles and stroke-dashoffset.
- [ ] Create `useSkillGauge.js` for percent-to-path calculations.
- [ ] Add skill cards with years/context details hidden by default.
- [ ] Animate gauge fill on section enter.
- [ ] Add hover expand to reveal experience details.
- [ ] Implement horizontal scroll behavior on small screens.

### Acceptance

- Gauges animate correctly and hover reveals details.
- Mobile layout supports smooth horizontal scrolling.

## Phase 10 - Experience Connected Cards

### Goals

- Present work history as connected animated cards.

### Subtasks

- [ ] Create `ExperienceSection.vue` and `ExperienceCard.vue`.
- [ ] Implement connected line between cards.
- [ ] Animate cards sliding upward on reveal.
- [ ] Animate connection line growth synchronized with reveal.
- [ ] Add subtle hover lift and glow interaction.
- [ ] Validate spacing and card readability on narrow screens.

### Acceptance

- Experience cards animate in order and connection visuals are coherent.

## Phase 11 - Featured Projects Grid

### Goals

- Build premium project cards with tilt and interactive borders.

### Subtasks

- [ ] Create `FeaturedProjectsSection.vue` grid scaffold.
- [ ] Create reusable `ProjectCard.vue` with title, summary, tags, thumbnail.
- [ ] Integrate VanillaTilt on mount with safe destroy on unmount.
- [ ] Add border glow and reflection hover effects.
- [ ] Add responsive behavior: grid desktop, single-column mobile.
- [ ] Add keyboard-focus styles equivalent to hover intent.

### Acceptance

- Cards look premium and tilt effects are stable.
- Layout is responsive and accessible.

## Phase 12 - Project Modal Experience

### Goals

- Implement deep project detail modal with rich content sections.

### Subtasks

- [ ] Create `ProjectModal.vue` with Quasar dialog or custom overlay.
- [ ] Add content blocks: screenshots, overview, architecture, technologies, challenges, links.
- [ ] Build open and close timeline animations with Anime.js.
- [ ] Lock body scroll while modal is open.
- [ ] Wire open action from `ProjectCard.vue`.
- [ ] Trigger circuit pulse burst when modal opens.
- [ ] Add keyboard controls (escape to close, focus trap).

### Acceptance

- Modal opens smoothly, shows full project details, and is accessible.

## Phase 13 - Engineering Gallery

### Goals

- Showcase engineering media with masonry desktop and carousel mobile.

### Subtasks

- [ ] Create `EngineeringGallerySection.vue`.
- [ ] Add desktop masonry grid layout.
- [ ] Add mobile Embla carousel setup and controls.
- [ ] Add image metadata overlays (title/type/tools).
- [ ] Add subtle hover tilt and zoom for desktop items.
- [ ] Lazy-load images for performance.
- [ ] Validate touch gestures on mobile carousel.

### Acceptance

- Desktop and mobile gallery modes both work smoothly.

## Phase 14 - External Links And Product Cards

### Goals

- Build profile cards and SaaS-style product showcase cards.

### Subtasks

- [ ] Create `ExternalLinksSection.vue` and `ExternalLinkCard.vue`.
- [ ] Add profile cards: GitHub, LinkedIn, Upwork, Resume.
- [ ] Add developed application cards with richer product presentation.
- [ ] Apply tilt, image zoom, and glow interactions.
- [ ] Add clear external link CTAs with safe target attributes.
- [ ] Ensure card hierarchy and readability in mobile stacked layout.

### Acceptance

- Links section feels premium and supports external navigation clearly.

## Phase 15 - Contact Terminal Interface

### Goals

- Build terminal-style contact card with animated status lines.

### Subtasks

- [ ] Create `ContactSection.vue` terminal panel structure.
- [ ] Add static command/output lines for status, email, GitHub, LinkedIn.
- [ ] Add blinking cursor animation.
- [ ] Add periodic rotating system messages every 15-20 seconds.
- [ ] Animate text reveal using Anime.js timeline.
- [ ] Validate contrast and copy legibility.

### Acceptance

- Contact section matches terminal style and remains readable.

## Phase 16 - Footer And Branding Details

### Goals

- Complete footer identity and logo micro-interactions.

### Subtasks

- [ ] Create `FooterSection.vue` with final profile and stack line.
- [ ] Add subtle logo pulse animation.
- [ ] Add current year rendering.
- [ ] Ensure spacing and typography hierarchy.
- [ ] Verify footer behavior across breakpoints.

### Acceptance

- Footer is complete, polished, and responsive.

## Phase 17 - Performance, Accessibility, And Resilience

### Goals

- Improve runtime performance and ensure accessibility quality.

### Subtasks

- [ ] Audit animation frequency and reduce expensive effects.
- [ ] Add reduced-motion support and animation fallbacks.
- [ ] Ensure all images use dimensions and lazy loading where possible.
- [ ] Check color contrast for text and interactive states.
- [ ] Add keyboard focus states across all interactive elements.
- [ ] Validate ARIA labels for navigation, modal, and controls.
- [ ] Test on low-power mobile profile.

### Acceptance

- Good performance and baseline accessibility compliance.

## Phase 18 - Content Integration And Localization

### Goals

- Replace placeholder content with final personal/professional data.

### Subtasks

- [ ] Consolidate all personal data in a single config/data source.
- [ ] Wire i18n keys for all section text.
- [ ] Add and validate en-US content.
- [ ] Prepare optional second locale structure.
- [ ] Verify no hardcoded copy remains in components.

### Acceptance

- Content is centralized, editable, and localization-ready.

## Phase 19 - QA, PWA Build, And Deployment

### Goals

- Final verification and release readiness.

### Subtasks

- [ ] Run lint and build checks.
- [ ] Manually test desktop browsers and mobile viewport sizes.
- [ ] Validate anchor scrolling and modal interactions in production build.
- [ ] Run PWA build script and verify generated assets.
- [ ] Validate Firebase deploy script path and project config.
- [ ] Create release checklist and launch notes.

### Acceptance

- Production build passes and deployment path is verified.

## Optional Parallel Tracks

These can run in parallel after Phase 5:

- [ ] Track A: Gather and optimize images/screenshots/media assets.
- [ ] Track B: Prepare final copywriting for all sections.
- [ ] Track C: Define project card content model and JSON schema.
- [ ] Track D: Create favicon/app icon variants with IconGenie.

## Suggested Milestones

- Milestone 1: End of Phase 5 (foundation + shell + background + navigation).
- Milestone 2: End of Phase 10 (core content sections complete).
- Milestone 3: End of Phase 16 (all feature sections and branding complete).
- Milestone 4: End of Phase 19 (release-ready).
