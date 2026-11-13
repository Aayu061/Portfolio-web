/**
 * Journey Timeline Module
 * Renders verified education foundation and project milestones with filter pills.
 */

export async function initJourney() {
  const timelineContainer = document.getElementById('journey-timeline');
  const filterPills = document.querySelectorAll('.filter-pill');

  let journeyItems = [];

  try {
    const res = await fetch('assets/data/journey.json');
    journeyItems = await res.json();
    renderTimeline(journeyItems, 'ALL');
  } catch (err) {
    console.error('Failed to load journey.json:', err);
  }

  function renderTimeline(items, filter) {
    if (!timelineContainer) return;

    const filtered = filter === 'ALL' 
      ? items 
      : items.filter(item => item.category === filter);

    timelineContainer.innerHTML = filtered.map(item => `
      <article class="timeline-node">
        <div class="timeline-node__period">${item.period} • [${item.category}]</div>
        <h3 class="timeline-node__title">${item.title}</h3>
        <div class="timeline-node__org">${item.organization}</div>
        <p style="font-size: var(--text-sm); margin-bottom: 0.75rem;">${item.description}</p>
        <ul style="list-style: disc; padding-left: 1.25rem; font-size: var(--text-xs); color: var(--text-secondary); margin-bottom: 0.75rem; line-height: 1.6;">
          ${item.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${item.tags.map(t => `<span class="tech-badge" style="font-size: 10px;">${t}</span>`).join('')}
        </div>
      </article>
    `).join('');
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

