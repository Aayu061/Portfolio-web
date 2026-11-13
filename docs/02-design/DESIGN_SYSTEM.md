# Design System & Token Specifications

> **System Name:** Studio Kinetic Tokens  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  
> **Implementation:** CSS Custom Properties (`:root`, `[data-theme="dark"]`, `[data-theme="light"]`)  

---

## 1. Approved 6-Color System

The brand identity is governed by six core colors, balanced precisely across dark and light themes.

| Token Name | Hex Code | Primary Role | Dark Theme Distribution | Light Theme Distribution |
|---|---|---|---|---|
| **Midnight Navy** | `#161E2F` | Primary dark base background | 55% | 10% (Headings & body text) |
| **Deep Slate Blue** | `#242F49` | Secondary surfaces / cards | 25% | — |
| **Steel Slate** | `#384358` | Borders, muted badges, card shells | 10% | — |
| **Warm Peach** | `#FFA586` | Warm highlights, icons, secondary accents | 7% | 7% (Subtle highlights / badges) |
| **Crimson Red** | `#B51A2B` | Primary action CTAs & high-priority indicators | 3% | 3% (Primary action buttons) |
| **Burgundy** | `#541A2E` | Deep gradients, subtle backdrops | Select accents | Select accents |

---

## 2. CSS Design Tokens Specification

### Global Base Tokens (`css/variables.css`)

```css
:root {
  /* Brand Primitives */
  --color-midnight-navy: #161e2f;
  --color-deep-slate: #242f49;
  --color-steel-slate: #384358;
  --color-warm-peach: #ffa586;
  --color-crimson-red: #b51a2b;
  --color-burgundy: #541a2e;

  /* Neutrals & Alpha Tints */
  --color-white: #ffffff;
  --color-warm-white: #fff5f0;
  --color-warm-surface: #ffe4d9;
  --color-charcoal-muted: #6c6670;
  --color-slate-light: #c2c6d0;
  --color-cream-text: #f8f0ed;

  /* Typography Stacks */
  --font-heading: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

  /* Font Scales (Fluid clamp values) */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem);
  --text-sm: clamp(0.875rem, 0.825rem + 0.25vw, 0.9375rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 2rem);
  --text-3xl: clamp(2rem, 1.75rem + 1.25vw, 2.75rem);
  --text-4xl: clamp(2.5rem, 2.1rem + 2vw, 3.75rem);
  --text-hero: clamp(3rem, 2.5rem + 3.5vw, 5.5rem);

  /* Spacing System */
  --space-2xs: 0.25rem;  /* 4px */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 0.75rem;   /* 12px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4.5rem;   /* 72px */
  --space-section: clamp(4rem, 7vw, 9rem);

  /* Elevation & Shadows */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Animation Timings */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --transition-fast: 150ms var(--ease-out-expo);
  --transition-normal: 250ms var(--ease-out-expo);
  --transition-slow: 400ms var(--ease-out-expo);
}
```

---

### Theme Variable Mapping (`css/themes.css`)

#### Dark Theme (`[data-theme="dark"]` / Default)
```css
[data-theme="dark"] {
  --bg-primary: var(--color-midnight-navy);
  --bg-secondary: var(--color-deep-slate);
  --bg-tertiary: var(--color-steel-slate);
  --bg-card: rgba(36, 47, 73, 0.75);
  --bg-glass: rgba(22, 30, 47, 0.85);

  --text-primary: var(--color-cream-text);
  --text-secondary: var(--color-slate-light);
  --text-muted: #8e95a5;

  --accent-primary: var(--color-crimson-red);
  --accent-hover: #d42034;
  --highlight: var(--color-warm-peach);
  --highlight-glow: rgba(255, 165, 134, 0.25);

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-accent: rgba(255, 165, 134, 0.4);

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.25);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.45);
}
```

#### Light Theme (`[data-theme="light"]`)
```css
[data-theme="light"] {
  --bg-primary: var(--color-warm-white);
  --bg-secondary: var(--color-white);
  --bg-tertiary: var(--color-warm-surface);
  --bg-card: rgba(255, 255, 255, 0.9);
  --bg-glass: rgba(255, 245, 240, 0.88);

  --text-primary: var(--color-deep-slate);
  --text-secondary: var(--color-charcoal-muted);
  --text-muted: #8c8691;

  --accent-primary: var(--color-crimson-red);
  --accent-hover: #981523;
  --highlight: #e06d48;
  --highlight-glow: rgba(224, 109, 72, 0.2);

  --border-subtle: rgba(36, 47, 73, 0.08);
  --border-strong: rgba(36, 47, 73, 0.18);
  --border-accent: rgba(181, 26, 43, 0.3);

  --shadow-sm: 0 2px 8px rgba(36, 47, 73, 0.06);
  --shadow-md: 0 8px 24px rgba(36, 47, 73, 0.1);
  --shadow-lg: 0 16px 40px rgba(36, 47, 73, 0.15);
}
```

---

## 3. UI Component Specifications

### Buttons
- **Primary CTA (`.btn-primary`):** Background `var(--accent-primary)`, Text white, Border none, Border-radius `var(--radius-sm)`, Font Space Grotesk 600. Includes subtle hover scale `scale(1.02)` and crimson glow shadow.
- **Secondary / Ghost CTA (`.btn-secondary`):** Background transparent, Border 1px solid `var(--border-strong)`, Text `var(--text-primary)`, Font Space Grotesk 500. On hover: Border color `var(--highlight)` and subtle background tint.
- **Tag / Badge (`.tech-badge`):** Monospaced JetBrains Mono 12px, Background `var(--bg-tertiary)`, Border 1px solid `var(--border-subtle)`, Color `var(--highlight)`.

### Cards (`.studio-card`)
- Backdrop filter `blur(12px)`.
- Border 1px solid `var(--border-subtle)`.
- Border radius `var(--radius-md)`.
- Transition `transform 250ms var(--ease-out-expo), border-color 250ms ease`.
- Dynamic radial gradient highlight tracking `--cursor-x` and `--cursor-y`.

---

## 4. Audio Synthesis Tokens (Procedural Web Audio)

When the audio toggle is active, micro-interactions play subtle mathematical frequency envelopes:

| Sound Event | Waveform | Base Frequency | Duration | Envelope Shape |
|---|---|---|---|---|
| `sound-click` | Sine | 820 Hz | 14 ms | Fast exponential decay to 0 |
| `sound-hover` | Triangle | 1200 Hz | 8 ms | Low gain (0.04) pop |
| `sound-theme` | Dual Sine | 440 Hz → 880 Hz | 60 ms | Arpeggiated soft chime |
| `sound-drawer-open` | Low Sine | 180 Hz | 50 ms | Smooth warm bass pulse |
| `sound-drawer-close`| Low Sine | 140 Hz | 40 ms | Reverse dampening decay |

