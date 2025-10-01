#!/usr/bin/env bash
set -e

# Генерация ключа приложения (если отсутствует)
php artisan key:generate --force

# Применяем миграции
php artisan migrate --force

# Старт сервера на 0.0.0.0:10000
php artisan serve --host=0.0.0.0 --port=10000
