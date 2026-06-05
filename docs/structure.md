# Portfolio Landing Page Architecture

## Theme: **Mechanical Intelligence**

A premium personal portfolio that reflects the intersection of:

* Mechanical Engineering
* CAD Automation
* Frontend Development
* Industrial Software Design

Instead of the usual "developer portfolio with particles," the site should feel like a sophisticated engineering workstation: dark, precise, elegant, and highly interactive.

---

# Technology Stack

| Purpose               | Technology                           |
| --------------------- | ------------------------------------ |
| Framework             | Vue 3                                |
| UI Framework          | Quasar                               |
| Build Tool            | Vite                                 |
| State Management      | Pinia                                |
| Main Animation Engine | Anime.js v4                          |
| Smooth Scrolling      | Lenis                                |
| Charts                | Vue3-ApexCharts                      |
| Icons                 | Iconify                              |
| Mobile Carousel       | Embla Carousel                       |
| Card Tilt Effect      | VanillaTilt.js                       |
| Syntax Highlighting   | PrismJS (optional for code snippets) |
| Styling               | SCSS + CSS Variables                 |

Anime.js v4 now includes built-in `scrambleText()` and `splitText()` utilities, making it suitable as the single animation library for the entire project. ([Anime.js][1])

Vue3-ApexCharts provides native Vue 3 integration with reactive updates and includes radar charts out of the box. ([GitHub][2])

---

# Visual Identity

## Colors

```css
--bg-primary: #070b08;
--bg-secondary: #101512;

--primary: #00ff88;
--primary-soft: #44ffaa;
--accent: #7dffca;

--text: #e4fff1;
--text-muted: #8ba698;

--glass: rgba(20, 25, 22, .55);
```

---

## Design Language

* Matte dark background
* Green neon accents
* Soft glassmorphism
* Industrial geometry
* PCB-inspired details
* Thin glowing borders
* Subtle animations only

---

# Application Structure

```text
App.vue

├── BackgroundLayer
├── NavigationBar
├── HeroSection
├── BiographySection
├── SoftSkillsSection
├── TechnicalSkillsSection
├── ExperienceSection
├── FeaturedProjectsSection
├── EngineeringGallerySection
├── ExternalLinksSection
├── ContactSection
└── FooterSection
```

---

# 1. BackgroundLayer.vue

Persistent fixed background.

```css
position: fixed;
inset: 0;
z-index: -100;
```

---

## Layer A — Animated Radial Gradient

Large radial gradients slowly move around the viewport.

Implementation:

* CSS radial-gradient
* Anime.js animating CSS variables

Motion should be extremely slow:

* Duration: 30–40 seconds
* Infinite alternate loop

---

## Layer B — PCB Circuit Network

Custom SVG overlay.

Example concept:

```text
────────┐
        ├──────┐
        │      │
────────┘      ├─────
               │
```

Small glowing pulses travel through the paths.

Implementation:

* SVG
* Anime.js motion paths

No particle engine is necessary.

---

## Layer C — Film Noise

Very subtle noise overlay.

Implementation:

* CSS repeating-linear-gradient

Opacity:

```css
0.015
```

No external library.

---

# 2. NavigationBar.vue

Desktop:

```text
Logo

Biography
Skills
Projects
Experience
Links
Contact
```

Mobile:

Fullscreen overlay navigation.

---

## Features

* Glass background
* Active section indicator
* Green underline animation
* Smooth scrolling

Libraries:

* Lenis
* Anime.js

---

# 3. HeroSection.vue

Occupies the entire first viewport.

```text
            [Logo]

      MADSON GERMANO

 Mechanical Engineer
 Frontend Developer
 Automation Specialist

 [GitHub]
 [LinkedIn]
 [Resume]

         ↓
```

---

## Main Title

Uses Anime.js `scrambleText()`.

Example transition:

```text
M4D50N G3RM4N0

MADSON GERMANO
```

The library supports configurable scramble characters and reveal directions. ([Anime.js][1])

---

## Subtitle

Rotating technology tags:

