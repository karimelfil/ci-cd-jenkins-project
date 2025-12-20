FROM php:8.2-apache

# Enable mysqli & pdo_mysql extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html
