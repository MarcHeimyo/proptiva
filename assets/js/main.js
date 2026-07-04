/* =========================================================================
   PROPTIVA — landing interactions, i18n, Zürich skyline
   ========================================================================= */

/* ---------- i18n dictionary (EN overrides; DE lives in the HTML) ---------- */
const I18N = {
  "brand.sub": "by Heimyo · Zurich",
  "nav.system": "System", "nav.capabilities": "Capabilities", "nav.platform": "Portfolio Manager",
  "nav.onboarding": "How it works", "nav.contact": "Contact", "nav.cta": "Live demo",

  "hero.badge": "For pension funds, investment foundations & institutional investors",
  "hero.title.1": "Your real estate portfolio —",
  "hero.title.2": "prepared for the boardroom.",
  "hero.lead": "Proptiva runs your directly-held property portfolio digitally: a live cockpit for the board of trustees and investment committee, self-service scenarios, on-site videos at every inspection, and reporting that connects to TER, AMAS and SSREI standards. From Zurich, for Switzerland.",
  "hero.cta.primary": "Experience the Portfolio Manager",
  "hero.cta.secondary": "Book a conversation",
  "hero.m1": "Live access for your committees",
  "hero.m2": "digitally auditable & verifiable",
  "hero.m3": "at every on-site inspection",
  "hero.m4": "months to cockpit go-live",

  "trust.label": "Built for the needs of",

  "sys.eyebrow": "The system",
  "sys.title": "Your asset data becomes auditable decisions",
  "sys.lead": "Proptiva combines a specialised centre of excellence with a platform. Everything that defines your portfolio flows together — and comes back out as a live cockpit, scenarios and committee-ready reporting.",
  "sys.in1": "Leases & asset data", "sys.in2": "Valuations & target yield", "sys.in3": "Inspection videos", "sys.in4": "Receipts & ESG data",
  "sys.core.t": "Proptiva", "sys.core.p": "Centre of excellence + platform",
  "sys.out1": "Live cockpit for your committees", "sys.out2": "Scenarios & target yield", "sys.out3": "TER / AMAS / SSREI reporting", "sys.out4": "Real-time decisions",

  "cap.eyebrow": "Capabilities",
  "cap.title": "What a specialised mandate has to deliver",
  "cap.lead": "A live dashboard alone isn't enough. Institutional portfolios need auditability, expertise, and a look at the real substance — not just the numbers.",
  "cap.c1.tag": "Governance", "cap.c1.title": "Live cockpit for your committees", "cap.c1.text": "Role-based access for the board of trustees, investment and real estate committees. Your committees fulfil their non-delegable oversight duty verifiably — anytime, not just at the meeting.",
  "cap.c2.tag": "Substance", "cap.c2.title": "On-site video at every inspection", "cap.c2.text": "Every inspection produces a video linked to the property. You see the real condition of your substance — not just a metric. Hardly anyone offers this in this form.",
  "cap.c3.tag": "Self-service", "cap.c3.title": "Run scenarios yourself", "cap.c3.text": "Target yield, vacancy, rent growth, CAPEX — inside a managed mandate, not as software you have to operate yourself. Answers in seconds, not days.",
  "cap.c4.tag": "Cost", "cap.c4.title": "Cost transparency in your language", "cap.c4.text": "Benchmarkable cost disclosure, connectable to TER_ISA and TER_REF. The cost-transparency ratio for the annual accounts — not 'cheap', but auditable.",
  "cap.c5.tag": "ESG & climate", "cap.c5.title": "CO₂ reduction path per property", "cap.c5.text": "AMAS metrics (mandatory since 31 Dec 2024), a reduction path towards net-zero 2050 with investment cost vs. CO₂ savings — connectable to SSREI and GRESB.",
  "cap.c6.tag": "Centre of excellence", "cap.c6.title": "Expertise & digital collaboration", "cap.c6.text": "A dedicated team purely for institutional portfolios — valuation, law, CAPEX, ESG. Digital collaboration with your committees via API and export, not email attachments.",

  "why.eyebrow": "Why now",
  "why.title": "The regulatory tailwind is here",
  "why.1.n": "Mandatory", "why.1.l": "AMAS ESG metrics in annual reports since 31 Dec 2024",
  "why.2.l": "OPO 2 / LPP: the board's non-delegable oversight duty (Art. 51a)",
  "why.3.l": "GHG by 2030 as an interim step towards net-zero 2050",
  "why.4.n": "Criterion", "why.4.l": "Digital collaboration as a mandate prerequisite",

  "cmp.eyebrow": "Head to head",
  "cmp.title": "Proptiva versus traditional management",
  "cmp.lead": "Traditional management describes today's common status quo. Some providers are more digital — but the combination of managed mandate, live cockpit and on-site video rarely is.",
  "cmp.h1": "Criterion", "cmp.h2": "Traditional management",
  "cmp.r1": "Access for committees", "cmp.r1a": "Quarterly report as PDF", "cmp.r1b": "Role-based, live, 24/7",
  "cmp.r2": "Own scenarios", "cmp.r2a": "Request by email, days later", "cmp.r2b": "Self-service in the mandate",
  "cmp.r3": "Condition of the substance", "cmp.r3a": "Text report, rarely current", "cmp.r3b": "Video at every inspection",
  "cmp.r4": "Cost disclosure", "cmp.r4a": "inconsistent, hard to compare", "cmp.r4b": "TER_ISA / TER_REF-connectable",
  "cmp.r5": "ESG & CO₂", "cmp.r5a": "compiled afterwards", "cmp.r5b": "integrated, AMAS/SSREI-ready",
  "cmp.r6": "Expertise for institutions", "cmp.r6a": "runs on the side", "cmp.r6b": "dedicated centre of excellence",

  "plat.eyebrow": "The Portfolio Manager",
  "plat.title": "Your entire portfolio on one screen",
  "plat.lead": "Live metrics, assets with traffic-light status, videos of the latest inspection, and a calculator your committees use to play through scenarios themselves.",
  "plat.k1": "Portfolio value", "plat.k2": "Net yield", "plat.k3": "Occupancy", "plat.k4": "Vacancy",
  "plat.chart": "Portfolio value · 12 months", "plat.objects": "Assets · Status", "plat.video": "Latest inspection: Zurich West",
  "plat.cta": "Open interactive demo",

  "vid.eyebrow": "On site. For you.",
  "vid.title": "See the substance, not just the number",
  "vid.lead": "Metrics show performance — but not the condition of the roof. At every inspection we film the property: façade, technical systems, critical points. The videos land directly in the Portfolio Manager, linked to the asset, with timestamp and history.",
  "vid.p1": "Standardised at every inspection", "vid.p2": "Linked directly to the asset in the system", "vid.p3": "Timestamp & history per property",
  "vid.caption": "Inspection 01 Jul 2026",

  "onb.eyebrow": "The process",
  "onb.title": "To a live portfolio in around 2 months",
  "onb.d1": "Week 1–2", "onb.s1.t": "Portfolio analysis", "onb.s1.p": "We capture assets, contracts and metrics and assess the optimisation potential.",
  "onb.d2": "Week 2–5", "onb.s2.t": "Digitisation", "onb.s2.p": "Your data moves structured into the Portfolio Manager — including documents and history.",
  "onb.d3": "Week 5–7", "onb.s3.t": "Live access", "onb.s3.p": "Your committees receive role-based access to the cockpit with live metrics and videos.",
  "onb.d4": "From week 8", "onb.s4.t": "Ongoing management", "onb.s4.p": "The centre of excellence manages, documents on video and optimises continuously.",

  "tst.eyebrow": "Voices",
  "tst.title": "What committees value about Proptiva",
  "tst.note": "Illustrative quotes — references on request.",
  "tst.q1": "“For the first time our investment committee sees the portfolio status without waiting for the quarterly pack. It changes how we decide.”",
  "tst.q1.n": "Investment committee member", "tst.q1.r": "mid-sized pension fund",
  "tst.q2": "“The inspection videos are worth their weight in gold. We see the condition of every property without travelling across Switzerland.”",
  "tst.q2.n": "Chair of the board of trustees", "tst.q2.r": "staff pension foundation",
  "tst.q3": "“Cost transparency and ESG metrics now come from one source. The effort for the annual accounts is noticeably smaller.”",
  "tst.q3.n": "Managing director", "tst.q3.r": "investment foundation",

  "std.eyebrow": "Standards & security",
  "std.title": "Connectable to the standards your committees check",
  "std.b1": "Information security (targeted)", "std.b2": "Cost-transparency compliant", "std.b3": "ESG reporting", "std.b4": "connectable", "std.b5": "Swiss Hosting",

  "cta.eyebrow": "Start without obligation",
  "cta.title": "See Proptiva on your own portfolio",
  "cta.lead": "Book a personal demo. We show you the Portfolio Manager on a sample property and discuss what onboarding looks like for your vehicle.",
  "cta.demo": "See the demo first",
  "cta.f.name": "Name", "cta.f.name.ph": "First and last name",
  "cta.f.org": "Institution", "cta.f.org.ph": "Pension fund / foundation",
  "cta.f.email": "Email", "cta.f.vol": "Portfolio volume",
  "cta.f.vol.1": "under CHF 100m", "cta.f.vol.2": "CHF 100–500m", "cta.f.vol.3": "CHF 500m – 1bn", "cta.f.vol.4": "over CHF 1bn",
  "cta.f.submit": "Request demo",
  "cta.f.note": "We respond within 24 hours. Your data is treated confidentially.",
  "cta.f.sent": "Thank you — we'll be in touch within 24 hours.",

  "foot.about": "Digital real estate portfolio management for Swiss pension funds and institutional investors. An offering of Heimyo Holding AG.",
  "foot.product": "Platform", "foot.demo": "Portfolio Manager demo",
  "foot.company": "Company", "foot.contact": "Contact", "foot.legal": "Imprint · Privacy · Terms",

  "plat.auto": "Product walkthrough · plays automatically", "plat.replay": "Replay", "plat.toast": "New inspection: Zurich West",
  "vid.ca1": "Façade · sound", "vid.ca2": "Systems · service due", "vid.ca3": "Roof · checked",
  "ex.eyebrow": "Example asset", "ex.title": "A Zurich property in the cockpit",
  "ex.name": "Mixed-use building Seefeld", "ex.addr": "Seefeldstrasse 12 · 8008 Zurich · built 1978, refurbished 2021",
  "ex.k1": "Market value", "ex.k2": "Net yield", "ex.k3": "Occupancy", "ex.k4": "Last inspection",
  "ex.cta": "View in the Portfolio Manager",
  "net.label": "Part of the Heimyo network · regional presence across Switzerland",
  "net.eyebrow": "Regional presence",
  "net.title": "A network that's on the ground — across Switzerland",
  "net.lead": "Proptiva is part of the Heimyo network. Regional partners ensure local presence — the basis for inspecting and filming every property in person.",
  "net.pdesc": "Local management and on-site presence.",
  "net.p1.r": "Schaffhausen", "net.p2.r": "Lucerne & Central Switzerland", "net.p3.r": "Winterthur & Zurich", "net.p4.r": "Thurgau & St. Gallen",
  "net.ref": "We're happy to discuss client references in a personal conversation.",

  "int.eyebrow": "Integrations",
  "int.title": "We connect to your existing system landscape",
  "int.lead": "Proptiva doesn't replace what works — we consolidate your data sources. Via interfaces and imports, property management, accounting, valuation, payments and ESG data flow into one cockpit. Examples per category:",
  "int.c1.cat": "Management & ERP", "int.c1.t": "Asset, lease & accounting data",
  "int.c2.cat": "Valuation & market data", "int.c2.t": "Market values & benchmarks",
  "int.c3.cat": "Banking & payments", "int.c3.t": "Rents & payment reconciliation",
  "int.c4.cat": "ESG & energy", "int.c4.t": "CO₂, energy & sustainability",
  "int.c5.cat": "Documents & communication", "int.c5.t": "Receipts, contracts & portals",
  "int.c6.cat": "Reporting & consolidation", "int.c6.t": "Export into your asset accounts",
  "int.note": "Not seeing your system? <strong>We connect additional sources via API or import.</strong>",

  /* Footer legal + legal pages */
  "foot.imprint": "Legal notice",
  "foot.privacy": "Privacy policy",
  "legal.back": "Back to homepage",

  "legal.imp.kicker": "Legal",
  "legal.imp.title": "Legal notice",
  "legal.imp.lead": "Information as required by law. Proptiva is a service of Heimyo Holding AG.",
  "legal.imp.h.provider": "Responsible entity",
  "legal.imp.h.rep": "Authorised representatives",
  "legal.imp.h.register": "Commercial register &amp; tax",
  "legal.imp.reg.court": "Commercial register",
  "legal.imp.reg.vat": "VAT no.",
  "legal.imp.h.content": "Responsible for content",
  "legal.imp.h.disclaimer": "Disclaimer",
  "legal.imp.disclaimer": "Despite careful review, we accept no liability for the accuracy, completeness or timeliness of the content. The operators of linked external sites are solely responsible for their content.",
  "legal.imp.h.copyright": "Copyright",
  "legal.imp.copyright": "All content on this website is subject to Swiss copyright law and may only be used with the written consent of Heimyo Holding AG.",
  "legal.imp.source": "These details correspond to the legal notice of Heimyo Holding AG (www.heimyo.com).",

  "legal.ds.kicker": "Legal",
  "legal.ds.title": "Privacy policy",
  "legal.ds.lead": "How Heimyo Holding AG processes personal data — for Proptiva and Heimyo's other services.",
  "legal.ds.updated": "Last updated: 1 October 2025",
  "legal.ds.s1.contact": "For privacy-related questions, please contact: <a class=\"inline\" href=\"mailto:info@heimyo.com\">info@heimyo.com</a>",
  "legal.ds.s2.p": "This privacy policy meets the requirements of:",
  "legal.ds.s2.note": "As we operate in both Switzerland and Germany, we observe all applicable data protection regulations.",
  "legal.ds.s3.p": "We collect personal data only where legally permitted or where you have consented. This includes in particular:",
  "legal.ds.s4.p": "We process your data for the following purposes:",
  "legal.ds.s5.note": "For data processing under the Swiss DSG, we rely on the principles of proportionality, purpose limitation and data security.",
  "legal.ds.s6.p1": "Your data is only shared with third parties where necessary to perform a contract, where a legal obligation exists, or where you have consented.",
  "legal.ds.s6.p2": "Possible recipients: IT service providers, accounting and HR service providers, authorities.",
  "legal.ds.s7.p1": "We store data primarily in Switzerland and the EU.",
  "legal.ds.s7.p2": "If data is transferred to countries without an adequate level of data protection, we ensure protection through appropriate safeguards (e.g. EU Standard Contractual Clauses (SCC)).",
  "legal.ds.s8.p": "We store personal data only for as long as necessary to fulfil the respective purposes or as required by statutory retention periods.",
  "legal.ds.s9.p": "You have the right at any time to:",
  "legal.ds.s9.ch": "In Switzerland, you may also lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC).",
  "legal.ds.s9.de": "In Germany, the competent supervisory authority is the data protection authority of the respective federal state.",
  "legal.ds.s10.p": "We use technical and organisational security measures to protect your data against manipulation, loss, destruction or unauthorised access. Our security measures are reviewed regularly and adapted to technological progress.",
  "legal.ds.s11.p1": "Our website uses cookies and similar technologies to analyse and improve usage.",
  "legal.ds.s11.p2": "You can object to their use or withdraw your consent at any time via our cookie banner.",
  "legal.ds.s12.p": "We reserve the right to amend this privacy policy at any time. The current version published on our website applies.",
  "legal.ds.source": "Adapted from the privacy policy of Heimyo Holding AG (www.heimyo.com). © 2025 Heimyo Holding AG."
};

