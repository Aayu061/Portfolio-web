# Changelog — Aayush Panchal Portfolio

All notable changes to the architecture, documentation, and codebase of this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.4.1] — 2026-11-13

### Fixed
- **Eliminated Hero Watermark & Availability Badge Outline Overlap**:
  - Restructured hero markup with `.hero-content-wrapper` to anchor `.hero-watermark` (`DEVELOPER`) strictly below `.hero-top-meta`, ensuring an automatic 45px+ vertical clearance gap under all viewport heights and aspect ratios.
  - Gave `.meta-avail-badge` a solid surface background (`var(--bg-card)`) with `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3)` and `z-index: 5` to prevent text or outline collisions with background typography.

## [2.4.0] — 2026-11-13

### Changed & Enhanced
- **Master Swiss Grid & Website Alignment Standardization**:
  - Unified header container width to match the main sections (`.container` bounded at `min(94vw, 1760px)`), producing an unbroken vertical datum line from the header wordmark down to the footer copyright.
  - Aligned hero column baselines (buttons, photo cutout, and stat stack) and contact section grid elements for optical symmetry across high-resolution displays.
- **Precision Scroll Progress Tracker**:
  - Engineered a 2px crimson/coral gradient scroll progress bar (`.scroll-progress-bar`) at the bottom edge of the sticky glassmorphic header, dynamically tracking scroll depth from 0% to 100%.
- **Platform-Aware Keyboard Shortcut Display**:
  - Added OS detection in `js/modules/command-palette.js` to render `Ctrl+K` for Windows/Linux and `⌘K` / `Cmd+K` for macOS in the command palette pill and input placeholders.
- **Live Mumbai IST Telemetry Clock**:
  - Integrated real-time Indian Standard Time clock (`MUMBAI, IN [HH:MM IST] • READY`) in the footer via `Intl.DateTimeFormat`, updating automatically every 30 seconds.
- **Pulsing Availability Radar Ping**:
  - Configured high-performance `@keyframes pulse-dot` radar ping across all `.indicator-dot` elements (hero availability pill, status badges), indicating active availability for internship and part-time developer roles.
- **Bento Section Architectural Micro-Tags & Card Elevation**:
  - Added monospaced numbered tags (`01 // ACADEMICS & TECH STACK`, `02 // ENGINEERING METHODOLOGY`, `03 // PHILOSOPHY & MANIFESTO`).
  - Added hover lifts (`transform: translateY(-4px)`), crimson border illumination, and deep drop shadows on bento and mockup cards.
- **Mobile Responsive Harmonization**:
  - Optimized layouts for screens `< 640px` and `< 480px`: vertically stacked top metadata items, fluid display font clamps, full-width mobile action buttons, and responsive footer links.

## [2.3.1] — 2026-11-13

### Fixed
- **Universal Cursor Suppression on Desktop**:
  - Enforced `cursor: none !important;` globally across `*, *::before, *::after, html, body` under `@media (pointer: fine)`.
  - Completely eliminated the default OS arrow/pointer cursor that previously leaked through when hovering over project cards, buttons, text nodes, and container elements while the custom HUD cursor is active.
- **Fixed Hero Cutout Photo Stability**:
  - Removed unwanted mouse hover scaling and translation from `js/modules/portrait.js`.
  - Added `pointer-events: none; user-select: none; transform: none !important; transition: none !important;` in `css/components.css` to permanently lock the authentic photo cutout in place without unintended zoom or shift artifacts.

## [2.3.0] — 2026-11-13

### Changed & Enhanced
- **Hero Top Meta Text Contrast Overhaul**:
  - Lowered the `.hero-watermark` position from `10%` to `17%` to eliminate the red-on-red background collision.
  - Made the left metadata (`B.SC. COMPUTER SCIENCE (SEM 6) // DEV // LVL.99`) crisp pure white (`#ffffff` / `var(--text-primary)`).
  - Encapsulated availability text in an illuminated badge pill (`.meta-avail-badge`) with an active green/coral indicator dot, providing 100% legibility across dark and light modes.
