(function(){
"use strict";
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
var isTouch=matchMedia("(hover: none)").matches;
var html=document.documentElement;
html.classList.remove("pre");

/* ---------- i18n (DE im HTML, EN-Overrides, Fallback DE) ---------- */
var I18N={
 "brand.sub":"by Heimyo · Zurich",
 "nav.platform":"Portfolio Cockpit","nav.capabilities":"Capabilities","nav.compare":"Comparison","nav.onboarding":"Process","nav.cta":"Request demo",
 "hero.badge":"For pension funds, investment foundations, funds & family offices",
 "hero.title.1":"Your real estate portfolio —","hero.title.2":"ready for the boardroom.",
 "hero.lead":"A live cockpit for your boards, on-site video at every inspection, and reporting that connects to TER, AMAS and SSREI standards. A managed mandate, not software. From Zurich, for Switzerland.",
 "hero.cta.primary":"Demo for your portfolio","hero.cta.secondary":"View the cockpit",
 "hero.m1":"live access for your boards","hero.m2":"digitally documented & auditable","hero.m3":"video at every on-site inspection","hero.m4":"months to go-live",
 "trust.label":"Built for the requirements of",
 "plat.eyebrow":"The Portfolio Manager","plat.lead":"Live metrics, properties with risk and inspection status, on-site videos and reporting at the click of a button. Filter by region — everything recalculates instantly.","plat.cta":"Open the full interactive version",
 "pm.view.board":"Board view","pm.view.asset":"Asset view","pm.health":"Portfolio Health Score","pm.health.d":"Weighted from yield, vacancy, maintenance & ESG.","pm.chart":"Vacancy rate · 12 months","pm.t.obj":"Property","pm.t.reg":"Region","pm.t.vac":"Vac.","pm.t.visit":"Inspection","pm.export":"Reporting · PDF / CSV / API","pm.vid":"Inspection: Zurich West · 01.07.2026","pm.rep1":"Board report","pm.rep2":"Cost transparency","pm.rep3":"ESG / CO₂ pathway",
 "cap.eyebrow":"Capabilities","cap.lead":"A live dashboard alone is not enough. Institutional portfolios need auditability, expertise and a view of the real substance.",
 "cap.c1.tag":"Governance","cap.c1.title":"A live cockpit for your boards","cap.c1.text":"Role-based access for the board of trustees, investment and property committees. Your boards demonstrably fulfil their non-delegable oversight duty — at any time.",
 "cap.c2.tag":"Substance","cap.c2.title":"On-site video at every inspection","cap.c2.text":"Every inspection produces a video linked to the property. You see the real condition of your substance — not just a metric.",
 "cap.c3.tag":"Self-service","cap.c3.title":"Run your own scenarios","cap.c3.text":"Target yield, vacancy, rent trends, capex — within the managed mandate, not software you run yourself. Answers in seconds.",
 "cap.c4.tag":"Costs","cap.c4.title":"Cost transparency in your language","cap.c4.text":"Benchmarkable cost disclosure, compatible with TER_ISA and TER_REF — the cost transparency ratio for the notes to your annual accounts.",
 "cap.c5.tag":"ESG & climate","cap.c5.title":"CO₂ reduction pathway per property","cap.c5.text":"AMAS metrics (mandatory since 31.12.2024), a pathway toward net-zero 2050 — investment cost vs. CO₂ savings, SSREI/GRESB-ready.",
 "cap.c6.tag":"Centre of excellence","cap.c6.title":"Specialist expertise for institutions","cap.c6.text":"A dedicated team for institutional portfolios only — valuation, law, capex, ESG. Digital collaboration via API and export, not e-mail attachments.",
 "cmp.eyebrow":"Direct comparison","cmp.lead":"Some providers are more digital — the combination of managed mandate, live cockpit and on-site video rarely is.",
 "cmp.h1":"Criterion","cmp.h2":"Classic management",
 "cmp.r1":"Board access","cmp.r1a":"Quarterly PDF report","cmp.r1b":"Role-based, live, 24/7",
 "cmp.r2":"Own scenarios","cmp.r2a":"Request by e-mail, days later","cmp.r2b":"Self-service within the mandate",
 "cmp.r3":"Condition of substance","cmp.r3a":"Text report, rarely current","cmp.r3b":"Video at every inspection",
 "cmp.r4":"Cost disclosure","cmp.r4a":"inconsistent, hard to compare","cmp.r4b":"TER_ISA / TER_REF-compatible",
 "cmp.r5":"ESG & CO₂","cmp.r5a":"compiled afterwards","cmp.r5b":"integrated, AMAS/SSREI-ready",
 "cmp.r6":"Institutional expertise","cmp.r6a":"runs on the side","cmp.r6b":"dedicated centre of excellence",
 "vid.eyebrow":"On site. For you.","vid.title":"See the substance, not just the number","vid.lead":"Metrics show performance — not the condition of the roof. At every inspection we film the property: façade, technical systems, critical points. Linked directly in the cockpit, with timestamp and history.",
 "vid.p1":"Standardised at every inspection","vid.p2":"Linked to the property in the system","vid.p3":"Timestamp & history per property","vid.caption":"Inspection 01.07.2026","vid.ca1":"Façade · intact","vid.ca2":"Technical · service due","vid.ca3":"Roof · checked",
 "sys.eyebrow":"System & integrations","int.lead":"Proptiva doesn't replace what works — we consolidate your data sources. Via interfaces and imports, management, valuation, payments and ESG data flow into one cockpit.",
 "sys.in1":"Leases & property data","sys.in2":"Valuations & target yield","sys.in3":"Inspection videos","sys.in4":"Receipts & ESG data","sys.core.p":"Centre of excellence + platform",
 "sys.out1":"Live cockpit for boards","sys.out2":"Scenarios & target yield","sys.out3":"TER/AMAS/SSREI reporting","sys.out4":"Decisions in real time",
 "int.c1.cat":"Management & ERP","int.c1.t":"Property, contract & accounting data","int.c2.cat":"Valuation & market data","int.c2.t":"Market values & benchmarks","int.c3.cat":"Banking & payments","int.c3.t":"Rents & payment reconciliation","int.c4.cat":"ESG & energy","int.c4.t":"CO₂, energy & sustainability","int.c5.cat":"Documents & communication","int.c5.t":"Receipts, contracts & portals","int.c6.cat":"Reporting & consolidation","int.c6.t":"Export into your asset accounts",
 "int.note":"System not listed? We connect additional sources via API or import.",
 "why.eyebrow":"Why now","why.1.n":"Required","why.1.l":"AMAS ESG metrics in annual reports since 31.12.2024","why.2.l":"BVG: non-delegable oversight duty of the board","why.3.l":"GHG by 2030 as a step toward net-zero 2050","why.4.n":"Criterion","why.4.l":"Digital collaboration as a mandate requirement",
 "onb.eyebrow":"The process","onb.d1":"Week 1–2","onb.s1.t":"Portfolio analysis","onb.s1.p":"We capture properties, contracts and metrics and assess the optimisation potential.","onb.d2":"Week 2–5","onb.s2.t":"Digitalisation","onb.s2.p":"Your data moves into the cockpit in structured form — incl. documents and history.","onb.d3":"Week 5–7","onb.s3.t":"Live access","onb.s3.p":"Your boards receive role-based access with live metrics and videos.","onb.d4":"From week 8","onb.s4.t":"Ongoing management","onb.s4.p":"The centre of excellence manages, documents by video and optimises continuously.",
 "net.eyebrow":"Regional presence","net.lead":"Proptiva is part of the Heimyo network. Regional partners ensure local presence — the basis for inspecting and filming every property in person.","net.p1.r":"Schaffhausen","net.p2.r":"Lucerne & Central Switzerland","net.p3.r":"Winterthur & Zurich","net.p4.r":"Thurgau & St. Gallen",
 "ex.eyebrow":"Example property","ex.name":"Mixed-use building Seefeld","ex.addr":"Built 1978 · renovated 2021","ex.k1":"Market value","ex.k2":"Net yield","ex.k3":"Occupancy","ex.k4":"Last inspection","ex.cta":"View in the portfolio manager",
 "std.eyebrow":"Standards & security","std.title":"Compatible with the standards your boards review","std.b1":"Information security (targeted)","std.b2":"Cost-transparency compliant","std.b3":"ESG reporting","std.b4":"compatible","std.b5":"Swiss Hosting",
 "cta.eyebrow":"Start without obligation","cta.lead":"A personal demo, 30 minutes. We show the portfolio manager on an example property and discuss what onboarding for your vehicle looks like.","cta.demo":"See the demo first",
 "cta.f.name":"Name","cta.f.org":"Institution","cta.f.email":"E-mail","cta.f.vol":"Portfolio volume","cta.f.submit":"Request demo","cta.f.note":"Reply within 24 h · confidential · Swiss Hosting","cta.ok.t":"Request received.","cta.ok.p":"We will get back to you within 24 hours.",
 "foot.about":"Digital real estate portfolio management for Swiss pension funds and institutional investors. An offering of Heimyo Holding AG.","foot.product":"Platform","foot.demo":"Interactive demo","foot.company":"Company","foot.contact":"Contact","foot.imprint":"Legal notice","foot.privacy":"Privacy"
};
function initI18n(){document.querySelectorAll("[data-i18n]").forEach(function(el){el.dataset.de=el.innerHTML;});}
function setLang(lang){
 html.lang=lang;
 document.querySelectorAll("[data-i18n]").forEach(function(el){var k=el.getAttribute("data-i18n");el.innerHTML=(lang==="en"&&I18N[k]!=null)?I18N[k]:el.dataset.de;});
 document.querySelectorAll("#langToggle button").forEach(function(b){b.classList.toggle("active",b.dataset.lang===lang);});
 try{localStorage.setItem("proptiva_lang",lang);}catch(e){}
}

/* ---------- reveals (rect-based rAF) ---------- */
var revList=[].slice.call(document.querySelectorAll(".reveal"));
document.querySelectorAll(".hero-h").forEach(function(e){setTimeout(function(){e.classList.add("in");},150);});
if(reduce){revList.forEach(function(e){e.classList.add("in");});revList=[];}
function revealCheck(){var vh=innerHeight;for(var i=revList.length-1;i>=0;i--){if(revList[i].getBoundingClientRect().top<vh*0.9){revList[i].classList.add("in");revList.splice(i,1);}}}

/* ---------- counters (rect-based) ---------- */
var countList=[].slice.call(document.querySelectorAll("[data-count]"));
function startCount(el){var t=parseFloat(el.getAttribute("data-count"));if(reduce){el.textContent=t.toLocaleString("de-CH");return;}var st=null;function step(ts){if(!st)st=ts;var p=Math.min((ts-st)/1300,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(t*e).toLocaleString("de-CH");if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);}
function checkCounts(){var vh=innerHeight;for(var i=countList.length-1;i>=0;i--){if(countList[i].getBoundingClientRect().top<vh*0.85){startCount(countList[i]);countList.splice(i,1);}}}
if(reduce){countList.forEach(startCount);countList=[];}

/* ---------- nav + progress + master rAF ---------- */
var nav=document.getElementById("nav"),prog=document.getElementById("progress");
function onScroll(){nav.classList.toggle("solid",scrollY>30);var h=document.body.scrollHeight-innerHeight;prog.style.transform="scaleX("+(h>0?scrollY/h:0)+")";}
onScroll();addEventListener("scroll",onScroll,{passive:true});
(function tick(){onScroll();if(revList.length)revealCheck();if(countList.length)checkCounts();requestAnimationFrame(tick);})();

/* burger */
var burger=document.getElementById("burger"),mm=document.getElementById("mobileMenu");
burger&&burger.addEventListener("click",function(){mm.classList.toggle("open");});
mm&&mm.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){mm.classList.remove("open");});});

