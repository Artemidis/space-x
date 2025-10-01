FROM richarvey/nginx-php-fpm:3.1.6

COPY . .

# Установка зависимостей
RUN apk update && apk add --no-cache npm
RUN npm install
RUN npm run build

CMD ["/start.sh"]
