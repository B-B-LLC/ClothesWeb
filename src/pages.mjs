/**
 * Sitenin bütün sayfaları. Her giriş: yayındaki adres (`path`), yazılacak dosya
 * (`file`) ve HTML. Klasör + index.html düzeni hem Vercel'de (`/about`) hem
 * yerel `python -m http.server`'da çalışıyor.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { COMPANY, SITE_URL } from './company.mjs';
import {
  addressInline,
  companyFacts,
  esc,
  fact,
  fragment,
  has,
  heroActions,
  icon,
  mailto,
  page,
  pageHero,
  sectionHead,
  state,
  storeCta,
  storeLive,
  tel,
} from './lib.mjs';

const LEGAL = JSON.parse(readFileSync(join(import.meta.dirname, '..', 'content', 'legal.json'), 'utf8'));

const C = COMPANY.legalName;
const E = COMPANY.email;

/* ======================================================================
 * Ana sayfa (/)
 * ==================================================================== */

function home() {
  const body = `      <section class="hero">
        <div class="wrap">
          <div class="hero__copy">
            <p class="t-label">${esc(C.toUpperCase())} · SOFTWARE COMPANY</p>
            <h1 class="t-display">Everyday apps, <em>made with care.</em></h1>
            <p class="t-body hero__lead">
              ${esc(C)} is an independent software company. We design, build and operate mobile apps for iPhone and
              Android, starting with Clothes: a wardrobe app that suggests what to wear for the weather.
            </p>
            <div class="actions">
              <a class="btn btn--primary" href="/clothes">Explore Clothes ${icon('i-arrow')}</a>
              <a class="btn btn--secondary" href="/about">About the company</a>
            </div>
            <p class="t-caption">${esc(C)} · ${state()}, ${esc(COMPANY.country)}</p>
          </div>

          <div class="hero__stage">
${fragment('phone-en.html').trimEnd()}
          </div>
        </div>
      </section>

      <section class="section" id="what-we-do">
        <div class="wrap">
          ${sectionHead('WHAT WE DO', 'From the first sketch to the support inbox')}
          <div class="grid-3">
            <div class="card card--flat detail">
              <span class="detail__icon">${icon('i-pen')}</span>
              <h3 class="t-headline">Product design</h3>
              <p class="t-small">
                We plan every screen, write every word and draw every icon ourselves, in English and Turkish, so our
                apps feel calm and clear.
              </p>
            </div>
            <div class="card card--flat detail">
              <span class="detail__icon">${icon('i-code')}</span>
              <h3 class="t-headline">Engineering</h3>
              <p class="t-small">
                We build for iPhone and Android from one codebase, keep your data on your device first and use the cloud
                only where it clearly helps.
              </p>
            </div>
            <div class="card card--flat detail">
              <span class="detail__icon">${icon('i-life')}</span>
              <h3 class="t-headline">Publishing and support</h3>
              <p class="t-small">
                We run our own servers, publish on the App Store and Google Play, and answer every support email
                ourselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="products">
        <div class="wrap">
          ${sectionHead('OUR PRODUCTS', 'Apps we build and run')}
          ${productCard()}
        </div>
      </section>

      <section class="section" id="principles">
        <div class="wrap">
          ${sectionHead('HOW WE WORK', 'Principles we ship with')}
          <div class="grid-2">
            ${principle('i-eye-off', 'No ads, no tracking', 'Our apps don’t show ads, don’t sell your data and don’t follow you across other apps or websites.')}
            ${principle('i-shield', 'Consent before AI', 'Photos are sent for AI analysis only after you agree, and they are never used to train AI models.')}
            ${principle('i-lock', 'Your data, your call', 'Export everything in one file or delete your account from inside the app, at any time.')}
            ${principle('i-chat', 'People answer', 'Support email is read and answered by the people who build the app, usually within two business days.')}
          </div>
        </div>
      </section>

      <section class="section" id="company">
        <div class="wrap">
          <div class="card company">
            <div class="company__intro">
              <p class="t-label">COMPANY INFORMATION</p>
              <h2 class="t-section">Who stands behind our apps</h2>
              <p class="t-body">
                ${esc(C)} is the developer and publisher of Clothes and the data controller for the personal data
                processed through it.
              </p>
              <a class="link-arrow" href="/about">More about ${esc(C)} ${icon('i-arrow')}</a>
            </div>
            ${companyFacts('en')}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="card card--obsidian cta">
            <h2 class="t-section">Let’s talk.</h2>
            <p class="t-body">
              For support, partnerships, press or privacy requests, write to us. A person reads every message.
            </p>
            <div class="actions">
              <a class="btn btn--onDarkPrimary" href="/contact">Contact us</a>
              <a class="btn btn--onDark" href="mailto:${esc(E.general)}">${icon('i-mail')}${esc(E.general)}</a>
            </div>
          </div>
        </div>
      </section>`;

  return page({
    lang: 'en',
    path: '/',
    title: `${C} — Mobile apps for iPhone and Android`,
    description: `${C} is an independent software company that designs, builds and operates mobile apps, including Clothes, a wardrobe and outfit app for iPhone and Android.`,
    body,
  });
}

const principle = (id, title, text) => `<div class="card card--flat detail">
              <span class="detail__icon">${icon(id)}</span>
              <h3 class="t-headline">${esc(title)}</h3>
              <p class="t-small">${esc(text)}</p>
            </div>`;

