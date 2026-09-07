// content.js - Injects floating lock button at bottom-right on all open tabs when browser is unlocked

(function () {
  const HOST_ID = 'krompol-floating-lock-host';

  // Only inject in top window (not inside iframes)
  if (window.top !== window.self) {
    return;
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
    let host = document.getElementById(HOST_ID);
    if (host) {
      host.style.display = 'block';
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
      }

      .fab-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 46px;
        padding: 0 16px 0 13px;
        background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%);
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 23px;
        cursor: pointer;
        box-shadow: 
          0 8px 24px rgba(15, 23, 42, 0.45),
          0 2px 6px rgba(0, 0, 0, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.35);
        transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        outline: none;
      }

      .fab-btn:hover {
        transform: translateY(-3px) scale(1.05);
        background: linear-gradient(135deg, #b91c1c 0%, #dc2626 50%, #ef4444 100%);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 
          0 12px 28px rgba(220, 38, 38, 0.5),
          0 4px 10px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.45);
      }

      .fab-btn:active {
        transform: translateY(1px) scale(0.96);
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
      }

      .fab-icon {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
        transition: transform 0.2s ease;
      }

      .fab-btn:hover .fab-icon {
        transform: rotate(-12deg) scale(1.1);
      }

      .fab-text {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.02em;
        white-space: nowrap;
        color: #ffffff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      /* Subtle pulse glow */
      .pulse-glow {
        position: absolute;
        inset: -4px;
        border-radius: 27px;
        border: 2px solid rgba(129, 140, 248, 0.4);
        opacity: 0;
        animation: pulseGlow 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
        pointer-events: none;
      }

      @keyframes pulseGlow {
        0% { transform: scale(0.96); opacity: 0.7; }
        50% { transform: scale(1.08); opacity: 0.1; }
        100% { transform: scale(1.14); opacity: 0; }
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
    wrapper.className = 'fab-wrapper anim-enter';
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

    const mountTarget = document.body || document.documentElement;
    if (mountTarget) {
      mountTarget.appendChild(host);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        (document.body || document.documentElement).appendChild(host);
      });
    }
  }

  function removeFloatingButton() {
    const host = document.getElementById(HOST_ID);
    if (host) {
      host.remove();
    }
  }

  // Run initial check
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndRender);
  } else {
    checkAndRender();
  }

  // Periodic check to ensure button stays mounted on dynamic SPA websites
  setInterval(() => {
    try {
      chrome.runtime.sendMessage({ action: 'getLockState' }, (res) => {
        if (chrome.runtime.lastError) return;
        if (res && res.unlocked) {
          if (!document.getElementById(HOST_ID)) {
            renderFloatingButton();
          }
        } else {
          removeFloatingButton();
        }
      });
    } catch (e) {}
  }, 2500);
})();
