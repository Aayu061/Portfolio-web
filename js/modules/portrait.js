/**
 * Hero Center Cutout Module
 * Manages the authentic photo cutout presentation.
 */

export function initPortrait() {
  const cutoutImg = document.getElementById('hero-cutout-img');
  if (!cutoutImg) return;

  // Add subtle interactive tilt/hover depth if supported
  cutoutImg.addEventListener('mouseenter', () => {
    cutoutImg.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    cutoutImg.style.transform = 'scale(1.02) translateY(-4px)';
  });

  cutoutImg.addEventListener('mouseleave', () => {
    cutoutImg.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    cutoutImg.style.transform = 'scale(1) translateY(0)';
  });
}