function productCard() {
  const status = storeLive() ? 'Available on the App Store and Google Play' : 'Coming soon to the App Store and Google Play';
  return `<article class="card product">
            <div class="product__copy">
              <div class="product__head">
                <img class="app-icon" src="/images/clothes-icon.png" width="64" height="64" alt="Clothes app icon" />
                <div>
                  <h3 class="t-subtitle">Clothes</h3>
                  <p class="t-small">Wardrobe and outfits</p>
                </div>
              </div>
              <p class="t-body">
                Photograph your clothes once. Every morning Clothes checks the weather, suggests an outfit from your own
                wardrobe and, if you like, scores what you wear on five axes, from color harmony to detail.
              </p>
              <dl class="facts facts--compact">
                <div><dt>Platforms</dt><dd>iPhone and Android</dd></div>
                <div><dt>Languages</dt><dd>English and Turkish</dd></div>
                <div><dt>Category</dt><dd>Lifestyle</dd></div>
                <div><dt>Price</dt><dd>Free, with an optional Clothes Pro subscription</dd></div>
                <div><dt>Status</dt><dd>${status}</dd></div>
              </dl>
              <div class="actions">
                <a class="btn btn--primary" href="/clothes">Learn more ${icon('i-arrow')}</a>
                <a class="btn btn--secondary" href="/support">Support</a>
              </div>
            </div>
            <div class="product__demo" aria-hidden="true">
              <div class="card card--obsidian">
                <span class="t-label" style="color: var(--obsidian-textSecondary)">OUTFIT SCORE</span>
                <div class="weather__top">
                  <span class="weather__temp">84</span>
                  <span class="weather__text">
                    <span class="weather__place">Casual</span>
                    <span class="weather__meta">Balanced colors, a clean silhouette.</span>
                  </span>
                </div>
              </div>
              <div class="card">
                <div class="row">
                  <span class="t-headline">Suggestion 1</span>
                  <span class="pill pill--strong">Fits the weather</span>
                </div>
                <div class="tiles tiles--four">
                  <div class="tile"><div class="tile__frame"><svg class="tile__art" style="color: #d9ccb7;"><use href="#g-kazak" /></svg></div></div>
                  <div class="tile"><div class="tile__frame"><svg class="tile__art" style="color: #34455e; --seam: rgba(255, 255, 255, 0.3);"><use href="#g-kot" /></svg></div></div>
                  <div class="tile"><div class="tile__frame"><svg class="tile__art" style="color: #a8845a;"><use href="#g-kaban" /></svg></div></div>
                  <div class="tile"><div class="tile__frame"><svg class="tile__art" style="color: #3a2a22; --seam: rgba(255, 255, 255, 0.3);"><use href="#g-bot" /></svg></div></div>
                </div>
                <div class="progress">
                  <div class="progress__head"><span>Color harmony</span><b>88</b></div>
                  <div class="progress__track"><div class="progress__fill" style="width: 88%"></div></div>
                </div>
                <div class="progress">
                  <div class="progress__head"><span>Fit for the occasion</span><b>90</b></div>
                  <div class="progress__track"><div class="progress__fill" style="width: 90%"></div></div>
                </div>
              </div>
            </div>
          </article>`;
}

/* ======================================================================
 * Hakkında (/about)
 * ==================================================================== */

function about() {
  const founded = has(COMPANY.founded)
    ? `, in ${esc(COMPANY.founded)}`
    : `, in ${fact(COMPANY.founded, 'Year founded')}`;
  const people = COMPANY.people
    .map(
      (person) => `<div class="card card--flat person">
              <span class="detail__icon">${icon('i-person')}</span>
              <div>
                <h3 class="t-headline">${fact(person.name, 'Founder name')}</h3>
                <p class="t-small">${esc(person.role.en)}, ${esc(C)}</p>
              </div>
            </div>`,
    )
    .join('\n            ');

  const body = `${pageHero({
    label: 'ABOUT',
    title: `About ${esc(C)}`,
    lead: 'We are an independent software company that designs, builds and operates mobile apps for iPhone and Android.',
  })}

      <section class="section">
        <div class="wrap split">
          <div class="prose">
            <h2>Who we are</h2>
            <p>
              ${esc(C)} is a limited liability company organized in ${state()}, ${esc(COMPANY.country)}${founded}. We make
              consumer apps for everyday decisions: small, focused tools that are pleasant to use and honest about the
              data they need.
            </p>
            <p>
              Our first app is <a href="/clothes">Clothes</a>. It answers a question many of us ask every morning, “what
              should I wear today?”, from your own wardrobe and the day’s weather.
            </p>
            <p>
              We do the whole job ourselves: product design, engineering, publishing on the App Store and Google Play,
              running the servers and answering support email. ${esc(C)} is the publisher of our apps and the data
              controller for the personal data processed through them.
            </p>
            <h2>How we build</h2>
            <ul>
              <li>On your device first: the Clothes wardrobe lives on your phone and opens without a connection.</li>
              <li>Clear consent: photos go to an AI provider only after you agree, and never to train models.</li>
              <li>No advertising business: no ads, no data sales, no cross-app tracking.</li>
              <li>Real deletion: account deletion and data export are built into the app.</li>
            </ul>
          </div>
          <aside class="card company-card" aria-label="Company details">
            <p class="t-label">COMPANY DETAILS</p>
            ${companyFacts('en', { full: true })}
          </aside>
        </div>
      </section>

      <section class="section" id="leadership">
        <div class="wrap">
          ${sectionHead('LEADERSHIP', 'The people responsible')}
          <div class="grid-2">
            ${people}
          </div>
        </div>
      </section>

      <section class="section" id="products">
        <div class="wrap">
          ${sectionHead('PRODUCTS', 'What we make')}
          <a class="card product-row" href="/clothes">
            <img class="app-icon" src="/images/clothes-icon.png" width="56" height="56" alt="" />
            <span class="product-row__text">
              <span class="t-headline">Clothes</span>
              <span class="t-small">Wardrobe and outfit app for iPhone and Android · ${storeLive() ? 'Available now' : 'Coming soon'}</span>
            </span>
            ${icon('i-arrow')}
          </a>
        </div>
      </section>

      <section class="section" id="policies">
        <div class="wrap">
          ${sectionHead('POLICIES', 'How we handle your data')}
          <div class="grid-2">
            ${linkCard('/privacy', 'i-shield', 'Privacy Policy', 'What we collect in Clothes, why, and who processes it for us.')}
            ${linkCard('/terms', 'i-doc', 'Terms of Use', 'The agreement for using Clothes, AI results and subscriptions.')}
            ${linkCard('/kvkk', 'i-doc', 'KVKK Privacy Notice', 'Information notice under Türkiye’s data protection law.')}
            ${linkCard('/delete-account', 'i-trash', 'Delete your account', 'Remove your account and data, in the app or by email.')}
          </div>
        </div>
      </section>`;

  return page({
    lang: 'en',
    path: '/about',
    title: `About ${C}`,
    description: `${C} is an independent software company that designs, builds and operates mobile apps for iPhone and Android. Company details, leadership and policies.`,
    body,
  });
}

