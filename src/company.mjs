/**
 * ŞİRKET BİLGİLERİ: sitenin her sayfası (alt bilgi, Hakkında, İletişim, yasal
 * metinler) buradan beslenir. Değiştirdikten sonra `node build.mjs` çalıştır.
 *
 * Apple kuruluş başvurusunu sitedeki bilgilerle D-U-N-S kaydını karşılaştırarak
 * inceliyor: yasal ad, adres ve telefon D-U-N-S'teki ile BİREBİR aynı yazılmalı.
 *
 * `null` bırakılan alan sayfada sarı bir yer tutucu olarak görünür ve
 * `node build.mjs` hangi alanların boş kaldığını listeler.
 */

/** Sitenin asıl adresi (canonical, hreflang, sitemap). Apex adres buraya yönleniyor. */
export const SITE_URL = 'https://www.shinifyllc.com';

export const COMPANY = {
  legalName: 'Shinify LLC',
  name: 'Shinify',
  /** Kuruluş türü, İngilizce sayfalarda olduğu gibi. */
  entity: 'Limited liability company (LLC)',
  /** Kuruluş eyaleti, ör. 'Wyoming', 'Delaware', 'New Mexico'. */
  state: 'Wyoming',
  country: 'United States',
  /** Kuruluş yılı, ör. '2026'. */
  founded: '2024',
  /** D-U-N-S kaydındaki adres, satır satır: ['30 N Gould St Ste R', 'Sheridan, WY 82801', 'United States']. */
  address: ['30 N Gould St, Ste N', 'Sheridan, WY 82801', 'United States'],
  /** Apple'ın doğrulama için arayabileceği numara, uluslararası biçimde: '+1 307 555 0100'. */
  phone: '+90 531 085 12 44',
  /**
   * E-postalar alan adında olmalı ve Google Workspace'te açık olmalı. Şimdilik
   * tek kutu var; üçü aynıyken İletişim sayfası tek kart gösterir. Ayrı adres
   * açılırsa (hello@, privacy@) buraya yazmak yeter.
   */
  email: {
    general: 'support@shinifyllc.com',
    support: 'support@shinifyllc.com',
    privacy: 'support@shinifyllc.com',
  },
  /** Yanıt saatleri (İletişim sayfası). */
  hours: {
    en: 'Monday to Friday, 09:00–18:00 (UTC+3)',
    tr: 'Pazartesi–Cuma, 09:00–18:00 (TSİ)',
  },
  /** Kurucu ya da yetkili kişiler (Hakkında sayfası). */
  people: [{ name: 'Boran Sari', role: { en: 'Founder and Managing Member', tr: 'Kurucu ve Yönetici Üye' } }],
};

/**
 * MAĞAZA BAĞLANTILARI. Boşken Clothes sayfaları "Yakında" der; doldurulunca
 * App Store ve Google Play düğmeleri kendiliğinden görünür.
 */
export const STORE = {
  ios: '',
  android: '',
};
