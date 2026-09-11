// lock.js

const urlParams = new URLSearchParams(window.location.search);
const originalUrl = urlParams.get('originalUrl');

// DOM Elements
const lockCard = document.getElementById('lock-card');
const lockForm = document.getElementById('lock-form');
const passwordInput = document.getElementById('password-input');
const togglePasswordBtn = document.getElementById('toggle-password');
const eyeIcon = document.getElementById('eye-icon');
const errorMessage = document.getElementById('error-message');
const searchForm      = document.getElementById('search-form');
const searchInput     = document.getElementById('search-input');
const searchSection   = document.getElementById('search-section');
const topBar          = document.getElementById('unlocked-top-bar');

// Menu dropdown elements
const menuBtn         = document.getElementById('menu-btn');
const menuDropdown    = document.getElementById('menu-dropdown');
const menuLockBtn     = document.getElementById('menu-lock-btn');
const menuAutolockBtn = document.getElementById('menu-autolock-btn');
const menuUsernameBtn = document.getElementById('menu-username-btn');
const menuWeatherBtn  = document.getElementById('menu-weather-btn');
const menuChangePwBtn = document.getElementById('menu-changepw-btn');
const btnLangId       = document.getElementById('btn-lang-id');
const btnLangEn       = document.getElementById('btn-lang-en');
const menuHeaderLabel = document.getElementById('menu-header-label');
const menuLockLabel   = document.getElementById('menu-lock-label');
const menuAutolockLabel = document.getElementById('menu-autolock-label');
const menuUserLabel   = document.getElementById('menu-user-label');
const menuWeatherLabel= document.getElementById('menu-weather-label');
const menuPwLabel     = document.getElementById('menu-pw-label');
const menuAboutBtn    = document.getElementById('menu-about-btn');
const menuAboutLabel  = document.getElementById('menu-about-label');

// Feature Toggles Elements (ON / OFF segmented switch pills)
const pillGroupFloating       = document.getElementById('pill-group-floating');
const pillGroupShortcuts      = document.getElementById('pill-group-shortcuts');
const pillGroupQuotes         = document.getElementById('pill-group-quotes');
const menuToggleFloatingRow   = document.getElementById('menu-toggle-floating-row');
const menuToggleShortcutsRow  = document.getElementById('menu-toggle-shortcuts-row');
const menuToggleQuotesRow     = document.getElementById('menu-toggle-quotes-row');
const menuFloatingLockLabel   = document.getElementById('menu-floating-lock-label');
const menuShortcutsToggleLabel= document.getElementById('menu-shortcuts-toggle-label');
const menuQuotesToggleLabel   = document.getElementById('menu-quotes-toggle-label');

// Daily Quotes Elements
const dailyQuoteContainer = document.getElementById('daily-quote-container');
const quoteBadgeLabel     = document.getElementById('quote-badge-label');
const quoteTextEl         = document.getElementById('quote-text');
const quoteAuthorEl       = document.getElementById('quote-author');
const btnQuoteShuffle     = document.getElementById('btn-quote-shuffle');

// Quick Links & Folder Elements
const quickLinksSection   = document.getElementById('quick-links-section');
const quickLinksGrid      = document.getElementById('quick-links-grid');
const btnAddQuickLink     = document.getElementById('btn-add-quick-link');
const lblAddShortcut      = document.getElementById('lbl-add-shortcut');
const quicklinkModalOverlay   = document.getElementById('quicklink-modal-overlay');
const quicklinkModalCloseBtn  = document.getElementById('quicklink-modal-close-btn');
const quicklinkModalTitle     = document.getElementById('quicklink-modal-title');
const quicklinkTypeTabs       = document.getElementById('quicklink-type-tabs');
const btnTypeLink             = document.getElementById('btn-type-link');
const btnTypeFolder           = document.getElementById('btn-type-folder');
const quicklinkForm           = document.getElementById('quicklink-form');
const quicklinkEditIndex      = document.getElementById('quicklink-edit-index');
const quicklinkParentFolderIndex = document.getElementById('quicklink-parent-folder-index');
const quicklinkSelectedType   = document.getElementById('quicklink-selected-type');
const quicklinkNameInput      = document.getElementById('quicklink-name-input');
const quicklinkUrlGroup       = document.getElementById('quicklink-url-group');
const quicklinkUrlInput       = document.getElementById('quicklink-url-input');
const quicklinkModalFeedback  = document.getElementById('quicklink-modal-feedback');
const quicklinkSubmitBtn      = document.getElementById('quicklink-submit-btn');
const quicklinkDeleteBtn      = document.getElementById('quicklink-delete-btn');

// Floating Dock Folder Popover Elements
const dockFolderPopover       = document.getElementById('dock-folder-popover');
const dockPopoverTitle        = document.getElementById('dock-popover-title');
const dockPopoverGrid         = document.getElementById('dock-popover-grid');
const dockPopoverCloseBtn     = document.getElementById('dock-popover-close-btn');
const dockPopoverArrow        = document.querySelector('.dock-popover-arrow');

// Auto-Lock Inactivity Modal Elements
const autolockModalOverlay    = document.getElementById('autolock-modal-overlay');
const autolockModalCloseBtn   = document.getElementById('autolock-modal-close-btn');
const autolockModalTitle      = document.getElementById('autolock-modal-title');
const autolockDesc            = document.getElementById('autolock-desc');
const autolockOptionBtns      = document.querySelectorAll('.btn-autolock-opt');
const autolockFeedback        = document.getElementById('autolock-feedback');

// Weather Footer, Effects & Modal elements
const weatherEffectsLayer     = document.getElementById('weather-effects-layer');
const weatherFooter           = document.getElementById('weather-footer');
const weatherBtn              = document.getElementById('weather-btn');
const weatherIcon             = document.getElementById('weather-icon');
const weatherTemp             = document.getElementById('weather-temp');
const weatherCondition        = document.getElementById('weather-condition');
const weatherCity             = document.getElementById('weather-city');
const weatherModalOverlay     = document.getElementById('weather-modal-overlay');
const weatherModalCloseBtn    = document.getElementById('weather-modal-close-btn');
const modalGpsToggle          = document.getElementById('modal-gps-toggle');
const modalWeatherEffectsToggle = document.getElementById('modal-weather-effects-toggle');
const settingToggleEffectsTitle = document.getElementById('setting-toggle-effects-title');
const settingToggleEffectsDesc  = document.getElementById('setting-toggle-effects-desc');
const modalWeatherIcon        = document.getElementById('modal-weather-icon');
const modalWeatherTemp        = document.getElementById('modal-weather-temp');
const modalWeatherDesc        = document.getElementById('modal-weather-desc');
const modalWeatherLoc         = document.getElementById('modal-weather-loc');
const weatherModalFeedback    = document.getElementById('weather-modal-feedback');
const modalRefreshWeatherBtn  = document.getElementById('modal-refresh-weather-btn');
const copyrightFooter         = document.getElementById('copyright-footer');

// Modal "Ubah Nama Pengguna" elements
const usernameModalOverlay   = document.getElementById('username-modal-overlay');
const usernameModalCloseBtn  = document.getElementById('username-modal-close-btn');
const modalUsernameForm      = document.getElementById('modal-username-form');
const modalUsernameInput     = document.getElementById('modal-username-input');
const usernameModalFeedback  = document.getElementById('username-modal-feedback');

// Modal "Ubah Kata Sandi" elements
const modalOverlay      = document.getElementById('changepw-modal-overlay');
const modalCloseBtn     = document.getElementById('modal-close-btn');
const modalChangePwForm = document.getElementById('modal-changepw-form');
const modalOldPw        = document.getElementById('modal-old-password');
const modalNewPw        = document.getElementById('modal-new-password');
const modalConfirmPw    = document.getElementById('modal-confirm-password');
const modalFeedback     = document.getElementById('modal-feedback');

// Modal "Tentang Aplikasi" (About) elements
const aboutModalOverlay  = document.getElementById('about-modal-overlay');
const aboutModalCloseBtn = document.getElementById('about-modal-close-btn');

// Greeting Elements
const greetingPrefix = document.getElementById('greeting-prefix');
const greetingName   = document.getElementById('greeting-name');

// Update Toast Elements
const updateToast       = document.getElementById('update-toast');
const updateToastVer    = document.getElementById('update-toast-version');
const updateToastLink   = document.getElementById('update-toast-link');
const updateToastClose  = document.getElementById('update-toast-close');

// ============================================================
// INTERNATIONALIZATION (i18n) DICTIONARY
// ============================================================

let currentLang = 'en';

