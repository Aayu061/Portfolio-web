/**
 * Hero Center Cutout Module
 * Ensures the authentic photo cutout stays completely fixed and static.
 */

export function initPortrait() {
  const cutoutImg = document.getElementById('hero-cutout-img');
  if (!cutoutImg) return;

  // Keep image fixed and static - no zoom or hover shifts
  cutoutImg.style.transform = 'none';
  cutoutImg.style.transition = 'none';
}
