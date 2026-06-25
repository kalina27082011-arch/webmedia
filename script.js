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

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll(
  '.service-card, .industry-card, .process-step, .section__head, .cta-block, .contact-info, .contact-form'
).forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

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