/* lang */
var lt=document.getElementById("langToggle");
lt&&lt.addEventListener("click",function(e){var b=e.target.closest("button");if(b)setLang(b.dataset.lang);});

/* cursor + magnetic */
(function(){if(isTouch||reduce)return;var cur=document.getElementById("cur"),dot=document.getElementById("curDot");document.body.classList.add("has-cursor");var cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY;dot.style.transform="translate("+tx+"px,"+ty+"px) translate(-50%,-50%)";});(function loop(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cur.style.transform="translate("+cx+"px,"+cy+"px) translate(-50%,-50%)";requestAnimationFrame(loop);})();document.querySelectorAll("a,button,[data-cursor],.chip").forEach(function(el){el.addEventListener("mouseenter",function(){cur.classList.add("hovering");});el.addEventListener("mouseleave",function(){cur.classList.remove("hovering");});});
 document.querySelectorAll(".magnetic").forEach(function(el){el.addEventListener("mousemove",function(e){var r=el.getBoundingClientRect();el.style.transform="translate("+(e.clientX-r.left-r.width/2)*.3+"px,"+(e.clientY-r.top-r.height/2)*.4+"px)";});el.addEventListener("mouseleave",function(){el.style.transform="";});});
})();

/* ---------- hero canvas: lebende CH-Karte ---------- */
(function(){var cv=document.getElementById("heroCanvas");if(!cv)return;var ctx=cv.getContext("2d"),dpr=Math.min(devicePixelRatio||1,2),W,H,raf;
 var VBW=640,VBH=420,CHel=document.querySelector(".map-country"),pathStr=CHel?CHel.getAttribute("d"):null,path2d=(pathStr&&window.Path2D)?new Path2D(pathStr):null;
 var CITY=[[362,99],[216,183],[235,64],[41,329],[106,267],[331,163],[474,90],[387,75],[417,368]],HUB=[300,180],sc=1,ox=0,oy=0;
 var packets=CITY.map(function(_,i){return{i:i,t:i/CITY.length,sp:.0016+((i*37)%20)/9000};}),amb=[];
 function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);var mw=(W>820?W*0.58:W*0.9);sc=Math.min(mw/VBW,(H*0.66)/VBH);ox=(W>820?(W-VBW*sc-W*0.05):(W-VBW*sc)/2);oy=(H-VBH*sc)/2+H*0.02;amb=[];for(var i=0;i<20;i++)amb.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.4,vx:(Math.random()-.5)*.07,vy:(Math.random()-.5)*.07,p:Math.random()*6});}
 function T(p){return[ox+p[0]*sc,oy+p[1]*sc];}
 function draw(){ctx.clearRect(0,0,W,H);for(var i=0;i<amb.length;i++){var a=amb[i];a.x+=a.vx;a.y+=a.vy;a.p+=.02;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,7);ctx.fillStyle="rgba(228,196,107,"+(.07+.1*Math.sin(a.p))+")";ctx.fill();}
  if(path2d){ctx.save();ctx.translate(ox,oy);ctx.scale(sc,sc);ctx.fillStyle="rgba(228,196,107,0.028)";ctx.fill(path2d);ctx.lineWidth=1.1/sc;ctx.lineJoin="round";ctx.strokeStyle="rgba(228,196,107,0.22)";ctx.stroke(path2d);ctx.restore();}
  var hb=T(HUB);CITY.forEach(function(c){var p=T(c);ctx.strokeStyle="rgba(228,196,107,.10)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(hb[0],hb[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();});
  packets.forEach(function(pk){pk.t+=pk.sp;if(pk.t>1)pk.t=0;var p=T(CITY[pk.i]),x=hb[0]+(p[0]-hb[0])*pk.t,y=hb[1]+(p[1]-hb[1])*pk.t;ctx.beginPath();ctx.arc(x,y,1.8,0,7);ctx.fillStyle="rgba(228,196,107,.9)";ctx.fill();});
  var tn=performance.now?performance.now():Date.now();CITY.forEach(function(c,i){var p=T(c),tw=.5+.5*Math.sin(tn/700+i);ctx.beginPath();ctx.arc(p[0],p[1],2.2+tw*1.3,0,7);ctx.fillStyle="rgba(228,196,107,"+(.55+tw*.35)+")";ctx.fill();ctx.beginPath();ctx.arc(p[0],p[1],6+tw*5,0,7);ctx.strokeStyle="rgba(228,196,107,"+(.16*(1-tw))+")";ctx.lineWidth=1;ctx.stroke();});
  ctx.beginPath();ctx.arc(hb[0],hb[1],3.5,0,7);ctx.fillStyle="#E4C46B";ctx.fill();ctx.beginPath();ctx.arc(hb[0],hb[1],10,0,7);ctx.strokeStyle="rgba(228,196,107,.4)";ctx.lineWidth=1;ctx.stroke();
  raf=requestAnimationFrame(draw);}
 size();if(reduce){draw();cancelAnimationFrame(raf);return;}draw();addEventListener("resize",function(){size();});
})();

