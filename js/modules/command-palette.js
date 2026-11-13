/**
 * Command Palette HUD Module (Cmd+K / Ctrl+K)
 * Spotlight fuzzy search across sections, projects, case studies, and studio tools.
 */

import { store } from '../core/store.js';
import { eventBus } from '../core/event-bus.js';

export function initCommandPalette() {
  const backdrop = document.getElementById('cmd-palette-backdrop');
  const input = document.getElementById('cmd-search-input');
  const resultsContainer = document.getElementById('cmd-results');
  const triggers = document.querySelectorAll('[data-action="open-command-palette"]');

  let selectedIndex = 0;

  const commands = [
    // Sections
    { label: 'Jump to Home', category: 'Navigation', action: () => scrollTo('#home') },
    { label: 'Jump to About', category: 'Navigation', action: () => scrollTo('#about') },
    { label: 'Jump to Expertise', category: 'Navigation', action: () => scrollTo('#expertise') },
    { label: 'Jump to Selected Work', category: 'Navigation', action: () => scrollTo('#work') },
    { label: 'Jump to Journey Timeline', category: 'Navigation', action: () => scrollTo('#journey') },
    { label: 'Jump to Development Philosophy', category: 'Navigation', action: () => scrollTo('#philosophy') },
    { label: 'Jump to Contact', category: 'Navigation', action: () => scrollTo('#contact') },

    // Case Studies
    { label: 'Case Study: Place Your Service (AC SaaS)', category: 'Case Studies', action: () => openCaseStudy('place-your-service') },
    { label: 'Case Study: Extreme Sales & Services', category: 'Case Studies', action: () => openCaseStudy('extreme-sales-services') },
    { label: 'Case Study: AI Café (Gemini Barista)', category: 'Case Studies', action: () => openCaseStudy('ai-cafe') },
    { label: 'Case Study: Nexa Bank (Loan Platform)', category: 'Case Studies', action: () => openCaseStudy('nexa-bank') },

    // System Tools
    {
      label: 'Toggle Theme (Dark / Light)',
      category: 'System Tools',
      action: () => {
        const nextTheme = store.get('theme') === 'dark' ? 'light' : 'dark';
        store.set('theme', nextTheme);
      }
    },
    {
      label: 'Toggle Procedural Micro-Audio',
      category: 'System Tools',
      action: () => {
        store.set('audioEnabled', !store.get('audioEnabled'));
      }
    },
    {
      label: 'Toggle Developer Inspector Mode (FPS/Grid)',
      category: 'Developer Tools',
      action: () => {
        eventBus.emit('inspector:toggle');
      }
    },
    {
      label: 'Download Verified Resume (PDF)',
      category: 'Quick Actions',
      action: () => {
        window.open('assets/docs/Aayush_Panchal_Resume.pdf', '_blank');
      }
    },
    {
      label: 'Open GitHub Profile (Aayu061)',
      category: 'Quick Actions',
      action: () => {
        window.open('https://github.com/Aayu061', '_blank');
      }
    },
    {
      label: 'Open LinkedIn Profile',
      category: 'Quick Actions',
      action: () => {
        window.open('https://www.linkedin.com/in/aayush-panchal-24313044b', '_blank');
      }
    }
  ];

  function openPalette() {
    backdrop?.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
    }
    renderResults(commands);
    eventBus.emit('sound:trigger', { type: 'open' });
  }

  function closePalette() {
    backdrop?.classList.remove('active');
    eventBus.emit('sound:trigger', { type: 'close' });
  }

  function scrollTo(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    closePalette();
  }

  function openCaseStudy(id) {
    closePalette();
    setTimeout(() => {
      eventBus.emit('case-study:open', { id });
    }, 150);
  }

  function renderResults(filtered) {
    if (!resultsContainer) return;
    selectedIndex = 0;

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: var(--text-sm);">
          No matching commands found.
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = filtered.map((cmd, idx) => `
      <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
        <span>${cmd.label}</span>
        <span class="cmd-item__tag">[${cmd.category}]</span>
      </div>
    `).join('');

    // Attach click listeners to rendered results
    resultsContainer.querySelectorAll('.cmd-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        filtered[idx].action();
      });
    });
  }

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop?.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && backdrop?.classList.contains('active')) {
      closePalette();
    }
  });

  // Filter input typing
  input?.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const filtered = commands.filter(c => 
      c.label.toLowerCase().includes(query) || 
      c.category.toLowerCase().includes(query)
    );
    renderResults(filtered);
  });

  // Arrow navigation inside palette
  input?.addEventListener('keydown', (e) => {
    const items = resultsContainer?.querySelectorAll('.cmd-item');
    if (!items || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[selectedIndex]?.classList.remove('selected');
      selectedIndex = (selectedIndex + 1) % items.length;
      items[selectedIndex]?.classList.add('selected');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[selectedIndex]?.classList.remove('selected');
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      items[selectedIndex]?.classList.add('selected');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      items[selectedIndex]?.click();
    }
  });

  // Trigger button click handlers
  triggers.forEach(t => t.addEventListener('click', openPalette));
  backdrop?.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });
}