- **Removed Unused Audio Feature**:
  - Removed the procedural audio speaker button from the header navigation.
  - Safely removed the Web Audio synthesizer initialization from `js/main.js` and deprecated `js/modules/audio.js`.
- **Bespoke Custom Developer & Gamer Mouse Cursor**:
  - Implemented high-performance, dual-layer hardware-accelerated cursor (`.cursor-dot` + `.cursor-follower`) in `js/modules/cursor.js`.
  - Added smooth 60fps/120fps lerp follower physics, interactive hover expansions over clickable elements (`a`, `button`, `.project-card-editorial`, `input`), and tactile click micro-pulses.
  - Configured automatic bypass for touchscreens (`pointer: coarse`) and reduced motion preferences.

## [2.2.0] — 2026-11-13

### Changed & Enhanced
- **High-Contrast "Hello, I'm" Script in Dark Mode**:
  - Resolved low-contrast text visibility issue by mapping `.hero-intro-script` to `--hero-intro-color` (`#ff5376`) with a vibrant ambient glow (`0 0 20px rgba(255, 83, 118, 0.45)`) in Dark Mode, while retaining rich editorial crimson (`#D31027`) in Light Mode.
- **Programmer & Gamer Suited Hero Watermark**:
  - Replaced the generic `PORTFOLIO` watermark with the authoritative, bold title **`DEVELOPER`**, perfectly tailored to software and gaming culture.
  - Added telemetry badge `DEV // LVL.99` to the hero top metadata bar.
- **Full-Screen, Expansive & Flexible Layout**:
  - Expanded `.container` from a narrow `1360px` box to a fluid, full-screen architecture: `max-width: min(94vw, 1760px)`.
  - Upgraded `.hero-editorial-grid`, `.bento-section-editorial`, and `.contact-editorial-grid` to utilize dynamic CSS grid clamps, eliminating dead side gutters on wide monitors (1080p, 1440p, 4K) while remaining fluid across laptops, tablets, and phones.
- **Authentic Coding IDE Platform on Laptop Mockup**:
  - Replaced the generic HTML placeholder laptop screen with a photorealistic modern dark-themed VS Code coding IDE interface featuring colorful TypeScript/Node.js syntax highlighting, file explorer sidebar, active editor tabs (`server.ts`), and an integrated developer terminal running at the bottom.

## [2.1.0] — 2026-11-13

### Changed & Enhanced
- **Fresher & Internship/Part-Time Role Positioning**:
  - Replaced fabricated senior metrics (`3+ years experience`, `15+ projects completed`) with genuine fresher credentials:
    - `SEM 6` (Final Year B.Sc. Computer Science at Shri D.D. Vispute College, University of Mumbai, Class of 2027).
    - `4` (Production Full-Stack Web Applications).
    - `100%` (Available for Internship / Part-Time Roles).
  - Aligned hero top-meta, subtitle, and contact section calls-to-action to highlight immediate availability for internship and part-time developer positions.
- **Infinite Horizontal Loop Marquee Carousel**:
  - Separated combined projects into 4 standalone, distinct project cards:
    - `01` **Place Your Service** (AC & HVAC Operations SaaS)
    - `02` **Extreme Sales & Services** (Commercial HVAC Enterprise Platform)
    - `03` **AI Café** (Gemini-Powered Autonomous Barista)
    - `04` **Nexa Bank** (Full-Stack Loan & Financial SaaS)
  - Created zero-seam infinite horizontal marquee animation with soft gradient edge masks and buttery pause-on-hover / focus-within interactions.
  - Added full keyboard accessibility (`Enter` and `Space` triggers) for opening deep-dive case studies.
