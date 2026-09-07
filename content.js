// content.js - Ultra-sleek, modern floating lock button matching Krompol Locker aesthetic

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
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .fab-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: max-content;
      }

      /* Base Floating Button */
      .fab-btn {
        display: inline-flex;
        align-items: center;
        height: 44px;
        padding: 0 12px;
        border-radius: 22px;
        cursor: pointer;
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        outline: none;
        position: relative;
        overflow: hidden;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.8s ease,
                    border-color 0.8s ease,
                    color 0.8s ease,
                    box-shadow 0.8s ease;
      }

      .icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .fab-icon {
        width: 18px;
        height: 18px;
        stroke-width: 2.2;
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.3s ease;
      }

      .fab-text {
        max-width: 0;
        opacity: 0;
        overflow: hidden;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.01em;
        margin-left: 0;
        transition: max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.3s ease,
                    margin-left 0.3s ease;
      }

      /* Hover: Smoothly reveal "Kunci Browser" */
      .fab-btn:hover {
        padding: 0 16px 0 14px;
        transform: translateY(-2px) scale(1.02);
      }

      .fab-btn:hover .fab-text {
        max-width: 120px;
        opacity: 1;
        margin-left: 8px;
      }

      .fab-btn:hover .fab-icon {
        transform: scale(1.08) rotate(-8deg);
      }

      .fab-btn:active {
        transform: translateY(1px) scale(0.95);
      }

      /* ============================================================
         THEMES — ULTRA SLEEK GLASSMORPHIC PALETTES
         ============================================================ */

      /* 1. PAGI (Morning: Golden Warm Ivory Glass) */
      .fab-wrapper.theme-pagi .fab-btn {
        background: rgba(255, 253, 240, 0.88);
        border: 1px solid rgba(245, 158, 11, 0.25);
        color: #92400e;
        box-shadow: 
          0 10px 30px -4px rgba(245, 158, 11, 0.22),
          0 4px 12px -2px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi .fab-icon {
        stroke: #d97706;
      }

      /* 2. SIANG (Afternoon: Crystal Mint Emerald Glass) */
      .fab-wrapper.theme-siang .fab-btn {
        background: rgba(240, 253, 250, 0.88);
        border: 1px solid rgba(16, 185, 129, 0.25);
        color: #065f46;
        box-shadow: 
          0 10px 30px -4px rgba(16, 185, 129, 0.2),
          0 4px 12px -2px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang .fab-icon {
        stroke: #059669;
      }

      /* 3. SORE (Evening: Sunset Rose Coral Glass) */
      .fab-wrapper.theme-sore .fab-btn {
        background: rgba(255, 241, 242, 0.88);
        border: 1px solid rgba(244, 63, 94, 0.25);
        color: #9f1239;
        box-shadow: 
          0 10px 30px -4px rgba(244, 63, 94, 0.22),
          0 4px 12px -2px rgba(0, 0, 0, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore .fab-icon {
        stroke: #e11d48;
      }

      /* 4. MALAM (Night: Obsidian Midnight Purple Glass) */
      .fab-wrapper.theme-malam .fab-btn {
        background: rgba(15, 23, 42, 0.82);
        border: 1px solid rgba(139, 92, 246, 0.3);
        color: #f8fafc;
        box-shadow: 
          0 12px 36px -4px rgba(0, 0, 0, 0.6),
          0 4px 16px -2px rgba(139, 92, 246, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      .fab-wrapper.theme-malam .fab-icon {
        stroke: #a78bfa;
      }

      /* Hover Accent: Elegant Crimson / Red Glass across all themes */
      .fab-wrapper .fab-btn:hover {
        background: rgba(239, 68, 68, 0.92) !important;
        border-color: rgba(255, 255, 255, 0.4) !important;
        color: #ffffff !important;
        box-shadow: 
          0 14px 34px -4px rgba(239, 68, 68, 0.45),
          0 6px 14px -2px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
      }

      .fab-wrapper .fab-btn:hover .fab-icon {
        stroke: #ffffff !important;
      }

      /* Entrance */
      .fab-enter {
        animation: fabPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes fabPop {
        0% { opacity: 0; transform: translateY(16px) scale(0.85); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = `fab-wrapper fab-enter ${currentTheme}`;
    wrapper.innerHTML = `
      <button class="fab-btn" id="lock-btn-trigger" title="Kunci Browser">
        <div class="icon-container">
          <svg class="fab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <span class="fab-text">Kunci Browser</span>
      </button>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);

    const btn = wrapper.querySelector('#lock-btn-trigger');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      btn.style.opacity = '0.7';
      wrapper.querySelector('.fab-text').textContent = 'Mengunci...';

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
