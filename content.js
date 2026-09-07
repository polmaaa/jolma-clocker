// content.js - Injects floating lock button that dynamically adapts to time-of-day themes (Pagi, Siang, Sore, Malam)

(function () {
  // Prevent duplicate instances in the same frame
  if (window.__krompolLockScriptInjected) {
    if (typeof window.__krompolCheckAndRender === 'function') {
      window.__krompolCheckAndRender();
    }
    return;
  }
  window.__krompolLockScriptInjected = true;

  const HOST_ID = 'krompol-floating-lock-host';

  // Only inject in top window (not inside iframes)
  if (window.top !== window.self) {
    return;
  }

  // Calculate current time-of-day theme class
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

  // Check lock state and render or remove button
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

  // Real-time synchronization when lock state changes in storage
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
        wrapper.className = `fab-wrapper anim-enter ${currentTheme}`;
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      .fab-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: max-content;
      }

      .fab-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 46px;
        padding: 0 18px 0 14px;
        border-radius: 23px;
        cursor: pointer;
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        outline: none;
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                    background 0.8s ease,
                    border-color 0.8s ease,
                    color 0.8s ease,
                    box-shadow 0.8s ease;
      }

      .fab-icon {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
        transition: transform 0.2s ease, stroke 0.3s ease;
      }

      .fab-text {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.02em;
        white-space: nowrap;
        transition: color 0.3s ease;
      }

      /* Pulse Ring Effect */
      .pulse-glow {
        position: absolute;
        inset: -4px;
        border-radius: 27px;
        opacity: 0;
        animation: pulseGlow 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
        pointer-events: none;
        transition: border-color 0.8s ease;
      }

      @keyframes pulseGlow {
        0% { transform: scale(0.96); opacity: 0.7; }
        50% { transform: scale(1.08); opacity: 0.1; }
        100% { transform: scale(1.14); opacity: 0; }
      }

      /* ============================================================
         THEME COLOR PALETTES (Matches lock.css time periods)
         ============================================================ */

      /* 1. PAGI (04:00–10:59) — Warm Golden Ivory / Amber */
      .fab-wrapper.theme-pagi .fab-btn {
        background: rgba(255, 253, 235, 0.94);
        border: 1px solid rgba(245, 158, 11, 0.35);
        color: #78350f;
        box-shadow: 
          0 8px 24px rgba(217, 119, 6, 0.18),
          0 2px 6px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-pagi .fab-icon {
        stroke: #b45309;
      }
      .fab-wrapper.theme-pagi .fab-text {
        color: #78350f;
        text-shadow: none;
      }
      .fab-wrapper.theme-pagi .pulse-glow {
        border: 2px solid rgba(245, 158, 11, 0.4);
      }

      /* 2. SIANG (11:00–14:59) — Fresh Mint Emerald / Sky */
      .fab-wrapper.theme-siang .fab-btn {
        background: rgba(240, 253, 250, 0.94);
        border: 1px solid rgba(16, 185, 129, 0.35);
        color: #064e3b;
        box-shadow: 
          0 8px 24px rgba(16, 185, 129, 0.18),
          0 2px 6px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-siang .fab-icon {
        stroke: #047857;
      }
      .fab-wrapper.theme-siang .fab-text {
        color: #064e3b;
        text-shadow: none;
      }
      .fab-wrapper.theme-siang .pulse-glow {
        border: 2px solid rgba(16, 185, 129, 0.4);
      }

      /* 3. SORE (15:00–18:29) — Warm Sunset Rose / Peach */
      .fab-wrapper.theme-sore .fab-btn {
        background: rgba(255, 241, 242, 0.94);
        border: 1px solid rgba(244, 63, 94, 0.35);
        color: #881337;
        box-shadow: 
          0 8px 24px rgba(244, 63, 94, 0.18),
          0 2px 6px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.95);
      }
      .fab-wrapper.theme-sore .fab-icon {
        stroke: #be185d;
      }
      .fab-wrapper.theme-sore .fab-text {
        color: #881337;
        text-shadow: none;
      }
      .fab-wrapper.theme-sore .pulse-glow {
        border: 2px solid rgba(244, 63, 94, 0.4);
      }

      /* 4. MALAM (18:30–03:59) — Starry Midnight Dark Navy / Purple Glass */
      .fab-wrapper.theme-malam .fab-btn {
        background: rgba(15, 10, 30, 0.88);
        border: 1px solid rgba(167, 139, 250, 0.35);
        color: #f1f5f9;
        box-shadow: 
          0 8px 28px rgba(0, 0, 0, 0.5),
          0 2px 8px rgba(109, 40, 217, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      .fab-wrapper.theme-malam .fab-icon {
        stroke: #c4b5fd;
      }
      .fab-wrapper.theme-malam .fab-text {
        color: #f1f5f9;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }
      .fab-wrapper.theme-malam .pulse-glow {
        border: 2px solid rgba(167, 139, 250, 0.4);
      }

      /* ============================================================
         HOVER & ACTIVE STATES (Universal Alert Feedback)
         ============================================================ */
      .fab-wrapper .fab-btn:hover {
        transform: translateY(-3px) scale(1.05);
        background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%) !important;
        border-color: rgba(255, 255, 255, 0.5) !important;
        color: #ffffff !important;
        box-shadow: 
          0 12px 30px rgba(220, 38, 38, 0.5),
          0 4px 10px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.45) !important;
      }

      .fab-wrapper .fab-btn:hover .fab-icon {
        stroke: #ffffff !important;
        transform: rotate(-12deg) scale(1.1);
      }

      .fab-wrapper .fab-btn:hover .fab-text {
        color: #ffffff !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
      }

      .fab-wrapper .fab-btn:active {
        transform: translateY(1px) scale(0.96);
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35) !important;
      }

      /* Entrance animation */
      .anim-enter {
        animation: popEnter 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }

      @keyframes popEnter {
        0% { opacity: 0; transform: translateY(20px) scale(0.7); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;

    const wrapper = document.createElement('div');
    wrapper.className = `fab-wrapper anim-enter ${currentTheme}`;
    wrapper.innerHTML = `
      <div class="pulse-glow"></div>
      <button class="fab-btn" id="lock-btn-trigger" title="Kunci Browser Sekarang">
        <svg class="fab-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
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
        // Fallback
        const storage = chrome.storage.session || chrome.storage.local;
        storage.set({ unlocked: false }, () => {
          window.location.reload();
        });
      }
    });

    // Mount to documentElement so it's guaranteed to attach even before body is ready
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

  // Run initial check immediately
  checkAndRender();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRender);
  }

  // Periodic check to ensure button stays mounted and theme stays up-to-date with current hour
  setInterval(checkAndRender, 2000);
})();
