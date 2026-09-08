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
        top: 50%;
        transform: translateY(-50%);
        width: 44px;
        height: 44px;
        border-radius: 28px;
        filter: blur(16px);
        opacity: 0.5;
        pointer-events: none;
        transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1;
      }

      /* Morphing Dynamic Island Capsule */
      .morph-capsule {
        position: relative;
        z-index: 2;
        height: 44px;
        width: 44px; /* Default Compact */
        padding: 0 10px;
        border-radius: 26px;
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        cursor: pointer;
        outline: none;
        overflow: hidden;
        border: 1.5px solid transparent;
        backdrop-filter: blur(28px) saturate(200%);
        -webkit-backdrop-filter: blur(28px) saturate(200%);
        box-shadow: 
          0 10px 28px -4px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.85);
        transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                    background 0.5s ease,
                    border-color 0.5s ease,
                    box-shadow 0.4s ease;
        user-select: none;
      }

      /* Light Specular Curved Reflection */
      .morph-capsule::before {
        content: '';
        position: absolute;
        top: 1px;
        left: 10px;
        right: 10px;
        height: 40%;
        border-radius: 20px 20px 0 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 100%);
        pointer-events: none;
      }

      /* Angled Shimmer Light Sweep on Hover */
      .shimmer-ray {
        position: absolute;
        top: 0;
        left: -80px;
        width: 40px;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transform: skewX(-25deg);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
      }

      /* Icon Box & Animated Lock SVG */
      .icon-box {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .lock-svg {
        width: 20px;
        height: 20px;
        overflow: visible;
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      /* Shackle Mechanical Locking Animation */
      .lock-shackle {
        transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        transform-origin: center top;
      }

      /* Morphing Content: Text & Keyboard Badge */
      .morph-label {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: 8px;
        opacity: 0;
        transform: translateX(12px);
        white-space: nowrap;
        pointer-events: none;
        transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .label-text {
        font-size: 12.5px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }

      .key-badge {
        font-size: 9.5px;
        font-weight: 800;
        padding: 2px 6px;
        border-radius: 6px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
      }

      /* ============================================================
         HOVER & ACTIVE STATES (Fluid Spring Expansion)
         ============================================================ */

      .fab-wrapper:hover .morph-capsule {
        width: 140px; /* Expands smoothly into Capsule Island */
        transform: translateY(-2px);
      }

      .fab-wrapper:hover .fab-aura {
        width: 140px;
        opacity: 0.85;
      }

      .fab-wrapper:hover .morph-label {
        opacity: 1;
        transform: translateX(0);
        transition-delay: 0.06s;
      }

      /* Snaps Shackle into locked position on hover */
      .fab-wrapper:hover .lock-shackle {
        transform: translateY(2.2px);
      }

      .fab-wrapper:hover .lock-svg {
        transform: scale(1.06);
      }

      .fab-wrapper:hover .shimmer-ray {
        opacity: 1;
        animation: shimmerSweep 0.9s cubic-bezier(0.16, 1, 0.3, 1) infinite;
      }

      @keyframes shimmerSweep {
        0% { left: -80px; }
        100% { left: 160px; }
      }

      /* Active / Press State */
      .morph-capsule:active {
        transform: translateY(1px) scale(0.94) !important;
      }

      /* ============================================================
         THEMES — HARMONIC GLASS PALETTES (Matches time of day)
         ============================================================ */

      /* 1. PAGI (Morning: Warm Honey Amber Quartz Glass) */
      .fab-wrapper.theme-pagi .fab-aura {
        background: radial-gradient(ellipse at center, rgba(245, 158, 11, 0.45) 0%, transparent 75%);
      }
      .fab-wrapper.theme-pagi .morph-capsule {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(254, 243, 199, 0.75) 100%);
        border-color: rgba(245, 158, 11, 0.35);
        color: #92400e;
        box-shadow: 
          0 10px 28px -3px rgba(245, 158, 11, 0.22),
          0 3px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi .lock-svg {
        color: #d97706;
      }
      .fab-wrapper.theme-pagi .key-badge {
        background: rgba(245, 158, 11, 0.16);
        color: #b45309;
        border: 1px solid rgba(245, 158, 11, 0.3);
      }

      /* 2. SIANG (Afternoon: Crystal Mint Emerald Ice Glass) */
      .fab-wrapper.theme-siang .fab-aura {
        background: radial-gradient(ellipse at center, rgba(16, 185, 129, 0.45) 0%, transparent 75%);
      }
      .fab-wrapper.theme-siang .morph-capsule {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(209, 250, 229, 0.75) 100%);
        border-color: rgba(16, 185, 129, 0.35);
        color: #065f46;
        box-shadow: 
          0 10px 28px -3px rgba(16, 185, 129, 0.22),
          0 3px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang .lock-svg {
        color: #059669;
      }
      .fab-wrapper.theme-siang .key-badge {
        background: rgba(16, 185, 129, 0.16);
        color: #047857;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }

      /* 3. SORE (Evening: Sunset Coral Rose Velvet Glass) */
      .fab-wrapper.theme-sore .fab-aura {
        background: radial-gradient(ellipse at center, rgba(244, 63, 94, 0.45) 0%, transparent 75%);
      }
      .fab-wrapper.theme-sore .morph-capsule {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 228, 230, 0.75) 100%);
        border-color: rgba(244, 63, 94, 0.35);
        color: #9f1239;
        box-shadow: 
          0 10px 28px -3px rgba(244, 63, 94, 0.22),
          0 3px 10px rgba(0, 0, 0, 0.04),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore .lock-svg {
        color: #e11d48;
      }
      .fab-wrapper.theme-sore .key-badge {
        background: rgba(244, 63, 94, 0.16);
        color: #be185d;
        border: 1px solid rgba(244, 63, 94, 0.3);
      }

      /* 4. MALAM (Night: Obsidian Midnight Aurora Violet Glass) */
      .fab-wrapper.theme-malam .fab-aura {
        background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.55) 0%, transparent 75%);
      }
      .fab-wrapper.theme-malam .morph-capsule {
        background: linear-gradient(135deg, rgba(28, 22, 58, 0.88) 0%, rgba(12, 9, 28, 0.96) 100%);
        border-color: rgba(167, 139, 250, 0.4);
        color: #f1f5f9;
        box-shadow: 
          0 12px 34px -4px rgba(0, 0, 0, 0.7),
          0 0 18px rgba(139, 92, 246, 0.3),
          inset 0 1.5px 1.5px rgba(255, 255, 255, 0.22);
      }
      .fab-wrapper.theme-malam .lock-svg {
        color: #c4b5fd;
      }
      .fab-wrapper.theme-malam .key-badge {
        background: rgba(139, 92, 246, 0.25);
        color: #c4b5fd;
        border: 1px solid rgba(139, 92, 246, 0.4);
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
      <div class="fab-aura"></div>
      <button class="morph-capsule" id="lock-btn-trigger" title="Kunci Browser (Ctrl+L)">
        <div class="shimmer-ray"></div>
        <div class="icon-box">
          <svg class="lock-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="lock-shackle" d="M7 10V6.8a5 5 0 0 1 10 0V10" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/>
            <rect class="lock-body" x="3.5" y="10" width="17" height="11" rx="3.5" stroke="currentColor" stroke-width="2.3" fill="currentColor" fill-opacity="0.15"/>
            <circle cx="12" cy="15.2" r="1.3" fill="currentColor"/>
            <path d="M12 16.5v1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="morph-label">
          <span class="label-text">Kunci</span>
          <span class="key-badge">Ctrl+L</span>
        </div>
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