- **Deep Dark Mode & Light Mode Contrast Overhaul**:
  - Completely redesigned Light Mode tokens: converted hardcoded whites to dynamic `var(--text-primary)`, mapped card backgrounds to `var(--bg-card)` and `var(--bg-secondary)`.
  - Introduced `--watermark-color` and `--watermark-stroke` for an editorial outline `PORTFOLIO` watermark in Light Mode.
  - Preserved the solid Crimson Quote Card with signature brand red styling across all themes.
- **Authentic Cutout Presentation**:
  - Permanently removed AI-generated placeholder portrait and avatar.
  - Implemented borderless, box-free hero subject container using Aayush's authentic cutout image with subtle interactive tilt and depth.
- **Bug & Linter Elimination**:
  - Fixed GSAP CDN SRI hash mismatch in `index.html`.
  - Added SVG favicon to eliminate 404 console errors.
  - Added accessible `name` and `aria-label` to command search input.
  - 100% clean validation across `html-validate` with 0 errors and 0 warnings.

## [2.0.0] — 2026-11-13

### Changed & Redesigned
- **High-Impact Luxury Editorial Poster Design (Full Visual Transformation)**:
  - **Giant Red Backdrop Watermark:** Bold condensed `PORTFOLIO` title (`Bebas Neue`) spanning the hero width with signature crimson red glow.
  - **Hero Subject Overlap:** High-fashion studio editorial portrait of Aayush in a dark blazer with cinematic crimson rim lighting seamlessly overlapping the background typography.
  - **Editorial Hero Typography:** Cursive handwritten accent `Hello, I'm` (`Caveat`), giant condensed display name `AAYUSH PANCHAL`, subtitle, and 3-stat counter stack (`3+` Years Experience, `15+` Projects Completed, `100%` Commitment).
  - **Multi-Mode Portrait Switcher:** Interactive toggle cycling between Editorial Studio Blazer Portrait, Authentic Mirror Selfie Photo, and Stylized 3D Digital Avatar.
  - **Selected Projects Showcase:** 3 high-contrast cards with bold red indices `01`, `02`, `03` for *Place Your Service*, *Extreme Sales & Services*, and *AI Café & Nexa Bank*, wired directly to the deep-dive Case Study Drawer.
  - **Editorial Bento Grid:**
    - Column 1: `EDUCATION & SKILLS` with degree details and dark bordered skill pills.
    - Column 2: `WORK PROCESS` with 5-step numbered circular timeline (`01 Discover`, `02 Ideate`, `03 Design`, `04 Develop`, `05 Deliver`).
    - Column 3: Solid **Crimson Red Quote Card** with quotation marks, philosophical quote, script signature `Aayush`, and bottom action banner.
  - **Let's Work Together Section:** Bold headline, direct contact list, action button, and realistic dark laptop desk mockup (`assets/images/workspace_mockup.jpg`).
  - **Validation & Quality:** 100% clean `html-validate` with 0 errors and 0 warnings.

## [1.2.0] — 2026-11-13

