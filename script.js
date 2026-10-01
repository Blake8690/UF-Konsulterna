// ===== Ändra per kund =====
const CONFIG = { email: "ufkonsulterna@gmail.com", subject: "Projektförfrågan" };

document.documentElement.classList.add("js");
document.getElementById("year").textContent = new Date().getFullYear();

// Mobilmeny
const navLinks = document.getElementById("navLinks");
document.getElementById("burger").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Scroll-animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// 3D-effekter vid scroll: varje [data-3d] får --p från 0 (under skärmen) till 1 (på plats)
const motionOK = !matchMedia("(prefers-reduced-motion: reduce)").matches;
if (motionOK) {
  const hero = document.querySelector(".hero");
  // Kortbunten animeras över en längre sträcka så att man hinner se den
  const items = [...document.querySelectorAll("[data-3d]")].map(el => ({ el, top: 0, range: el.dataset["3d"] === "stack" ? 0.9 : 0.55 }));
  // offsetTop påverkas inte av transform, så mätningen hackar inte när elementen roterar
  const docTop = el => { let t = 0; for (; el; el = el.offsetParent) t += el.offsetTop; return t; };
  const measure = () => { items.forEach(i => i.top = docTop(i.el)); update(); };
  let ticking = false;
  function update() {
    ticking = false;
    const vh = innerHeight, y = scrollY;
    hero.style.setProperty("--hp", Math.min(y / hero.offsetHeight, 1).toFixed(3));
    items.forEach(({ el, top, range }) => {
      const p = Math.min(Math.max((vh - (top - y)) / (vh * range), 0), 1);
      el.style.setProperty("--p", p.toFixed(3));
    });
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", measure);
  addEventListener("load", measure);
  measure();

  // Projektkorten lutar efter muspekaren (bara datorer med mus)
  if (matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".project").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
      });
      card.addEventListener("mouseleave", () => card.style.transform = "");
    });

    // Knapparna dras lite mot muspekaren
    document.querySelectorAll(".btn").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${(x * 0.25).toFixed(1)}px, ${(y * 0.35).toFixed(1)}px)`;
      });
      btn.addEventListener("mouseleave", () => btn.style.transform = "");
    });

    // UF-vattenmärket och ovalen lutar efter muspekaren
    hero.addEventListener("mousemove", e => {
      hero.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
      hero.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
    });
    hero.addEventListener("mouseleave", () => { hero.style.setProperty("--mx", 0); hero.style.setProperty("--my", 0); });
  }

  // Rubrikerna fälls upp ord för ord
  document.querySelectorAll("main h1, main h2").forEach(h => {
    let i = 0;
    const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.append(part);
        const w = document.createElement("span");
        w.className = "word";
        w.innerHTML = `<span style="--i:${i++}"></span>`;
        w.firstChild.textContent = part;
        frag.append(w);
      });
      node.replaceWith(frag);
    });
  });

  // Siffrorna räknar upp från 0
  const countUp = el => {
    const [, num, rest] = el.textContent.match(/(\d+)(.*)/);
    const end = +num, start = performance.now();
    const tick = now => {
      const t = Math.min((now - start) / 1400, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + rest;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const inView = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      if (e.target.hasAttribute("data-count")) countUp(e.target);
      else e.target.classList.add("in");
      inView.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll("main h1, main h2, [data-count]").forEach(el => inView.observe(el));
  measure();
}

// Priskorten vänds och visar vad som ingår
document.querySelectorAll(".plan").forEach(plan => {
  const [front, back] = plan.querySelectorAll(".plan-face");
  plan.querySelectorAll(".plan-flip").forEach(btn => btn.addEventListener("click", () => {
    const flipped = plan.classList.toggle("flipped");
    front.inert = flipped;
    back.inert = !flipped;
    front.querySelector(".plan-flip").setAttribute("aria-expanded", flipped);
    (flipped ? back : front).querySelector(".plan-flip").focus({ preventScroll: true });
  }));
});

// FAQ
document.querySelectorAll(".faq-item").forEach(item => {
  const answer = item.querySelector(".faq-a");
  item.querySelector(".faq-q").addEventListener("click", () => {
    const open = item.classList.toggle("open");
    // offsetHeight påverkas inte av vik-animationen (transform)
    answer.style.maxHeight = open ? answer.firstElementChild.offsetHeight + "px" : "0";
  });
});

// Val-knappar i formuläret
function selectChip(group, value) {
  document.querySelectorAll(`[data-group="${group}"] .chip`).forEach(c =>
    c.classList.toggle("active", c.textContent.trim() === value));
}
document.querySelectorAll(".chips").forEach(group => {
  group.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (chip) selectChip(group.dataset.group, chip.textContent.trim());
  });
});
const getChip = group => {
  const c = document.querySelector(`[data-group="${group}"] .chip.active`);
  return c ? c.textContent.trim() : "";
};

// Popup
const modal = document.getElementById("modal");
function openForm(plan) {
  if (plan) selectChip("paket", plan);
  goToStep(0);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeForm() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-open-form]").forEach(btn =>
  btn.addEventListener("click", e => { e.preventDefault(); openForm(btn.dataset.plan); }));
document.querySelector("[data-close-form]").addEventListener("click", closeForm);
modal.addEventListener("click", e => { if (e.target === modal) closeForm(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeForm(); });

// Formulär i steg
const form = document.getElementById("projectForm");
const steps = [...form.querySelectorAll(".form-step")];
const stepLabels = [...form.querySelectorAll(".form-progress-labels li")];
const backBtn = document.getElementById("formBack");
const nextBtn = document.getElementById("formNext");
const submitBtn = document.getElementById("formSubmit");
const errorBox = document.getElementById("formError");
let current = 0;

function goToStep(i) {
  if (!steps.length || !form.contains(steps[0])) return; // redan skickat
  // Steget vänds in från höger framåt och från vänster bakåt
  steps[i].classList.remove("flip-next", "flip-prev");
  if (i !== current) { void steps[i].offsetWidth; steps[i].classList.add(i > current ? "flip-next" : "flip-prev"); }
  current = i;
  steps.forEach((s, n) => s.hidden = n !== i);
  stepLabels.forEach((l, n) => l.classList.toggle("active", n <= i));
  document.getElementById("progressFill").style.width = ((i + 1) / steps.length * 100) + "%";
  backBtn.hidden = i === 0;
  nextBtn.hidden = i === steps.length - 1;
  submitBtn.hidden = i !== steps.length - 1;
  errorBox.classList.remove("show");
  document.querySelector(".modal-box").scrollTop = 0;
}

const val = id => document.getElementById(id).value.trim();
function showError(msg, id) {
  errorBox.textContent = msg;
  errorBox.classList.add("show");
  document.getElementById(id).focus();
}
// Returnerar true om steg 1 är korrekt ifyllt
function validateContact() {
  const required = [
    ["f-company", "Fyll i ert företagsnamn."],
    ["f-name", "Fyll i kontaktperson."],
    ["f-email", "Fyll i e-post."],
    ["f-phone", "Fyll i telefonnummer."],
  ];
  for (const [id, msg] of required) {
    if (!val(id)) { goToStep(0); showError(msg, id); return false; }
  }
  if (!/^\S+@\S+\.\S+$/.test(val("f-email"))) { goToStep(0); showError("Kolla e-postadressen.", "f-email"); return false; }
  return true;
}
function next() {
  if (current === 0 && !validateContact()) return;
  goToStep(current + 1);
}
nextBtn.addEventListener("click", next);
backBtn.addEventListener("click", () => goToStep(current - 1));
goToStep(0);

// Skickas via Netlify Forms
form.addEventListener("submit", async e => {
  e.preventDefault();
  // Enter i ett fält tar en till nästa steg i stället för att skicka
  if (current < steps.length - 1) return next();
  if (!validateContact()) return;

  document.getElementById("h-paket").value = getChip("paket");
  document.getElementById("h-farg").value = getChip("farg");
  document.getElementById("h-stil").value = getChip("stil");

  submitBtn.disabled = true;
  backBtn.disabled = true;
  submitBtn.textContent = "Skickar...";

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!res.ok) throw new Error();
    form.innerHTML = `<p class="form-success">Tack! Vi har fått er förfrågan och hör av oss snart.</p>`;
  } catch {
    submitBtn.disabled = false;
    backBtn.disabled = false;
    submitBtn.textContent = "Skicka förfrågan";
    errorBox.textContent = "Något gick fel. Mejla oss direkt på " + CONFIG.email;
    errorBox.classList.add("show");
  }
});

// Bollen bakom sidan: punkter på en sfär som snurrar, flyttar sig vid scroll och lutar efter musen
(() => {
  const canvas = document.getElementById("orb");
  const ctx = canvas.getContext("2d");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Jämnt utspridda punkter på en sfär (Fibonacci-spiral)
  const N = 700;
  const points = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * Math.PI * (3 - Math.sqrt(5));
    points.push([Math.cos(a) * r, y, Math.sin(a) * r]);
  }

  let w, h, dpr;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduced) draw(0);
  }

  // Musen: målvärden och utjämnade värden så att lutningen glider mjukt
  let mx = 0, my = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; });

  const lerp = (a, b, t) => a + (b - a) * t;

  function draw(time) {
    tx = lerp(tx, mx, 0.05);
    ty = lerp(ty, my, 0.05);

    const y = scrollY;
    const p = Math.min(y / (h * 0.9), 1); // 0 i hero, 1 när man scrollat förbi
    const size = Math.min(w, h);
    const R = lerp(size * 0.42, size * 0.26, p);
    const cx = lerp(w * 0.5, w * (w < 700 ? 0.78 : 0.82), p) + tx * 40;
    const cy = h * 0.5 + Math.sin(y * 0.0015) * h * 0.12 * p + ty * 40;
    const alpha = lerp(0.85, 0.2, p);

    // Rotation: långsam snurr + scroll + musens lutning
    const rotY = (reduced ? 0 : time * 0.00012) + y * 0.0012 + tx * 0.8;
    const rotX = 0.35 + y * 0.0004 + ty * 0.6;
    const sy = Math.sin(rotY), cyR = Math.cos(rotY), sx = Math.sin(rotX), cxR = Math.cos(rotX);

    ctx.clearRect(0, 0, w, h);

    // Mjukt sken bakom bollen
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
    glow.addColorStop(0, `rgba(212, 166, 80, ${0.10 * alpha})`);
    glow.addColorStop(1, "rgba(212, 166, 80, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(cx - R * 1.4, cy - R * 1.4, R * 2.8, R * 2.8);

    for (const [px, py, pz] of points) {
      // Rotera runt Y och sedan X
      const x1 = px * cyR + pz * sy;
      const z1 = -px * sy + pz * cyR;
      const y2 = py * cxR - z1 * sx;
      const z2 = py * sx + z1 * cxR;
      const depth = (z2 + 1) / 2; // 0 = baksidan, 1 = framsidan
      const persp = 1 + z2 * 0.15;
      ctx.globalAlpha = alpha * (0.15 + depth * 0.85);
      ctx.fillStyle = "#d4a650";
      ctx.beginPath();
      ctx.arc(cx + x1 * R * persp, cy + y2 * R * persp, 0.6 + depth * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop(time) { draw(time); requestAnimationFrame(loop); }

  addEventListener("resize", resize);
  resize();
  if (reduced) addEventListener("scroll", () => draw(0), { passive: true });
  else requestAnimationFrame(loop);
})();
