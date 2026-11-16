# ClothesWeb — Tasarım 2: Obsidyen

Clothes uygulamasının tanıtım sitesi için üç tasarım seçeneğinden biri.
Koyu obsidyen açılış; dört telefon açılıştan sayfaya taşar. Her sekme kendi afiş kartında, ayrıntılar koyu bantta.

Diğer seçenekler: `tasarim-1-editoryal`, `tasarim-2-obsidyen`, `tasarim-3-bento`.
Üçünde de uygulamanın dört sekmesi (Ana Sayfa, Gardırobum, Puanla, Profil)
iPhone ekranı olarak görünür; ekranlar ve bileşenler üç dalda aynıdır, değişen
sayfanın düzenidir.

```
index.html     sayfa
styles.css     ortak: tasarım token'ları, bileşenler, telefon ekranları (üç dalda aynı)
design.css     bu tasarımın sayfa düzeni
favicon.svg
fonts/         EB Garamond ve DM Sans (Türkçe Latin alt kümesi, SIL OFL)
```

## Mağaza bağlantıları

`index.html`'in sonundaki `STORE_URLS` içine yazılır; sayfadaki bütün mağaza
düğmeleri oradan beslenir. Boş bırakılan düğme sayfanın "İndir" bölümüne gider.

## Yerelde bakmak

```bash
python -m http.server 4173
```

Sonra `http://localhost:4173`.

## Tasarım

Uygulamayla aynı tasarım sistemi (Warm Editorial Wardrobe). `styles.css`
içindeki renk, gölge ve köşe değerleri uygulamanın tema dosyasının kopyası;
uygulamanın teması değişirse buradaki değerler elle güncellenir.

Telefon görselleri ekran görüntüsü değil, aynı bileşenlerle çizilmiş iOS
ekranlarıdır. Parça görselleri çizim, ekrandaki veriler temsilidir.
