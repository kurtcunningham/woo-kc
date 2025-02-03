FROM php:8.2-cli

ARG COPY_ROOT
ARG TARGET_DIR_NAME

# Install less (necessary for wp-cli operation)
RUN apt-get update
RUN apt-get install -y less

# Install helpers for composer
RUN apt-get install -y git zip unzip

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php composer-setup.php \
  && mv composer.phar /usr/local/bin/composer \
  && rm composer-setup.php

# Copy project files into the container
COPY $COPY_ROOT /build/
# Set the working directory
WORKDIR /build/

# Composer install
RUN composer install

# Update the PATH to include the phpcs executable
ENV PATH="/build/vendor/bin:${PATH}"
