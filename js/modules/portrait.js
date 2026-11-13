/**
 * Portrait Frame Interactive Module
 * Manages seamless switching between authentic studio portrait photo and
 * stylized 3D digital developer avatar, with image preloading and audio cues.
 */

import { eventBus } from '../core/event-bus.js';

export function initPortrait() {
  const img = document.getElementById('portrait-img');
  const toggleBtn = document.getElementById('portrait-toggle-btn');
  const tag = document.getElementById('portrait-mode-tag');

  if (!img || !toggleBtn) return;

  const assets = {
    photo: {
      src: 'assets/images/profile/aayush_portrait.jpg',
      tag: 'STUDIO // PHOTO',
      btnText: 'View 3D Avatar ✦',
      alt: 'Aayush Panchal — Full-Stack Developer Studio Portrait'
    },
    avatar: {
      src: 'assets/images/profile/aayush_avatar.jpg',
      tag: 'STUDIO // AVATAR',
      btnText: 'View Real Photo ✦',
      alt: 'Aayush Panchal — Stylized 3D Digital Developer Avatar'
    }
  };

  // Preload avatar asset for instantaneous switching
  const preloadImg = new Image();
  preloadImg.src = assets.avatar.src;

  // Restore saved preference if any
  let currentMode = localStorage.getItem('agy_portrait_mode') || 'photo';

  function applyMode(mode, animate = true) {
    currentMode = mode;
    const config = assets[mode];
    if (!config) return;

    if (animate) {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.98)';

      setTimeout(() => {
        img.src = config.src;
        img.alt = config.alt;
        img.dataset.mode = mode;
        if (tag) tag.textContent = config.tag;
        toggleBtn.textContent = config.btnText;

        img.onload = () => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        };
        // Fallback in case image is already cached
        setTimeout(() => {
          img.style.opacity = '1';
          img.style.transform = 'scale(1)';
        }, 50);
      }, 150);
    } else {
      img.src = config.src;
      img.alt = config.alt;
      img.dataset.mode = mode;
      if (tag) tag.textContent = config.tag;
      toggleBtn.textContent = config.btnText;
    }

    try {
      localStorage.setItem('agy_portrait_mode', mode);
    } catch {
      // Ignore private browsing storage errors
    }
  }

  // Apply initially if saved mode was avatar
  if (currentMode === 'avatar') {
    applyMode('avatar', false);
  }

  toggleBtn.addEventListener('click', () => {
    const nextMode = currentMode === 'photo' ? 'avatar' : 'photo';
    applyMode(nextMode, true);
    eventBus.emit('sound:trigger', { type: 'click' });
  });
}