const linkCard = (href, id, title, text) => `<a class="card card--flat detail link-card" href="${href}">
              <span class="detail__icon">${icon(id)}</span>
              <span class="t-headline">${esc(title)}</span>
              <span class="t-small">${esc(text)}</span>
            </a>`;

/* ======================================================================
 * İletişim (/contact)
 * ==================================================================== */

function contact() {
  // Tek kutu varken tek kart; ayrı adresler açılınca her konu kendi kartında.
  const single = new Set([E.general, E.support, E.privacy]).size === 1;
  const emailCards = single
    ? `<div class="card card--flat detail">
              <span class="detail__icon">${icon('i-mail')}</span>
              <h2 class="t-headline">Email</h2>
              <p class="t-small">
                One inbox for everything: help with Clothes, subscriptions, privacy and data requests (GDPR or KVKK),
                partnerships and press. For account or privacy requests, please write from the email on your Clothes
                account. Quick answers are on the <a href="/support">support page</a>.
              </p>
              <p class="contact-line">${mailto(E.general)}</p>
            </div>`
    : `<div class="card card--flat detail">
              <span class="detail__icon">${icon('i-mail')}</span>
              <h2 class="t-headline">General and business</h2>
              <p class="t-small">Partnerships, press and anything else about the company.</p>
              <p class="contact-line">${mailto(E.general)}</p>
            </div>
            <div class="card card--flat detail">
              <span class="detail__icon">${icon('i-life')}</span>
              <h2 class="t-headline">Clothes support</h2>
              <p class="t-small">Help with the app, subscriptions, sign-in or a bug. See the <a href="/support">support page</a> first for quick answers.</p>
              <p class="contact-line">${mailto(E.support, 'Clothes support')}</p>
            </div>
            <div class="card card--flat detail">
              <span class="detail__icon">${icon('i-shield')}</span>
              <h2 class="t-headline">Privacy and data requests</h2>
              <p class="t-small">Access, correction, deletion or any request under GDPR or KVKK. Please write from the email on your account.</p>
              <p class="contact-line">${mailto(E.privacy, 'Privacy request')}</p>
            </div>`;

  const body = `${pageHero({
    label: 'CONTACT',
    title: `Contact ${esc(C)}`,
    lead: single
      ? 'Email or call us and we will get back to you, usually within two business days.'
      : 'Write to the right inbox and we will get back to you, usually within two business days.',
  })}

      <section class="section">
        <div class="wrap">
          <div class="grid-2">
            ${emailCards}
            <div class="card card--flat detail">
              <span class="detail__icon">${icon('i-call')}</span>
              <h2 class="t-headline">Phone</h2>
              <p class="t-small">${esc(COMPANY.hours.en)}. For app support, email is the fastest way to reach us.</p>
              <p class="contact-line">${tel(COMPANY.phone)}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="card company">
            <div class="company__intro">
              <p class="t-label">MAILING ADDRESS</p>
              <h2 class="t-section">${esc(C)}</h2>
              <address class="t-body address">${fact(COMPANY.address, 'Registered address')}</address>
            </div>
            ${companyFacts('en')}
          </div>
        </div>
      </section>`;

  return page({
    lang: 'en',
    path: '/contact',
    title: `Contact — ${C}`,
    description: `Contact ${C} by email, phone or post: general and business inquiries, Clothes app support and privacy requests.`,
    body,
  });
}

/* ======================================================================
 * Destek (/support, /tr/destek)
 * ==================================================================== */

