# Performance Optimization & Core Web Vitals

> **Target:** 95+ Google Lighthouse Performance Score  
> **Philosophy:** Sub-second First Contentful Paint, Zero Layout Thrashing, Hardware-Accelerated 60fps Rendering  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. Core Web Vitals Targets & Budgets

| Metric | Target Goal | Failure Threshold | Optimization Strategy |
|---|---|---|---|
| **Largest Contentful Paint (LCP)** | **< 1.2s** | > 2.0s | Critical inline CSS, font preconnecting, zero heavy hero images |
| **First Contentful Paint (FCP)** | **< 0.6s** | > 1.2s | Fast edge server response, lightweight semantic HTML |
| **Cumulative Layout Shift (CLS)** | **0.00** | > 0.05 | Explicit aspect ratios on all media, font swap fallback matching |
| **Interaction to Next Paint (INP)** | **< 50ms** | > 150ms | Passive event listeners, lightweight micro-event bus, zero virtual DOM |
| **Total Blocking Time (TBT)** | **< 80ms** | > 200ms | Zero heavy JS execution during page boot; deferred non-critical modules |

---

## 2. Asset & Resource Optimization Strategies

### A. Font Loading Strategy
Google Fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`) are loaded with preconnect hints and `font-display: swap`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```
- Custom fallback fonts (`sans-serif`, `monospace`) have matching line-heights and letter-spacing to prevent visual layout shifts when fonts swap.

### B. Image Compression & Modern Formats
- All project screenshots and profile visuals are compressed into modern **WebP** and **AVIF** formats.
- Media elements always declare explicit `width`, `height`, and `loading="lazy"` attributes:
  ```html
  <img src="assets/images/projects/place-your-service/preview.webp" 
       alt="Place Your Service SaaS Dashboard Preview" 
       width="800" height="500" 
       loading="lazy" 
       decoding="async">
  ```

### C. Zero-Dependency Procedural Audio
Instead of loading external MP3 or WAV audio files over the network, tactile micro-sound clicks are synthesized mathematically using the native **HTML5 Web Audio API**. This reduces network payload by ~250KB and delivers instant, zero-latency audio playback without buffer wait times.

---

## 3. DOM & Rendering Performance

1. **Avoid Layout Thrashing:** Never interleave DOM style reads (`offsetWidth`, `getBoundingClientRect()`) with DOM writes (`element.style.transform = ...`). Read all values first, then batch writes inside `requestAnimationFrame`.
2. **GPU Layer Promotion:** Elements with continuous transforms or opacity transitions use CSS `will-change: transform` or `transform: translateZ(0)` during active animations, and remove them once idle to conserve GPU memory.
3. **Intersection Observer for Section Activation:** Scroll animations only attach and calculate when a section enters the viewport. Offscreen canvas physics or heavy animations are paused automatically.

