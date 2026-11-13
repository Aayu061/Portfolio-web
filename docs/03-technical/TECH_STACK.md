# Technology Stack Specification

> **Document Status:** APPROVED  
> **Architecture Pattern:** Zero-Framework Vanilla Core with Hardware-Accelerated Animation & Web Standards  
> **Version:** 1.0.0  

---

## 1. Core Technology Selection Matrix

| Layer | Selected Technology | Version | Rationale & Justification | Alternatives Considered & Rejected |
|---|---|---|---|---|
| **Markup** | HTML5 (Semantic) | Standard | Native accessibility, lightweight footprint, zero hydration penalty, predictable SEO. | JSX, Pug (unnecessary abstraction). |
| **Styling** | CSS3 Custom Properties | Standard | Native variables, zero compilation required, instant dark/light theme switching, CSS Grid & Flexbox mastery. | Tailwind CSS (adds class clutter & build overhead), SASS. |
| **Scripting** | Modern JavaScript | ES6+ / 2024 | Native module imports (`type="module"`), zero bundler requirement for development, direct DOM manipulation, superior performance. | TypeScript (can be added later, but unnecessary complexity for v1 static site), React/Vue (massive 100kb+ runtime penalty). |
| **Animation** | GSAP + ScrollTrigger | 3.12+ | Industry-standard 60fps performance, sub-pixel rendering, timeline synchronization, pinned horizontal scroll choreography. | Framer Motion (requires React), CSS-only (insufficient for coordinated horizontal scrub). |
| **Graphics** | SVG + HTML5 Canvas | Standard | Scalable resolution-independent vector graphics, crisp node network on Retina displays, lightweight DOM node footprint. | Three.js (200kb+ WebGL library, overkill for 2D connected node graphs). |
| **Audio** | HTML5 Web Audio API | Standard | Zero audio files downloaded (0 bytes bandwidth), procedural mathematical frequency synthesis for tactile feedback. | MP3/WAV audio assets (heavy network payload, delayed playback). |
| **Icons** | Lucide Icons | 0.350+ | Clean, consistent 24px stroke icon set, accessible SVGs, zero runtime dependencies. | FontAwesome (bloated font files), Feather (legacy). |
| **Deployment** | Vercel + GitHub | Global Edge | Global CDN distribution, automated CI/CD branch previews, instant rollbacks, HTTP/2 & Brotli compression out of the box. | Netlify, Render static, GitHub Pages. |

---

## 2. Framework-Free Architectural Decision Rationale

A deliberate engineering decision was made to build this portfolio using **pure Vanilla HTML, CSS, and JavaScript** without React, Next.js, or Vue.

### Why This Decision Elevates Aayush's Positioning:
1. **Proof of Pure Software Engineering:** Any beginner can run `npx create-next-app` and install component libraries. Building a high-performance, accessible, responsive single-page studio with native DOM APIs, custom event buses, and modular CSS demonstrates genuine mastery of web standards.
2. **Instantaneous Load Performance:** Without 150KB–300KB of React/Next.js runtime bundles and hydration cycles, Time to Interactive (TTI) and First Contentful Paint (FCP) drop under 800ms.
3. **Longevity & Zero Maintenance Churn:** Vanilla web applications do not suffer from breaking dependency updates, security vulnerabilities in NPM packages, or Node engine deprecation.
4. **Predictable Memory Footprint:** Animations and canvas loops run uninhibited by virtual DOM reconciliation diffs.

---

## 3. Production Dependencies & CDN Architecture

For production delivery, external libraries are pinned to trusted, sub-millisecond edge CDNs with Subresource Integrity (SRI) hashes:

```html
<!-- GSAP Core & ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
        integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++qhIOcqLeUMgEQRpu50abE300+DQyoQ47WD52QQ9oio2Ppb366gIrPRtwMHCuO6g==" 
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" 
        integrity="sha512-onMTRKJBKz8M1TnqqDuGBlowlH0ohFzMXYRNebz+yOcc5TQr/zAKsthzhuv0hiyUKEkkQK9L30Vwt8ZiVXXUDA==" 
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Google Fonts (Space Grotesk, Inter, JetBrains Mono) with preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

