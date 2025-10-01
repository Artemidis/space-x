# Базовый образ с PHP + Nginx + FPM
FROM richarvey/nginx-php-fpm:3.1.6

# Устанавливаем рабочую директорию
WORKDIR /var/www/html

# Копируем весь проект
COPY . .

# Настройки Laravel и PHP
ENV WEBROOT=/var/www/html/public
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr
ENV PHP_ERRORS_STDERR=1

# Composer
ENV COMPOSER_ALLOW_SUPERUSER=1

# Устанавливаем зависимости PHP
RUN composer install --no-dev --optimize-autoloader

# Кэшируем конфигурации Laravel
RUN php artisan config:cache
RUN php artisan route:cache

# Применяем миграции при сборке (если нужно)
RUN php artisan migrate --force

# Копируем и делаем исполняемым скрипт запуска
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Указываем Render, что контейнер слушает порт 80
EXPOSE 80

# Команда по умолчанию
CMD ["/start.sh"]
