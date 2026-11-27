/**
 * Sayfa iskeleti: <head>, üst çubuk, alt bilgi ve şirket bilgisi yardımcıları.
 * Bütün sayfalar `page()` ile sarılır; menü ya da alt bilgi tek yerden değişir.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COMPANY, SITE_URL, STORE } from './company.mjs';

const FRAGMENTS = join(import.meta.dirname, 'fragments');

export const fragment = (name) => readFileSync(join(FRAGMENTS, name), 'utf8');

/** Boş kalan şirket bilgileri; build sonunda listelenir. */
export const missing = new Set();

export const esc = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

const isEmpty = (value) => value == null || value === '' || (Array.isArray(value) && value.length === 0);

/** Şirket bilgisi; boşsa sayfada sarı bir yer tutucu. */
export function fact(value, label) {
  if (isEmpty(value)) {
    missing.add(label);
    return `<mark class="todo">[${esc(label)}]</mark>`;
  }
  return Array.isArray(value) ? value.map(esc).join('<br />') : esc(value);
}

export const has = (value) => !isEmpty(value);

export const mailto = (address, subject) =>
  `<a href="mailto:${esc(address)}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}">${esc(address)}</a>`;

export function tel(phone) {
  if (isEmpty(phone)) return fact(phone, 'Phone number');
  return `<a href="tel:${esc(phone.replace(/[^+\d]/g, ''))}">${esc(phone)}</a>`;
}

/** Adres tek satırda: "Sokak, Şehir, Ülke". */
export const addressInline = () =>
  has(COMPANY.address) ? COMPANY.address.map(esc).join(', ') : fact(COMPANY.address, 'Registered address');

export const state = () => fact(COMPANY.state, 'State of organization');

export const icon = (id, extra = '') => `<svg class="icon${extra ? ` ${extra}` : ''}" aria-hidden="true"><use href="#${id}" /></svg>`;

export const YEAR = 2026;

/* ---------- Metinler ---------- */

const UI = {
  en: {
    nav: [
      ['/clothes', 'Clothes'],
      ['/about', 'About'],
      ['/support', 'Support'],
    ],
    navLabel: 'Main',
    cta: ['/contact', 'Contact'],
    home: '/',
    langName: 'English',
    otherLabel: 'Türkçe sürüm',
    footerAbout: `${COMPANY.legalName} designs, builds and operates mobile apps for iPhone and Android. Clothes is a product of ${COMPANY.legalName}.`,
    footerCols: [
      ['PRODUCTS', [['/clothes', 'Clothes'], ['/support', 'Clothes support']]],
      ['COMPANY', [['/about', 'About us'], ['/contact', 'Contact']]],
      [
        'LEGAL',
        [
          ['/privacy', 'Privacy Policy'],
          ['/terms', 'Terms of Use'],
          ['/kvkk', 'KVKK Privacy Notice'],
          ['/delete-account', 'Delete your account'],
        ],
      ],
    ],
    footerLabel: 'Footer',
    rights: `© ${YEAR} ${COMPANY.legalName}. All rights reserved.`,
    switchTo: ['/tr', 'Türkçe', 'tr'],
  },
  tr: {
    nav: [
      ['/tr', 'Clothes'],
      ['/tr/destek', 'Destek'],
      ['/tr/gizlilik', 'Gizlilik'],
    ],
    navLabel: 'Ana menü',
    cta: ['/tr/destek#iletisim', 'İletişim'],
    home: '/tr',
    langName: 'Türkçe',
    otherLabel: 'English version',
    footerAbout: `${COMPANY.legalName}, iPhone ve Android için mobil uygulamalar tasarlar, geliştirir ve işletir. Clothes bir ${COMPANY.legalName} ürünüdür.`,
    footerCols: [
      ['ÜRÜN', [['/tr', 'Clothes'], ['/tr/destek', 'Destek']]],
      ['ŞİRKET', [['/about', 'Hakkımızda (EN)'], ['/contact', 'İletişim (EN)']]],
      [
        'YASAL',
        [
          ['/tr/gizlilik', 'Gizlilik Politikası'],
          ['/tr/kosullar', 'Kullanım Koşulları'],
          ['/tr/kvkk', 'KVKK Aydınlatma Metni'],
          ['/tr/hesap-silme', 'Hesap silme'],
        ],
      ],
    ],
    footerLabel: 'Alt bilgi',
    rights: `© ${YEAR} ${COMPANY.legalName}. Tüm hakları saklıdır.`,
    switchTo: ['/', 'English', 'en'],
  },
};

export const ui = (lang) => UI[lang];

/* ---------- Parçalar ---------- */

export const brand = (href) => `<a class="brand" href="${href}" aria-label="${esc(COMPANY.name)} home">
          <span class="brand__mark">${icon('i-spark', 'icon--fill')}</span>
          <span class="wordmark">${esc(COMPANY.name)}</span>
        </a>`;

