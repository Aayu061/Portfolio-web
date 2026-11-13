/**
 * Application Orchestrator & Bootstrap
 * Brand: Aayush Panchal — Independent Developer Portfolio
 */

import { initTheme } from './modules/theme.js';
import { initAudio } from './modules/audio.js';
import { initPreloader } from './modules/preloader.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroVisual } from './modules/hero-visual.js';
import { initProjects } from './modules/projects.js';
import { initCommandPalette } from './modules/command-palette.js';
import { initInspector } from './modules/inspector.js';
import { initJourney } from './modules/journey.js';
import { initContact } from './modules/contact.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core State & Theme Setup
  initTheme();
  initAudio();

  // 2. Navigation & Preloader
  initNavigation();
  initPreloader();

  // 3. Interactive Engines
  initHeroVisual();
  initProjects();
  initCommandPalette();
  initInspector();
  initJourney();
  initContact();
});

