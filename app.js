const EVENT_DATE = new Date('2026-10-24T10:30:00-07:00');

function addTrackingToUrl(rawUrl, slug) {
  const url = new URL(rawUrl, window.location.href);
  const current = new URL(window.location.href);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_id', 'fbclid', 'fbc_id', 'h_ad_id', 'hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_net', 'hsa_ver'].forEach((key) => {
    if (!url.searchParams.has(key) && current.searchParams.has(key)) url.searchParams.set(key, current.searchParams.get(key));
  });
  if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', 'landing-page');
  if (!url.searchParams.has('utm_medium')) url.searchParams.set('utm_medium', 'event-funnel');
  const existing = url.searchParams.get('utm_content') || current.searchParams.get('utm_content') || '';
  const slugs = existing.split('__').filter(Boolean);
  if (slug && !slugs.includes(slug)) slugs.push(slug);
  if (slugs.length) url.searchParams.set('utm_content', slugs.join('__'));
  return url;
}

function setupTrackedLinks() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-track-content]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = addTrackingToUrl(link.href, link.dataset.trackContent);
    event.preventDefault();
    if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) {
      window.history.replaceState({}, '', url.href);
      document.querySelector(url.hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = url.href;
    }
  });
}

function updateCountdown() {
  const roots = document.querySelectorAll('[data-countdown]');
  if (!roots.length) return;
  const diff = Math.max(0, EVENT_DATE.getTime() - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  const values = { days, hours, minutes, seconds };
  roots.forEach((root) => {
    Object.entries(values).forEach(([key, value]) => {
      const node = root.querySelector(`[data-${key}]`);
      if (node) node.textContent = String(value).padStart(2, '0');
    });
  });
}

function setupDemoForms() {
  document.querySelectorAll('[data-next]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const next = new URL(form.dataset.next, window.location.href);
      const ticket = String(form.querySelector('[name="hang_ve"]')?.value || '').toLowerCase().includes('vip') ? 'vip' : 'standard';
      next.searchParams.set('ticket', ticket);
      const tracked = addTrackingToUrl(next.href, `registration-${ticket}`);
      window.location.href = tracked.href;
    });
  });
}

function setupVipSurvey() {
  const form = document.querySelector('[data-vip-survey]');
  if (!form) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const steps = [...form.querySelectorAll('[data-vip-step]')];
  const step2Shell = form.querySelector('[data-step2-shell]');
  let currentIndex = Math.max(0, steps.findIndex((step) => !step.hidden));

  const showStep = (nextIndex) => {
    if (nextIndex < 0 || nextIndex >= steps.length) return;
    steps.forEach((step, index) => {
      step.hidden = index !== nextIndex;
      step.classList.toggle('is-active', index === nextIndex);
    });
    if (step2Shell) step2Shell.hidden = nextIndex === steps.length - 1;
    currentIndex = nextIndex;
    const activeStep = steps[currentIndex];
    window.requestAnimationFrame(() => {
      activeStep.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      activeStep.focus({ preventScroll: true });
    });
  };

  const validateStep = (step) => {
    const requiredFields = [...step.querySelectorAll('[required]')];
    for (const field of requiredFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        field.focus();
        return false;
      }
    }
    const multiChoiceGroups = [...step.querySelectorAll('.multi-choice-list')];
    for (const group of multiChoiceGroups) {
      if (!group.querySelector('input[type="checkbox"]:checked')) {
        const first = group.querySelector('input[type="checkbox"]');
        first?.setCustomValidity('Vui lòng chọn ít nhất một nội dung bạn quan tâm.');
        first?.reportValidity();
        first?.setCustomValidity('');
        first?.focus();
        return false;
      }
    }
    return true;
  };

  form.querySelectorAll('[data-step-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const step = button.closest('[data-vip-step]');
      if (!step || !validateStep(step)) return;
      showStep(steps.indexOf(step) + 1);
    });
  });

  form.querySelectorAll('[data-step-back]').forEach((button) => {
    button.addEventListener('click', () => {
      const step = button.closest('[data-vip-step]');
      if (!step) return;
      showStep(steps.indexOf(step) - 1);
    });
  });
}

function setupValueCardsReveal() {
  const cards = [...document.querySelectorAll('.value-card, .reveal-card')];
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    cards.forEach((card) => card.classList.add('is-visible'));
    return;
  }

  const groupIndex = new Map();
  cards.forEach((card) => {
    const group = card.parentElement;
    const index = groupIndex.get(group) || 0;
    card.style.transitionDelay = `${Math.min(index, 4) * 90}ms`;
    groupIndex.set(group, index + 1);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  cards.forEach((card) => observer.observe(card));
}

function setupMobileStickyCta() {
  const bar = document.querySelector('[data-mobile-sticky-cta]');
  const hero = document.querySelector('.hero');
  if (!bar || !hero || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      bar.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: '-10% 0px 0px 0px' });
  observer.observe(hero);
}

function registerWebMcpTool() {
  const context = document.modelContext;
  if (!context?.registerTool || !document.querySelector('#ticket')) return;
  try {
    context.registerTool({
      name: 'start_event_registration',
      title: 'Bắt đầu đăng ký sự kiện',
      description: 'Chọn vé Standard hoặc VIP và mở đúng form đăng ký của sự kiện House Hacking San Jose.',
      inputSchema: {
        type: 'object',
        properties: { ticket: { type: 'string', enum: ['standard', 'vip'] } },
        required: ['ticket'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!input || !['standard', 'vip'].includes(input.ticket)) throw new Error('Hạng vé không hợp lệ.');
        const path = input.ticket === 'vip' ? './vip/' : './standard/';
        window.location.href = path;
        return { ticket: input.ticket, next: path };
      }
    });
  } catch (error) {
    console.warn('WebMCP unavailable', error);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
setupVipSurvey();
setupDemoForms();
setupValueCardsReveal();
setupMobileStickyCta();
registerWebMcpTool();
setupTrackedLinks();
