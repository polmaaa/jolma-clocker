// popup.js

const statusBadge          = document.getElementById('status-badge');
const statusText           = document.getElementById('status-text');
const statusIcon           = document.getElementById('status-icon');
const lockedActions        = document.getElementById('locked-actions');
const unlockedActions      = document.getElementById('unlocked-actions');
const popupLockForm        = document.getElementById('popup-lock-form');
const popupPasswordInput   = document.getElementById('popup-password-input');
const popupError           = document.getElementById('popup-error');
const popupLockBtn         = document.getElementById('popup-lock-btn');

// Accordion Elements - Username
const accordionUsernameToggle  = document.getElementById('accordion-username-toggle');
const accordionUsernamePanel   = document.getElementById('accordion-username-panel');
const chevronUsernameIcon      = document.getElementById('chevron-username-icon');
const changeUsernameForm       = document.getElementById('change-username-form');
const popupUsernameInput       = document.getElementById('popup-username-input');
const changeUsernameFeedback   = document.getElementById('change-username-feedback');

// Accordion Elements - Weather
const accordionWeatherToggle  = document.getElementById('accordion-weather-toggle');
const accordionWeatherPanel   = document.getElementById('accordion-weather-panel');
const chevronWeatherIcon      = document.getElementById('chevron-weather-icon');
const popupGpsToggle          = document.getElementById('popup-gps-toggle');
const popupWeatherIcon        = document.getElementById('popup-weather-icon');
const popupWeatherInfo        = document.getElementById('popup-weather-info');
const popupWeatherFeedback    = document.getElementById('popup-weather-feedback');

// Accordion Elements - Password
const accordionToggle      = document.getElementById('accordion-toggle');
const accordionPanel       = document.getElementById('accordion-panel');
const chevronIcon          = document.getElementById('chevron-icon');
const changePwForm         = document.getElementById('change-pw-form');
const oldPasswordInput     = document.getElementById('old-password');
const newPasswordInput     = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const changePwFeedback     = document.getElementById('change-pw-feedback');

// Update Elements
const updateBanner         = document.getElementById('update-banner');
const updateVersionLabel   = document.getElementById('update-version-label');
const updateLink           = document.getElementById('update-link');
const localVersionEl       = document.getElementById('local-version');
const checkUpdateBtn       = document.getElementById('check-update-btn');
const checkUpdateLabel     = document.getElementById('check-update-label');
const refreshIcon          = document.getElementById('refresh-icon');

// ---- Init ----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // Tampilkan versi lokal di header
  const localVersion = chrome.runtime.getManifest().version;
  if (localVersionEl) localVersionEl.textContent = `v${localVersion}`;

  // Load saved user name
  chrome.storage.local.get(['userName', 'useGpsLocation', 'weatherCache'], (data) => {
    if (popupUsernameInput) {
      popupUsernameInput.value = (data && data.userName && data.userName.trim()) || 'Polma Sihotang';
    }
    if (popupGpsToggle) {
      popupGpsToggle.checked = !!(data && data.useGpsLocation);
    }
    if (data && data.weatherCache) {
      if (popupWeatherIcon) popupWeatherIcon.textContent = data.weatherCache.icon || '🌤️';
      if (popupWeatherInfo) popupWeatherInfo.textContent = `${data.weatherCache.temp || '--°C'} • ${data.weatherCache.condition || 'Cerah'} (${data.weatherCache.city || 'Indonesia'})`;
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
  updateVersionLabel.textContent = `Versi ${version} tersedia`;
  updateLink.href = url || 'https://github.com/polmaaa/polock';
  updateBanner.classList.add('visible');
}

// Dengarkan perubahan storage dari background (update terdeteksi saat popup terbuka)
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
  refreshIcon.classList.add('spinning');
  checkUpdateLabel.textContent = 'Memeriksa...';
  checkUpdateBtn.disabled = true;

  chrome.runtime.sendMessage({ action: 'checkUpdateNow' }, () => {
    // Tunggu sebentar supaya storage update dulu sebelum dibaca
    setTimeout(() => {
      loadUpdateBannerState();
      refreshIcon.classList.remove('spinning');
      checkUpdateLabel.textContent = 'Periksa Update';
      checkUpdateBtn.disabled = false;
    }, 1500);
  });
});