/* ---------- COCKPIT ---------- */
var OBJ=[
 {n:"Seefeld Terrassen",reg:"Zürich",u:1420,v:2.0,y:3.3,s:"gruen",lv:"28.06."},
 {n:"Kreis 5 Höfe",reg:"Zürich",u:1240,v:1.8,y:3.5,s:"gruen",lv:"14.06."},
 {n:"Oerlikon Quartier",reg:"Zürich",u:980,v:2.3,y:3.6,s:"gelb",lv:"02.05."},
 {n:"Wankdorf Wohnen",reg:"Bern",u:1180,v:2.4,y:3.2,s:"gelb",lv:"19.06."},
 {n:"Länggasse Palais",reg:"Bern",u:860,v:1.2,y:3.0,s:"gruen",lv:"21.06."},
 {n:"Breitenrain Karree",reg:"Bern",u:540,v:1.5,y:3.1,s:"gruen",lv:"09.06."},
 {n:"Gundeli Terrassen",reg:"Basel",u:1360,v:3.0,y:3.6,s:"gelb",lv:"11.05."},
 {n:"Klybeck Lofts",reg:"Basel",u:720,v:2.8,y:3.4,s:"gelb",lv:"27.04."},
 {n:"Eaux-Vives Résidence",reg:"Genf",u:940,v:2.0,y:3.1,s:"gruen",lv:"24.06."},
 {n:"Pâquis Höfe",reg:"Genf",u:420,v:1.1,y:2.9,s:"gruen",lv:"16.06."},
 {n:"Ouchy Wohnen",reg:"Waadt",u:900,v:2.5,y:3.7,s:"gelb",lv:"03.06."},
 {n:"Flon Lofts",reg:"Waadt",u:780,v:2.6,y:3.5,s:"rot",lv:"08.04."},
 {n:"Luzern Seehöfe",reg:"Zentralschweiz",u:610,v:0.9,y:2.8,s:"gruen",lv:"29.06."},
 {n:"Zugerberg Résidence",reg:"Zentralschweiz",u:530,v:2.7,y:3.8,s:"rot",lv:"12.04."}
];
var COORD={"Zürich":[362,99],"Bern":[216,183],"Basel":[235,64],"Genf":[41,329],"Waadt":[106,267],"Zentralschweiz":[331,163]};
var REGIONS=["Alle","Zürich","Bern","Basel","Genf","Waadt","Zentralschweiz"];
var TOTAL=OBJ.reduce(function(a,o){return a+o.u;},0),state="Alle",view="gremium";
function sub(){return state==="Alle"?OBJ:OBJ.filter(function(o){return o.reg===state;});}
function agg(l){var u=l.reduce(function(a,o){return a+o.u;},0);var red=l.filter(function(o){return o.s==="rot";}).length;return{u:u,v:l.reduce(function(a,o){return a+o.u*o.v;},0)/u,y:l.reduce(function(a,o){return a+o.u*o.y;},0)/u,c:l.length,red:red};}
function f(n,d){return n.toLocaleString("de-CH",{minimumFractionDigits:d,maximumFractionDigits:d});}
function fi(n){return Math.round(n).toLocaleString("de-CH");}
var chipsEl=document.getElementById("chips");
function renderChips(){if(!chipsEl)return;chipsEl.innerHTML=REGIONS.map(function(r){return '<button class="chip'+(r===state?" active":"")+'" data-reg="'+r+'">'+r+'</button>';}).join("");chipsEl.querySelectorAll(".chip").forEach(function(ch){ch.addEventListener("click",function(){stopDemo();setState(ch.getAttribute("data-reg"));});});}
function kpiC(l,v,d,u,neg){return '<div class="kpi"><div class="lab">'+l+'</div><div class="val"><span class="num">'+v+'</span>'+(u?' <small>'+u+'</small>':'')+'</div><div class="delta'+(neg?' neg':'')+'">'+d+'</div></div>';}
function renderKpi(){var a=agg(sub());var vol=2.40*(a.u/TOTAL);var vs=vol>=1?"CHF "+f(vol,2)+" Mrd.":"CHF "+fi(vol*1000)+" Mio.";var g=document.getElementById("kpiGrid");if(!g)return;
 if(view==="gremium"){g.innerHTML=kpiC("Wohneinheiten",fi(a.u),"+"+fi(a.c)+" Objekte")+kpiC("Leerstandsquote",f(a.v,1),"−0.4 pp ggü. Vj.","%")+kpiC("Nettomietrendite",f(a.y,1),"stabil","%")+kpiC("Portfoliovolumen",vs.replace("CHF ",""),"CHF · +2.3% YTD");}
 else{g.innerHTML=kpiC("Mietinkasso",f(99.2,1),"Ziel ≥ 99 %","%")+kpiC("Ø Reaktionszeit",f(6.4,1),"Instandhaltung","h")+kpiC("Objekte im Risiko",fi(a.red),a.red>0?"Handlungsbedarf":"keine",null,a.red>0)+kpiC("Begehungsquote",f(92,0),"letzte 12 Mte.","%");}
 renderHealth(a);
}
function renderHealth(a){var ring=document.getElementById("healthRing"),sc=document.getElementById("healthScore"),ti=document.getElementById("healthTitle");if(!ring)return;
 var score=Math.round(100-a.v*7-(a.red/Math.max(1,a.c))*22+(a.y-3)*6);score=Math.max(40,Math.min(98,score));
 var C=2*Math.PI*34;ring.style.strokeDasharray=C;ring.style.strokeDashoffset=reduce?C*(1-score/100):C;
 if(!reduce){ring.getBoundingClientRect();ring.style.strokeDashoffset=C*(1-score/100);}
 var start=null;function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/1200,1),e=1-Math.pow(1-p,3);sc.textContent=Math.round(score*e);if(p<1)requestAnimationFrame(step);}
 if(reduce)sc.textContent=score;else requestAnimationFrame(step);
 ti.textContent=score>=88?"exzellent":score>=76?"solide":score>=62?"beobachten":"kritisch";
}
function renderTable(){var l=sub().slice().sort(function(a,b){return b.u-a.u;});var b=document.getElementById("tblBody");if(!b)return;
 b.innerHTML=l.map(function(o){return '<tr><td class="obj">'+o.n+'</td><td>'+o.reg+'</td><td class="num">'+fi(o.u)+'</td><td class="num">'+f(o.v,1)+' %</td><td class="num" style="color:var(--ink-3)">'+o.lv+'</td><td style="text-align:center"><span class="amp '+o.s+'"></span></td></tr>';}).join("");
 document.getElementById("tblCount").textContent=l.length+" von "+OBJ.length+" Objekten";}
