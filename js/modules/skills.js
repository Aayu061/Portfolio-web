/**
 * Skill Evidence Module (v2.7.0)
 * Turns the Core Competencies pills into toggle buttons. Selecting a skill lists
 * the projects in assets/data/projects.json that actually use it (matched against
 * each project's tech stack, role, architecture, and links), and each result opens
 * that project's case study. Nothing is invented: no match means no project chip.
 */

export async function initSkillEvidence() {
  const pills = [...document.querySelectorAll('.skill-pill-dark[data-skill-keys]')];
  const panel = document.querySelector('.skill-evidence');
  if (!pills.length || !panel) return;

  const hintNode = panel.firstElementChild?.cloneNode(true) ?? null;

  let projects = [];
  try {
    const res = await fetch('assets/data/projects.json');
    projects = await res.json();
  } catch (err) {
    console.error('Skill evidence: failed to load projects.json', err);
    return;
  }

  const index = projects.map((p) => ({
    id: p.id,
    title: p.title,
    text: [
      (p.technologies || []).join(' '),
      p.caseStudy?.role,
      p.caseStudy?.solution,
      p.caseStudy?.architecture?.description,
      p.links?.github
    ].filter(Boolean).join(' ').toLowerCase()
  }));

  let selected = null;

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      selected = selected === pill ? null : pill;
      pills.forEach((p) => p.setAttribute('aria-pressed', String(p === selected)));
      render(selected);
    });
  });

  function render(pill) {
    panel.replaceChildren();

    if (!pill) {
      panel.classList.remove('has-result');
      if (hintNode) panel.appendChild(hintNode.cloneNode(true));
      return;
    }

    const keys = pill.dataset.skillKeys.split(',').map((k) => k.trim().toLowerCase()).filter(Boolean);
    const matches = index.filter((project) => keys.some((key) => project.text.includes(key)));
    const skillName = pill.textContent.trim();

    const label = document.createElement('span');
    label.className = 'skill-evidence__label';
    label.textContent = matches.length
      ? `${skillName} — used in ${matches.length} project${matches.length > 1 ? 's' : ''}`
      : skillName;
    panel.appendChild(label);

    if (matches.length) {
      const list = document.createElement('div');
      list.className = 'skill-evidence__list';
      matches.forEach((project) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'skill-evidence__project';
        chip.dataset.action = 'open-case-study';
        chip.dataset.projectId = project.id;
        chip.textContent = `${project.title} →`;
        chip.setAttribute('aria-label', `Open ${project.title} case study`);
        list.appendChild(chip);
      });
      panel.appendChild(list);
    }

    if (pill.dataset.skillNote) {
      const note = document.createElement('span');
      note.className = 'skill-evidence__note';
      note.textContent = pill.dataset.skillNote;
      panel.appendChild(note);
    }

    panel.classList.add('has-result');

    if (document.documentElement.classList.contains('motion-on') && typeof gsap !== 'undefined') {
      gsap.from(panel.children, { autoAlpha: 0, y: 8, duration: 0.35, stagger: 0.05, ease: 'power2.out', clearProps: 'all' });
      gsap.from(panel.querySelectorAll('.skill-evidence__project'), { autoAlpha: 0, x: -8, duration: 0.35, stagger: 0.06, delay: 0.1, ease: 'power2.out', clearProps: 'all' });
    }
  }
}
