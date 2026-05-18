# ─────────────────────────────────────────────
# Production image: PHP-FPM + Nginx + Node
#
# Build order:
#   1. Install system packages (PHP, ekstensi, Nginx, Node, composer, pnpm)
#   2. Composer install (Laravel siap)
#   3. pnpm install + build (wayfinder plugin punya akses ke `php artisan`)
#   4. Cleanup node_modules (image production tidak butuh)
# ─────────────────────────────────────────────
FROM php:8.4-fpm-alpine AS production

# Install system dependencies, PHP extensions, Node.js, dan pnpm
RUN apk add --no-cache \
        nginx \
        supervisor \
        curl \
        bash \
        git \
        nodejs \
        npm \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libzip-dev \
        oniguruma-dev \
        icu-dev \
        mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        zip \
        gd \
        bcmath \
        intl \
        opcache \
        pcntl \
    && npm install -g pnpm@latest \
    && rm -rf /var/cache/apk/* /root/.npm

# Install Composer dari binary resmi (pakai PHP utama, bukan PHP terpisah dari apk)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# PHP config
COPY docker/php/php.ini /usr/local/etc/php/conf.d/99-app.ini
COPY docker/php/opcache.ini /usr/local/etc/php/conf.d/98-opcache.ini

# Nginx config
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# Supervisor config (manages nginx + php-fpm + queue worker)
COPY docker/supervisord.conf /etc/supervisord.conf

WORKDIR /var/www/html

# ── Step 1: Composer install (di-cache selama composer.json/lock tidak berubah) ──
COPY composer.json composer.lock ./
RUN composer install \
        --no-dev \
        --no-interaction \
        --prefer-dist \
        --optimize-autoloader \
        --no-scripts \
        --no-autoloader

# ── Step 2: pnpm install (di-cache selama package.json/pnpm-lock/workspace tidak berubah) ──
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ── Step 3: Copy sisa source code ──
COPY . .

# ── Step 4: Finalisasi autoload + build frontend ──
# composer dump-autoload butuh seluruh source code (App\ classes).
# wayfinder butuh `php artisan` & config Laravel, tidak butuh DB.
RUN composer dump-autoload --optimize --no-dev \
    && php artisan wayfinder:generate --with-form \
    && pnpm build

# ── Step 5: Cleanup — buang node_modules dan cache ──
RUN rm -rf node_modules \
    && rm -rf /root/.composer/cache \
    && rm -rf /root/.npm \
    && rm -rf /root/.local/share/pnpm/store

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
