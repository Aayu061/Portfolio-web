/**
 * Contact Gateway Module
 * Handles form validation, honeypot anti-spam check, webhook dispatching, and mailto fallback.
 */

import { showToast } from '../core/toast.js';

export function initContact() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');

  // Direct clipboard action on contact item
  document.querySelectorAll('[data-action="copy-email"]').forEach(el => {
    el.addEventListener('click', (e) => {
      navigator.clipboard?.writeText('aayu.panchal06@gmail.com');
      showToast('✓ Email copied to clipboard: aayu.panchal06@gmail.com');
    });
  });

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name?.value.trim();
    const email = form.email?.value.trim();
    const projectType = form.project_type?.value;
    const message = form.message?.value.trim();
    const botcheck = form.botcheck?.value;

    // Honeypot spam check
    if (botcheck) {
      console.warn('Bot detected via honeypot.');
      return;
    }

    // Validation
    if (!name || name.length < 2) {
      showStatus('Please enter your full name.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showStatus('Please provide a valid email address.', 'error');
      return;
    }

    if (!message || message.length < 10) {
      showStatus('Please provide a project message with at least 10 characters.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = [...submitBtn.childNodes].map((node) => node.cloneNode(true));
    submitBtn.disabled = true;
    submitBtn.classList.remove('is-sent');
    submitBtn.classList.add('is-sending');
    submitBtn.textContent = 'Transmitting Message...';
    let sent = false;

    try {
      const endpoint = form.getAttribute('action') || 'https://api.web3forms.com/submit';
      
      const payload = {
        name,
        email,
        project_type: projectType,
        message,
        access_key: form.querySelector('input[name="access_key"]')?.value || 'YOUR_ACCESS_KEY'
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showStatus('Thank you! Your message has been sent. Aayush will reply within 24 hours.', 'success');
        form.reset();
        sent = true;
      } else {
        throw new Error('Server response not OK');
      }
    } catch (err) {
      // Fallback gracefully to direct mailto link via safe DOM nodes
      const mailtoUrl = `mailto:aayu.panchal06@gmail.com?subject=${encodeURIComponent(projectType + ' Inquiry from ' + name)}&body=${encodeURIComponent(message)}`;
      showStatus('Unable to transmit via webhook.', 'warning', {
        href: mailtoUrl,
        text: 'Click here to send directly via Email Client →'
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-sending');
      if (sent) {
        // Brief ✓ confirmation, then back to the normal label
        submitBtn.classList.add('is-sent');
        submitBtn.textContent = 'Message Sent ✓';
        setTimeout(() => {
          submitBtn.classList.remove('is-sent');
          submitBtn.replaceChildren(...originalContent);
        }, 2600);
      } else {
        submitBtn.replaceChildren(...originalContent);
      }
    }
  });

  // Short horizontal shake on validation errors (transform-only keyframes)
  function shakeForm() {
    const card = form.closest('.contact-form-card') || form;
    card.classList.remove('is-shaking');
    void card.offsetWidth; // restart the animation if it is already applied
    card.classList.add('is-shaking');
    card.addEventListener('animationend', () => card.classList.remove('is-shaking'), { once: true });
  }

  function showStatus(messageText, type, actionLink = null) {
    if (type === 'error') shakeForm();
    if (!statusMsg) return;
    statusMsg.textContent = '';

    const textNode = document.createTextNode(messageText);
    statusMsg.appendChild(textNode);

    if (actionLink && actionLink.href && actionLink.text) {
      const br = document.createElement('br');
      const a = document.createElement('a');
      a.href = actionLink.href;
      a.textContent = actionLink.text;
      a.style.textDecoration = 'underline';
      a.style.color = 'var(--highlight)';
      a.style.fontWeight = '600';
      a.style.display = 'inline-block';
      a.style.marginTop = '0.35rem';
      statusMsg.appendChild(br);
      statusMsg.appendChild(a);
    }

    statusMsg.style.display = 'block';
    statusMsg.style.padding = '0.75rem 1rem';
    statusMsg.style.borderRadius = 'var(--radius-sm)';
    statusMsg.style.fontSize = 'var(--text-xs)';
    statusMsg.style.fontFamily = 'var(--font-mono)';

    if (type === 'error') {
      statusMsg.style.background = 'rgba(181, 26, 43, 0.2)';
      statusMsg.style.border = '1px solid var(--accent-primary)';
      statusMsg.style.color = '#ffffff';
    } else if (type === 'success') {
      statusMsg.style.background = 'rgba(34, 197, 94, 0.2)';
      statusMsg.style.border = '1px solid #22c55e';
      statusMsg.style.color = '#22c55e';
    } else {
      statusMsg.style.background = 'rgba(255, 165, 134, 0.2)';
      statusMsg.style.border = '1px solid var(--highlight)';
      statusMsg.style.color = 'var(--text-primary)';
    }
  }
}

