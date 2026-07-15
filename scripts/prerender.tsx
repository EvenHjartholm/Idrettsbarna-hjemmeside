/**
 * prerender.tsx – SSG for Idrettsbarna hjemmeside
 *
 * Kjøres som postbuild-steg: `vite-node scripts/prerender.tsx`
 * Genererer én statisk HTML-fil per offentlig rute i dist/.
 *
 * Bruker react-dom/server + MemoryRouter (ingen puppeteer, ingen Chromium).
 * react-helmet-async sine <Helmet>-tagger løftes korrekt inn i <head>.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

// vite-node håndterer ESM/CJS-interop korrekt – ingen createRequire nødvendig
// for renderToString, MemoryRouter og HelmetProvider.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from '../App';

// ─── Browser API polyfills ────────────────────────────────────────────────────
// react-dom/server kjøres i Node og mangler browser-APIer.
// Noen komponenter bruker disse DIREKTE i render-fasen (ikke bare i useEffect).
// useEffect kjøres ikke under renderToString – effektene er trygge.

const noopClassList = {
  add: () => {},
  remove: () => {},
  contains: () => false,
  toggle: () => {},
  replace: () => {},
  entries: () => [][Symbol.iterator](),
  forEach: () => {},
  values: () => [][Symbol.iterator](),
};

const localStorageStore: Record<string, string> = {};
const localStoragePolyfill = {
  getItem: (k: string) => localStorageStore[k] ?? null,
  setItem: (k: string, v: string) => { localStorageStore[k] = v; },
  removeItem: (k: string) => { delete localStorageStore[k]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); },
  key: (i: number) => Object.keys(localStorageStore)[i] ?? null,
  get length() { return Object.keys(localStorageStore).length; },
};

const locationPolyfill = {
  href: 'https://www.xn--lrsvmme-fxah8p.no/',
  pathname: '/',
  search: '',
  hash: '',
  origin: 'https://www.xn--lrsvmme-fxah8p.no',
  protocol: 'https:',
  host: 'www.xn--lrsvmme-fxah8p.no',
  hostname: 'www.xn--lrsvmme-fxah8p.no',
  port: '',
  assign: () => {},
  replace: () => {},
  reload: () => {},
  toString: () => 'https://www.xn--lrsvmme-fxah8p.no/',
};

const documentPolyfill = {
  body: { classList: noopClassList, style: {} as any, getAttribute: () => null, setAttribute: () => {} },
  documentElement: { classList: noopClassList, style: {} as any, lang: 'nb' },
  head: { appendChild: () => null, removeChild: () => null },
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => ({ forEach: () => {}, length: 0, item: () => null }),
  addEventListener: () => {},
  removeEventListener: () => {},
  createElement: (tag: string) => ({
    style: {} as any,
    classList: noopClassList,
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => null,
    href: '',
    src: '',
    type: '',
    rel: '',
    innerHTML: '',
    textContent: '',
  }),
  createTextNode: () => ({ textContent: '' }),
  cookie: '',
};

if (typeof globalThis.localStorage === 'undefined') {
  (globalThis as any).localStorage = localStoragePolyfill;
}
if (typeof globalThis.sessionStorage === 'undefined') {
  (globalThis as any).sessionStorage = localStoragePolyfill;
}
if (typeof globalThis.window === 'undefined') {
  (globalThis as any).window = globalThis;
}
if (typeof globalThis.location === 'undefined') {
  (globalThis as any).location = locationPolyfill;
}
if (typeof globalThis.document === 'undefined') {
  (globalThis as any).document = documentPolyfill;
}
// Noen libs sjekker navigator
if (typeof globalThis.navigator === 'undefined') {
  (globalThis as any).navigator = { userAgent: 'Node.js/SSR', language: 'nb-NO', onLine: true };
}
// matchMedia brukes av noen animasjonsbiblioteker
if (typeof globalThis.matchMedia === 'undefined') {
  (globalThis as any).matchMedia = () => ({ matches: false, addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {} });
}


// ─── Ruter som skal prerendres ──────────────────────────────────────────────
// REGEL: Denne listen MÅ være identisk med sitemap.xml.
// Én side utenfor begge = usynlig for Google og AI-boter.

const ROUTES = [
  '/',
  '/kurs/baby',
  '/kurs/toddler',
  '/kurs/kids_therapy',
  '/kurs/kids_pool_25m',
  '/kurs/lifesaving',
  '/kurs/preschool',
  '/babysvomming-asker',
  '/babysvomming-risenga',
  '/babysvomming-baerum',
  '/svommekurs-asker',
  '/svommekurs-baerum',
  '/svommekurs-drammen',
  '/svommekurs-oslo',
  '/svommekurs-lier',
  '/asker-triathlon',
  '/om-oss',
  '/portrettfotografering',
  '/nyheter',
  '/vilkar',
];

// ─── Setup ───────────────────────────────────────────────────────────────────

const distDir = join(process.cwd(), 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

let successCount = 0;
let errorCount = 0;

// ─── Render loop ─────────────────────────────────────────────────────────────

for (const route of ROUTES) {
  const helmetContext: Record<string, any> = {};

  let appHtml = '';
  try {
    appHtml = renderToString(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          MemoryRouter,
          { initialEntries: [route] },
          React.createElement(App)
        )
      )
    );
    successCount++;
  } catch (err) {
    const error = err as Error;
    console.error(`\n  ✗ ${route}: ${error.message}`);
    console.error(error.stack?.split('\n').slice(1, 6).join('\n'));
    errorCount++;
  }

  const { helmet } = helmetContext as any;
  let finalHtml = template;

  // 1. Erstatt innholdet i <div id="root"> med server-rendret HTML
  finalHtml = finalHtml.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${appHtml}</div>`
  );

  // 2. Erstatt <title> med sidens egne tittel fra <Helmet>
  if (helmet?.title) {
    const titleTag = helmet.title.toString();
    if (titleTag) {
      finalHtml = finalHtml.replace(/<title>[^<]*<\/title>/, titleTag);
    }
  }

  // 3. Legg til side-spesifikke <meta>-tagger (description, og:*, etc.)
  if (helmet?.meta) {
    const metaHtml = helmet.meta.toString();
    if (metaHtml) {
      finalHtml = finalHtml.replace('</head>', `  ${metaHtml}\n</head>`);
    }
  }

  // 4. Legg til <link rel="canonical">
  if (helmet?.link) {
    const linkHtml = helmet.link.toString();
    if (linkHtml) {
      finalHtml = finalHtml.replace('</head>', `  ${linkHtml}\n</head>`);
    }
  }

  // 5. Skriv til dist/[rute]/index.html (eller dist/index.html for /)
  const outputPath =
    route === '/'
      ? join(distDir, 'index.html')
      : join(distDir, ...route.split('/').filter(Boolean), 'index.html');

  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, finalHtml, 'utf-8');
  console.log(`  ✓ ${route}`);
}

// ─── Rapport ─────────────────────────────────────────────────────────────────

console.log(`\n✅ Prerendering fullført: ${successCount} med innhold, ${errorCount} uten\n`);
if (errorCount > 0) {
  process.exit(1);
}
