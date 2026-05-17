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

# Tunggu database siap
until php artisan db:show --json > /dev/null 2>&1; do
    echo "Waiting for database..."
    sleep 2
done

# Jalankan migrasi
php artisan migrate --force

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