const i18n = {
  id: {
    // Menu
    menuTitle: 'Menu',
    menuHeader: 'Pengaturan',
    menuFloatingLock: 'Tombol Kunci',
    menuShortcutsToggle: 'Pintasan',
    menuQuotesToggle: 'Kutipan',
    menuLock: 'Kunci Layar Sekarang',
    menuLockTitle: 'Kunci Layar Sekarang (CTRL+L)',
    menuAutolock: 'Auto-Lock Saat Menganggur',
    menuUser: 'Ubah Nama',
    menuWeather: 'Pengaturan Cuaca',
    menuPw: 'Ubah Kata Sandi',
    menuAbout: 'Tentang',
    menuLangTitle: 'Bahasa',
    addShortcut: 'Pintasan',
    closeBtnTitle: 'Tutup',

    // Greeting
    greetingPagi: 'Selamat Pagi',
    greetingSiang: 'Selamat Siang',
    greetingSore: 'Selamat Sore',
    greetingMalam: 'Selamat Malam',

    // Calendar
    days: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    months: [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ],
    formatDate: (day, date, month, year) => `${day}, ${date} ${month} ${year}`,

    // Search & Lock
    searchPlaceholder: 'Cari di Google...',
    passwordPlaceholder: 'Masukkan kata sandi...',
    passwordError: 'Sandi salah. Silakan coba lagi!',
    showPasswordTitle: 'Tampilkan Kata Sandi',
    hidePasswordTitle: 'Sembunyikan Kata Sandi',
    unlockedBtn: 'Buka Kunci',

    // Toast Update
    updateToastTitle: 'Update tersedia!',
    updateToastSub: 'Versi baru siap diunduh',
    updateToastBtn: 'Unduh',
    updateToastDownloading: '⏳ Mengunduh...',
    updateToastFailed: '✗ Gagal',
    updateToastSaved: '✓ Tersimpan!',

    // Quotes ID (Expanded Curated Pool for Instant Rotation)
    quoteBadge: 'Kutipan Hari Ini',
    quoteShuffleTitle: 'Ganti Kutipan',
    quoteLoading: 'Memuat kutipan...',
    quoteUnknownAuthor: 'Anonim',
    quotes: [
      { text: "Waktu adalah aset paling berharga. Gunakan dengan bijak.", author: "Polma Sihotang" },
      { text: "Masa depan tergantung pada apa yang kamu lakukan hari ini.", author: "Mahatma Gandhi" },
      { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan.", author: "Steve Jobs" },
      { text: "Jangan menunggu kesempatan luar biasa. Raih kesempatan biasa dan buat menjadi luar biasa.", author: "Orison Swett Marden" },
      { text: "Kesuksesan berawal dari keputusan untuk mencoba.", author: "John F. Kennedy" },
      { text: "Fokus pada proses, hasil terbaik akan mengikuti.", author: "Anonim" },
      { text: "Disiplin adalah jembatan antara tujuan dan pencapaian.", author: "Jim Rohn" },
      { text: "Hari ini adalah kesempatan untuk membangun hari esok yang kamu inginkan.", author: "Ken Poirot" },
      { text: "Tindakan adalah kunci dasar dari semua kesuksesan.", author: "Pablo Picasso" },
      { text: "Bermimpilah setinggi langit, jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.", author: "Soekarno" },
      { text: "Jangan pernah berhenti belajar, karena hidup tak pernah berhenti mengajarkan.", author: "Anonim" },
      { text: "Kegagalan adalah kesempatan untuk memulai lagi dengan lebih cerdas.", author: "Henry Ford" },
      { text: "Kunci menuju kebahagiaan adalah memiliki impian; kunci menuju kesuksesan adalah mewujudkannya.", author: "James Allen" },
      { text: "Kerja keras mengalahkan bakat ketika bakat tidak bekerja keras.", author: "Tim Notke" },
      { text: "Keberanian bukanlah ketiadaan rasa takut, tetapi kemenangan atas rasa takut itu.", author: "Nelson Mandela" },
      { text: "Hidup yang tidak dipertaruhkan tidak akan pernah dimenangkan.", author: "Sutan Sjahrir" },
      { text: "Pendidikan adalah senjata paling ampuh untuk mengubah dunia.", author: "Nelson Mandela" },
      { text: "Jangan biarkan hari kemarin merenggut terlalu banyak hal hari ini.", author: "Will Rogers" },
      { text: "Sederhana dalam sikap, kaya dalam karya.", author: "Anonim" },
      { text: "Lakukan apa yang bisa kamu lakukan, dengan apa yang kamu miliki, di mana pun kamu berada.", author: "Theodore Roosevelt" },
      { text: "Ketekunan adalah kerja keras yang kamu lakukan setelah kamu lelah melakukan kerja keras yang sudah kamu lakukan.", author: "Newt Gingrich" },
      { text: "Setiap langkah kecil membawamu lebih dekat ke tujuan besarmu.", author: "Anonim" }
    ],

    // Quick Links & Folder Modal
    quicklinkAddTitle: 'Tambah Pintasan',
    quicklinkEditTitle: 'Edit Pintasan',
    quicklinkAddFolderTitle: 'Tambah Folder Baru',
    quicklinkEditFolderTitle: 'Edit Folder',
    quicklinkAddInFolderTitle: 'Tambah Pintasan ke Folder',
    quicklinkTypeLink: '🔗 Tautan',
    quicklinkTypeFolder: '📁 Folder',
    quicklinkNamePh: 'Nama Situs (misal: YouTube)',
    quicklinkFolderNamePh: 'Nama Folder (misal: Kerja, Sosmed)',
    quicklinkUrlPh: 'URL (misal: youtube.com atau https://...)',
    quicklinkSaveBtn: 'Simpan',
    quicklinkDeleteBtn: 'Hapus',
    quicklinkEmptyErr: 'Nama dan URL wajib diisi!',
    quicklinkFolderEmptyErr: 'Nama folder tidak boleh kosong!',
    quicklinkInvalidUrl: 'Format URL tidak valid (gunakan http:// atau https://)',
    folderModalDefaultTitle: 'Folder',
    folderAddShortcut: '+ Pintasan',
    folderBack: 'Kembali',
    folderBackTitle: 'Kembali ke Semua Pintasan',

    // Auto-Lock Modal
    autolockTitle: 'Auto-Lock Saat Menganggur',
    autolockDesc: 'Kunci browser secara otomatis saat tidak ada aktivitas pengguna.',
    autolockActive: (m) => m > 0 ? `✓ Kunci otomatis aktif (${m} menit tidak aktif).` : '✓ Kunci otomatis dinonaktifkan.',
    autolockOff: 'Off',
    autolock1Min: '1 Menit',
    autolock5Min: '5 Menit',
    autolock15Min: '15 Menit',
    autolock30Min: '30 Menit',
    autolock60Min: '60 Menit',

    // Username Modal
    usernameModalTitle: 'Ubah Nama Pengguna',
    usernamePlaceholder: 'Masukkan nama Anda...',
    usernameSaveBtn: 'Simpan Nama',
    usernameSuccess: 'Nama berhasil diperbarui!',
    usernameEmpty: 'Nama tidak boleh kosong!',

    // Weather Modal & Footer
    weatherSettingsTitle: 'Pengaturan Cuaca',
    weatherModalTitle: 'Pengaturan Cuaca',
    weatherGpsTitle: 'Lokasi Presisi (GPS Real-time)',
    weatherGpsDesc: 'Menggunakan GPS perangkat (memerlukan izin lokasi). Jika dinonaktifkan, lokasi dideteksi otomatis via IP jaringan.',
    weatherEffectsTitle: 'Efek Visual Cuaca Atmosferik',
    weatherEffectsDesc: 'Menampilkan efek dinamis hujan, awan, kabut, petir, atau salju pada background.',
    weatherEffectsActive: '✓ Efek visual cuaca aktif!',
    weatherEffectsDisabled: '✓ Efek visual cuaca nonaktif.',
    weatherRefreshBtn: 'Perbarui Cuaca Sekarang',
    weatherRefreshing: '⏳ Memperbarui...',
    weatherSuccess: '✓ Data cuaca berhasil diperbarui!',
    weatherGpsActive: '✓ Lokasi presisi GPS aktif!',
    weatherGpsError: 'Izin lokasi ditolak/gagal. Beralih ke deteksi IP.',
    weatherIpActive: '✓ Menggunakan deteksi IP otomatis.',
    weatherLocLabel: (city, source) => `📍 Lokasi: ${city} (${source})`,
    weatherLoading: 'Memuat cuaca...',
    weatherDefaultCity: 'Indonesia',

    // Weather Descriptions
    weather: {
      0: 'Cerah',
      1: 'Sebagian Cerah',
      2: 'Cerah Berawan',
      3: 'Berawan Tebal',
      45: 'Berkabut',
      48: 'Berkabut',
      51: 'Gerimis Ringan',
      53: 'Gerimis',
      55: 'Gerimis Lebat',
      56: 'Gerimis Dingin',
      57: 'Gerimis Dingin',
      61: 'Hujan Ringan',
      63: 'Hujan Sedang',
      65: 'Hujan Lebat',
      66: 'Hujan Beku',
      67: 'Hujan Beku',
      71: 'Bersalju',
      73: 'Salju Sedang',
      75: 'Salju Lebat',
      77: 'Butiran Salju',
      80: 'Hujan Lokal',
      81: 'Hujan Deras',
      82: 'Hujan Sangat Deras',
      85: 'Hujan Salju',
      86: 'Hujan Salju Lebat',
      95: 'Badai Petir',
      96: 'Badai Petir & Es',
      99: 'Badai Petir & Es'
    },

    // Password Modal
    pwModalTitle: 'Ubah Kata Sandi',
    oldPwPlaceholder: 'Kata sandi lama...',
    newPwPlaceholder: 'Kata sandi baru...',
    confirmPwPlaceholder: 'Konfirmasi kata sandi baru...',
    pwSaveBtn: 'Simpan Kata Sandi',
    pwSuccess: 'Kata sandi berhasil diperbarui!',
    pwMismatch: 'Konfirmasi kata sandi tidak sesuai!',
    pwOldWrong: 'Kata sandi lama salah!',

    // About Modal ID
    aboutModalTitle: 'Tentang',
    aboutTagline: 'Minimalist Privacy Browser Locker & Smart Dashboard',
    aboutPurposeTitle: '🎯 Tujuan & Fungsi',
    aboutPurposeDesc: 'Jolma CLocker dirancang untuk menjaga privasi browser saat Anda meninggalkan komputer atau bekerja di ruang publik, sekaligus menyajikan dashboard new tab yang minimalis, aesthetic, dan produktif.',
    aboutFeaturesTitle: '✨ Fitur Utama',
    aboutF1Title: 'Kunci Layar & Shortcut Instan',
    aboutF1Desc: 'Kunci seketika dengan <code>CTRL+L</code> / tombol kunci melayang dari halaman web mana pun.',
    aboutF2Title: 'Auto-Lock Saat Menganggur',
    aboutF2Desc: 'Mengunci browser secara otomatis saat tidak ada aktivitas pengguna.',
    aboutF3Title: 'Cuaca Real-time & Efek Visual',
    aboutF3Desc: 'Deteksi cuaca berbasis GPS/IP dengan efek atmosfer dinamis (hujan, awan, kabut, dll).',
    aboutF4Title: 'Pintasan & Folder Minimalis',
    aboutF4Desc: 'Akses cepat ke website favorit bergaya macOS Dock & Stack Popover.',
    aboutF5Title: 'Kutipan Inspirasi Harian',
    aboutF5Desc: 'Menampilkan kutipan motivasi yang berganti otomatis dan dapat diacak sewaktu-waktu.',
    aboutF6Title: 'Tema Dinamis 4 Waktu',
    aboutF6Desc: 'Penyesuaian estetika otomatis mengikuti waktu: Pagi, Siang, Sore, dan Malam.',
    aboutF7Title: 'Anti-Sleep & Keep Awake',
    aboutF7Desc: 'Mencegah layar dan laptop masuk mode sleep/mati otomatis saat browser sedang terkunci.',
    aboutContactTitle: '📬 Bantuan & Request Pengembangan',
    aboutContactDesc: 'Punya saran fitur, pertanyaan, atau ingin request pengembangan khusus? Hubungi saya melalui:',
    aboutEmailTitle: 'Kirim Email',
    aboutLinkedinTitle: 'Profil LinkedIn',
    aboutInstagramTitle: 'Profil Instagram',
    aboutSupportTitle: '☕ Dukung Pengembang',
    aboutSupportDesc: 'Jika Anda menyukai ekstensi ini, Anda dapat mendukung pengembangannya via Saweria.',
    aboutSaweriaTitle: 'Dukung via Saweria',
    aboutDevBy: 'Dibuat dengan ❤️ oleh <strong>Polma Sihotang</strong>',
    aboutDefaultPw: '🔑 Password Default: <strong>ganteng</strong>',
    aboutCopyright: '© 2026 Jolma CLocker • Semua Hak Dilindungi',

    // Footer
    copyrightText: '© 2026 Jolma CLocker v0.2.1 • oleh Polma Sihotang',
    copyrightTooltip: 'Klik untuk melihat Tentang Jolma CLocker'
  },
  en: {
    // Menu
    menuTitle: 'Menu',
    menuHeader: 'Settings',
    menuFloatingLock: 'Lock Button',
    menuShortcutsToggle: 'Shortcuts',
    menuQuotesToggle: 'Quotes',
    menuLock: 'Lock Screen Now',
    menuLockTitle: 'Lock Screen Now (CTRL+L)',
    menuAutolock: 'Auto-Lock Inactivity Timer',
    menuUser: 'Change Name',
    menuWeather: 'Weather Settings',
    menuPw: 'Change Password',
    menuAbout: 'About',
    menuLangTitle: 'Language',
    addShortcut: 'Shortcut',
    closeBtnTitle: 'Close',

    // Greeting
    greetingPagi: 'Good Morning',
    greetingSiang: 'Good Afternoon',
    greetingSore: 'Good Evening',
    greetingMalam: 'Good Night',

    // Calendar
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    formatDate: (day, date, month, year) => `${day}, ${month} ${date}, ${year}`,

    // Search & Lock
    searchPlaceholder: 'Search Google...',
    passwordPlaceholder: 'Enter password...',
    passwordError: 'Incorrect password. Please try again!',
    showPasswordTitle: 'Show Password',
    hidePasswordTitle: 'Hide Password',
    unlockedBtn: 'Unlock',

    // Toast Update
    updateToastTitle: 'Update available!',
    updateToastSub: 'New version ready to download',
    updateToastBtn: 'Download',
    updateToastDownloading: '⏳ Downloading...',
    updateToastFailed: '✗ Failed',
    updateToastSaved: '✓ Saved!',

    // Quotes EN (Expanded Curated Pool for Instant Rotation)
    quoteBadge: 'Daily Quote',
    quoteShuffleTitle: 'Shuffle Quote',
    quoteLoading: 'Loading quote...',
    quoteUnknownAuthor: 'Anonymous',
    quotes: [
      { text: "Time is our most valuable asset. Spend it with purpose.", author: "Polma Sihotang" },
      { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Do not wait for extraordinary circumstances. Take common occasions and make them great.", author: "Orison Swett Marden" },
      { text: "Success begins with the decision to try.", author: "John F. Kennedy" },
      { text: "Focus on the process, and the results will take care of themselves.", author: "Anonymous" },
      { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
      { text: "Today is your opportunity to build the tomorrow you want.", author: "Ken Poirot" },
      { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
      { text: "Never stop learning, because life never stops teaching.", author: "Anonymous" },
      { text: "Failure is simply the opportunity to begin again, this time more intelligently.", author: "Henry Ford" },
      { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
      { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela" },
      { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
      { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
      { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
      { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
      { text: "Your limitation—it's only your imagination.", author: "Anonymous" },
      { text: "Great things never come from comfort zones.", author: "Anonymous" }
    ],

    // Quick Links & Folder Modal
    quicklinkAddTitle: 'Add Shortcut',
    quicklinkEditTitle: 'Edit Shortcut',
    quicklinkAddFolderTitle: 'Add New Folder',
    quicklinkEditFolderTitle: 'Edit Folder',
    quicklinkAddInFolderTitle: 'Add Shortcut to Folder',
    quicklinkTypeLink: '🔗 Link',
    quicklinkTypeFolder: '📁 Folder',
    quicklinkNamePh: 'Site Name (e.g. YouTube)',
    quicklinkFolderNamePh: 'Folder Name (e.g. Work, Social)',
    quicklinkUrlPh: 'URL (e.g. https://youtube.com)',
    quicklinkSaveBtn: 'Save',
    quicklinkDeleteBtn: 'Delete',
    quicklinkEmptyErr: 'Name and URL are required!',
    quicklinkFolderEmptyErr: 'Folder name is required!',
    quicklinkInvalidUrl: 'Invalid URL format (use http:// or https://)',
    folderModalDefaultTitle: 'Folder',
    folderAddShortcut: '+ Shortcut',
    folderBack: 'Back',
    folderBackTitle: 'Back to All Shortcuts',

    // Auto-Lock Modal
    autolockTitle: 'Auto-Lock Inactivity Timer',
    autolockDesc: 'Automatically locks the browser when no user activity is detected.',
    autolockActive: (m) => m > 0 ? `✓ Auto-lock enabled (${m} min inactivity).` : '✓ Auto-lock disabled.',
    autolockOff: 'Off',
    autolock1Min: '1 Min',
    autolock5Min: '5 Min',
    autolock15Min: '15 Min',
    autolock30Min: '30 Min',
    autolock60Min: '60 Min',

    // Username Modal
    usernameModalTitle: 'Change Username',
    usernamePlaceholder: 'Enter your name...',
    usernameSaveBtn: 'Save Name',
    usernameSuccess: 'Name updated successfully!',
    usernameEmpty: 'Name cannot be empty!',

    // Weather Modal & Footer
    weatherSettingsTitle: 'Weather Settings',
    weatherModalTitle: 'Weather Settings',
    weatherGpsTitle: 'Precise Location (Real-time GPS)',
    weatherGpsDesc: 'Uses device GPS (requires location permission). If disabled, location is detected automatically via IP network.',
    weatherEffectsTitle: 'Atmospheric Weather Visual Effects',
    weatherEffectsDesc: 'Displays dynamic visual effects (rain, clouds, lightning, fog, snow, etc.) on the dashboard background.',
    weatherEffectsActive: '✓ Weather visual effects enabled!',
    weatherEffectsDisabled: '✓ Weather visual effects disabled.',
    weatherRefreshBtn: 'Refresh Weather Now',
    weatherRefreshing: '⏳ Refreshing...',
    weatherSuccess: '✓ Weather data updated successfully!',
    weatherGpsActive: '✓ GPS precise location enabled!',
    weatherGpsError: 'Location permission denied/failed. Falling back to IP.',
    weatherIpActive: '✓ Using automatic IP detection.',
    weatherLocLabel: (city, source) => `📍 Location: ${city} (${source})`,
    weatherLoading: 'Loading weather...',
    weatherDefaultCity: 'Worldwide',

    // Weather Descriptions
    weather: {
      0: 'Clear Sky',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing Rime Fog',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      55: 'Dense Drizzle',
      56: 'Freezing Drizzle',
      57: 'Freezing Drizzle',
      61: 'Slight Rain',
      63: 'Moderate Rain',
      65: 'Heavy Rain',
      66: 'Freezing Rain',
      67: 'Heavy Freezing Rain',
      71: 'Slight Snow Fall',
      73: 'Moderate Snow Fall',
      75: 'Heavy Snow Fall',
      77: 'Snow Grains',
      80: 'Rain Showers',
      81: 'Heavy Showers',
      82: 'Violent Showers',
      85: 'Slight Snow Showers',
      86: 'Heavy Snow Showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with Hail',
      99: 'Severe Thunderstorm'
    },

    // Password Modal
    pwModalTitle: 'Change Password',
    oldPwPlaceholder: 'Current password...',
    newPwPlaceholder: 'New password...',
    confirmPwPlaceholder: 'Confirm new password...',
    pwSaveBtn: 'Save Password',
    pwSuccess: 'Password updated successfully!',
    pwMismatch: 'Password confirmation does not match!',
    pwOldWrong: 'Incorrect current password!',

    // About Modal EN
    aboutModalTitle: 'About',
    aboutTagline: 'Minimalist Privacy Browser Locker & Smart Dashboard',
    aboutPurposeTitle: '🎯 Purpose & Function',
    aboutPurposeDesc: 'Jolma CLocker is designed to protect your browser privacy when stepping away from your computer or working in public spaces, while delivering a sleek, aesthetic, and productive new tab dashboard.',
    aboutFeaturesTitle: '✨ Key Features',
    aboutF1Title: 'Instant Lock & Shortcuts',
    aboutF1Desc: 'Lock instantly with <code>CTRL+L</code> / floating lock button from any webpage.',
    aboutF2Title: 'Auto-Lock Inactivity Timer',
    aboutF2Desc: 'Automatically locks the browser after a set period of user inactivity.',
    aboutF3Title: 'Real-time Weather & Atmospheric Effects',
    aboutF3Desc: 'GPS/IP-based weather forecasting with dynamic atmospheric effects (rain, clouds, fog, etc.).',
    aboutF4Title: 'Minimalist Shortcuts & Folders',
    aboutF4Desc: 'Quick access to your favorite sites with macOS-inspired Dock & Stack Popovers.',
    aboutF5Title: 'Daily Inspiring Quotes',
    aboutF5Desc: 'Displays motivational quotes that rotate automatically and can be shuffled anytime.',
    aboutF6Title: 'Dynamic 4-Time Theme Engine',
    aboutF6Desc: 'Aesthetic background adapts smoothly to Morning, Afternoon, Evening, and Night.',
    aboutF7Title: 'Anti-Sleep & Keep Awake',
    aboutF7Desc: 'Prevents display and laptop from automatically sleeping or locking while browser is locked.',
    aboutContactTitle: '📬 Support & Feature Requests',
    aboutContactDesc: 'Have questions, feature suggestions, or custom development requests? Feel free to reach out:',
    aboutEmailTitle: 'Send Email',
    aboutLinkedinTitle: 'LinkedIn Profile',
    aboutInstagramTitle: 'Instagram Profile',
    aboutSupportTitle: '☕ Support Developer',
    aboutSupportDesc: 'If you enjoy using this extension, you can support further development via Saweria.',
    aboutSaweriaTitle: 'Support via Saweria',
    aboutDevBy: 'Crafted with ❤️ by <strong>Polma Sihotang</strong>',
    aboutDefaultPw: '🔑 Default Password: <strong>ganteng</strong>',
    aboutCopyright: '© 2026 Jolma CLocker • All Rights Reserved',

    // Footer
    copyrightText: '© 2026 Jolma CLocker v0.2.1 • by Polma Sihotang',
    copyrightTooltip: 'Click to view About Jolma CLocker'
  }
};

function applyTranslations(lang) {
  currentLang = (lang === 'id' || lang === 'in') ? 'id' : 'en';
  const dict = i18n[currentLang];

  // Update Language switcher buttons state
  if (btnLangId) btnLangId.classList.toggle('active', currentLang === 'id');
  if (btnLangEn) btnLangEn.classList.toggle('active', currentLang === 'en');

  // Toast notification
  const updateToastTitleEl = document.querySelector('.update-toast-title');
  if (updateToastTitleEl) updateToastTitleEl.textContent = dict.updateToastTitle;
  if (updateToastVer && !updateToastVer.dataset.customVersion) {
    updateToastVer.textContent = dict.updateToastSub;
  }
  if (updateToastLink && !updateToastLink.dataset.isDownloading) {
    updateToastLink.textContent = dict.updateToastBtn;
  }
  if (updateToastClose) updateToastClose.title = dict.closeBtnTitle;

  // Menu button & texts
  if (menuBtn) {
    menuBtn.title = dict.menuTitle;
    const menuBtnText = menuBtn.querySelector('.menu-btn-text');
    if (menuBtnText) menuBtnText.textContent = dict.menuTitle;
  }
  if (menuHeaderLabel) menuHeaderLabel.textContent = dict.menuHeader;
  if (menuFloatingLockLabel) menuFloatingLockLabel.textContent = dict.menuFloatingLock;
  if (menuShortcutsToggleLabel) menuShortcutsToggleLabel.textContent = dict.menuShortcutsToggle;
  if (menuQuotesToggleLabel) menuQuotesToggleLabel.textContent = dict.menuQuotesToggle;
  if (menuLockLabel) menuLockLabel.textContent = dict.menuLock;
  if (menuLockBtn) menuLockBtn.title = dict.menuLockTitle || `${dict.menuLock} (CTRL+L)`;
  if (menuAutolockLabel) menuAutolockLabel.textContent = dict.menuAutolock;
  if (menuUserLabel) menuUserLabel.textContent = dict.menuUser;
  if (menuWeatherLabel) menuWeatherLabel.textContent = dict.menuWeather;
  if (menuPwLabel) menuPwLabel.textContent = dict.menuPw;
  if (menuAboutLabel) menuAboutLabel.textContent = dict.menuAbout;

  // Search & Lock Form Placeholders & Titles
  if (searchInput) searchInput.placeholder = dict.searchPlaceholder;
  if (passwordInput) passwordInput.placeholder = dict.passwordPlaceholder;
  if (errorMessage) errorMessage.textContent = dict.passwordError;
  if (togglePasswordBtn) {
    togglePasswordBtn.title = (passwordInput && passwordInput.type === 'text')
      ? dict.hidePasswordTitle
      : dict.showPasswordTitle;
  }
  const submitLockBtn = document.querySelector('.btn-pill-submit');
  if (submitLockBtn) submitLockBtn.title = dict.unlockedBtn;

  // Quick Links & Folder
  if (lblAddShortcut) lblAddShortcut.textContent = dict.addShortcut;
  if (btnTypeLink) btnTypeLink.textContent = dict.quicklinkTypeLink;
  if (btnTypeFolder) btnTypeFolder.textContent = dict.quicklinkTypeFolder;
  if (quicklinkNameInput) {
    quicklinkNameInput.placeholder = (quicklinkSelectedType && quicklinkSelectedType.value === 'folder')
      ? dict.quicklinkFolderNamePh
      : dict.quicklinkNamePh;
  }
  if (quicklinkUrlInput) quicklinkUrlInput.placeholder = dict.quicklinkUrlPh;
  if (quicklinkSubmitBtn) quicklinkSubmitBtn.textContent = dict.quicklinkSaveBtn;
  if (quicklinkDeleteBtn) quicklinkDeleteBtn.textContent = dict.quicklinkDeleteBtn;
  if (quicklinkModalCloseBtn) quicklinkModalCloseBtn.title = dict.closeBtnTitle;
  if (dockPopoverCloseBtn) dockPopoverCloseBtn.title = dict.closeBtnTitle;

  // Auto-Lock Modal
  if (autolockModalTitle) autolockModalTitle.textContent = dict.autolockTitle;
  if (autolockDesc) autolockDesc.textContent = dict.autolockDesc;
  if (autolockModalCloseBtn) autolockModalCloseBtn.title = dict.closeBtnTitle;
  autolockOptionBtns.forEach((btn) => {
    const mins = Number(btn.dataset.mins);
    if (mins === 0) btn.textContent = dict.autolockOff;
    else if (mins === 1) btn.textContent = dict.autolock1Min;
    else if (mins === 5) btn.textContent = dict.autolock5Min;
    else if (mins === 15) btn.textContent = dict.autolock15Min;
    else if (mins === 30) btn.textContent = dict.autolock30Min;
    else if (mins === 60) btn.textContent = dict.autolock60Min;
  });

  // Quotes Badge & Shuffle Tooltip
  if (quoteBadgeLabel && dict.quoteBadge) quoteBadgeLabel.textContent = dict.quoteBadge;
  if (btnQuoteShuffle && dict.quoteShuffleTitle) btnQuoteShuffle.title = dict.quoteShuffleTitle;

  if (quickLinksList && quickLinksList.length > 0) {
    renderQuickLinks(quickLinksList);
  }

  // Username Modal
  const usernameModalTitle = document.getElementById('username-modal-title');
  const modalUsernameSubmit = document.getElementById('modal-username-submit');
  if (usernameModalTitle) usernameModalTitle.textContent = dict.usernameModalTitle;
  if (usernameModalCloseBtn) usernameModalCloseBtn.title = dict.closeBtnTitle;
  if (modalUsernameInput) modalUsernameInput.placeholder = dict.usernamePlaceholder;
  if (modalUsernameSubmit) modalUsernameSubmit.textContent = dict.usernameSaveBtn;

  // Weather Modal
  const weatherModalTitle = document.getElementById('weather-modal-title');
  const settingToggleTitleEl = document.getElementById('setting-toggle-title-el');
  const settingToggleDescEl = document.getElementById('setting-toggle-desc-el');
  if (weatherModalTitle) weatherModalTitle.textContent = dict.weatherModalTitle;
  if (weatherModalCloseBtn) weatherModalCloseBtn.title = dict.closeBtnTitle;
  if (settingToggleTitleEl) settingToggleTitleEl.textContent = dict.weatherGpsTitle;
  if (settingToggleDescEl) settingToggleDescEl.textContent = dict.weatherGpsDesc;
  if (settingToggleEffectsTitle) settingToggleEffectsTitle.textContent = dict.weatherEffectsTitle;
  if (settingToggleEffectsDesc) settingToggleEffectsDesc.textContent = dict.weatherEffectsDesc;
  if (modalRefreshWeatherBtn) modalRefreshWeatherBtn.textContent = dict.weatherRefreshBtn;
  if (weatherBtn) weatherBtn.title = dict.weatherSettingsTitle;

  // Password Modal
  const changepwModalTitle = document.getElementById('changepw-modal-title');
  const modalChangepwSubmit = document.getElementById('modal-changepw-submit');
  if (changepwModalTitle) changepwModalTitle.textContent = dict.pwModalTitle;
  if (modalCloseBtn) modalCloseBtn.title = dict.closeBtnTitle;
  if (modalOldPw) modalOldPw.placeholder = dict.oldPwPlaceholder;
  if (modalNewPw) modalNewPw.placeholder = dict.newPwPlaceholder;
  if (modalConfirmPw) modalConfirmPw.placeholder = dict.confirmPwPlaceholder;
  if (modalChangepwSubmit) modalChangepwSubmit.textContent = dict.pwSaveBtn;

  // About Modal
  const aboutModalTitle = document.getElementById('about-modal-title');
  const aboutTagline = document.getElementById('about-tagline');
  const aboutPurposeTitle = document.getElementById('about-purpose-title');
  const aboutPurposeDesc = document.getElementById('about-purpose-desc');
  const aboutFeaturesTitle = document.getElementById('about-features-title');
  const aboutF1Title = document.getElementById('about-f1-title');
  const aboutF1Desc = document.getElementById('about-f1-desc');
  const aboutF2Title = document.getElementById('about-f2-title');
  const aboutF2Desc = document.getElementById('about-f2-desc');
  const aboutF3Title = document.getElementById('about-f3-title');
  const aboutF3Desc = document.getElementById('about-f3-desc');
  const aboutF4Title = document.getElementById('about-f4-title');
  const aboutF4Desc = document.getElementById('about-f4-desc');
  const aboutF5Title = document.getElementById('about-f5-title');
  const aboutF5Desc = document.getElementById('about-f5-desc');
  const aboutF6Title = document.getElementById('about-f6-title');
  const aboutF6Desc = document.getElementById('about-f6-desc');
  const aboutF7Title = document.getElementById('about-f7-title');
  const aboutF7Desc = document.getElementById('about-f7-desc');
  const aboutContactTitle = document.getElementById('about-contact-title');
  const aboutContactDesc = document.getElementById('about-contact-desc');
  const aboutSupportTitle = document.getElementById('about-support-title');
  const aboutSupportDesc = document.getElementById('about-support-desc');
  const btnAboutSaweria = document.getElementById('btn-about-saweria');
  const aboutDevBy = document.getElementById('about-dev-by');
  const aboutCopyright = document.querySelector('.about-copyright');

  if (aboutModalTitle && dict.aboutModalTitle) aboutModalTitle.textContent = dict.aboutModalTitle;
  if (aboutModalCloseBtn) aboutModalCloseBtn.title = dict.closeBtnTitle;
  if (aboutTagline && dict.aboutTagline) aboutTagline.textContent = dict.aboutTagline;
  if (aboutPurposeTitle && dict.aboutPurposeTitle) aboutPurposeTitle.textContent = dict.aboutPurposeTitle;
  if (aboutPurposeDesc && dict.aboutPurposeDesc) aboutPurposeDesc.textContent = dict.aboutPurposeDesc;
  if (aboutFeaturesTitle && dict.aboutFeaturesTitle) aboutFeaturesTitle.textContent = dict.aboutFeaturesTitle;
  if (aboutF1Title && dict.aboutF1Title) aboutF1Title.textContent = dict.aboutF1Title;
  if (aboutF1Desc && dict.aboutF1Desc) aboutF1Desc.innerHTML = dict.aboutF1Desc;
  if (aboutF2Title && dict.aboutF2Title) aboutF2Title.textContent = dict.aboutF2Title;
  if (aboutF2Desc && dict.aboutF2Desc) aboutF2Desc.textContent = dict.aboutF2Desc;
  if (aboutF3Title && dict.aboutF3Title) aboutF3Title.textContent = dict.aboutF3Title;
  if (aboutF3Desc && dict.aboutF3Desc) aboutF3Desc.textContent = dict.aboutF3Desc;
  if (aboutF4Title && dict.aboutF4Title) aboutF4Title.textContent = dict.aboutF4Title;
  if (aboutF4Desc && dict.aboutF4Desc) aboutF4Desc.textContent = dict.aboutF4Desc;
  if (aboutF5Title && dict.aboutF5Title) aboutF5Title.textContent = dict.aboutF5Title;
  if (aboutF5Desc && dict.aboutF5Desc) aboutF5Desc.textContent = dict.aboutF5Desc;
  if (aboutF6Title && dict.aboutF6Title) aboutF6Title.textContent = dict.aboutF6Title;
  if (aboutF6Desc && dict.aboutF6Desc) aboutF6Desc.textContent = dict.aboutF6Desc;
  if (aboutF7Title && dict.aboutF7Title) aboutF7Title.textContent = dict.aboutF7Title;
  if (aboutF7Desc && dict.aboutF7Desc) aboutF7Desc.textContent = dict.aboutF7Desc;
  if (aboutContactTitle && dict.aboutContactTitle) aboutContactTitle.textContent = dict.aboutContactTitle;
  if (aboutContactDesc && dict.aboutContactDesc) aboutContactDesc.textContent = dict.aboutContactDesc;
  if (aboutSupportTitle && dict.aboutSupportTitle) aboutSupportTitle.textContent = dict.aboutSupportTitle;
  if (aboutSupportDesc && dict.aboutSupportDesc) aboutSupportDesc.textContent = dict.aboutSupportDesc;
  if (btnAboutSaweria && dict.aboutSaweriaTitle) btnAboutSaweria.title = dict.aboutSaweriaTitle;
  if (aboutDevBy && dict.aboutDevBy) aboutDevBy.innerHTML = dict.aboutDevBy;
  if (aboutCopyright && dict.aboutCopyright) aboutCopyright.textContent = dict.aboutCopyright;

  const aboutDefaultPwEl = document.getElementById('about-default-pw');
  if (aboutDefaultPwEl && dict.aboutDefaultPw) aboutDefaultPwEl.innerHTML = dict.aboutDefaultPw;

  // Contact links tooltips in About modal
  const emailItem = document.querySelector('.about-contact-item[href^="mailto:"]');
  const linkedinItem = document.querySelector('.about-contact-item[href*="linkedin.com"]');
  const instagramItem = document.querySelector('.about-contact-item[href*="instagram.com"]');
  if (emailItem) emailItem.title = dict.aboutEmailTitle;
  if (linkedinItem) linkedinItem.title = dict.aboutLinkedinTitle;
  if (instagramItem) instagramItem.title = dict.aboutInstagramTitle;

  // Footer Copyright Text & Tooltip
  const copyrightTextEl = document.getElementById('copyright-text');
  if (copyrightTextEl) copyrightTextEl.textContent = dict.copyrightText;
  if (copyrightFooter && dict.copyrightTooltip) copyrightFooter.title = dict.copyrightTooltip;

  // Update Clock, Greeting, and Weather display immediately
  updateClockAndDate();
  chrome.storage.local.get('weatherCache', (data) => {
    if (data && data.weatherCache) {
      updateWeatherUI(data.weatherCache);
    }
  });
}

function setLanguage(lang) {
  currentLang = (lang === 'id' || lang === 'in') ? 'id' : 'en';
  chrome.storage.local.set({ language: currentLang }, () => {
    applyTranslations(currentLang);
    // Immediately display a new quote in the selected language
    shuffleQuote(true);
  });
}


if (btnLangId) {
  btnLangId.addEventListener('click', (e) => {
    e.stopPropagation();
    setLanguage('id');
  });
}

if (btnLangEn) {
  btnLangEn.addEventListener('click', (e) => {
    e.stopPropagation();
    setLanguage('en');
  });
}


// ---- Update Toast Logic ------------------------------------------------


function showUpdateToast(version, url) {
  updateToastVer.textContent = `Versi ${version} tersedia`;
  // Simpan URL dan versi untuk keperluan download
  updateToast.dataset.downloadUrl = url || 'https://github.com/polmaaa/jolma-clocker/archive/refs/heads/main.zip';
  updateToast.dataset.version = version;
  updateToast.classList.add('visible');
}

function hideUpdateToast() {
  updateToast.classList.remove('visible');
}

// Tombol tutup toast
updateToastClose.addEventListener('click', hideUpdateToast);

// Tombol unduh update
updateToastLink.addEventListener('click', (e) => {
  e.preventDefault();
  const targetUrl = updateToast.dataset.downloadUrl || 'https://github.com/polmaaa/jolma-clocker';
  window.open(targetUrl, '_blank');
});

// Cek storage update — HANYA dipanggil saat unlocked
function checkUpdateStorage() {
  chrome.storage.local.get(['updateAvailable', 'updateVersion', 'updateUrl'], (data) => {
    if (data.updateAvailable) {
      showUpdateToast(data.updateVersion, data.updateUrl);
    } else {
      hideUpdateToast();
    }
  });
}

// Dengarkan perubahan storage secara real-time
// Hanya tampilkan toast jika halaman sudah dalam state unlocked
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.updateAvailable) {
    // Cek dulu apakah saat ini posisi unlocked
    const storageSession = chrome.storage.session || chrome.storage.local;
    storageSession.get('unlocked', (session) => {
      const isUnlocked = !!(session && session.unlocked);
      if (!isUnlocked) return; // Jangan tampilkan saat terkunci
      if (changes.updateAvailable.newValue) {
        chrome.storage.local.get(['updateVersion', 'updateUrl'], (data) => {
          showUpdateToast(data.updateVersion, data.updateUrl);
        });
      } else {
        hideUpdateToast();
      }
    });
  }
});

// Synchronous state tracking for instant event blocking
let isCurrentlyUnlocked = false;

// Helper for updating segmented switch pills state
function updatePillGroupState(pillGroupId, isOn) {
  const group = document.getElementById(pillGroupId);
  if (!group) return;
  const btnOn = group.querySelector('[data-state="on"]');
  const btnOff = group.querySelector('[data-state="off"]');
  if (btnOn) btnOn.classList.toggle('active', !!isOn);
  if (btnOff) btnOff.classList.toggle('active', !isOn);
}

// Feature Toggles Management (Floating Lock Button, Shortcuts, Quotes)
function initFeatureToggles() {
  chrome.storage.local.get(['floatingLockBtnEnabled', 'quickLinksEnabled', 'quotesEnabled'], (data) => {
    const isFloatingEnabled = data.floatingLockBtnEnabled !== false;
    const isLinksEnabled = data.quickLinksEnabled !== false;
    const isQuotesEnabled = data.quotesEnabled !== false;

    updatePillGroupState('pill-group-floating', isFloatingEnabled);
    updatePillGroupState('pill-group-shortcuts', isLinksEnabled);
    updatePillGroupState('pill-group-quotes', isQuotesEnabled);

    applyQuickLinksVisibility(isLinksEnabled);
    applyQuotesVisibility(isQuotesEnabled);
  });

  // Setup pill group click listeners
  function setupPillToggle(groupId, storageKey, onToggle) {
    const group = document.getElementById(groupId);
    if (!group) return;

    group.addEventListener('click', (e) => {
      e.stopPropagation();
      const btn = e.target.closest('.btn-toggle-pill');
      if (!btn) return;
      const willBeOn = btn.dataset.state === 'on';
      chrome.storage.local.set({ [storageKey]: willBeOn }, () => {
        updatePillGroupState(groupId, willBeOn);
        if (typeof onToggle === 'function') onToggle(willBeOn);
      });
    });
  }

  setupPillToggle('pill-group-floating', 'floatingLockBtnEnabled');
  setupPillToggle('pill-group-shortcuts', 'quickLinksEnabled', (enabled) => {
    applyQuickLinksVisibility(enabled);
  });
  setupPillToggle('pill-group-quotes', 'quotesEnabled', (enabled) => {
    applyQuotesVisibility(enabled);
  });

  // Row clicks to toggle switch smoothly when clicking anywhere on item label/icon
  function setupRowClick(rowEl, storageKey, groupId, onToggle) {
    if (!rowEl) return;
    rowEl.querySelector('.menu-item-main')?.addEventListener('click', (e) => {
      e.stopPropagation();
      chrome.storage.local.get(storageKey, (data) => {
        const currentVal = data[storageKey] !== false;
        const newVal = !currentVal;
        chrome.storage.local.set({ [storageKey]: newVal }, () => {
          updatePillGroupState(groupId, newVal);
          if (typeof onToggle === 'function') onToggle(newVal);
        });
      });
    });
  }

  setupRowClick(menuToggleFloatingRow, 'floatingLockBtnEnabled', 'pill-group-floating');
  setupRowClick(menuToggleShortcutsRow, 'quickLinksEnabled', 'pill-group-shortcuts', (enabled) => {
    applyQuickLinksVisibility(enabled);
  });
  setupRowClick(menuToggleQuotesRow, 'quotesEnabled', 'pill-group-quotes', (enabled) => {
    applyQuotesVisibility(enabled);
  });
}

function applyQuickLinksVisibility(show) {
  if (quickLinksSection) {
    if (show && isCurrentlyUnlocked) {
      quickLinksSection.style.display = 'flex';
    } else {
      quickLinksSection.style.display = 'none';
      if (typeof closeDockFolderPopover === 'function') {
        closeDockFolderPopover();
      }
    }
  }
}

function applyQuotesVisibility(show) {
  if (dailyQuoteContainer) {
    if (show) {
      dailyQuoteContainer.classList.add('active');
      dailyQuoteContainer.style.display = 'flex';
    } else {
      dailyQuoteContainer.classList.remove('active');
      dailyQuoteContainer.style.display = 'none';
    }
  }
}

// ---- Initialize view state on load ----------------------------------------

// Initialize view state on load
document.addEventListener('DOMContentLoaded', () => {
  // Load language settings first (default: 'en')
  chrome.storage.local.get(['language', 'userName'], (data) => {
    const lang = (data && data.language) || 'en';
    applyTranslations(lang);
  });

  // Start Clock and Date immediately
  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);

  // Initialize new feature modules
  initFeatureToggles();
  initDailyQuotes();
  initQuickLinks();
  initAutoLock();

  // Verify session lock state
  const storageSession = chrome.storage.session || chrome.storage.local;
  storageSession.get('unlocked', (session) => {
    const isUnlocked = !!(session && session.unlocked);
    updateLockerState(isUnlocked);
  });
});

// Helper: Transitions elements between locked and unlocked views
function updateLockerState(isUnlocked) {
  isCurrentlyUnlocked = !!isUnlocked;

  if (isUnlocked) {
    // Release keyboard lock & restore window state
    releaseKeyboardLock();
    chrome.runtime.sendMessage({ action: 'exitFullscreen' });

    if (originalUrl) {
      // Redirect to original page
      window.location.href = originalUrl;
    } else {
      // Transition to simple unlocked search dashboard
      lockCard.classList.remove('active');
      errorMessage.classList.remove('visible');

      // Delay showing search elements slightly for smooth transition
      setTimeout(() => {
        searchSection.classList.add('active');
        topBar.classList.add('active');
        if (weatherFooter) weatherFooter.classList.add('active');
        if (copyrightFooter) copyrightFooter.classList.add('active');

        // Check feature toggles for Quotes and Quick Links
        chrome.storage.local.get(['quickLinksEnabled', 'quotesEnabled'], (feat) => {
          const showLinks = feat && feat.quickLinksEnabled !== false;
          const showQuotes = feat && feat.quotesEnabled !== false;
          applyQuotesVisibility(showQuotes);
          applyQuickLinksVisibility(showLinks);
        });

        searchInput.focus();
      }, 200);

      // Muat data cuaca terkini
      loadWeather();

      // Cek & tampilkan toast update hanya saat terbuka
      checkUpdateStorage();
    }
  } else {
    // Request keyboard lock on lock screen
    requestKeyboardLock();

    // Transition to locked state — sembunyikan toast update & search/topbar & widgets modal
    hideUpdateToast();
    searchSection.classList.remove('active');
    topBar.classList.remove('active');

    // Tampilkan footer cuaca, copyright, dan kutipan (jika aktif) saat layar terkunci
    if (weatherFooter) weatherFooter.classList.add('active');
    if (copyrightFooter) copyrightFooter.classList.add('active');
    loadWeather();

    chrome.storage.local.get('quotesEnabled', (feat) => {
      const showQuotes = feat && feat.quotesEnabled !== false;
      applyQuotesVisibility(showQuotes);
    });

    applyQuickLinksVisibility(false);
    closeWeatherModal();
    closeUsernameModal();
    closeModal();
    closeAutoLockModal();
    closeQuickLinkModal();
    closeAboutModal();

    setTimeout(() => {
      lockCard.classList.add('active');
      passwordInput.value = '';
      passwordInput.focus();
    }, 100);
  }
}

// ---- Synchronous Keyboard & Fullscreen Security Guard (Active when locked) ----

function isKeyProhibited(e) {
  if (isCurrentlyUnlocked) return false;

  const key = e.key;
  const code = e.code;
  const target = e.target;
  const isInput = target && target.id === 'password-input';

  // 1. Block Escape (mencegah keluar dari Fullscreen)
  if (key === 'Escape' || code === 'Escape') return true;

  // 2. Block Tab & Alt+Tab (mencegah berpindah fokus/tab)
  if (key === 'Tab' || code === 'Tab') return true;

  // 3. Block all Function Keys F1 - F12 (F11 Fullscreen toggle, F12 DevTools, F5 Refresh, etc.)
  if (key && /^F([1-9]|1[0-2])$/.test(key)) return true;

  // 4. Block ALL Alt combinations (Alt+Tab, Alt+F4, Alt+Left/Right, Alt+Home, Alt+Space, Alt+D, dll)
  if (e.altKey || key === 'Alt' || code === 'AltLeft' || code === 'AltRight') {
    return true;
  }

  // 5. Block Ctrl / Command (Meta) combinations
  if (e.ctrlKey || e.metaKey) {
    // Izinkan clipboard standar (Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X) HANYA di dalam input password
    if (isInput && !e.shiftKey && !e.altKey && ['a', 'c', 'v', 'x', 'A', 'C', 'V', 'X'].includes(key)) {
      return false;
    }
    // Blokir semua shortcut Ctrl lainnya (Ctrl+W tutup tab, Ctrl+T tab baru, Ctrl+N jendela baru, Ctrl+Shift+I inspect, Ctrl+U view source, Ctrl+R reload, dll)
    return true;
  }

  // 6. Jika pengguna mengetik karakter normal di luar kotak input, otomatis arahkan fokus ke password
  if (!isInput && key && key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
    if (passwordInput) {
      passwordInput.focus();
    }
  }

  return false;
}

// Intercept keydown in capture phase (synchronous)
window.addEventListener('keydown', (e) => {
  if (isKeyProhibited(e)) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    if (passwordInput && document.activeElement !== passwordInput) {
      passwordInput.focus();
    }
    return false;
  }
}, true);

// Intercept keyup in capture phase (synchronous)
window.addEventListener('keyup', (e) => {
  if (isKeyProhibited(e)) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
}, true);

// Intercept keypress in capture phase (synchronous)
window.addEventListener('keypress', (e) => {
  if (isKeyProhibited(e)) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }
}, true);

// Disable right-click context menu synchronously on lock screen
document.addEventListener('contextmenu', (e) => {
  if (!isCurrentlyUnlocked) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}, true);

// Keep focus trapped on password input when locked
document.addEventListener('click', () => {
  if (!isCurrentlyUnlocked) {
    if (passwordInput && document.activeElement !== passwordInput) {
      passwordInput.focus();
    }
  }
}, true);

window.addEventListener('focus', () => {
  if (!isCurrentlyUnlocked) {
    requestKeyboardLock();
    if (passwordInput) {
      passwordInput.focus();
    }
  }
});

document.addEventListener('fullscreenchange', () => {
  if (!isCurrentlyUnlocked) {
    requestKeyboardLock();
  }
});

// Request HTML5 Keyboard Lock API (Locks all browser keys in Fullscreen)
function requestKeyboardLock() {
  if (navigator.keyboard && navigator.keyboard.lock) {
    navigator.keyboard.lock().catch(() => {});
  }
}

function releaseKeyboardLock() {
  if (navigator.keyboard && navigator.keyboard.unlock) {
    navigator.keyboard.unlock();
  }
}


// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    // Change eye icon paths to closed eye SVG
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    `;
  } else {
    passwordInput.type = 'password';
    // Restore open eye SVG
    eyeIcon.innerHTML = `
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    `;
  }
});

// Handle password submission locally from chrome.storage.local
lockForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = passwordInput.value;

  // Retrieve current password directly from shared storage
  chrome.storage.local.get('password', (data) => {
    const currentPassword = (data && data.password) || 'ganteng';
    if (password === currentPassword) {
      // Write the unlock state directly to session and local storage
      const storageSession = chrome.storage.session || chrome.storage.local;
      storageSession.set({ unlocked: true }, () => {
        chrome.storage.local.set({ unlocked: true }, () => {
          isCurrentlyUnlocked = true;
          releaseKeyboardLock();
          chrome.runtime.sendMessage({ action: 'exitFullscreen' }, () => {
            // Reload halaman agar transisi ke dashboard lebih bersih
            window.location.reload();
          });
        });
      });
    } else {
      // Shake animation and warning on invalid password
      errorMessage.classList.add('visible');
      lockCard.classList.add('shake');
      
      passwordInput.value = '';
      passwordInput.focus();

      setTimeout(() => {
        lockCard.classList.remove('shake');
      }, 400);
    }
  });
});

// Synchronize lock and settings state changes from storage updates in real-time
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.unlocked) {
    updateLockerState(changes.unlocked.newValue);
  }
  if (changes.floatingLockBtnEnabled !== undefined) {
    const isFloatingEnabled = changes.floatingLockBtnEnabled.newValue !== false;
    updatePillGroupState('pill-group-floating', isFloatingEnabled);
  }
  if (changes.quickLinksEnabled !== undefined) {
    const isLinksEnabled = changes.quickLinksEnabled.newValue !== false;
    updatePillGroupState('pill-group-shortcuts', isLinksEnabled);
    applyQuickLinksVisibility(isLinksEnabled);
  }
  if (changes.quotesEnabled !== undefined) {
    const isQuotesEnabled = changes.quotesEnabled.newValue !== false;
    updatePillGroupState('pill-group-quotes', isQuotesEnabled);
    applyQuotesVisibility(isQuotesEnabled);
  }
  if (changes.language) {
    applyTranslations(changes.language.newValue);
  }
  if (changes.userName) {
    updateGreeting();
  }
  if (changes.quickLinks) {
    renderQuickLinks(changes.quickLinks.newValue || []);
  }
  if (changes.appTheme || changes.customWallpaperUrl) {
    chrome.storage.local.get(['appTheme', 'customWallpaperUrl'], (d) => {
      applyTheme(d.appTheme || 'dynamic', d.customWallpaperUrl || '');
    });
  }
  if (changes.idleLockMinutes !== undefined) {
    updateAutoLockUI(Number(changes.idleLockMinutes.newValue || 0));
  }
  if (changes.weatherEffectsEnabled !== undefined) {
    chrome.storage.local.get('weatherCache', (data) => {
      if (data && data.weatherCache) {
        if (changes.weatherEffectsEnabled.newValue === false && weatherEffectsLayer) {
          weatherEffectsLayer.innerHTML = '';
          weatherEffectsLayer.dataset.currentEffect = '';
        } else {
          weatherEffectsLayer.dataset.currentEffect = '';
          renderWeatherEffects(data.weatherCache.weatherCode, data.weatherCache.isDay);
        }
      }
    });
  }
});

// ---- Menu Dropdown & Top Actions -----------------------------------------

// Toggle dropdown buka/tutup
menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menuDropdown.classList.toggle('open');
  menuBtn.classList.toggle('active');
});

// Tutup dropdown jika klik di luar area menu
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
    closeDropdown();
  }
});

function closeDropdown() {
  menuDropdown.classList.remove('open');
  menuBtn.classList.remove('active');
}

// Opsi: Kunci Layar Sekarang (Action Button)
if (menuLockBtn) {
  menuLockBtn.addEventListener('click', () => {
    closeDropdown();
    chrome.runtime.sendMessage({ action: 'lockBrowser' });
  });
}

// Opsi: Auto-Lock Timer
if (menuAutolockBtn) {
  menuAutolockBtn.addEventListener('click', () => {
    closeDropdown();
    openAutoLockModal();
  });
}

// Opsi: Ubah Nama Pengguna → buka modal nama
menuUsernameBtn.addEventListener('click', () => {
  closeDropdown();
  openUsernameModal();
});

// Opsi: Pengaturan Cuaca → buka modal cuaca
menuWeatherBtn.addEventListener('click', () => {
  closeDropdown();
  openWeatherModal();
});

// Opsi: Ubah Kata Sandi → buka modal sandi
menuChangePwBtn.addEventListener('click', () => {
  closeDropdown();
  openModal();
});

// Opsi: Tentang Aplikasi (About) → buka modal about
if (menuAboutBtn) {
  menuAboutBtn.addEventListener('click', () => {
    closeDropdown();
    openAboutModal();
  });
}

function openAboutModal() {
  applyTranslations(currentLang);
  if (aboutModalOverlay) aboutModalOverlay.classList.add('open');
}

function closeAboutModal() {
  if (aboutModalOverlay) aboutModalOverlay.classList.remove('open');
}

if (aboutModalCloseBtn) {
  aboutModalCloseBtn.addEventListener('click', closeAboutModal);
}

if (aboutModalOverlay) {
  aboutModalOverlay.addEventListener('click', (e) => {
    if (e.target === aboutModalOverlay) {
      closeAboutModal();
    }
  });
}

// Klik bar cuaca di footer → buka modal cuaca
if (weatherBtn) {
  weatherBtn.addEventListener('click', () => {
    openWeatherModal();
  });
}

// Klik teks copyright di footer → buka modal Tentang (About)
if (copyrightFooter) {
  copyrightFooter.addEventListener('click', () => {
    openAboutModal();
  });
  copyrightFooter.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAboutModal();
    }
  });
}

// ---- Modal Ubah Nama Pengguna --------------------------------------------

function openUsernameModal() {
  applyTranslations(currentLang);
  chrome.storage.local.get('userName', (data) => {
    const currentName = (data && data.userName && data.userName.trim()) || 'Polma Sihotang';
    modalUsernameInput.value = currentName;
    usernameModalOverlay.classList.add('open');
    modalUsernameInput.focus();
    modalUsernameInput.select();
  });
}

function closeUsernameModal() {
  usernameModalOverlay.classList.remove('open');
  usernameModalFeedback.className = 'modal-feedback';
  usernameModalFeedback.textContent = '';
}

usernameModalCloseBtn.addEventListener('click', closeUsernameModal);

usernameModalOverlay.addEventListener('click', (e) => {
  if (e.target === usernameModalOverlay) closeUsernameModal();
});

modalUsernameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const dict = i18n[currentLang] || i18n.id;
  const newName = modalUsernameInput.value.trim();
  if (!newName) {
    usernameModalFeedback.className = 'modal-feedback error';
    usernameModalFeedback.textContent = dict.usernameEmpty;
    return;
  }

  chrome.storage.local.set({ userName: newName }, () => {
    usernameModalFeedback.className = 'modal-feedback success';
    usernameModalFeedback.textContent = dict.usernameSuccess;
    updateGreeting();
    setTimeout(closeUsernameModal, 1200);
  });
});

// ---- Modal Pengaturan Cuaca ----------------------------------------------

function openWeatherModal() {
  applyTranslations(currentLang);
  const dict = i18n[currentLang] || i18n.id;
  chrome.storage.local.get(['useGpsLocation', 'weatherCache', 'weatherEffectsEnabled'], (data) => {
    modalGpsToggle.checked = !!data.useGpsLocation;
    if (modalWeatherEffectsToggle) {
      modalWeatherEffectsToggle.checked = data.weatherEffectsEnabled !== false;
    }
    if (data.weatherCache) {
      const c = data.weatherCache;
      let cond = c.condition;
      let icon = c.icon;
      if (c.weatherCode !== undefined) {
        const det = getWeatherDetails(c.weatherCode, c.isDay);
        cond = det.label;
        icon = det.icon;
      }
      const src = c.source === 'GPS Presisi' 
        ? (currentLang === 'en' ? 'Precise GPS' : 'GPS Presisi') 
        : (c.source === 'Deteksi IP' ? (currentLang === 'en' ? 'IP Detection' : 'Deteksi IP') : (c.source || 'IP'));

      modalWeatherIcon.textContent = icon || '🌤️';
      modalWeatherTemp.textContent = c.temp || '--°C';
      modalWeatherDesc.textContent = cond || dict.weatherLoading;
      modalWeatherLoc.textContent = dict.weatherLocLabel(c.city || dict.weatherDefaultCity, src);
    }
    weatherModalFeedback.className = 'modal-feedback';
    weatherModalFeedback.textContent = '';
    weatherModalOverlay.classList.add('open');
  });
}

function closeWeatherModal() {
  weatherModalOverlay.classList.remove('open');
  weatherModalFeedback.className = 'modal-feedback';
  weatherModalFeedback.textContent = '';
}

if (weatherModalCloseBtn) {
  weatherModalCloseBtn.addEventListener('click', closeWeatherModal);
}

if (weatherModalOverlay) {
  weatherModalOverlay.addEventListener('click', (e) => {
    if (e.target === weatherModalOverlay) closeWeatherModal();
  });
}

// Toggle GPS Real-time vs IP Geolocation
if (modalGpsToggle) {
  modalGpsToggle.addEventListener('change', () => {
    const isGps = modalGpsToggle.checked;
    const dict = i18n[currentLang] || i18n.id;
    weatherModalFeedback.className = 'modal-feedback';
    weatherModalFeedback.textContent = '';

    if (isGps) {
      if (!navigator.geolocation) {
        modalGpsToggle.checked = false;
        weatherModalFeedback.className = 'modal-feedback error';
        weatherModalFeedback.textContent = dict.weatherGpsError;
        return;
      }

      weatherModalFeedback.className = 'modal-feedback';
      weatherModalFeedback.style.display = 'block';
      weatherModalFeedback.style.color = 'var(--primary)';
      weatherModalFeedback.textContent = currentLang === 'en' ? 'Requesting location permission...' : 'Meminta izin lokasi perangkat...';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          chrome.storage.local.set({ useGpsLocation: true }, () => {
            weatherModalFeedback.className = 'modal-feedback success';
            weatherModalFeedback.textContent = dict.weatherGpsActive;
            loadWeather(true);
          });
        },
        (err) => {
          modalGpsToggle.checked = false;
          chrome.storage.local.set({ useGpsLocation: false });
          weatherModalFeedback.className = 'modal-feedback error';
          weatherModalFeedback.textContent = dict.weatherGpsError;
          loadWeather(true);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      chrome.storage.local.set({ useGpsLocation: false }, () => {
        weatherModalFeedback.className = 'modal-feedback success';
        weatherModalFeedback.textContent = dict.weatherIpActive;
        loadWeather(true);
      });
    }
  });
}

// Toggle Efek Visual Cuaca
if (modalWeatherEffectsToggle) {
  modalWeatherEffectsToggle.addEventListener('change', () => {
    const isEffects = modalWeatherEffectsToggle.checked;
    const dict = i18n[currentLang] || i18n.id;
    chrome.storage.local.set({ weatherEffectsEnabled: isEffects }, () => {
      weatherModalFeedback.className = 'modal-feedback success';
      weatherModalFeedback.textContent = isEffects ? dict.weatherEffectsActive : dict.weatherEffectsDisabled;
      chrome.storage.local.get('weatherCache', (data) => {
        if (data && data.weatherCache) {
          if (!isEffects && weatherEffectsLayer) {
            weatherEffectsLayer.innerHTML = '';
            weatherEffectsLayer.dataset.currentEffect = '';
          } else {
            weatherEffectsLayer.dataset.currentEffect = '';
            renderWeatherEffects(data.weatherCache.weatherCode, data.weatherCache.isDay);
          }
        }
      });
    });
  });
}

// Tombol Perbarui Cuaca Sekarang
if (modalRefreshWeatherBtn) {
  modalRefreshWeatherBtn.addEventListener('click', () => {
    const dict = i18n[currentLang] || i18n.id;
    modalRefreshWeatherBtn.textContent = dict.weatherRefreshing;
    modalRefreshWeatherBtn.disabled = true;
    loadWeather(true).finally(() => {
      modalRefreshWeatherBtn.textContent = dict.weatherRefreshBtn;
      modalRefreshWeatherBtn.disabled = false;
      weatherModalFeedback.className = 'modal-feedback success';
      weatherModalFeedback.textContent = dict.weatherSuccess;
    });
  });
}

// ---- Modal Ubah Kata Sandi -----------------------------------------------

function openModal() {
  applyTranslations(currentLang);
  modalOverlay.classList.add('open');
  modalOldPw.focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  modalOldPw.value = '';
  modalNewPw.value = '';
  modalConfirmPw.value = '';
  modalFeedback.className = 'modal-feedback';
  modalFeedback.textContent = '';
}

// Tutup modal via tombol ✕
modalCloseBtn.addEventListener('click', closeModal);

// Tutup modal jika klik di luar modal-card
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Submit form ubah kata sandi
modalChangePwForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const dict = i18n[currentLang] || i18n.id;
  const oldPw     = modalOldPw.value;
  const newPw     = modalNewPw.value;
  const confirmPw = modalConfirmPw.value;

  if (newPw !== confirmPw) {
    modalFeedback.className = 'modal-feedback error';
    modalFeedback.textContent = dict.pwMismatch;
    return;
  }

  chrome.storage.local.get('password', (data) => {
    const currentPassword = (data && data.password) || 'ganteng';
    if (oldPw === currentPassword) {
      chrome.storage.local.set({ password: newPw }, () => {
        modalFeedback.className = 'modal-feedback success';
        modalFeedback.textContent = dict.pwSuccess;
        modalOldPw.value = '';
        modalNewPw.value = '';
        modalConfirmPw.value = '';
        // Tutup modal otomatis setelah 1.5 detik
        setTimeout(closeModal, 1500);
      });
    } else {
      modalFeedback.className = 'modal-feedback error';
      modalFeedback.textContent = dict.pwOldWrong;
    }
  });
});

// Dashboard: Handle search bar
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    // If it's a URL pattern, navigate. Otherwise search on Google.
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    if (urlPattern.test(query)) {
      const targetUrl = query.startsWith('http') ? query : 'https://' + query;
      window.location.href = targetUrl;
    } else {
      window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }
  }
});

// Shortcut instan CTRL+L / CMD+L saat di dashboard terbuka
window.addEventListener('keydown', (e) => {
  if (isCurrentlyUnlocked && (e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L' || e.code === 'KeyL') && !e.altKey && !e.shiftKey) {
    e.preventDefault();
    e.stopPropagation();
    chrome.runtime.sendMessage({ action: 'lockBrowser' });
  }
}, true);

// Dashboard: Dynamic Greeting based on time of day and stored user name
function updateGreeting() {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const dict = i18n[currentLang] || i18n.id;
  let prefix = dict.greetingMalam;

  if (hour >= 4 && hour < 11) {
    prefix = dict.greetingPagi;
  } else if (hour >= 11 && hour < 15) {
    prefix = dict.greetingSiang;
  } else if (hour >= 15 && hour < 18.5) {
    prefix = dict.greetingSore;
  } else {
    prefix = dict.greetingMalam;
  }

  if (greetingPrefix) {
    greetingPrefix.textContent = `${prefix}, `;
  }

  chrome.storage.local.get('userName', (data) => {
    const name = (data && data.userName && data.userName.trim()) || 'Polma Sihotang';
    if (greetingName) {
      greetingName.textContent = name;
    }
  });
}

// Dashboard: Clock, Date, and Greeting with Dynamic Themes
function updateClockAndDate() {
  const now = new Date();
  const dict = i18n[currentLang] || i18n.id;

  // 1. Clock (HH:MM:SS)
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

  // 2. Date
  const dayName = dict.days[now.getDay()];
  const dayNum = now.getDate();
  const monthName = dict.months[now.getMonth()];
  const year = now.getFullYear();

  document.getElementById('date').textContent = dict.formatDate(dayName, dayNum, monthName, year);

  // 3. Dynamic Greeting
  updateGreeting();

  // 4. Dynamic Theme Class based on hour
  const hour = now.getHours();
  let themeClass = 'theme-malam'; // Default to night

  if (hour >= 4 && hour < 11) {
    themeClass = 'theme-pagi';
  } else if (hour >= 11 && hour < 15) {
    themeClass = 'theme-siang';
  } else if (hour >= 15 && hour < 18.5) {
    themeClass = 'theme-sore';
  } else {
    themeClass = 'theme-malam';
  }

  // Swap dynamic classes on body element to update ambient theme blobs and color states
  if (!document.body.classList.contains(themeClass)) {
    document.body.classList.remove('theme-pagi', 'theme-siang', 'theme-sore', 'theme-malam');
    document.body.classList.add(themeClass);
  }
}

// ============================================================
// WEATHER API & CACHING LOGIC
// ============================================================

function getWeatherDetails(code, isDay = 1) {
  const isNight = isDay === 0;
  const dict = i18n[currentLang] || i18n.id;
  const label = (dict.weather && dict.weather[code]) || (currentLang === 'en' ? 'Partly Cloudy' : 'Cerah Berawan');
  let icon = '⛅';

  switch (code) {
    case 0:
      icon = isNight ? '🌙' : '☀️';
      break;
    case 1:
      icon = isNight ? '🌤️' : '🌤️';
      break;
    case 2:
      icon = isNight ? '☁️' : '⛅';
      break;
    case 3:
      icon = '☁️';
      break;
    case 45:
    case 48:
      icon = '🌫️';
      break;
    case 51:
    case 53:
    case 55:
      icon = '🌦️';
      break;
    case 56:
    case 57:
      icon = '🌧️';
      break;
    case 61:
      icon = '🌦️';
      break;
    case 63:
    case 65:
      icon = '🌧️';
      break;
    case 66:
    case 67:
      icon = '🌨️';
      break;
    case 71:
    case 73:
    case 75:
    case 77:
      icon = '❄️';
      break;
    case 80:
      icon = '🌦️';
      break;
    case 81:
    case 82:
      icon = '⛈️';
      break;
    case 85:
    case 86:
      icon = '🌨️';
      break;
    case 95:
      icon = '⛈️';
      break;
    case 96:
    case 99:
      icon = '🌩️';
      break;
    default:
      icon = '⛅';
      break;
  }

  return { label, icon };
}

function renderWeatherEffects(weatherCode, isDay = 1) {
  if (!weatherEffectsLayer) return;
  chrome.storage.local.get('weatherEffectsEnabled', (data) => {
    const isEnabled = data.weatherEffectsEnabled !== false;
    if (!isEnabled || weatherCode === undefined || weatherCode === null) {
      weatherEffectsLayer.innerHTML = '';
      weatherEffectsLayer.dataset.currentEffect = '';
      return;
    }

    const currentEffectKey = `${weatherCode}_${isDay}`;
    if (weatherEffectsLayer.dataset.currentEffect === currentEffectKey) {
      return;
    }
    weatherEffectsLayer.dataset.currentEffect = currentEffectKey;
    weatherEffectsLayer.innerHTML = '';

    // 1. Rain / Drizzle (WMO codes: 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82)
    const isRain = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode);
    const isThunder = [95, 96, 99].includes(weatherCode);
    const isCloudy = [2, 3].includes(weatherCode);
    const isFog = [45, 48].includes(weatherCode);
    const isSnow = [71, 73, 75, 77, 85, 86].includes(weatherCode);
    const isClear = [0, 1].includes(weatherCode);

    if (isThunder) {
      // Petir + Hujan deras
      const lightning = document.createElement('div');
      lightning.className = 'weather-lightning-overlay';
      weatherEffectsLayer.appendChild(lightning);

      const dropCount = 45;
      for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'weather-rain-drop';
        drop.style.left = `${Math.random() * 105 - 2}%`;
        drop.style.animationDuration = `${0.5 + Math.random() * 0.4}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = `${0.4 + Math.random() * 0.5}`;
        weatherEffectsLayer.appendChild(drop);
      }
    } else if (isRain) {
      const isHeavy = [65, 81, 82].includes(weatherCode);
      const dropCount = isHeavy ? 50 : 35;
      for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'weather-rain-drop';
        drop.style.left = `${Math.random() * 105 - 2}%`;
        drop.style.animationDuration = `${(isHeavy ? 0.5 : 0.7) + Math.random() * 0.4}s`;
        drop.style.animationDelay = `${Math.random() * 2}s`;
        drop.style.opacity = `${0.35 + Math.random() * 0.45}`;
        weatherEffectsLayer.appendChild(drop);
      }
    } else if (isCloudy) {
      const cloudCount = (weatherCode === 3) ? 5 : 3;
      for (let i = 0; i < cloudCount; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'weather-cloud';
        cloud.style.top = `${10 + Math.random() * 55}%`;
        const size = 320 + Math.random() * 260;
        cloud.style.width = `${size}px`;
        cloud.style.height = `${size * 0.65}px`;
        cloud.style.animationDuration = `${40 + Math.random() * 30}s`;
        cloud.style.animationDelay = `-${Math.random() * 35}s`;
        weatherEffectsLayer.appendChild(cloud);
      }
    } else if (isFog) {
      const fog = document.createElement('div');
      fog.className = 'weather-fog-layer';
      weatherEffectsLayer.appendChild(fog);
    } else if (isSnow) {
      const snowCount = 35;
      for (let i = 0; i < snowCount; i++) {
        const flake = document.createElement('div');
        flake.className = 'weather-snowflake';
        const size = 3 + Math.random() * 4.5;
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.animationDuration = `${5 + Math.random() * 5}s`;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        weatherEffectsLayer.appendChild(flake);
      }
    } else if (isClear) {
      if (isDay !== 0) {
        const sunbeam = document.createElement('div');
        sunbeam.className = 'weather-sunbeam';
        weatherEffectsLayer.appendChild(sunbeam);
      } else {
        const starCount = 28;
        for (let i = 0; i < starCount; i++) {
          const star = document.createElement('div');
          star.className = 'weather-star';
          const size = 1.5 + Math.random() * 2;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.left = `${Math.random() * 98}%`;
          star.style.top = `${Math.random() * 75}%`;
          star.style.animationDuration = `${2 + Math.random() * 3.5}s`;
          star.style.animationDelay = `${Math.random() * 3}s`;
          weatherEffectsLayer.appendChild(star);
        }
      }
    }
  });
}

