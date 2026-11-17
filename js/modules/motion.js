/**
 * Motion System Module (v2.7.0)
 * GSAP + ScrollTrigger choreography for the whole page:
 *  - Hero entrance after the preloader curtains split (watermark letters,
 *    line-mask name reveal, staggered copy, stat counters)
 *  - Scroll-triggered reveals, line-mask display headings, decoding mono labels
 *  - Tech ticker that speeds up with scroll velocity
 *  - Project card 3D tilt + cursor spotlight, magnetic CTAs (fine pointers only)
 *  - Journey progress rail with milestone dots lighting up
 *  - Case-study drawer content stagger
 *
 * Skipped entirely under prefers-reduced-motion or if GSAP fails to load, so
 * every element keeps its natural, fully visible CSS state.
 */

import { eventBus } from '../core/event-bus.js';

const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const hasFinePointer = window.matchMedia?.('(pointer: fine)').matches;
const SCRAMBLE_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>[]*+-_';

export function initMotion() {
  if (prefersReducedMotion || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion-on');

  const heroTimeline = prepareHero();
  initHeadingReveals();
  initLabelDecoding();
  initScrollReveals();
  initTicker();
  initJourneyProgress();
  initDrawerStagger();
  initCaseStudyMorph();
  initHeroExit();
  initRevealSafetyNet();

  if (hasFinePointer) {
    document.documentElement.classList.add('has-tilt');
    initCardTilt();
    initMagnetic();
  }

  // Start the hero as the preloader curtains part (studio:ready is the backup signal,
  // and the timeout guarantees the hero never stays hidden).
  let heroStarted = false;
  const startHero = () => {
    if (heroStarted) return;
    heroStarted = true;
    gsap.delayedCall(0.15, () => heroTimeline.play());
  };
  eventBus.on('preloader:exit', startHero);
  eventBus.on('studio:ready', startHero);
  setTimeout(startHero, 2600);

  // Late layout shifts (web fonts, lazy images, JSON-rendered sections)
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* --------------------------------------------------------------------------
   Hero entrance
   -------------------------------------------------------------------------- */
function prepareHero() {
  const $ = (sel) => document.querySelector(sel);
  const metaBar = $('.hero-top-meta');
  const metaLabel = metaBar?.firstElementChild;
  const watermark = $('.hero-watermark');
  const intro = $('.hero-intro-script');
  const name = $('.hero-display-name');
  const subtitle = $('.hero-display-subtitle');
  const lead = $('.hero-lead');
  const pill = $('.hero-status-pill');
  const actions = $('.hero-left-col .about-actions');
  const cutout = $('.hero-center-cutout');
  const sparkle = $('.hero-sparkle-box');
  const stats = gsap.utils.toArray('.hero-stat-item');
  const counters = stats.map((item) => prepareCounter(item.querySelector('.hero-stat-num'))).filter(Boolean);

  const letters = watermark ? splitLetters(watermark) : [];
  const nameLines = name ? splitLines(name) : [];

  const fadeUps = [intro, subtitle, lead, pill, actions, sparkle, ...stats].filter(Boolean);
  gsap.set(fadeUps, { autoAlpha: 0, y: 26 });
  if (metaBar) gsap.set(metaBar, { autoAlpha: 0, y: -12 });
  if (letters.length) gsap.set(letters, { yPercent: 115, autoAlpha: 0 });
  else if (watermark) gsap.set(watermark, { autoAlpha: 0 });
  // The portrait is intentionally kept transform-free, so it only fades in.
  if (cutout) gsap.set(cutout, { autoAlpha: 0 });
  if (nameLines.length) gsap.set(nameLines, { yPercent: 105 });

  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out', duration: 0.8 },
    onComplete: () => {
      gsap.set(fadeUps, { clearProps: 'transform,opacity,visibility' });
      if (metaBar) gsap.set(metaBar, { clearProps: 'transform,opacity,visibility' });
      initWatermarkParallax(letters);
    }
  });

  if (metaBar) {
    tl.to(metaBar, { autoAlpha: 1, y: 0, duration: 0.6 }, 0);
    tl.add(() => scramble(metaLabel, 1.1), 0.05);
  }

  if (letters.length) {
    tl.to(letters, { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.055, ease: 'power4.out' }, 0.1);
  } else if (watermark) {
    tl.to(watermark, { autoAlpha: 1, duration: 1 }, 0.1);
  }

  if (cutout) tl.to(cutout, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 0.35);
  if (intro) tl.to(intro, { autoAlpha: 1, y: 0 }, 0.3);

  if (nameLines.length) {
    tl.to(nameLines, {
      yPercent: 0,
      duration: 1,
      stagger: 0.12,
      ease: 'power4.out',
      onComplete: () => unmask(nameLines)
    }, 0.4);
  }

  tl.to([subtitle, lead, pill, actions].filter(Boolean), { autoAlpha: 1, y: 0, stagger: 0.09 }, 0.65);
  if (sparkle) tl.to(sparkle, { autoAlpha: 1, y: 0 }, 0.7);
  if (stats.length) tl.to(stats, { autoAlpha: 1, y: 0, stagger: 0.1 }, 0.8);
  counters.forEach((runCounter) => tl.add(runCounter, 0.9));

  return tl;
}

