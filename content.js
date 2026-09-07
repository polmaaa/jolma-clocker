// content.js - Sleek circular floating lock button matching Gambar 2

(function () {
  if (window.__krompolLockScriptInjected) {
    if (typeof window.__krompolCheckAndRender === 'function') {
      window.__krompolCheckAndRender();
    }
    return;
  }
  window.__krompolLockScriptInjected = true;

  const HOST_ID = 'krompol-floating-lock-host';

  if (window.top !== window.self) {
    return;
  }

  // Shortcut instan CTRL+L / CMD+L untuk mengunci browser dari halaman mana pun
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === 'L' || e.code === 'KeyL') && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      try {
        chrome.runtime.sendMessage({ action: 'lockBrowser' });
      } catch (err) {
        const storage = chrome.storage.session || chrome.storage.local;
        storage.set({ unlocked: false }, () => {
          window.location.reload();
        });
      }
    }
  }, true);

  function getThemeClass() {
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    if (hour >= 4 && hour < 11) {
      return 'theme-pagi';
    } else if (hour >= 11 && hour < 15) {
      return 'theme-siang';
    } else if (hour >= 15 && hour < 18.5) {
      return 'theme-sore';
    } else {
      return 'theme-malam';
    }
  }

  function checkAndRender() {
    try {
      chrome.runtime.sendMessage({ action: 'getLockState' }, (response) => {
        if (chrome.runtime.lastError) {
          fallbackStorageCheck();
          return;
        }
        if (response && response.unlocked) {
          renderFloatingButton();
        } else {
          removeFloatingButton();
        }
      });
    } catch (e) {
      fallbackStorageCheck();
    }
  }
  window.__krompolCheckAndRender = checkAndRender;

  function fallbackStorageCheck() {
    try {
      const storage = chrome.storage.session || chrome.storage.local;
      storage.get('unlocked', (data) => {
        if (chrome.runtime.lastError) return;
        if (data && data.unlocked) {
          renderFloatingButton();
        } else {
          removeFloatingButton();
        }
      });
    } catch (e) {}
  }

  try {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.unlocked) {
        if (changes.unlocked.newValue) {
          renderFloatingButton();
        } else {
          removeFloatingButton();
        }
      }
    });
  } catch (e) {}

  function renderFloatingButton() {
    const currentTheme = getThemeClass();
    let host = document.getElementById(HOST_ID);

    if (host && host.shadowRoot) {
      host.style.display = 'block';
      const wrapper = host.shadowRoot.querySelector('.fab-wrapper');
      if (wrapper) {
        wrapper.className = `fab-wrapper ${currentTheme}`;
      }
      return;
    }

    host = document.createElement('div');
    host.id = HOST_ID;
    host.style.cssText = `
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      z-index: 2147483647 !important;
      pointer-events: auto !important;
      display: block !important;
      user-select: none !important;
      width: auto !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      transform: none !important;
    `;

    const shadow = host.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .fab-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
      }

      /* Circular Floating Button (Gambar 2) */
      .fab-circle-btn {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        outline: none;
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.8s ease,
                    border-color 0.8s ease,
                    box-shadow 0.8s ease;
      }

      .fab-icon {
        width: 20px;
        height: 20px;
        stroke-width: 2.2;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease;
      }

      .fab-circle-btn:hover {
        transform: scale(1.08) translateY(-2px);
      }

      .fab-circle-btn:hover .fab-icon {
        transform: scale(1.1);
      }

      .fab-circle-btn:active {
        transform: scale(0.94) translateY(1px);
      }

      /* ============================================================
         THEMES — CIRCULAR GLASS (Matches time periods)
         ============================================================ */

      /* 1. PAGI (Morning: Warm Golden Ivory Glass) */
      .fab-wrapper.theme-pagi .fab-circle-btn {
        background: rgba(255, 253, 240, 0.9);
        border: 1.5px solid rgba(245, 158, 11, 0.45);
        box-shadow: 
          0 8px 24px -2px rgba(245, 158, 11, 0.25),
          0 2px 8px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi .fab-icon {
        stroke: #d97706;
      }

      /* 2. SIANG (Afternoon: Mint Emerald Glass) */
      .fab-wrapper.theme-siang .fab-circle-btn {
        background: rgba(240, 253, 250, 0.9);
        border: 1.5px solid rgba(16, 185, 129, 0.45);
        box-shadow: 
          0 8px 24px -2px rgba(16, 185, 129, 0.25),
          0 2px 8px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang .fab-icon {
        stroke: #059669;
      }

      /* 3. SORE (Evening: Sunset Rose Coral Glass) */
      .fab-wrapper.theme-sore .fab-circle-btn {
        background: rgba(255, 241, 242, 0.9);
        border: 1.5px solid rgba(244, 63, 94, 0.45);
        box-shadow: 
          0 8px 24px -2px rgba(244, 63, 94, 0.25),
          0 2px 8px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore .fab-icon {
        stroke: #e11d48;
      }

      /* 4. MALAM (Night: Gambar 2 - Obsidian Midnight Purple Ring) */
      .fab-wrapper.theme-malam .fab-circle-btn {
        background: radial-gradient(circle at 50% 50%, rgba(30, 27, 75, 0.85) 0%, rgba(10, 8, 26, 0.92) 100%);
        border: 1.5px solid rgba(167, 139, 250, 0.5);
        box-shadow: 
          0 10px 30px -4px rgba(0, 0, 0, 0.65),
          0 0 18px rgba(167, 139, 250, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      .fab-wrapper.theme-malam .fab-icon {
        stroke: #c4b5fd;
      }

      /* Hover: Crimson Alert Glow across all themes */
      .fab-wrapper .fab-circle-btn:hover {
        background: radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.92) 0%, rgba(185, 28, 28, 0.95) 100%) !important;
        border-color: rgba(254, 202, 202, 0.8) !important;
        box-shadow: 
          0 12px 28px -2px rgba(220, 38, 38, 0.55),
          0 0 20px rgba(239, 68, 68, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.45) !important;
      }
      .fab-wrapper .fab-circle-btn:hover .fab-icon {
        stroke: #ffffff !important;
      }

      /* Entrance Animation */
      .fab-enter {
        animation: fabCirclePop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes fabCirclePop {
        0% { opacity: 0; transform: scale(0.6) translateY(12px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = `fab-wrapper fab-enter ${currentTheme}`;
    wrapper.innerHTML = `
      <button class="fab-circle-btn" id="lock-btn-trigger" title="Kunci Browser Sekarang">
        <svg class="fab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </button>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    const btn = wrapper.querySelector('#lock-btn-trigger');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      btn.style.opacity = '0.6';
      btn.style.transform = 'scale(0.9)';

      try {
        chrome.runtime.sendMessage({ action: 'lockBrowser' });
      } catch (err) {
        const storage = chrome.storage.session || chrome.storage.local;
        storage.set({ unlocked: false }, () => {
          window.location.reload();
        });
      }
    });

    const mount = () => {
      const root = document.documentElement || document.body;
      if (root && !document.getElementById(HOST_ID)) {
        root.appendChild(host);
      }
    };

    mount();
    if (!host.parentElement) {
      window.addEventListener('DOMContentLoaded', mount);
      window.addEventListener('load', mount);
    }
  }

  function removeFloatingButton() {
    const host = document.getElementById(HOST_ID);
    if (host) {
      host.remove();
    }
  }

  checkAndRender();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRender);
  }

  setInterval(checkAndRender, 2000);
})();