function updateWeatherUI(cache) {
  if (!cache) return;
  const dict = i18n[currentLang] || i18n.id;
  let condition = cache.condition;
  let icon = cache.icon;

  if (cache.weatherCode !== undefined) {
    const details = getWeatherDetails(cache.weatherCode, cache.isDay);
    condition = details.label;
    icon = details.icon;
  }

  const sourceLabel = cache.source === 'GPS Presisi' 
    ? (currentLang === 'en' ? 'Precise GPS' : 'GPS Presisi') 
    : (cache.source === 'Deteksi IP' ? (currentLang === 'en' ? 'IP Detection' : 'Deteksi IP') : (cache.source || 'IP'));

  const cityLabel = cache.city || dict.weatherDefaultCity;

  if (weatherIcon) weatherIcon.textContent = icon || '🌤️';
  if (weatherTemp) weatherTemp.textContent = cache.temp || '--°C';
  if (weatherCondition) weatherCondition.textContent = condition || (currentLang === 'en' ? 'Clear' : 'Cerah');
  if (weatherCity) weatherCity.textContent = cityLabel;

  if (modalWeatherIcon) modalWeatherIcon.textContent = icon || '🌤️';
  if (modalWeatherTemp) modalWeatherTemp.textContent = cache.temp || '--°C';
  if (modalWeatherDesc) modalWeatherDesc.textContent = condition || (currentLang === 'en' ? 'Clear' : 'Cerah');
  if (modalWeatherLoc) modalWeatherLoc.textContent = dict.weatherLocLabel(cityLabel, sourceLabel);

  // Render efek visual cuaca atmosferik di seluruh background
  if (cache.weatherCode !== undefined) {
    renderWeatherEffects(cache.weatherCode, cache.isDay);
  }
}