function initI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => el.dataset.de = el.innerHTML);
  document.querySelectorAll("[data-i18n-ph]").forEach(el => el.dataset.dePh = el.getAttribute("placeholder") || "");
}
function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = (lang === "en" && I18N[key] != null) ? I18N[key] : el.dataset.de;
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    el.setAttribute("placeholder", (lang === "en" && I18N[key] != null) ? I18N[key] : el.dataset.dePh);
  });
  document.querySelectorAll("#langToggle button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  try { localStorage.setItem("proptiva_lang", lang); } catch (e) {}
}

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  burger?.addEventListener("click", () => menu.classList.toggle("open"));
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
}

/* ---------- Reveal ---------- */
function initReveal() {
  const els = [...document.querySelectorAll("[data-reveal]")];
  const reveal = el => el.classList.add("in");
  // If the tab is hidden at load, CSS transitions & IntersectionObserver are frozen —
  // show everything instantly (no animation) so content is never stuck invisible.
  if (document.hidden || !("IntersectionObserver" in window)) {
    document.documentElement.classList.add("reveal-instant");
    els.forEach(reveal);
    if (!("IntersectionObserver" in window)) return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
  // Safety net: in some contexts (e.g. a not-yet-"visible" preview tab) the observer
  // never delivers callbacks. Reveal by geometry on load + scroll so content is never
  // stuck invisible. setTimeout (not rAF) so it also fires in a backgrounded tab.
  const revealVisible = () => {
    const vh = window.innerHeight || 800;
    els.forEach(el => {
      if (el.classList.contains("in")) return;
      const r = el.getBoundingClientRect();
      if (r.top < vh + 100 && r.bottom > -100) reveal(el);
    });
  };
  setTimeout(revealVisible, 200);
  window.addEventListener("scroll", revealVisible, { passive: true });
  window.addEventListener("resize", revealVisible, { passive: true });
  // If the page loaded in a not-yet-visible tab, reveal once it becomes visible.
  document.addEventListener("visibilitychange", () => { if (!document.hidden) revealVisible(); });
  // Ultimate guarantee: never leave content permanently hidden.
  setTimeout(() => els.forEach(reveal), 4000);
}

/* ---------- Counters ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const suffix = el.dataset.suffix || "";
  let start = null; const dur = 1300;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll("[data-count]").forEach(animateCount); io.unobserve(e.target); } });
  }, { threshold: 0.4 });
  const m = document.querySelector(".hero-metrics");
  if (m) io.observe(m);
}

/* ---------- Area chart ---------- */
function buildAreaChart(svg, data, opts = {}) {
  const w = opts.w || 300, h = opts.h || 70;
  const min = Math.min(...data), max = Math.max(...data);
  const pad = (max - min) * 0.15 || 1, lo = min - pad, hi = max + pad;
  const x = i => (i / (data.length - 1)) * w;
  const y = v => h - ((v - lo) / (hi - lo)) * h;
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const stroke = opts.stroke || "var(--gold)";
  svg.innerHTML = `
    <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${stroke}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${stroke}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#ga)"/>
    <path d="${line}" fill="none" stroke="${stroke}" stroke-width="${opts.sw || 2.5}" stroke-linecap="round" stroke-linejoin="round"
      style="stroke-dasharray:1600;stroke-dashoffset:1600;animation:draw 1.6s var(--ease) forwards"/>`;
}
(function injectKf() {
  const s = document.createElement("style");
  s.textContent = "@keyframes draw{to{stroke-dashoffset:0}}";
  document.head.appendChild(s);
})();

/* ---------- Zürich skyline ---------- */
function buildSkyline() {
  const svg = document.getElementById("skyline");
  if (!svg) return;
  const W = 1440, H = 300, base = H;
  const parts = [
    `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="#16203A"/><stop offset="1" stop-color="#090E1A"/></linearGradient>
     <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
       <stop offset="0" stop-color="#1B2745"/><stop offset="1" stop-color="#0A1020"/></linearGradient></defs>`
  ];

  const windowsFor = (bx, by, bw, bh, dense) => {
    let s = "";
    const stepX = dense ? 11 : 13, stepY = 15;
    let idx = 0;
    for (let wy = by + 12; wy < by + bh - 12; wy += stepY) {
      for (let wx = bx + 7; wx < bx + bw - 9; wx += stepX) {
        idx++;
        if (idx % 3 === 0) continue;
        const delay = (((wx * 7 + wy * 3) % 40) / 10).toFixed(1);
        s += `<rect class="win" x="${wx}" y="${wy}" width="4" height="6" rx="0.5" style="animation-delay:${delay}s"/>`;
      }
    }
    return s;
  };

  // Back layer: generic buildings across the width (deterministic pattern)
  const pattern = [78,120,96,150,72,112,60,132,90,58,104,150,86,116,66,126,96,150,80,106,70,136,92,120,60,100,146,84,112,150,74,118,96,140];
  let bx = 0, k = 0;
  while (bx < W) {
    const bw = 36 + (k % 5) * 7;
    const bh = pattern[k % pattern.length] * 0.9;
    parts.push(`<rect x="${bx}" y="${(base - bh).toFixed(0)}" width="${bw - 4}" height="${bh.toFixed(0)}" fill="url(#sky)"/>`);
    if (bh > 96) parts.push(windowsFor(bx, base - bh, bw - 4, bh, false));
    bx += bw; k++;
  }

  // Landmarks (front layer, stylised Zürich)
  // Prime Tower — tall modern glass tower
  parts.push(`<rect x="150" y="${base-232}" width="60" height="232" fill="url(#sky2)"/>`);
  parts.push(`<rect x="150" y="${base-232}" width="60" height="6" fill="var(--gold)" opacity="0.5"/>`);
  parts.push(windowsFor(150, base-232, 60, 232, true));

  // St. Peter — clock tower
  parts.push(`<rect x="520" y="${base-152}" width="34" height="152" fill="url(#sky2)"/>`);
  parts.push(`<polygon points="520,${base-152} 554,${base-152} 537,${base-172}" fill="url(#sky2)"/>`);
  parts.push(`<circle cx="537" cy="${base-128}" r="9" fill="none" stroke="var(--gold)" stroke-width="1.5" opacity="0.7"/>`);

  // Fraumünster — single slender spire
  parts.push(`<rect x="612" y="${base-176}" width="40" height="176" fill="url(#sky2)"/>`);
  parts.push(`<polygon points="612,${base-176} 652,${base-176} 632,${base-224}" fill="url(#sky2)"/>`);
  parts.push(windowsFor(612, base-176, 40, 176, false));

  // Grossmünster — twin towers
  [720, 774].forEach(tx => {
    parts.push(`<rect x="${tx}" y="${base-192}" width="44" height="192" fill="url(#sky2)"/>`);
    parts.push(`<polygon points="${tx-3},${base-192} ${tx+47},${base-192} ${tx+22},${base-214}" fill="url(#sky2)"/>`);
    parts.push(windowsFor(tx, base-192, 44, 192, false));
  });

  // A second modern tower on the right
  parts.push(`<rect x="1150" y="${base-206}" width="56" height="206" fill="url(#sky2)"/>`);
  parts.push(`<rect x="1150" y="${base-206}" width="56" height="6" fill="var(--gold)" opacity="0.5"/>`);
  parts.push(windowsFor(1150, base-206, 56, 206, true));

  // Lake / waterline reflection strip
  parts.push(`<rect x="0" y="${base-3}" width="${W}" height="3" fill="var(--gold)" opacity="0.14"/>`);

  svg.innerHTML = parts.join("");
}

/* ---------- Visuals ---------- */
function initVisuals() {
  const sc = document.getElementById("showcaseChart");
  if (sc) {
    const io = new IntersectionObserver((en) => en.forEach(e => {
      if (e.isIntersecting) { buildAreaChart(sc, [118,120,119,123,125,124,128,131,130,134,138,141], { w: 520, h: 150, stroke: "var(--gold)", sw: 2.5 }); io.disconnect(); }
    }), { threshold: 0.3 });
    io.observe(sc);
  }
  const bars = [40,62,50,78,58,88,66,72,54,82,60,46];
  const barHtml = bars.map(h => `<span style="height:${h}%"></span>`).join("");
  const bh = document.getElementById("videoBuildings");
  if (bh) bh.innerHTML = barHtml;
  const eb = document.getElementById("exBuildings");
  if (eb) eb.innerHTML = barHtml;
}

/* ---------- Inspection video (animated playback) ---------- */
function initVideo() {
  const block = document.getElementById("videoBlock");
  const btn = document.getElementById("playBtn");
  if (!block || !btn) return;
  btn.addEventListener("click", () => block.classList.add("playing"));
}

/* ---------- Portfolio-Manager auto-demo (screencast loop) ---------- */
function initShowcaseDemo() {
  const frame = document.getElementById("pmDemo");
  const chart = document.getElementById("showcaseChart");
  if (!frame || !chart) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const series = [118,120,119,123,125,124,128,131,130,134,138,141];
  const kpis = frame.querySelectorAll(".mini-kpi .v");
  const bases = ["1.41","3.8","97.4","2.6"];
  let phase = 0;
  const draw = () => buildAreaChart(chart, series.map((v, i) => v + Math.sin(i + phase) * 0.7), { w: 520, h: 150, stroke: "var(--gold)", sw: 2.5 });

  const tick = () => {
    phase += 0.7;
    draw();
    // gentle live jitter on the KPI values
    kpis.forEach((el, i) => {
      const base = parseFloat(bases[i]);
      const jitter = (Math.sin(phase + i * 1.7) * (i === 0 ? 0.01 : 0.15)).toFixed(i === 0 ? 2 : 1);
      const val = (base + parseFloat(jitter));
      if (i === 0) el.textContent = "CHF " + val.toFixed(2) + " Mrd";
      else el.textContent = val.toFixed(1) + "%";
    });
  };

  let timer = null;
  const start = () => { draw(); if (!reduce && !timer) timer = setInterval(tick, 3200); };
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { start(); io.disconnect(); } }), { threshold: 0.3 });
  io.observe(chart);

  // replay button: restart the CSS loop animations
  document.getElementById("demoReplay")?.addEventListener("click", () => {
    frame.classList.remove("playing");
    void frame.offsetWidth; // reflow to reset animations
    frame.classList.add("playing");
    draw();
  });
}
/* Web3Forms — delivers submissions to m.lautenschlager@heimyo.com (same key as neue-verwaltung.ch). */
const WEB3FORMS_KEY = "6d35445b-8da2-4a56-bf1b-31fa4164b8a3";
const CONTACT_EMAIL = "info@heimyo.com";

