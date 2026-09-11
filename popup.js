// popup.js

const statusBadge          = document.getElementById('status-badge');
const statusText           = document.getElementById('status-text');
const statusIcon           = document.getElementById('status-icon');
const lockedActions        = document.getElementById('locked-actions');
const unlockedActions      = document.getElementById('unlocked-actions');
const popupLockForm        = document.getElementById('popup-lock-form');
const popupPasswordInput   = document.getElementById('popup-password-input');
const popupError           = document.getElementById('popup-error');
const popupUnlockSubmit    = document.getElementById('popup-unlock-submit');
const popupLockBtn         = document.getElementById('popup-lock-btn');
const popupUnlockedInfo    = document.getElementById('popup-unlocked-info');

// Language switcher elements
const popupBtnLangId       = document.getElementById('popup-btn-lang-id');
const popupBtnLangEn       = document.getElementById('popup-btn-lang-en');

// Accordion Elements - Username
const accordionUsernameToggle  = document.getElementById('accordion-username-toggle');
const accordionUsernameLabel   = document.getElementById('accordion-username-label');
const accordionUsernamePanel   = document.getElementById('accordion-username-panel');
const chevronUsernameIcon      = document.getElementById('chevron-username-icon');
const changeUsernameForm       = document.getElementById('change-username-form');
const popupUsernameInput       = document.getElementById('popup-username-input');
const popupUsernameSubmit      = document.getElementById('popup-username-submit');
const changeUsernameFeedback   = document.getElementById('change-username-feedback');

// Accordion Elements - Weather
const accordionWeatherToggle   = document.getElementById('accordion-weather-toggle');
const accordionWeatherLabel    = document.getElementById('accordion-weather-label');
const accordionWeatherPanel    = document.getElementById('accordion-weather-panel');
const chevronWeatherIcon       = document.getElementById('chevron-weather-icon');
const popupWeatherGpsLabel     = document.getElementById('popup-weather-gps-label');
const popupGpsToggle           = document.getElementById('popup-gps-toggle');
const popupWeatherIcon         = document.getElementById('popup-weather-icon');
const popupWeatherInfo         = document.getElementById('popup-weather-info');
const popupWeatherFeedback     = document.getElementById('popup-weather-feedback');

// Accordion Elements - Password
const accordionToggle      = document.getElementById('accordion-toggle');
const accordionPwLabel     = document.getElementById('accordion-pw-label');
const accordionPanel       = document.getElementById('accordion-panel');
const chevronIcon          = document.getElementById('chevron-icon');
const changePwForm         = document.getElementById('change-pw-form');
const oldPasswordInput     = document.getElementById('old-password');
const newPasswordInput     = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const popupPwSubmit        = document.getElementById('popup-pw-submit');
const changePwFeedback     = document.getElementById('change-pw-feedback');

// Update Elements
const updateBanner         = document.getElementById('update-banner');
const updateVersionLabel   = document.getElementById('update-version-label');
const updateLink           = document.getElementById('update-link');
const localVersionEl       = document.getElementById('local-version');
const checkUpdateBtn       = document.getElementById('check-update-btn');
const checkUpdateLabel     = document.getElementById('check-update-label');
const refreshIcon          = document.getElementById('refresh-icon');

// ============================================================
// INTERNATIONALIZATION (i18n) DICTIONARY
// ============================================================

let currentLang = 'id';
let currentIsUnlocked = false;

