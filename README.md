# Proptiva

Landing- und Demo-Site für **Proptiva** – digitales Immobilien-Portfoliomanagement für Schweizer Pensionskassen, Anlagestiftungen und institutionelle Investoren. Ein Angebot der **Heimyo Holding AG**, Zürich.

🔗 **Live:** https://marcheimyo.github.io/proptiva/

## Inhalt

| Seite | Datei |
|-------|-------|
| Landing | [`index.html`](index.html) |
| Portfolio-Manager Demo (interaktives Dashboard) | [`portfolio-demo.html`](portfolio-demo.html) |
| Impressum | [`impressum.html`](impressum.html) |
| Datenschutzerklärung | [`datenschutz.html`](datenschutz.html) |

## Technik

Reine statische Site – **kein Build-Schritt**, kein Framework.

- HTML + CSS (`assets/css/`) + Vanilla-JS (`assets/js/`)
- Zweisprachig **DE/EN** über ein `data-i18n`-System (DE im HTML, EN-Overrides in `assets/js/main.js`)
- Demo-Dashboard: SVG-Charts, Szenario-Rechner und Schweiz-Karte (Leaflet via CDN)
- Kontaktformular über [Web3Forms](https://web3forms.com) (clientseitig)
- Schriften: Fraunces + Inter (Google Fonts)

## Lokale Vorschau

Kein Server-Setup nötig, ein einfacher statischer Server genügt:

```bash
# Python
python -m http.server 4173

# oder Node
npx serve -l 4173
```

Danach im Browser: http://localhost:4173/

## Deployment

GitHub Pages (Branch `main`, Root). Änderungen an `main` gehen nach dem Push automatisch live.

## Konventionen

- Schweizer Rechtschreibung: **kein „ß"** (immer „ss"), CHF mit Apostroph-Tausendertrennung, Datum DD.MM.YYYY
- Bei CSS/JS-Änderungen die `?v=N`-Version in den HTML-Referenzen hochzählen (Cache-Busting)

---

© 2026 Heimyo Holding AG · Proptiva · Zürich
