/**
 * Projects & Case Study Drawer Module
 * Renders the project cards, coordinates GSAP desktop pinned scroll,
 * and manages the deep-dive case study slide-over drawer with code tabs and focus trapping.
 */

import { eventBus } from '../core/event-bus.js';

let projectsData = [];
let lastFocusedElement = null;

export async function initProjects() {
  const track = document.getElementById('projects-track');
  const drawer = document.getElementById('case-study-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  // 1. Fetch Projects Data
  try {
    const res = await fetch('assets/data/projects.json');
    projectsData = await res.json();
    renderCards(projectsData, track);
    initHorizontalScroll();
  } catch (err) {
    console.error('Failed to load projects.json:', err);
  }

  // 2. Open Case Study Drawer Handler
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="open-case-study"]');
    if (trigger) {
      const projectId = trigger.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projectId);
      if (project) {
        lastFocusedElement = trigger;
        openDrawer(project, drawer, backdrop);
      }
    }
  });

  // 3. Close Drawer Handlers
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => closeDrawer(drawer, backdrop));
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => closeDrawer(drawer, backdrop));
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('active')) {
      closeDrawer(drawer, backdrop);
    }
  });

  // 4. Listen to external event triggers (e.g. from Command Palette)
  eventBus.on('case-study:open', (data) => {
    const project = projectsData.find(p => p.id === data.id);
    if (project) {
      openDrawer(project, drawer, backdrop);
    }
  });
}

function renderCards(projects, container) {
  if (!container) return;

  container.innerHTML = projects.map((p, idx) => `
    <article class="project-card" data-project-id="${p.id}">
      <div class="project-card__preview">
        <span class="project-card__preview-badge">${p.category}</span>
        <div style="font-family: var(--font-heading); font-size: var(--text-xl); color: #ffffff; font-weight: 700; text-align: center; padding: 1.5rem;">
          ${p.title}
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--color-warm-peach); margin-top: 6px;">[0${idx + 1} // ARCHITECTURE]</div>
        </div>
      </div>
      <div class="project-card__body">
        <div class="project-card__meta">
          <span>0${idx + 1} // 04</span>
          <span>${p.status}</span>
        </div>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__summary">${p.summary}</p>
        <div class="project-card__tags">
          ${p.technologies.slice(0, 4).map(t => `<span class="tech-badge">${t}</span>`).join('')}
        </div>
        <div class="project-card__actions">
          <button class="btn btn-primary" data-action="open-case-study" data-project-id="${p.id}" style="width: 100%;">
            View Case Study &rarr;
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function initHorizontalScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Only apply pinned horizontal scroll on desktop (>=1024px)
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const track = document.getElementById('projects-track');
    const cards = gsap.utils.toArray('.project-card');
    if (!track || cards.length === 0) return;

    gsap.to(cards, {
      xPercent: -100 * (cards.length - 1.2),
      ease: 'none',
      scrollTrigger: {
        trigger: '.work-section',
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => '+=' + (track.offsetWidth * 0.8)
      }
    });
  });
}

function openDrawer(project, drawer, backdrop) {
  if (!drawer || !backdrop) return;

  const titleEl = document.getElementById('drawer-title');
  const catEl = document.getElementById('drawer-category');
  const linksEl = document.getElementById('drawer-links');
  const overviewEl = document.getElementById('drawer-overview');
  const problemEl = document.getElementById('drawer-problem');
  const solutionEl = document.getElementById('drawer-solution');
  const roleEl = document.getElementById('drawer-role');
  const tradeoffsEl = document.getElementById('drawer-tradeoffs');
  const codeTabsEl = document.getElementById('drawer-code-tabs');
  const outcomesEl = document.getElementById('drawer-outcomes');

  if (titleEl) titleEl.textContent = project.title;
  if (catEl) catEl.textContent = `${project.category} • ${project.status}`;

  if (linksEl) {
    linksEl.innerHTML = `
      <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        GitHub Repository
      </a>
      ${project.links.live && project.links.live !== project.links.github ? `
        <a href="${project.links.live}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          Live Production App &nearr;
        </a>
      ` : ''}
    `;
  }

  if (overviewEl) overviewEl.textContent = project.caseStudy.overview;
  if (problemEl) problemEl.textContent = project.caseStudy.problem;
  if (solutionEl) solutionEl.textContent = project.caseStudy.solution;
  if (roleEl) roleEl.textContent = project.caseStudy.role;

  // Render Trade-offs Table
  if (tradeoffsEl) {
    tradeoffsEl.innerHTML = `
      <table class="tradeoffs-table">
        <thead>
          <tr>
            <th>Decision Domain</th>
            <th>Chosen Architecture</th>
            <th>Alternative Rejected</th>
            <th>Engineering Rationale</th>
          </tr>
        </thead>
        <tbody>
          ${project.caseStudy.tradeoffs.map(t => `
            <tr>
              <td><strong>${t.decision}</strong></td>
              <td style="color: var(--highlight);"><strong>${t.chosen}</strong></td>
              <td style="color: var(--text-muted);">${t.rejected}</td>
              <td>${t.reason}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  // Render Code Highlights Tabs
  if (codeTabsEl) {
    const snippets = project.caseStudy.codeSnippets;
    codeTabsEl.innerHTML = `
      <div class="code-tabs">
        <div class="code-tabs__header">
          ${snippets.map((s, idx) => `
            <button class="code-tab-btn ${idx === 0 ? 'active' : ''}" data-tab="${idx}">
              ${s.filename}
            </button>
          `).join('')}
        </div>
        <div class="code-tabs__content">
          ${snippets.map((s, idx) => `
            <div class="tab-pane ${idx === 0 ? '' : 'style=\"display:none;\"'}" id="snippet-${idx}">
              <p style="font-size: var(--text-xs); color: var(--highlight); margin-bottom: 8px;">// ${s.description}</p>
              <pre><code>${escapeHtml(s.code)}</code></pre>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Code Tab switching logic
    codeTabsEl.querySelectorAll('.code-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabIndex = btn.getAttribute('data-tab');
        codeTabsEl.querySelectorAll('.code-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        codeTabsEl.querySelectorAll('.code-tabs__content .tab-pane').forEach((pane, idx) => {
          pane.style.display = idx.toString() === tabIndex ? 'block' : 'none';
        });
      });
    });
  }

  // Render Outcomes
  if (outcomesEl) {
    outcomesEl.innerHTML = `
      <ul style="list-style: square; padding-left: 20px; line-height: 1.8; color: var(--text-secondary);">
        ${project.caseStudy.outcomes.map(o => `<li>${o}</li>`).join('')}
      </ul>
    `;
  }

  backdrop.classList.add('active');
  drawer.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus trap inside drawer
  const focusable = drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length) focusable[0].focus();

  eventBus.emit('sound:trigger', { type: 'open' });
}

function closeDrawer(drawer, backdrop) {
  if (!drawer || !backdrop) return;
  drawer.classList.remove('active');
  backdrop.classList.remove('active');
  document.body.style.overflow = '';

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }

  eventBus.emit('sound:trigger', { type: 'close' });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

