FROM wordpress:6.7
# Available images: https://hub.docker.com/_/wordpress

WORKDIR /var/www/html

# Install less (necessary for wp-cli operation)
RUN apt-get clean
RUN apt-get update
RUN apt-get install -y less

# Install helpers for composer
RUN apt-get install -y git zip unzip

# Install wp-cli
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
  && chmod +x wp-cli.phar \
  && mv wp-cli.phar /usr/local/bin/wp

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
  && php composer-setup.php \
  && mv composer.phar /usr/local/bin/composer \
  && rm composer-setup.php

# Install Xdebug
RUN pecl install xdebug

# Install node, npm (needed for WP scripts)
# Installation instructions from: https://github.com/nodesource/distributions?tab=readme-ov-file#installation-scripts

RUN curl -SLO https://deb.nodesource.com/nsolid_setup_deb.sh \
  && chmod +x ./nsolid_setup_deb.sh \
  # Installing version 20, the latest LTS version (as of Dec 2023)
  && ./nsolid_setup_deb.sh 20 \
  && apt-get install nodejs -y \
  && rm nsolid_setup_deb.sh
