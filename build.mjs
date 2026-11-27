#!/usr/bin/env node
/**
 * Siteyi üretir: src/ altındaki kaynaklardan yayındaki HTML dosyalarını,
 * sitemap.xml ve robots.txt'yi yazar. Vercel'de derleme adımı yok; üretilen
 * dosyalar depoya işlenir ve olduğu gibi yayınlanır.
 *
 *   node build.mjs                          sayfaları üret
 *   node build.mjs --sync-legal ../Clothes  önce yasal metinleri uygulamadan al
 *
 * --sync-legal, uygulama deposundaki src/features/legal/documents.ts'i okuyup
 * content/legal.json'a yazar (uygulama içindeki metinle sitedeki metin aynı
 * kalsın diye). Node 23+ gerekir (TypeScript tipleri kendiliğinden ayıklanır).
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { COMPANY, SITE_URL } from './src/company.mjs';

const root = import.meta.dirname;
const args = process.argv.slice(2);

function write(relative, contents) {
  const target = join(root, relative);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, contents);
}

if (args[0] === '--sync-legal') {
  const app = resolve(args[1] ?? join(root, '..', 'Clothes'));
  const source = join(app, 'src', 'features', 'legal', 'documents.ts');
  const legal = await import(pathToFileURL(source).href);
  const data = {
    source: 'Clothes/src/features/legal/documents.ts',
    version: legal.LEGAL_VERSION,
    updated: { tr: legal.LEGAL_UPDATED, en: legal.LEGAL_UPDATED_EN },
    docs: { tr: legal.LEGAL_DOCUMENTS, en: legal.LEGAL_DOCUMENTS_EN },
  };
  let json = JSON.stringify(data, null, 2);
  const appName = legal.CONTROLLER?.name;
  if (appName && appName !== COMPANY.legalName) {
    console.warn(
      `uyarı: uygulamadaki veri sorumlusu "${appName}", sitede "${COMPANY.legalName}" yazılacak. ` +
        'Uygulamadaki CONTROLLER.name de güncellenmeli.',
    );
    json = json.split(appName).join(COMPANY.legalName);
  }
  write('content/legal.json', json + '\n');
  console.log(`yasal metinler alındı: ${source} (sürüm ${data.version}, ${data.updated.tr})`);
}

// legal.json'u okuyan modül, eşitlemeden sonra yükleniyor.
const { pages } = await import('./src/pages.mjs');
const { missing } = await import('./src/lib.mjs');

const all = pages();
for (const { file, html } of all) write(file, html);

const today = new Date().toISOString().slice(0, 10);
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .filter((p) => p.sitemap)
  .map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`,
);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`${all.length} sayfa yazıldı.`);
if (missing.size) {
  console.warn(`\nBoş şirket bilgileri (src/company.mjs) — sayfalarda sarı yer tutucu olarak görünüyor:`);
  for (const label of missing) console.warn(`  - ${label}`);
}