### Added
- **Profile Portrait & 3D Avatar Switcher**:
  - Integrated high-resolution studio portrait photo ([assets/images/profile/aayush_portrait.jpg](file:///c:/Users/aayup/Desktop/Portfolio%20website/assets/images/profile/aayush_portrait.jpg)) into the About section portrait frame.
  - Generated and integrated a matching stylized 3D digital developer avatar ([assets/images/profile/aayush_avatar.jpg](file:///c:/Users/aayup/Desktop/Portfolio%20website/assets/images/profile/aayush_avatar.jpg)).
  - Implemented interactive dual-mode toggle switch (`View 3D Avatar ✦` / `View Real Photo ✦`) with smooth opacity scaling transitions, asset preloading, and procedural audio cues via [js/modules/portrait.js](file:///c:/Users/aayup/Desktop/Portfolio%20website/js/modules/portrait.js).
- **Interactive Resume PDF Preview Modal**:
  - Glassmorphic modal with embedded PDF viewer (`<object>` + `<iframe>`) for immediate in-browser reading of verified `Aayush_Panchal_Resume.pdf`.
  - Accessible focus trapping, keyboard navigation (`Escape` to close, `Tab` cycle), and procedural micro-audio cues.
  - Spotlight command palette integration: "Preview Resume (Interactive Document Viewer)".
  - Quick action buttons: "Open in Tab &nearr;", "Download PDF &darr;", and instant dismiss.

### Fixed
- Resolved all remaining VS Code linter and accessibility warnings:
  - Added accessible `<label>` and `title` to the anti-spam honeypot input satisfying `Microsoft Edge Tools (axe/forms)`.
  - Removed deprecated `-webkit-overflow-scrolling: touch;` in `css/responsive.css`.
  - Normalized `html` font scaling in `css/reset.css` to eliminate browser compatibility warnings in `Microsoft Edge Tools (compat-api/css)`.
  - Added `.hintrc` and configured `.vscode/settings.json` to disable obsolete Webhint noise.

## [1.1.0] — 2026-11-13

### Added
- Completed **Phase 1 to Phase 5 Full-Stack Implementation**:
  - CSS Architecture: `variables.css`, `reset.css`, `typography.css`, `themes.css`, `layout.css`, `components.css`, `animations.css`, `responsive.css`.
  - Core State & Event System: `js/core/event-bus.js`, `js/core/store.js`.
  - Feature Modules: `theme.js`, `audio.js`, `navigation.js`, `preloader.js`, `hero-visual.js`, `projects.js`, `command-palette.js`, `inspector.js`, `journey.js`, `contact.js`, `main.js`.
  - Semantic Markup: `index.html` with Schema.org JSON-LD and OpenGraph metadata.
  - Verified Data: `projects.json` with 4 verified projects (*Place Your Service*, *Extreme Sales & Services*, *AI Café*, *Nexa Bank*), `journey.json`, `skills.json`.
  - Production Config: `robots.txt`, `sitemap.xml`, `vercel.json` edge security headers.

## [1.0.0-docs] — 2026-11-13

### Added
- Established the **Universal Website Documentation Framework** across 6 core directories:
  - `01-project-planning/`: `PROJECT_BRIEF.md`, `PROJECT_REQUIREMENTS.md`, `SITEMAP.md`, `USER_FLOWS.md`.
  - `02-design/`: `DESIGN_DIRECTION.md`, `DESIGN_SYSTEM.md`, `UI_UX_SPECIFICATION.md`, `ANIMATION_GUIDELINES.md`.
  - `03-technical/`: `TECH_STACK.md`, `SYSTEM_ARCHITECTURE.md`, `FOLDER_STRUCTURE.md`, `DATA_MODEL.md`, `API_SPECIFICATION.md`.
  - `04-development/`: `IMPLEMENTATION_PLAN.md`, `CODING_STANDARDS.md`, `AI_INSTRUCTIONS.md`, `TASK_TRACKER.md`.
  - `05-quality/`: `TESTING_STRATEGY.md`, `ACCESSIBILITY.md`, `PERFORMANCE.md`, `SEO_STRATEGY.md`.
  - `06-deployment/`: `DEPLOYMENT_GUIDE.md`, `ENVIRONMENT_VARIABLES.md`, `RELEASE_NOTES.md`.
- Defined the **Independent Technology Studio** brand identity for Aayush Panchal:
  - 6-color system tokens (Midnight Navy, Deep Slate, Steel Slate, Warm Peach, Crimson Red, Burgundy).
  - Dual adaptive theme matrix (Midnight Navy dark mode / Warm White light mode).
  - High-impact studio enhancements: Interactive Architecture Node Engine, Developer Command Palette (`Cmd+K`), Inspector Mode HUD, Deep-Dive Case Study Drawers, and Procedural Web Audio synthesizer.
- Created root governance documentation: `README.md`, `AGENTS.md`, and `CHANGELOG.md`.

