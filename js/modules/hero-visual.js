/**
 * Interactive System Node Engine (Hero Centerpiece)
 * Renders a reactive 2D Canvas/SVG network graph representing Aayush's engineering ecosystem.
 * Features: Spring cursor physics, moving packet pulses, and interactive node telemetry.
 */

import { store } from '../core/store.js';
import { eventBus } from '../core/event-bus.js';

export function initHeroVisual() {
  const canvas = document.getElementById('hero-canvas');
  const tooltip = document.querySelector('.hero-telemetry-tooltip');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;

  // Handle High-DPI screens
  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  // System Nodes Definition
  const nodes = [
    {
      id: 'core',
      label: 'AAYUSH (CORE)',
      subtext: 'Orchestrator',
      relX: 0.5,
      relY: 0.5,
      radius: 38,
      isCore: true,
      telemetry: 'System Core: Full-Stack Engineering, Architecture, Clean Code'
    },
    {
      id: 'frontend',
      label: 'Frontend',
      subtext: 'UI / GSAP',
      relX: 0.22,
      relY: 0.24,
      radius: 26,
      telemetry: 'Frontend: HTML5, CSS3 Tokens, ES6+, GSAP, Canvas 2D, a11y'
    },
    {
      id: 'backend',
      label: 'Backend',
      subtext: 'Node / Express',
      relX: 0.78,
      relY: 0.22,
      radius: 26,
      telemetry: 'Backend: Express.js, REST APIs, JWT Security, RBAC, Webhooks'
    },
    {
      id: 'database',
      label: 'Database',
      subtext: 'Postgres / Supabase',
      relX: 0.82,
      relY: 0.72,
      radius: 26,
      telemetry: 'Database: PostgreSQL, Relational Schemas, SQL Migrations, RLS'
    },
    {
      id: 'ai',
      label: 'AI & Automation',
      subtext: 'Gemini API',
      relX: 0.18,
      relY: 0.76,
      radius: 26,
      telemetry: 'AI: Gemini Intent Engines, Deterministic Queries, Codex Workflows'
    },
    {
      id: 'cloud',
      label: 'Cloud & Edge',
      subtext: 'Vercel / Render',
      relX: 0.5,
      relY: 0.88,
      radius: 24,
      telemetry: 'DevOps: Vercel Edge CDN, Render Web Services, GitHub CI'
    }
  ];

  // Moving Packet Particles along splines
  const packets = nodes
    .filter(n => !n.isCore)
    .map(targetNode => ({
      targetNode,
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.004
    }));

  let mouse = { x: -1000, y: -1000, active: false };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.active = false;
    if (tooltip) tooltip.classList.remove('active');
  });

  // Node Clicking Telemetry
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    let clickedNode = null;
    nodes.forEach(node => {
      const dx = clickX - node.currentX;
      const dy = clickY - node.currentY;
      if (Math.hypot(dx, dy) < node.radius + 8) {
        clickedNode = node;
      }
    });

    if (clickedNode && tooltip) {
      tooltip.textContent = clickedNode.telemetry;
      tooltip.classList.add('active');
      eventBus.emit('sound:trigger', { type: 'click' });
    }
  });

  let time = 0;

  function render() {
    time += 0.02;
    ctx.clearRect(0, 0, width, height);

    const isDark = store.get('theme') === 'dark';
    const primaryColor = isDark ? '#f8f0ed' : '#242f49';
    const accentColor = isDark ? '#ffa586' : '#d9623b';
    const linkColor = isDark ? 'rgba(255, 165, 134, 0.22)' : 'rgba(217, 98, 59, 0.25)';
    const coreColor = '#b51a2b';

    // 1. Calculate positions with subtle hovering spring physics
    const coreNode = nodes.find(n => n.isCore);
    nodes.forEach((node, idx) => {
      let baseX = node.relX * width;
      let baseY = node.relY * height;

      // Sinusoidal floating drift
      const floatOffset = Math.sin(time + idx) * 5;
      node.currentX = baseX;
      node.currentY = baseY + floatOffset;

      // Mouse Gravitational Spring
      if (mouse.active) {
        const dist = Math.hypot(mouse.x - node.currentX, mouse.y - node.currentY);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          node.currentX += (mouse.x - node.currentX) * force * 0.2;
          node.currentY += (mouse.y - node.currentY) * force * 0.2;
        }
      }
    });

    // 2. Draw Connection Splines
    nodes.forEach(node => {
      if (node.isCore) return;

      ctx.beginPath();
      ctx.moveTo(coreNode.currentX, coreNode.currentY);
      
      // Gentle curve toward center
      const midX = (coreNode.currentX + node.currentX) / 2;
      const midY = (coreNode.currentY + node.currentY) / 2;
      ctx.quadraticCurveTo(midX + 15, midY - 15, node.currentX, node.currentY);

      ctx.strokeStyle = linkColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // 3. Draw Moving Data Packets
    packets.forEach(packet => {
      packet.progress += packet.speed;
      if (packet.progress > 1) packet.progress = 0;

      const p0 = { x: coreNode.currentX, y: coreNode.currentY };
      const p2 = { x: packet.targetNode.currentX, y: packet.targetNode.currentY };
      const p1 = { x: (p0.x + p2.x) / 2 + 15, y: (p0.y + p2.y) / 2 - 15 };

      // Quadratic bezier point interpolation
      const t = packet.progress;
      const px = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
      const py = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;

      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = accentColor;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    });

    // 4. Draw Nodes
    nodes.forEach(node => {
      // Node Outer Glow / Halo
      ctx.beginPath();
      ctx.arc(node.currentX, node.currentY, node.radius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = node.isCore ? coreColor : accentColor;
      ctx.lineWidth = node.isCore ? 2.5 : 1.5;
      ctx.stroke();

      // Node Fill
      ctx.beginPath();
      ctx.arc(node.currentX, node.currentY, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.isCore ? coreColor : (isDark ? '#242f49' : '#ffffff');
      ctx.fill();

      // Node Labels
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      if (node.isCore) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.fillText('AAYUSH', node.currentX, node.currentY - 6);
        ctx.font = '500 9px "JetBrains Mono", monospace';
        ctx.fillText('CORE ENGINE', node.currentX, node.currentY + 8);
      } else {
        ctx.fillStyle = primaryColor;
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.fillText(node.label, node.currentX, node.currentY - 5);
        ctx.fillStyle = isDark ? '#c2c6d0' : '#6c6670';
        ctx.font = '400 9px "JetBrains Mono", monospace';
        ctx.fillText(node.subtext, node.currentX, node.currentY + 8);
      }
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Cleanup handler if needed
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
  };
}

