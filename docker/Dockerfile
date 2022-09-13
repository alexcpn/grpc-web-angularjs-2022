FROM nginx:1.23.1-alpine
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./dist/test-proj /usr/share/nginx/html
## Serve
CMD ["nginx", "-g", "daemon off;"]