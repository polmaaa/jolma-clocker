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
const menuUsernameBtn = document.getElementById('menu-username-btn');
const menuWeatherBtn  = document.getElementById('menu-weather-btn');
const menuChangePwBtn = document.getElementById('menu-changepw-btn');

// Weather Footer & Modal elements
const weatherFooter           = document.getElementById('weather-footer');
const weatherBtn              = document.getElementById('weather-btn');
const weatherIcon             = document.getElementById('weather-icon');
const weatherTemp             = document.getElementById('weather-temp');
const weatherCondition        = document.getElementById('weather-condition');
const weatherCity             = document.getElementById('weather-city');
const weatherModalOverlay     = document.getElementById('weather-modal-overlay');
const weatherModalCloseBtn    = document.getElementById('weather-modal-close-btn');
const modalGpsToggle          = document.getElementById('modal-gps-toggle');
const modalWeatherIcon        = document.getElementById('modal-weather-icon');
const modalWeatherTemp        = document.getElementById('modal-weather-temp');
const modalWeatherDesc        = document.getElementById('modal-weather-desc');
const modalWeatherLoc         = document.getElementById('modal-weather-loc');
const weatherModalFeedback    = document.getElementById('weather-modal-feedback');
const modalRefreshWeatherBtn  = document.getElementById('modal-refresh-weather-btn');

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
  // Start Clock and Date immediately
  updateClockAndDate();
  setInterval(updateClockAndDate, 1000);

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

    // Transition to locked state — sembunyikan toast update & footer cuaca
    hideUpdateToast();
    searchSection.classList.remove('active');
    topBar.classList.remove('active');
    if (weatherFooter) weatherFooter.classList.remove('active');
    closeWeatherModal();

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
  if (changes.userName) {
    updateGreeting();
  }
});

// ---- Menu Dropdown -------------------------------------------------------

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
  const newName = modalUsernameInput.value.trim();
  if (!newName) {
    usernameModalFeedback.className = 'modal-feedback error';
    usernameModalFeedback.textContent = 'Nama tidak boleh kosong!';
    return;
  }

  chrome.storage.local.set({ userName: newName }, () => {
    usernameModalFeedback.className = 'modal-feedback success';
    usernameModalFeedback.textContent = 'Nama berhasil diperbarui!';
    updateGreeting();
    setTimeout(closeUsernameModal, 1200);
  });
});

// ---- Modal Pengaturan Cuaca ----------------------------------------------

