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

// Daily Quotes Elements
const dailyQuoteContainer = document.getElementById('daily-quote-container');
const quoteBadgeLabel     = document.getElementById('quote-badge-label');
const quoteTextEl         = document.getElementById('quote-text');
const quoteAuthorEl       = document.getElementById('quote-author');
const btnQuoteShuffle     = document.getElementById('btn-quote-shuffle');

// Quick Links Elements
const quickLinksSection   = document.getElementById('quick-links-section');
const quickLinksGrid      = document.getElementById('quick-links-grid');
const btnAddQuickLink     = document.getElementById('btn-add-quick-link');
const lblAddShortcut      = document.getElementById('lbl-add-shortcut');
const quicklinkModalOverlay   = document.getElementById('quicklink-modal-overlay');
const quicklinkModalCloseBtn  = document.getElementById('quicklink-modal-close-btn');
const quicklinkModalTitle     = document.getElementById('quicklink-modal-title');
const quicklinkForm           = document.getElementById('quicklink-form');
const quicklinkEditIndex      = document.getElementById('quicklink-edit-index');
const quicklinkNameInput      = document.getElementById('quicklink-name-input');
const quicklinkUrlInput       = document.getElementById('quicklink-url-input');
const quicklinkModalFeedback  = document.getElementById('quicklink-modal-feedback');
const quicklinkSubmitBtn      = document.getElementById('quicklink-submit-btn');
const quicklinkDeleteBtn      = document.getElementById('quicklink-delete-btn');

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
    menuHeader: 'Pengaturan',
    menuLock: 'Kunci Browser',
    menuAutolock: 'Auto-Lock Saat Menganggur',
    menuUser: 'Ubah Nama',
    menuWeather: 'Pengaturan Cuaca',
    menuPw: 'Ubah Kata Sandi',
    menuLangTitle: 'Bahasa',
    addShortcut: 'Pintasan',

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
    unlockedBtn: 'Buka Kunci',

    // Quotes ID
    quoteBadge: 'Kutipan Hari Ini',
    quoteShuffleTitle: 'Kutipan Lain',
    quotes: [
      { text: "Waktu adalah aset paling berharga. Gunakan dengan bijak.", author: "Polma Sihotang" },
      { text: "Masa depan tergantung pada apa yang kamu lakukan hari ini.", author: "Mahatma Gandhi" },
      { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan.", author: "Steve Jobs" },
      { text: "Jangan menunggu kesempatan luar biasa. Raih kesempatan biasa dan buat menjadi luar biasa.", author: "Orison Swett Marden" },
      { text: "Kesuksesan berawal dari keputusan untuk mencoba.", author: "John F. Kennedy" },
      { text: "Fokus pada proses, hasil terbaik akan mengikuti.", author: "Anonim" },
      { text: "Disiplin adalah jembatan antara tujuan dan pencapaian.", author: "Jim Rohn" },
      { text: "Hari ini adalah kesempatan untuk membangun hari esok yang kamu inginkan.", author: "Ken Poirot" }
    ],

    // Quick Links Modal
    quicklinkAddTitle: 'Tambah Pintasan',
    quicklinkEditTitle: 'Edit Pintasan',
    quicklinkNamePh: 'Nama Situs (misal: YouTube)',
    quicklinkUrlPh: 'URL (misal: https://youtube.com)',
    quicklinkSaveBtn: 'Simpan',
    quicklinkDeleteBtn: 'Hapus',
    quicklinkEmptyErr: 'Nama dan URL wajib diisi!',
    quicklinkInvalidUrl: 'Format URL tidak valid (gunakan http:// atau https://)',

    // Auto-Lock Modal
    autolockTitle: 'Auto-Lock Saat Menganggur',
    autolockDesc: 'Kunci browser secara otomatis saat tidak ada aktivitas pengguna.',
    autolockActive: (m) => m > 0 ? `✓ Kunci otomatis aktif (${m} menit tidak aktif).` : '✓ Kunci otomatis dinonaktifkan.',

    // Username Modal
    usernameModalTitle: 'Ubah Nama Pengguna',
    usernamePlaceholder: 'Masukkan nama Anda...',
    usernameSaveBtn: 'Simpan Nama',
    usernameSuccess: 'Nama berhasil diperbarui!',
    usernameEmpty: 'Nama tidak boleh kosong!',

    // Weather Modal
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
    pwOldWrong: 'Kata sandi lama salah!'
  },
  en: {
    menuHeader: 'Settings',
    menuLock: 'Lock Browser',
    menuAutolock: 'Auto-Lock Inactivity Timer',
    menuUser: 'Change Name',
    menuWeather: 'Weather Settings',
    menuPw: 'Change Password',
    menuLangTitle: 'Language',
    addShortcut: 'Shortcut',

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
    unlockedBtn: 'Unlock',

    // Quotes EN
    quoteBadge: 'Daily Quote',
    quoteShuffleTitle: 'Shuffle Quote',
    quotes: [
      { text: "Time is our most valuable asset. Spend it with purpose.", author: "Polma Sihotang" },
      { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Do not wait for extraordinary circumstances. Take common occasions and make them great.", author: "Orison Swett Marden" },
      { text: "Success begins with the decision to try.", author: "John F. Kennedy" },
      { text: "Focus on the process, and the results will take care of themselves.", author: "Anonymous" },
      { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
      { text: "Today is your opportunity to build the tomorrow you want.", author: "Ken Poirot" }
    ],

    // Quick Links Modal
    quicklinkAddTitle: 'Add Shortcut',
    quicklinkEditTitle: 'Edit Shortcut',
    quicklinkNamePh: 'Site Name (e.g. YouTube)',
    quicklinkUrlPh: 'URL (e.g. https://youtube.com)',
    quicklinkSaveBtn: 'Save',
    quicklinkDeleteBtn: 'Delete',
    quicklinkEmptyErr: 'Name and URL are required!',
    quicklinkInvalidUrl: 'Invalid URL format (use http:// or https://)',

    // Auto-Lock Modal
    autolockTitle: 'Auto-Lock Inactivity Timer',
    autolockDesc: 'Automatically locks the browser when no user activity is detected.',
    autolockActive: (m) => m > 0 ? `✓ Auto-lock enabled (${m} min inactivity).` : '✓ Auto-lock disabled.',

    // Username Modal
    usernameModalTitle: 'Change Username',
    usernamePlaceholder: 'Enter your name...',
    usernameSaveBtn: 'Save Name',
    usernameSuccess: 'Name updated successfully!',
    usernameEmpty: 'Name cannot be empty!',

    // Weather Modal
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
    pwOldWrong: 'Incorrect current password!'
  }
};

function applyTranslations(lang) {
  currentLang = (lang === 'id') ? 'id' : 'en';
  const dict = i18n[currentLang];

  // Update Language switcher buttons state
  if (btnLangId) btnLangId.classList.toggle('active', currentLang === 'id');
  if (btnLangEn) btnLangEn.classList.toggle('active', currentLang === 'en');

  // Top Bar action labels
  if (topFocusLabel) topFocusLabel.textContent = dict.topFocus;

  // Menu texts
  if (menuHeaderLabel) menuHeaderLabel.textContent = dict.menuHeader;
  if (menuLockLabel) menuLockLabel.textContent = dict.menuLock;
  if (menuAutolockLabel) menuAutolockLabel.textContent = dict.menuAutolock;
  if (menuUserLabel) menuUserLabel.textContent = dict.menuUser;
  if (menuWeatherLabel) menuWeatherLabel.textContent = dict.menuWeather;
  if (menuPwLabel) menuPwLabel.textContent = dict.menuPw;

  // Search & Lock Form Placeholders
  if (searchInput) searchInput.placeholder = dict.searchPlaceholder;
  if (passwordInput) passwordInput.placeholder = dict.passwordPlaceholder;
  if (errorMessage) errorMessage.textContent = dict.passwordError;

  // Quick Links
  if (lblAddShortcut) lblAddShortcut.textContent = dict.addShortcut;
  if (quicklinkNameInput) quicklinkNameInput.placeholder = dict.quicklinkNamePh;
  if (quicklinkUrlInput) quicklinkUrlInput.placeholder = dict.quicklinkUrlPh;
  if (quicklinkSubmitBtn) quicklinkSubmitBtn.textContent = dict.quicklinkSaveBtn;
  if (quicklinkDeleteBtn) quicklinkDeleteBtn.textContent = dict.quicklinkDeleteBtn;

  // Auto-Lock Modal
  if (autolockModalTitle) autolockModalTitle.textContent = dict.autolockTitle;
  if (autolockDesc) autolockDesc.textContent = dict.autolockDesc;

  // Update quote display and quick links with new language
  if (quoteBadgeLabel && dict.quoteBadge) quoteBadgeLabel.textContent = dict.quoteBadge;
  if (btnQuoteShuffle && dict.quoteShuffleTitle) btnQuoteShuffle.title = dict.quoteShuffleTitle;
  updateQuoteDisplay();
  if (quickLinksList && quickLinksList.length > 0) {
    renderQuickLinks(quickLinksList);
  }

  // Username Modal
  const usernameModalTitle = document.getElementById('username-modal-title');
  const modalUsernameSubmit = document.getElementById('modal-username-submit');
  if (usernameModalTitle) usernameModalTitle.textContent = dict.usernameModalTitle;
  if (modalUsernameInput) modalUsernameInput.placeholder = dict.usernamePlaceholder;
  if (modalUsernameSubmit) modalUsernameSubmit.textContent = dict.usernameSaveBtn;

  // Weather Modal
  const weatherModalTitle = document.getElementById('weather-modal-title');
  const settingToggleTitleEl = document.getElementById('setting-toggle-title-el');
  const settingToggleDescEl = document.getElementById('setting-toggle-desc-el');
  if (weatherModalTitle) weatherModalTitle.textContent = dict.weatherModalTitle;
  if (settingToggleTitleEl) settingToggleTitleEl.textContent = dict.weatherGpsTitle;
  if (settingToggleDescEl) settingToggleDescEl.textContent = dict.weatherGpsDesc;
  if (settingToggleEffectsTitle) settingToggleEffectsTitle.textContent = dict.weatherEffectsTitle;
  if (settingToggleEffectsDesc) settingToggleEffectsDesc.textContent = dict.weatherEffectsDesc;
  if (modalRefreshWeatherBtn) modalRefreshWeatherBtn.textContent = dict.weatherRefreshBtn;

  // Password Modal
  const changepwModalTitle = document.getElementById('changepw-modal-title');
  const modalChangepwSubmit = document.getElementById('modal-changepw-submit');
  if (changepwModalTitle) changepwModalTitle.textContent = dict.pwModalTitle;
  if (modalOldPw) modalOldPw.placeholder = dict.oldPwPlaceholder;
  if (modalNewPw) modalNewPw.placeholder = dict.newPwPlaceholder;
  if (modalConfirmPw) modalConfirmPw.placeholder = dict.confirmPwPlaceholder;
  if (modalChangepwSubmit) modalChangepwSubmit.textContent = dict.pwSaveBtn;

  // Update Clock, Greeting, and Weather display immediately
  updateClockAndDate();
  chrome.storage.local.get('weatherCache', (data) => {
    if (data && data.weatherCache) {
      updateWeatherUI(data.weatherCache);
    }
  });
}

function setLanguage(lang) {
  currentLang = (lang === 'id') ? 'id' : 'en';
  chrome.storage.local.set({ language: currentLang }, () => {
    applyTranslations(currentLang);
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
  updateToast.dataset.downloadUrl = url || 'https://github.com/polmaaa/polock/archive/refs/heads/main.zip';
  updateToast.dataset.version = version;
  updateToast.classList.add('visible');
}

function hideUpdateToast() {
  updateToast.classList.remove('visible');
}

// Tombol tutup toast
updateToastClose.addEventListener('click', hideUpdateToast);

// Tombol unduh — download in-page via chrome.downloads (tidak redirect)
updateToastLink.addEventListener('click', (e) => {
  e.preventDefault();
  const version = updateToast.dataset.version || 'latest';
  const zipUrl  = 'https://github.com/polmaaa/polock/archive/refs/heads/main.zip';

  // Tampilkan status downloading di tombol
  updateToastLink.textContent = '⏳ Mengunduh...';
  updateToastLink.style.pointerEvents = 'none';

  chrome.downloads.download({
    url: zipUrl,
    filename: `krompol-locker-v${version}.zip`,
    saveAs: false   // Langsung simpan ke folder Downloads
  }, (downloadId) => {
    if (chrome.runtime.lastError || !downloadId) {
      updateToastLink.textContent = '✗ Gagal';
      setTimeout(() => {
        updateToastLink.textContent = 'Unduh';
        updateToastLink.style.pointerEvents = '';
      }, 2000);
    } else {
      updateToastLink.textContent = '✓ Tersimpan!';
      setTimeout(() => {
        updateToastLink.textContent = 'Unduh';
        updateToastLink.style.pointerEvents = '';
      }, 3000);
    }
  });
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
  initDailyQuotes();
  initQuickLinks();
  initAutoLock();

  // CATATAN: checkUpdateStorage() dipanggil di dalam updateLockerState(true)
  // sehingga toast hanya muncul saat posisi terbuka

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
        if (dailyQuoteContainer) {
          dailyQuoteContainer.classList.add('active');
          dailyQuoteContainer.style.display = 'flex';
        }
        if (quickLinksSection) quickLinksSection.style.display = 'flex';
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

    // Transition to locked state — sembunyikan toast update & footer cuaca & widgets
    hideUpdateToast();
    searchSection.classList.remove('active');
    topBar.classList.remove('active');
    if (weatherFooter) weatherFooter.classList.remove('active');
    if (copyrightFooter) copyrightFooter.classList.remove('active');
    if (dailyQuoteContainer) {
      dailyQuoteContainer.classList.remove('active');
      dailyQuoteContainer.style.display = 'none';
    }
    if (quickLinksSection) quickLinksSection.style.display = 'none';
    closeWeatherModal();
    closeUsernameModal();
    closeModal();
    closeAutoLockModal();
    closeQuickLinkModal();

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

// Opsi: Kunci Browser
menuLockBtn.addEventListener('click', () => {
  closeDropdown();
  chrome.runtime.sendMessage({ action: 'lockBrowser' });
});

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

// Klik bar cuaca di footer → buka modal cuaca
if (weatherBtn) {
  weatherBtn.addEventListener('click', () => {
    openWeatherModal();
  });
}

// ---- Modal Ubah Nama Pengguna --------------------------------------------

function openUsernameModal() {
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
// 1. DAILY INSPIRING QUOTES MODULE
// ============================================================
let currentQuoteIndex = 0;

function initDailyQuotes() {
  const dict = i18n[currentLang] || i18n.en;
  if (dict.quotes && dict.quotes.length > 0) {
    currentQuoteIndex = Math.floor(Math.random() * dict.quotes.length);
  } else {
    currentQuoteIndex = 0;
  }
  updateQuoteDisplay();

  if (btnQuoteShuffle) {
    btnQuoteShuffle.addEventListener('click', shuffleQuote);
  }
}

function updateQuoteDisplay() {
  const dict = i18n[currentLang] || i18n.en;
  if (!dict.quotes || !quoteTextEl || !quoteAuthorEl) return;
  const quote = dict.quotes[currentQuoteIndex % dict.quotes.length];
  quoteTextEl.style.opacity = '0';
  setTimeout(() => {
    quoteTextEl.textContent = `"${quote.text}"`;
    quoteAuthorEl.textContent = `— ${quote.author}`;
    quoteTextEl.style.opacity = '0.85';
  }, 150);
}

function shuffleQuote() {
  const dict = i18n[currentLang] || i18n.en;
  if (!dict.quotes) return;
  let nextIndex = Math.floor(Math.random() * dict.quotes.length);
  if (nextIndex === currentQuoteIndex && dict.quotes.length > 1) {
    nextIndex = (nextIndex + 1) % dict.quotes.length;
  }
  currentQuoteIndex = nextIndex;
  updateQuoteDisplay();
}

// ============================================================
// ============================================================
// 2. MINIMALIST QUICK LINKS MODULE
// ============================================================
const DEFAULT_QUICK_LINKS = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'ChatGPT', url: 'https://chatgpt.com' },
  { name: 'Gmail', url: 'https://mail.google.com' },
  { name: 'Wikipedia', url: 'https://www.wikipedia.org' }
];

let quickLinksList = [];

function initQuickLinks() {
  chrome.storage.local.get('quickLinks', (data) => {
    quickLinksList = (data && Array.isArray(data.quickLinks) && data.quickLinks.length > 0)
      ? data.quickLinks
      : DEFAULT_QUICK_LINKS;
    
    if (!data || !data.quickLinks) {
      chrome.storage.local.set({ quickLinks: quickLinksList });
    }
    renderQuickLinks(quickLinksList);
  });

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
}

function getFaviconUrl(url) {
  try {
    const parsed = new URL(url);
    return `https://www.google.com/s2/favicons?domain=${parsed.hostname}&sz=64`;
  } catch (e) {
    return 'icons/icon-32.png';
  }
}

function renderQuickLinks(links) {
  if (!quickLinksGrid) return;
  quickLinksGrid.innerHTML = '';
  const dict = i18n[currentLang] || i18n.en;

  // 1. Render all shortcut items
  links.forEach((item, index) => {
    const itemWrap = document.createElement('div');
    itemWrap.className = 'quick-link-item';

    // Link clickable wrapper (icon + text)
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

    // Edit button as dedicated overlay control
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
      openEditQuickLinkModal(index);
    });

    itemWrap.appendChild(linkEl);
    itemWrap.appendChild(editBtn);
    quickLinksGrid.appendChild(itemWrap);
  });

  // 2. Render Add button in the exact same grid geometry for 100% horizontal alignment
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
    openAddQuickLinkModal();
  });
  quickLinksGrid.appendChild(addWrap);
}

