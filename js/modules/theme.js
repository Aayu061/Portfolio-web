/**
 * Theme Controller Module
 * Handles dark/light theme switching, system preference sync, and UI updates.
 */

import { store } from '../core/store.js';
import { eventBus } from '../core/event-bus.js';

export function initTheme() {
  const currentTheme = store.get('theme');
  document.documentElement.setAttribute('data-theme', currentTheme);

  const themeToggleBtns = document.querySelectorAll('[data-action="toggle-theme"]');

  function updateButtons(theme) {
    themeToggleBtns.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  updateButtons(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextTheme = store.get('theme') === 'dark' ? 'light' : 'dark';
      store.set('theme', nextTheme);
      updateButtons(nextTheme);
      eventBus.emit('sound:trigger', { type: 'theme' });
    });
  });

  // Listen for external state changes (e.g. from Command Palette)
  eventBus.on('state:theme', (newTheme) => {
    updateButtons(newTheme);
  });

  // Sync with OS preferences if user hasn't explicitly set localStorage
  if (!localStorage.getItem('studio_theme') && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const osTheme = e.matches ? 'dark' : 'light';
      store.set('theme', osTheme);
      updateButtons(osTheme);
    });
  }
}