const FAQ = {
  en: [
    [
      'How do I delete my account?',
      'In Clothes, open <b>Profile &gt; Delete account</b>, type <b>DELETE</b> and confirm. Your account, wardrobe, photos, scores and history are permanently deleted from our servers and cleared from your device. Can’t open the app? See <a href="/delete-account">Delete your account</a>.',
    ],
    [
      'How do I get a copy of my data?',
      'Open <b>Profile &gt; Download your data</b>. Clothes creates one file with your wardrobe, history and photos.',
    ],
    [
      'How do I cancel or manage Clothes Pro?',
      'Subscriptions are billed by Apple or Google. On iPhone, open <b>Settings &gt; your name &gt; Subscriptions</b>. On Android, open <b>Google Play &gt; your profile &gt; Payments and subscriptions &gt; Subscriptions</b>. You can also tap <b>Manage subscription</b> on the Clothes Pro screen. Pro stays active until the end of the period you paid for.',
    ],
    [
      'I subscribed to Pro but don’t see it.',
      'Open the Clothes Pro screen and tap <b>Restore purchases</b> while signed in to the same Apple ID or Google account you subscribed with. If you use Clothes on more than one phone, sign in to your Clothes account on each one so your subscription follows you.',
    ],
    [
      'Can I get a refund?',
      'Payments are handled by Apple and Google, so refunds follow their rules. Request one at <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a> or from your Google Play order history.',
    ],
    [
      'Why does Clothes ask for my location?',
      'Only to get the weather. Clothes uses your approximate, city-level location while the app is open, rounds it to about 1 km and does not store it. You can pick a city by hand instead.',
    ],
    [
      'What happens to my photos?',
      'Garment photos are backed up to your account so your wardrobe can be restored on a new phone. They are sent to our AI provider for tagging only after you agree, and they are never used to train AI models. Outfit photos you score are not stored on our servers. Details are in the <a href="/privacy">Privacy Policy</a>.',
    ],
    [
      'A score or comment seems wrong or inappropriate.',
      'Tap <b>Report this result</b> on the score screen. Scores should only ever talk about clothes; we review every report. Your photo is not included in the report.',
    ],
  ],
  tr: [
    [
      'Hesabımı nasıl silerim?',
      'Clothes’ta <b>Profil &gt; Hesabı sil</b>’i aç, <b>SİL</b> yaz ve onayla. Hesabın, gardırobun, fotoğrafların, skorların ve geçmişin sunucudan kalıcı olarak silinir, cihazındaki veri de temizlenir. Uygulamayı açamıyor musun? <a href="/tr/hesap-silme">Hesap silme</a> sayfasına bak.',
    ],
    [
      'Verilerimin kopyasını nasıl alırım?',
      '<b>Profil &gt; Verilerini indir</b>’e dokun. Clothes gardırobunu, geçmişini ve fotoğraflarını tek bir dosyada hazırlar.',
    ],
    [
      'Clothes Pro’yu nasıl iptal ederim ya da yönetirim?',
      'Abonelik ücretini Apple ya da Google alır. iPhone’da <b>Ayarlar &gt; adın &gt; Abonelikler</b>’i aç. Android’de <b>Google Play &gt; profilin &gt; Ödemeler ve abonelikler &gt; Abonelikler</b>’e git. Clothes Pro ekranındaki <b>Aboneliği yönet</b> de aynı yere götürür. Pro, ödediğin dönemin sonuna kadar açık kalır.',
    ],
    [
      'Pro’ya abone oldum ama görünmüyor.',
      'Clothes Pro ekranında <b>Satın alımları geri yükle</b>’ye dokun; abone olduğun Apple Kimliği ya da Google hesabıyla giriş yapmış olmalısın. Clothes’u birden fazla telefonda kullanıyorsan aboneliğin seninle gelsin diye her birinde Clothes hesabına giriş yap.',
    ],
    [
      'İade alabilir miyim?',
      'Ödemeleri Apple ve Google aldığı için iade onların kurallarına tabidir. <a href="https://reportaproblem.apple.com" rel="noopener">reportaproblem.apple.com</a> adresinden ya da Google Play sipariş geçmişinden talep edebilirsin.',
    ],
    [
      'Clothes neden konumumu istiyor?',
      'Yalnızca hava durumu için. Clothes uygulama açıkken şehir seviyesindeki yaklaşık konumunu kullanır, yaklaşık 1 km’ye yuvarlar ve saklamaz. İstersen şehri elle seçebilirsin.',
    ],
    [
      'Fotoğraflarıma ne oluyor?',
      'Parça fotoğrafları, gardırobun yeni telefonda geri yüklenebilsin diye hesabına yedeklenir. Etiketleme için yapay zekâ sağlayıcımıza yalnızca izin verdikten sonra gönderilir ve model eğitiminde hiç kullanılmaz. Puanlattığın kombin fotoğrafları sunucumuzda saklanmaz. Ayrıntılar <a href="/tr/gizlilik">Gizlilik Politikası</a>’nda.',
    ],
    [
      'Bir skor ya da yorum yanlış veya uygunsuz.',
      'Skor ekranında <b>Bu sonucu bildir</b>’e dokun. Puanlama yalnızca kıyafetler hakkında olmalı; her bildirimi inceliyoruz. Bildirime fotoğrafın eklenmez.',
    ],
  ],
};

