# Quality Assurance & Testing Strategy

> **Standard:** ISO/IEC/IEEE 29119 Software Testing Standard  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. Testing Scope & Quality Objectives

The testing strategy guarantees that the Aayush Panchal portfolio behaves flawlessly across diverse devices, browsers, operating systems, and network conditions without compromising performance or accessibility.

### Target Quality Gates
| Dimension | Acceptance Benchmark | Tool / Verification Procedure |
|---|---|---|
| **Rendering Performance** | 60fps steady animation; 0 layout thrashing | Chrome DevTools Performance Timeline |
| **Accessibility** | 100% WCAG 2.1 AA Compliance; zero critical aXe flags | axe DevTools / Lighthouse a11y |
| **Responsive Integrity** | Zero horizontal scroll overflow across 320px–2560px | Viewport Emulation (iPhone SE to 4K Desktop) |
| **Cross-Browser Parity** | Identical layout and interaction in Chrome, Firefox, Safari, Edge | BrowserStack / Native Multi-Browser Audits |
| **Keyboard Navigability** | 100% features accessible without mouse | Tab, Shift+Tab, Enter, Space, Escape traversal |

---

## 2. Testing Levels & Methodologies

### Level 1: Static Code Quality & Linting
- **HTML Semantics:** Automated W3C Markup Validation ensuring clean tag hierarchy, valid attribute names, and zero unclosed elements.
- **CSS Token Validation:** Verify that 100% of component styles reference CSS custom properties defined in `css/variables.css`.
- **JSON Schema Validation:** Validate `assets/data/projects.json` and `assets/data/journey.json` against defined JSON schemas in `docs/03-technical/DATA_MODEL.md`.

---

### Level 2: Component & Functional Verification

| Test ID | Component Under Test | Scenario & Execution Steps | Expected Outcome |
|---|---|---|---|
| **TC-001** | Theme Controller | Click theme switcher; toggle via Command Palette; reload page. | State updates instantly; `localStorage` preserves preference; no FOUC on reload. |
| **TC-002** | Hero Node Engine | Hover within 100px of nodes; click satellite node. | Spring physics pull gently; packet particles pulse; telemetry tooltip mounts correctly. |
| **TC-003** | Horizontal Gallery | Scroll page into `#work` on desktop (>=1024px). | Section pins; mouse wheel scrubs cards horizontally; snaps smoothly to card bounds. |
| **TC-004** | Case Study Drawer | Click 'View Case Study' on Project 01; press `Escape` key. | Drawer slides in from right; focus moves inside; pressing `Escape` dismisses drawer and restores focus. |
| **TC-005** | Command Palette | Press `Cmd+K` (Mac) or `Ctrl+K` (Win); type "Resume". | Palette mounts with backdrop blur; keyboard arrows highlight results; Enter downloads resume. |
| **TC-006** | Contact Form | Submit empty form; submit invalid email; submit valid message. | Shows inline error; blocks submission; shows success confirmation toast upon valid submission. |
| **TC-007** | Audio Synthesizer | Enable audio toggle; click buttons; open drawer. | Procedural sine clicks play crisply without latency; stays silent when muted. |

---

### Level 3: Viewport & Device Testing Matrix

```text
+-------------------+-----------------+-----------------------+---------------------+
| Device Category   | Resolution (px) | Test Target           | Key Validation Point|
+-------------------+-----------------+-----------------------+---------------------+
| Mobile Small      | 320 x 568       | iPhone SE (1st Gen)   | Zero text overflow  |
| Mobile Standard   | 390 x 844       | iPhone 13/14/15       | Touch swipe works   |
| Mobile Large      | 412 x 915       | Pixel 7 / Galaxy S23  | Touch targets >=44px|
| Tablet Portrait   | 768 x 1024      | iPad Mini / Air       | 2-col grids adapt   |
| Tablet Landscape  | 1024 x 768      | iPad Pro 11"          | Pinned scroll test  |
| Laptop Standard   | 1366 x 768      | Common PC Laptop      | 60fps GSAP scrub    |
| Desktop FHD       | 1920 x 1080     | Standard Monitor      | Widescreen balance  |
| Ultra-Wide / 4K   | 2560 x 1440+    | Studio Display        | Max container bounds|
+-------------------+-----------------+-----------------------+---------------------+
```

---

### Level 4: Regression & Smoke Testing Checklist

Prior to any deployment or pull request merge:
- [ ] No uncaught JavaScript exceptions in browser console.
- [ ] Google Fonts load with `font-display: swap` without text flicker.
- [ ] Resume download link (`assets/docs/Aayush_Panchal_Resume.pdf`) serves a valid PDF.
- [ ] All external GitHub and LinkedIn links open in a new tab with `rel="noopener noreferrer"`.
- [ ] `prefers-reduced-motion` suppresses all scroll animations and particle simulations.

