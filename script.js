function enterSite() {
  const gate = document.getElementById('age-gate');
  gate.classList.add('hidden');
  setTimeout(() => {
    gate.style.display = 'none';
  }, 600);
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

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
