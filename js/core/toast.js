/**
 * Global HUD Toast Notification Utility
 */

export function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast-hud');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (toast._timer) {
    clearTimeout(toast._timer);
  }

  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}
