/**
 * Reactive State Store
 * Manages global application parameters with event broadcasting.
 */

import { eventBus } from './event-bus.js';

class Store {
  constructor() {
    const savedTheme = localStorage.getItem('studio_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    this.state = {
      theme: savedTheme || (prefersDark ? 'dark' : 'light'),
      audioEnabled: localStorage.getItem('studio_audio') === 'true',
      activeSection: 'home',
      activeCaseStudy: null,
      isCommandPaletteOpen: false,
      isInspectorActive: false
    };
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    if (this.state[key] === value) return;
    this.state[key] = value;

    if (key === 'theme') {
      localStorage.setItem('studio_theme', value);
      document.documentElement.setAttribute('data-theme', value);
    }

    if (key === 'audioEnabled') {
      localStorage.setItem('studio_audio', value.toString());
    }

    eventBus.emit(`state:${key}`, value);
  }
}

export const store = new Store();