/* Split an aria-hidden decorative word into letter spans. Bails out (keeps the
   original text) if splitting would change its width, protecting the calibrated
   hero layout from kerning drift. */
function splitLetters(el) {
  const original = el.textContent;
  const before = el.getBoundingClientRect().width;
  el.textContent = '';
  const spans = [...original].map((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    span.style.display = 'inline-block';
    el.appendChild(span);
    return span;
  });
  const after = el.getBoundingClientRect().width;
  if (Math.abs(after - before) > 1.5) {
    el.textContent = original;
    return [];
  }
  return spans;
}

/* Wrap each <br>-separated line of a heading in a mask so it can slide up from
   behind its own baseline. Returns the inner (moving) spans. */
function splitLines(el) {
  const groups = [[]];
  [...el.childNodes].forEach((node) => {
    if (node.nodeName === 'BR') groups.push([]);
    else groups[groups.length - 1].push(node);
  });

  el.textContent = '';
  return groups
    .filter((nodes) => nodes.some((n) => n.nodeType === Node.ELEMENT_NODE || n.textContent.trim()))
    .map((nodes) => {
      const line = document.createElement('span');
      line.className = 'reveal-line is-masking';
      const inner = document.createElement('span');
      inner.className = 'reveal-line__inner';
      nodes.forEach((n) => inner.appendChild(n));
      line.appendChild(inner);
      el.appendChild(line);
      return inner;
    });
}

function unmask(inners) {
  inners.forEach((inner) => inner.parentElement?.classList.remove('is-masking'));
  gsap.set(inners, { clearProps: 'transform' });
}

/* Count a pure number (e.g. "4", "100%") up from zero. Labels with a text
   prefix such as "SEM 6" are left alone. Returns a function the timeline calls. */
function prepareCounter(el) {
  if (!el) return null;
  const raw = el.textContent.trim();
  const match = raw.match(/^(\d+)(\D*)$/);
  if (!match) return null;

  const target = parseInt(match[1], 10);
  const suffix = match[2];
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  el.textContent = `0${suffix}`;

  return () => {
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = `${Math.round(state.value)}${suffix}`; },
      onComplete: () => {
        el.textContent = raw;
        el.style.minWidth = '';
      }
    });
  };
}

function initWatermarkParallax(letters) {
  if (!letters.length) return;
  gsap.to(letters, {
    yPercent: (i) => -18 - (i % 3) * 14,
    ease: 'none',
    immediateRender: false,
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6
    }
  });
}

/* --------------------------------------------------------------------------
   Section headings, decoding labels, scroll reveals
   -------------------------------------------------------------------------- */
function initHeadingReveals() {
  gsap.utils.toArray('.projects-title-editorial, .journey-title-editorial, .contact-headline-editorial').forEach((heading) => {
    const lines = splitLines(heading);
    if (!lines.length) return;
    gsap.set(lines, { yPercent: 105 });

    // Accent rule that draws left→right with the heading: full-width over the
    // projects header divider, a short bar under the other headings.
    const rule = document.createElement('span');
    rule.className = 'heading-rule';
    rule.setAttribute('aria-hidden', 'true');
    const projectsHeader = heading.closest('.projects-header-editorial');
    if (projectsHeader) {
      rule.classList.add('heading-rule--divider');
      projectsHeader.appendChild(rule);
    } else {
      heading.insertAdjacentElement('afterend', rule);
    }
    gsap.set(rule, { scaleX: 0 });

    ScrollTrigger.create({
      trigger: heading,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(lines, {
          yPercent: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          onComplete: () => unmask(lines)
        });
        gsap.to(rule, { scaleX: 1, duration: 1.1, delay: 0.25, ease: 'power3.inOut' });
      }
    });
  });
}