const i18n = {
  id: {
    statusChecking: 'Memeriksa...',
    statusUnlocked: 'Terbuka',
    statusLocked: 'Terkunci',
    passwordPlaceholder: 'Masukkan kata sandi...',
    passwordError: 'Sandi salah!',
    unlockBtn: 'Buka Kunci',
    unlockedInfo: 'Aktivitas browser Anda normal dan dapat diakses sepenuhnya.',
    lockNowBtn: 'Kunci Sekarang',
    usernameTitle: 'Ubah Nama Pengguna',
    usernamePlaceholder: 'Nama Anda...',
    usernameSaveBtn: 'Simpan Nama',
    usernameSuccess: 'Nama berhasil diperbarui!',
    usernameEmpty: 'Nama tidak boleh kosong!',
    weatherTitle: 'Pengaturan Cuaca',
    weatherGpsLabel: 'Lokasi Presisi (GPS Real-time)',
    weatherGpsActive: '✓ Lokasi presisi GPS aktif!',
    weatherGpsError: 'Izin lokasi ditolak/gagal.',
    weatherIpActive: '✓ Menggunakan deteksi IP otomatis.',
    weatherLoading: 'Memuat cuaca...',
    weatherRequesting: 'Meminta izin lokasi...',
    weatherUnsupported: 'Geolocation tidak didukung.',
    pwTitle: 'Ubah Kata Sandi',
    oldPwPlaceholder: 'Kata sandi lama...',
    newPwPlaceholder: 'Kata sandi baru...',
    confirmPwPlaceholder: 'Konfirmasi kata sandi baru...',
    pwSaveBtn: 'Simpan Kata Sandi',
    pwSuccess: 'Kata sandi berhasil diperbarui!',
    pwMismatch: 'Konfirmasi kata sandi baru tidak sesuai!',
    pwOldWrong: 'Kata sandi lama salah!',
    pwStorageError: 'Kesalahan akses penyimpanan.',
    pwSaveFailed: 'Gagal menyimpan sandi baru.',
    checkUpdate: 'Periksa Update',
    checkingUpdate: 'Memeriksa...',
    updateAvailable: 'Update tersedia!',
    updateVersion: (ver) => `Versi ${ver} tersedia`,
    downloadBtn: 'Unduh',
    weatherDesc: {
      0: 'Cerah', 1: 'Sebagian Cerah', 2: 'Cerah Berawan', 3: 'Berawan Tebal',
      45: 'Berkabut', 48: 'Berkabut', 51: 'Gerimis Ringan', 53: 'Gerimis',
      55: 'Gerimis Lebat', 61: 'Hujan Ringan', 63: 'Hujan Sedang', 65: 'Hujan Lebat',
      71: 'Bersalju', 80: 'Hujan Lokal', 81: 'Hujan Deras', 95: 'Badai Petir'
    }
  },
  en: {
    statusChecking: 'Checking...',
    statusUnlocked: 'Unlocked',
    statusLocked: 'Locked',
    passwordPlaceholder: 'Enter password...',
    passwordError: 'Incorrect password!',
    unlockBtn: 'Unlock',
    unlockedInfo: 'Your browser activity is normal and fully accessible.',
    lockNowBtn: 'Lock Now',
    usernameTitle: 'Change Username',
    usernamePlaceholder: 'Your name...',
    usernameSaveBtn: 'Save Name',
    usernameSuccess: 'Name updated successfully!',
    usernameEmpty: 'Name cannot be empty!',
    weatherTitle: 'Weather Settings',
    weatherGpsLabel: 'Precise Location (Real-time GPS)',
    weatherGpsActive: '✓ GPS precise location enabled!',
    weatherGpsError: 'Location permission denied/failed.',
    weatherIpActive: '✓ Using automatic IP detection.',
    weatherLoading: 'Loading weather...',
    weatherRequesting: 'Requesting location permission...',
    weatherUnsupported: 'Geolocation is not supported.',
    pwTitle: 'Change Password',
    oldPwPlaceholder: 'Current password...',
    newPwPlaceholder: 'New password...',
    confirmPwPlaceholder: 'Confirm new password...',
    pwSaveBtn: 'Save Password',
    pwSuccess: 'Password updated successfully!',
    pwMismatch: 'New password confirmation does not match!',
    pwOldWrong: 'Incorrect current password!',
    pwStorageError: 'Storage access error.',
    pwSaveFailed: 'Failed to save new password.',
    checkUpdate: 'Check Updates',
    checkingUpdate: 'Checking...',
    updateAvailable: 'Update available!',
    updateVersion: (ver) => `Version ${ver} available`,
    downloadBtn: 'Download',
    weatherDesc: {
      0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
      45: 'Foggy', 48: 'Depositing Rime Fog', 51: 'Light Drizzle', 53: 'Moderate Drizzle',
      55: 'Dense Drizzle', 61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
      71: 'Snow Fall', 80: 'Rain Showers', 81: 'Heavy Showers', 95: 'Thunderstorm'
    }
  }
};

