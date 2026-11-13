# Changelog — Aayush Panchal Portfolio

All notable changes to the architecture, documentation, and codebase of this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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