function renderMarkers(){var g=document.getElementById("markers");if(!g)return;var cnt={};g.innerHTML=OBJ.map(function(o){var c=COORD[o.reg],idx=(cnt[o.reg]=(cnt[o.reg]||0));cnt[o.reg]++;var r0=idx===0?0:17,ang=idx*2.2,jx=Math.cos(ang)*r0,jy=Math.sin(ang)*r0,on=(state==="Alle"||o.reg===state),col=o.s==="gruen"?"#4FE0A6":o.s==="gelb"?"#F1C15B":"#FF6E7C",rad=Math.max(4,Math.min(12,4+((o.u-420)/1000)*8)),cx=(c[0]+jx).toFixed(1),cy=(c[1]+jy).toFixed(1);return '<g class="mk'+(on?"":" dim")+'"><circle class="mk-ring" style="transform-box:fill-box;transform-origin:center;animation-delay:'+(idx*0.5)+'s" cx="'+cx+'" cy="'+cy+'" r="'+rad.toFixed(1)+'" fill="none" stroke="'+col+'" stroke-width="1.4"/><circle cx="'+cx+'" cy="'+cy+'" r="'+rad.toFixed(1)+'" fill="'+col+'" opacity="0.85"/></g>';}).join("");}
function renderChart(){var svg=document.getElementById("chart"),tip=document.getElementById("chartTip");if(!svg)return;var a=agg(sub()),end=a.v,W=400,Hc=140,pad=14,pts=[];for(var i=0;i<12;i++){var t=i/11;pts.push(Math.max(.4,end+1.7*(1-t)+.28*Math.sin(i*1.7)));}pts[11]=end;var max=Math.max.apply(null,pts)+.5,min=Math.min.apply(null,pts)-.4;function X(i){return pad+(i/11)*(W-pad*2);}function Y(v){return Hc-pad-((v-min)/(max-min))*(Hc-pad*2);}var line="",area="M"+X(0)+" "+Hc;pts.forEach(function(v,i){line+=(i?"L":"M")+X(i)+" "+Y(v)+" ";area+="L"+X(i)+" "+Y(v)+" ";});area+="L"+X(11)+" "+Hc+" Z";var mo=["Aug","Sep","Okt","Nov","Dez","Jan","Feb","Mär","Apr","Mai","Jun","Jul"];
 svg.innerHTML='<defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4C46B" stop-opacity="0.28"/><stop offset="1" stop-color="#E4C46B" stop-opacity="0"/></linearGradient></defs><path d="'+area+'" fill="url(#ga)"/><path d="'+line+'" fill="none" stroke="#E4C46B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cline"/>'+pts.map(function(v,i){return '<circle cx="'+X(i)+'" cy="'+Y(v)+'" r="9" fill="transparent" data-m="'+mo[i]+'" data-v="'+v.toFixed(1)+'"/>';}).join("")+'<circle cx="'+X(11)+'" cy="'+Y(pts[11])+'" r="3.4" fill="#E4C46B"/>';
 var lbl=document.getElementById("chartLabel");if(lbl)lbl.textContent="jetzt "+f(end,1)+" %";
 if(!reduce){var cl=svg.querySelector(".cline");if(cl){var L=cl.getTotalLength();cl.style.strokeDasharray=L;cl.style.strokeDashoffset=L;cl.getBoundingClientRect();cl.style.transition="stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1)";cl.style.strokeDashoffset=0;}}
 svg.querySelectorAll("circle[data-m]").forEach(function(c){c.addEventListener("mouseenter",function(){var r=svg.getBoundingClientRect(),cr=c.getBoundingClientRect();tip.style.left=(cr.left-r.left+cr.width/2)+"px";tip.style.top=(cr.top-r.top)+"px";tip.textContent=c.getAttribute("data-m")+" · "+c.getAttribute("data-v").replace(".",",")+" %";tip.style.opacity=1;});c.addEventListener("mouseleave",function(){tip.style.opacity=0;});});}