function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const note = document.getElementById("formNote");
  const btn = form.querySelector("button[type=submit]");
  const en = () => document.documentElement.lang === "en";
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const [name, org, mail, vol] = [...form.querySelectorAll("input, select")].map(el => el.value.trim());
    btn.disabled = true;
    btn.textContent = en() ? "Sending …" : "Wird gesendet …";
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: "Proptiva Demo-Anfrage – " + name + " (" + org + ")",
      from_name: "Proptiva (Heimyo Institutional)",
      Name: name, Institution: org, Email: mail, Portfoliovolumen: vol
    };
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "error");
      const okTitle = en() ? "Thank you!" : "Vielen Dank!";
      const okMsg = en()
        ? "Your request has been received. We'll be in touch within 24 hours."
        : "Ihre Anfrage ist eingegangen. Wir melden uns innerhalb von 24 Stunden.";
      form.innerHTML = '<div class="form-success"><div class="fs-check">✓</div>' +
        '<h3>' + okTitle + '</h3><p>' + okMsg + '</p></div>';
    } catch (err) {
      btn.disabled = false;
      btn.textContent = en() ? "Request demo" : "Demo anfragen";
      note.innerHTML = en()
        ? 'Submission failed — please email <a href="mailto:' + CONTACT_EMAIL + '" style="color:var(--gold)">' + CONTACT_EMAIL + '</a>.'
        : 'Senden fehlgeschlagen — bitte per E-Mail an <a href="mailto:' + CONTACT_EMAIL + '" style="color:var(--gold)">' + CONTACT_EMAIL + '</a>.';
      note.style.color = "var(--neg-dark)";
    }
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  let saved = "de";
  try { saved = localStorage.getItem("proptiva_lang") || "de"; } catch (e) {}
  setLang(saved);
  document.getElementById("langToggle")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button"); if (btn) setLang(btn.dataset.lang);
  });
  initNav();
  initReveal();
  initCounters();
  buildSkyline();
  const heroVideo = document.querySelector(".hero-video");
  if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) heroVideo.pause();
  initVisuals();
  initShowcaseDemo();
  initVideo();
  initForm();
});
