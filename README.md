# ClothesWeb — Tasarım 1: Editoryal

Clothes uygulamasının tanıtım sitesi için üç tasarım seçeneğinden biri.
Açık zemin; solda başlık, sağda telefon. Dört sekme yan yana bir sırada, altında üç özellik kartı.

Diğer seçenekler: `tasarim-1-editoryal`, `tasarim-2-obsidyen`, `tasarim-3-bento`.
Üçünde de uygulamanın dört sekmesi (Ana Sayfa, Gardırobum, Puanla, Profil)
iPhone ekranı olarak görünür; ekranlar ve bileşenler üç dalda aynıdır, değişen
sayfanın düzenidir.

```
index.html     sayfa
404.html       bulunamayan adresler için sayfa
styles.css     ortak: tasarım token'ları, bileşenler, telefon ekranları (üç dalda aynı)
design.css     bu tasarımın sayfa düzeni
favicon.svg
fonts/         EB Garamond ve DM Sans (Türkçe Latin alt kümesi, SIL OFL)
vercel.json    Vercel ayarları
```

## Vercel

Repo Vercel'e bağlı; `main`'e her push yayına çıkar, diğer dallar (bu dal dahil)
önizleme adresi alır. Derleme adımı yok, kök dizin olduğu gibi yayınlanır.
Ayarlar `vercel.json` içinde; `.vercelignore` README'yi yayından çıkarır.

Bulunamayan her adreste `404.html` açılır; bu sayfa her yolda çalışsın diye
içindeki bağlantılar köke göre (`/styles.css`) yazıldı.

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
