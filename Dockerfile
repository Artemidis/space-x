FROM php:8.2-cli

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    libzip-dev \
    zip \
    curl \
    npm \
    && docker-php-ext-install pdo pdo_pgsql zip

# Устанавливаем Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Копируем файлы проекта
COPY . .

# Установка PHP-зависимостей
RUN composer install --no-dev --optimize-autoloader

# Установка Node-зависимостей и билд фронта
RUN npm install && npm run build

# Генерация APP_KEY, если отсутствует
RUN php artisan key:generate --force || true

# Выполняем миграции перед запуском
RUN php artisan migrate --force || true

# Указываем порт
EXPOSE 10000

# Старт приложения
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
