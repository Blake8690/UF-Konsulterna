// ===== Det som finns på båda sidorna: rubrik som skrivs fram, nyhetsraden, intoning och årtal =====

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Årtal i footern
document.querySelectorAll(".year").forEach(el => { el.textContent = new Date().getFullYear(); });

// Nyhetsraden under menyn: stängs med × och kommer ihåg det
const bar = document.getElementById("bar");
if (bar) {
  try { if (localStorage.getItem("barClosed") === "1") bar.classList.add("hidden"); } catch {}
  document.getElementById("barClose").addEventListener("click", () => {
    bar.classList.add("hidden");
    try { localStorage.setItem("barClosed", "1"); } catch {}
  });
}

// Rubriken i hero skrivs fram bokstav för bokstav, som på Googles sida
const typeText = document.getElementById("typeText");
const heroAfter = document.querySelector(".hero-after");
let typeTimer;

function typeHero() {
  if (!typeText) return;
  clearTimeout(typeTimer);
  const text = t("hero.title");
  document.getElementById("heroTitle").setAttribute("aria-label", text);
  if (reducedMotion) {
    typeText.textContent = text;
    heroAfter.classList.add("show");
    return;
  }
  let i = 0;
  typeText.textContent = "";
  const step = () => {
    typeText.textContent = text.slice(0, ++i);
    if (i < text.length) typeTimer = setTimeout(step, 45);
    else heroAfter.classList.add("show");
  };
  typeTimer = setTimeout(step, 300);
}
typeHero();
document.addEventListener("langchange", typeHero);

// Lugn intoning av sektioner när de syns
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
