// Animate stat counters on load
function animateCounter(el, target, suffix = '') {
  const duration = 1200;
  const start = performance.now();
  const from = 0;

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + (target - from) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.addEventListener('DOMContentLoaded', () => {
  animateCounter(document.getElementById('branches'), 12);
  animateCounter(document.getElementById('deploys'), 47);
});

// Intersection Observer for scroll animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .solution-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? 'none' : 'flex';
    navLinks.style.position = open ? '' : 'absolute';
    navLinks.style.top = open ? '' : '64px';
    navLinks.style.left = open ? '' : '0';
    navLinks.style.right = open ? '' : '0';
    navLinks.style.flexDirection = open ? '' : 'column';
    navLinks.style.padding = open ? '' : '16px 24px';
    navLinks.style.background = open ? '' : 'rgba(10,10,11,0.95)';
    navLinks.style.borderBottom = open ? '' : '1px solid var(--border)';
    navLinks.style.gap = open ? '' : '16px';
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks) navLinks.style.display = '';
    }
  });
});
