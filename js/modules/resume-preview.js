/**
 * Resume Live Interactive Preview Modal Module
 * Provides seamless in-browser PDF previewing with keyboard accessibility,
 * focus trapping, procedural micro-audio cues, and quick actions.
 */

import { eventBus } from '../core/event-bus.js';

export function initResumePreview() {
  const backdrop = document.getElementById('resume-preview-backdrop');
  const closeBtn = document.getElementById('resume-modal-close');
  const triggers = document.querySelectorAll('[data-action="open-resume-preview"]');

  if (!backdrop) return;

  let lastActiveElement = null;

  function openResume() {
    lastActiveElement = document.activeElement;
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
    eventBus.emit('sound:trigger', { type: 'open' });
  }

  function closeResume() {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
    eventBus.emit('sound:trigger', { type: 'close' });
  }

  // Trigger clicks
  triggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  // Close button click
  closeBtn?.addEventListener('click', closeResume);

  // Click outside modal to close
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeResume();
    }
  });

  // Keyboard navigation (Escape to close, Tab trapping)
  window.addEventListener('keydown', (e) => {
    if (!backdrop.classList.contains('active')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeResume();
      return;
    }

    if (e.key === 'Tab') {
      const focusableElements = backdrop.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  // Event bus subscription
  eventBus.on('resume:preview:open', openResume);
  eventBus.on('resume:preview:close', closeResume);
}
