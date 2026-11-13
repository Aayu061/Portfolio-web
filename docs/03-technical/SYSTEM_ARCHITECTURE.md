# System Architecture & Technical Design

> **Architecture:** Modular Event-Driven Client-Side Single Page Application  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. High-Level System Architecture Diagram

```mermaid
flowchart TD
    subgraph Browser_Environment["Browser Client (DOM & Web APIs)"]
        HTML[index.html DOM]
        CSS[Modular CSS Custom Properties]
        APIs[Web Audio API / LocalStorage / IntersectionObserver]
    end

    subgraph Application_Core["JavaScript Application Core (ES6 Modules)"]
        Main[main.js - Application Orchestrator]
        EventBus[EventBus - Pub/Sub Micro-Bus]
        StateStore[Store - Reactive State Store]
    end

    subgraph Feature_Controllers["Feature Modules"]
        ThemeCtrl[theme.js - Dark/Light Controller]
        NavCtrl[navigation.js - Smooth Scroll & ScrollSpy]
        HeroCtrl[hero-visual.js - SVG/Canvas Node Engine]
        CmdCtrl[command-palette.js - Spotlight HUD & Fuzzy Search]
        ProjectCtrl[projects.js - Horizontal Gallery & Case Study Drawer]
        JourneyCtrl[journey.js - Timeline Filter Engine]
        AudioCtrl[audio.js - Procedural Sound Synthesizer]
        InspectorCtrl[inspector.js - Real-time Performance HUD]
    end

    subgraph External_Integrations["External Gateways & CDNs"]
        CDN[Vercel Edge CDN / Google Fonts]
        FormGW[Formspree / Web3Forms Headless Webhook]
    end

    HTML --> Main
    Main --> EventBus
    Main --> StateStore
    
    EventBus <--> Feature_Controllers
    StateStore <--> Feature_Controllers
    
    Feature_Controllers --> HTML
    Feature_Controllers --> CSS
    Feature_Controllers --> APIs
    
    HTML -.-> CDN
    ProjectCtrl -.-> FormGW
```

---

## 2. Event-Driven Communication Architecture (Micro-EventBus)

To maintain absolute modularity and prevent spaghetti cross-module coupling, all modules communicate via a lightweight native CustomEvent Pub/Sub bus:

```javascript
// core/event-bus.js
export const eventBus = {
  on(event, callback) {
    window.addEventListener(`studio:${event}`, (e) => callback(e.detail));
  },
  emit(event, detail = {}) {
    window.dispatchEvent(new CustomEvent(`studio:${event}`, { detail }));
  }
};
```

### Global System Events:
- `studio:theme-changed` (`{ theme: 'dark' | 'light' }`): Triggered by theme switcher or Command Palette; re-renders canvas node colors and updates CSS attributes.
- `studio:sound-trigger` (`{ type: 'click' | 'hover' | 'theme' | 'open' }`): Prompts the Web Audio synthesizer to generate sound if unmuted.
- `studio:open-case-study` (`{ projectId: string }`): Tells `projects.js` to populate and slide open the case study drawer.
- `studio:close-case-study`: Closes drawer and restores focus.
- `studio:toggle-command-palette`: Opens or closes the `Cmd+K` HUD.
- `studio:toggle-inspector`: Toggles the real-time performance monitor.

---

## 3. Reactive State Management

A lightweight state object handles global reactive parameters without third-party libraries:

```javascript
// core/store.js
export const store = {
  state: {
    theme: localStorage.getItem('studio_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    audioEnabled: localStorage.getItem('studio_audio') === 'true',
    activeSection: 'home',
    activeCaseStudy: null,
    isCommandPaletteOpen: false,
    isInspectorActive: false
  },
  
  get(key) {
    return this.state[key];
  },
  
  set(key, value) {
    this.state[key] = value;
    if (key === 'theme') localStorage.setItem('studio_theme', value);
    if (key === 'audioEnabled') localStorage.setItem('studio_audio', value);
    eventBus.emit(`state:${key}`, value);
  }
};
```

---

## 4. Module Lifecycles & Execution Flow

```mermaid
sequenceDiagram
    autonumber
    participant DOM as DOM Window
    participant Main as main.js
    participant Preloader as preloader.js
    participant GSAP as GSAP & ScrollTrigger
    participant Controllers as Feature Modules

    DOM->>Main: DOMContentLoaded event
    Main->>Controllers: Initialize controllers (Theme, Audio, Nav)
    Main->>Preloader: Start preloader countdown
    
    DOM->>Main: window.load event (Assets resolved)
    Main->>Preloader: Trigger exit timeline
    Preloader->>GSAP: Split preloader curtain
    Preloader-->>Main: Preloader dismissed
    
    Main->>GSAP: Register ScrollTrigger plugins
    Main->>Controllers: Mount Hero Node Engine & Horizontal Gallery
    Controllers-->>DOM: Full interactive experience active
```

---

## 5. Security & Privacy Architecture

- **Content Security Policy (CSP):** Strict script-src and style-src whitelist restricting execution to trusted CDNs (`cdnjs.cloudflare.com`, `fonts.googleapis.com`).
- **Zero Third-Party Trackers:** No intrusive tracking scripts, cookies, or fingerprinters are loaded.
- **Client-Side Form Sanitization:** Contact submissions validate regex patterns, strip script injections, and employ rate limiting on the client before dispatching to the form gateway.
- **Subresource Integrity (SRI):** External CDN dependencies include cryptographic hash checks to eliminate supply-chain tampering.

