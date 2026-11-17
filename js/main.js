/**
 * Application Orchestrator & Bootstrap
 * Brand: Aayush Panchal — Independent Developer Portfolio
 */

import { initTheme } from './modules/theme.js';
import { initCursor } from './modules/cursor.js';
import { initMotion } from './modules/motion.js';
import { initPreloader } from './modules/preloader.js';
import { initNavigation } from './modules/navigation.js';
import { initHeroVisual } from './modules/hero-visual.js';
import { initProjects } from './modules/projects.js';
import { initSkillEvidence } from './modules/skills.js';
import { initQuickDock } from './modules/quick-dock.js';
import { initCommandPalette } from './modules/command-palette.js';
import { initInspector } from './modules/inspector.js';
import { initJourney } from './modules/journey.js';
import { initContact } from './modules/contact.js';
import { initResumePreview } from './modules/resume-preview.js';
import { initPortrait } from './modules/portrait.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Core State & Theme Setup
  initTheme();
  initCursor();

  // 2. Motion system subscribes to preloader/journey events, so it boots first
  initMotion();

  // 3. Navigation & Preloader
  initNavigation();
  initPreloader();

  // 4. Interactive Engines
  initHeroVisual();
  initProjects();
  initSkillEvidence();
  initQuickDock();
  initPortrait();
  initResumePreview();
  initCommandPalette();
  initInspector();
  initJourney();
  initContact();
});
