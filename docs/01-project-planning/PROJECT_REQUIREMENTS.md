# Project Requirements: Aayush Panchal Portfolio

> **Document Status:** APPROVED  
> **Standard:** IEEE 830 / Modern Product Requirement Specification (PRD)  
> **Version:** 1.0.0  

---

## 1. Functional Requirements (FR)

### Section 1: Preloader & Initialization
- **FR-001 [Preloader Engine]:** The website must display a lightweight, branded preloader featuring the typographic wordmark `AAYUSH PANCHAL` and a real-time asset loading progress indicator.
- **FR-002 [Non-Blocking Exit]:** The preloader must dismiss smoothly via a GSAP exit animation once critical DOM elements and Google Fonts have resolved, never artificially delaying the user beyond 800ms on fast connections.
- **FR-003 [Prefers-Reduced-Motion Bypass]:** If `prefers-reduced-motion: reduce` is active, the preloader must dismiss immediately without transition delay.

### Section 2: Hero & Interactive System Node Engine
- **FR-004 [Hero Header & Narrative]:** Must present primary headline `ENGINEERING DIGITAL EXPERIENCES.`, brand positioning subhead, and a live availability badge (e.g. `● AVAILABLE FOR OPPORTUNITIES`).
- **FR-005 [Interactive System Architecture Visualizer]:** The hero centerpiece must render an interactive SVG/Canvas node network representing Aayush's core technical ecosystem:
  - Central Core: `AAYUSH PANCHAL (CORE ENGINE)`
  - Satellites: `Frontend Engineering`, `Backend Systems`, `Database Architecture`, `AI & Automation`, `Cloud & Deployment`.
- **FR-006 [Node Physics & Telemetry]:**
  - Nodes must respond to cursor repulsion and attraction.
  - Periodic glowing energy packets must travel along connecting splines between nodes.
  - Clicking a node must trigger a telemetry tooltip revealing stack details, throughput/protocols, and relevant projects.
- **FR-007 [Hero Action Triggers]:** Must provide primary CTA (`Explore My Work` -> smooth scrolls to `#work`) and secondary CTA (`About Developer` -> smooth scrolls to `#about`).

### Section 3: Navigation & Global Overlays
- **FR-008 [Sticky Glassmorphic Navigation]:** A persistent top navigation bar displaying the typographic wordmark, section anchors (`ABOUT`, `EXPERTISE`, `WORK`, `JOURNEY`, `CONTACT`), audio toggle, and theme switch.
- **FR-009 [Command Palette `Cmd+K` / `Ctrl+K`]:**
  - Must open via keyboard shortcut or floating trigger button.
  - Supports fuzzy search across sections, projects, case studies, and actions.
  - Allows quick-switching themes, toggling Developer Inspector Mode, toggling micro-audio, and downloading the resume.
- **FR-010 [Developer Inspector HUD]:** When activated via the Command Palette, displays an overlay showing live rendering FPS, DOM node count, viewport dimensions, and active scroll coordinates.

### Section 4: About & Technical Expertise
- **FR-011 [About Narrative]:** Section headline `I THINK IN SYSTEMS. I BUILD WITH PURPOSE.` presenting personal engineering philosophy, computer science background, and direct Resume PDF download.
- **FR-012 [Categorized Expertise Matrix]:** Four distinct technical domains rendered as structured engineering cards:
  1. `01 — Frontend Engineering` (HTML5, CSS3, ES6+, Responsive Design, GSAP, Interaction Architecture).
  2. `02 — Backend Engineering` (Node.js, REST APIs, Authentication, RBAC, Business Logic, API Integration).
  3. `03 — Database Architecture` (PostgreSQL, Supabase, Firebase, Schema Design, Data Modeling).
  4. `04 — AI & Deployment` (AI-Assisted Workflows, Codex, Antigravity, Git, Vercel, Render).

### Section 5: Selected Work & Deep-Dive Case Studies
- **FR-013 [Horizontal Cinematic Project Gallery]:** On desktop viewports (>=1024px), scrolling `#work` triggers a pinned horizontal scroll experience showcasing the 4 core projects:
  1. *Place Your Service* (Full-Stack / SaaS AC Management Platform: Supabase, PostgreSQL, Node.js, Vercel/Render)
  2. *Extreme Sales & Services* (Enterprise HVAC Sales, Servicing & Dispatch System: Firebase, Node.js, Render/Vercel)
  3. *AI Café* (Cinematic AI Beverage Commerce Platform: 192-frame canvas, Gemini AI Barista V2, Firestore)
  4. *Nexa Bank* (Full-Stack Loan Management Web Platform: Express.js, PostgreSQL migrations, JWT authentication, Admin portal)
