# Environment Variables & Configuration

> **Security Rule:** Strict Zero-Secret Architecture. Never commit private tokens, database admin passwords, or personal credentials into version control.  
> **Brand:** Aayush Panchal  
> **Version:** 1.0.0  

---

## 1. Overview of Configuration Parameters

Because Version 1.0 of the portfolio is delivered as a client-side static web application, all variables accessed by the browser are **public by design**. Sensitive backend tasks (e.g. database admin access or transactional email dispatching) are executed either via headless SaaS services (Web3Forms/Formspree) or secure edge serverless functions.

---

## 2. Public Client-Side Configuration Parameters

| Variable / Key | Purpose | Required | Example Public Value | Usage Location |
|---|---|---|---|---|
| `PUBLIC_FORM_ENDPOINT` | Headless form submission URL | Yes | `https://api.web3forms.com/submit` | `js/modules/contact.js` |
| `PUBLIC_FORM_ACCESS_KEY` | Public client token for form gateway | Yes | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` | `index.html` (data attribute) |
| `PUBLIC_SITE_URL` | Canonical URL for SEO and OpenGraph | Yes | `https://aayushpanchal.dev` | `index.html` (meta tags) |
| `PUBLIC_CONTACT_EMAIL` | Display email for inquiries | Yes | `aayushpanchal.dev@gmail.com` | `index.html` & `sitemap.xml` |

---

## 3. Configuration Management in Code

Public variables are configured via standard HTML5 data-attributes or a dedicated client configuration constant:

```javascript
// js/core/config.js
export const CONFIG = {
  SITE_URL: 'https://aayushpanchal.dev',
  CONTACT_EMAIL: 'aayushpanchal.dev@gmail.com',
  FORM_ENDPOINT: 'https://api.web3forms.com/submit',
  FORM_KEY: document.querySelector('meta[name="web3forms-key"]')?.content || ''
};
```

---

## 4. Security Enforcement Rules

> [!CAUTION]
> 1. Never add GitHub Personal Access Tokens, Vercel API tokens, or Supabase `service_role` keys to client-side code.
> 2. Always maintain `.gitignore` excluding any `.env`, `.env.local`, or credentials files.
> 3. If private serverless operations are introduced in Version 2.0 (e.g. a Node.js edge function on Vercel), store private keys exclusively in the **Vercel Project Settings > Environment Variables** dashboard with the "Encrypted" flag enabled.

