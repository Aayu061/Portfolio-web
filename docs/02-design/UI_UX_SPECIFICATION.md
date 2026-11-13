# UI/UX Component Specifications

> **System:** Independent Technology Studio Interface  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  
> **Scope:** Detailed specifications for all 8 main sections, global overlays, and responsive breakpoints.  

---

## 1. Global Layout Grid & Navigation

### Persistent Header Navigation (`<header class="studio-header">`)
- **Structure:**
  - Left: Brand Wordmark `AAYUSH PANCHAL` (Space Grotesk, 700, 1rem uppercase with coordinate tag `[DEV.01]`).
  - Center: Desktop Nav Links (`ABOUT`, `EXPERTISE`, `WORK`, `JOURNEY`, `CONTACT`) with animated underline on active scroll spy.
  - Right: Utility Group:
    - Audio Synthesizer Toggle (`[MUTE / UNMUTE]` icon button).
    - Theme Switcher (`[SUN / MOON]` toggle button).
    - Command Palette Trigger (`Cmd+K` pill badge).
    - Mobile Hamburger button (visible `< 1024px`).
- **Behavior:** Glassmorphic background (`backdrop-filter: blur(16px)`), fixed at `top: 0`, shrinks height from 80px to 64px on scroll down.

---

## 2. Section 0: Branded Preloader

- **DOM Structure:** `<div class="preloader-overlay" role="progressbar" aria-label="Loading portfolio experience">`
- **Visuals:** Centered wordmark `AAYUSH PANCHAL` with glowing monospaced initialization telemetry:
  - `INITIALIZING STUDIO ENGINE...`
  - Dynamic progress counter: `[ 0% ]` -> `[ 100% ]`.
  - Minimalist 2px bottom progress rule.
- **Timing:** Listens to `window.addEventListener('load')` and resolves within 600ms–800ms. If cached, exits in under 300ms.
- **Exit Animation:** GSAP splits the preloader panels vertically (top and bottom curtains) revealing the Hero section beneath.

---

## 3. Section 1: Hero (`#home`)

```text
+-------------------------------------------------------------------------------+
| [DEV.01] AAYUSH PANCHAL       ABOUT  EXPERTISE  WORK  JOURNEY   [CMD+K] [THEME]|
+-------------------------------------------------------------------------------+
|                                                                               |
|  [● AVAILABLE FOR OPPORTUNITIES]                                               |
|                                                                               |
|  ENGINEERING DIGITAL                     +---------------------------------+  |
|  EXPERIENCES.                            |   [SVG/CANVAS NODE ENGINE]      |  |
|                                          |                                 |  |
|  "I design, develop and engineer modern  |         (FRONTEND)              |  |
|   digital products by combining          |            \                    |  |
|   creative thinking with technical       |        (AAYUSH CORE) - (BACKEND)|  |
|   execution."                            |            /                    |  |
|                                          |         (DATABASE)              |  |
|  [ Explore My Work -> ]  [ About Me ]    +---------------------------------+  |
|                                                                               |
|  SCROLL TO DISCOVER  |  01 // 07 ARCHITECTURE                                  |
+-------------------------------------------------------------------------------+
```

- **Interactive System Architecture Engine:**
  - Placed alongside the headline on desktop (two-column split), stacked above on tablet/mobile.
  - Interactive SVG canvas with a central pulsating hub (`AAYUSH PANCHAL - CORE ENGINE`) linked by dynamic bezier curves to 5 satellite nodes (`Frontend`, `Backend`, `Database`, `AI & Automation`, `Cloud & Edge`).
  - Cursor movement casts a slight gravitational force on nodes.
  - Glowing packets travel down curves every 1.5s.
  - Clicking any node opens a compact telemetry tooltip displaying protocols, stack tags, and related projects.

---

## 4. Section 2: About (`#about`)

- **Headline:** `I THINK IN SYSTEMS. I BUILD WITH PURPOSE.`
- **Layout:** Asymmetric 2-column layout:
  - Column 1: Editorial Portrait / Studio Visual with technical coordinate frame lines and live status indicators (`LOCATION: MUMBAI/REMOTE`, `ROLE: FULL-STACK DEVELOPER`, `FOCUS: MODERN WEB & APIS`).
  - Column 2: Personal bio narrative, computer science education foundation, and direct primary action: `[ Download Resume (PDF) ]`.

---

## 5. Section 3: Expertise Matrix (`#expertise`)

- **Headline:** `CAPABILITIES & TECHNICAL DISCIPLINES.`
- **Layout:** 4-card interactive grid (2x2 on desktop, 1-col on mobile):
  - **Card 01 // Frontend Engineering:** HTML5, CSS3, ES6+, Responsive Design, GSAP Animation, Canvas/SVG, WCAG Accessibility.
  - **Card 02 // Backend Engineering:** Node.js, Express, RESTful APIs, JWT Authentication, RBAC, Webhooks, Server Architecture.
  - **Card 03 // Database Architecture:** PostgreSQL, Supabase, Firebase, Relational Data Modeling, Query Optimization, RLS Policies.
  - **Card 04 // AI & Deployment:** AI-Assisted Workflows, OpenAI Codex, Antigravity, Git, GitHub Actions, Vercel, Render.