/* Hero copy drifts up and dims as the hero scrolls out (portrait stays static) */
function initHeroExit() {
  const cols = gsap.utils.toArray('.hero-left-col, .hero-right-col');
  if (!cols.length) return;
  gsap.to(cols, {
    y: -70,
    opacity: 0.15,
    ease: 'none',
    immediateRender: false,
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.4 }
  });
}

function initLabelDecoding() {
  gsap.utils.toArray('.bento-micro-tag, .mockup-badge').forEach((label) => {
    ScrollTrigger.create({
      trigger: label,
      start: 'top 92%',
      once: true,
      onEnter: () => scramble(label, 0.9)
    });
  });
}

/* Text "decode" effect for short monospace labels (no layout shift since every
   glyph has the same advance width). Only runs on text-only elements. */
function scramble(el, duration = 0.9) {
  if (!el || el.children.length || el.dataset.decoded) return;
  el.dataset.decoded = 'true';
  const finalText = el.textContent;
  const total = duration * 1000;
  const start = performance.now();

  const frame = (now) => {
    const progress = Math.min(1, (now - start) / total);
    const settled = Math.floor(progress * finalText.length);
    let out = '';
    for (let i = 0; i < finalText.length; i++) {
      const ch = finalText[i];
      out += i < settled || /[\s/&.()]/.test(ch)
        ? ch
        : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
    }
    el.textContent = progress < 1 ? out : finalText;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

// Elements still waiting for their reveal; the safety net below shows any that a
// fast jump (nav click, deep link, back/forward restore) left hidden on screen.
const pendingReveals = new Set();
const REVEAL_CLEAR = 'transform,opacity,visibility,transition';

function showNow(elements) {
  elements.forEach((el) => pendingReveals.delete(el));
  gsap.set(elements, { clearProps: REVEAL_CLEAR });
}

function revealBatch(selector, { y = 40, x = 0, stagger = 0.08, start = 'top 88%', duration = 0.8 } = {}) {
  const elements = gsap.utils.toArray(selector);
  if (!elements.length) return;

  // Inline transition:none stops CSS hover transitions from fighting the tween.
  gsap.set(elements, { autoAlpha: 0, x, y, transition: 'none' });
  elements.forEach((el) => pendingReveals.add(el));

  ScrollTrigger.batch(elements, {
    start,
    once: true,
    onEnter: (batch) => {
      // Already scrolled past (above the screen): no point animating out of view.
      const above = batch.filter((el) => el.getBoundingClientRect().bottom < 0);
      const visible = batch.filter((el) => !above.includes(el));
      if (above.length) showNow(above);
      if (!visible.length) return;

      visible.forEach((el) => pendingReveals.delete(el));
      gsap.to(visible, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        overwrite: true,
        onComplete: () => gsap.set(visible, { clearProps: REVEAL_CLEAR })
      });
    }
  });
}

function initRevealSafetyNet() {
  const sweep = () => {
    const stuck = [...pendingReveals].filter((el) => el.isConnected && el.getBoundingClientRect().top < window.innerHeight);
    if (stuck.length) showNow(stuck);
  };
  ScrollTrigger.addEventListener('scrollEnd', sweep);
  window.addEventListener('load', () => setTimeout(sweep, 1200));
  window.addEventListener('pageshow', (e) => { if (e.persisted) sweep(); });
}

function initScrollReveals() {
  revealBatch('.projects-intro-editorial, .view-all-editorial', { y: 18 });
  revealBatch('.project-grid-item', { y: 60, stagger: 0.1, duration: 0.9 });
  revealBatch('.bento-card-editorial', { y: 50, stagger: 0.12, duration: 0.9 });
  revealBatch('.process-step', { y: 18, stagger: 0.08, start: 'top 92%' });
  revealBatch('.skill-pill-dark', { y: 12, stagger: 0.035, start: 'top 94%', duration: 0.5 });
  revealBatch('.journey-sub-editorial, .journey-filters', { y: 20 });
  revealBatch('.contact-sub-editorial, .contact-item-row, .contact-mockup-frame', { y: 26, stagger: 0.07 });
  revealBatch('.contact-form-card', { y: 50, duration: 1 });
  revealBatch('.footer-inner', { y: 16, start: 'top 98%' });
}

/* --------------------------------------------------------------------------
   Tech ticker — constant loop that surges with scroll velocity
   -------------------------------------------------------------------------- */
function initTicker() {
  const track = document.querySelector('.tech-ticker__track');
  if (!track) return;

  const loop = gsap.to(track, { xPercent: -50, duration: 45, ease: 'none', repeat: -1 });
  let settle = null;

  ScrollTrigger.create({
    trigger: '.tech-ticker',
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
    onUpdate: (self) => {
      const surge = 1 + Math.min(5, Math.abs(self.getVelocity()) / 300);
      gsap.to(loop, { timeScale: surge, duration: 0.2, overwrite: true });
      settle?.kill();
      settle = gsap.delayedCall(0.15, () => {
        gsap.to(loop, { timeScale: 1, duration: 0.9, ease: 'power2.out', overwrite: true });
      });
    }
  });
}

/* --------------------------------------------------------------------------
   Project cards — 3D tilt, depth on the mockup title, cursor spotlight
   -------------------------------------------------------------------------- */
function initCardTilt() {
  const cards = gsap.utils.toArray('.project-card-editorial');
  const rects = new Map();
  window.addEventListener('scroll', () => rects.clear(), { passive: true });
  window.addEventListener('resize', () => rects.clear(), { passive: true });

  cards.forEach((card) => {
    // Depth layer: the live screenshot (or the text title on cards without one)
    const title = card.querySelector('.mockup-shot, .mockup-screen-title');
    const tween = { duration: 0.6, ease: 'power3.out' };
    const rotateX = gsap.quickTo(card, 'rotationX', tween);
    const rotateY = gsap.quickTo(card, 'rotationY', tween);
    const lift = gsap.quickTo(card, 'y', tween);
    const titleX = title ? gsap.quickTo(title, 'x', tween) : null;
    const titleY = title ? gsap.quickTo(title, 'y', tween) : null;
    gsap.set(card, { transformPerspective: 900 });

    card.addEventListener('pointerenter', () => {
      rects.set(card, card.getBoundingClientRect());
      lift(-6);
    });

    card.addEventListener('pointermove', (e) => {
      let rect = rects.get(card);
      if (!rect) {
        rect = card.getBoundingClientRect();
        rects.set(card, rect);
      }
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rotateY((px - 0.5) * 9);
      rotateX((0.5 - py) * 7);
      titleX?.((px - 0.5) * 12);
      titleY?.((py - 0.5) * 8);
      card.style.setProperty('--spot-x', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--spot-y', `${(py * 100).toFixed(1)}%`);
    }, { passive: true });

    card.addEventListener('pointerleave', () => {
      rects.delete(card);
      rotateX(0);
      rotateY(0);
      lift(0);
      titleX?.(0);
      titleY?.(0);
    });
  });
}

/* Primary CTAs drift toward the cursor */
function initMagnetic() {
  gsap.utils.toArray('.hero-left-col .about-actions .btn, .btn-submit-form').forEach((btn) => {
    btn.classList.add('is-magnetic');
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.45, ease: 'power3.out' });

    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
    }, { passive: true });

    btn.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* --------------------------------------------------------------------------
   Journey — scroll-linked progress rail and milestone activation
   -------------------------------------------------------------------------- */
function initJourneyProgress() {
  const track = document.querySelector('.journey-track');
  const bar = document.querySelector('.journey-progress');
  if (!track || !bar) return;

  gsap.to(bar, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: track, start: 'top 60%', end: 'bottom 60%', scrub: 0.5 }
  });

  let nodeTriggers = [];

  eventBus.on('journey:rendered', ({ initial } = {}) => {
    nodeTriggers.forEach((t) => t.kill());
    nodeTriggers = [];

    const nodes = gsap.utils.toArray('#journey-timeline .timeline-node');

    // Only the most recent lit milestone gets the accent glow
    const markCurrent = () => {
      const lit = nodes.filter((n) => n.classList.contains('is-active'));
      nodes.forEach((n) => n.classList.toggle('is-current', n === lit[lit.length - 1]));
    };

    nodes.forEach((node) => {
      nodeTriggers.push(ScrollTrigger.create({
        trigger: node,
        start: 'top 60%',
        onEnter: () => { node.classList.add('is-active'); markCurrent(); },
        onLeaveBack: () => { node.classList.remove('is-active'); markCurrent(); }
      }));
    });

    // Cards slide off the rail (from the left) rather than rising
    if (initial) {
      revealBatch(nodes, { x: -32, y: 0, stagger: 0.1 });
    } else {
      gsap.fromTo(nodes, { autoAlpha: 0, x: -24, y: 0, transition: 'none' }, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
        onComplete: () => gsap.set(nodes, { clearProps: 'transform,opacity,visibility,transition' })
      });
    }

    ScrollTrigger.refresh();
  });
}

