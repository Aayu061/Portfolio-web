/**
 * Developer Inspector Mode HUD Module
 * Displays real-time rendering FPS, DOM node counts, and viewport coordinates.
 */

import { eventBus } from '../core/event-bus.js';

export function initInspector() {
  const hud = document.getElementById('inspector-hud');
  const fpsEl = document.getElementById('inspector-fps');
  const domCountEl = document.getElementById('inspector-dom');
  const viewportEl = document.getElementById('inspector-viewport');

  let isActive = false;
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;
  let animId;

  function updateMetrics() {
    frameCount++;
    const now = performance.now();
    if (now >= lastTime + 500) {
      fps = Math.round((frameCount * 1000) / (now - lastTime));
      frameCount = 0;
      lastTime = now;

      if (fpsEl) {
        fpsEl.textContent = `${fps} FPS`;
        fpsEl.style.color = fps >= 55 ? '#22c55e' : (fps >= 35 ? '#eab308' : '#ef4444');
      }
    }

    if (domCountEl) {
      domCountEl.textContent = `${document.querySelectorAll('*').length} DOM Nodes`;
    }

    if (viewportEl) {
      viewportEl.textContent = `${window.innerWidth}x${window.innerHeight} [Y: ${Math.round(window.scrollY)}]`;
    }

    if (isActive) {
      animId = requestAnimationFrame(updateMetrics);
    }
  }

  function toggle() {
    isActive = !isActive;
    if (isActive) {
      hud?.classList.add('active');
      document.body.classList.add('debug-grid-active');
      lastTime = performance.now();
      frameCount = 0;
      updateMetrics();
      eventBus.emit('sound:trigger', { type: 'open' });
    } else {
      hud?.classList.remove('active');
      document.body.classList.remove('debug-grid-active');
      cancelAnimationFrame(animId);
      eventBus.emit('sound:trigger', { type: 'close' });
    }
  }

  eventBus.on('inspector:toggle', toggle);

  // Close button on HUD if clicked
  hud?.querySelector('.inspector-close')?.addEventListener('click', toggle);
}