- **Card States:** Hovering elevates card by -4px, activates glowing border accent in Warm Peach (`#FFA586`), and displays technical proficiency level.

---

## 6. Section 4: Selected Work (`#work`) — Horizontal Cinematic Gallery

- **Desktop Experience (>=1024px):**
  - Section pins in place via GSAP ScrollTrigger. Vertical page scroll translates into smooth horizontal translation (`xPercent: -100 * (cards.length - 1)`).
  - Cards glide horizontally across the screen like cinematic widescreen film slides.
- **Project Cards (4 Featured Works):**
  1. **Place Your Service:** Production AC service management SaaS (Vercel frontend, Render backend, Supabase/PostgreSQL, immutable operational logs).
  2. **Extreme Sales & Services:** Enterprise HVAC servicing, contract lifecycle & dispatch platform (Firebase/Firestore, Render Node.js backend, live on Vercel).
  3. **AI Café:** Cinematic AI beverage platform (192-frame canvas, Gemini AI Barista V2 intent engine, Firestore catalog).
  4. **Nexa Bank:** Full-stack loan management platform (Express.js, PostgreSQL relational migrations, JWT auth, admin & customer portals).
- **Card Content:** Project index (`01 // 04`), category tag, title, 2-line summary, technology tags, and primary action: `[ View Case Study -> ]`.

---

## 7. Deep-Dive Case Study Slide-Over Drawer

- **Trigger:** Clicking `View Case Study` on any project card or searching in Command Palette.
- **UX Pattern:** Full-height slide-over drawer sliding in from the right (`width: min(850px, 92vw)`).
- **Background Backdrop:** Blur backdrop `rgba(0,0,0,0.6)` with click-to-dismiss.
- **Accessibility:** Focus is trapped inside the drawer; pressing `Escape` key closes the drawer and restores focus to the trigger button.
- **Drawer Contents:**
  1. Header: Project title, category badge, live links (Demo / Repo).
  2. Section 1: Problem Statement & Engineering Objectives.
  3. Section 2: Architecture Flow Diagram (Client → Auth Guard → API Gateway → DB).
  4. Section 3: Technical Trade-offs (Matrix comparing chosen technology vs alternative).
  5. Section 4: Interactive Code Highlights (Syntax-highlighted snippet tabs showing core logic).
  6. Section 5: Key Learnings & Outcomes.

---

## 8. Section 5: Development Journey (`#journey`)

- **Headline:** `LEARNING. BUILDING. IMPROVING.`
- **UX Pattern:** Vertical interactive timeline with filter pills (`All`, `Education`, `Projects`, `Milestones`).
- **Timeline Nodes:** Pulsing chronological cards with dates, organization/institution, accomplishments, and tech badges.

---

## 9. Section 6: Development Philosophy (`#philosophy`)

- **Headline:** `GOOD SOFTWARE IS MORE THAN GOOD CODE.`
- **UX Pattern:** 4-stage sequential flowchart:
  - `01. DISCOVER` — Deconstruct user requirements, constraints, and architecture.
  - `02. DESIGN` — Plan data models, interaction blueprints, and UX journeys.
  - `03. DEVELOP` — Write clean, performant, resilient code with zero bloat.
  - `04. DELIVER` — Test thoroughly, audit accessibility, optimize, and deploy.
- **Interaction:** Hovering or clicking any stage lights up the entire pipeline path with glowing energy pulses.

---

## 10. Section 7: Contact & Footer (`#contact`)

- **Headline:** `LET'S TURN YOUR NEXT IDEA INTO SOMETHING REAL.`
- **Components:**
  - Direct communication coordinates: Click-to-copy email (`aayushpanchal.dev@gmail.com`), GitHub, LinkedIn, Resume download.
  - Interactive Contact Form: Full Name, Email, Project Type, Message with real-time accessible validation.
  - Footer: Copyright, local time indicator (`MUMBAI, IN [IST]`), and back-to-top anchor.

---

## 11. Command Palette HUD (`Cmd+K` / `Ctrl+K`)

- **Trigger:** Keyboard shortcut or floating trigger.
- **UX Pattern:** Centered modal search box with blurred backdrop.
- **Features:**
  - Search input with instant keyboard navigation (`ArrowDown`, `ArrowUp`, `Enter`).
  - Grouped results: Navigation (`Jump to Work`, `Jump to About`), Case Studies (`Open Place Your Service`), System Tools (`Toggle Dark/Light Theme`, `Toggle Audio`, `Toggle Dev Inspector HUD`), Downloads (`Download Resume`).

