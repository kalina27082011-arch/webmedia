const header = document.getElementById('header');
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    nav.classList.remove('open');
  });
});

function animateCount(el, target, duration = 1800) {
  const start = performance.now();
  const from = 0;

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        entry.target.querySelectorAll('[data-count]').forEach(el => {
          if (el.dataset.animated) return;
          el.dataset.animated = 'true';
          animateCount(el, parseInt(el.dataset.count, 10));
        });
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.service-card, .services-row, .industry-card, .process-step, .section__head, .cta-block, .contact-info__intro, .reveal-left, .reveal-right, .hero__stats'
).forEach(el => {
  if (!el.classList.contains('reveal') &&
      !el.classList.contains('reveal-left') &&
      !el.classList.contains('reveal-right')) {
    el.classList.add('reveal');
  }
  observer.observe(el);
});

document.querySelectorAll('.services-row .service-card').forEach((card, i) => {
  card.style.setProperty('--reveal-delay', `${i * 0.12}s`);
});

document.querySelectorAll('.industries-grid .industry-card').forEach((card, i) => {
  card.style.setProperty('--reveal-delay', `${(i % 3) * 0.1}s`);
});

document.querySelectorAll('.process-steps .process-step').forEach((step, i) => {
  step.style.setProperty('--reveal-delay', `${i * 0.12}s`);
});

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';
        animateCount(el, parseInt(el.dataset.count, 10));
      });
      statsObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

const heroStats = document.querySelector('.hero__stats');
if (heroStats) statsObserver.observe(heroStats);

const heroVisual = document.querySelector('.hero__visual');
if (heroVisual) {
  const heroCountObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          if (el.dataset.animated) return;
          el.dataset.animated = 'true';
          animateCount(el, parseInt(el.dataset.count, 10), 2200);
        });
        heroCountObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  heroCountObserver.observe(heroVisual);
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  contactForm.reset();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
});

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', e => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.startsWith('8')) value = '7' + value.slice(1);
  if (!value.startsWith('7') && value.length) value = '7' + value;

  let formatted = '';
  if (value.length > 0) formatted = '+7';
  if (value.length > 1) formatted += ' (' + value.slice(1, 4);
  if (value.length > 4) formatted += ') ' + value.slice(4, 7);
  if (value.length > 7) formatted += '-' + value.slice(7, 9);
  if (value.length > 9) formatted += '-' + value.slice(9, 11);

  e.target.value = formatted;
});

document.querySelectorAll('.contact-link').forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href) return;

    event.preventDefault();
    event.stopPropagation();

    const opener = document.createElement('a');
    opener.href = href;
    opener.style.display = 'none';
    document.body.appendChild(opener);
    opener.click();
    document.body.removeChild(opener);
  });
});