function header(lang, path, alt) {
  const t = UI[lang];
  const links = t.nav
    .map(([href, label]) => `<a href="${href}"${href === path ? ' aria-current="page"' : ''}>${esc(label)}</a>`)
    .join('\n          ');
  const other = lang === 'en' ? 'tr' : 'en';
  const langSwitch = alt
    ? `\n        <a class="lang-switch" href="${alt}" hreflang="${other}" lang="${other}" aria-label="${esc(t.otherLabel)}">${other.toUpperCase()}</a>`
    : '';
  return `<header class="site-header">
      <div class="wrap">
        ${brand(t.home)}
        <nav class="site-nav" aria-label="${esc(t.navLabel)}">
          ${links}
        </nav>${langSwitch}
        <a class="btn btn--primary btn--compact" href="${t.cta[0]}">${esc(t.cta[1])}</a>
      </div>
    </header>`;
}

function footer(lang) {
  const t = UI[lang];
  const cols = t.footerCols
    .map(
      ([title, links]) => `<div>
            <p class="t-label">${esc(title)}</p>
            <ul>
              ${links.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('\n              ')}
            </ul>
          </div>`,
    )
    .join('\n          ');
  const phone = has(COMPANY.phone) ? `<br />${tel(COMPANY.phone)}` : '';
  return `<footer class="site-footer">
      <div class="wrap footer">
        <div class="footer__about">
          ${brand(t.home)}
          <p class="t-small">${esc(t.footerAbout)}</p>
          <address class="t-small footer__address">
            <strong>${esc(COMPANY.legalName)}</strong><br />
            ${fact(COMPANY.address, 'Registered address')}<br />
            ${mailto(COMPANY.email.general)}${phone}
          </address>
        </div>
        <nav class="footer__links" aria-label="${esc(t.footerLabel)}">
          ${cols}
        </nav>
      </div>
      <div class="wrap footer__base">
        <span class="t-caption">${esc(t.rights)}</span>
        <a class="t-caption" href="${t.switchTo[0]}" hreflang="${t.switchTo[2]}" lang="${t.switchTo[2]}">${esc(t.switchTo[1])}</a>
      </div>
    </footer>`;
}

const url = (path) => SITE_URL + (path === '/' ? '/' : path);

/**
 * Tam HTML sayfası.
 * @param {object} o
 * @param {'en'|'tr'} o.lang
 * @param {string} o.path   yayındaki adres ('/about')
 * @param {string|null} o.alt diğer dildeki karşılığı ('/tr/destek') ya da null
 */
export function page({ lang, path, alt = null, title, description, body, favicon = '/favicon.svg', noindex = false, script = '' }) {
  const other = lang === 'en' ? 'tr' : 'en';
  const alternates = alt
    ? `
    <link rel="alternate" hreflang="${lang}" href="${url(path)}" />
    <link rel="alternate" hreflang="${other}" href="${url(alt)}" />
    <link rel="alternate" hreflang="x-default" href="${url(lang === 'en' ? path : alt)}" />`
    : '';
  return `<!doctype html>
<!-- Bu dosya build.mjs ile üretildi; kaynağı src/ altında. Düzenledikten sonra: node build.mjs -->
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />${noindex ? '\n    <meta name="robots" content="noindex" />' : `\n    <link rel="canonical" href="${url(path)}" />`}${alternates}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(COMPANY.legalName)}" />
    <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'tr_TR'}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${url(path)}" />
    <meta name="theme-color" content="#F3EDE7" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#15100C" media="(prefers-color-scheme: dark)" />
    <link rel="icon" href="${favicon}" type="${favicon.endsWith('.png') ? 'image/png' : 'image/svg+xml'}" />
    <link rel="preload" href="/fonts/EBGaramond_400Regular.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/DMSans_500Medium.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
${fragment('sprite.html').trimEnd()}

    ${header(lang, path, alt)}

    <main id="main">
${body.trimEnd()}
    </main>

    ${footer(lang)}${script ? `\n\n    <script>${script}</script>` : ''}
  </body>
</html>
`;
}

/* ---------- Sık kullanılan bloklar ---------- */

export const pageHero = ({ label, title, lead, extra = '' }) => `      <section class="page-hero">
        <div class="wrap">
          <p class="t-label">${esc(label)}</p>
          <h1 class="t-display t-display--page">${title}</h1>
          ${lead ? `<p class="t-body hero__lead">${lead}</p>` : ''}${extra}
        </div>
      </section>`;

export const sectionHead = (label, title, lead = '') => `<div class="section__head">
            <p class="t-label">${esc(label)}</p>
            <h2 class="t-section">${title}</h2>${lead ? `\n            <p class="t-body">${lead}</p>` : ''}
          </div>`;

