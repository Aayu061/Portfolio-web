/**
 * Recruiter Quick-Links Dock (v2.7.0)
 * Keeps Resume / Email / LinkedIn / GitHub one click away. The dock slides in once
 * the hero is mostly scrolled past and steps aside at the contact section, where the
 * same links already live. Visibility is CSS-driven (no GSAP dependency).
 */

export function initQuickDock() {
  const dock = document.querySelector('.quick-dock');
  const hero = document.getElementById('home');
  const contact = document.getElementById('contact');
  if (!dock || !hero || !('IntersectionObserver' in window)) return;

  const state = { heroInView: true, contactInView: false };

  const update = () => {
    const show = !state.heroInView && !state.contactInView;
    dock.classList.toggle('is-visible', show);
    document.body.classList.toggle('has-quick-dock', show);
  };

  new IntersectionObserver(([entry]) => {
    state.heroInView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
    update();
  }, { threshold: [0, 0.35] }).observe(hero);

  if (contact) {
    new IntersectionObserver(([entry]) => {
      state.contactInView = entry.isIntersecting;
      update();
    }, { rootMargin: '0px 0px -25% 0px' }).observe(contact);
  }
}