function support(lang) {
  const en = lang === 'en';
  const faq = FAQ[lang]
    .map(
      ([q, a]) => `<details class="card faq__item">
              <summary><span class="t-headline">${esc(q)}</span><span class="faq__toggle" aria-hidden="true"></span></summary>
              <p class="t-small">${a}</p>
            </details>`,
    )
    .join('\n            ');

  const body = `${pageHero({
    label: en ? 'SUPPORT' : 'DESTEK',
    title: en ? 'Clothes support' : 'Clothes destek',
    lead: en
      ? 'Answers to common questions about the Clothes app, and how to reach us when you need a hand.'
      : 'Clothes uygulamasıyla ilgili sık sorulan sorular ve yardıma ihtiyacın olduğunda bize nasıl ulaşacağın.',
  })}

      <section class="section" id="${en ? 'contact' : 'iletisim'}">
        <div class="wrap">
          <div class="card card--obsidian support-card">
            <span class="weather__glass">${icon('i-mail')}</span>
            <div class="support-card__text">
              <h2 class="t-subtitle">${en ? 'Email us' : 'Bize yaz'}</h2>
              <p class="t-small" style="color: var(--obsidian-textSecondary)">
                ${
                  en
                    ? 'Tell us your phone model and what happened. We usually reply within two business days.'
                    : 'Telefon modelini ve ne olduğunu yaz. Genellikle iki iş günü içinde dönüyoruz.'
                }
              </p>
            </div>
            <a class="btn btn--onDarkPrimary" href="mailto:${esc(E.support)}?subject=${encodeURIComponent(en ? 'Clothes support' : 'Clothes destek')}">${esc(E.support)}</a>
          </div>
        </div>
      </section>

      <section class="section" id="${en ? 'faq' : 'sss'}">
        <div class="wrap">
          ${sectionHead(en ? 'FREQUENTLY ASKED' : 'SIK SORULANLAR', en ? 'Quick answers' : 'Kısa cevaplar')}
          <div class="faq">
            ${faq}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="grid-3">
            ${
              en
                ? [
                    linkCard('/delete-account', 'i-trash', 'Delete your account', 'In the app or by email.'),
                    linkCard('/privacy', 'i-shield', 'Privacy Policy', 'What we collect and why.'),
                    linkCard('/terms', 'i-doc', 'Terms of Use', 'Using Clothes and Clothes Pro.'),
                  ].join('\n            ')
                : [
                    linkCard('/tr/hesap-silme', 'i-trash', 'Hesap silme', 'Uygulamadan ya da e-postayla.'),
                    linkCard('/tr/gizlilik', 'i-shield', 'Gizlilik Politikası', 'Neyi, neden işliyoruz.'),
                    linkCard('/tr/kosullar', 'i-doc', 'Kullanım Koşulları', 'Clothes ve Clothes Pro kullanımı.'),
                  ].join('\n            ')
            }
          </div>
        </div>
      </section>`;

  return page({
    lang,
    path: en ? '/support' : '/tr/destek',
    alt: en ? '/tr/destek' : '/support',
    title: en ? `Clothes support — ${C}` : `Clothes destek — ${C}`,
    description: en
      ? 'Help with the Clothes app: account deletion, data export, Clothes Pro subscriptions, location and photos. Contact Clothes support.'
      : 'Clothes uygulaması için yardım: hesap silme, verileri indirme, Clothes Pro aboneliği, konum ve fotoğraflar. Destek ekibine ulaş.',
    body,
    favicon: '/images/clothes-icon.png',
  });
}

/* ======================================================================
 * Yasal metinler (/privacy, /terms, /kvkk ve /tr/…)
 * ==================================================================== */

const LEGAL_PATHS = {
  en: { privacy: '/privacy', terms: '/terms', kvkk: '/kvkk' },
  tr: { privacy: '/tr/gizlilik', terms: '/tr/kosullar', kvkk: '/tr/kvkk' },
};

const p = (text) => ({ kind: 'p', html: text });
const list = (...items) => ({ kind: 'list', html: items });

/**
 * Uygulamadan gelen metinde sitede değiştirilen bölümler (başlığa göre).
 * Uygulamadaki documents.ts de aynı şekilde güncellenince buradan silinir.
 * Başlık bulunamazsa build durur: değişiklik sessizce kaybolmasın.
 */
const LEGAL_OVERRIDES = {
  en: {
    terms: {
      'Governing law': [
        p(
          `These terms are governed by the laws of the State of ${state()}, ${esc(COMPANY.country)}, without regard to its conflict-of-law rules. If you use Clothes as a consumer, this does not take away the mandatory protections of the law of the country where you live, including your right to bring a claim before the consumer courts or arbitration boards there.`,
        ),
      ],
    },
  },
  tr: {
    terms: {
      'Uygulanacak hukuk': [
        p(
          `Bu koşullar, kanunlar ihtilafı kurallarına bakılmaksızın ABD’nin ${state()} eyaleti hukukuna tabidir. Clothes’u tüketici olarak kullanıyorsan bu, yaşadığın ülkenin hukukunun sana tanıdığı zorunlu korumaları ortadan kaldırmaz; oradaki tüketici hakem heyetine ve tüketici mahkemelerine başvurma hakkın saklıdır.`,
        ),
      ],
    },
  },
};

