/**
 * Contact Gateway Module
 * Handles form validation, honeypot anti-spam check, webhook dispatching, and mailto fallback.
 */

export function initContact() {
  const form = document.getElementById('contact-form');
  const statusMsg = document.getElementById('form-status-msg');
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
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Transmitting Message...';

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
      } else {
        throw new Error('Server response not OK');
      }
    } catch (err) {
      // Fallback gracefully to direct mailto link
      showStatus(`
        Unable to transmit via webhook. 
        <a href="mailto:aayushpanchal.dev@gmail.com?subject=${encodeURIComponent(projectType + ' Inquiry from ' + name)}&body=${encodeURIComponent(message)}" 
           style="text-decoration: underline; color: var(--highlight); font-weight: 600;">
           Click here to send directly via Email Client &rarr;
        </a>
      `, 'warning');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  function showStatus(html, type) {
    if (!statusMsg) return;
    statusMsg.innerHTML = html;
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

