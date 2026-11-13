/**
 * Procedural Web Audio Synthesizer
 * Generates tactile micro-interaction sounds purely via the HTML5 Web Audio API.
 * Zero network assets (0 KB download), mathematical frequency synthesis.
 */

import { store } from '../core/store.js';
import { eventBus } from '../core/event-bus.js';

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playMicroSound(type = 'click') {
  if (!store.get('audioEnabled')) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  switch (type) {
    case 'click':
      // Crisp 14ms sinusoidal click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.014);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);
      osc.start(now);
      osc.stop(now + 0.014);
      break;

    case 'hover':
      // Subtle 8ms tick
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
      osc.start(now);
      osc.stop(now + 0.008);
      break;

    case 'theme':
      // Harmonic chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
      break;

    case 'open':
      // Low warm pulse for drawers
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
      break;

    case 'close':
      // Reverse warm pulse
      osc.type = 'sine';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
      break;
  }
}

export function initAudio() {
  const audioToggleBtns = document.querySelectorAll('[data-action="toggle-audio"]');

  function updateAudioButtons(enabled) {
    audioToggleBtns.forEach(btn => {
      btn.setAttribute('aria-pressed', enabled.toString());
      btn.setAttribute('aria-label', enabled ? 'Mute micro-audio soundscape' : 'Unmute procedural soundscape');
      const iconMuted = btn.querySelector('.icon-muted');
      const iconUnmuted = btn.querySelector('.icon-unmuted');
      if (iconMuted && iconUnmuted) {
        iconMuted.style.display = enabled ? 'none' : 'block';
        iconUnmuted.style.display = enabled ? 'block' : 'none';
      }
    });
  }

  updateAudioButtons(store.get('audioEnabled'));

  audioToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const nextState = !store.get('audioEnabled');
      store.set('audioEnabled', nextState);
      updateAudioButtons(nextState);
      if (nextState) {
        getAudioContext();
        playMicroSound('theme');
      }
    });
  });

  eventBus.on('sound:trigger', (data) => {
    playMicroSound(data.type);
  });

  // Attach subtle click feedback to all primary buttons and links
  document.addEventListener('click', (e) => {
    if (e.target.closest('button, .btn, .nav-link, .project-card, .cmd-item')) {
      playMicroSound('click');
    }
  }, { passive: true });
}

