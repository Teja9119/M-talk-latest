# Stage 1
FROM node:14.16.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2
FROM nginx:latest
VOLUME /var/cache/nginx
COPY --from=node /app/dist/mtalk/ /usr/share/nginx/html
EXPOSE 80