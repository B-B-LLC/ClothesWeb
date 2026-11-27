# ClothesWeb — shinifyllc.com

Shinify LLC'nin kurumsal sitesi ve Clothes uygulamasının tanıtım, destek ve
yasal sayfaları. Statik site; Vercel'de derleme adımı yok, sayfalar depoda
üretilmiş halde duruyor.

Apple Developer Program kuruluş başvurusu sitenin şirkete ait olduğunu,
çalıştığını ve yeterli içerik taşıdığını kontrol ediyor. Bu yüzden kökte
şirket sayfası var; yasal ad, adres, telefon ve e-posta her sayfanın alt
bilgisinde ve Hakkında / İletişim sayfalarında yazıyor. Bu bilgiler D-U-N-S
kaydıyla birebir aynı olmalı.

## Sayfalar

| Adres | Sayfa |
|---|---|
| `/` | Shinify LLC ana sayfası |
| `/about`, `/contact` | Şirket hakkında, iletişim |
| `/clothes`, `/tr` | Clothes tanıtımı (İngilizce, Türkçe) |
| `/support`, `/tr/destek` | Clothes destek ve sık sorulanlar |
| `/privacy`, `/tr/gizlilik` | Gizlilik politikası |
| `/terms`, `/tr/kosullar` | Kullanım koşulları |
| `/kvkk`, `/tr/kvkk` | KVKK aydınlatma metni |
| `/delete-account`, `/tr/hesap-silme` | Hesap silme (Google Play bu adresi istiyor) |

Eski adresler `vercel.json` içinde yönleniyor: `/en` → `/clothes`,
`/gizlilik` → `/tr/gizlilik`, `/kosullar` → `/tr/kosullar`,
`/hesap-silme` → `/tr/hesap-silme`.

App Store Connect'e: Support URL `https://www.shinifyllc.com/support`,
Privacy Policy URL `https://www.shinifyllc.com/privacy`, Marketing URL
`https://www.shinifyllc.com/clothes`.

## Düzenleme

Yayındaki HTML dosyaları (`index.html`, `about/index.html`, `tr/…`, `404.html`,
`sitemap.xml`, `robots.txt`) **elle düzenlenmez**; `build.mjs` onları `src/`
altındaki kaynaklardan üretir:

```
src/company.mjs        şirket bilgileri ve mağaza adresleri (tek kaynak)
src/pages.mjs          bütün sayfaların metni
src/lib.mjs            <head>, üst menü, alt bilgi, ortak bloklar
src/fragments/         ikon/giysi çizimleri, telefon görseli, Clothes bölümleri
content/legal.json     yasal metinler (uygulamadan alınan kopya)
styles.css             tasarım (elle düzenlenir)
```

Değişiklikten sonra:

```bash
node build.mjs
```

Boş kalan şirket bilgileri sayfalarda sarı yer tutucu olarak görünür ve komut
hangilerinin boş olduğunu listeler. Node 23 ya da üstü gerekir.

### Yasal metinler

Gizlilik, koşullar ve KVKK metinleri uygulamanın kendisinden geliyor
(`Clothes/src/features/legal/documents.ts`); uygulama içindeki metinle sitedeki
aynı kalsın diye oradan alınıyor:

```bash
node build.mjs --sync-legal ../Clothes
```

Bu komut `content/legal.json`'u yeniler. Uygulamadaki veri sorumlusu adı şirket
adından farklıysa uyarır ve sitede `src/company.mjs`'teki adı yazar. Sitede
metnin başına ve sonuna şirketi tanıtan ve iletişim veren bölümler eklenir
(`src/pages.mjs` → `legalExtras`).

### Mağaza bağlantıları

`src/company.mjs` içindeki `STORE` boşken Clothes sayfaları "Yakında" der ve
indirme düğmesi göstermez (işlemeyen düğme Apple incelemesinde sorun olur).
Adresler yazılıp `node build.mjs` çalıştırılınca App Store ve Google Play
düğmeleri görünür.

## Vercel

Repo Vercel'e bağlı; `main`'e her push yayına çıkar, diğer dallar önizleme
adresi alır. `vercel.json`: framework "Other", çıktı dizini kök (`.`),
uzantısız adresler, yönlendirmeler, güvenlik başlıkları ve önbellek.
`.vercelignore` README'yi, `build.mjs`'i, `src/` ve `content/`'i yayından
çıkarır. `shinifyllc.com` → `www.shinifyllc.com` yönlendirmesi alan adı
ayarında.

## Yerelde bakmak

```bash
python -m http.server 4173
```

Sonra `http://localhost:4173`. Sayfalar klasör + `index.html` düzeninde olduğu
için `/about` gibi adresler yerelde de açılır (yönlendirmeler ve 404 sayfası
yalnızca Vercel'de çalışır).

## Tasarım

Uygulamayla aynı tasarım sistemi (Warm Editorial Wardrobe). `styles.css`
içindeki renk, gölge ve köşe değerleri uygulamanın tema dosyasının kopyası;
bileşen sınıfları (`.card`, `.btn`, `.chip`, `.pill`, `.tile`, `.meter`,
`.progress`) uygulamadaki karşılıklarının ölçüleriyle yazıldı. Şirket sayfaları
için eklenenler `styles.css` içinde "Şirket sayfaları" başlığı altında.

Telefon görseli bir ekran görüntüsü değil; aynı bileşenlerle çizilmiş iOS Ana
Sayfa'sı. Parça görselleri çizim, ekrandaki veriler temsilidir.
`images/clothes-icon.png` uygulamanın gerçek ikonu (256 px).
