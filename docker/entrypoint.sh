#!/bin/sh
set -e

cd /var/www/html

# Tunggu database siap (sudah dihandle healthcheck di compose, tapi double-check)
until php artisan db:show --json > /dev/null 2>&1; do
    echo "Waiting for database..."
    sleep 2
done

# Generate app key jika belum ada
if [ -z "$APP_KEY" ]; then
    php artisan key:generate --force
fi

# Jalankan migrasi
php artisan migrate --force

# Clear + cache config/route/view untuk production
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Storage link
php artisan storage:link --quiet 2>/dev/null || true

exec "$@"
