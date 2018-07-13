FROM bitnami/nginx

COPY nextwave/public /app

COPY certs-nextwavesolutions.io/cert1.pem /bitnami/nginx/conf/bitnami/certs/server.crt

COPY certs-nextwavesolutions.io/privkey1.pem /bitnami/nginx/conf/bitnami/certs/server.key

EXPOSE 80

EXPOSE 443
