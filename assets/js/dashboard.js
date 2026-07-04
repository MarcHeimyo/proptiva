/* =========================================================================
   PROPTIVA — Portfolio Manager demo logic
   Vanilla JS, no dependencies. Charts are hand-rolled inline SVG.
   Swiss conventions: always "ss" (no eszett); CHF uses apostrophe separators.
   ========================================================================= */

/* ---------- i18n (EN overrides; DE in HTML via data-t) ---------- */
const T = {
  "nav.overview": "Overview", "nav.objects": "Assets", "nav.calc": "Scenario calculator",
  "nav.map": "Map", "nav.assistant": "Ask Proptiva", "nav.governance": "Governance",
  "nav.esg": "ESG & CO₂ path", "nav.lease": "Leases", "nav.todo": "Action items",
  "nav.reports": "Reporting", "nav.docs": "Documents", "nav.activity": "Activity",
  "nav.back": "Back to website",
  "banner": "Interactive demo with sample data · ", "banner.cta": "Request a personal demo →",
  "top.title": "Portfolio overview", "top.sub": "Status: live · last updated a few seconds ago",
  "pf.1": "Total portfolio", "pf.2": "Residential Switzerland", "pf.3": "Commercial & office",
  "kpi.value": "Portfolio value", "kpi.yield": "Net yield", "kpi.occ": "Occupancy", "kpi.cf": "Net cash flow YTD",
  "ytd": "YTD",
  "chart.title": "Portfolio value trend",
  "alloc.title": "Allocation by use", "alloc.objs": "Assets",
  "obj.title": "Assets · Status & latest inspection", "obj.hint": "Click a video to open the inspection",
  "obj.h1": "Asset", "obj.h2": "Location", "obj.h3": "Value", "obj.h4": "Occupancy", "obj.h5": "Yield", "obj.h6": "Status", "obj.h7": "Inspection",
  "calc.title": "Scenario calculator — run it yourself", "calc.hint": "Move the sliders and see the impact instantly",
  "calc.rent": "Rent growth p.a.", "calc.vac": "Vacancy rate", "calc.capex": "CAPEX ratio p.a.", "calc.rate": "Capitalisation rate",
  "calc.o1": "Projected portfolio value (5 years)", "calc.o2": "Expected net yield (on today's value)", "calc.o3": "Net operating income p.a. (NOI)",
  "calc.note": "Simplified model for demonstration. In the live product Proptiva calculates on your real asset and contract data.",
  "cf.title": "Net cash flow per quarter",
  "map.title": "Assets across Switzerland", "map.obj": "properties",
  "modal.body": "Demo: in the live product the on-site inspection walkthrough plays here — façade, technical systems and documented defects, with timestamp and history.",
  "status.g": "Stable", "status.y": "Watch", "status.r": "Action",

  /* Ask Proptiva */
  "ai.title": "Ask Proptiva", "ai.sub": "Ask your portfolio in natural language",
  "ai.demo": "Demo · simulated", "ai.send": "Ask",
  "ai.ph": "Ask a question — e.g. vacancy analysis over the last year",
  "ai.thinking": "Analysing your portfolio data",
  "ai.you": "You asked:",
  "ai.fallback": "I could not clearly map that question to the demo data. Try one of the example questions above — for instance vacancy, yield, CAPEX, CO₂/ESG, portfolio value or lease expiries.",
  "ai.foot": "Computed from the demo data model · not investment advice.",

  /* Widgets */
  "todo.title": "Action items", "todo.hint": "Prioritised by urgency",
  "exp.title": "Reporting & documents", "exp.hint": "Board-ready",
  "exp.note": "Demo: exports are simulated. In the live product Proptiva generates audit-ready reports from your real data.",
  "esg.title": "CO₂ reduction path — Net-Zero 2050",
  "lease.title": "Lease remaining term (WAULT)",
  "ter.title": "Cost transparency (TER_ISA)", "ter.hint": "Total expense ratio p.a.",
  "vacw.title": "Vacancy trend over 12 months",

  "value.delta": "▲ {p}% vs. today", "value.deltaN": "▼ {p}% vs. today"
};
let LANG = "de";
function tr(key, fallback) {
  if (LANG === "en" && T[key] != null) return T[key];
  return fallback;
}
function initI18n() {
  document.querySelectorAll("[data-t]").forEach(el => el.dataset.de = el.innerHTML);
  document.querySelectorAll("[data-t-ph]").forEach(el => el.dataset.dePh = el.getAttribute("placeholder"));
}
function applyLang(lang) {
  LANG = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    el.innerHTML = (lang === "en" && T[key] != null) ? T[key] : el.dataset.de;
  });
  document.querySelectorAll("[data-t-ph]").forEach(el => {
    const key = el.getAttribute("data-t-ph");
    el.setAttribute("placeholder", (lang === "en" && T[key] != null) ? T[key] : el.dataset.dePh);
  });
  document.querySelectorAll("#langToggle button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  try { localStorage.setItem("proptiva_lang", lang); } catch (e) {}
  // Re-render ALL dynamic content in the active language
  renderChart(currentRange);
  renderDonut();
  renderObjects();
  renderCalc();
  renderTodos();
  renderExports();
  renderEsg();
  renderLease();
  renderTer();
  renderVacTrend();
  renderAiChips();
  if (lastQuery) runAssistant(lastQuery, true); // refresh answer in new language
}

/* =========================================================================
   Demo data model (Zürich-focused)
   ========================================================================= */
const SERIES_12 = [1291, 1305, 1298, 1322, 1339, 1331, 1358, 1372, 1364, 1389, 1401, 1413]; // CHF Mio, portfolio value
const MONTHS = ["Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez","Jan"];
const MONTHS_EN = ["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"];

const ALLOC = [
  { key: "Wohnen", keyEn: "Residential", val: 48, color: "#C9A227" },
  { key: "Büro", keyEn: "Office", val: 24, color: "#2E6BD6" },
  { key: "Retail", keyEn: "Retail", val: 15, color: "#0E8F5C" },
  { key: "Logistik", keyEn: "Logistics", val: 9, color: "#8156C9" },
  { key: "Sonstige", keyEn: "Other", val: 4, color: "#8B94A6" }
];

/* Per-object model: value (CHF Mio), occupancy %, yield %, status, inspection date,
   vacancy history (12 mo, % vacancy), lease expiry year + WAULT (yrs), ESG rating,
   CO2 intensity (kg CO2e/m2/yr), CAPEX need (CHF Mio, next 3yr), TER contribution. */
