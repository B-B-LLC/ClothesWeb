# ClothesWeb

Clothes uygulamasının tanıtım sitesi: uygulamayı anlatır ve App Store ile
Google Play'e yönlendirir. Tek sayfalık statik site, derleme adımı yok.

```
index.html     sayfa
styles.css     tasarım (Warm Editorial Wardrobe)
favicon.svg
fonts/         EB Garamond ve DM Sans (Türkçe Latin alt kümesi, SIL OFL)
```

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