/* --------------------------------------------------------------------------
   Card ⇄ case-study morph — the card screenshot flies into the drawer header
   on open and back into the card on close (FLIP with a temporary clone).
   -------------------------------------------------------------------------- */
function initCaseStudyMorph() {
  const drawer = document.getElementById('case-study-drawer');
  const shot = document.getElementById('drawer-shot');
  if (!drawer || !shot) return;

  let flight = null;

  const isOnScreen = (r) => r.width > 0 && r.height > 0
    && r.top + r.height > 0 && r.left + r.width > 0
    && r.top < window.innerHeight && r.left < window.innerWidth;

  const cardShot = (id) => document.querySelector(`.project-card-editorial[data-project-id="${id}"] .mockup-shot`);

  // Visible screenshot area of a card: the frame minus its browser-chrome bar
  // (the <img> itself is slightly scaled up inside an overflow-hidden frame).
  const cardShotRect = (img) => {
    const frame = img.parentElement.getBoundingClientRect();
    const chrome = img.parentElement.querySelector('.mockup-chrome')?.offsetHeight || 0;
    return { left: frame.left, top: frame.top + chrome, width: frame.width, height: frame.height - chrome };
  };

  // Where the drawer screenshot rests once the drawer has fully slid in
  const restingDrawerShotRect = () => {
    const wrap = shot.parentElement;
    const drawerLeft = document.documentElement.clientWidth - drawer.offsetWidth + drawer.clientLeft;
    return {
      left: drawerLeft + wrap.offsetLeft,
      top: wrap.offsetTop - drawer.scrollTop,
      width: wrap.offsetWidth,
      height: wrap.offsetHeight
    };
  };

  // The clone is laid out at the large rect; scaling shrinks it onto the small one.
  const fly = (src, large, small, direction, done) => {
    flight?.progress(1);
    const clone = document.createElement('img');
    clone.src = src;
    clone.alt = '';
    clone.className = 'shot-morph-clone';
    clone.style.width = `${large.width}px`;
    clone.style.height = `${large.height}px`;
    document.body.appendChild(clone);

    const smallState = { x: small.left, y: small.top, scaleX: small.width / large.width, scaleY: small.height / large.height };
    const largeState = { x: large.left, y: large.top, scaleX: 1, scaleY: 1 };
    const [from, to] = direction === 'open' ? [smallState, largeState] : [largeState, smallState];

    flight = gsap.fromTo(clone, from, {
      ...to,
      duration: direction === 'open' ? 0.75 : 0.55,
      ease: 'power3.inOut',
      onComplete: () => {
        clone.remove();
        flight = null;
        done();
      }
    });
  };

  eventBus.on('case-study:opened', ({ id }) => {
    const source = cardShot(id);
    if (!source) return;
    const from = cardShotRect(source);
    if (!isOnScreen(from)) return;

    gsap.set([shot, source], { autoAlpha: 0 });
    fly(source.currentSrc || source.src, restingDrawerShotRect(), from, 'open', () => {
      gsap.set([shot, source], { clearProps: 'opacity,visibility' });
    });
  });

  eventBus.on('case-study:closing', ({ id }) => {
    const target = cardShot(id);
    if (!target) return;
    const to = cardShotRect(target);
    const from = shot.parentElement.getBoundingClientRect();
    if (!isOnScreen(to) || !isOnScreen(from)) return;

    gsap.set([shot, target], { autoAlpha: 0 });
    fly(shot.currentSrc || shot.src, from, to, 'close', () => {
      gsap.set([shot, target], { clearProps: 'opacity,visibility' });
    });
  });
}

/* --------------------------------------------------------------------------
   Case-study drawer — stagger its sections in after it slides open
   -------------------------------------------------------------------------- */
function initDrawerStagger() {
  eventBus.on('case-study:opened', () => {
    const drawer = document.getElementById('case-study-drawer');
    if (!drawer) return;
    const blocks = drawer.querySelectorAll('.drawer-category, .drawer-title, .drawer-links, .drawer-section');
    gsap.fromTo(blocks, { autoAlpha: 0, y: 24 }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.06,
      delay: 0.12,
      ease: 'power3.out',
      overwrite: true,
      onComplete: () => gsap.set(blocks, { clearProps: 'transform,opacity,visibility' })
    });
  });
}