const OBJECTS = [
  { name: "Seefeldstrasse 12", loc: "Zürich · Seefeld", val: 84.2, occ: 99.1, yld: 4.1, s: "g", date: "28.06.2026",
    vacHist: [1.4,1.2,1.1,0.9,1.0,0.8,0.9,1.1,0.9,0.8,0.9,0.9], leaseYr: 2032, wault: 5.6, esg: "A", co2: 11, capex: 0.4, lat: 47.354, lng: 8.552 },
  { name: "Bahnhofpark West", loc: "Zürich · Kreis 5", val: 96.8, occ: 96.2, yld: 3.7, s: "g", date: "01.07.2026",
    vacHist: [2.9,3.1,3.0,3.4,3.6,3.8,3.9,3.7,3.6,3.8,3.9,3.8], leaseYr: 2029, wault: 2.9, esg: "B", co2: 18, capex: 1.2, lat: 47.387, lng: 8.517 },
  { name: "Uetlibergstrasse 40", loc: "Zürich · Enge", val: 62.4, occ: 97.9, yld: 3.6, s: "g", date: "26.06.2026",
    vacHist: [2.4,2.3,2.2,2.1,2.0,2.1,2.0,1.9,2.0,2.1,2.0,2.1], leaseYr: 2031, wault: 4.7, esg: "A", co2: 13, capex: 0.6, lat: 47.362, lng: 8.527 },
  { name: "Thurgauerstrasse 60", loc: "Zürich · Oerlikon", val: 108.5, occ: 95.4, yld: 3.4, s: "y", date: "24.06.2026",
    vacHist: [3.2,3.6,3.9,4.1,4.4,4.6,4.8,4.7,4.6,4.6,4.5,4.6], leaseYr: 2027, wault: 1.4, esg: "C", co2: 27, capex: 2.4, lat: 47.410, lng: 8.545 },
  { name: "Badenerstrasse 570", loc: "Zürich · Altstetten", val: 51.2, occ: 90.8, yld: 3.1, s: "y", date: "19.06.2026",
    vacHist: [5.1,5.4,5.9,6.8,7.6,8.3,8.9,9.4,9.6,9.5,9.3,9.2], leaseYr: 2028, wault: 2.1, esg: "C", co2: 31, capex: 3.1, lat: 47.391, lng: 8.487 },
  { name: "Technopark-Areal", loc: "Winterthur", val: 73.6, occ: 98.0, yld: 3.5, s: "g", date: "22.06.2026",
    vacHist: [2.6,2.4,2.3,2.2,2.1,2.0,2.1,2.0,1.9,2.0,2.0,2.0], leaseYr: 2033, wault: 6.8, esg: "A", co2: 9, capex: 0.3, lat: 47.499, lng: 8.726 },
  { name: "Industrie Nord", loc: "St. Gallen", val: 31.6, occ: 82.0, yld: 2.1, s: "r", date: "12.06.2026",
    vacHist: [9.8,11.2,12.6,14.1,15.4,16.6,17.4,17.9,18.0,18.0,17.8,18.0], leaseYr: 2027, wault: 0.9, esg: "D", co2: 44, capex: 4.6, lat: 47.430, lng: 9.375 }
];

const CF = [8.9, 9.4, 10.1, 9.8, 10.6, 11.2, 10.9, 11.8]; // quarterly CHF Mio (2 years)
const CF_LBL = ["Q1","Q2","Q3","Q4","Q1","Q2","Q3","Q4"];

/* Approx. positions of Swiss cities on the map SVG (viewBox 0 0 100 64) */
const CITY_COORDS = {
  "Zürich": { x: 61, y: 22 }, "Winterthur": { x: 66, y: 16 }, "St. Gallen": { x: 81, y: 20 },
  "Bern": { x: 44, y: 34 }, "Basel": { x: 38, y: 9 }, "Luzern": { x: 52, y: 30 },
  "Genf": { x: 8, y: 53 }, "Lausanne": { x: 20, y: 47 }, "Lugano": { x: 63, y: 57 }, "Zug": { x: 56, y: 28 }
};
const CITY_COLORS = ["#C9A227", "#0E8F5C", "#2E6BD6", "#8156C9", "#C63B50", "#0E8F5C"];

/* Portfolio-level CO2 path: current THG intensity and target trajectory (kg CO2e/m2/yr) */
const CO2_NOW = 19.5;         // weighted current intensity
const CO2_TARGET_2050 = 4.0;  // net-zero-aligned residual
const CO2_PATH_YEARS = [2024, 2028, 2032, 2036, 2040, 2044, 2050];
const CO2_TARGET_PATH = [21.0, 17.0, 13.5, 10.5, 8.0, 6.0, 4.0]; // AMAS-style Absenkpfad
const CO2_ACTUAL_PATH = [21.0, 19.5]; // realised so far (2024, 2026 proj.)

/* TER breakdown (bps of GAV) */
const TER = [
  { key: "Verwaltung", keyEn: "Management", bps: 32, color: "#C9A227" },
  { key: "Bewirtschaftung", keyEn: "Property mgmt", bps: 24, color: "#2E6BD6" },
  { key: "Depotbank & Revision", keyEn: "Custodian & audit", bps: 8, color: "#0E8F5C" },
  { key: "Sonstige", keyEn: "Other", bps: 6, color: "#8B94A6" }
];

