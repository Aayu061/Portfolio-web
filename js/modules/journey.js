/**
 * Journey Timeline Module
 * Renders verified education foundation and project milestones with filter pills.
 */

import { eventBus } from '../core/event-bus.js';

export async function initJourney() {
  const timelineContainer = document.getElementById('journey-timeline');
  const filterPills = document.querySelectorAll('.filter-pill');

  let journeyItems = [];

  try {
    const res = await fetch('assets/data/journey.json');
    journeyItems = await res.json();

    // Keep the "ALL [n]" label in sync with the data instead of a hardcoded count
    const allPill = document.querySelector('.filter-pill[data-filter="ALL"]');
    if (allPill) allPill.textContent = `ALL [${journeyItems.length}]`;

    renderTimeline(journeyItems, 'ALL', true);
  } catch (err) {
    console.error('Failed to load journey.json:', err);
  }

  function renderTimeline(items, filter, initial = false) {
    if (!timelineContainer) return;

    const filtered = filter === 'ALL' 
      ? items 
      : items.filter(item => item.category === filter);

    timelineContainer.innerHTML = filtered.map(item => `
      <article class="timeline-node">
        <div class="timeline-node__period">${item.period} &bull; [${item.category}]</div>
        <h3 class="timeline-node__title">${item.title}</h3>
        <div class="timeline-node__org">${item.organization}</div>
        <p class="timeline-node__desc">${item.description}</p>
        <ul class="timeline-node__highlights">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div class="timeline-node__tags">
          ${item.tags.map(t => `<span class="tech-badge tech-badge-sm">${t}</span>`).join('')}
        </div>
      </article>
    `).join('');

    eventBus.emit('journey:rendered', { filter, initial });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-filter') || 'ALL';
      renderTimeline(journeyItems, cat);
    });
  });
}
