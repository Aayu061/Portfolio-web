# Folder Structure & Directory Blueprint

> **Standard:** Clean Modular Separation of Concerns (Vanilla Web Standards)  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. Complete Directory Tree

```text
aayush-portfolio/
│
├── index.html                             # Single-page semantic HTML structure & meta entrypoint
├── robots.txt                             # Search engine crawler directives
├── sitemap.xml                            # XML sitemap for SEO discovery
│
├── README.md                              # Repository overview & documentation index
├── AGENTS.md                              # AI coding agent operational guidelines
├── CHANGELOG.md                           # Chronological record of updates & releases
│
├── docs/                                  # Universal Website Documentation Framework
│   ├── 01-project-planning/
│   │   ├── PROJECT_BRIEF.md
│   │   ├── PROJECT_REQUIREMENTS.md
│   │   ├── SITEMAP.md
│   │   └── USER_FLOWS.md
│   ├── 02-design/
│   │   ├── DESIGN_DIRECTION.md
│   │   ├── DESIGN_SYSTEM.md
│   │   ├── UI_UX_SPECIFICATION.md
│   │   └── ANIMATION_GUIDELINES.md
│   ├── 03-technical/
│   │   ├── TECH_STACK.md
│   │   ├── SYSTEM_ARCHITECTURE.md
│   │   ├── FOLDER_STRUCTURE.md
│   │   ├── DATA_MODEL.md
│   │   └── API_SPECIFICATION.md
│   ├── 04-development/
│   │   ├── IMPLEMENTATION_PLAN.md
│   │   ├── CODING_STANDARDS.md
│   │   ├── AI_INSTRUCTIONS.md
│   │   └── TASK_TRACKER.md
│   ├── 05-quality/
│   │   ├── TESTING_STRATEGY.md
│   │   ├── ACCESSIBILITY.md
│   │   ├── PERFORMANCE.md
│   │   └── SEO_STRATEGY.md
│   └── 06-deployment/
│       ├── DEPLOYMENT_GUIDE.md
│       ├── ENVIRONMENT_VARIABLES.md
│       └── RELEASE_NOTES.md
│
├── assets/                                # Static media & downloadable assets
│   ├── docs/
│   │   └── Aayush_Panchal_Resume.pdf      # Direct downloadable resume
│   ├── images/
│   │   ├── hero/                          # Hero backdrop vectors & illustrations
│   │   ├── profile/                       # Professional portrait & personal visuals
│   │   └── projects/                      # High-res project previews & screenshots
│   │       ├── place-your-service/
│   │       ├── extreme-sales/
│   │       ├── ai-cafe/
│   │       └── formaspace/
│   ├── icons/                             # Custom SVG icons & favicon package
│   │   ├── favicon.ico
│   │   ├── icon-192.png
│   │   ├── icon-512.png
│   │   └── apple-touch-icon.png
│   └── data/                              # Static JSON data files
│       ├── projects.json                  # Case study content, trade-offs & code snippets
│       ├── journey.json                   # Milestones & educational timeline data
│       └── skills.json                    # Detailed capability breakdown
│
├── css/                                   # Modular CSS Architecture
│   ├── variables.css                      # Global tokens, color hexes, typography scales, spaces
│   ├── reset.css                          # Modern CSS reset & border-box normalization
│   ├── typography.css                     # Font definitions, fluid headings, line heights
│   ├── layout.css                         # CSS Grid systems, flex shells, section wrappers
│   ├── components.css                     # Cards, buttons, pills, tags, modal overlays, drawers
│   ├── themes.css                         # Dark ([data-theme="dark"]) & Light ([data-theme="light"])
│   ├── animations.css                     # Native CSS keyframes, transitions, hover transforms
│   └── responsive.css                     # Tablet & mobile media queries (<1024px, <768px, <480px)
│
└── js/                                    # Modular ES6 JavaScript
    ├── main.js                            # Application orchestrator & DOM initialization
    ├── core/
    │   ├── event-bus.js                   # Lightweight CustomEvent Pub/Sub bus
    │   └── store.js                       # Reactive state container (theme, audio, drawer)
    ├── modules/
    │   ├── preloader.js                   # Preloader progress & exit split animation
    │   ├── navigation.js                  # Sticky nav, scroll spy, smooth anchor scrolling
    │   ├── theme.js                       # Theme toggle, system listener, localStorage
    │   ├── hero-visual.js                 # Interactive SVG/Canvas system node architecture engine
    │   ├── command-palette.js             # Cmd+K spotlight search & developer tools HUD
    │   ├── projects.js                    # Horizontal pinned scroll & case study drawer manager
    │   ├── journey.js                     # Timeline milestone filtering & animations
    │   ├── audio.js                       # Procedural Web Audio API sound synthesizer
    │   ├── inspector.js                   # Real-time FPS, DOM node count & grid HUD
    │   └── contact.js                     # Form validation, rate limiting & submission gateway
```

---

## 2. File & Directory Responsibilities

| Directory | Primary Purpose | Maintenance Guidelines |
|---|---|---|
| `css/` | Pure styles divided by purpose. | Never write inline style blocks in HTML. All colors must use `var(--token)`. |
| `js/core/` | Global event handling and state storage. | Keep minimal; do not import DOM elements into core files. |
| `js/modules/` | Independent functional UI modules. | Each module exports `init()` and cleanup methods. Must subscribe to `eventBus`. |
| `assets/data/` | Structured JSON content. | Modifying project descriptions or journey items should occur here without touching HTML markup. |
| `docs/` | Single source of truth. | Keep synchronized across all development milestones. |

