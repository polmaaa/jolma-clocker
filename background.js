// background.js

// ============================================================
// KEEP AWAKE: Mencegah layar/laptop masuk sleep atau lock screen
// Menggunakan chrome.power API (permission: "power")
// ============================================================

// Aktifkan mode keep-awake: layar tetap menyala, tidak sleep
function keepScreenAwake() {
  chrome.power.requestKeepAwake('display');
}

// Lepaskan mode keep-awake: kembalikan kontrol sleep ke OS
function releaseScreenAwake() {
  chrome.power.releaseKeepAwake();
}

// ============================================================
// AUTO-UPDATE CHECKER
// Mengambil version.json dari GitHub dan membandingkan dengan
// versi lokal yang ada di manifest.json
// ============================================================

const VERSION_CHECK_URL =
  'https://raw.githubusercontent.com/polmaaa/polock/main/version.json';
const UPDATE_ALARM_NAME = 'krompol-update-check';
const UPDATE_CHECK_INTERVAL_HOURS = 6; // Cek setiap 6 jam

// Izinkan content scripts membaca chrome.storage.session
if (chrome.storage && chrome.storage.session && chrome.storage.session.setAccessLevel) {
  chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' }).catch(() => {});
}

// ---- Pastikan alarm selalu terdaftar (jaga-jaga jika service worker restart) ----
// Ini berjalan setiap kali service worker aktif/bangun
chrome.alarms.get(UPDATE_ALARM_NAME, (alarm) => {
  if (!alarm) {
    chrome.alarms.create(UPDATE_ALARM_NAME, {
      delayInMinutes: 0.1, // ~6 detik — cek hampir langsung
      periodInMinutes: UPDATE_CHECK_INTERVAL_HOURS * 60
    });
  }
});

// Cek update segera saat service worker pertama aktif
checkForUpdates();

// Bandingkan dua string versi semver (X.Y.Z)
// Returns true jika remoteVersion lebih baru dari localVersion
function isNewerVersion(remoteVersion, localVersion) {
  const remote = remoteVersion.split('.').map(Number);
  const local  = localVersion.split('.').map(Number);
  for (let i = 0; i < Math.max(remote.length, local.length); i++) {
    const r = remote[i] || 0;
    const l = local[i] || 0;
    if (r > l) return true;
    if (r < l) return false;
  }
  return false;
}

// Ambil version.json dari GitHub dan simpan status update ke storage
async function checkForUpdates() {
  try {
    const response = await fetch(VERSION_CHECK_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const remoteData = await response.json();
    const remoteVersion = remoteData.version;
    const localVersion  = chrome.runtime.getManifest().version;

    if (isNewerVersion(remoteVersion, localVersion)) {
      // Ada versi baru! Simpan info update ke storage
      chrome.storage.local.set({
        updateAvailable: true,
        updateVersion: remoteVersion,
        updateNotes: remoteData.releaseNotes || '',
        updateUrl: remoteData.downloadUrl || 'https://github.com/polmaaa/polock'
      });
    } else {
      // Sudah versi terbaru, hapus flag update
      chrome.storage.local.set({ updateAvailable: false });
    }
  } catch (error) {
    // Gagal fetch (offline/error) — tidak lakukan apa-apa, coba lagi nanti
    console.warn('[Krompol Locker] Gagal cek update:', error.message);
  }
}

// Helper: Check if the URL is an internal Chrome or restricted browser URL
function isInternalChromeUrl(url) {
  if (!url) return false;
  return url.startsWith('chrome://') || 
         url.startsWith('chrome-extension://') && !url.startsWith(chrome.runtime.getURL('')) ||
         url.startsWith('about:') || 
         url.startsWith('edge://');
}

// Helper: Determine if the tab should be closed because of unauthorized internal page navigation
function shouldCloseTab(url) {
  if (!url) return false;
  // Allow the default newtab and blank pages to load so they can be overridden/handled
  if (url === 'chrome://newtab/' || url === 'about:blank') return false;
  return isInternalChromeUrl(url);
}

// Helper: Evaluates tab state and redirects/closes tabs if locked
function handleTabState(tabId, url) {
  if (!url) return;

  const storageSession = chrome.storage.session || chrome.storage.local;
  storageSession.get('unlocked', (session) => {
    if (session && session.unlocked) {
      return; // Do nothing if already unlocked
    }

    // If it's already our lock page, do nothing
    if (url.startsWith(chrome.runtime.getURL('lock.html'))) {
      return;
    }

    // Close sensitive internal pages to prevent bypasses (e.g., chrome://settings)
    if (shouldCloseTab(url)) {
      chrome.tabs.remove(tabId).catch(() => {});
      return;
    }

    // Redirect standard web pages to the lock page and preserve the original URL
    const lockUrl = chrome.runtime.getURL('lock.html') + '?originalUrl=' + encodeURIComponent(url);
    chrome.tabs.update(tabId, { url: lockUrl }).catch(() => {});
  });
}

// Locks the browser session and redirects all open tabs
function lockBrowser() {
  const storageSession = chrome.storage.session || chrome.storage.local;
  storageSession.set({ unlocked: false }, () => {
    chrome.storage.local.set({ unlocked: false });
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        handleTabState(tab.id, tab.url);
      }
    });
  });
}

