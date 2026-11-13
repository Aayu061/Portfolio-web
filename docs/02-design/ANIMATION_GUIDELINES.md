# Animation & Motion Guidelines

> **Engine:** GSAP 3.x + ScrollTrigger + CSS Keyframes  
> **Philosophy:** Performance-First, Purposeful Motion, Zero Jitter, Respect Reduced-Motion  
> **Version:** 1.0.0  

---

## 1. Motion Philosophy & Performance Budget

Animations in the Aayush Panchal portfolio exist to clarify spatial hierarchy, provide tactile feedback, and reward exploration—never to delay navigation or consume unnecessary compute cycles.

### Strict Performance Rules
1. **Transform & Opacity Only:** All animated properties must be restricted to GPU-accelerated transforms (`translate3d`, `scale`, `rotate`) and `opacity`. Never animate `top`, `left`, `width`, `height`, or `margin`.
2. **Scroll-Jacking Prohibition:** The site uses native browser scrolling as the baseline foundation. Sections trigger animations upon scroll without overriding the user's natural trackpad or wheel physics.
3. **60fps Target:** If an animation drops below 55fps on a standard test device, its particle count or transition complexity must be simplified immediately.
4. **Passive Event Listeners:** All scroll and mousemove listeners must use `{ passive: true }`.

---

## 2. Animation Categories & Specifications

### A. Preloader Sequence
- **Step 1:** Wordmark `AAYUSH PANCHAL` fades in and tracks letter-spacing: `opacity: 0 -> 1`, `letter-spacing: 0.2em -> 0.05em` (Duration: 0.5s, Ease: `power2.out`).
- **Step 2:** Progress indicator counts from `0%` to `100%` aligned with resource loading.
- **Step 3 (Exit):** Preloader splits vertically: Top half slides `yPercent: -100`, bottom half slides `yPercent: 100` (Duration: 0.7s, Ease: `power4.inOut`).
- **Step 4 (Hero Reveal):** Hero headline and canvas node engine emerge with staggered upward reveal (`y: 40 -> 0`, `opacity: 0 -> 1`, Stagger: 0.1s).

---

### B. Interactive System Architecture Node Engine (Hero)
- **Idle State:** Nodes gently hover with sinusoidal vertical offsets (`y: -8px` to `+8px` over 3.5s with alternating phase offsets).
- **Packet Pulses:** Glowing SVG circles travel along bezier curves from the core node to satellites every 1.8s (`stroke-dashoffset` transition or moving circle elements along paths).
- **Cursor Proximity:** When the cursor moves within 150px of a node, the node experiences a subtle spring pull towards the cursor (`dx * 0.15`, `dy * 0.15`).
- **Click Effect:** Clicking a node triggers a radial shockwave ripple (`r: 10 -> 45`, `opacity: 1 -> 0`, Duration: 0.4s) and activates the telemetry tooltip.

---

### C. Horizontal Project Gallery (Desktop >=1024px)
- **GSAP ScrollTrigger Pinned Track:**
  ```javascript
  const track = document.querySelector('.projects-track');
  const cards = gsap.utils.toArray('.project-card');

  gsap.to(cards, {
    xPercent: -100 * (cards.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".work-section",
      pin: true,
      scrub: 1,
      snap: 1 / (cards.length - 1),
      end: () => "+=" + track.offsetWidth
    }
  });
  ```
- **Parallax Card Images:** As cards slide horizontally, preview images within cards translate counter-directionally by `15%`, creating a cinematic parallax depth effect.

---

### D. Case Study Slide-Over Drawer
- **Drawer Entrance:** Drawer translates from `translateX(100%)` to `translateX(0%)` in 400ms using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Backdrop Fade:** Backdrop fades `opacity: 0 -> 1` and blurs `backdrop-filter: blur(0px) -> blur(12px)`.
- **Content Stagger:** Internal case study headings, architecture diagrams, and code snippets stagger in upward (`y: 20 -> 0`, `opacity: 0 -> 1`, stagger: 0.05s).
- **Drawer Exit:** Reverses cleanly in 250ms (`power2.in`).

---

### E. Micro-Interactions & Hover Feedback
- **Buttons (`.btn-primary`):** Hover triggers `scale: 1.02` with an accent shadow expansion; active press triggers `scale: 0.98`.
- **Cards (`.studio-card`):** Cursor tracking updates `--cursor-x` and `--cursor-y` in real-time, casting an ambient glow gradient behind the card border.
- **Link Underlines:** Left-to-right sweep on hover (`transform: scaleX(0)` to `scaleX(1)`, `transform-origin: left`).

---

## 3. Responsive Motion Adaptations

| Viewport | Horizontal Work Gallery | Hero Node Visualizer | Scroll Animations |
|---|---|---|---|
| **Desktop (>=1024px)** | GSAP Pinned horizontal scrub with parallax | Full interactive canvas with cursor physics & telemetry | Full staggered reveals & line splits |
| **Tablet (768px - 1023px)** | Native smooth horizontal swipe with snap points | Scaled interactive canvas | Standard fade-up entrances |
| **Mobile (<768px)** | Native touch carousel with indicator dots | Lightweight SVG diagram with auto-looping pulses | Simplified upward transitions |

---

## 4. Accessibility & Reduced-Motion (`prefers-reduced-motion`)

When `prefers-reduced-motion: reduce` is detected in the visitor's operating system, the animation engine must immediately adapt:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- In JavaScript, `ScrollTrigger` animations are disabled or simplified to instant opacity reveals.
- The preloader dismisses immediately without slide transitions.
- The desktop horizontal project gallery reverts to standard vertical card stacking.
- The hero node visualizer remains static without particle pulses or hover spring forces.

