# Changelog — Aayush Panchal Portfolio

All notable changes to the architecture, documentation, and codebase of this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

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

