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
      }

      /* Ambient Breathing Aura */
      .fab-aura {
        position: absolute;
        right: 0;
        top: 0;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        filter: blur(14px);
        opacity: 0.5;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
      }

      /* Compact Floating Glass Button (Stays Fixed Size) */
      .fab-btn {
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
        overflow: hidden;
        border: 1.5px solid transparent;
        backdrop-filter: blur(28px) saturate(200%);
        -webkit-backdrop-filter: blur(28px) saturate(200%);
        box-shadow: 
          0 10px 26px -3px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9);
        transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.5s ease,
                    border-color 0.5s ease,
                    box-shadow 0.4s ease;
        user-select: none;
      }

      /* Light Specular Curved Top Reflection */
      .fab-btn::before {
        content: '';
        position: absolute;
        top: 1px;
        left: 15%;
        right: 15%;
        height: 45%;
        border-radius: 50% / 100% 100% 0 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 100%);
        pointer-events: none;
      }

      /* Lock SVG Icon */
      .lock-svg {
        width: 20px;
        height: 20px;
        overflow: visible;
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* Animated Shackle that snaps down into locked state on hover */
      .lock-shackle {
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-origin: center top;
      }

      /* ============================================================
         STYLISH FLOATING CURSOR TOOLTIP
         ============================================================ */

      .fab-tooltip {
        position: absolute;
        right: 56px;
        top: 50%;
        transform: translateY(-50%) translateX(10px) scale(0.94);
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 12px 7px 14px;
        border-radius: 30px;
        backdrop-filter: blur(24px) saturate(190%);
        -webkit-backdrop-filter: blur(24px) saturate(190%);
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        box-shadow: 
          0 10px 30px -4px rgba(0, 0, 0, 0.15),
          0 2px 8px rgba(0, 0, 0, 0.04),
          inset 0 1px 1px rgba(255, 255, 255, 0.85);
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 10;
      }

      .tooltip-text {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }

      .tooltip-badge {
        font-size: 9.5px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 6px;
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

      /* Lift & Glow Button */
      .fab-wrapper:hover .fab-btn {
        transform: translateY(-2px) scale(1.06);
      }

      .fab-wrapper:hover .fab-aura {
        opacity: 0.85;
        transform: scale(1.3);
      }

      /* Mechanical Shackle Snap */
      .fab-wrapper:hover .lock-shackle {
        transform: translateY(2.2px);
      }

      .fab-wrapper:hover .lock-svg {
        transform: scale(1.05);
      }

      /* Active / Press State */
      .fab-btn:active {
        transform: translateY(1px) scale(0.92) !important;
      }

      /* ============================================================
         THEMES — HARMONIC GLASS PALETTES (Matches time of day)
         ============================================================ */

      /* 1. PAGI (Morning: Nordic Glacier Mist / Aurora Dawn Glass) */
      .fab-wrapper.theme-pagi .fab-aura {
        background: radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, transparent 70%);
      }
      .fab-wrapper.theme-pagi .fab-btn {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(224, 242, 254, 0.8) 100%);
        border-color: rgba(14, 165, 233, 0.35);
        color: #0284c7;
        box-shadow: 
          0 10px 26px -3px rgba(14, 165, 233, 0.22),
          0 3px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi .fab-tooltip {
        background: rgba(240, 249, 255, 0.95);
        border: 1px solid rgba(14, 165, 233, 0.35);
        color: #0369a1;
      }
      .fab-wrapper.theme-pagi .tooltip-badge {
        background: rgba(14, 165, 233, 0.15);
        color: #0284c7;
        border: 1px solid rgba(14, 165, 233, 0.3);
      }

      /* 2. SIANG (Afternoon: Solar Azure / Royal Sky Daylight Glass) */
      .fab-wrapper.theme-siang .fab-aura {
        background: radial-gradient(circle, rgba(79, 70, 229, 0.5) 0%, transparent 70%);
      }
      .fab-wrapper.theme-siang .fab-btn {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(224, 231, 255, 0.8) 100%);
        border-color: rgba(79, 70, 229, 0.35);
        color: #4f46e5;
        box-shadow: 
          0 10px 26px -3px rgba(79, 70, 229, 0.22),
          0 3px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang .fab-tooltip {
        background: rgba(238, 242, 255, 0.95);
        border: 1px solid rgba(79, 70, 229, 0.35);
        color: #3730a3;
      }
      .fab-wrapper.theme-siang .tooltip-badge {
        background: rgba(79, 70, 229, 0.15);
        color: #4f46e5;
        border: 1px solid rgba(79, 70, 229, 0.3);
      }

      /* 3. SORE (Evening: Twilight Amber Sunset / Golden Dusk Glass) */
      .fab-wrapper.theme-sore .fab-aura {
        background: radial-gradient(circle, rgba(234, 88, 12, 0.5) 0%, transparent 70%);
      }
      .fab-wrapper.theme-sore .fab-btn {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 237, 213, 0.8) 100%);
        border-color: rgba(234, 88, 12, 0.35);
        color: #ea580c;
        box-shadow: 
          0 10px 26px -3px rgba(234, 88, 12, 0.22),
          0 3px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore .fab-tooltip {
        background: rgba(255, 247, 237, 0.95);
        border: 1px solid rgba(234, 88, 12, 0.35);
        color: #9a3412;
      }
      .fab-wrapper.theme-sore .tooltip-badge {
        background: rgba(234, 88, 12, 0.15);
        color: #ea580c;
        border: 1px solid rgba(234, 88, 12, 0.3);
      }

      /* 4. MALAM (Night: Obsidian Midnight Aurora Violet Glass) */
      .fab-wrapper.theme-malam .fab-aura {
        background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%);
      }
      .fab-wrapper.theme-malam .fab-btn {
        background: linear-gradient(135deg, rgba(28, 22, 58, 0.88) 0%, rgba(12, 9, 28, 0.96) 100%);
        border-color: rgba(167, 139, 250, 0.4);
        color: #c4b5fd;
        box-shadow: 
          0 12px 34px -4px rgba(0, 0, 0, 0.7),
          0 0 18px rgba(139, 92, 246, 0.3),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.22);
      }
      .fab-wrapper.theme-malam .fab-tooltip {
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid rgba(139, 92, 246, 0.4);
        color: #f1f5f9;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(139, 92, 246, 0.2) inset;
      }
      .fab-wrapper.theme-malam .tooltip-badge {
        background: rgba(139, 92, 246, 0.25);
        color: #c4b5fd;
        border: 1px solid rgba(139, 92, 246, 0.45);
      }

      /* Entrance Animation */
      .fab-enter {
        animation: fabIslandPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes fabIslandPop {
        0% { opacity: 0; transform: scale(0.65) translateY(12px); }
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

      <!-- Compact Glass Button -->
      <button class="fab-btn" id="lock-btn-trigger">
        <svg class="lock-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="lock-shackle" d="M7 10V6.8a5 5 0 0 1 10 0V10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
          <rect class="lock-body" x="3.5" y="10" width="17" height="11" rx="3.5" stroke="currentColor" stroke-width="2.3" fill="currentColor" fill-opacity="0.15"/>
          <circle cx="12" cy="15.2" r="1.3" fill="currentColor"/>
          <path d="M12 16.5v1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
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
