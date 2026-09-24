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

    // FAQ
    document.querySelectorAll(".faq-item").forEach(item => {
      const answer = item.querySelector(".faq-a");
      item.querySelector(".faq-q").addEventListener("click", () => {
        const open = item.classList.toggle("open");
        answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0";
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

    // Formulär -> färdigt mejl
    const errorBox = document.getElementById("formError");
    const val = id => document.getElementById(id).value.trim();
    function showError(msg, id) {
      errorBox.textContent = msg;
      errorBox.classList.add("show");
      document.getElementById(id).focus();
    }
    document.getElementById("projectForm").addEventListener("submit", e => {
      e.preventDefault();
      const required = [
        ["f-company", "Fyll i ert företagsnamn."],
        ["f-name", "Fyll i kontaktperson."],
        ["f-email", "Fyll i e-post."],
        ["f-phone", "Fyll i telefonnummer."],
      ];
      for (const [id, msg] of required) { if (!val(id)) return showError(msg, id); }
      if (!/^\S+@\S+\.\S+$/.test(val("f-email"))) return showError("Kolla e-postadressen.", "f-email");
      errorBox.classList.remove("show");

      const body = [
        `UF-företag: ${val("f-company")}`,
        `Kontaktperson: ${val("f-name")}`,
        `E-post: ${val("f-email")}`,
        `Telefon: ${val("f-phone")}`,
        `Instagram: ${val("f-ig") || "saknas"}`,
        `TikTok: ${val("f-tt") || "saknas"}`,
        "",
        `Paket: ${getChip("paket")}`,
        `Färgriktning: ${getChip("farg")}`,
        `Designstil: ${getChip("stil")}`,
        `Betalning: ${val("f-pay")}`,
        "",
        "Övrigt:",
        val("f-msg") || "Inget",
      ].join("\n");

      const subject = `${CONFIG.subject}: ${val("f-company")}`;
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });