// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
// Mobile menu
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', () => nav.classList.toggle('open'));
// Close menu on link click (mobile)
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);
// Active nav link based on scroll position
//const sections = ['home', 'about', 'workflow'].map(id => document.getElementById(id));

// Active nav link
const links = [...document.querySelectorAll('.nav__link')];
const path = location.pathname.split('/').pop() || 'index.html';

//const links = [...document.querySelectorAll('.nav__link')];
// const observer = new IntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       const id = entry.target.id;
//       links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
//     }
//   });
// }, { rootMargin: '-45% 0px -50% 0px' });
// sections.forEach(s => s && observer.observe(s));

// if (path === 'gallery.html') {
//   // On gallery page: only Gallery link is active
//   links.forEach(l => l.classList.toggle('active', /gallery\.html$/.test(l.getAttribute('href') || '')));
if (path === 'gallery.html' || path === 'clients.html') {
  // On standalone pages: highlight only the matching link
  links.forEach(l => l.classList.toggle('active', (l.getAttribute('href') || '').endsWith(path)));
} else {
  // On index page: highlight based on scroll position
  const sections = ['home', 'about', 'workflow'].map(id => document.getElementById(id)).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}

// Subtle reveal on scroll
const revealEls = document.querySelectorAll('.service, .step, .workflow__gallery figure, .about__media, .about__copy');
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .7s ease, transform .7s ease';
});
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));