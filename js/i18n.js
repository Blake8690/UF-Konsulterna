// ===== Språk (i18n): svenska och engelska =====
// Varje text på sidan har data-i18n="nyckel". Här finns texten för varje nyckel på båda språken.
// Platshållare i fält använder data-i18n-ph="nyckel".

const TEXTS = {
  sv: {
    "meta.homeTitle": "UF Konsulterna | Hemsidor för UF-företag",
    "meta.aboutTitle": "Om oss | UF Konsulterna",
    "nav.home": "Hem",
    "nav.about": "Om oss",
    "nav.contact": "Kontakta oss",
    "bar.new": "NYTT",
    "bar.text": "Vi tar emot nya UF-projekt för 2026",
    "bar.link": "Se paketen",

    "hero.title": "Er idé förtjänar en hemsida som känns på riktigt.",
    "hero.lead": "Vi bygger snabba, mobilanpassade hemsidor för UF-företag. Fast pris, inga abonnemang.",
    "hero.cta1": "Se paketen",
    "hero.cta2": "Kontakta oss",

    "plans.title": "Två paket. Fasta priser.",
    "plans.lead": "Vi anpassar innehåll, färg och känsla efter ert företag.",
    "std.desc": "För er som vill visa upp företaget och produkten på ett professionellt sätt.",
    "std.f1": "Upp till 4 sidor, t.ex. start, produkter, om oss och kontakt",
    "std.f2": "Design i era färger och med er logga",
    "std.f3": "Produktvisning med bilder och priser",
    "std.f4": "Vi lägger in era texter och bilder",
    "std.f5": "Fungerar lika bra i mobilen som på datorn",
    "std.time": "Leverans ca 7–21 dagar",
    "std.cta": "Välj Standard",
    "prem.desc": "För er som vill sälja och ta betalt direkt på hemsidan.",
    "prem.f1": "Allt i Standard",
    "prem.f2": "Kunder kan betala direkt med Swish",
    "prem.f3": "Kontaktformulär som skickar förfrågningar till er mejl",
    "prem.f4": "En extra funktion efter behov, t.ex. bokning eller nyhetsbrev",
    "prem.time": "Leverans ca 7–14 dagar",
    "prem.cta": "Välj Premium",
    "plans.pay": "Betala med Swish eller banköverföring. Ni betalar först när vi har kommit överens.",
    "plans.note": 'Annan idé för betalning, som en andel av försäljningen? <a href="om.html#kontakt">Hör av er.</a>',

    "work.title": "Senaste projekt",
    "work.asfahas": "Webbplats · Barbershop",
    "work.it": "Applikation · Arbetsflöde",
    "work.visit": "Besök projektet ↗",

    "quote.text": "”Vi kunde fortsätta fokusera på produkten, och fick en hemsida som gjorde att kunderna mötte oss som ett riktigt företag.”",
    "quote.cite": "Feedback från ett kundprojekt",

    "faq.title": "Vanliga frågor",
    "faq.q1": "Behöver vi ha en egen domän?",
    "faq.a1": "Ja! Vi hjälper er att välja och koppla en domän. Själva domänen ingår i priset.",
    "faq.q2": "Hur lång tid tar det?",
    "faq.a2": "Standard tar ca 7–21 dagar och Premium ca 7–14 dagar, räknat från att vi har fått era texter och bilder. Ni får en tidsplan när vi har pratat igenom projektet.",
    "faq.q3": "Hur betalar vi?",
    "faq.a3": "Med Swish till <b>123 702 66 85</b> eller med banköverföring. Ni betalar när vi har kommit överens om projektet, och får alla uppgifter i ett bekräftelsemejl.",
    "faq.q4": "Vad behöver vi skicka till er?",
    "faq.a4": "Logga, bilder, texter om företaget och gärna allmän info om er. Saknas något hjälper vi till.",
    "faq.q5": "Kan vi ändra på sidan efteråt?",
    "faq.a5": "Ja. Hör av er så hjälper vi till med ändringar efter lansering.",
    "faq.q6": "Finns det några löpande kostnader?",
    "faq.a6": "Inga abonnemang från oss. En engångsbetalning, sedan är hemsidan er.",

    "footer.tag": "Ni fokuserar på affären.",
    "footer.privacy": "Personuppgifter",

    "about.title": "Tre elever som bygger på riktigt.",
    "about.lead": "Vi är tre gymnasieelever med frilanserfarenhet från riktiga kunder. Vi kombinerar utveckling, ekonomi och försäljning för att leverera en helhet som både ser professionell ut och fungerar i praktiken.",
    "about.p2": "Många UF-företag lägger månader på sin idé, och en kväll på hemsidan. Det märks när kunder, jury och samarbetspartners möter företaget. Det vill vi ändra på.",
    "process.title": "Så går det till",
    "process.s1": "Ni berättar",
    "process.t1": "Beskriv företaget, era mål och vilken känsla ni vill att sidan ska ha.",
    "process.s2": "Vi formar",
    "process.t2": "Vi väljer struktur, färg och uttryck tillsammans med er.",
    "process.s3": "Vi bygger",
    "process.t3": "Vi utvecklar en snabb, mobilanpassad sida och håller er uppdaterade under arbetet.",
    "process.s4": "Ni lanserar",
    "process.t4": "Efter er feedback finjusterar vi sidan och hjälper er att gå live.",

    "contact.title": "Kontakta oss",
    "contact.lead": "Berätta vad ni vill bygga, så hör vi av oss inom kort.",
    "contact.email": "E-post",
    "contact.phone": "Telefon",

    "form.step1": "Om er",
    "form.step2": "Stil",
    "form.step3": "Detaljer",
    "form.company": "UF-företag *",
    "form.companyPh": "Exempel UF",
    "form.name": "Kontaktperson *",
    "form.namePh": "För- och efternamn",
    "form.email": "E-post *",
    "form.emailPh": "namn@exempel.se",
    "form.phone": "Telefon *",
    "form.handlePh": "@ertforetag",
    "form.plan": "Välj paket",
    "form.color": "Färgriktning",
    "form.c1": "Mörk & exklusiv",
    "form.c2": "Ljus & ren",
    "form.c3": "Färgstark",
    "form.c4": "Egen idé",
    "form.style": "Designstil",
    "form.s2": "Lekfull",
    "form.s3": "Minimalistisk",
    "form.s4": "Teknisk",
    "form.pay": "Betalningsupplägg",
    "form.p1": "Fast pris",
    "form.p2": "Betala senare",
    "form.p3": "Diskutera samarbete / andel",
    "form.msg": "Något mer vi bör veta?",
    "form.msgPh": "Beskriv produkten, funktioner eller länka inspiration...",
    "form.back": "Tillbaka",
    "form.next": "Nästa",
    "form.send": "Skicka förfrågan",
    "form.sending": "Skickar...",
    "form.success": "Tack! Vi har fått er förfrågan och hör av oss snart.",
    "form.errCompany": "Fyll i ert företagsnamn.",
    "form.errName": "Fyll i kontaktperson.",
    "form.errEmail": "Fyll i e-post.",
    "form.errEmailFormat": "Kolla e-postadressen.",
    "form.errPhone": "Fyll i telefonnummer.",
    "form.errSend": "Något gick fel. Mejla oss direkt på ufkonsulterna@gmail.com",

    "privacy.title": "Personuppgifter",
    "privacy.text": "När ni skickar formuläret sparar vi uppgifterna ni fyller i (namn, e-post, telefon och det ni skriver) för att kunna svara på er förfrågan. Uppgifterna lagras hos vår formulärtjänst Netlify och delas inte med någon annan. Vi raderar dem när de inte längre behövs. Vill ni att vi tar bort era uppgifter tidigare, mejla ufkonsulterna@gmail.com.",
  },

  en: {
    "meta.homeTitle": "UF Konsulterna | Websites for UF companies",
    "meta.aboutTitle": "About | UF Konsulterna",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact us",
    "bar.new": "NEW",
    "bar.text": "Now taking new UF projects for 2026",
    "bar.link": "See packages",

    "hero.title": "Your idea deserves a website that feels real.",
    "hero.lead": "We build fast, mobile-friendly websites for UF companies. Fixed price, no subscriptions.",
    "hero.cta1": "See packages",
    "hero.cta2": "Contact us",

    "plans.title": "Two packages. Fixed prices.",
    "plans.lead": "We tailor the content, colors and feel to your company.",
    "std.desc": "For companies that want to present themselves and their product professionally.",
    "std.f1": "Up to 4 pages, e.g. home, products, about and contact",
    "std.f2": "Design in your colors with your logo",
    "std.f3": "Product showcase with images and prices",
    "std.f4": "We add your texts and images",
    "std.f5": "Works just as well on mobile as on desktop",
    "std.time": "Delivery in about 7–21 days",
    "std.cta": "Choose Standard",
    "prem.desc": "For companies that want to sell and get paid directly on the website.",
    "prem.f1": "Everything in Standard",
    "prem.f2": "Customers can pay directly with Swish",
    "prem.f3": "Contact form that sends inquiries to your email",
    "prem.f4": "One extra feature as needed, e.g. booking or newsletter",
    "prem.time": "Delivery in about 7–14 days",
    "prem.cta": "Choose Premium",
    "plans.pay": "Pay with Swish or bank transfer. You only pay once we have agreed on the project.",
    "plans.note": 'Another idea for payment, like a share of sales? <a href="om.html#kontakt">Get in touch.</a>',

    "work.title": "Recent projects",
    "work.asfahas": "Website · Barbershop",
    "work.it": "Application · Workflow",
    "work.visit": "Visit project ↗",

    "quote.text": "“We could keep focusing on the product, and got a website that made customers see us as a real company.”",
    "quote.cite": "Feedback from a client project",

    "faq.title": "Frequently asked questions",
    "faq.q1": "Do we need our own domain?",
    "faq.a1": "Yes! We help you choose and connect a domain. The domain itself is included in the price.",
    "faq.q2": "How long does it take?",
    "faq.a2": "Standard takes about 7–21 days and Premium about 7–14 days, counted from when we have your texts and images. You get a timeline once we have talked through the project.",
    "faq.q3": "How do we pay?",
    "faq.a3": "With Swish to <b>123 702 66 85</b> or by bank transfer. You pay once we have agreed on the project, and get all the details in a confirmation email.",
    "faq.q4": "What do we need to send you?",
    "faq.a4": "Your logo, images, texts about the company and some general info about you. If anything is missing, we help out.",
    "faq.q5": "Can we change the website afterwards?",
    "faq.a5": "Yes. Get in touch and we help you with changes after launch.",
    "faq.q6": "Are there any ongoing costs?",
    "faq.a6": "No subscriptions from us. One payment, and then the website is yours.",

    "footer.tag": "You focus on the business.",
    "footer.privacy": "Privacy",

    "about.title": "Three students building for real.",
    "about.lead": "We are three high school students with freelance experience from real clients. We combine development, finance and sales to deliver a complete package that looks professional and works in practice.",
    "about.p2": "Many UF companies spend months on their idea, and one evening on their website. It shows when customers, judges and partners meet the company. We want to change that.",
    "process.title": "How it works",
    "process.s1": "You tell us",
    "process.t1": "Describe your company, your goals and the feel you want the website to have.",
    "process.s2": "We shape",
    "process.t2": "We choose structure, colors and expression together with you.",
    "process.s3": "We build",
    "process.t3": "We build a fast, mobile-friendly website and keep you updated along the way.",
    "process.s4": "You launch",
    "process.t4": "After your feedback we fine-tune the website and help you go live.",

    "contact.title": "Contact us",
    "contact.lead": "Tell us what you want to build and we will get back to you shortly.",
    "contact.email": "Email",
    "contact.phone": "Phone",

    "form.step1": "About you",
    "form.step2": "Style",
    "form.step3": "Details",
    "form.company": "UF company *",
    "form.companyPh": "Example UF",
    "form.name": "Contact person *",
    "form.namePh": "Full name",
    "form.email": "Email *",
    "form.emailPh": "name@example.com",
    "form.phone": "Phone *",
    "form.handlePh": "@yourcompany",
    "form.plan": "Choose package",
    "form.color": "Color direction",
    "form.c1": "Dark & exclusive",
    "form.c2": "Light & clean",
    "form.c3": "Colorful",
    "form.c4": "Own idea",
    "form.style": "Design style",
    "form.s2": "Playful",
    "form.s3": "Minimalist",
    "form.s4": "Technical",
    "form.pay": "Payment",
    "form.p1": "Fixed price",
    "form.p2": "Pay later",
    "form.p3": "Discuss partnership / share",
    "form.msg": "Anything else we should know?",
    "form.msgPh": "Describe your product, features or link inspiration...",
    "form.back": "Back",
    "form.next": "Next",
    "form.send": "Send request",
    "form.sending": "Sending...",
    "form.success": "Thanks! We have received your request and will be in touch soon.",
    "form.errCompany": "Enter your company name.",
    "form.errName": "Enter a contact person.",
    "form.errEmail": "Enter your email.",
    "form.errEmailFormat": "Check the email address.",
    "form.errPhone": "Enter your phone number.",
    "form.errSend": "Something went wrong. Email us directly at ufkonsulterna@gmail.com",

    "privacy.title": "Personal data",
    "privacy.text": "When you send the form, we save the details you enter (name, email, phone and your message) so that we can answer your request. The data is stored with our form service Netlify and is not shared with anyone else. We delete it when it is no longer needed. If you want us to delete your data sooner, email ufkonsulterna@gmail.com.",
  },
};

let lang = "sv";
try { lang = localStorage.getItem("lang") || "sv"; } catch {}
if (!TEXTS[lang]) lang = "sv";

// Hämta en text på det valda språket (används även av main.js och form.js)
function t(key) {
  return TEXTS[lang][key] ?? TEXTS.sv[key] ?? key;
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  const label = document.getElementById("langLabel");
  if (label) label.textContent = lang.toUpperCase();
  const btn = document.getElementById("langToggle");
  if (btn) btn.setAttribute("aria-label", lang === "sv" ? "Switch to English" : "Byt till svenska");
  // Säg till de andra filerna att språket har ändrats
  document.dispatchEvent(new CustomEvent("langchange"));
}

document.getElementById("langToggle")?.addEventListener("click", () => {
  lang = lang === "sv" ? "en" : "sv";
  try { localStorage.setItem("lang", lang); } catch {}
  applyLang();
});

applyLang();
