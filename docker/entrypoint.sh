#!/bin/sh
set -e

cd /var/www/html

# Cek APP_KEY — wajib ada agar session, cookie, dan encrypted data tetap valid
# antar restart. Kalau kosong, container HARUS gagal — jangan auto-generate
# karena `key:generate` di container ephemeral akan menghasilkan key baru
# setiap restart dan mem-invalidate semua session user.
if [ -z "$APP_KEY" ]; then
    echo ""
    echo "ERROR: APP_KEY kosong di .env"
    echo ""
    echo "Generate APP_KEY di HOST (bukan di container) dengan:"
    echo "  docker compose run --rm app php artisan key:generate --show"
    echo ""
    echo "Salin output base64:... ke .env, lalu jalankan ./deploy.sh lagi."
    exit 1
fi

# Guard produksi — APP_DEBUG=true mengekspos stack trace + seluruh isi .env
# (kredensial DB, APP_KEY) ke siapa pun yang memicu error. Wajib false di
# server publik. Container HARUS gagal start kalau konfigurasi tidak aman.
if [ "$APP_DEBUG" = "true" ] || [ "$APP_DEBUG" = "1" ]; then
    echo ""
    echo "ERROR: APP_DEBUG harus false untuk deploy produksi."
    echo "       Ubah APP_DEBUG=false di .env."
    exit 1
fi
if [ "$APP_ENV" != "production" ]; then
    echo ""
    echo "ERROR: APP_ENV harus 'production' untuk deploy (sekarang: '${APP_ENV}')."
    echo "       Ubah APP_ENV=production di .env."
    exit 1
fi

# Tunggu database siap
until php artisan db:show --json > /dev/null 2>&1; do
    echo "Waiting for database..."
    sleep 2
done

# Jalankan migrasi
php artisan migrate --force

# Sinkronkan permissions dari ModuleRegistry (idempoten, add-only — tidak
# reset hak akses role custom; tanpa --prune supaya tidak hapus permission
# yang masih dipakai role tapi sementara tidak ada di registry).
php artisan permission:sync

# Clear cache lama lalu cache ulang config/route/view untuk production
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Storage link
php artisan storage:link --quiet 2>/dev/null || true

exec "$@"
