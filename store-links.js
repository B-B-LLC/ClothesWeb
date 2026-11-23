/*
 * MAĞAZA BAĞLANTILARI
 * Uygulama yayınlanınca bu iki satırı doldur; Türkçe ve İngilizce sayfadaki
 * bütün "App Store" ve "Google Play" düğmeleri buradan beslenir.
 * Boş kalan düğme sayfanın "İndir" / "Download" bölümüne gider.
 */
var STORE_URLS = {
  ios: '', // App Store adresi
  android: '', // Google Play adresi
};

document.querySelectorAll('[data-store]').forEach(function (link) {
  var url = STORE_URLS[link.getAttribute('data-store')];
  if (url) {
    link.href = url;
    link.rel = 'noopener';
  }
});
