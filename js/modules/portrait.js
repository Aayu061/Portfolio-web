/**
 * Hero Portrait Frame Interactive Module
 * Manages seamless multi-mode switching between Editorial Studio Portrait,
 * Authentic Mirror Selfie Photo, and Stylized 3D Digital Developer Avatar.
 */

import { eventBus } from '../core/event-bus.js';

export function initPortrait() {
  const img = document.getElementById('hero-portrait-img');
  const toggleBtn = document.getElementById('hero-portrait-toggle');

  if (!img || !toggleBtn) return;

  const modes = [
    {
      id: 'hero',
      src: 'assets/images/profile/aayush_hero.jpg',
      btnText: 'View Selfie Photo ✦',
      alt: 'Aayush Panchal — Editorial Tech Studio Portrait'
    },
    {
      id: 'photo',
      src: 'assets/images/profile/aayush_portrait.jpg',
      btnText: 'View 3D Avatar ✦',
      alt: 'Aayush Panchal — Authentic Portrait Photograph'
    },
    {
      id: 'avatar',
      src: 'assets/images/profile/aayush_avatar.jpg',
      btnText: 'View Editorial Studio ✦',
      alt: 'Aayush Panchal — Stylized 3D Digital Developer Avatar'
    }
  ];

  // Preload all assets into browser cache for zero-lag switching
  modes.forEach((mode) => {
    const p = new Image();
    p.src = mode.src;
  });

  let currentIndex = 0;
  const savedId = localStorage.getItem('agy_hero_portrait_mode');
  if (savedId) {
    const found = modes.findIndex((m) => m.id === savedId);
    if (found !== -1) currentIndex = found;
  }

  function applyMode(index, animate = true) {
    currentIndex = index;
    const config = modes[currentIndex];
    if (!config) return;

    if (animate) {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.98)';

      setTimeout(() => {
        img.src = config.src;
        img.alt = config.alt;
        img.dataset.mode = config.id;
        toggleBtn.textContent = config.btnText;

        img.onload = () => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        };
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        }, 50);
      }, 140);
    } else {
      img.src = config.src;
      img.alt = config.alt;
      img.dataset.mode = config.id;
      toggleBtn.textContent = config.btnText;
    }

    try {
      localStorage.setItem('agy_hero_portrait_mode', config.id);
    } catch {
      // Ignore storage restrictions in private mode
    }
  }

  if (currentIndex !== 0) {
    applyMode(currentIndex, false);
  }

  toggleBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % modes.length;
    applyMode(nextIndex, true);
    eventBus.emit('sound:trigger', { type: 'click' });
  });
}
