// ===== Det som finns på båda sidorna: menyn, intoning och årtal =====

// Årtal i footern
document.querySelectorAll(".year").forEach(el => { el.textContent = new Date().getFullYear(); });

// Menyn: när man har scrollat blir länkarna en svävande "pill" och loggan och knappen tonas bort
const nav = document.getElementById("nav");
const updateNav = () => nav.classList.toggle("scrolled", scrollY > 60);
addEventListener("scroll", updateNav, { passive: true });
updateNav();

// Lugn intoning av sektioner när de syns
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));