/** Şirket künyesi (Ana Sayfa, Hakkında, İletişim). */
export function companyFacts(lang = 'en', { full = false } = {}) {
  const L =
    lang === 'en'
      ? {
          legal: 'Legal name',
          entity: 'Entity type',
          state: 'State of organization',
          founded: 'Founded',
          address: 'Registered address',
          email: 'Email',
          phone: 'Phone',
          web: 'Website',
          products: 'Products',
        }
      : {
          legal: 'Ticari unvan',
          entity: 'Şirket türü',
          state: 'Kuruluş eyaleti',
          founded: 'Kuruluş yılı',
          address: 'Kayıtlı adres',
          email: 'E-posta',
          phone: 'Telefon',
          web: 'Web sitesi',
          products: 'Ürünler',
        };
  const rows = [
    [L.legal, esc(COMPANY.legalName)],
    [L.entity, esc(COMPANY.entity)],
    [L.state, `${state()}, ${esc(COMPANY.country)}`],
    ...(full ? [[L.founded, fact(COMPANY.founded, 'Year founded')]] : []),
    [L.address, fact(COMPANY.address, 'Registered address')],
    [L.email, mailto(COMPANY.email.general)],
    [L.phone, tel(COMPANY.phone)],
    [L.web, `<a href="${SITE_URL}/">${esc(SITE_URL.replace(/^https:\/\//, ''))}</a>`],
    ...(full ? [[L.products, `<a href="${lang === 'en' ? '/clothes' : '/tr'}">Clothes</a>`]] : []),
  ];
  return `<dl class="facts">
              ${rows.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('\n              ')}
            </dl>`;
}

/* ---------- Mağaza ---------- */

export const storeLive = () => Boolean(STORE.ios || STORE.android);

/** Clothes açılışındaki düğmeler: mağaza adresi varsa indirme, yoksa "Yakında". */
export function heroActions(lang) {
  const en = lang === 'en';
  if (storeLive()) {
    const ios = STORE.ios
      ? `<a class="btn btn--primary" href="${esc(STORE.ios)}" rel="noopener">${icon('i-download')}${en ? 'Download on the App Store' : 'App Store’dan indir'}</a>`
      : '';
    const android = STORE.android
      ? `<a class="btn btn--secondary" href="${esc(STORE.android)}" rel="noopener">${icon('i-download')}${en ? 'Get it on Google Play' : 'Google Play’den indir'}</a>`
      : '';
    return `<div class="actions">
              ${ios}
              ${android}
            </div>
            <p class="t-caption">${en ? 'For iPhone and Android · English and Turkish' : 'iPhone ve Android için · Türkçe ve İngilizce'}</p>`;
  }
  return `<div class="actions">
              <a class="btn btn--primary" href="#${en ? 'features' : 'ozellikler'}">${en ? 'See what it does' : 'Neler yaptığına bak'}</a>
              <a class="btn btn--secondary" href="${en ? '/support' : '/tr/destek'}">${en ? 'Help and support' : 'Yardım ve destek'}</a>
            </div>
            <p class="t-caption"><span class="pill pill--soon">${en ? 'Coming soon' : 'Yakında'}</span> ${en ? 'to the App Store and Google Play · English and Turkish' : 'App Store ve Google Play’de · Türkçe ve İngilizce'}</p>`;
}

/** Clothes sayfasının sonundaki koyu kart. */
export function storeCta(lang) {
  const en = lang === 'en';
  if (storeLive()) {
    const ios = STORE.ios
      ? `<a class="btn btn--onDarkPrimary" href="${esc(STORE.ios)}" rel="noopener">${icon('i-download')}${en ? 'Download on the App Store' : 'App Store’dan indir'}</a>`
      : '';
    const android = STORE.android
      ? `<a class="btn btn--onDark" href="${esc(STORE.android)}" rel="noopener">${icon('i-download')}${en ? 'Get it on Google Play' : 'Google Play’den indir'}</a>`
      : '';
    return `<div class="card card--obsidian cta">
            <h2 class="t-section">${en ? 'Upload your wardrobe once.' : 'Gardırobunu bir kez yükle.'}</h2>
            <p class="t-body">${en ? 'Tomorrow morning, let Clothes pick what you wear.' : 'Yarın sabah ne giyeceğini Clothes önersin.'}</p>
            <div class="actions">
              ${ios}
              ${android}
            </div>
          </div>`;
  }
  return `<div class="card card--obsidian cta">
            <p class="t-label" style="color: var(--obsidian-textSecondary)">${en ? 'AVAILABILITY' : 'NE ZAMAN'}</p>
            <h2 class="t-section">${en ? 'Coming soon to iPhone and Android.' : 'Yakında iPhone ve Android’de.'}</h2>
            <p class="t-body">${
              en
                ? `Clothes is getting ready for release on the App Store and Google Play. It is developed and published by ${esc(COMPANY.legalName)}.`
                : `Clothes, App Store ve Google Play’de yayına hazırlanıyor. Uygulamayı ${esc(COMPANY.legalName)} geliştiriyor ve yayımlıyor.`
            }</p>
            <div class="actions">
              <a class="btn btn--onDarkPrimary" href="${en ? '/contact' : '/tr/destek#iletisim'}">${en ? 'Contact us' : 'Bize yaz'}</a>
              <a class="btn btn--onDark" href="${en ? '/privacy' : '/tr/gizlilik'}">${en ? 'Read the privacy policy' : 'Gizlilik politikasını oku'}</a>
            </div>
          </div>`;
}