function applyTranslations(lang) {
  currentLang = (lang === 'en') ? 'en' : 'id';
  const dict = i18n[currentLang];

  // Buttons state
  if (popupBtnLangId) popupBtnLangId.classList.toggle('active', currentLang === 'id');
  if (popupBtnLangEn) popupBtnLangEn.classList.toggle('active', currentLang === 'en');

  // Status text
  if (statusText) {
    statusText.textContent = currentIsUnlocked ? dict.statusUnlocked : dict.statusLocked;
  }

  // Locked View
  if (popupPasswordInput) popupPasswordInput.placeholder = dict.passwordPlaceholder;
  if (popupError) popupError.textContent = dict.passwordError;
  if (popupUnlockSubmit) popupUnlockSubmit.textContent = dict.unlockBtn;

  // Unlocked View
  if (popupUnlockedInfo) popupUnlockedInfo.textContent = dict.unlockedInfo;
  if (popupLockBtn) popupLockBtn.textContent = dict.lockNowBtn;

  // Username
  if (accordionUsernameLabel) accordionUsernameLabel.textContent = dict.usernameTitle;
  if (popupUsernameInput) popupUsernameInput.placeholder = dict.usernamePlaceholder;
  if (popupUsernameSubmit) popupUsernameSubmit.textContent = dict.usernameSaveBtn;

  // Weather
  if (accordionWeatherLabel) accordionWeatherLabel.textContent = dict.weatherTitle;
  if (popupWeatherGpsLabel) popupWeatherGpsLabel.textContent = dict.weatherGpsLabel;

  // Password
  if (accordionPwLabel) accordionPwLabel.textContent = dict.pwTitle;
  if (oldPasswordInput) oldPasswordInput.placeholder = dict.oldPwPlaceholder;
  if (newPasswordInput) newPasswordInput.placeholder = dict.newPwPlaceholder;
  if (confirmPasswordInput) confirmPasswordInput.placeholder = dict.confirmPwPlaceholder;
  if (popupPwSubmit) popupPwSubmit.textContent = dict.pwSaveBtn;

  // Footer & update
  if (checkUpdateLabel && !checkUpdateBtn.disabled) checkUpdateLabel.textContent = dict.checkUpdate;

  // Update weather preview text if present
  chrome.storage.local.get('weatherCache', (data) => {
    if (data && data.weatherCache && popupWeatherInfo) {
      const c = data.weatherCache;
      let cond = c.condition;
      if (c.weatherCode !== undefined && dict.weatherDesc[c.weatherCode]) {
        cond = dict.weatherDesc[c.weatherCode];
      }
      const city = c.city || (currentLang === 'en' ? 'Worldwide' : 'Indonesia');
      popupWeatherInfo.textContent = `${c.temp || '--°C'} • ${cond} (${city})`;
    }
  });
}

function setLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'id';
  chrome.storage.local.set({ language: currentLang }, () => {
    applyTranslations(currentLang);
  });
}

if (popupBtnLangId) {
  popupBtnLangId.addEventListener('click', () => setLanguage('id'));
}
if (popupBtnLangEn) {
  popupBtnLangEn.addEventListener('click', () => setLanguage('en'));
}


// ---- Init ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Tampilkan versi lokal di header
  const localVersion = chrome.runtime.getManifest().version;
  if (localVersionEl) localVersionEl.textContent = `v${localVersion}`;

  // Load language first
  chrome.storage.local.get(['language', 'userName', 'useGpsLocation', 'weatherCache'], (data) => {
    const lang = (data && data.language) || 'id';
    applyTranslations(lang);

    if (popupUsernameInput) {
      popupUsernameInput.value = (data && data.userName && data.userName.trim()) || 'Polma Sihotang';
    }
    if (popupGpsToggle) {
      popupGpsToggle.checked = !!(data && data.useGpsLocation);
    }
    if (data && data.weatherCache) {
      const dict = i18n[currentLang];
      const c = data.weatherCache;
      let cond = c.condition;
      if (c.weatherCode !== undefined && dict.weatherDesc[c.weatherCode]) {
        cond = dict.weatherDesc[c.weatherCode];
      }
      const city = c.city || (currentLang === 'en' ? 'Worldwide' : 'Indonesia');
      if (popupWeatherIcon) popupWeatherIcon.textContent = c.icon || '🌤️';
      if (popupWeatherInfo) popupWeatherInfo.textContent = `${c.temp || '--°C'} • ${cond || 'Cerah'} (${city})`;
    }
  });

  // Cek status lock
  const storageSession = chrome.storage.session || chrome.storage.local;
  storageSession.get('unlocked', (session) => {
    const isUnlocked = !!(session && session.unlocked);
    updatePopupUI(isUnlocked);
    if (!isUnlocked) popupPasswordInput.focus();
  });

  // Cek apakah ada update yang sudah terdeteksi sebelumnya
  loadUpdateBannerState();
});

