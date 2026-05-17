# SIAKAD Kabasa
**Sistem Informasi Akademis SMK Babussalam**

Platform manajemen akademis berbasis web untuk SMK Babussalam, dibangun dengan Laravel, Inertia.js, React, dan shadcn/ui.

---

## Status Fitur

| Fitur | Status |
|---|---|
| Manajemen Tahun Ajaran | ✅ Implemented |
| Manajemen Kelas | ✅ Implemented |
| Manajemen Siswa | ✅ Implemented |
| Absensi (Kehadiran & RFID) | ✅ Implemented |
| Jadwal Absensi | ✅ Implemented |
| Manajemen Guru & Wali Kelas | ✅ Implemented |
| Mata Pelajaran & Jadwal Pelajaran | ✅ Implemented |
| Izin / Sakit / Cuti Siswa | ✅ Implemented |
| Rekap & Export Kehadiran |✅ Implemented |
| Notifikasi Orang Tua (WhatsApp) | 🔜 Upcoming |
| Nilai & Raport | 🔜 Upcoming |
| PPDB (Penerimaan Siswa Baru) | 🔜 Upcoming |
| Keuangan / SPP | 🔜 Upcoming |
| Manajemen Pengguna & Hak Akses | 🔜 Upcoming |
| Analitik & Laporan | 🔜 Upcoming |

---

## Tech Stack

- **Backend** — Laravel 12, PHP 8.2+
- **Frontend** — React 19, TypeScript, Inertia.js 2
- **UI** — shadcn/ui, Tailwind CSS 4, Lucide React
- **Database** — MySQL
- **Build Tool** — Vite 8

---

## Instalasi

### Via Docker (Direkomendasikan untuk Production)

Prasyarat: [Docker](https://docs.docker.com/get-docker/) dan Docker Compose sudah terinstall.

**1. Clone repository**

```bash
git clone <repository-url>
cd siakad-kabasa
```

**2. Siapkan environment**

```bash
cp .env.docker .env
```

Buka `.env` dan sesuaikan nilai berikut:

```env
APP_URL=http://domain-atau-ip-server

DB_PASSWORD=isi_password_database
DB_ROOT_PASSWORD=isi_root_password_mysql

SUPERADMIN_EMAIL=admin@email.com
SUPERADMIN_PASSWORD=isi_password_admin
```

`APP_KEY` boleh dikosongkan — akan di-generate otomatis saat container pertama kali boot.

**3. Build dan jalankan**

```bash
chmod +x deploy.sh   # sekali saja
./deploy.sh
```

Script ini akan menarik kode terbaru dari repository, build Docker image, dan menjalankan semua service secara otomatis. Proses build pertama memakan waktu beberapa menit. Untuk update berikutnya cukup jalankan `./deploy.sh` kembali.

Jika perlu rebuild penuh dari nol (misal setelah ubah `.env`, image korup, atau dependency berubah):

```bash
chmod +x rebuild.sh   # sekali saja
./rebuild.sh
```

Script `rebuild.sh` akan menampilkan seluruh isi konfigurasi `.env` aktif (nilai sensitif disamarkan) sebelum build dimulai, sehingga mudah memverifikasi tidak ada env yang salah atau kosong.

Aplikasi dapat diakses di `http://localhost` (atau port yang dikonfigurasi di `APP_PORT`).

**Perintah berguna:**

```bash
# Lihat log aplikasi
docker compose logs -f app

# Masuk ke shell container
docker compose exec app sh

# Jalankan artisan command
docker compose exec app php artisan <command>

# Stop semua service
docker compose down

# Stop dan hapus data database
docker compose down -v
```

---

### Instalasi Manual (untuk Development)

Prasyarat:
- PHP >= 8.3
- Composer
- Node.js >= 22
- pnpm
- MySQL

**1. Clone repository**

```bash
git clone <repository-url>
cd siakad-kabasa
```

**2. Install dependency**

```bash
composer install
pnpm install --frozen-lockfile
```

**3. Konfigurasi environment**

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
DB_PASSWORD=
```

**4. Migrasi database**

```bash
php artisan migrate
```

**5. Build aset frontend**

```bash
pnpm run build
```

---

## Menjalankan Aplikasi (Development)

Jalankan semua service sekaligus:

```bash
composer run dev
```

Perintah ini menjalankan Laravel server, Vite dev server, dan queue worker secara bersamaan.

Atau jalankan secara terpisah:

```bash
# Terminal 1 — Laravel server
php artisan serve

# Terminal 2 — Vite dev server
pnpm run dev
```

Aplikasi dapat diakses di [http://localhost:8000](http://localhost:8000).

---

## Lisensi

Hak cipta &copy; SMK Babussalam. Seluruh hak dilindungi.
