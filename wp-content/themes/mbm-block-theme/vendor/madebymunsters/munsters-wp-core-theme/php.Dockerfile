# TODO: should this move to PHP v8?
FROM php:8.0-cli

WORKDIR /app/

RUN apt-get update

# Install less (necessary for wp-cli operation)
RUN apt-get install -y less

# Install helpers for composer
RUN apt-get install -y git zip

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php composer-setup.php \
  && mv composer.phar /usr/local/bin/composer \
  && rm composer-setup.php

# Install Xdebug
RUN pecl install xdebug \
  && docker-php-ext-enable xdebug
