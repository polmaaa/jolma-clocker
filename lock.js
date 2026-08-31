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
const menuChangePwBtn = document.getElementById('menu-changepw-btn');

// Modal "Ubah Kata Sandi" elements
const modalOverlay      = document.getElementById('changepw-modal-overlay');
const modalCloseBtn     = document.getElementById('modal-close-btn');
const modalChangePwForm = document.getElementById('modal-changepw-form');
const modalOldPw        = document.getElementById('modal-old-password');
const modalNewPw        = document.getElementById('modal-new-password');
const modalConfirmPw    = document.getElementById('modal-confirm-password');
const modalFeedback     = document.getElementById('modal-feedback');

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
  if (isUnlocked) {
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
        searchInput.focus();
      }, 200);

      // Cek & tampilkan toast update hanya saat terbuka
      checkUpdateStorage();
    }
  } else {
    // Transition to locked state — sembunyikan toast update
    hideUpdateToast();
    searchSection.classList.remove('active');
    topBar.classList.remove('active');

    setTimeout(() => {
      lockCard.classList.add('active');
      passwordInput.value = '';
      passwordInput.focus();
    }, 100);
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
      // Write the unlock state directly to session storage
      const storageSession = chrome.storage.session || chrome.storage.local;
      storageSession.set({ unlocked: true }, () => {
        // Reload halaman agar transisi ke dashboard lebih bersih
        window.location.reload();
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

// Synchronize lock state changes from storage updates in real-time
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.unlocked) {
    updateLockerState(changes.unlocked.newValue);
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

// Opsi: Ubah Kata Sandi → buka modal
menuChangePwBtn.addEventListener('click', () => {
  closeDropdown();
  openModal();
});

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

  // 3. Dynamic Theme Class based on hour
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
