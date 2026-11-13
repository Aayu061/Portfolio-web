/**
 * Custom Developer & Gamer Mouse Cursor Engine
 * High-performance 60fps/120fps hardware-accelerated cursor
 * with subpixel lerp follower physics and interactive hover states.
 */

export function initCursor() {
  // Only initialize on devices with a mouse/precision pointer and without reduced motion
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) {
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const dot = document.getElementById('cursor-dot');
  const follower = document.getElementById('cursor-follower');

  if (!dot || !follower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;
  let isHovered = false;
  let isVisible = false;
  let isTicking = false;

  // Track cursor position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.classList.add('cursor-visible');
      follower.classList.add('cursor-visible');
    }

    // Direct transform for the precision dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateFollower);
    }
  }, { passive: true });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.classList.remove('cursor-visible');
    follower.classList.remove('cursor-visible');
  });

  document.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.classList.add('cursor-visible');
    follower.classList.add('cursor-visible');
  });

  // Smooth lerp physics for follower ring
  function updateFollower() {
    const ease = 0.18;
    followerX += (mouseX - followerX) * ease;
    followerY += (mouseY - followerY) * ease;

    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;

    const deltaX = Math.abs(mouseX - followerX);
    const deltaY = Math.abs(mouseY - followerY);

    if (deltaX > 0.1 || deltaY > 0.1) {
      requestAnimationFrame(updateFollower);
    } else {
      isTicking = false;
    }
  }

  // Active click compression pulse
  window.addEventListener('mousedown', () => {
    follower.classList.add('cursor-active');
  });

  window.addEventListener('mouseup', () => {
    follower.classList.remove('cursor-active');
  });

  // Interactive hover expansion for clickable elements
  const hoverSelector = 'a, button, [role="button"], .project-card-editorial, input, textarea, select, [tabindex="0"]';

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target && !isHovered) {
      isHovered = true;
      follower.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(hoverSelector);
    if (target && isHovered) {
      // Check if relatedTarget is still inside an interactive target
      if (!e.relatedTarget || !e.relatedTarget.closest(hoverSelector)) {
        isHovered = false;
        follower.classList.remove('cursor-hover');
      }
    }
  });
}
