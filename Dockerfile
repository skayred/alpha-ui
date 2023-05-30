FROM nginx:1.21
RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/build
COPY ./build /var/www/build
COPY alpha.template /etc/nginx/nginx.conf

EXPOSE 80
