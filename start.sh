#!/usr/bin/env bash
set -e

echo "=== Running composer install ==="
composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

echo "=== Caching config ==="
php /var/www/html/artisan config:cache

echo "=== Caching routes ==="
php /var/www/html/artisan route:cache

echo "=== Running migrations ==="
php /var/www/html/artisan migrate --force

echo "=== Startup finished ==="