function scrambleNums(){if(reduce)return;document.querySelectorAll("#kpiGrid .num").forEach(function(el){var fin=el.textContent,gl="0123456789",fr=0,steps=8;clearInterval(el.__t);el.__t=setInterval(function(){fr++;el.textContent=fin.replace(/[0-9]/g,function(c){return(fr>=steps||Math.random()<fr/steps)?c:gl[(Math.random()*10)|0];});if(fr>=steps){clearInterval(el.__t);el.textContent=fin;}},45);});}
function setState(r){state=r;renderChips();renderKpi();scrambleNums();renderTable();renderMarkers();renderChart();}
var vt=document.getElementById("viewToggle");
vt&&vt.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;view=b.dataset.view;vt.querySelectorAll("button").forEach(function(x){x.classList.toggle("active",x===b);});renderKpi();scrambleNums();});
var demoTimers=[],demoStopped=false;
function stopDemo(){demoStopped=true;demoTimers.forEach(clearTimeout);var dc=document.getElementById("demoCursor");if(dc)dc.style.opacity=0;}
function initDash(){if(!document.getElementById("dash"))return;renderChips();renderKpi();renderTable();renderMarkers();renderChart();
 if(reduce||isTouch)return;var dash=document.getElementById("dash"),dc=document.getElementById("demoCursor"),done=false;
 (function watch(){if(done)return;var r=dash.getBoundingClientRect();if(r.top<innerHeight*0.6&&r.bottom>0){done=true;demoTimers.push(setTimeout(function(){cycle(["Zürich","Basel"],0);},800));}else requestAnimationFrame(watch);})();
 function cycle(seq,i){if(demoStopped)return;if(i>=seq.length){demoTimers.push(setTimeout(function(){if(!demoStopped)setState("Alle");},900));return;}var chip=document.querySelector('.chip[data-reg="'+seq[i]+'"]');if(!chip)return;var dr=dash.getBoundingClientRect(),cr=chip.getBoundingClientRect();dc.style.opacity=1;dc.style.transition="none";dc.style.left=(cr.left-dr.left-30)+"px";dc.style.top=(cr.top-dr.top+34)+"px";dc.getBoundingClientRect();dc.style.transition="left .8s cubic-bezier(.22,1,.36,1),top .8s cubic-bezier(.22,1,.36,1)";dc.style.left=(cr.left-dr.left+cr.width/2)+"px";dc.style.top=(cr.top-dr.top+cr.height/2)+"px";demoTimers.push(setTimeout(function(){if(demoStopped)return;chip.style.transform="scale(.94)";setTimeout(function(){chip.style.transform="";},150);setState(seq[i]);},850));demoTimers.push(setTimeout(function(){cycle(seq,i+1);},2100));}
}

