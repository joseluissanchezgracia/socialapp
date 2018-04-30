FROM nginx:1.13.12

EXPOSE 80 443
USER root

RUN mkdir /opt/nginx
ADD static /opt/nginx

RUN mkdir /opt/cert
ADD cert /opt/cert

ADD config/nginx.conf /etc/nginx/nginx.conf
