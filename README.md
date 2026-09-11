# Jolma CLocker - Browser Security Guard 🔒

**Jolma CLocker** (*Jolma Chrome Locker* v0.2.1) adalah ekstensi Google Chrome (Manifest V3) modern, elegan, dan estetik yang berfungsi untuk mengamankan seluruh sesi browsing Anda melalui proteksi kata sandi, auto-fullscreen lock, serta shortcut instan.

Dibuat & dikembangkan oleh: **Polma Sihotang**

---

## ✨ Fitur Utama

1. **Layar Pengunci Glassmorphism Minimalis**:
   Tampilan jam digital berukuran penuh (`HH:MM:SS`) dan tanggal berformat bahasa Indonesia, dilengkapi kolom input kata sandi berbentuk kapsul (*horizontal glass pill*) yang halus dan modern.

2. **Penyesuaian 4 Waktu Dinamis (Adaptive Time-of-Day Themes)**:
   Palet warna *glassmorphism* dan animasi ambient gradient yang berganti otomatis mengikuti waktu lokal:
   * ❄️ **Pagi (04:00 - 10:59)** — *Nordic Glacier Mist / Aurora Dawn Glass*: Gradasi biru es kutub & aurora segar (`#0284c7`).
   * ☀️ **Siang (11:00 - 14:59)** — *Solar Azure / Royal Sky Daylight Glass*: Gradasi langit siang royal azure & sapphire cerah (`#4f46e5`).
   * 🌇 **Sore (15:00 - 18:29)** — *Twilight Amber Sunset / Golden Dusk Glass*: Gradasi senja tembaga & jingga hangat (`#ea580c`).
   * 🌌 **Malam (18:30 - 03:59)** — *Obsidian Midnight Violet Glass*: Mode malam ultra-dark dengan aura violet & indigo gelap (`#7c3aed`).

3. **Floating Quick Lock Action & Shortcut Instan**:
   * Tombol kunci melayang (*Floating Action Button*) dengan shackle animasi di setiap halaman web saat browser terbuka.
   * Shortcut keyboard universal **`Ctrl + L`** (atau **`Cmd + L`** di macOS) untuk mengunci browser secara instan dari halaman mana pun.

4. **Sistem Proteksi Keyboard & Fullscreen Blocker**:
   * HTML5 Keyboard Lock API terintegrasi untuk mengunci tombol navigasi (`Tab`, `Escape`, `F11`, `F12`, `Ctrl+W`, `Ctrl+N`, `Alt+F4`, dll.) saat layar pengunci aktif.
   * Auto-refocus window blocker: Chrome otomatis memusatkan fokus kembali jika pengguna mencoba mengklik jendela lain.

5. **Ubah Kata Sandi Fleksibel (Modal & Popup)**:
   * Pengguna dapat mengubah kata sandi langsung dari *Dropdown Menu* di layar New Tab maupun melalui *Popup Toolbar*.
   * Validasi kata sandi lama dan konfirmasi kata sandi baru secara instan dan tersimpan aman di `chrome.storage.local`.

6. **Proteksi Bypass Halaman Internal (`chrome://`) & Multi-Tab Sync**:
   * Menutup otomatis setiap upaya membuka tab `chrome://extensions`, `chrome://settings`, atau devtools saat terkunci.
   * Sinkronisasi status buka kunci otomatis di semua tab yang terbuka.

---

## 🚀 Cara Instalasi (Developer Mode)

1. Klon atau unduh repositori ini ke komputer Anda:
   ```bash
   git clone https://github.com/polmaaa/jolma-clocker.git
   ```
2. Buka browser **Google Chrome** dan navigasikan ke alamat **`chrome://extensions/`**.
3. Di pojok kanan atas, aktifkan tombol toggle **Developer mode** ke posisi **ON**.
4. Di pojok kiri atas, klik tombol **Load unpacked**.
5. Pilih folder repositori `jolma-clocker` yang telah diunduh, lalu klik **Select Folder**.
6. Ekstensi **Jolma CLocker - Browser Security Guard** kini aktif!

---

## 🔑 Penggunaan & Pengujian

* **Kata Sandi Default**: `ganteng`
* **Shortcut Mengunci Instan**: Tekan **`Ctrl + L`** (Windows) atau **`Cmd + L`** (Mac).
* **Tombol Cepat**: Klik tombol gembok mengambang di pojok kanan bawah setiap halaman web.
* **Mengubah Kata Sandi**:
  * Melalui tombol **Menu > Ubah Kata Sandi** di pojok kanan atas layar New Tab (saat unlocked).
  * Atau klik ikon ekstensi di toolbar Chrome > akordeon **"Ubah Kata Sandi"**.

---

## 👨‍💻 Pengembang
**Polma Sihotang**
* GitHub: [@polmaaa](https://github.com/polmaaa)
