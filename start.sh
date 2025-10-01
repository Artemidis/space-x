#!/usr/bin/env bash
set -e

# Генерация APP_KEY, если отсутствует
php artisan key:generate --force || true

# Применение миграций
php artisan migrate --force

# Запуск PHP-FPM
php-fpm
