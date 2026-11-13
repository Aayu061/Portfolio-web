/**
 * Global Event Bus — Micro-Pub/Sub Engine
 * Provides decoupled communication between all studio modules.
 */

class EventBus {
  constructor() {
    this.target = new EventTarget();
  }

  on(event, callback) {
    this.target.addEventListener(event, (e) => callback(e.detail));
  }

  off(event, callback) {
    this.target.removeEventListener(event, callback);
  }

  emit(event, detail = {}) {
    this.target.dispatchEvent(new CustomEvent(event, { detail }));
  }
}

export const eventBus = new EventBus();