function openWeatherModal() {
  chrome.storage.local.get(['useGpsLocation', 'weatherCache'], (data) => {
    modalGpsToggle.checked = !!data.useGpsLocation;
    if (data.weatherCache) {
      modalWeatherIcon.textContent = data.weatherCache.icon || '🌤️';
      modalWeatherTemp.textContent = data.weatherCache.temp || '--°C';
      modalWeatherDesc.textContent = data.weatherCache.condition || 'Memuat...';
      modalWeatherLoc.textContent = `📍 Lokasi: ${data.weatherCache.city || 'Indonesia'} (${data.weatherCache.source || 'Deteksi IP'})`;
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
    weatherModalFeedback.className = 'modal-feedback';
    weatherModalFeedback.textContent = '';

    if (isGps) {
      if (!navigator.geolocation) {
        modalGpsToggle.checked = false;
        weatherModalFeedback.className = 'modal-feedback error';
        weatherModalFeedback.textContent = 'Geolocation tidak didukung browser ini.';
        return;
      }

      weatherModalFeedback.className = 'modal-feedback';
      weatherModalFeedback.style.display = 'block';
      weatherModalFeedback.style.color = 'var(--primary)';
      weatherModalFeedback.textContent = 'Meminta izin lokasi perangkat...';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          chrome.storage.local.set({ useGpsLocation: true }, () => {
            weatherModalFeedback.className = 'modal-feedback success';
            weatherModalFeedback.textContent = '✓ Lokasi presisi GPS aktif!';
            loadWeather(true);
          });
        },
        (err) => {
          modalGpsToggle.checked = false;
          chrome.storage.local.set({ useGpsLocation: false });
          weatherModalFeedback.className = 'modal-feedback error';
          weatherModalFeedback.textContent = 'Izin lokasi ditolak/gagal. Beralih ke deteksi IP.';
          loadWeather(true);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      chrome.storage.local.set({ useGpsLocation: false }, () => {
        weatherModalFeedback.className = 'modal-feedback success';
        weatherModalFeedback.textContent = '✓ Menggunakan deteksi IP otomatis.';
        loadWeather(true);
      });
    }
  });
}

// Tombol Perbarui Cuaca Sekarang
if (modalRefreshWeatherBtn) {
  modalRefreshWeatherBtn.addEventListener('click', () => {
    modalRefreshWeatherBtn.textContent = '⏳ Memperbarui...';
    modalRefreshWeatherBtn.disabled = true;
    loadWeather(true).finally(() => {
      modalRefreshWeatherBtn.textContent = 'Perbarui Cuaca Sekarang';
      modalRefreshWeatherBtn.disabled = false;
      weatherModalFeedback.className = 'modal-feedback success';
      weatherModalFeedback.textContent = '✓ Data cuaca berhasil diperbarui!';
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
  const oldPw     = modalOldPw.value;
  const newPw     = modalNewPw.value;
  const confirmPw = modalConfirmPw.value;

  if (newPw !== confirmPw) {
    modalFeedback.className = 'modal-feedback error';
    modalFeedback.textContent = 'Konfirmasi kata sandi tidak sesuai!';
    return;
  }

  chrome.storage.local.get('password', (data) => {
    const currentPassword = (data && data.password) || 'ganteng';
    if (oldPw === currentPassword) {
      chrome.storage.local.set({ password: newPw }, () => {
        modalFeedback.className = 'modal-feedback success';
        modalFeedback.textContent = 'Kata sandi berhasil diperbarui!';
        modalOldPw.value = '';
        modalNewPw.value = '';
        modalConfirmPw.value = '';
        // Tutup modal otomatis setelah 1.5 detik
        setTimeout(closeModal, 1500);
      });
    } else {
      modalFeedback.className = 'modal-feedback error';
      modalFeedback.textContent = 'Kata sandi lama salah!';
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
  let prefix = 'Selamat Malam';

  if (hour >= 4 && hour < 11) {
    prefix = 'Selamat Pagi';
  } else if (hour >= 11 && hour < 15) {
    prefix = 'Selamat Siang';
  } else if (hour >= 15 && hour < 18.5) {
    prefix = 'Selamat Sore';
  } else {
    prefix = 'Selamat Malam';
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

// Dashboard: Clock, Date, and Greeting in Indonesian with Dynamic Themes
function updateClockAndDate() {
  const now = new Date();

  // 1. Clock (HH:MM:SS)
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

  // 2. Date in Indonesian
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayName = days[now.getDay()];
  const dayNum = now.getDate();
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  document.getElementById('date').textContent = `${dayName}, ${dayNum} ${monthName} ${year}`;

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
  switch (code) {
    case 0:
      return { label: 'Cerah', icon: isNight ? '🌙' : '☀️' };
    case 1:
      return { label: 'Sebagian Cerah', icon: isNight ? '🌤️' : '🌤️' };
    case 2:
      return { label: 'Cerah Berawan', icon: isNight ? '☁️' : '⛅' };
    case 3:
      return { label: 'Berawan Tebal', icon: '☁️' };
    case 45:
    case 48:
      return { label: 'Berkabut', icon: '🌫️' };
    case 51:
    case 53:
    case 55:
      return { label: 'Gerimis Ringan', icon: '🌦️' };
    case 56:
    case 57:
      return { label: 'Gerimis Dingin', icon: '🌧️' };
    case 61:
      return { label: 'Hujan Ringan', icon: '🌦️' };
    case 63:
      return { label: 'Hujan Sedang', icon: '🌧️' };
    case 65:
      return { label: 'Hujan Lebat', icon: '🌧️' };
    case 66:
    case 67:
      return { label: 'Hujan Beku', icon: '🌨️' };
    case 71:
    case 73:
    case 75:
    case 77:
      return { label: 'Bersalju', icon: '❄️' };
    case 80:
      return { label: 'Hujan Lokal', icon: '🌦️' };
    case 81:
    case 82:
      return { label: 'Hujan Deras', icon: '⛈️' };
    case 85:
    case 86:
      return { label: 'Hujan Salju', icon: '🌨️' };
    case 95:
      return { label: 'Badai Petir', icon: '⛈️' };
    case 96:
    case 99:
      return { label: 'Badai Petir & Es', icon: '🌩️' };
    default:
      return { label: 'Cerah Berawan', icon: '⛅' };
  }
}

function updateWeatherUI(cache) {
  if (!cache) return;
  if (weatherIcon) weatherIcon.textContent = cache.icon || '🌤️';
  if (weatherTemp) weatherTemp.textContent = cache.temp || '--°C';
  if (weatherCondition) weatherCondition.textContent = cache.condition || 'Cerah';
  if (weatherCity) weatherCity.textContent = cache.city || 'Indonesia';

  if (modalWeatherIcon) modalWeatherIcon.textContent = cache.icon || '🌤️';
  if (modalWeatherTemp) modalWeatherTemp.textContent = cache.temp || '--°C';
  if (modalWeatherDesc) modalWeatherDesc.textContent = cache.condition || 'Cerah';
  if (modalWeatherLoc) modalWeatherLoc.textContent = `📍 Lokasi: ${cache.city || 'Indonesia'} (${cache.source || 'Deteksi IP'})`;
}

async function loadWeather(forceRefresh = false) {
  return new Promise((resolve) => {
    chrome.storage.local.get(['weatherCache', 'useGpsLocation'], async (data) => {
      const cache = data.weatherCache;
      const useGps = !!data.useGpsLocation;
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
              const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`);
              const geoData = await geoRes.json();
              cityName = geoData.locality || geoData.city || geoData.principalSubdivision || 'Lokasi Saya';
            } catch (e) {
              cityName = 'Lokasi Saya';
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
            cityName = ipData.city || ipData.region || ipData.country || 'Indonesia';
          } catch (e) {
            try {
              const ipRes2 = await fetch('https://freeipapi.com/api/json');
              const ipData2 = await ipRes2.json();
              lat = ipData2.latitude;
              lon = ipData2.longitude;
              cityName = ipData2.cityName || ipData2.regionName || 'Indonesia';
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