async function loadWeather(forceRefresh = false) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['weatherCache', 'useGpsLocation', 'language'], async (data) => {
      const cache = data.weatherCache;
      const useGps = !!data.useGpsLocation;
      const lang = data.language || 'id';
      const CACHE_DURATION = 30 * 60 * 1000; // 30 menit

      if (!forceRefresh && cache && (Date.now() - cache.timestamp < CACHE_DURATION)) {
        updateWeatherUI(cache);
        resolve(cache);
        return;
      }

      // Jika ada cache lama tapi sudah expired, tampilkan dulu sembari fetch background
      if (cache) {
        updateWeatherUI(cache);
      }

      try {
        let lat, lon, cityName, source;

        // Opsi B: GPS Realtime jika diaktifkan user
        if (useGps && navigator.geolocation) {
          try {
            const pos = await new Promise((res, rej) => {
              navigator.geolocation.getCurrentPosition(res, rej, { timeout: 8000, enableHighAccuracy: true });
            });
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
            source = 'GPS Presisi';

            try {
              const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${lang}`);
              const geoData = await geoRes.json();
              cityName = geoData.locality || geoData.city || geoData.principalSubdivision || (lang === 'en' ? 'My Location' : 'Lokasi Saya');
            } catch (e) {
              cityName = lang === 'en' ? 'My Location' : 'Lokasi Saya';
            }
          } catch (gpsErr) {
            console.warn('[Weather] GPS failed, falling back to IP:', gpsErr);
          }
        }

        // Opsi A: Fallback ke IP Geolocation jika GPS tidak aktif / gagal
        if (!lat || !lon) {
          source = 'Deteksi IP';
          try {
            const ipRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
            const ipData = await ipRes.json();
            lat = parseFloat(ipData.latitude);
            lon = parseFloat(ipData.longitude);
            cityName = ipData.city || ipData.region || ipData.country || (lang === 'en' ? 'Worldwide' : 'Indonesia');
          } catch (e) {
            try {
              const ipRes2 = await fetch('https://freeipapi.com/api/json');
              const ipData2 = await ipRes2.json();
              lat = ipData2.latitude;
              lon = ipData2.longitude;
              cityName = ipData2.cityName || ipData2.regionName || (lang === 'en' ? 'Worldwide' : 'Indonesia');
            } catch (e2) {
              lat = -6.175;
              lon = 106.8286;
              cityName = 'Jakarta';
              source = 'Default';
            }
          }
        }

        if (!lat || !lon) {
          lat = -6.175;
          lon = 106.8286;
          cityName = 'Jakarta';
          source = 'Default';
        }

        // Ambil data cuaca dari Open-Meteo API
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherRes.json();

        if (weatherData && weatherData.current_weather) {
          const cw = weatherData.current_weather;
          const details = getWeatherDetails(cw.weathercode, cw.is_day);
          const temp = `${Math.round(cw.temperature)}°C`;

          const newCache = {
            temp,
            condition: details.label,
            weatherCode: cw.weathercode,
            isDay: cw.is_day,
            icon: details.icon,
            city: cityName,
            source,
            timestamp: Date.now()
          };

          chrome.storage.local.set({ weatherCache: newCache }, () => {
            updateWeatherUI(newCache);
            resolve(newCache);
          });
        } else {
          resolve(null);
        }
      } catch (err) {
        console.error('[Weather] Fetch failed:', err);
        resolve(null);
      }
    });
  });
}

// ============================================================
// 1. REAL-TIME ONLINE DAILY INSPIRING QUOTES MODULE
// ============================================================
let activeQuote = null;
let isFetchingQuote = false;
let quoteRotationTimer = null;
const QUOTE_AUTO_ROTATE_INTERVAL_MS = 8000; // Auto-rotate every 8 seconds

// Translates English text to Indonesian via Google Translate API
async function translateQuoteToIndonesian(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Translation failed');
    const data = await res.json();
    if (data && Array.isArray(data[0])) {
      const translated = data[0].map(item => item[0]).join('');
      if (translated && translated.trim().length > 0) {
        return translated.trim();
      }
    }
  } catch (err) {
    console.warn('[Quote Translation] Offline or translation failed:', err);
  }
  return null;
}

// Fetches a new quote online from multiple public REST endpoints with graceful offline fallback
async function fetchOnlineQuote(lang = currentLang) {
  const normalizedLang = (lang === 'id' || lang === 'in') ? 'id' : 'en';
  const dict = i18n[normalizedLang] || i18n.en;
  let rawText = '';
  let author = '';

  // 1. Primary Online Endpoint: DummyJSON Quotes API
  try {
    const res = await fetch('https://dummyjson.com/quotes/random', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.quote) {
        rawText = data.quote.trim();
        author = data.author ? data.author.trim() : (dict.quoteUnknownAuthor || 'Anonymous');
      }
    }
  } catch (e1) {
    // 2. Secondary Online Endpoint: Quotable API
    try {
      const res2 = await fetch('https://api.quotable.io/quotes/random', { cache: 'no-store' });
      if (res2.ok) {
        const data2 = await res2.json();
        const item = Array.isArray(data2) ? data2[0] : data2;
        if (item && (item.content || item.quote)) {
          rawText = (item.content || item.quote).trim();
          author = item.author ? item.author.trim() : (dict.quoteUnknownAuthor || 'Anonymous');
        }
      }
    } catch (e2) {
      // 3. Tertiary Online Endpoint: AdviceSlip API
      try {
        const res3 = await fetch('https://api.adviceslip.com/advice', { cache: 'no-store' });
        if (res3.ok) {
          const data3 = await res3.json();
          if (data3 && data3.slip && data3.slip.advice) {
            rawText = data3.slip.advice.trim();
            author = dict.quoteUnknownAuthor || (normalizedLang === 'id' ? 'Kata Mutiara' : 'Wisdom');
          }
        }
      } catch (e3) {
        // Fallback handled below
      }
    }
  }

  // If online fetching succeeded
  if (rawText) {
    if (normalizedLang === 'id') {
      const translated = await translateQuoteToIndonesian(rawText);
      if (translated) {
        return { text: translated, rawEnText: rawText, author: author, source: 'online' };
      } else {
        // Fallback strictly to Indonesian curated pool if translation fails
        const idList = i18n.id.quotes;
        const picked = idList[Math.floor(Math.random() * idList.length)];
        return { text: picked.text, rawEnText: rawText, author: picked.author, source: 'fallback_id' };
      }
    }
    return { text: rawText, rawEnText: rawText, author: author, source: 'online' };
  }

  // Graceful offline fallback: pick randomly from curated local quotes bank
  const localList = dict.quotes || i18n.en.quotes;
  const picked = localList[Math.floor(Math.random() * localList.length)];
  return { text: picked.text, rawEnText: picked.text, author: picked.author, source: 'offline' };
}

function initDailyQuotes() {
  if (btnQuoteShuffle) {
    btnQuoteShuffle.addEventListener('click', () => {
      shuffleQuote(true);
    });
  }

  // Immediately display a new random quote from local pool on each new tab / refresh
  const dict = i18n[currentLang] || i18n.en;
  if (dict.quotes && dict.quotes.length > 0) {
    const initial = dict.quotes[Math.floor(Math.random() * dict.quotes.length)];
    activeQuote = initial;
    renderQuoteUI(initial, false);
  }

  // Start periodic auto-rotation timer without needing page refresh
  startQuoteRotationTimer();

  // Concurrently fetch a fresh quote from online API in background
  setTimeout(() => {
    shuffleQuote(false);
  }, 1200);
}

function startQuoteRotationTimer() {
  if (quoteRotationTimer) {
    clearInterval(quoteRotationTimer);
  }
  quoteRotationTimer = setInterval(() => {
    shuffleQuote(false);
  }, QUOTE_AUTO_ROTATE_INTERVAL_MS);
}

function renderQuoteUI(quote, animate = true) {
  if (!quote || !quoteTextEl || !quoteAuthorEl) return;
  const dict = i18n[currentLang] || i18n.en;
  const authorName = quote.author || dict.quoteUnknownAuthor || 'Anonymous';

  if (animate) {
    quoteTextEl.style.opacity = '0';
    quoteAuthorEl.style.opacity = '0';
    setTimeout(() => {
      quoteTextEl.textContent = `"${quote.text}"`;
      quoteAuthorEl.textContent = `— ${authorName}`;
      quoteTextEl.style.opacity = '0.85';
      quoteAuthorEl.style.opacity = '0.7';
    }, 180);
  } else {
    quoteTextEl.textContent = `"${quote.text}"`;
    quoteAuthorEl.textContent = `— ${authorName}`;
    quoteTextEl.style.opacity = '0.85';
    quoteAuthorEl.style.opacity = '0.7';
  }
}

async function shuffleQuote(userInitiated = true) {
  if (isFetchingQuote) return;
  isFetchingQuote = true;

  if (userInitiated) {
    // Reset timer when user manually shuffles
    startQuoteRotationTimer();
    if (btnQuoteShuffle) {
      btnQuoteShuffle.classList.add('spinning');
    }
    if (quoteTextEl) {
      quoteTextEl.style.opacity = '0.3';
    }
  }

  try {
    const newQuote = await fetchOnlineQuote(currentLang);
    activeQuote = newQuote;
    renderQuoteUI(newQuote, true);
  } catch (err) {
    console.warn('[Daily Quote] Error shuffling quote:', err);
    // Offline / error fallback
    const dict = i18n[currentLang] || i18n.en;
    if (dict.quotes && dict.quotes.length > 0) {
      const fallback = dict.quotes[Math.floor(Math.random() * dict.quotes.length)];
      activeQuote = fallback;
      renderQuoteUI(fallback, true);
    }
  } finally {
    isFetchingQuote = false;
    if (btnQuoteShuffle) {
      setTimeout(() => {
        btnQuoteShuffle.classList.remove('spinning');
      }, 400);
    }
  }
}

function updateQuoteDisplay() {
  const dict = i18n[currentLang] || i18n.en;
  if (quoteBadgeLabel && dict.quoteBadge) quoteBadgeLabel.textContent = dict.quoteBadge;
  if (btnQuoteShuffle && dict.quoteShuffleTitle) btnQuoteShuffle.title = dict.quoteShuffleTitle;
}

// ============================================================
// ============================================================
// 2. MINIMALIST QUICK LINKS & FOLDERS MODULE
// ============================================================
const DEFAULT_QUICK_LINKS = [
  { type: 'link', name: 'Google', url: 'https://www.google.com' },
  { type: 'link', name: 'YouTube', url: 'https://www.youtube.com' },
  { type: 'link', name: 'GitHub', url: 'https://github.com' },
  { type: 'link', name: 'ChatGPT', url: 'https://chatgpt.com' },
  { type: 'link', name: 'Gmail', url: 'https://mail.google.com' },
  { type: 'link', name: 'Wikipedia', url: 'https://www.wikipedia.org' }
];

let quickLinksList = [];
let activeDockFolderIndex = -1;

function closeDockFolderPopover() {
  if (dockFolderPopover) {
    dockFolderPopover.classList.remove('active');
  }
  document.querySelectorAll('.quick-link-item').forEach(el => el.classList.remove('dock-active'));
  activeDockFolderIndex = -1;
}

function toggleDockFolderPopover(folderIndex, targetElement) {
  if (activeDockFolderIndex === folderIndex) {
    closeDockFolderPopover();
    return;
  }
  openDockFolderPopover(folderIndex, targetElement);
}

function openDockFolderPopover(folderIndex, targetElement) {
  const folder = quickLinksList[folderIndex];
  if (!folder || folder.type !== 'folder' || !dockFolderPopover || !dockPopoverGrid) {
    closeDockFolderPopover();
    return;
  }

  activeDockFolderIndex = folderIndex;
  const dict = i18n[currentLang] || i18n.en;

  // Highlight active folder icon on the dock
  document.querySelectorAll('.quick-link-item').forEach(el => el.classList.remove('dock-active'));
  if (targetElement) {
    targetElement.classList.add('dock-active');
  }

  // Set popover header title
  const count = (folder.items && folder.items.length) || 0;
  if (dockPopoverTitle) {
    dockPopoverTitle.textContent = `${folder.name} (${count})`;
  }

  // Clear & render child items inside popover grid
  dockPopoverGrid.innerHTML = '';

  if (Array.isArray(folder.items) && folder.items.length > 0) {
    folder.items.forEach((child, childIndex) => {
      const itemWrap = document.createElement('div');
      itemWrap.className = 'quick-link-item';

      const linkEl = document.createElement('a');
      linkEl.className = 'quick-link-link';
      linkEl.href = child.url;
      linkEl.target = '_blank';
      linkEl.rel = 'noopener noreferrer';
      linkEl.title = `${child.name} (${child.url})`;

      const iconBox = document.createElement('div');
      iconBox.className = 'quick-link-icon-box';

      const iconImg = document.createElement('img');
      iconImg.className = 'quick-link-icon';
      iconImg.src = getFaviconUrl(child.url);
      iconImg.alt = child.name;
      iconImg.onerror = () => { iconImg.src = 'icons/icon-32.png'; };

      iconBox.appendChild(iconImg);

      const titleEl = document.createElement('span');
      titleEl.className = 'quick-link-title';
      titleEl.textContent = child.name;

      linkEl.appendChild(iconBox);
      linkEl.appendChild(titleEl);

      // Edit button for child item
      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'quick-link-edit-btn';
      editBtn.title = `Edit: ${child.name}`;
      editBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="edit-pencil-icon">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      `;
      editBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openEditQuickLinkModal(childIndex, folderIndex);
      });

      itemWrap.appendChild(linkEl);
      itemWrap.appendChild(editBtn);
      dockPopoverGrid.appendChild(itemWrap);
    });
  }

  // Render Add button inside Popover Grid
  const addWrap = document.createElement('div');
  addWrap.className = 'quick-link-item quick-link-add-item';
  addWrap.title = dict.quicklinkAddInFolderTitle || 'Tambah Pintasan';
  addWrap.innerHTML = `
    <div class="quick-link-icon-box quick-link-add-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="add-link-icon">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
    <span class="quick-link-title">${dict.folderAddShortcut || '+ Pintasan'}</span>
  `;
  addWrap.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openAddQuickLinkModal(folderIndex);
  });
  dockPopoverGrid.appendChild(addWrap);

  // Activate Popover
  dockFolderPopover.classList.add('active');

  // Position Popover directly below clicked target folder with pixel-perfect alignment
  if (targetElement) {
    const section = document.getElementById('quick-links-section');
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const targetRect = targetElement.getBoundingClientRect();
      const folderCenterX = (targetRect.left + targetRect.width / 2) - sectionRect.left;
      
      const popoverWidth = dockFolderPopover.offsetWidth || 220;
      const sectionWidth = sectionRect.width;
      
      let idealLeft = folderCenterX;
      const minLeft = popoverWidth / 2 + 10;
      const maxLeft = sectionWidth - popoverWidth / 2 - 10;
      
      if (sectionWidth > popoverWidth) {
        if (idealLeft < minLeft) {
          dockFolderPopover.style.left = `${minLeft}px`;
          if (dockPopoverArrow) {
            const arrowOffset = (folderCenterX - minLeft) + (popoverWidth / 2);
            dockPopoverArrow.style.left = `${arrowOffset}px`;
          }
        } else if (idealLeft > maxLeft) {
          dockFolderPopover.style.left = `${maxLeft}px`;
          if (dockPopoverArrow) {
            const arrowOffset = (folderCenterX - maxLeft) + (popoverWidth / 2);
            dockPopoverArrow.style.left = `${arrowOffset}px`;
          }
        } else {
          dockFolderPopover.style.left = `${idealLeft}px`;
          if (dockPopoverArrow) {
            dockPopoverArrow.style.left = '50%';
          }
        }
      } else {
        dockFolderPopover.style.left = '50%';
        if (dockPopoverArrow) {
          dockPopoverArrow.style.left = '50%';
        }
      }
    }
  }
}

