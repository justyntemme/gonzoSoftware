FROM nextwavesolutionsllc/nextwavesolutions

COPY nextwave/public /app


# SSL Configuration
# path /bitnami/nginx/conf/bitnami/certs
# dir struct | server.crt | server.key
USER root
RUN rm /bitnami/nginx/conf/bitnami/certs/server.key
RUN rm /bitnami/nginx/conf/bitnami/certs/server.crt

COPY ./server.crt /bitnami/nginx/conf/bitnami/certs/
COPY /server.key /bitnami/nginx/conf/bitnami/certs/
EXPOSE 80

EXPOSE 443