function applyOverrides(lang, key, sections) {
  const overrides = LEGAL_OVERRIDES[lang]?.[key] ?? {};
  for (const heading of Object.keys(overrides)) {
    if (!sections.some((section) => section.heading === heading)) {
      throw new Error(`content/legal.json: "${lang}/${key}" içinde "${heading}" bölümü yok (LEGAL_OVERRIDES).`);
    }
  }
  return sections.map((section) =>
    overrides[section.heading] ? { heading: section.heading, blocks: overrides[section.heading] } : section,
  );
}

/** Sitede metnin başına ve sonuna eklenen, şirketi tanıtan bölümler. */
function legalExtras(lang, key) {
  const en = lang === 'en';
  const who = en
    ? {
        heading: 'Who we are',
        blocks: [
          p(
            `This policy applies to the Clothes app for iPhone and Android and to this website. Both are operated by ${esc(C)} (“Shinify”, “we”, “us”), a limited liability company organized in ${state()}, ${esc(COMPANY.country)}. ${esc(C)} is the data controller for the personal data described here.`,
          ),
          p(`${esc(C)} · ${addressInline()} · ${mailto(E.privacy)}`),
        ],
      }
    : {
        heading: 'Biz kimiz',
        blocks: [
          p(
            `Bu politika iPhone ve Android için Clothes uygulamasını ve bu web sitesini kapsar. İkisini de ${esc(C)} (“Shinify”, “biz”) işletir; ${esc(C)}, ${esc(COMPANY.country === 'United States' ? 'ABD' : COMPANY.country)}’nin ${state()} eyaletinde kurulmuş bir limited şirkettir (LLC). Burada anlatılan kişisel verilerin veri sorumlusu ${esc(C)}’dir.`,
          ),
          p(`${esc(C)} · ${addressInline()} · ${mailto(E.privacy)}`),
        ],
      };
  const website = en
    ? {
        heading: 'This website',
        blocks: [
          p(
            `${esc(SITE_URL.replace(/^https:\/\/(www\.)?/, ''))} does not use cookies, analytics or advertising trackers. Our hosting provider, Vercel Inc., processes technical request data such as IP addresses and browser type to deliver and protect the site.`,
          ),
        ],
      }
    : {
        heading: 'Bu web sitesi',
        blocks: [
          p(
            `${esc(SITE_URL.replace(/^https:\/\/(www\.)?/, ''))} çerez, analiz ya da reklam takip aracı kullanmaz. Barındırma sağlayıcımız Vercel Inc., siteyi sunmak ve korumak için IP adresi ve tarayıcı türü gibi teknik istek verilerini işler.`,
          ),
        ],
      };
  const contactSection = (heading, intro, address) => ({
    heading,
    blocks: [p(`${intro} ${mailto(address)}`), p(`${esc(C)} · ${addressInline()}`)],
  });

  if (key === 'privacy') {
    return {
      before: [who],
      after: [
        website,
        en
          ? contactSection('Contact', 'Questions about this policy or requests about your data:', E.privacy)
          : contactSection('İletişim', 'Bu politika hakkındaki soruların ve verinle ilgili talepler için:', E.privacy),
      ],
    };
  }
  if (key === 'terms') {
    return {
      before: [
        en
          ? {
              heading: 'Agreement',
              blocks: [
                p(
                  `These Terms of Use are an agreement between you and ${esc(C)}, a limited liability company organized in ${state()}, ${esc(COMPANY.country)}, which develops and publishes Clothes.`,
                ),
              ],
            }
          : {
              heading: 'Taraflar',
              blocks: [
                p(
                  `Bu Kullanım Koşulları seninle Clothes’u geliştiren ve yayımlayan ${esc(C)} (ABD, ${state()} eyaletinde kurulu limited şirket) arasındaki sözleşmedir.`,
                ),
              ],
            },
      ],
      after: [
        en
          ? {
              heading: 'App stores',
              blocks: [
                p(
                  'If you get Clothes from the App Store or Google Play, that store’s terms also apply to your download and your purchases.',
                ),
              ],
            }
          : {
              heading: 'Uygulama mağazaları',
              blocks: [
                p('Clothes’u App Store ya da Google Play’den indirirsen, indirmen ve satın alımların için o mağazanın koşulları da geçerlidir.'),
              ],
            },
        en
          ? contactSection('Contact', 'Questions about these terms:', E.support)
          : contactSection('İletişim', 'Bu koşullarla ilgili soruların için:', E.support),
      ],
    };
  }
  // kvkk
  return {
    before: [],
    after: [
      en
        ? {
            heading: 'How to make a request',
            blocks: [
              p(
                `Send requests under Article 11 of the KVKK to ${mailto(E.privacy)} from the email address on your account, or in writing to ${esc(C)}, ${addressInline()}.`,
              ),
            ],
          }
        : {
            heading: 'Başvuru',
            blocks: [
              p(
                `KVKK’nın 11. maddesindeki taleplerini hesabına kayıtlı e-posta adresinden ${mailto(E.privacy)} adresine ya da yazılı olarak ${esc(C)}, ${addressInline()} adresine gönderebilirsin.`,
              ),
            ],
          },
    ],
  };
}