// ---- Lock/Unlock UI ------------------------------------------------------

function updatePopupUI(isUnlocked) {
  if (isUnlocked) {
    statusBadge.className = 'status-badge unlocked';
    statusText.textContent = 'Terbuka';
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
    statusText.textContent = 'Terkunci';
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
    const newName = popupUsernameInput.value.trim();
    if (!newName) {
      changeUsernameFeedback.className = 'feedback-text error';
      changeUsernameFeedback.textContent = 'Nama tidak boleh kosong!';
      return;
    }

    chrome.storage.local.set({ userName: newName }, () => {
      changeUsernameFeedback.className = 'feedback-text success';
      changeUsernameFeedback.textContent = 'Nama berhasil diperbarui!';
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
    popupWeatherFeedback.className = 'feedback-text';
    popupWeatherFeedback.textContent = '';

    if (isGps) {
      if (!navigator.geolocation) {
        popupGpsToggle.checked = false;
        popupWeatherFeedback.className = 'feedback-text error';
        popupWeatherFeedback.textContent = 'Geolocation tidak didukung.';
        return;
      }

      popupWeatherFeedback.className = 'feedback-text';
      popupWeatherFeedback.style.display = 'block';
      popupWeatherFeedback.style.color = 'var(--primary)';
      popupWeatherFeedback.textContent = 'Meminta izin lokasi...';

      navigator.geolocation.getCurrentPosition(
        () => {
          chrome.storage.local.set({ useGpsLocation: true, weatherCache: null }, () => {
            popupWeatherFeedback.className = 'feedback-text success';
            popupWeatherFeedback.textContent = '✓ Lokasi presisi GPS aktif!';
          });
        },
        () => {
          popupGpsToggle.checked = false;
          chrome.storage.local.set({ useGpsLocation: false, weatherCache: null });
          popupWeatherFeedback.className = 'feedback-text error';
          popupWeatherFeedback.textContent = 'Izin lokasi ditolak/gagal.';
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      chrome.storage.local.set({ useGpsLocation: false, weatherCache: null }, () => {
        popupWeatherFeedback.className = 'feedback-text success';
        popupWeatherFeedback.textContent = '✓ Menggunakan deteksi IP otomatis.';
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
  const oldPassword     = oldPasswordInput.value;
  const newPassword     = newPasswordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (newPassword !== confirmPassword) {
    changePwFeedback.className = 'feedback-text error';
    changePwFeedback.textContent = 'Konfirmasi kata sandi baru tidak sesuai!';
    return;
  }

  chrome.storage.local.get('password', (data) => {
    if (chrome.runtime.lastError) {
      changePwFeedback.className = 'feedback-text error';
      changePwFeedback.textContent = 'Kesalahan akses penyimpanan.';
      return;
    }
    const currentPassword = (data && data.password) || 'ganteng';
    if (oldPassword === currentPassword) {
      chrome.storage.local.set({ password: newPassword }, () => {
        if (chrome.runtime.lastError) {
          changePwFeedback.className = 'feedback-text error';
          changePwFeedback.textContent = 'Gagal menyimpan sandi baru.';
        } else {
          changePwFeedback.className = 'feedback-text success';
          changePwFeedback.textContent = 'Kata sandi berhasil diperbarui!';
          oldPasswordInput.value = '';
          newPasswordInput.value = '';
          confirmPasswordInput.value = '';
        }
      });
    } else {
      changePwFeedback.className = 'feedback-text error';
      changePwFeedback.textContent = 'Kata sandi lama salah!';
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
