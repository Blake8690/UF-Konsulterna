// Sticky navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Scroll-reveal for sections
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// Marquee: auto-duplicate content so it always fills the screen seamlessly
const track = document.getElementById('marquee-track');
if (track) {
  const container = track.parentElement;
  const originalGroup = track.querySelector('.marquee-group');
  while (track.scrollWidth < container.offsetWidth * 1.5) {
    track.appendChild(originalGroup.cloneNode(true));
  }
  const currentGroups = Array.from(track.children);
  currentGroups.forEach(group => {
    track.appendChild(group.cloneNode(true));
  });
}

// Contact form - submits to Netlify Forms via AJAX
const form = document.getElementById('kontakt-form');
const successMsg = document.getElementById('form-success');

function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeFormData(formData)
  })
    .then(() => {
      successMsg.classList.add('show');
      form.reset();
    })
    .catch((error) => {
      alert('Något gick fel, försök igen eller mejla oss direkt.');
      console.error(error);
    });
});
});