function initQuickLinks() {
  chrome.storage.local.get('quickLinks', (data) => {
    quickLinksList = (data && Array.isArray(data.quickLinks) && data.quickLinks.length > 0)
      ? normalizeQuickLinks(data.quickLinks)
      : DEFAULT_QUICK_LINKS;
    
    if (!data || !data.quickLinks) {
      chrome.storage.local.set({ quickLinks: quickLinksList });
    }
    renderQuickLinks(quickLinksList);
  });

  // Modal: Quicklink/Folder Add & Edit
  if (quicklinkModalCloseBtn) {
    quicklinkModalCloseBtn.addEventListener('click', closeQuickLinkModal);
  }
  if (quicklinkModalOverlay) {
    quicklinkModalOverlay.addEventListener('click', (e) => {
      if (e.target === quicklinkModalOverlay) closeQuickLinkModal();
    });
  }
  if (quicklinkForm) {
    quicklinkForm.addEventListener('submit', handleQuickLinkSubmit);
  }
  if (quicklinkDeleteBtn) {
    quicklinkDeleteBtn.addEventListener('click', handleQuickLinkDelete);
  }

  // Popover close button & outside click handling
  if (dockPopoverCloseBtn) {
    dockPopoverCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDockFolderPopover();
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#quick-links-section') && !e.target.closest('#quicklink-modal-overlay')) {
      closeDockFolderPopover();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDockFolderPopover();
    }
  });

  // Type Selector Tabs (Link vs Folder)
  if (btnTypeLink) {
    btnTypeLink.addEventListener('click', () => setQuicklinkType('link'));
  }
  if (btnTypeFolder) {
    btnTypeFolder.addEventListener('click', () => setQuicklinkType('folder'));
  }
}