```text
Vue.js

Quasar

SolidWorks

Python

VBA

PLM

CAD Automation
```

Animated with Anime.js timelines.

---

## Mouse Cursor

Small glowing green dot.

Trailing animation implemented with:

* requestAnimationFrame
* CSS transforms

---

# 4. BiographySection.vue

Two-column desktop layout.

```text
[Photo]

                    2010
               CAD Designer

                    │

                    2012
          Mechanical Designer

                    │

                    2017
          Innovation Agent

                    │

                    2022
       Upwork Top Rated Plus

                    │

                  Today
```

---

## Timeline Animation

* Cards alternate left/right entrance
* Center line fills while scrolling

Libraries:

* Anime.js
* IntersectionObserver

---

# 5. SoftSkillsSection.vue

Instead of progress bars, use an interactive radar chart.

## Radar Chart

Categories:

* Leadership
* Communication
* Creativity
* Teamwork
* Adaptability
* Problem Solving

Library:

**Vue3-ApexCharts**

Benefits:

* Responsive
* SVG rendering
* Smooth animated transitions
* Native Vue integration

([ApexCharts.js][3])

---

## Floating Traits

Surrounding the chart:

```text
Leadership

Critical Thinking

Innovation

Ownership

Fast Learner

Mentoring

Adaptability

System Thinking
```

Hover effects:

* slight scaling
* neon glow

Animation:

Anime.js stagger.

---

# 6. TechnicalSkillsSection.vue

Organized by categories.

---

## Frontend

```text
Vue.js

Quasar

JavaScript

Electron

HTML/CSS
```

---

## Engineering

```text
SolidWorks

AutoCAD

SolidEdge

BIM

3D Printing
```

---

## Automation

```text
VBA

Python

REST APIs

Excel

Design Automation
```

---

## Skill Indicators

Circular SVG gauges.

```text
      95%

    Vue.js
```

Hover expands card and reveals:

```text
6 years experience

Large production systems

Commercial applications
```

Implementation:

* SVG
* Anime.js

No additional library required.

---

# 7. ExperienceSection.vue

Professional history represented as connected cards.

```text
+--------------------+

Invento

2010

+--------------------+

EKIPAR

2012

+--------------------+

Sangati Berga

2017

+--------------------+

Freelancer

2022
```

---

## Animations

* Cards slide upward
* Connection line grows
* Hover lift effect

Library:

Anime.js

---

# 8. FeaturedProjectsSection.vue

The main showcase area.

Grid layout:

```text
+-------------+
|    PDLM     |
+-------------+

+-------------+
| CAD Tools   |
+-------------+

+-------------+
| Portfolio   |
+-------------+

+-------------+
| Excel Apps  |
+-------------+
```

---

## Hover Effects

* Perspective tilt
* Animated border
* Green reflection
* Slight zoom

Library:

VanillaTilt.js

---

## Project Modal

Contains:

* Screenshots
* Overview
* Architecture
* Technologies
* Challenges
* GitHub
* Live Demo

Opening animation:

Anime.js timeline.

---

# 9. EngineeringGallerySection.vue

Dedicated section for engineering work.

Content examples:

* SolidWorks renders
* Blender renders
* Industrial assemblies
* Technical drawings
* 3D printed prototypes

Desktop:

CSS masonry grid.

Mobile:

Embla Carousel.

Hover:

Small 3D rotation.

Libraries:

* Embla Carousel
* VanillaTilt.js

---

# 10. ExternalLinksSection.vue

This section combines your professional presence with the products you've built.

---

## Professional Profiles

Cards for:

* GitHub
* LinkedIn
* Upwork
* Resume PDF

Each card contains:

* Thumbnail
* Brief description
* External link

---

## Developed Applications

Cards showcasing your own software.

Example:

```text
+----------------------------+

          PDLM

Product Lifecycle
Management System

     [Screenshot]

     View Project →

+----------------------------+
```

Possible entries:

* PDLM
* CAD Automation Toolkit
* Excel Engineering Suite
* Internal Manufacturing Tools
* Portfolio Applications

