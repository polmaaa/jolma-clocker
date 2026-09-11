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
      chrome.storage.local.get('floatingLockBtnEnabled', (settings) => {
        if (settings && settings.floatingLockBtnEnabled === false) {
          removeFloatingButton();
          return;
        }

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
      });
    } catch (e) {
      fallbackStorageCheck();
    }
  }
  window.__krompolCheckAndRender = checkAndRender;

  function fallbackStorageCheck() {
    try {
      chrome.storage.local.get('floatingLockBtnEnabled', (settings) => {
        if (settings && settings.floatingLockBtnEnabled === false) {
          removeFloatingButton();
          return;
        }

        const storage = chrome.storage.session || chrome.storage.local;
        storage.get('unlocked', (data) => {
          if (chrome.runtime.lastError) return;
          if (data && data.unlocked) {
            renderFloatingButton();
          } else {
            removeFloatingButton();
          }
        });
      });
    } catch (e) {}
  }

  try {
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.floatingLockBtnEnabled !== undefined) {
        if (changes.floatingLockBtnEnabled.newValue === false) {
          removeFloatingButton();
        } else {
          checkAndRender();
        }
      }
      if (changes.unlocked) {
        if (changes.unlocked.newValue) {
          checkAndRender();
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

    const fontUrl = chrome.runtime.getURL('fonts/space-grotesk.woff2');
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 300 700;
        font-display: block;
        src: url('${fontUrl}') format('woff2');
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      }

      .fab-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      /* Ambient Breathing Aura */
      .fab-aura {
        position: absolute;
        right: 0;
        top: 0;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        filter: blur(14px);
        opacity: 0.4;
        pointer-events: none;
        transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
      }

      /* Compact Frosted Glass Lock Button (Matching Menu Button Style) */
      .fab-btn {
        position: relative;
        z-index: 2;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        outline: none;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        box-shadow: 
          0 4px 16px -2px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.9);
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.8s ease,
                    border-color 0.8s ease,
                    color 0.8s ease,
                    box-shadow 0.8s ease;
        user-select: none;
      }

      /* Lock SVG Icon (Clean Feather/Lucide Stroke matching Menu icon) */
      .lock-svg {
        width: 17px;
        height: 17px;
        overflow: visible;
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* Animated Shackle that snaps down into locked state on hover */
      .lock-shackle {
        transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-origin: center top;
      }

      /* ============================================================
         STYLISH FLOATING CURSOR TOOLTIP
         ============================================================ */

      .fab-tooltip {
        position: absolute;
        right: 52px;
        top: 50%;
        transform: translateY(-50%) translateX(8px) scale(0.94);
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 20px;
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        box-shadow: 
          0 10px 30px -4px rgba(0, 0, 0, 0.1),
          0 2px 8px rgba(0, 0, 0, 0.03),
          inset 0 1px 0 rgba(255, 255, 255, 0.9);
        transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 10;
      }

      .tooltip-text {
        font-size: 11.5px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }

      .tooltip-badge {
        font-size: 9px;
        font-weight: 700;
        padding: 2px 5px;
        border-radius: 5px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
      }

      /* ============================================================
         HOVER & ACTIVE INTERACTIONS
         ============================================================ */

      /* Show Styled Tooltip */
      .fab-wrapper:hover .fab-tooltip {
        opacity: 1;
        transform: translateY(-50%) translateX(0) scale(1);
      }

      /* Lift & Glow Button (matches .btn-menu:hover) */
      .fab-wrapper:hover .fab-btn {
        transform: translateY(-1.5px);
      }

      .fab-wrapper:hover .fab-aura {
        opacity: 0.75;
        transform: scale(1.25);
      }

      /* Mechanical Shackle Snap */
      .fab-wrapper:hover .lock-shackle {
        transform: translateY(2px);
      }

      .fab-wrapper:hover .lock-svg {
        transform: scale(1.06);
      }

      /* Active / Press State */
      .fab-btn:active {
        transform: translateY(1px) scale(0.96) !important;
      }

      /* ============================================================
         THEMES — MATCHING MENU DROPDOWN THEME PALETTES
         ============================================================ */

      /* 1. PAGI (04:00–10:59) — Nordic Glacier Mist */
      .fab-wrapper.theme-pagi .fab-aura {
        background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, transparent 70%);
      }
      .fab-wrapper.theme-pagi .fab-btn {
        background: rgba(240, 249, 255, 0.85);
        border-color: rgba(14, 165, 233, 0.3);
        color: #0369a1;
        box-shadow: 0 4px 16px -2px rgba(14, 165, 233, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi:hover .fab-btn {
        background: rgba(240, 249, 255, 0.96);
        border-color: rgba(14, 165, 233, 0.45);
        box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1);
      }
      .fab-wrapper.theme-pagi .fab-tooltip {
        background: rgba(240, 249, 255, 0.96);
        border: 1px solid rgba(14, 165, 233, 0.25);
        color: #0c4a6e;
      }
      .fab-wrapper.theme-pagi .tooltip-badge {
        background: rgba(14, 165, 233, 0.12);
        color: #0284c7;
        border: 1px solid rgba(14, 165, 233, 0.25);
      }

      /* 2. SIANG (11:00–14:59) — Solar Royal Azure */
      .fab-wrapper.theme-siang .fab-aura {
        background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
      }
      .fab-wrapper.theme-siang .fab-btn {
        background: rgba(238, 242, 255, 0.85);
        border-color: rgba(79, 70, 229, 0.28);
        color: #3730a3;
        box-shadow: 0 4px 16px -2px rgba(79, 70, 229, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang:hover .fab-btn {
        background: rgba(238, 242, 255, 0.96);
        border-color: rgba(79, 70, 229, 0.45);
        box-shadow: 0 8px 24px -4px rgba(79, 70, 229, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1);
      }
      .fab-wrapper.theme-siang .fab-tooltip {
        background: rgba(238, 242, 255, 0.96);
        border: 1px solid rgba(79, 70, 229, 0.25);
        color: #312e81;
      }
      .fab-wrapper.theme-siang .tooltip-badge {
        background: rgba(79, 70, 229, 0.12);
        color: #4f46e5;
        border: 1px solid rgba(79, 70, 229, 0.25);
      }

      /* 3. SORE (15:00–18:29) — Twilight Sunset Amber */
      .fab-wrapper.theme-sore .fab-aura {
        background: radial-gradient(circle, rgba(234, 88, 12, 0.4) 0%, transparent 70%);
      }
      .fab-wrapper.theme-sore .fab-btn {
        background: rgba(255, 247, 237, 0.85);
        border-color: rgba(234, 88, 12, 0.28);
        color: #9a3412;
        box-shadow: 0 4px 16px -2px rgba(234, 88, 12, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore:hover .fab-btn {
        background: rgba(255, 247, 237, 0.96);
        border-color: rgba(234, 88, 12, 0.45);
        box-shadow: 0 8px 24px -4px rgba(234, 88, 12, 0.2), inset 0 1px 0 rgba(255, 255, 255, 1);
      }
      .fab-wrapper.theme-sore .fab-tooltip {
        background: rgba(255, 247, 237, 0.96);
        border: 1px solid rgba(234, 88, 12, 0.25);
        color: #7c2d12;
      }
      .fab-wrapper.theme-sore .tooltip-badge {
        background: rgba(234, 88, 12, 0.12);
        color: #ea580c;
        border: 1px solid rgba(234, 88, 12, 0.25);
      }

      /* 4. MALAM (18:30–03:59) — Obsidian Midnight Aurora */
      .fab-wrapper.theme-malam .fab-aura {
        background: radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%);
      }
      .fab-wrapper.theme-malam .fab-btn {
        background: rgba(15, 23, 42, 0.75);
        border-color: rgba(139, 92, 246, 0.3);
        color: #f8fafc;
        box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12);
      }
      .fab-wrapper.theme-malam:hover .fab-btn {
        background: rgba(15, 23, 42, 0.92);
        border-color: rgba(139, 92, 246, 0.5);
        box-shadow: 0 8px 24px -4px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      .fab-wrapper.theme-malam .fab-tooltip {
        background: rgba(15, 23, 42, 0.94);
        border: 1px solid rgba(139, 92, 246, 0.25);
        color: #f1f5f9;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(139, 92, 246, 0.15) inset;
      }
      .fab-wrapper.theme-malam .tooltip-badge {
        background: rgba(139, 92, 246, 0.25);
        color: #c4b5fd;
        border: 1px solid rgba(139, 92, 246, 0.45);
      }

      /* Entrance Animation */
      .fab-enter {
        animation: fabIslandPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes fabIslandPop {
        0% { opacity: 0; transform: scale(0.7) translateY(8px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = `fab-wrapper fab-enter ${currentTheme}`;
    wrapper.innerHTML = `
      <!-- Stylish Floating Tooltip on Hover -->
      <div class="fab-tooltip">
        <span class="tooltip-text">Kunci Browser</span>
        <span class="tooltip-badge">CTRL+L</span>
      </div>

      <!-- Ambient Aura Glow -->
      <div class="fab-aura"></div>

      <!-- Compact Glass Button matching Menu Button -->
      <button class="fab-btn" id="lock-btn-trigger" title="Kunci Browser (Ctrl+L)">
        <svg class="lock-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect class="lock-body" x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path class="lock-shackle" d="M7 11V7a5 5 0 0 1 10 0v4"></path>
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