// Ensure every item has a valid type ('link' or 'folder')
function normalizeQuickLinks(list) {
  return list.map((item) => {
    if (item.type === 'folder') {
      return {
        type: 'folder',
        name: item.name || 'Folder',
        items: Array.isArray(item.items) ? item.items.map(child => ({ type: 'link', name: child.name, url: child.url })) : []
      };
    }
    return {
      type: 'link',
      name: item.name || 'Link',
      url: item.url || 'https://google.com'
    };
  });
}

function getFaviconUrl(url) {
  try {
    const parsed = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=64`;
  } catch (e) {
    return 'icons/icon-32.png';
  }
}

function setQuicklinkType(type) {
  if (quicklinkSelectedType) quicklinkSelectedType.value = type;
  if (btnTypeLink) btnTypeLink.classList.toggle('active', type === 'link');
  if (btnTypeFolder) btnTypeFolder.classList.toggle('active', type === 'folder');

  const dict = i18n[currentLang] || i18n.en;
  if (type === 'folder') {
    if (quicklinkUrlGroup) quicklinkUrlGroup.style.display = 'none';
    if (quicklinkNameInput) quicklinkNameInput.placeholder = dict.quicklinkFolderNamePh;
  } else {
    if (quicklinkUrlGroup) quicklinkUrlGroup.style.display = 'block';
    if (quicklinkNameInput) quicklinkNameInput.placeholder = dict.quicklinkNamePh;
  }
}

function renderQuickLinks(links) {
  if (!quickLinksGrid) return;
  quickLinksGrid.innerHTML = '';
  const dict = i18n[currentLang] || i18n.en;

  const folderEntries = [];
  const linkEntries = [];

  links.forEach((item, index) => {
    if (item.type === 'folder') {
      folderEntries.push({ item, originalIndex: index });
    } else {
      linkEntries.push({ item, originalIndex: index });
    }
  });

  // 1. Render all Folder items on the left of the Dock
  folderEntries.forEach(({ item, originalIndex }) => {
    const itemWrap = document.createElement('div');
    itemWrap.className = 'quick-link-item';
    if (activeDockFolderIndex === originalIndex) {
      itemWrap.classList.add('dock-active');
    }

    const itemCount = (item.items && item.items.length) || 0;
    itemWrap.title = `${item.name} (${itemCount} items)`;

    const iconBox = document.createElement('div');
    iconBox.className = 'quick-link-icon-box quick-link-folder-box';

    if (item.items && item.items.length > 0) {
      const miniGrid = document.createElement('div');
      miniGrid.className = 'folder-mini-grid';
      const previewItems = item.items.slice(0, 4);
      previewItems.forEach((child) => {
        const miniImg = document.createElement('img');
        miniImg.className = 'folder-mini-icon';
        miniImg.src = getFaviconUrl(child.url);
        miniImg.alt = child.name;
        miniImg.onerror = () => { miniImg.src = 'icons/icon-32.png'; };
        miniGrid.appendChild(miniImg);
      });
      iconBox.appendChild(miniGrid);
    } else {
      iconBox.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="folder-svg-icon">
          <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
        </svg>
      `;
    }

    const titleEl = document.createElement('span');
    titleEl.className = 'quick-link-title';
    titleEl.textContent = item.name;

    itemWrap.appendChild(iconBox);
    itemWrap.appendChild(titleEl);

    // Clicking folder toggles macOS Stack popover above it
    itemWrap.addEventListener('click', (e) => {
      if (e.target.closest('.quick-link-edit-btn')) return;
      toggleDockFolderPopover(originalIndex, itemWrap);
    });

    // Edit button for folder
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'quick-link-edit-btn';
    editBtn.title = `Edit: ${item.name}`;
    editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="edit-pencil-icon">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    `;
    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openEditQuickLinkModal(originalIndex, -1);
    });

    itemWrap.appendChild(editBtn);
    quickLinksGrid.appendChild(itemWrap);
  });

  // Render subtle Dock Divider between folders and individual links
  if (folderEntries.length > 0 && linkEntries.length > 0) {
    const divider = document.createElement('div');
    divider.className = 'dock-divider';
    quickLinksGrid.appendChild(divider);
  }

  // 2. Render all Link items on the Dock
  linkEntries.forEach(({ item, originalIndex }) => {
    const itemWrap = document.createElement('div');
    itemWrap.className = 'quick-link-item';

    const linkEl = document.createElement('a');
    linkEl.className = 'quick-link-link';
    linkEl.href = item.url;
    linkEl.target = '_blank';
    linkEl.rel = 'noopener noreferrer';
    linkEl.title = `${item.name} (${item.url})`;

    const iconBox = document.createElement('div');
    iconBox.className = 'quick-link-icon-box';

    const iconImg = document.createElement('img');
    iconImg.className = 'quick-link-icon';
    iconImg.src = getFaviconUrl(item.url);
    iconImg.alt = item.name;
    iconImg.onerror = () => { iconImg.src = 'icons/icon-32.png'; };

    iconBox.appendChild(iconImg);

    const titleEl = document.createElement('span');
    titleEl.className = 'quick-link-title';
    titleEl.textContent = item.name;

    linkEl.appendChild(iconBox);
    linkEl.appendChild(titleEl);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'quick-link-edit-btn';
    editBtn.title = `Edit: ${item.name}`;
    editBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="edit-pencil-icon">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    `;
    editBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openEditQuickLinkModal(originalIndex, -1);
    });

    itemWrap.appendChild(linkEl);
    itemWrap.appendChild(editBtn);
    quickLinksGrid.appendChild(itemWrap);
  });

  // 3. Render Add button on main dock (far right)
  const addWrap = document.createElement('div');
  addWrap.className = 'quick-link-item quick-link-add-item';
  addWrap.id = 'btn-add-quick-link';
  addWrap.title = dict.quicklinkAddTitle || 'Tambah Pintasan';
  addWrap.innerHTML = `
    <div class="quick-link-icon-box quick-link-add-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="add-link-icon">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    </div>
    <span class="quick-link-title" id="lbl-add-shortcut">${dict.addShortcut || 'Pintasan'}</span>
  `;
  addWrap.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openAddQuickLinkModal(-1);
  });
  quickLinksGrid.appendChild(addWrap);

  // If a folder popover was open, re-render it
  if (activeDockFolderIndex >= 0) {
    const activeEl = quickLinksGrid.querySelector('.quick-link-item.dock-active');
    openDockFolderPopover(activeDockFolderIndex, activeEl);
  }
}

