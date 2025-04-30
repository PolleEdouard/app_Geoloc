
# Use an official PHP runtime as a base image

FROM docker.io/php:8.3-fpm
# Install LOCALES
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && apt-get install -y \
    locales \
    && echo '' >> /usr/share/locale/locale.alias \
    && sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i 's/# fr_FR.UTF-8 UTF-8/fr_FR.UTF-8 UTF-8/' /etc/locale.gen \
    && dpkg-reconfigure --frontend=noninteractive locales
# Install Package
RUN apt-get update && apt-get install --yes --force-yes zlib1g-dev libsodium-dev libcurl4 libcurl4-openssl-dev libpng-dev libxslt-dev libzip-dev libxml2-dev libonig-dev libfreetype-dev libjpeg62-turbo-dev libgd-dev zlib1g-dev libbz2-dev libz-dev bzip2
RUN apt-get update && apt-get install -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev libxpm-dev zlib1g-dev \
    && docker-php-ext-configure gd --enable-gd --with-webp --with-jpeg --with-xpm --with-freetype \
    && docker-php-ext-install gd \
    && docker-php-ext-enable gd
#RUN docker-php-ext-configure mysqli \
#    && docker-php-ext-install mysqli 
RUN docker-php-ext-configure pdo_mysql \
    && docker-php-ext-install pdo_mysql 
RUN docker-php-ext-configure zip \
    && docker-php-ext-install zip 
RUN docker-php-ext-configure xml \
    && docker-php-ext-install xml
RUN docker-php-ext-configure mbstring \
    && docker-php-ext-install mbstring
RUN docker-php-ext-configure opcache \
    && docker-php-ext-install opcache
#RUN docker-php-ext-configure intl \
#    && docker-php-ext-install intl 
#RUN docker-php-ext-configure bz2 \
#   && docker-php-ext-install bz2 
#RUN docker-php-ext-configure soap \
#    && docker-php-ext-install soap 
#RUN docker-php-ext-configure simplexml \
#    && docker-php-ext-install simplexml
#RUN docker-php-ext-configure session \
#    && docker-php-ext-install session
#RUN docker-php-ext-configure ctype \
#    && docker-php-ext-install ctype 
#RUN docker-php-ext-configure fileinfo \
#    && docker-php-ext-install fileinfo
#    && docker-php-ext-install exif
RUN docker-php-ext-configure xsl \
    && docker-php-ext-install xsl
RUN docker-php-ext-configure curl \
    && docker-php-ext-install curl
#RUN docker-php-ext-configure sodium \
#    && docker-php-ext-install sodium
# XML-RPC (Deprecated)
#RUN pecl install channel://pecl.php.net/xmlrpc-1.0.0RC3
#RUN docker-php-ext-enable xmlrpc
# IMAP
#RUN apt-get update && apt-get install -y libc-client-dev libkrb5-dev
#RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl
#RUN docker-php-ext-install imap
# LDAP
RUN apt-get update && apt-get install libldap2-dev -y && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/
RUN docker-php-ext-install ldap
# COMPOSER
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer
# Mode Rewrite
#RUN a2enmod rewrite
# Imagemagick : install fails on 8.0
#RUN apt-get install -y git && \
#    git clone https://github.com/Imagick/imagick.git --depth 1 /tmp/imagick && \
#    cd /tmp/imagick && \
#    git fetch origin master && \
#    git switch master && \
#    cd /tmp/imagick && \
#    phpize && \
#    ./configure && \
#    make && \
#    make install && \
#    apt-get remove git --purge && \
#    docker-php-ext-enable imagick
# Ecoute sur port 80
EXPOSE 80
WORKDIR /var/www/symfony
# Ajout de la conf PHP
#ADD custom.ini /usr/local/etc/php/conf.d/custom.ini
# Ajout de la conf du site par defaut 
#ADD defaultwebsite.conf /usr/local/etc/php/defaultwebsite.conf