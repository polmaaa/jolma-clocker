# Privacy Policy for Jolma CLocker

*Last updated: September 11, 2026*

**Jolma CLocker** ("we", "our", or "the extension") is committed to protecting your privacy. This Privacy Policy explains our practices regarding user data collection, storage, and usage.

---

## 1. Single Purpose & Functionality
Jolma CLocker is a minimalist privacy browser locker and smart new tab dashboard extension designed to protect your browser session with password security and provide a clean, productive new tab experience.

---

## 2. Information Collection & Storage

### A. Local Storage (100% on Device)
- **Passwords & Username**: Your lock password, username, language preferences, shortcuts/folders, and feature settings are stored locally on your device using Chrome's Local Storage API (chrome.storage.local).
- **No Remote Transmission**: We do **NOT** transmit, sync, or store your passwords or personal settings on any external servers.

### B. Weather & Location Data
- When enabled, real-time weather forecasts are retrieved from open public APIs (such as Open-Meteo).
- If GPS precise location is turned on, your device coordinates are used exclusively to query the weather forecast for your immediate area. Your location is never logged, tracked, stored, or sold.

### C. Daily Inspiring Quotes
- Motivational quotes are loaded from public quotes APIs (such as DummyJSON, Quotable) or curated local banks. No user data or personal identifiers are sent with these requests.

### D. No Tracking & No Analytics
- Jolma CLocker does **NOT** use tracking cookies, Google Analytics, or third-party tracking libraries.
- We do **NOT** collect browsing history, website contents, keystrokes outside the locker password input, or personal credentials.

---

## 3. Chrome Permissions Used & Justification

| Permission | Purpose & Justification |
| :--- | :--- |
| storage | Saves user preferences, lock states, shortcuts, and cache locally. |
| 	abs & webNavigation | Verifies lock status across browser tabs and enforces the lock screen when locked. |
| power | Prevents the display and computer from sleeping automatically while the browser is locked (*Keep Awake*). |
| idle | Detects user inactivity to trigger the optional Auto-Lock timer. |
| larms | Periodically triggers background checks for auto-lock and weather cache updates. |
| scripting & <all_urls> | Injects the floating lock button and captures the CTRL+L keyboard shortcut on webpages to lock the browser instantly. |

---

## 4. Third-Party Services
Jolma CLocker interacts only with standard, open endpoints for core dashboard features:
- **Open-Meteo API** (Weather forecasts)
- **BigDataCloud / FreeIPAPI** (Geocoding / IP city detection fallback)
- **DummyJSON / Quotable** (Daily quotes)
- **Google Translate API** (Optional real-time translation of quotes)
- **Saweria** (Optional donation link, external website)

---

## 5. Contact & Support
If you have any questions, feedback, or feature requests regarding this Privacy Policy or the Jolma CLocker extension, please reach out to:

- **Developer**: Polma Sihotang
- **Email**: polma.sihotang@gmail.com
- **LinkedIn**: [https://id.linkedin.com/in/polma-sihotang-46535a141](https://id.linkedin.com/in/polma-sihotang-46535a141)
- **GitHub Repository**: [https://github.com/polmaaa/jolma-clocker](https://github.com/polmaaa/jolma-clocker)