// Add / Edit Modal Functions
function openAddQuickLinkModal(parentFolderIndex = -1) {
  applyTranslations(currentLang);
  const dict = i18n[currentLang] || i18n.en;
  quicklinkEditIndex.value = '-1';
  quicklinkParentFolderIndex.value = String(parentFolderIndex);
  quicklinkNameInput.value = '';
  quicklinkUrlInput.value = '';
  quicklinkModalFeedback.className = 'modal-feedback';
  quicklinkModalFeedback.textContent = '';
  quicklinkDeleteBtn.style.display = 'none';

  if (parentFolderIndex >= 0) {
    // Adding inside a folder: only link type allowed
    if (quicklinkTypeTabs) quicklinkTypeTabs.style.display = 'none';
    setQuicklinkType('link');
    quicklinkModalTitle.textContent = dict.quicklinkAddInFolderTitle || 'Tambah Pintasan ke Folder';
  } else {
    // Adding at root: can choose link or folder
    if (quicklinkTypeTabs) quicklinkTypeTabs.style.display = 'flex';
    setQuicklinkType('link');
    quicklinkModalTitle.textContent = dict.quicklinkAddTitle;
  }

  quicklinkModalOverlay.classList.add('open');
  setTimeout(() => quicklinkNameInput.focus(), 50);
}

