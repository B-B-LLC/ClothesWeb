# ClothesWeb

Clothes uygulamasının tanıtım sitesi: uygulamayı anlatır ve App Store ile
Google Play'e yönlendirir. Tek sayfalık statik site, derleme adımı yok.

```
index.html     sayfa
404.html       bulunamayan adresler için sayfa
styles.css     tasarım (Warm Editorial Wardrobe)
favicon.svg
fonts/         EB Garamond ve DM Sans (Türkçe Latin alt kümesi, SIL OFL)
vercel.json    Vercel ayarları
```

## Vercel

Repo Vercel'e bağlı; `main`'e her push yayına çıkar, diğer dallar önizleme
adresi alır. Derleme adımı yok, kök dizin olduğu gibi yayınlanır.

`vercel.json` proje ayarlarının üstüne yazar: framework "Other", çıktı dizini
kök (`.`), `.html` uzantısız adresler, güvenlik başlıkları ve fontlar için uzun
önbellek. Vercel panelinde Framework Preset "Other", Build Command ve Output
Directory boş kalabilir. `.vercelignore` README'yi yayından çıkarır.

Bulunamayan her adreste `404.html` açılır; bu sayfa her yolda çalışsın diye
içindeki bağlantılar köke göre (`/styles.css`) yazıldı.

## Mağaza bağlantıları

`index.html`'in sonundaki `STORE_URLS` içine yazılır; sayfadaki dört düğme
(üstte iki, altta iki) oradan beslenir. Boş bırakılan düğme sayfanın "İndir"
bölümüne gider.

```js
var STORE_URLS = {
  ios: '', // App Store adresi
  android: '', // Google Play adresi
};
```

## Yerelde bakmak

```bash
python -m http.server 4173
```

Sonra `http://localhost:4173`.

## Tasarım

Uygulamayla aynı tasarım sistemi. `styles.css` içindeki renk, gölge ve köşe
değerleri uygulamanın tema dosyasının kopyası; bileşen sınıfları (`.card`,
`.btn`, `.chip`, `.pill`, `.tile`, `.meter`, `.progress`) uygulamadaki
karşılıklarının ölçüleriyle yazıldı. Uygulamanın teması değişirse buradaki
değerler elle güncellenir.

Telefon görseli bir ekran görüntüsü değil; aynı bileşenlerle çizilmiş iOS Ana
Sayfa'sı. Parça görselleri çizim, ekrandaki veriler (şehir, sıcaklık, parça
adları, puanlar) temsilidir.
