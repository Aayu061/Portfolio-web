# AI Coding Agent Operating Playbook

> **Scope:** Detailed engineering instructions for autonomous and semi-autonomous AI coding agents collaborating on the Aayush Panchal Portfolio codebase.  
> **Authority:** Supplements the root `AGENTS.md` file.  
> **Version:** 1.0.0  

---

## 1. Context Ingestion & Pre-Flight Checks

Before generating code or editing any file:
1. **Verify Target Environment:** Recognize that this repository is a **pure Vanilla HTML/CSS/ES6+ project**. Do NOT suggest, install, or run `npm install react`, `npx create-next-app`, or any package bundler unless explicitly instructed by the user.
2. **Review Design Tokens:** Inspect `docs/02-design/DESIGN_SYSTEM.md` to ensure any new UI component reuses existing CSS custom properties.
3. **Verify Requirement IDs:** Ensure changes map directly to a documented requirement in `docs/01-project-planning/PROJECT_REQUIREMENTS.md` (`FR-xxx` or `NFR-xxx`).

---

## 2. Safe Editing & Refactoring Protocol

1. **Non-Destructive Modifications:**
   - When modifying an existing file, preserve all working logic, event listeners, and comments.
   - Do not replace an entire file if only a single targeted function or CSS block needs an update.
2. **Defensive DOM Manipulation:**
   - Always verify element existence:
     ```javascript
     const container = document.querySelector('.hero-canvas');
     if (!container) return; // Prevent uncaught TypeError
     ```
3. **Preventing Global Scope Pollution:**
   - Encapsulate all module state within closures or exported module objects. Never attach ad-hoc properties directly to `window.*` unless registering on the defined `eventBus`.

---

## 3. Step-by-Step Task Execution Protocol

When given a task:
1. **Analyze:** Break down the request and identify the specific files affected.
2. **Declare Intent:** State clearly which files you are about to inspect or modify.
3. **Implement:** Write clean, standards-compliant code with comments explaining non-trivial logic.
4. **Self-Audit:**
   - Does this introduce any console errors?
   - Does this respect both dark (`#161E2F`) and light (`#FFF5F0`) themes?
   - Does this behave gracefully on mobile viewports (<768px)?
   - Does this support keyboard navigation and `prefers-reduced-motion`?
5. **Update Trackers:** Update `docs/04-development/TASK_TRACKER.md` and `CHANGELOG.md`.

---

## 4. Prohibited Actions for AI Agents

> [!CAUTION]
> The following actions are strictly forbidden without explicit user authorization:
> - Installing third-party JavaScript frameworks (React, Vue, Svelte, Angular).
> - Introducing CSS utility frameworks (Tailwind CSS, Bootstrap).
> - Deleting or overwriting documentation files in `docs/`.
> - Fabricating fake professional experience, degrees, or fictitious project URLs.
> - Committing or outputting private tokens, API keys, or environment secrets.