// ---- Update Banner Logic -------------------------------------------------

function loadUpdateBannerState() {
  chrome.storage.local.get(['updateAvailable', 'updateVersion', 'updateUrl'], (data) => {
    if (data.updateAvailable) {
      showUpdateBanner(data.updateVersion, data.updateUrl);
    } else {
      updateBanner.classList.remove('visible');
    }
  });
}

function showUpdateBanner(version, url) {
  const dict = i18n[currentLang];
  const updateTitleEl = document.querySelector('.update-title');
  if (updateTitleEl) updateTitleEl.textContent = dict.updateAvailable;
  if (updateVersionLabel) updateVersionLabel.textContent = dict.updateVersion(version);
  if (updateLink) {
    updateLink.textContent = dict.downloadBtn;
    updateLink.href = url || 'https://github.com/polmaaa/polock';
  }
  updateBanner.classList.add('visible');
}

// Dengarkan perubahan storage dari background
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.updateAvailable) {
    if (changes.updateAvailable.newValue) {
      chrome.storage.local.get(['updateVersion', 'updateUrl'], (data) => {
        showUpdateBanner(data.updateVersion, data.updateUrl);
      });
    } else {
      updateBanner.classList.remove('visible');
    }
  }

  // Sinkronisasi bahasa
  if (changes.language) {
    applyTranslations(changes.language.newValue);
  }

  // Sinkronisasi state lock/unlock
  if (changes.unlocked) {
    updatePopupUI(changes.unlocked.newValue);
    if (!changes.unlocked.newValue) {
      setTimeout(() => popupPasswordInput.focus(), 50);
    }
  }
});

// Tombol cek update manual
checkUpdateBtn.addEventListener('click', () => {
  const dict = i18n[currentLang];
  refreshIcon.classList.add('spinning');
  checkUpdateLabel.textContent = dict.checkingUpdate;
  checkUpdateBtn.disabled = true;

  chrome.runtime.sendMessage({ action: 'checkUpdateNow' }, () => {
    setTimeout(() => {
      loadUpdateBannerState();
      refreshIcon.classList.remove('spinning');
      checkUpdateLabel.textContent = dict.checkUpdate;
      checkUpdateBtn.disabled = false;
    }, 1500);
  });
});

// ---- Lock/Unlock UI ------------------------------------------------------

function updatePopupUI(isUnlocked) {
  currentIsUnlocked = !!isUnlocked;
  const dict = i18n[currentLang];

  if (isUnlocked) {
    statusBadge.className = 'status-badge unlocked';
    statusText.textContent = dict.statusUnlocked;
    statusIcon.innerHTML = `
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0"></path>
    `;
    lockedActions.classList.remove('active');
    unlockedActions.classList.add('active');
    popupError.classList.remove('visible');
    popupPasswordInput.value = '';
  } else {
    statusBadge.className = 'status-badge locked';
    statusText.textContent = dict.statusLocked;
    statusIcon.innerHTML = `
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    `;
    unlockedActions.classList.remove('active');
    lockedActions.classList.add('active');
    accordionPanel.classList.remove('show');
    chevronIcon.classList.remove('rotate');
    if (accordionUsernamePanel) {
      accordionUsernamePanel.classList.remove('show');
      chevronUsernameIcon.classList.remove('rotate');
    }
    clearChangePasswordForm();
  }
}

// ---- Change Username Accordion -------------------------------------------

if (accordionUsernameToggle) {
  accordionUsernameToggle.addEventListener('click', () => {
    accordionUsernamePanel.classList.toggle('show');
    chevronUsernameIcon.classList.toggle('rotate');
    if (changeUsernameFeedback) {
      changeUsernameFeedback.className = 'feedback-text';
      changeUsernameFeedback.textContent = '';
    }
  });
}

if (changeUsernameForm) {
  changeUsernameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dict = i18n[currentLang];
    const newName = popupUsernameInput.value.trim();
    if (!newName) {
      changeUsernameFeedback.className = 'feedback-text error';
      changeUsernameFeedback.textContent = dict.usernameEmpty;
      return;
    }

    chrome.storage.local.set({ userName: newName }, () => {
      changeUsernameFeedback.className = 'feedback-text success';
      changeUsernameFeedback.textContent = dict.usernameSuccess;
    });
  });
}

