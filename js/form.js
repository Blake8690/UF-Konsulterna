// ===== Enkäten på Om oss-sidan: sex steg, följdfrågor, sparat utkast, skickas via Netlify Forms =====

const form = document.getElementById("projectForm");
const steps = [...form.querySelectorAll(".form-step")];
const backBtn = document.getElementById("formBack");
const nextBtn = document.getElementById("formNext");
const submitBtn = document.getElementById("formSubmit");
const errorBox = document.getElementById("formError");
const DRAFT_KEY = "ufk-enkat";
const SEP = " | "; // skiljer flera val åt, t.ex. "Hem | Kontakt" (svaren kan själva innehålla komma)
let current = 0;

// --- Valknappar ---
// Varje grupp .chips har ett dolt fält som får det valda värdet (data-value).
// Med data-multi kan man välja flera, och då sparas de som "Hem | Kontakt | ...".
function syncChips(group) {
  const chosen = [...group.querySelectorAll(".chip.active")].map(c => c.dataset.value);
  group.querySelector("input[type=hidden]").value = chosen.join(SEP);
}
function setChips(group, values) {
  group.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", values.includes(c.dataset.value)));
  syncChips(group);
}
form.querySelectorAll(".chips").forEach(group => {
  group.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    if (group.hasAttribute("data-multi")) chip.classList.toggle("active");
    else group.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c === chip));
    syncChips(group);
    updateConditions();
    saveDraft();
  });
});

// --- Följdfrågor: data-if="frakt=Ja" visas bara när frågan "frakt" har svaret "Ja" ---
function updateConditions() {
  form.querySelectorAll("[data-if]").forEach(el => {
    const [name, value] = el.dataset.if.split("=");
    el.hidden = !form.elements[name].value.split(SEP).includes(value);
  });
}

// --- Sparat utkast, så att man kan fortsätta senare ---
function saveDraft() {
  const data = Object.fromEntries(new FormData(form));
  delete data["form-name"]; delete data["bot-field"];
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch {}
}
function loadDraft() {
  let data;
  try { data = JSON.parse(localStorage.getItem(DRAFT_KEY)); } catch {}
  if (!data) return;
  Object.entries(data).forEach(([name, value]) => {
    const el = form.elements[name];
    if (!el || !value) return;
    const group = el.closest?.(".chips");
    if (group) setChips(group, value.split(SEP));
    else el.value = value;
  });
}
form.addEventListener("input", saveDraft);

// --- Stegen ---
function goToStep(i) {
  current = i;
  steps.forEach((s, n) => s.hidden = n !== i);
  document.getElementById("stepCount").textContent =
    t("form.stepOf").replace("{n}", i + 1).replace("{total}", steps.length);
  document.getElementById("progressFill").style.width = ((i + 1) / steps.length * 100) + "%";
  backBtn.hidden = i === 0;
  nextBtn.hidden = i === steps.length - 1;
  submitBtn.hidden = i !== steps.length - 1;
  errorBox.classList.remove("show");
  // Visa början av steget om man har scrollat ner i ett långt steg
  if (form.getBoundingClientRect().top < 0) form.scrollIntoView({ behavior: "smooth" });
}

const val = id => document.getElementById(id).value.trim();
function showError(key, id) {
  goToStep(0);
  errorBox.textContent = t(key);
  errorBox.classList.add("show");
  document.getElementById(id).focus();
}

// Bara kontaktuppgifterna i steg 1 är obligatoriska, resten kan fyllas i när de vet
function validateContact() {
  const required = [
    ["f-company", "form.errCompany"],
    ["f-name", "form.errName"],
    ["f-email", "form.errEmail"],
    ["f-phone", "form.errPhone"],
  ];
  for (const [id, key] of required) {
    if (!val(id)) { showError(key, id); return false; }
  }
  if (!/^\S+@\S+\.\S+$/.test(val("f-email"))) { showError("form.errEmailFormat", "f-email"); return false; }
  return true;
}

function next() {
  if (current === 0 && !validateContact()) return;
  goToStep(current + 1);
}
nextBtn.addEventListener("click", next);
backBtn.addEventListener("click", () => goToStep(current - 1));

// Start: hämta utkast, välj paket från länken på startsidan, visa rätt följdfrågor
loadDraft();
const planFromUrl = new URLSearchParams(location.search).get("paket");
if (planFromUrl) setChips(form.querySelector('[name="paket"]').closest(".chips"), [planFromUrl]);
updateConditions();
goToStep(0);
document.addEventListener("langchange", () => goToStep(current));

// --- Skicka ---
form.addEventListener("submit", async e => {
  e.preventDefault();
  // Enter i ett fält går till nästa steg i stället för att skicka
  if (current < steps.length - 1) return next();
  if (!validateContact()) return;

  submitBtn.disabled = backBtn.disabled = true;
  submitBtn.textContent = t("form.sending");

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!res.ok) throw new Error();
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    form.innerHTML = `<p class="form-success">${t("form.success")}</p>`;
  } catch {
    submitBtn.disabled = backBtn.disabled = false;
    submitBtn.textContent = t("form.send");
    errorBox.textContent = t("form.errSend");
    errorBox.classList.add("show");
  }
});