/* ---------- Value chart (interactive) ---------- */
let currentRange = 12;
function renderChart(months) {
  const svg = document.getElementById("valueChart");
  if (!svg) return;
  const data = SERIES_12.slice(-months);
  const W = 640, H = 230, padB = 26, padT = 10;
  const min = Math.min(...data), max = Math.max(...data);
  const range = (max - min) || 1;
  const lo = min - range * 0.25, hi = max + range * 0.25;
  const x = i => (i / (data.length - 1)) * W;
  const y = v => padT + (H - padB - padT) * (1 - (v - lo) / (hi - lo));
  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H - padB} L0 ${H - padB} Z`;
  const labels = (LANG === "en" ? MONTHS_EN : MONTHS).slice(-months);

  let dots = data.map((v, i) =>
    `<circle class="pt" data-i="${i}" data-v="${v}" cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="10" fill="transparent" style="cursor:pointer"/>
     <circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.5" fill="var(--gold-deep)" opacity="0.7"/>`).join("");
  let xlabels = labels.map((m, i) => `<text x="${x(i).toFixed(1)}" y="${H - 8}" fill="var(--ink-3)" font-size="10" text-anchor="middle">${m}</text>`).join("");

  svg.innerHTML = `
    <defs><linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--gold-deep)" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="var(--gold-deep)" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#gv)"/>
    <path d="${line}" fill="none" stroke="var(--gold-deep)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
      style="stroke-dasharray:2000;stroke-dashoffset:2000;animation:draw 1.6s var(--ease) forwards"/>
    ${dots}${xlabels}`;

  const tip = document.getElementById("chartTip");
  const wrap = svg.parentElement;
  svg.querySelectorAll(".pt").forEach(pt => {
    pt.addEventListener("mouseenter", () => {
      const i = +pt.dataset.i, v = +pt.dataset.v;
      const rect = wrap.getBoundingClientRect();
      const px = (x(i) / W) * rect.width;
      const py = (y(v) / H) * rect.height;
      tip.style.left = px + "px";
      tip.style.top = py + "px";
      tip.innerHTML = `<div>${labels[i]}</div><div class="big">CHF ${(v/1000).toFixed(3)} Mrd</div>`;
      tip.style.opacity = "1";
    });
    pt.addEventListener("mouseleave", () => tip.style.opacity = "0");
  });
}

