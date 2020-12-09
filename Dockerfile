FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
EXPOSE 9092
COPY dist/mpa-cloud .
