#!/usr/bin/env bash
set -e

# Разбор DATABASE_URL на отдельные переменные
if [ -n "$DATABASE_URL" ]; then
  regex="postgresql://([^:]+):([^@]+)@([^:/]+)(:([0-9]+))?/(.+)"
  if [[ $DATABASE_URL =~ $regex ]]; then
    export DB_CONNECTION=pgsql
    export DB_USERNAME="${BASH_REMATCH[1]}"
    export DB_PASSWORD="${BASH_REMATCH[2]}"
    export DB_HOST="${BASH_REMATCH[3]}"
    export DB_PORT="${BASH_REMATCH[5]:-5432}"  # Если порт не указан, ставим 5432
    export DB_DATABASE="${BASH_REMATCH[6]}"
  else
    echo "ERROR: DATABASE_URL не соответствует формату"
    exit 1
  fi
fi

# Кэшируем конфиг и маршруты
php artisan config:cache
php artisan route:cache

# Применяем миграции
php artisan migrate --force

# Запуск FPM
php-fpm
