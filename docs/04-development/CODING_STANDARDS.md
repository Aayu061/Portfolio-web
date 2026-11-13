# Engineering Standards & Code Conventions

> **Standard:** Professional Clean Code, Zero-Framework Native Web Standards  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. General Principles

1. **Clarity Over Cleverness:** Write transparent, self-documenting code. Avoid dense, obscure one-liners when a clean multi-line function is easier to read and maintain.
2. **Defensive DOM Querying:** Always guard DOM selectors against `null` references before manipulating elements or attaching event listeners.
3. **Immutability Where Practical:** Prefer `const` over `let`. Never use `var`.
4. **Single Responsibility:** Each JavaScript module must handle one distinct domain (e.g. `theme.js` only manages theme state and persistence).

---

## 2. HTML Standards

- **Semantic Tags:** Use `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`, `<aside>`, and `<figure>`. Do not use `<div>` when a semantic alternative exists.
- **Accessibility Attributes:**
  - Every `<img>` must possess a descriptive, non-empty `alt` attribute (or `alt=""` with `aria-hidden="true"` if purely decorative).
  - Interactive custom elements must have an explicit `role`, `aria-label`, and `tabindex="0"`.
  - Icon-only buttons must have an accessible text alternative:
    ```html
    <button class="btn-icon" aria-label="Toggle dark and light theme">
      <svg aria-hidden="true">...</svg>
    </button>
    ```
- **External Links:** All links targeting external origins (`target="_blank"`) must include `rel="noopener noreferrer"` for security and performance.

---

## 3. CSS Conventions (BEM + Custom Properties)

- **Naming Convention:** Use modified BEM (Block__Element--Modifier) or clean kebab-case:
  ```css
  /* Block */
  .studio-card { ... }
  
  /* Element */
  .studio-card__header { ... }
  .studio-card__title { ... }
  
  /* Modifier */
  .studio-card--featured { ... }
  ```
- **Zero Hardcoded Values:** Never write raw hex codes (`#161E2F`) or arbitrary pixel padding (`margin-top: 37px`) in component files. Use CSS custom properties:
  ```css
  /* Compliant */
  .studio-card {
    background-color: var(--bg-card);
    border: 1px solid var(--border-subtle);
    padding: var(--space-xl);
    border-radius: var(--radius-md);
  }
  ```
- **Logical Properties:** Prefer CSS logical properties where applicable (`padding-inline`, `margin-block`, `inset`) to ensure bi-directional layout flexibility.

---

## 4. JavaScript Conventions (Modern ES6+)

- **Module Structure:** Use ES Modules (`import` / `export`). Avoid polluting the global `window` scope.
- **Async Operations:** Always use `async/await` with `try/catch` blocks for asynchronous requests (such as fetching JSON or submitting forms).
- **Event Listeners:**
  - Pass `{ passive: true }` to high-frequency events (`scroll`, `mousemove`, `touchmove`).
  - Debounce or throttle expensive calculation handlers using `requestAnimationFrame`.
- **Formatting Standards:**
  - 2 spaces indentation.
  - Semicolons enforced.
  - Single quotes for strings (or template literals).
  - CamelCase for functions and variables (`initThemeController`, `activeSection`).
  - UPPERCASE_SNAKE_CASE for constant configurations (`STORAGE_KEY_THEME`).

---

## 5. Git Commit & Branching Standards

Follow the **Conventional Commits** specification:

```text
<type>(<scope>): <short summary>

[optional body explaining context and trade-offs]
```

### Allowed Types:
- `feat`: A new user-facing feature or component (e.g. `feat(hero): integrate interactive svg node visualizer`).
- `fix`: A bug fix or patch (e.g. `fix(nav): correct active scroll spy offset on mobile`).
- `docs`: Documentation updates or additions (e.g. `docs(specs): add case study schema definitions`).
- `style`: Formatting, spacing, or CSS adjustments without functional logic changes.
- `refactor`: Code restructuring without modifying behavior.
- `perf`: A code change that improves rendering frame rate or asset payload.
- `test`: Adding or updating test scripts.