function openEditQuickLinkModal(index, parentFolderIndex = -1) {
  applyTranslations(currentLang);
  const dict = i18n[currentLang] || i18n.en;
  quicklinkEditIndex.value = String(index);
  quicklinkParentFolderIndex.value = String(parentFolderIndex);
  if (quicklinkTypeTabs) quicklinkTypeTabs.style.display = 'none';

  let item = null;
  if (parentFolderIndex >= 0) {
    const folder = quickLinksList[parentFolderIndex];
    if (folder && folder.items) item = folder.items[index];
  } else {
    item = quickLinksList[index];
  }

  if (!item) return;

  quicklinkNameInput.value = item.name || '';
  quicklinkModalFeedback.className = 'modal-feedback';
  quicklinkModalFeedback.textContent = '';
  quicklinkDeleteBtn.style.display = 'inline-block';

  if (item.type === 'folder') {
    setQuicklinkType('folder');
    quicklinkModalTitle.textContent = dict.quicklinkEditFolderTitle || 'Edit Folder';
  } else {
    setQuicklinkType('link');
    quicklinkUrlInput.value = item.url || '';
    quicklinkModalTitle.textContent = dict.quicklinkEditTitle;
  }

  quicklinkModalOverlay.classList.add('open');
  setTimeout(() => quicklinkNameInput.focus(), 50);
}

function closeQuickLinkModal() {
  if (quicklinkModalOverlay) quicklinkModalOverlay.classList.remove('open');
  if (quicklinkModalFeedback) quicklinkModalFeedback.textContent = '';
}

function handleQuickLinkSubmit(e) {
  e.preventDefault();
  const dict = i18n[currentLang] || i18n.en;
  const idx = parseInt(quicklinkEditIndex.value, 10);
  const parentFolderIdx = parseInt(quicklinkParentFolderIndex.value, 10);
  const type = quicklinkSelectedType.value || 'link';
  const name = quicklinkNameInput.value.trim();

  if (type === 'folder') {
    if (!name) {
      quicklinkModalFeedback.className = 'modal-feedback error';
      quicklinkModalFeedback.textContent = dict.quicklinkFolderEmptyErr || 'Nama folder wajib diisi!';
      return;
    }

    if (idx >= 0 && idx < quickLinksList.length) {
      // Update existing folder
      quickLinksList[idx].name = name;
    } else {
      // Create new folder
      quickLinksList.push({
        type: 'folder',
        name,
        items: []
      });
    }
  } else {
    // Link type
    let url = quicklinkUrlInput.value.trim();
    if (!name || !url) {
      quicklinkModalFeedback.className = 'modal-feedback error';
      quicklinkModalFeedback.textContent = dict.quicklinkEmptyErr;
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      new URL(url);
    } catch (err) {
      quicklinkModalFeedback.className = 'modal-feedback error';
      quicklinkModalFeedback.textContent = dict.quicklinkInvalidUrl;
      return;
    }

    if (parentFolderIdx >= 0 && parentFolderIdx < quickLinksList.length) {
      // Adding/editing inside a folder
      const folder = quickLinksList[parentFolderIdx];
      if (folder && folder.items) {
        if (idx >= 0 && idx < folder.items.length) {
          folder.items[idx] = { type: 'link', name, url };
        } else {
          folder.items.push({ type: 'link', name, url });
        }
      }
    } else {
      // Adding/editing at root level
      if (idx >= 0 && idx < quickLinksList.length) {
        quickLinksList[idx] = { type: 'link', name, url };
      } else {
        quickLinksList.push({ type: 'link', name, url });
      }
    }
  }

  chrome.storage.local.set({ quickLinks: quickLinksList }, () => {
    renderQuickLinks(quickLinksList);
    closeQuickLinkModal();
  });
}

function handleQuickLinkDelete(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const idx = parseInt(quicklinkEditIndex.value, 10);
  const parentFolderIdx = parseInt(quicklinkParentFolderIndex.value, 10);

  if (parentFolderIdx >= 0 && parentFolderIdx < quickLinksList.length) {
    // Deleting item inside a folder
    const folder = quickLinksList[parentFolderIdx];
    if (folder && folder.items && idx >= 0 && idx < folder.items.length) {
      folder.items.splice(idx, 1);
      chrome.storage.local.set({ quickLinks: quickLinksList }, () => {
        renderQuickLinks(quickLinksList);
        closeQuickLinkModal();
      });
    }
  } else {
    // Deleting root item (link or folder)
    if (idx >= 0 && idx < quickLinksList.length) {
      quickLinksList.splice(idx, 1);
      if (activeDockFolderIndex === idx) {
        closeDockFolderPopover();
      }
      chrome.storage.local.set({ quickLinks: quickLinksList }, () => {
        renderQuickLinks(quickLinksList);
        closeQuickLinkModal();
      });
    }
  }
}

// ============================================================
// 3. AUTO-LOCK INACTIVITY TIMER MODULE
// ============================================================
let idleMinutesSetting = 0;

function initAutoLock() {
  chrome.storage.local.get('idleLockMinutes', (data) => {
    idleMinutesSetting = (data && data.idleLockMinutes !== undefined) ? Number(data.idleLockMinutes) : 0;
    updateAutoLockUI(idleMinutesSetting);
  });

  if (autolockModalCloseBtn) {
    autolockModalCloseBtn.addEventListener('click', closeAutoLockModal);
  }
  if (autolockModalOverlay) {
    autolockModalOverlay.addEventListener('click', (e) => {
      if (e.target === autolockModalOverlay) closeAutoLockModal();
    });
  }

  autolockOptionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mins = Number(btn.dataset.mins || 0);
      setIdleDuration(mins);
    });
  });
}

function openAutoLockModal() {
  applyTranslations(currentLang);
  if (autolockModalOverlay) autolockModalOverlay.classList.add('open');
}

function closeAutoLockModal() {
  if (autolockModalOverlay) autolockModalOverlay.classList.remove('open');
  if (autolockFeedback) autolockFeedback.textContent = '';
}

function updateAutoLockUI(mins) {
  idleMinutesSetting = mins;
  autolockOptionBtns.forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.mins) === mins);
  });
}

function setIdleDuration(mins) {
  const dict = i18n[currentLang] || i18n.en;
  chrome.storage.local.set({ idleLockMinutes: mins }, () => {
    updateAutoLockUI(mins);
    if (autolockFeedback) {
      autolockFeedback.className = 'modal-feedback success';
      autolockFeedback.textContent = dict.autolockActive(mins);
    }
  });
}



