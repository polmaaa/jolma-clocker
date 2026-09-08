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
        font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif;
      }

      .fab-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
      }

      /* Ambient Aura Glow behind the button */
      .fab-aura {
        position: absolute;
        right: 0;
        top: 0;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        filter: blur(14px);
        opacity: 0.55;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
      }

      /* Smooth Frosted Glass Orb Button */
      .fab-circle-btn {
        position: relative;
        z-index: 2;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        outline: none;
        backdrop-filter: blur(28px) saturate(200%);
        -webkit-backdrop-filter: blur(28px) saturate(200%);
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.6s ease,
                    border-color 0.6s ease,
                    box-shadow 0.6s ease;
      }

      /* Subtle top-edge light reflection */
      .fab-circle-btn::before {
        content: '';
        position: absolute;
        top: 1px;
        left: 15%;
        right: 15%;
        height: 45%;
        border-radius: 50% / 100% 100% 0 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 100%);
        pointer-events: none;
      }

      .fab-icon {
        width: 20px;
        height: 20px;
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease;
      }

      /* Tooltip Pill */
      .fab-tooltip {
        position: relative;
        z-index: 3;
        padding: 6px 13px 6px 11px;
        border-radius: 20px;
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: -0.01em;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transform: translateX(10px) scale(0.95);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .fab-tooltip-badge {
        font-size: 9.5px;
        padding: 2px 5px;
        border-radius: 6px;
        background: rgba(0, 0, 0, 0.08);
        font-weight: 700;
      }

      /* Hover States */
      .fab-wrapper:hover .fab-tooltip {
        opacity: 1;
        transform: translateX(0) scale(1);
      }

      .fab-wrapper:hover .fab-circle-btn {
        transform: translateY(-2px) scale(1.06);
      }

      .fab-wrapper:hover .fab-aura {
        opacity: 0.85;
        transform: scale(1.25);
      }

      .fab-wrapper:hover .fab-icon {
        transform: scale(1.08) rotate(-4deg);
      }

      /* Active / Press States */
      .fab-circle-btn:active {
        transform: translateY(1px) scale(0.92) !important;
      }

      /* ============================================================
         THEMES — ULTRA-SMOOTH GLASS & HARMONIC PALETTES
         ============================================================ */

      /* 1. PAGI (Morning: Warm Golden Ivory Crystal Glass) */
      .fab-wrapper.theme-pagi .fab-aura {
        background: radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, transparent 70%);
      }
      .fab-wrapper.theme-pagi .fab-circle-btn {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(254, 243, 199, 0.68) 100%);
        border: 1px solid rgba(245, 158, 11, 0.32);
        box-shadow: 
          0 10px 26px -3px rgba(245, 158, 11, 0.2),
          0 4px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi .fab-icon {
        stroke: #d97706;
      }
      .fab-wrapper.theme-pagi .fab-tooltip {
        background: rgba(255, 253, 242, 0.92);
        border: 1px solid rgba(245, 158, 11, 0.25);
        color: #92400e;
      }
      .fab-wrapper.theme-pagi .fab-tooltip-badge {
        background: rgba(245, 158, 11, 0.15);
        color: #b45309;
      }

      /* 2. SIANG (Afternoon: Crystal Mint Emerald Glass) */
      .fab-wrapper.theme-siang .fab-aura {
        background: radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, transparent 70%);
      }
      .fab-wrapper.theme-siang .fab-circle-btn {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(209, 250, 229, 0.68) 100%);
        border: 1px solid rgba(16, 185, 129, 0.32);
        box-shadow: 
          0 10px 26px -3px rgba(16, 185, 129, 0.2),
          0 4px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang .fab-icon {
        stroke: #059669;
      }
      .fab-wrapper.theme-siang .fab-tooltip {
        background: rgba(240, 253, 250, 0.92);
        border: 1px solid rgba(16, 185, 129, 0.25);
        color: #065f46;
      }
      .fab-wrapper.theme-siang .fab-tooltip-badge {
        background: rgba(16, 185, 129, 0.15);
        color: #047857;
      }

      /* 3. SORE (Evening: Sunset Rose Coral Glass) */
      .fab-wrapper.theme-sore .fab-aura {
        background: radial-gradient(circle, rgba(244, 63, 94, 0.45) 0%, transparent 70%);
      }
      .fab-wrapper.theme-sore .fab-circle-btn {
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 228, 230, 0.68) 100%);
        border: 1px solid rgba(244, 63, 94, 0.32);
        box-shadow: 
          0 10px 26px -3px rgba(244, 63, 94, 0.2),
          0 4px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore .fab-icon {
        stroke: #e11d48;
      }
      .fab-wrapper.theme-sore .fab-tooltip {
        background: rgba(255, 241, 242, 0.92);
        border: 1px solid rgba(244, 63, 94, 0.25);
        color: #9f1239;
      }
      .fab-wrapper.theme-sore .fab-tooltip-badge {
        background: rgba(244, 63, 94, 0.15);
        color: #be185d;
      }

      /* 4. MALAM (Night: Midnight Obsidian Violet Glass) */
      .fab-wrapper.theme-malam .fab-aura {
        background: radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, transparent 70%);
      }
      .fab-wrapper.theme-malam .fab-circle-btn {
        background: linear-gradient(145deg, rgba(30, 27, 75, 0.82) 0%, rgba(13, 10, 30, 0.94) 100%);
        border: 1px solid rgba(167, 139, 250, 0.4);
        box-shadow: 
          0 12px 32px -4px rgba(0, 0, 0, 0.65),
          0 0 16px rgba(139, 92, 246, 0.25),
          inset 0 1px 1.5px rgba(255, 255, 255, 0.25);
      }
      .fab-wrapper.theme-malam .fab-icon {
        stroke: #c4b5fd;
      }
      .fab-wrapper.theme-malam .fab-tooltip {
        background: rgba(15, 23, 42, 0.94);
        border: 1px solid rgba(139, 92, 246, 0.35);
        color: #f1f5f9;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.2) inset;
      }
      .fab-wrapper.theme-malam .fab-tooltip-badge {
        background: rgba(139, 92, 246, 0.25);
        color: #c4b5fd;
      }

      /* Entrance Animation */
      .fab-enter {
        animation: fabSmoothPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes fabSmoothPop {
        0% { opacity: 0; transform: scale(0.7) translateY(10px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = `fab-wrapper fab-enter ${currentTheme}`;
    wrapper.innerHTML = `
      <div class="fab-tooltip">
        <span>Kunci Browser</span>
        <span class="fab-tooltip-badge">Ctrl+L</span>
      </div>
      <div class="fab-aura"></div>
      <button class="fab-circle-btn" id="lock-btn-trigger" title="Kunci Browser (Ctrl+L)">
        <svg class="fab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="11" width="16" height="10" rx="3.5" ry="3.5"></rect>
          <path d="M7.5 11V7a4.5 4.5 0 0 1 9 0v4"></path>
          <circle cx="12" cy="15.5" r="1.3" fill="currentColor" stroke="none"></circle>
        </svg>
      </button>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    const btn = wrapper.querySelector('#lock-btn-trigger');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      btn.style.opacity = '0.7';
      btn.style.transform = 'scale(0.92)';

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