- **FR-014 [Mobile Native Carousel Fallback]:** On mobile and tablet viewports (<1024px), the project gallery falls back to smooth, touch-friendly native horizontal scrolling with snap points.
- **FR-015 [Deep-Dive Case Study Drawer]:** Clicking "View Case Study" opens a full-height accessible slide-over drawer featuring:
  - Project Overview, Problem Statement, Objectives, and Personal Contributions.
  - Interactive Architecture Diagram (Client → API → DB).
  - Engineering Trade-offs Matrix (Option A vs Option B rationale).
  - Tabbed syntax-highlighted code snippet viewer.
  - Verified demo link and repository link (or clearly marked concept badge).

### Section 6: Journey, Philosophy & Contact
- **FR-016 [Development Journey Timeline]:** Headline `LEARNING. BUILDING. IMPROVING.` displaying a chronological milestone timeline with category filter pills (`All`, `Education`, `Projects`, `Milestones`).
- **FR-017 [Philosophy Process Flowchart]:** Headline `GOOD SOFTWARE IS MORE THAN GOOD CODE.` featuring an interactive 4-stage process diagram: `Discover` → `Design` → `Develop` → `Deliver`.
- **FR-018 [Contact Gateway]:** Headline `LET'S TURN YOUR NEXT IDEA INTO SOMETHING REAL.` providing direct email, LinkedIn, GitHub, Resume download, and a validated contact form integrated with a headless form endpoint.

---

## 2. Non-Functional Requirements (NFR)

### Performance & Efficiency
- **NFR-001 [Lighthouse Scores]:** Must achieve 95+ in Performance, 98+ in Accessibility, 100 in Best Practices, and 100 in SEO on production builds.
- **NFR-002 [Frame Rate]:** All CSS transitions, SVG particle flows, and GSAP scroll triggers must maintain a consistent 60fps on modern standard hardware.
- **NFR-003 [Zero Layout Shifts]:** Cumulative Layout Shift (CLS) must remain below 0.02. Explicit aspect ratios must be applied to all media containers.

### Accessibility (a11y)
- **NFR-004 [WCAG 2.1 AA Compliance]:** All text and interactive states must satisfy minimum contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components).
- **NFR-005 [Keyboard Navigation]:** All interactive elements must be accessible via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`). Focus traps must be enforced inside active modals and drawers.
- **NFR-006 [Screen Readers]:** Meaningful ARIA roles (`role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-expanded`) must be properly managed dynamically via JavaScript.

### Responsive Design & Cross-Browser Compatibility
- **NFR-007 [Viewport Support]:** Seamless visual hierarchy and zero horizontal clipping across:
  - Mobile Small: 320px - 374px
  - Mobile Medium/Large: 375px - 767px
  - Tablet: 768px - 1023px
  - Standard Desktop: 1024px - 1439px
  - Large Desktop / Ultra-wide: 1440px - 2560px+
- **NFR-008 [Browser Compatibility]:** Flawless operation in Chrome, Safari, Firefox, Edge, and iOS/Android mobile browsers.

---

## 3. Requirement Traceability Matrix

| ID | Module | Implementation Target | Verification Method |
|---|---|---|---|
| FR-001 - 003 | Preloader | `js/main.js`, `css/components.css` | Cold reload throttling tests |
| FR-004 - 007 | Hero & Node Engine | `js/hero-visual.js`, `css/layout.css` | Interactive physics & click tests |
| FR-008 - 010 | Nav & Command Palette | `js/navigation.js`, `js/command-palette.js` | Keyboard shortcut & HUD tests |
| FR-011 - 012 | About & Expertise | `index.html`, `css/components.css` | Content audit & visual review |
| FR-013 - 015 | Work & Case Studies | `js/projects.js`, `css/components.css` | GSAP horizontal scroll & modal test |
| FR-016 - 018 | Journey & Contact | `js/journey.js`, `js/main.js` | Timeline filtering & form test |
| NFR-001 - 008 | Quality & a11y | Global CSS / JS | Lighthouse & aXe automated audit |