function openAddQuickLinkModal() {
  const dict = i18n[currentLang] || i18n.en;
  quicklinkEditIndex.value = '-1';
  quicklinkNameInput.value = '';
  quicklinkUrlInput.value = '';
  quicklinkModalFeedback.className = 'modal-feedback';
  quicklinkModalFeedback.textContent = '';
  quicklinkModalTitle.textContent = dict.quicklinkAddTitle;
  quicklinkDeleteBtn.style.display = 'none';
  quicklinkModalOverlay.classList.add('open');
  setTimeout(() => quicklinkNameInput.focus(), 50);
}

function openEditQuickLinkModal(index) {
  const dict = i18n[currentLang] || i18n.en;
  const item = quickLinksList[index];
  if (!item) return;
  quicklinkEditIndex.value = String(index);
  quicklinkNameInput.value = item.name;
  quicklinkUrlInput.value = item.url;
  quicklinkModalFeedback.className = 'modal-feedback';
  quicklinkModalFeedback.textContent = '';
  quicklinkModalTitle.textContent = dict.quicklinkEditTitle;
  quicklinkDeleteBtn.style.display = 'inline-block';
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
  const name = quicklinkNameInput.value.trim();
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

  if (idx >= 0 && idx < quickLinksList.length) {
    quickLinksList[idx] = { name, url };
  } else {
    quickLinksList.push({ name, url });
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
  if (idx >= 0 && idx < quickLinksList.length) {
    quickLinksList.splice(idx, 1);
    chrome.storage.local.set({ quickLinks: quickLinksList }, () => {
      renderQuickLinks(quickLinksList);
      closeQuickLinkModal();
    });
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