const LEGAL_LEADS = {
  en: {
    privacy: `How ${C} handles personal data in the Clothes app for iPhone and Android and on this website.`,
    terms: `The agreement between you and ${C} for using the Clothes app.`,
    kvkk: 'Information notice under Türkiye’s Law No. 6698 on the Protection of Personal Data (KVKK) for users of the Clothes app.',
  },
  tr: {
    privacy: `${C}’nin iPhone ve Android için Clothes uygulamasında ve bu web sitesinde kişisel verileri nasıl işlediği.`,
    terms: `Clothes uygulamasını kullanman için ${C} ile aranızdaki sözleşme.`,
    kvkk: '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Clothes kullanıcıları için aydınlatma metni.',
  },
};

function renderBlocks(blocks) {
  return blocks
    .map((block) => {
      if (block.kind === 'p') return `<p>${block.html ?? esc(block.text)}</p>`;
      const items = block.html ?? block.items.map(esc);
      return `<ul>\n                ${items.map((item) => `<li>${item}</li>`).join('\n                ')}\n              </ul>`;
    })
    .join('\n              ');
}

function legal(lang, key) {
  const en = lang === 'en';
  const doc = LEGAL.docs[lang][key];
  const extras = legalExtras(lang, key);
  const sections = [...extras.before, ...applyOverrides(lang, key, doc.sections), ...extras.after];
  const toc = sections
    .map((section, i) => `<li><a href="#s${i + 1}">${esc(section.heading)}</a></li>`)
    .join('\n                ');
  const articles = sections
    .map(
      (section, i) => `<section id="s${i + 1}">
              <h2>${esc(section.heading)}</h2>
              ${renderBlocks(section.blocks)}
            </section>`,
    )
    .join('\n            ');
  const other = en ? 'tr' : 'en';
  const alt = LEGAL_PATHS[other][key];
  const updated = LEGAL.updated[lang];

  const body = `${pageHero({
    label: en ? 'LEGAL' : 'YASAL',
    title: esc(doc.title),
    lead: esc(LEGAL_LEADS[lang][key]),
    extra: `\n          <p class="t-caption">${en ? 'Last updated' : 'Son güncelleme'}: ${esc(updated)} · <a href="${alt}" hreflang="${other}" lang="${other}">${en ? 'Türkçe' : 'English'}</a></p>`,
  })}

      <section class="section">
        <div class="wrap doc">
          <nav class="card card--flat toc" aria-label="${en ? 'Contents' : 'İçindekiler'}">
            <p class="t-label">${en ? 'CONTENTS' : 'İÇİNDEKİLER'}</p>
            <ol>
                ${toc}
            </ol>
          </nav>
          <article class="prose doc__body">
            ${articles}
          </article>
        </div>
      </section>`;

  return page({
    lang,
    path: LEGAL_PATHS[lang][key],
    alt,
    title: `${doc.title} — Clothes by ${C}`,
    description: LEGAL_LEADS[lang][key],
    body,
  });
}

/* ======================================================================
 * Hesap silme (/delete-account, /tr/hesap-silme)
 * ==================================================================== */

function deletion(lang) {
  const en = lang === 'en';
  const subject = en ? 'Account deletion request' : 'Hesap silme talebi';
  const sections = en
    ? [
        {
          heading: 'Delete in the app',
          blocks: [
            p('Open Clothes, go to <b>Profile &gt; Delete account</b> and type <b>DELETE</b> to confirm. Deletion happens immediately, for signed-in and guest accounts alike.'),
          ],
        },
        {
          heading: 'Delete without the app',
          blocks: [
            p(
              `If you can’t open the app, email ${mailto(E.support, subject)} from the email address on your account with the subject “${subject}”. We complete the request within 30 days and confirm it by email.`,
            ),
          ],
        },
        {
          heading: 'What gets deleted',
          blocks: [
            list(
              'Your account and sign-in methods',
              'All items and photos in your wardrobe',
              'Scored outfits, scores and feedback',
              'Your wear log, “How was it?” replies, preferences and consent records',
            ),
            p(
              'Deletion is permanent; we keep no copy. We also ask our AI provider to delete batch tagging results, which expire on their own within 29 days. Your App Store or Google Play subscription is not canceled automatically: cancel it in your store account so billing stops.',
            ),
          ],
        },
      ]
    : [
        {
          heading: 'Uygulamadan sil',
          blocks: [p('Clothes’u aç, <b>Profil &gt; Hesabı sil</b>’e dokun, onay için <b>SİL</b> yaz. Silme hemen yapılır; misafir hesaplar için de aynıdır.')],
        },
        {
          heading: 'Uygulama olmadan',
          blocks: [
            p(
              `Uygulamaya erişemiyorsan ${mailto(E.support, subject)} adresine, hesabındaki e-posta adresinden “${subject}” konulu bir e-posta gönder. Talebin en geç 30 gün içinde tamamlanır ve sana e-postayla bildirilir.`,
            ),
          ],
        },
        {
          heading: 'Neler silinir',
          blocks: [
            list(
              'Hesabın ve giriş yöntemlerin',
              'Gardırobundaki parçalar ve fotoğrafları',
              'Kombinlerin, skorların ve yorumları',
              'Giyim günlüğün, “Nasıldı?” cevapların, tercihlerin ve rıza kayıtların',
            ),
            p(
              'Silme kalıcıdır; kopya saklamayız. Yapay zekâ sağlayıcısındaki toplu etiketleme sonuçlarının silinmesini de isteriz; bunlar en geç 29 günde kendiliğinden silinir. App Store ya da Google Play aboneliğin kendiliğinden iptal olmaz: ödemenin durması için mağaza hesabından iptal et.',
            ),
          ],
        },
      ];

  const articles = sections
    .map(
      (section, i) => `<section id="s${i + 1}">
              <h2>${esc(section.heading)}</h2>
              ${renderBlocks(section.blocks)}
            </section>`,
    )
    .join('\n            ');

  const body = `${pageHero({
    label: en ? 'ACCOUNT' : 'HESAP',
    title: en ? 'Delete your Clothes account' : 'Clothes hesabını sil',
    lead: en
      ? 'You can delete your account and all of its data at any time, in the app or by email.'
      : 'Hesabını ve bütün verilerini istediğin zaman uygulamadan ya da e-postayla silebilirsin.',
  })}

      <section class="section">
        <div class="wrap doc doc--single">
          <article class="prose doc__body">
            ${articles}
          </article>
        </div>
      </section>`;

  return page({
    lang,
    path: en ? '/delete-account' : '/tr/hesap-silme',
    alt: en ? '/tr/hesap-silme' : '/delete-account',
    title: en ? `Delete your Clothes account — ${C}` : `Clothes hesabını sil — ${C}`,
    description: en
      ? 'How to delete your Clothes account and data, in the app or by email, and what gets deleted.'
      : 'Clothes hesabını ve verilerini uygulamadan ya da e-postayla silme ve neyin silindiği.',
    body,
    favicon: '/images/clothes-icon.png',
  });
}

