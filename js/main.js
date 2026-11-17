/**
 * Application Orchestrator & Bootstrap
 * Brand: Aayush Panchal — Independent Developer Portfolio
 */

import { initTheme } from './modules/theme.js?v=2.8.0';
import { initCursor } from './modules/cursor.js?v=2.8.0';
import { initMotion } from './modules/motion.js?v=2.8.0';
import { initPreloader } from './modules/preloader.js?v=2.8.0';
import { initNavigation } from './modules/navigation.js?v=2.8.0';
import { initHeroVisual } from './modules/hero-visual.js?v=2.8.0';
import { initProjects } from './modules/projects.js?v=2.8.0';
import { initSkillEvidence } from './modules/skills.js?v=2.8.0';
import { initQuickDock } from './modules/quick-dock.js?v=2.8.0';
import { initCommandPalette } from './modules/command-palette.js?v=2.8.0';
import { initInspector } from './modules/inspector.js?v=2.8.0';
import { initJourney } from './modules/journey.js?v=2.8.0';
import { initContact } from './modules/contact.js?v=2.8.0';
import { initResumePreview } from './modules/resume-preview.js?v=2.8.0';
import { initPortrait } from './modules/portrait.js?v=2.8.0';

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