// Intercept events when tabs are created or updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    handleTabState(tabId, changeInfo.url);
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if (tab.url) {
    handleTabState(tab.id, tab.url);
  }
});

// Intercept navigations early via webNavigation to avoid flashing the target page
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId === 0) { // Main frame only
    handleTabState(details.tabId, details.url);
  }
});

// Perform browser lockdown on startup + cek update
chrome.runtime.onStartup.addListener(() => {
  keepScreenAwake(); // Cegah sleep saat Chrome dibuka
  lockBrowser();
  checkForUpdates(); // Cek update saat browser dibuka
});

// Perform browser lockdown on installation, set default password, setup alarm
chrome.runtime.onInstalled.addListener(() => {
  keepScreenAwake(); // Cegah sleep sejak ekstensi pertama kali dimuat

  // Set up alarm periodik untuk cek update setiap 6 jam
  chrome.alarms.create(UPDATE_ALARM_NAME, {
    delayInMinutes: 1,                          // Cek pertama kali 1 menit setelah install
    periodInMinutes: UPDATE_CHECK_INTERVAL_HOURS * 60
  });

  chrome.storage.local.get('password', (data) => {
    if (!data || !data.password) {
      chrome.storage.local.set({ password: 'ganteng' }, () => {
        lockBrowser();
      });
    } else {
      lockBrowser();
    }
  });
});

// Alarm listener: jalankan checkForUpdates setiap alarm berbunyi
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === UPDATE_ALARM_NAME) {
    checkForUpdates();
  }
});

// Message listener for password check, manual locking, and password updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkPassword') {
    chrome.storage.local.get('password', (data) => {
      const currentPassword = (data && data.password) || 'ganteng';
      if (message.password === currentPassword) {
        const storageSession = chrome.storage.session || chrome.storage.local;
        storageSession.set({ unlocked: true }, () => {
          chrome.storage.local.set({ unlocked: true });
          // Saat berhasil dibuka, lepaskan keep-awake agar OS
          // bisa mengatur sleep secara normal saat pengguna aktif
          releaseScreenAwake();
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false });
      }
    });
    return true; // Keep response channel open for async operations
  }

  if (message.action === 'changePassword') {
    chrome.storage.local.get('password', (data) => {
      const currentPassword = (data && data.password) || 'ganteng';
      if (message.oldPassword === currentPassword) {
        chrome.storage.local.set({ password: message.newPassword }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: false, error: 'Password lama salah!' });
      }
    });
    return true; // Keep response channel open
  }

  if (message.action === 'lockBrowser') {
    // Saat dikunci kembali, aktifkan keep-awake agar layar kunci
    // tetap terlihat dan tidak masuk sleep/screensaver OS
    keepScreenAwake();
    lockBrowser();
    sendResponse({ success: true });
    return true;
  }

  if (message.action === 'checkUpdateNow') {
    // Panggilan manual dari popup untuk cek update sekarang
    checkForUpdates().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }

  if (message.action === 'getLockState') {
    const storageSession = chrome.storage.session || chrome.storage.local;
    storageSession.get('unlocked', (session) => {
      if (session && typeof session.unlocked !== 'undefined') {
        sendResponse({ unlocked: session.unlocked });
      } else {
        chrome.storage.local.get('unlocked', (localData) => {
          sendResponse({ unlocked: !!(localData && localData.unlocked) });
        });
      }
    });
    return true;
  }
});
