/**
 * Preloader Module
 * Manages initial asset resolution, progress counter, and vertical curtain split exit.
 */

import { eventBus } from '../core/event-bus.js';

export function initPreloader() {
  const preloader = document.querySelector('.preloader-overlay');
  const progressText = document.querySelector('.preloader-counter');
  const progressFill = document.querySelector('.preloader-progress-fill');

  if (!preloader) return;

  // Reduced motion bypass
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preloader.classList.add('dismissed');
    eventBus.emit('studio:ready');
    return;
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 18) + 10;
    if (progress > 95) progress = 95;
    
    if (progressText) progressText.textContent = `[ ${progress}% ]`;
    if (progressFill) progressFill.style.width = `${progress}%`;
  }, 50);

  function dismiss() {
    clearInterval(interval);
    if (progressText) progressText.textContent = '[ 100% ]';
    if (progressFill) progressFill.style.width = '100%';

    setTimeout(() => {
      preloader.classList.add('dismiss-curtains');
      setTimeout(() => {
        preloader.classList.add('dismissed');
        eventBus.emit('studio:ready');
      }, 700);
    }, 200);
  }

  // If window has already loaded, exit swiftly
  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
    // Safety fallback timeout: never block longer than 1.4s
    setTimeout(dismiss, 1400);
  }
}

