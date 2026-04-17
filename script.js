const AGE_GATE_STORAGE_KEY = 'rosebud_age_verified';

function enterSite() {
  const gate = document.getElementById('age-gate');
  if (!gate) return;
  localStorage.setItem(AGE_GATE_STORAGE_KEY, 'true');
  gate.classList.add('hidden');
  setTimeout(() => {
    gate.style.display = 'none';
  }, 600);
}

const ageGate = document.getElementById('age-gate');
if (ageGate && localStorage.getItem(AGE_GATE_STORAGE_KEY) === 'true') {
  ageGate.style.display = 'none';
}

const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.newsletter-btn');
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#5a7a5c';
  document.getElementById('nl-email').value = '';
  setTimeout(() => {
    btn.textContent = 'Subscribe';
    btn.style.background = '';
  }, 3000);
}