/* ---------- form ---------- */
(function(){var form=document.getElementById("contactForm");if(!form)return;
 form.addEventListener("submit",function(e){e.preventDefault();var data=new FormData(form);data.append("access_key","6d35445b-8da2-4a56-bf1b-31fa4164b8a3");data.append("subject","Proptiva — Demo-Anfrage");data.append("from_name","Proptiva Website");var b=form.querySelector("button[type=submit]");if(b){b.textContent="…";b.disabled=true;}
  fetch("https://api.web3forms.com/submit",{method:"POST",body:data}).then(function(r){return r.json();}).then(function(j){j.success?ok():fb(data);}).catch(function(){fb(data);});});
 function ok(){document.getElementById("formBody").style.display="none";document.getElementById("formOk").classList.add("show");}
 function fb(data){var body="Name: "+(data.get("Name")||"")+"%0D%0AInstitution: "+(data.get("Institution")||"")+"%0D%0AE-Mail: "+(data.get("E-Mail")||"")+"%0D%0APortfolio: "+(data.get("Portfoliovolumen")||"");location.href="mailto:info@heimyo.com?subject=Proptiva%20Demo-Anfrage&body="+body;ok();}
})();

/* ---------- Lenis (optional) ---------- */
(function(){if(reduce||isTouch||!window.Lenis)return;try{var lenis=new Lenis({duration:1.1,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t));},smoothWheel:true});function raf(t){lenis.raf(t);requestAnimationFrame(raf);}requestAnimationFrame(raf);document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener("click",function(e){var id=a.getAttribute("href");if(id.length>1){var el=document.querySelector(id);if(el){e.preventDefault();lenis.scrollTo(el,{offset:-70});}}});});}catch(e){}})();

/* boot */
initI18n();
var saved="de";try{saved=localStorage.getItem("proptiva_lang")||"de";}catch(e){}
setLang(saved);
initDash();
})();
