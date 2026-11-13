/**
 * Navigation Module
 * Controls glassmorphic sticky header, scroll spy, smooth scrolling, and mobile menu.
 */

import { store } from '../core/store.js';

export function initNavigation() {
  const header = document.querySelector('.studio-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navContainer = document.querySelector('.nav-links');
  const sections = document.querySelectorAll('section[id]');

  // 1. Sticky Header Shrink
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Active Scroll Spy (IntersectionObserver)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          store.set('activeSection', id);
          
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });

    sections.forEach(sec => observer.observe(sec));
  }

  // 3. Smooth Anchor Scrolling & Mobile Menu Close
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        if (navContainer?.classList.contains('open')) {
          navContainer.classList.remove('open');
          mobileToggle?.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // 4. Mobile Menu Toggle
  if (mobileToggle && navContainer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navContainer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen.toString());
    });
  }

  // 5. Global Cursor Tracker for Ambient Lighting
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  }, { passive: true });
}