These should look like premium SaaS product cards rather than simple hyperlinks.

---

## Card Effects

* Border glow
* Slight image zoom
* Perspective tilt

Libraries:

* VanillaTilt.js
* Anime.js

---

# 11. ContactSection.vue

Terminal-inspired interface.

```text
> connect --target madson

STATUS:
AVAILABLE FOR FREELANCE

EMAIL:
xxxxx@gmail.com

GITHUB:
github.com/...

LINKEDIN:
linkedin.com/in/...
```

Animated blinking cursor.

Occasionally displays:

```text
> loading profile...
> connection established.
```

Animation:

Anime.js timeline.

---

# 12. FooterSection.vue

```text
Designed and developed by

Madson Germano

Mechanical Engineer
&
Frontend Developer

Vue + Quasar + Anime.js

© 2026
```

Logo performs a subtle pulse animation.

---

# Component Structure

```text
components/

background/
    BackgroundLayer.vue
    CircuitBoard.vue

hero/
    HeroSection.vue
    ScrambleTitle.vue

biography/
    BiographySection.vue
    TimelineCard.vue

skills/
    SoftSkillsSection.vue
    TechnicalSkillsSection.vue
    SkillGauge.vue
    RadarChart.vue

experience/
    ExperienceSection.vue
    ExperienceCard.vue

projects/
    FeaturedProjectsSection.vue
    ProjectCard.vue
    ProjectModal.vue

gallery/
    EngineeringGallerySection.vue

links/
    ExternalLinksSection.vue
    ExternalLinkCard.vue

contact/
    ContactSection.vue

layout/
    NavigationBar.vue
    FooterSection.vue
```

---

# Composables

```text
composables/

useLenis.js

useScrambleText.js

useSplitText.js

useCircuitAnimation.js

useMouseGlow.js

useIntersectionReveal.js

useSkillGauge.js
```

---

# Mobile Layout

## Hero

```text
Photo

Name

Subtitle

Buttons
```

---

## Timeline

Single centered vertical flow.

---

## Soft Skills

Radar chart centered.

Floating traits wrap below it.

---

## Technical Skills

Horizontal scroll cards.

---

## Projects

Single-column layout.

Swipeable with Embla Carousel.

---

# Small Premium Details

### Logo

A gear-shaped logo rotates slightly on hover.

---

### Background Interaction

Opening a project sends a green pulse through the SVG circuit network.

---

### Terminal Messages

Every 15–20 seconds, one message appears briefly:

```text
> compiling portfolio...

> loading CAD modules...

> synchronizing project data...

> rendering assembly...
```

---

# Final Library Map

| Feature                  | Library                   |
| ------------------------ | ------------------------- |
| UI                       | Quasar                    |
| Animations               | Anime.js                  |
| Text Scramble            | Anime.js `scrambleText()` |
| Text Splitting           | Anime.js `splitText()`    |
| Smooth Scrolling         | Lenis                     |
| Background PCB Animation | Custom SVG + Anime.js     |
| Soft Skills Radar Chart  | Vue3-ApexCharts           |
| Technical Skill Gauges   | Custom SVG + Anime.js     |
| Project Card Tilt        | VanillaTilt.js            |
| Mobile Galleries         | Embla Carousel            |
| Icons                    | Iconify                   |
| State                    | Pinia                     |
| Lazy Loading             | IntersectionObserver      |
| Styling                  | SCSS + CSS Variables      |

This architecture keeps the project lightweight, almost entirely open source, visually distinctive, and strongly aligned with your profile as both a senior mechanical engineer and a modern frontend developer.

[1]: https://animejs.com/documentation/text/scrambletext/?utm_source=chatgpt.com "scrambleText | Text | Documentation"
[2]: https://github.com/apexcharts/vue3-apexcharts?utm_source=chatgpt.com "apexcharts/vue3-apexcharts: 📊 Vue-3 component for ..."
[3]: https://apexcharts.com/vue-chart-demos/radar-charts/?utm_source=chatgpt.com "Vue Radar Charts Examples"
