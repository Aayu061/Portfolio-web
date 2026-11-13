# User Flows: Aayush Panchal Portfolio

> **Document Status:** APPROVED  
> **Version:** 1.0.0  
> **Personas:** Engineering Recruiter, Technical Lead / Engineering Manager, Direct Client  

---

## 1. Primary Visitor Journeys

### User Flow 1: The Technical Recruiter (Fast Qualification Flow)
*Goal: Rapidly verify skills, assess project relevance, download the resume, and initiate contact in under 90 seconds.*

```mermaid
sequenceDiagram
    autonumber
    actor Recruiter
    participant Browser
    participant Hero as Hero Section
    participant Palette as Command Palette (Cmd+K)
    participant Work as Selected Work
    participant Contact as Contact & Resume

    Recruiter->>Browser: Loads portfolio URL
    Browser->>Hero: Resolves preloader & displays Hero
    Note over Recruiter,Hero: Sees availability badge & technical positioning
    
    alt Standard Scroll Journey
        Recruiter->>Browser: Scrolls to #expertise & #work
        Browser->>Work: Displays horizontal project cards & tech tags
        Recruiter->>Contact: Jumps to #contact
        Contact->>Recruiter: Downloads Aayush_Panchal_Resume.pdf
    else Power-User / Command Palette Journey
        Recruiter->>Palette: Hits Cmd+K / Ctrl+K
        Palette->>Recruiter: Instant search overlay appears
        Recruiter->>Palette: Types 'Resume' or 'Download'
        Palette-->>Recruiter: Direct download link triggered
    end
```

---

### User Flow 2: The Engineering Manager / Tech Lead (Deep Technical Audit)
*Goal: Verify code quality, examine systems thinking, explore architectural trade-offs, and inspect design execution.*

```mermaid
sequenceDiagram
    autonumber
    actor TechLead as Engineering Lead
    participant Hero as Hero Visualizer
    participant Work as Horizontal Gallery
    participant Drawer as Case Study Drawer
    participant Code as Code / Tradeoff Viewer
    participant Inspector as Dev Inspector HUD

    TechLead->>Hero: Interacts with System Architecture Node Engine
    Hero-->>TechLead: Nodes pulse, telemetry displays request flow & stack
    TechLead->>Work: Scrolls into pinned horizontal gallery
    TechLead->>Work: Clicks 'View Case Study' on 'Place Your Service'
    Work->>Drawer: Opens accessible full-height slide-over drawer
    
    Drawer->>TechLead: Displays Problem, Solution, and Architecture Diagram
    TechLead->>Code: Clicks 'Architecture & Trade-offs' tab
    Code-->>TechLead: Displays Supabase RLS policies & JWT security flow
    TechLead->>Drawer: Closes drawer (Escape key or close button)
    
    TechLead->>Inspector: Activates Inspector Mode via Cmd+K
    Inspector-->>TechLead: Real-time 60fps monitor & CSS grid overlay active
```

---

### User Flow 3: Direct Client or Freelance Partner (Project Evaluation Flow)
*Goal: Understand service capabilities, verify delivered products, and send an inquiry.*

```mermaid
flowchart TD
    Start([Visitor lands on Homepage]) --> Preloader[Branded Preloader Reveals Studio]
    Preloader --> Hero[Hero: 'Engineering Digital Experiences']
    Hero --> Choice{Interaction Path}
    
    Choice -->|Explore Work CTA| Gallery[Horizontal Project Gallery]
    Choice -->|Scroll Down| About[About: Systems & Purpose]
    
    About --> Skills[Categorized Expertise Matrix]
    Skills --> Gallery
    
    Gallery --> OpenCaseStudy[Clicks 'View Case Study']
    OpenCaseStudy --> ReadStudy[Evaluates problem statement & functional solution]
    ReadStudy --> CloseStudy[Closes Drawer]
    
    CloseStudy --> Philosophy[Inspects Philosophy: Discover -> Design -> Develop -> Deliver]
    Philosophy --> ContactForm[Reaches Contact Gateway]
    
    ContactForm --> SubmitMessage[Fills Name, Email & Project Message]
    SubmitMessage --> Validation{Valid Form?}
    
    Validation -->|Errors| DisplayError[Show inline accessible error message]
    DisplayError --> ContactForm
    
    Validation -->|Success| SendWebhook[Send via Webhook/Form Gateway]
    SendWebhook --> SuccessToast[Show confirmation toast & direct email fallback]
    SuccessToast --> End([User receives response confirmation])
```

---

## 2. Edge Cases, Empty States & Error Handling

| Scenario | System Behavior | Recovery Path |
|---|---|---|
| **Slow Network Connection** | Preloader displays subtle pulsing spinner with timeout limit (1.2s max). Critical styles render inline. | Page mounts gracefully even if heavy assets take longer. |
| **Offline / Network Disconnected** | Static site remains fully functional via browser cache; contact form shows clean offline warning badge. | Prompts user to use native `mailto:` link. |
| **JavaScript Disabled (No-JS Fallback)** | Core sections (Hero, About, Expertise, Work, Journey, Philosophy, Contact) render cleanly in standard vertical flow. | `<noscript>` tag informs visitor that animations and Command Palette require JS. |
| **Form Gateway Failure** | Form catches HTTP error or network failure, alerts visitor, and reveals direct clickable `mailto:` link with pre-filled subject. | Zero lost messages. |
| **Screen Reader Active** | Dynamic slide-over drawers trap focus with `role="dialog"` and `aria-modal="true"`. Escape key cleanly restores focus to trigger button. | Fully compliant with WCAG 2.1 AA. |

