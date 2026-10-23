// ===== Formuläret på Om oss-sidan: tre steg och skickas via Netlify Forms =====

const form = document.getElementById("projectForm");
const steps = [...form.querySelectorAll(".form-step")];
const stepLabels = [...form.querySelectorAll(".progress-labels li")];
const backBtn = document.getElementById("formBack");
const nextBtn = document.getElementById("formNext");
const submitBtn = document.getElementById("formSubmit");
const errorBox = document.getElementById("formError");
let current = 0;

// Val-knappar (paket, färg, stil)
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
const getChip = group => document.querySelector(`[data-group="${group}"] .chip.active`)?.textContent.trim() || "";

// Paketet väljs automatiskt om man kom från "Välj Standard/Premium" på startsidan
const planFromUrl = new URLSearchParams(location.search).get("paket");
if (planFromUrl) selectChip("paket", planFromUrl);

function goToStep(i) {
  current = i;
  steps.forEach((s, n) => s.hidden = n !== i);
  stepLabels.forEach((l, n) => l.classList.toggle("active", n <= i));
  document.getElementById("progressFill").style.width = ((i + 1) / steps.length * 100) + "%";
  backBtn.hidden = i === 0;
  nextBtn.hidden = i === steps.length - 1;
  submitBtn.hidden = i !== steps.length - 1;
  errorBox.classList.remove("show");
}

const val = id => document.getElementById(id).value.trim();
function showError(key, id) {
  goToStep(0);
  errorBox.textContent = t(key);
  errorBox.classList.add("show");
  document.getElementById(id).focus();
}

// Returnerar true om kontaktuppgifterna i steg 1 är ifyllda
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
goToStep(0);

form.addEventListener("submit", async e => {
  e.preventDefault();
  // Enter i ett fält går till nästa steg i stället för att skicka
  if (current < steps.length - 1) return next();
  if (!validateContact()) return;

  document.getElementById("h-paket").value = getChip("paket");
  document.getElementById("h-farg").value = getChip("farg");
  document.getElementById("h-stil").value = getChip("stil");

  submitBtn.disabled = backBtn.disabled = true;
  submitBtn.textContent = t("form.sending");

  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!res.ok) throw new Error();
    form.innerHTML = `<p class="form-success">${t("form.success")}</p>`;
  } catch {
    submitBtn.disabled = backBtn.disabled = false;
    submitBtn.textContent = t("form.send");
    errorBox.textContent = t("form.errSend");
    errorBox.classList.add("show");
  }
});