// ---- Weather Settings Accordion ------------------------------------------

if (accordionWeatherToggle) {
  accordionWeatherToggle.addEventListener('click', () => {
    accordionWeatherPanel.classList.toggle('show');
    chevronWeatherIcon.classList.toggle('rotate');
  });
}

if (popupGpsToggle) {
  popupGpsToggle.addEventListener('change', () => {
    const isGps = popupGpsToggle.checked;
    const dict = i18n[currentLang];
    popupWeatherFeedback.className = 'feedback-text';
    popupWeatherFeedback.textContent = '';

    if (isGps) {
      if (!navigator.geolocation) {
        popupGpsToggle.checked = false;
        popupWeatherFeedback.className = 'feedback-text error';
        popupWeatherFeedback.textContent = dict.weatherUnsupported;
        return;
      }

      popupWeatherFeedback.className = 'feedback-text';
      popupWeatherFeedback.style.display = 'block';
      popupWeatherFeedback.style.color = 'var(--primary)';
      popupWeatherFeedback.textContent = dict.weatherRequesting;

      navigator.geolocation.getCurrentPosition(
        () => {
          chrome.storage.local.set({ useGpsLocation: true, weatherCache: null }, () => {
            popupWeatherFeedback.className = 'feedback-text success';
            popupWeatherFeedback.textContent = dict.weatherGpsActive;
          });
        },
        () => {
          popupGpsToggle.checked = false;
          chrome.storage.local.set({ useGpsLocation: false, weatherCache: null });
          popupWeatherFeedback.className = 'feedback-text error';
          popupWeatherFeedback.textContent = dict.weatherGpsError;
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      chrome.storage.local.set({ useGpsLocation: false, weatherCache: null }, () => {
        popupWeatherFeedback.className = 'feedback-text success';
        popupWeatherFeedback.textContent = dict.weatherIpActive;
      });
    }
  });
}

// ---- Change Password Accordion -------------------------------------------

function clearChangePasswordForm() {
  oldPasswordInput.value     = '';
  newPasswordInput.value     = '';
  confirmPasswordInput.value = '';
  changePwFeedback.className = 'feedback-text';
  changePwFeedback.textContent = '';
}

accordionToggle.addEventListener('click', () => {
  accordionPanel.classList.toggle('show');
  chevronIcon.classList.toggle('rotate');
  if (!accordionPanel.classList.contains('show')) clearChangePasswordForm();
});

changePwForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const dict = i18n[currentLang];
  const oldPassword     = oldPasswordInput.value;
  const newPassword     = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (newPassword !== confirmPassword) {
    changePwFeedback.className = 'feedback-text error';
    changePwFeedback.textContent = dict.pwMismatch;
    return;
  }

  chrome.storage.local.get('password', (data) => {
    if (chrome.runtime.lastError) {
      changePwFeedback.className = 'feedback-text error';
      changePwFeedback.textContent = dict.pwStorageError;
      return;
    }
    const currentPassword = (data && data.password) || 'ganteng';
    if (oldPassword === currentPassword) {
      chrome.storage.local.set({ password: newPassword }, () => {
        if (chrome.runtime.lastError) {
          changePwFeedback.className = 'feedback-text error';
          changePwFeedback.textContent = dict.pwSaveFailed;
        } else {
          changePwFeedback.className = 'feedback-text success';
          changePwFeedback.textContent = dict.pwSuccess;
          oldPasswordInput.value = '';
          newPasswordInput.value = '';
          confirmPasswordInput.value = '';
        }
      });
    } else {
      changePwFeedback.className = 'feedback-text error';
      changePwFeedback.textContent = dict.pwOldWrong;
    }
  });
});

// ---- Unlock via popup form -----------------------------------------------

popupLockForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = popupPasswordInput.value;
  chrome.storage.local.get('password', (data) => {
    const currentPassword = (data && data.password) || 'ganteng';
    if (password === currentPassword) {
      const storageSession = chrome.storage.session || chrome.storage.local;
      storageSession.set({ unlocked: true }, () => {
        updatePopupUI(true);
      });
    } else {
      popupError.classList.add('visible');
      popupPasswordInput.value = '';
      popupPasswordInput.focus();
    }
  });
});

// ---- Manual lock button --------------------------------------------------

popupLockBtn.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'lockBrowser' }, () => {
    updatePopupUI(false);
  });
});

