# Базовый образ PHP-FPM + Nginx
FROM richarvey/nginx-php-fpm:3.1.6

# Копируем весь проект
COPY . /var/www/html

# Устанавливаем переменные окружения Laravel
ENV APP_ENV=production \
    APP_DEBUG=false \
    LOG_CHANNEL=stderr \
    WEBROOT=/var/www/html/public \
    PHP_ERRORS_STDERR=1 \
    COMPOSER_ALLOW_SUPERUSER=1

# Expose порт, который Render будет слушать
EXPOSE 80

# Делаем start.sh исполняемым
RUN chmod +x /var/www/html/start.sh

# CMD: выполняем миграции/кеширование, затем nginx в foreground
CMD ["/bin/bash", "-c", "/var/www/html/start.sh && nginx -g 'daemon off;'"]