/* ======================================================================
 * Clothes (/clothes, /tr)
 * ==================================================================== */

function clothes(lang) {
  const en = lang === 'en';
  const body = `      <section class="hero">
        <div class="wrap">
          <div class="hero__copy">
            <p class="t-label">${en ? 'WARDROBE AND OUTFITS' : 'GARDIROP VE KOMBİN'}</p>
            <h1 class="t-display">${
              en
                ? 'What should I wear today? <em>The answer is in your own wardrobe.</em>'
                : 'Bugün ne giysem? <em>Cevabı kendi gardırobunda.</em>'
            }</h1>
            <p class="t-body hero__lead">
              ${
                en
                  ? 'Photograph your pieces once. Every morning Clothes checks the weather, suggests an outfit from your wardrobe and scores what you wear on five axes.'
                  : 'Parçalarını bir kez fotoğrafla. Clothes her sabah havaya bakar, gardırobundan bir kombin önerir ve giydiğini beş eksende puanlar.'
              }
            </p>
            ${heroActions(lang)}
          </div>

          <div class="hero__stage">
${fragment(en ? 'phone-en.html' : 'phone-tr.html').trimEnd()}
          </div>
        </div>
      </section>

${fragment(en ? 'clothes-en.html' : 'clothes-tr.html').trimEnd()}

      <section class="section" id="${en ? 'download' : 'indir'}">
        <div class="wrap">
          ${storeCta(lang)}
        </div>
      </section>`;

  return page({
    lang,
    path: en ? '/clothes' : '/tr',
    alt: en ? '/tr' : '/clothes',
    title: en ? `Clothes — Wardrobe and outfit app by ${C}` : 'Clothes — Gardırop ve kombin uygulaması',
    description: en
      ? 'Clothes learns your wardrobe, suggests an outfit for the weather every morning and scores the outfit you wear on five axes. For iPhone and Android.'
      : 'Clothes gardırobunu tanır, her sabah havaya göre kombin önerir ve giydiğin kombini beş eksende puanlar. iPhone ve Android için.',
    body,
    favicon: '/images/clothes-icon.png',
  });
}

/* ======================================================================
 * 404
 * ==================================================================== */

function notFound() {
  const body = `      <section class="section page-404">
        <div class="wrap">
          <div class="card card--obsidian cta">
            <p class="t-label" style="color: var(--obsidian-textSecondary)">404</p>
            <h1 class="t-section">This page doesn’t exist.</h1>
            <p class="t-body">The address may have moved, or it never existed. <span lang="tr">Aradığın sayfa bulunamadı.</span></p>
            <div class="actions">
              <a class="btn btn--onDarkPrimary" href="/">Go to the home page</a>
              <a class="btn btn--onDark" href="/tr" hreflang="tr" lang="tr">Türkçe Clothes sayfası</a>
            </div>
          </div>
        </div>
      </section>`;
  return page({
    lang: 'en',
    path: '/404',
    title: `Page not found — ${C}`,
    description: 'This page could not be found.',
    body,
    noindex: true,
  });
}

/* ======================================================================
 * Liste
 * ==================================================================== */

const file = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}/index.html`);

export function pages() {
  const list = [
    ['/', home()],
    ['/about', about()],
    ['/contact', contact()],
    ['/clothes', clothes('en')],
    ['/support', support('en')],
    ['/privacy', legal('en', 'privacy')],
    ['/terms', legal('en', 'terms')],
    ['/kvkk', legal('en', 'kvkk')],
    ['/delete-account', deletion('en')],
    ['/tr', clothes('tr')],
    ['/tr/destek', support('tr')],
    ['/tr/gizlilik', legal('tr', 'privacy')],
    ['/tr/kosullar', legal('tr', 'terms')],
    ['/tr/kvkk', legal('tr', 'kvkk')],
    ['/tr/hesap-silme', deletion('tr')],
  ].map(([path, html]) => ({ path, file: file(path), html, sitemap: true }));
  list.push({ path: '/404', file: '404.html', html: notFound(), sitemap: false });
  return list;
}
