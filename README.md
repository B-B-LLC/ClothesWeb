# ClothesWeb

Clothes uygulamasının tanıtım sitesi: uygulamayı anlatır ve App Store ile
Google Play'e yönlendirir. Türkçe ve İngilizce tek sayfalık statik site,
derleme adımı yok.

```
index.html       Türkçe sayfa (/)
en/index.html    İngilizce sayfa (/en)
404.html         bulunamayan adresler için sayfa (iki dilli)
store-links.js   App Store ve Google Play adresleri (iki sayfa için ortak)
styles.css       tasarım (Warm Editorial Wardrobe)
favicon.svg
fonts/           EB Garamond ve DM Sans (Türkçe Latin alt kümesi, SIL OFL)
vercel.json      Vercel ayarları
```

## Vercel

Repo Vercel'e bağlı; `main`'e her push yayına çıkar, diğer dallar önizleme
adresi alır. Derleme adımı yok, kök dizin olduğu gibi yayınlanır.

`vercel.json` proje ayarlarının üstüne yazar: framework "Other", çıktı dizini
kök (`.`), `.html` uzantısız adresler, güvenlik başlıkları ve fontlar için uzun
önbellek. Vercel panelinde Framework Preset "Other", Build Command ve Output
Directory boş kalabilir. `.vercelignore` README'yi yayından çıkarır.

Bulunamayan her adreste `404.html` açılır; bu sayfa her yolda çalışsın diye
içindeki bağlantılar köke göre (`/styles.css`) yazıldı. Adres `/en` ile
başlıyorsa metni İngilizceye döner (İngilizcesi `data-en` içinde).

## İki dil

Türkçe sayfa kökte (`/`), İngilizcesi `/en`'de. İki sayfa aynı içeriğin
çevirisi; birinde metin değişince diğeri de elle güncellenir. Üstteki `EN` /
`TR` bağlantısı diğer dile geçer, otomatik dil yönlendirmesi yok.

İki sayfanın `<head>`'inde `hreflang` bağlantıları var; bunlar tam adres ister
ve şu an `https://clothesweb-one.vercel.app` yazılı. Özel alan adına geçilirse
iki sayfadaki bu üç satır güncellenir.

`en/index.html` `/en` adresinde açıldığı için içindeki dosya yolları köke göre
(`/styles.css`) yazıldı. İkon ve giysi çizimleri (`<symbol>`) iki sayfada da
aynı; Türkçe sayfadakiler değişirse İngilizceye de kopyalanır.

## Mağaza bağlantıları

`store-links.js` içindeki `STORE_URLS`'ye yazılır; iki sayfadaki bütün mağaza
düğmeleri (her sayfada dört) oradan beslenir. Boş bırakılan düğme sayfanın
"İndir" / "Download" bölümüne gider.

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

Sonra `http://localhost:4173` (Türkçe) ve `http://localhost:4173/en/`
(İngilizce).

## Tasarım

Uygulamayla aynı tasarım sistemi. `styles.css` içindeki renk, gölge ve köşe
değerleri uygulamanın tema dosyasının kopyası; bileşen sınıfları (`.card`,
`.btn`, `.chip`, `.pill`, `.tile`, `.meter`, `.progress`) uygulamadaki
karşılıklarının ölçüleriyle yazıldı. Uygulamanın teması değişirse buradaki
değerler elle güncellenir.

Telefon görseli bir ekran görüntüsü değil; aynı bileşenlerle çizilmiş iOS Ana
Sayfa'sı. Parça görselleri çizim, ekrandaki veriler (şehir, sıcaklık, parça
adları, puanlar) temsilidir.