/* ---------- Donut ---------- */
function renderDonut() {
  const svg = document.getElementById("donut");
  if (!svg) return;
  const cx = 75, cy = 75, r = 58, sw = 20, C = 2 * Math.PI * r;
  let offset = 0;
  let seg = "";
  ALLOC.forEach((a, idx) => {
    const len = (a.val / 100) * C;
    seg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${a.color}" stroke-width="${sw}"
      stroke-dasharray="${len} ${C - len}" stroke-dashoffset="${-offset}"
      transform="rotate(-90 ${cx} ${cy})" stroke-linecap="butt"
      style="opacity:0;animation:fadeSeg .5s ease forwards ${0.15 * idx + 0.2}s"/>`;
    offset += len;
  });
  svg.innerHTML = seg;
  const legend = document.getElementById("donutLegend");
  legend.innerHTML = ALLOC.map(a =>
    `<div class="legend-item"><span class="sw" style="background:${a.color}"></span><span>${LANG === "en" ? a.keyEn : a.key}</span><span class="val">${a.val}%</span></div>`).join("");
}

/* ---------- Objects table ---------- */
function renderObjects() {
  const body = document.getElementById("objBody");
  if (!body) return;
  const label = { g: tr("status.g", "Stabil"), y: tr("status.y", "Beobachten"), r: tr("status.r", "Handeln") };
  body.innerHTML = OBJECTS.map((o, i) => `
    <tr>
      <td style="font-weight:600">${o.name}</td>
      <td class="muted">${o.loc}</td>
      <td class="num">CHF ${o.val.toFixed(1)} Mio</td>
      <td class="num">${o.occ.toFixed(1)}%</td>
      <td class="num" style="color:${o.s==='r'?'var(--neg)':o.s==='y'?'var(--gold-ink)':'var(--pos)'}">${o.yld.toFixed(1)}%</td>
      <td><span class="badge ${o.s}"><span class="status-dot ${o.s}"></span>${label[o.s]}</span></td>
      <td><button class="video-link" data-obj="${i}">🎥 ${o.date}</button></td>
    </tr>`).join("");
  body.querySelectorAll(".video-link").forEach(a =>
    a.addEventListener("click", () => openModal(OBJECTS[+a.dataset.obj])));
}

/* ---------- Scenario calculator ---------- */
const BASE_VALUE = 1413; // CHF Mio
const BASE_NOI = 53.7;   // net operating income CHF Mio (approx base)
const BASE_VAC = 2.6;    // base vacancy assumption %
function renderCalc() {
  const rentEl = document.getElementById("rent");
  if (!rentEl) return;
  const rent = parseFloat(rentEl.value);
  const vac = parseFloat(document.getElementById("vac").value);
  const capex = parseFloat(document.getElementById("capex").value);
  const rate = parseFloat(document.getElementById("rate").value);

  document.getElementById("rentVal").textContent = (rent >= 0 ? "+" : "") + rent.toFixed(1) + "%";
  document.getElementById("vacVal").textContent = vac.toFixed(1) + "%";
  document.getElementById("capexVal").textContent = capex.toFixed(1) + "%";
  document.getElementById("rateVal").textContent = rate.toFixed(1) + "%";

  // Simplified cap-rate model: gross rent grows with "rent", reduced by vacancy & capex → NOI.
  const grossBase = BASE_NOI / (1 - BASE_VAC / 100); // gross rent baseline
  const noi5 = grossBase * Math.pow(1 + rent / 100, 5) * (1 - vac / 100) - grossBase * (capex / 100);
  const value5 = noi5 / (rate / 100);
  const yieldPct = (noi5 / BASE_VALUE) * 100;
  const deltaPct = ((value5 - BASE_VALUE) / BASE_VALUE) * 100;

  document.getElementById("outValue").textContent = "CHF " + (value5 / 1000).toFixed(2) + " Mrd";
  const dEl = document.getElementById("outValueD");
  const arrow = deltaPct >= 0 ? "▲" : "▼";
  dEl.textContent = arrow + " " + (deltaPct >= 0 ? "+" : "") + deltaPct.toFixed(1) + "% " + (LANG === "en" ? "vs. today" : "ggü. heute");
  dEl.className = "delta " + (deltaPct >= 0 ? "pos" : "neg");

  document.getElementById("outYield").textContent = yieldPct.toFixed(1) + "%";
  document.getElementById("outCf").textContent = "CHF " + noi5.toFixed(1) + " Mio";
}

/* ---------- Cashflow bars ---------- */
function renderBars() {
  const el = document.getElementById("cfBars");
  if (!el) return;
  const max = Math.max(...CF);
  el.innerHTML = CF.map((v, i) =>
    `<div class="bar-col"><div class="bar ${i >= 4 ? "" : "alt"}" style="height:0" data-h="${(v / max) * 100}"></div><div class="bar-lbl">${CF_LBL[i]}</div></div>`).join("");
  requestAnimationFrame(() => setTimeout(() => {
    el.querySelectorAll(".bar").forEach(b => b.style.height = b.dataset.h + "%");
  }, 60));
}

/* ---------- Map ---------- */
function renderMap() {
  const el = document.getElementById("mapWrap");
  if (!el) return;
  // Real interactive map (Leaflet + CARTO light tiles). Init once.
  if (typeof L === "undefined") return;       // library not loaded yet
  if (el._leaflet_id) return;                  // already initialised
  el.innerHTML = "";
  const map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true })
    .setView([46.9, 8.3], 7);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19, subdomains: "abcd",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
  }).addTo(map);
  const color = s => (s === "r" ? "#C63B50" : s === "y" ? "#C9A227" : "#0E8F5C");
  const yieldWord = LANG === "en" ? "Yield" : "Rendite";
  OBJECTS.forEach(o => {
    if (o.lat == null) return;
    L.circleMarker([o.lat, o.lng], { radius: 9, color: "#fff", weight: 2, fillColor: color(o.s), fillOpacity: 1 })
      .addTo(map)
      .bindTooltip(o.name + " · " + o.loc, { direction: "top" })
      .bindPopup("<b>" + o.name + "</b><br>" + o.loc + "<br>" + yieldWord + " " + o.yld.toFixed(1) + "% · CHF " + o.val.toFixed(1) + " Mio");
  });
  el._pvMap = map;
  setTimeout(() => map.invalidateSize(), 250);
}

/* =========================================================================
   WIDGETS
   ========================================================================= */

/* --- Handlungsbedarf / action items (derived from data) --- */
function computeTodos() {
  const items = [];
  // Objects in "action" status
  OBJECTS.filter(o => o.s === "r").forEach(o => items.push({
    lvl: "r", ic: "!",
    de: { t: "Erhöhter Leerstand: " + o.name, s: o.loc + " · Vermietung " + o.occ.toFixed(1) + "%, Rendite " + o.yld.toFixed(1) + "%" },
    en: { t: "Elevated vacancy: " + o.name, s: o.loc + " · occupancy " + o.occ.toFixed(1) + "%, yield " + o.yld.toFixed(1) + "%" }
  }));
  // Leases expiring within 24 months (< end of 2027 relative to 2026)
  OBJECTS.filter(o => o.leaseYr <= 2027).forEach(o => items.push({
    lvl: "y", ic: "⏱",
    de: { t: "Mietvertrag läuft aus: " + o.name, s: "Hauptvertrag Ende " + o.leaseYr + " · WAULT " + o.wault.toFixed(1) + " Jahre" },
    en: { t: "Lease expiring: " + o.name, s: "Main lease end " + o.leaseYr + " · WAULT " + o.wault.toFixed(1) + " years" }
  }));
  // High CAPEX need
  OBJECTS.filter(o => o.capex >= 3).forEach(o => items.push({
    lvl: "y", ic: "🔧",
    de: { t: "CAPEX-Bedarf: " + o.name, s: "Geschätzt CHF " + o.capex.toFixed(1) + " Mio über 3 Jahre" },
    en: { t: "CAPEX need: " + o.name, s: "Estimated CHF " + o.capex.toFixed(1) + "m over 3 years" }
  }));
  // Poor ESG rating
  OBJECTS.filter(o => o.esg === "D").forEach(o => items.push({
    lvl: "b", ic: "🌱",
    de: { t: "ESG-Rating D: " + o.name, s: "THG-Intensität " + o.co2 + " kg CO₂e/m² · Sanierungsprüfung empfohlen" },
    en: { t: "ESG rating D: " + o.name, s: "GHG intensity " + o.co2 + " kg CO₂e/m² · refurbishment review advised" }
  }));
  return items;
}
function renderTodos() {
  const el = document.getElementById("todoList");
  if (!el) return;
  const items = computeTodos();
  const order = { r: 0, y: 1, b: 2 };
  items.sort((a, b) => order[a.lvl] - order[b.lvl]);
  el.innerHTML = items.map(it => {
    const c = LANG === "en" ? it.en : it.de;
    return `<div class="todo-item"><div class="ti-ic ${it.lvl}">${it.ic}</div><div><div class="ti-t">${c.t}</div><div class="ti-s">${c.s}</div></div></div>`;
  }).join("");
}

/* --- Reporting export (mock buttons + toast) --- */
const EXPORTS = [
  { de: "Reporting Q2 exportieren", en: "Export Q2 reporting", ic: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M9 15h6M9 11h2"/>' },
  { de: "Stiftungsratsfähiger PDF-Export", en: "Board-ready PDF export", ic: '<path d="M12 15V3M6 9l6 6 6-6M4 21h16"/>' },
  { de: "AMAS-ESG-Report", en: "AMAS ESG report", ic: '<path d="M11 20A7 7 0 019 6c4-1 8 1 10-3 1 6-1 13-8 15z"/>' },
  { de: "SSREI/GRESB-Datensatz", en: "SSREI/GRESB dataset", ic: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>' }
];
function renderExports() {
  const el = document.getElementById("exportRow");
  if (!el) return;
  el.innerHTML = EXPORTS.map((e, i) =>
    `<button class="export-btn" data-exp="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${e.ic}</svg>${LANG === "en" ? e.en : e.de}</button>`).join("");
  el.querySelectorAll(".export-btn").forEach(b => b.addEventListener("click", () => {
    const e = EXPORTS[+b.dataset.exp];
    showToast((LANG === "en" ? "Demo: “" + e.en + "” would be generated now." : "Demo: „" + e.de + "“ würde jetzt erstellt."));
  }));
}
let toastTimer = null;
function showToast(msg) {
  let t = document.getElementById("exportToast");
  if (!t) { t = document.createElement("div"); t.id = "exportToast"; t.className = "export-toast"; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
}

/* --- ESG / CO2 Absenkpfad --- */
function renderEsg() {
  const stats = document.getElementById("esgStats");
  if (!stats) return;
  const reduction = ((CO2_TARGET_PATH[0] - CO2_NOW) / CO2_TARGET_PATH[0] * 100);
  stats.innerHTML = `
    <div class="esg-stat"><div class="lab">${LANG==="en"?"Current GHG intensity":"Aktuelle THG-Intensität"}</div><div class="val">${CO2_NOW.toFixed(1)} <small>kg CO₂e/m²</small></div></div>
    <div class="esg-stat"><div class="lab">${LANG==="en"?"Target 2050":"Ziel 2050"}</div><div class="val">${CO2_TARGET_2050.toFixed(1)} <small>kg CO₂e/m²</small></div></div>
    <div class="esg-stat"><div class="lab">${LANG==="en"?"On path":"Auf Zielpfad"}</div><div class="val" style="color:var(--pos)">${LANG==="en"?"Yes":"Ja"}</div></div>`;

  const svg = document.getElementById("esgChart");
  const W = 640, H = 210, padB = 22, padT = 12, padL = 8;
  const allYears = CO2_PATH_YEARS;
  const x = yr => padL + ((yr - allYears[0]) / (allYears[allYears.length-1] - allYears[0])) * (W - padL);
  const maxV = 22;
  const y = v => padT + (H - padB - padT) * (1 - v / maxV);
  const target = CO2_PATH_YEARS.map((yr, i) => `${i?"L":"M"}${x(yr).toFixed(1)} ${y(CO2_TARGET_PATH[i]).toFixed(1)}`).join(" ");
  const actualYears = [2024, 2026];
  const actual = actualYears.map((yr, i) => `${i?"L":"M"}${x(yr).toFixed(1)} ${y(CO2_ACTUAL_PATH[i]).toFixed(1)}`).join(" ");
  const xlabels = allYears.map(yr => `<text x="${x(yr).toFixed(1)}" y="${H-6}" fill="var(--ink-3)" font-size="10" text-anchor="middle">${yr}</text>`).join("");
  svg.innerHTML = `
    <line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${W}" y2="${y(0).toFixed(1)}" stroke="var(--border)" stroke-width="1"/>
    <path d="${target}" fill="none" stroke="var(--pos)" stroke-width="2" stroke-dasharray="5 4" stroke-linecap="round"/>
    <path d="${actual}" fill="none" stroke="var(--gold-deep)" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="${x(2026).toFixed(1)}" cy="${y(CO2_ACTUAL_PATH[1]).toFixed(1)}" r="4" fill="var(--gold-deep)"/>
    <text x="${x(2026).toFixed(1)}" y="${(y(CO2_ACTUAL_PATH[1])-9).toFixed(1)}" fill="var(--ink-2)" font-size="10" text-anchor="middle">${LANG==="en"?"today":"heute"}</text>
    ${xlabels}
    <text x="${(W-6)}" y="${(y(CO2_TARGET_PATH[6])-6).toFixed(1)}" fill="var(--pos)" font-size="10" text-anchor="end">${LANG==="en"?"Net-Zero-aligned path":"Netto-Null-Pfad"}</text>`;
}

/* --- Lease expiry / WAULT --- */
function renderLease() {
  const el = document.getElementById("leaseList");
  if (!el) return;
  // portfolio WAULT = value-weighted average
  const totalVal = OBJECTS.reduce((s, o) => s + o.val, 0);
  const waultW = OBJECTS.reduce((s, o) => s + o.wault * o.val, 0) / totalVal;
  const hint = document.getElementById("waultHint");
  if (hint) hint.textContent = (LANG==="en"?"Portfolio WAULT ":"Portfolio-WAULT ") + waultW.toFixed(1) + (LANG==="en"?" yrs":" J.");
  const maxW = 8; // scale full bar to 8 yrs
  const sorted = OBJECTS.slice().sort((a, b) => a.wault - b.wault);
  el.innerHTML = sorted.map(o => {
    const pct = Math.min(100, (o.wault / maxW) * 100);
    const soon = o.wault < 2.5;
    return `<div class="lease-row">
      <div class="lr-top"><span class="lr-name">${o.name}</span><span class="lr-yr">${LANG==="en"?"exp. ":"Ende "}${o.leaseYr} · ${o.wault.toFixed(1)} ${LANG==="en"?"yrs":"J."}</span></div>
      <div class="lease-track"><div class="lease-fill ${soon?"soon":""}" style="width:${pct}%"></div></div>
    </div>`;
  }).join("");
}

/* --- TER / cost transparency --- */
function renderTer() {
  const el = document.getElementById("terGrid");
  if (!el) return;
  const total = TER.reduce((s, t) => s + t.bps, 0);
  const maxBps = Math.max(...TER.map(t => t.bps));
  el.innerHTML = TER.map(t =>
    `<div class="ter-row">
      <div class="tr-top"><span class="tr-name">${LANG==="en"?t.keyEn:t.key}</span><span class="tr-val">${t.bps} bps</span></div>
      <div class="ter-track"><div class="ter-fill" style="width:${(t.bps/maxBps*100).toFixed(0)}%;background:${t.color}"></div></div>
    </div>`).join("") +
    `<div class="ter-total"><span class="lab">TER<sub>ISA</sub> ${LANG==="en"?"total":"gesamt"}</span><span class="num">${(total/100).toFixed(2)}%<span style="font-size:0.6em;color:var(--ink-3)"> · ${total} bps</span></span></div>`;
}

/* --- Vacancy trend (portfolio, value-weighted) --- */
function portfolioVacancyByMonth() {
  const totalVal = OBJECTS.reduce((s, o) => s + o.val, 0);
  const out = [];
  for (let m = 0; m < 12; m++) {
    let w = 0;
    OBJECTS.forEach(o => { w += o.vacHist[m] * o.val; });
    out.push(w / totalVal);
  }
  return out;
}
function renderVacTrend() {
  const svg = document.getElementById("vacChart");
  if (!svg) return;
  const data = portfolioVacancyByMonth();
  const W = 640, H = 200, padB = 22, padT = 12;
  const max = Math.max(...data) * 1.25, min = 0;
  const x = i => (i / (data.length - 1)) * W;
  const y = v => padT + (H - padB - padT) * (1 - (v - min) / (max - min));
  const line = data.map((v, i) => `${i?"L":"M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${W} ${H-padB} L0 ${H-padB} Z`;
  const labels = (LANG === "en" ? MONTHS_EN : MONTHS);
  const xlabels = labels.map((m, i) => (i % 2 === 0) ? `<text x="${x(i).toFixed(1)}" y="${H-6}" fill="var(--ink-3)" font-size="9" text-anchor="middle">${m}</text>` : "").join("");
  const dots = data.map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="2.2" fill="var(--neg)"/>`).join("");
  svg.innerHTML = `
    <defs><linearGradient id="gvac" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="var(--neg)" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="var(--neg)" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#gvac)"/>
    <path d="${line}" fill="none" stroke="var(--neg)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${dots}${xlabels}
    <text x="4" y="${(y(data[0])-6).toFixed(1)}" fill="var(--ink-3)" font-size="9">${data[0].toFixed(1)}%</text>
    <text x="${(W-4)}" y="${(y(data[11])-6).toFixed(1)}" fill="var(--neg)" font-size="9" text-anchor="end">${data[11].toFixed(1)}%</text>`;
}

/* =========================================================================
   ASK PROPTIVA — deterministic mock assistant
   ========================================================================= */
const AI_CHIPS = [
  { de: "Auswertung Leerstand im letzten Jahr", en: "Vacancy analysis over the last year", intent: "vacancy" },
  { de: "Welche Objekte brauchen CAPEX?", en: "Which assets need CAPEX?", intent: "capex" },
  { de: "Wie hat sich mein Portfoliowert entwickelt?", en: "How has my portfolio value developed?", intent: "value" },
  { de: "Wo stehe ich beim CO₂-Absenkpfad?", en: "Where do I stand on the CO₂ path?", intent: "co2" },
  { de: "Welche Mietverträge laufen bald aus?", en: "Which leases expire soon?", intent: "lease" },
  { de: "Top- und Flop-Objekte nach Rendite", en: "Top and bottom assets by yield", intent: "yield" }
];
let lastQuery = null;

function renderAiChips() {
  const el = document.getElementById("aiChips");
  if (!el) return;
  el.innerHTML = AI_CHIPS.map((c, i) => `<button class="chip-q" data-chip="${i}">${LANG==="en"?c.en:c.de}</button>`).join("");
  el.querySelectorAll(".chip-q").forEach(b => b.addEventListener("click", () => {
    const c = AI_CHIPS[+b.dataset.chip];
    const q = LANG === "en" ? c.en : c.de;
    document.getElementById("askInput").value = q;
    runAssistant(q);
  }));
}

/* Intent matching by keywords (DE + EN) */
function matchIntent(qRaw) {
  const q = qRaw.toLowerCase();
  const has = (...ws) => ws.some(w => q.includes(w));
  if (has("leerstand", "vacancy", "vermietung", "occupancy")) return "vacancy";
  if (has("capex", "sanier", "investition", "renovat", "refurbish")) return "capex";
  if (has("co2", "co₂", "esg", "absenk", "net-zero", "netto-null", "thg", "emission", "nachhaltig", "ghg")) return "co2";
  if (has("wert", "value", "entwick", "portfoliowert", "develop", "trend")) return "value";
  if (has("mietvertrag", "mietvertr", "wault", "lease", "restlaufzeit", "auslauf", "expir")) return "lease";
  if (has("rendite", "yield", "top", "flop", "beste", "schlecht", "bottom", "best", "worst")) return "yield";
  if (has("ter", "kosten", "cost", "gesamtkosten", "gebühr", "fee")) return "ter";
  return null;
}

/* Build the answer object {text, viz} for an intent */
function buildAnswer(intent) {
  const en = LANG === "en";
  const totalVal = OBJECTS.reduce((s, o) => s + o.val, 0);

  if (intent === "vacancy") {
    const series = portfolioVacancyByMonth();
    const start = series[0], end = series[11];
    const delta = end - start;
    // drivers: objects with biggest vacancy increase
    const drivers = OBJECTS.map(o => ({ o, d: o.vacHist[11] - o.vacHist[0] }))
      .sort((a, b) => b.d - a.d).slice(0, 3);
    const text = en
      ? `Over the last 12 months portfolio vacancy moved from <strong>${start.toFixed(1)}%</strong> to <strong>${end.toFixed(1)}%</strong> (value-weighted), ${delta>=0?"an increase":"a decrease"} of <strong>${Math.abs(delta).toFixed(1)} pp</strong>. The trend is driven mainly by <strong>${drivers[0].o.name}</strong> (${drivers[0].o.loc}), ${drivers[0].d>=0?"+":""}${drivers[0].d.toFixed(1)} pp. The residential Zürich assets remain near full occupancy.`
      : `In den letzten 12 Monaten bewegte sich der Leerstand von <strong>${start.toFixed(1)}%</strong> auf <strong>${end.toFixed(1)}%</strong> (wertgewichtet), ${delta>=0?"ein Anstieg":"ein Rückgang"} von <strong>${Math.abs(delta).toFixed(1)} pp</strong>. Getrieben wird der Verlauf vor allem durch <strong>${drivers[0].o.name}</strong> (${drivers[0].o.loc}), ${drivers[0].d>=0?"+":""}${drivers[0].d.toFixed(1)} pp. Die Wohnobjekte in Zürich bleiben nahezu voll vermietet.`;
    const viz = sparkline(series, "var(--neg)", en?"Vacancy (portfolio)":"Leerstand (Portfolio)", "%") +
      miniTable(
        [en?"Asset":"Objekt", en?"Start":"Start", en?"Now":"Aktuell", "Δ pp"],
        drivers.map(d => [d.o.name, d.o.vacHist[0].toFixed(1)+"%", d.o.vacHist[11].toFixed(1)+"%", (d.d>=0?"+":"")+d.d.toFixed(1)]),
        [0,1,1,1]);
    return { text, viz };
  }

  if (intent === "capex") {
    const list = OBJECTS.filter(o => o.capex >= 0.5).sort((a, b) => b.capex - a.capex);
    const sum = OBJECTS.reduce((s, o) => s + o.capex, 0);
    const text = en
      ? `Estimated CAPEX need across the portfolio is <strong>CHF ${sum.toFixed(1)}m</strong> over the next three years. The largest items are <strong>${list[0].name}</strong> (CHF ${list[0].capex.toFixed(1)}m) and <strong>${list[1].name}</strong> (CHF ${list[1].capex.toFixed(1)}m), both linked to weaker ESG ratings.`
      : `Der geschätzte CAPEX-Bedarf im Portfolio beträgt <strong>CHF ${sum.toFixed(1)} Mio</strong> über die nächsten drei Jahre. Die grössten Posten sind <strong>${list[0].name}</strong> (CHF ${list[0].capex.toFixed(1)} Mio) und <strong>${list[1].name}</strong> (CHF ${list[1].capex.toFixed(1)} Mio), beide mit schwächerem ESG-Rating.`;
    const viz = miniTable(
      [en?"Asset":"Objekt", "ESG", en?"CAPEX 3y":"CAPEX 3J"],
      list.map(o => [o.name, o.esg, "CHF "+o.capex.toFixed(1)+" Mio"]),
      [0,0,1]);
    return { text, viz };
  }

  if (intent === "value") {
    const start = SERIES_12[0], end = SERIES_12[11];
    const g = ((end - start) / start) * 100;
    const text = en
      ? `Portfolio value rose from <strong>CHF ${(start/1000).toFixed(2)}bn</strong> to <strong>CHF ${(end/1000).toFixed(2)}bn</strong> over the last 12 months — a gain of <strong>+${g.toFixed(1)}%</strong>. Growth came from stable rental income and modest revaluation; the trajectory has been steady with a brief dip in mid-period.`
      : `Der Portfoliowert stieg in den letzten 12 Monaten von <strong>CHF ${(start/1000).toFixed(2)} Mrd</strong> auf <strong>CHF ${(end/1000).toFixed(2)} Mrd</strong> — ein Zuwachs von <strong>+${g.toFixed(1)}%</strong>. Treiber sind stabile Mieterträge und moderate Aufwertung; der Verlauf ist stetig mit einer kurzen Delle zur Jahresmitte.`;
    const viz = sparkline(SERIES_12.map(v => v/1000), "var(--gold-deep)", en?"Portfolio value":"Portfoliowert", " Mrd");
    return { text, viz };
  }

  if (intent === "co2") {
    const red = ((CO2_TARGET_PATH[0] - CO2_NOW) / CO2_TARGET_PATH[0] * 100);
    const worst = OBJECTS.slice().sort((a, b) => b.co2 - a.co2)[0];
    const text = en
      ? `Current weighted GHG intensity is <strong>${CO2_NOW.toFixed(1)} kg CO₂e/m²</strong>, roughly <strong>${red.toFixed(0)}%</strong> below the 2024 baseline and on the AMAS-style reduction path toward the <strong>${CO2_TARGET_2050.toFixed(1)} kg</strong> Net-Zero 2050 target. The main outlier is <strong>${worst.name}</strong> at ${worst.co2} kg (rating ${worst.esg}), which warrants a refurbishment review.`
      : `Die gewichtete THG-Intensität liegt aktuell bei <strong>${CO2_NOW.toFixed(1)} kg CO₂e/m²</strong>, rund <strong>${red.toFixed(0)}%</strong> unter dem Basiswert 2024 und auf dem AMAS-orientierten Absenkpfad Richtung Netto-Null-Ziel <strong>${CO2_TARGET_2050.toFixed(1)} kg</strong> bis 2050. Grösster Ausreisser ist <strong>${worst.name}</strong> mit ${worst.co2} kg (Rating ${worst.esg}) — eine Sanierungsprüfung ist angezeigt.`;
    const viz = sparkline(CO2_TARGET_PATH, "var(--pos)", en?"Target path to 2050":"Zielpfad bis 2050", " kg");
    return { text, viz };
  }

  if (intent === "lease") {
    const soon = OBJECTS.filter(o => o.leaseYr <= 2028).sort((a, b) => a.leaseYr - b.leaseYr);
    const waultW = OBJECTS.reduce((s, o) => s + o.wault * o.val, 0) / totalVal;
    const text = en
      ? `Portfolio WAULT (value-weighted) is <strong>${waultW.toFixed(1)} years</strong>. <strong>${soon.length}</strong> assets have main leases expiring by 2028 — most urgent is <strong>${soon[0].name}</strong> (${soon[0].leaseYr}, WAULT ${soon[0].wault.toFixed(1)} yrs). Early re-letting talks are advisable to protect income.`
      : `Der wertgewichtete Portfolio-WAULT beträgt <strong>${waultW.toFixed(1)} Jahre</strong>. Bei <strong>${soon.length}</strong> Objekten laufen Hauptverträge bis 2028 aus — am dringendsten <strong>${soon[0].name}</strong> (${soon[0].leaseYr}, WAULT ${soon[0].wault.toFixed(1)} J.). Frühzeitige Anschlussvermietung ist ratsam, um die Erträge zu sichern.`;
    const viz = miniTable(
      [en?"Asset":"Objekt", en?"Expiry":"Auslauf", "WAULT"],
      soon.map(o => [o.name, String(o.leaseYr), o.wault.toFixed(1)+(en?" yrs":" J.")]),
      [0,1,1]);
    return { text, viz };
  }

  if (intent === "yield") {
    const sorted = OBJECTS.slice().sort((a, b) => b.yld - a.yld);
    const top = sorted.slice(0, 3), flop = sorted.slice(-3).reverse();
    const text = en
      ? `Best performer by net yield is <strong>${top[0].name}</strong> at <strong>${top[0].yld.toFixed(1)}%</strong>; the weakest is <strong>${flop[0].name}</strong> at <strong>${flop[0].yld.toFixed(1)}%</strong>, dragged down by high vacancy and a poor ESG rating.`
      : `Spitzenreiter nach Netto-Rendite ist <strong>${top[0].name}</strong> mit <strong>${top[0].yld.toFixed(1)}%</strong>; das Schlusslicht ist <strong>${flop[0].name}</strong> mit <strong>${flop[0].yld.toFixed(1)}%</strong>, belastet durch hohen Leerstand und schwaches ESG-Rating.`;
    const viz = miniTable(
      ["", en?"Asset":"Objekt", en?"Yield":"Rendite"],
      top.map((o, i) => ["🔼", o.name, o.yld.toFixed(1)+"%"]).concat(flop.slice(0,2).map(o => ["🔽", o.name, o.yld.toFixed(1)+"%"])),
      [0,0,1]);
    return { text, viz };
  }

  if (intent === "ter") {
    const total = TER.reduce((s, t) => s + t.bps, 0);
    const text = en
      ? `The all-in TER_ISA is <strong>${(total/100).toFixed(2)}%</strong> (${total} bps of GAV). The largest component is management at ${TER[0].bps} bps, followed by property management at ${TER[1].bps} bps — competitive for a portfolio of this size.`
      : `Die Gesamtkostenquote TER_ISA beträgt <strong>${(total/100).toFixed(2)}%</strong> (${total} bps des GAV). Grösster Posten ist die Verwaltung mit ${TER[0].bps} bps, gefolgt von der Bewirtschaftung mit ${TER[1].bps} bps — für ein Portfolio dieser Grösse wettbewerbsfähig.`;
    const viz = miniTable(
      [en?"Component":"Komponente", "bps"],
      TER.map(t => [en?t.keyEn:t.key, String(t.bps)]).concat([[en?"Total":"Gesamt", String(total)]]),
      [0,1]);
    return { text, viz };
  }

  return null;
}

/* Inline SVG sparkline for answers */
function sparkline(data, color, caption, unit) {
  const W = 560, H = 90, pad = 8;
  const min = Math.min(...data), max = Math.max(...data);
  const range = (max - min) || 1;
  const x = i => pad + (i / (data.length - 1)) * (W - pad * 2);
  const y = v => pad + (H - pad * 2) * (1 - (v - min) / range);
  const line = data.map((v, i) => `${i?"L":"M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const dots = `<circle cx="${x(0).toFixed(1)}" cy="${y(data[0]).toFixed(1)}" r="3" fill="${color}"/><circle cx="${x(data.length-1).toFixed(1)}" cy="${y(data[data.length-1]).toFixed(1)}" r="3" fill="${color}"/>`;
  return `<div class="a-viz">
    <div style="font-size:0.76rem;color:var(--ink-3);margin-bottom:6px">${caption}</div>
    <svg class="a-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="height:90px">
      <path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${dots}
      <text x="${pad}" y="${(y(data[0])-7).toFixed(1)}" fill="var(--ink-2)" font-size="10">${data[0].toFixed(data[0]<10?2:1)}${unit}</text>
      <text x="${(W-pad).toFixed(1)}" y="${(y(data[data.length-1])-7).toFixed(1)}" fill="${color}" font-size="10" text-anchor="end">${data[data.length-1].toFixed(data[data.length-1]<10?2:1)}${unit}</text>
    </svg></div>`;
}
function miniTable(headers, rows, numCols) {
  const th = headers.map((h, i) => `<th class="${numCols[i]?"num":""}">${h}</th>`).join("");
  const tr = rows.map(r => "<tr>" + r.map((c, i) => `<td class="${numCols[i]?"num":""}">${c}</td>`).join("") + "</tr>").join("");
  return `<div class="a-viz"><table class="mini-tbl"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

function runAssistant(query, silent) {
  lastQuery = query;
  const out = document.getElementById("aiAnswer");
  if (!out) return;
  const en = LANG === "en";
  const intent = matchIntent(query);
  const render = () => {
    if (!intent) {
      out.innerHTML = `<div class="answer">
        <div class="q-echo">${tr("ai.you","Ihre Frage:")} <b>${escapeHtml(query)}</b></div>
        <div class="a-text">${tr("ai.fallback", "Ich konnte die Frage den Demo-Daten nicht eindeutig zuordnen. Probieren Sie eine der Beispielfragen oben — etwa zu Leerstand, Rendite, CAPEX, CO₂/ESG, Portfoliowert oder Mietvertrags-Ausläufen.")}</div>
      </div>`;
      return;
    }
    const ans = buildAnswer(intent);
    out.innerHTML = `<div class="answer">
      <div class="q-echo">${tr("ai.you","Ihre Frage:")} <b>${escapeHtml(query)}</b></div>
      <div class="a-text">${ans.text}</div>
      ${ans.viz || ""}
      <div class="q-echo" style="margin-top:12px;margin-bottom:0">${tr("ai.foot","Berechnet aus dem Demo-Datenmodell · keine Anlageberatung.")}</div>
    </div>`;
  };
  if (silent) { render(); return; }
  // brief "thinking" state
  out.innerHTML = `<div class="answer"><div class="thinking">${tr("ai.thinking","Analysiere Ihre Portfoliodaten")}<span class="dots-anim"><i></i><i></i><i></i></span></div></div>`;
  clearTimeout(runAssistant._t);
  runAssistant._t = setTimeout(render, 650);
}
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function initAssistant() {
  renderAiChips();
  const form = document.getElementById("askForm");
  if (!form) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = document.getElementById("askInput").value.trim();
    if (v) runAssistant(v);
  });
}

/* ---------- Video modal ---------- */
function openModal(obj) {
  const m = document.getElementById("videoModal");
  document.getElementById("modalTitle").textContent = (LANG === "en" ? "Inspection · " : "Begehung · ") + obj.name + ", " + obj.loc;
  m.classList.add("open");
}
function initModal() {
  const m = document.getElementById("videoModal");
  document.getElementById("modalClose").addEventListener("click", () => m.classList.remove("open"));
  m.addEventListener("click", (e) => { if (e.target === m) m.classList.remove("open"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") m.classList.remove("open"); });
}

/* ---------- Mobile sidebar drawer ---------- */
function initDrawer() {
  const burger = document.getElementById("dashBurger");
  const side = document.querySelector(".side");
  const ov = document.getElementById("sideOverlay");
  if (!burger || !side || !ov) return;
  const set = (open) => { side.classList.toggle("open", open); ov.classList.toggle("show", open); };
  burger.addEventListener("click", () => set(!side.classList.contains("open")));
  ov.addEventListener("click", () => set(false));
  side.querySelectorAll(".side-link, .side-foot a").forEach(a => a.addEventListener("click", () => set(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
}

/* ---------- Range toggle ---------- */
function initRange() {
  document.getElementById("rangeToggle").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document.querySelectorAll("#rangeToggle button").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    currentRange = +b.dataset.range;
    renderChart(currentRange);
  });
}

/* ---------- Live tick (subtle KPI movement, bounded) ---------- */
function initLiveTick() {
  const el = document.getElementById("kpiValue");
  if (!el) return;
  const center = 1413.0;
  let t = 0;
  el.textContent = "CHF " + (center / 1000).toFixed(2) + " Mrd";
  setInterval(() => {
    t += 0.6;
    const v = center + Math.sin(t) * 1.4 + Math.sin(t * 0.37) * 0.8; // bounded drift ±~2 Mio
    el.textContent = "CHF " + (v / 1000).toFixed(2) + " Mrd";
  }, 3000);
}

/* ---------- Keyframes injected (donut fade + line draw) ---------- */
(function kf() {
  const s = document.createElement("style");
  s.textContent = "@keyframes fadeSeg{to{opacity:1}}@keyframes draw{to{stroke-dashoffset:0}}";
  document.head.appendChild(s);
})();

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initI18n();
  let saved = "de";
  try { saved = localStorage.getItem("proptiva_lang") || "de"; } catch (e) {}

  renderChart(12);
  renderDonut();
  renderObjects();
  renderBars();
  renderMap();
  renderCalc();
  renderTodos();
  renderExports();
  renderEsg();
  renderLease();
  renderTer();
  renderVacTrend();
  initAssistant();
  initRange();
  initModal();
  initDrawer();
  initLiveTick();

  ["rent", "vac", "capex", "rate"].forEach(id =>
    document.getElementById(id).addEventListener("input", renderCalc));

  document.getElementById("langToggle").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) applyLang(b.dataset.lang);
  });

  applyLang(saved);
});
