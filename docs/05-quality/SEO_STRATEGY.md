# Search Engine Optimization (SEO) & Metadata Strategy

> **Target:** 100/100 Lighthouse SEO Score & Rich Snippet Eligibility  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. Metadata Architecture (`<head>`)

The portfolio's primary entrypoint (`index.html`) includes complete, standards-compliant Open Graph, Twitter Cards, and canonical metadata:

```html
<!-- Primary Meta Tags -->
<title>Aayush Panchal — Independent Developer & Full-Stack Engineer</title>
<meta name="title" content="Aayush Panchal — Independent Developer & Full-Stack Engineer">
<meta name="description" content="Personal developer portfolio of Aayush Panchal. Specializing in full-stack web applications, interaction design, RESTful APIs, and modern database architectures.">
<meta name="keywords" content="Aayush Panchal, Full-Stack Developer, Software Engineer, Portfolio, Node.js, PostgreSQL, Supabase, GSAP, Web Development, Mumbai">
<meta name="author" content="Aayush Panchal">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://aayushpanchal.dev/">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://aayushpanchal.dev/">
<meta property="og:title" content="Aayush Panchal — Independent Developer & Full-Stack Engineer">
<meta property="og:description" content="Engineering ideas into digital experiences. Explore full-stack projects, architecture case studies, and development philosophy.">
<meta property="og:image" content="https://aayushpanchal.dev/assets/images/og-preview.png">
<meta property="og:site_name" content="Aayush Panchal Portfolio">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://aayushpanchal.dev/">
<meta name="twitter:title" content="Aayush Panchal — Independent Developer & Full-Stack Engineer">
<meta name="twitter:description" content="Engineering ideas into digital experiences. Explore full-stack projects, architecture case studies, and development philosophy.">
<meta name="twitter:image" content="https://aayushpanchal.dev/assets/images/og-preview.png">
```

---

## 2. Structured Data Schema (JSON-LD)

To guarantee rich search snippets and high semantic ground truth in Google Search, JSON-LD structured data is embedded directly in `index.html`:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://aayushpanchal.dev/#person",
      "name": "Aayush Panchal",
      "url": "https://aayushpanchal.dev/",
      "jobTitle": "Full-Stack Software Developer",
      "sameAs": [
        "https://github.com/Aayu061",
        "https://www.linkedin.com/in/aayush-panchal-24313044b"
      ],
      "knowsAbout": [
        "Full-Stack Development",
        "Frontend Engineering",
        "Backend Architecture",
        "PostgreSQL",
        "Node.js",
        "GSAP Animation",
        "Supabase",
        "Web Accessibility"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://aayushpanchal.dev/#website",
      "url": "https://aayushpanchal.dev/",
      "name": "Aayush Panchal — Personal Developer Portfolio",
      "publisher": {
        "@id": "https://aayushpanchal.dev/#person"
      }
    }
  ]
}
</script>
```

---

## 3. Crawler Directives: `robots.txt` & `sitemap.xml`

### `robots.txt`
```text
User-agent: *
Allow: /
Disallow: /assets/docs/internal/

Sitemap: https://aayushpanchal.dev/sitemap.xml
```

### `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aayushpanchal.dev/</loc>
    <lastmod>2026-11-13</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

---

## 4. Heading Hierarchy & Semantic Integrity

- Single `<h1>` tag in the Hero section (`ENGINEERING DIGITAL EXPERIENCES.`).
- Major section headlines use sequential `<h2>` tags:
  - `I THINK IN SYSTEMS. I BUILD WITH PURPOSE.` (`#about`)
  - `CAPABILITIES & TECHNICAL DISCIPLINES.` (`#expertise`)
  - `SELECTED WORK. REAL PROBLEMS. BUILT SOLUTIONS.` (`#work`)
  - `LEARNING. BUILDING. IMPROVING.` (`#journey`)
  - `GOOD SOFTWARE IS MORE THAN GOOD CODE.` (`#philosophy`)
  - `LET'S TURN YOUR NEXT IDEA INTO SOMETHING REAL.` (`#contact`)
- Individual project and card titles use `<h3>`.
- Sub-components and telemetry stats use `<h4>` or `<p>`. Zero heading level skips are permitted.

