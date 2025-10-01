#!/usr/bin/env bash
set -e

# Парсим DATABASE_URL
if [ -n "$DATABASE_URL" ]; then
  export DB_CONNECTION=pgsql
  export DB_HOST=$(echo $DATABASE_URL | sed -E 's#postgresql://[^:]+:.*@([^:/]+).*#\1#')
  export DB_PORT=$(echo $DATABASE_URL | sed -E 's#postgresql://[^:]+:.*@[^:/]+:([0-9]+).*#\1#')
  export DB_DATABASE=$(echo $DATABASE_URL | sed -E 's#postgresql://[^:]+:.*@[^/]+/([^?]+).*#\1#')
  export DB_USERNAME=$(echo $DATABASE_URL | sed -E 's#postgresql://([^:]+):.*@.*#\1#')
  export DB_PASSWORD=$(echo $DATABASE_URL | sed -E 's#postgresql://[^:]+:([^@]+)@.*#\1#')
fi

echo "=== Running composer install ==="
composer install --no-dev --optimize-autoloader --working-dir=/var/www/html

echo "=== Caching config ==="
php /var/www/html/artisan config:cache

echo "=== Caching routes ==="
php /var/www/html/artisan route:cache

echo "=== Running migrations ==="
php /var/www/html/artisan migrate --force
