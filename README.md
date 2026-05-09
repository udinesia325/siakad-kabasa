# SIAKAD Kabasa
**Sistem Informasi Akademis SMK Babussalam**

Platform manajemen akademis berbasis web untuk SMK Babussalam, dibangun dengan Laravel, Inertia.js, React, dan shadcn/ui.

---

## Status Fitur

| Fitur | Status |
|---|---|
| Absensi | 🚧 On Progress |
| Analitik & Laporan | 🔜 Upcoming |
| Manajemen Kelas | 🔜 Upcoming |
| Manajemen Siswa | 🔜 Upcoming |
| Manajemen Guru | 🔜 Upcoming |
| Jadwal Pelajaran | 🔜 Upcoming |
| Nilai & Raport | 🔜 Upcoming |
| Manajemen Pengguna & Hak Akses | 🔜 Upcoming |

---

## Tech Stack

- **Backend** — Laravel 12, PHP 8.2+
- **Frontend** — React 19, TypeScript, Inertia.js 2
- **UI** — shadcn/ui, Tailwind CSS 4, Lucide React
- **Database** — MySQL
- **Build Tool** — Vite 8

---

## Instalasi

### Prasyarat

Pastikan sudah terinstall:
- PHP >= 8.2
- Composer
- Node.js >= 20
- npm
- MySQL

### Langkah-langkah

**1. Clone repository**

```bash
git clone <repository-url>
cd siakad-kabasa
```

**2. Install dependency PHP**

```bash
composer install
```

**3. Install dependency JavaScript**

```bash
npm install
```

**4. Konfigurasi environment**

```bash
cp .env.example .env
php artisan key:generate
```

Buka file `.env` dan sesuaikan konfigurasi database:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siakad-kabasa
DB_USERNAME=root
DB_PASSWORD=your_password
```

**5. Migrasi database**

```bash
php artisan migrate
```

**6. Build aset frontend**

```bash
npm run build
```

---

## Menjalankan Aplikasi

Jalankan semua service sekaligus dengan perintah berikut:

```bash
composer run dev
```

Perintah ini akan menjalankan Laravel server, Vite dev server, dan queue worker secara bersamaan.

Atau jalankan secara terpisah:

```bash
# Terminal 1 — Laravel server
php artisan serve

# Terminal 2 — Vite dev server
npm run dev
```

Aplikasi dapat diakses di [http://localhost:8000](http://localhost:8000).

---

## Lisensi

Hak cipta &copy; SMK Babussalam. Seluruh hak dilindungi.
