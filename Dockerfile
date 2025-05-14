# FROM node:20

# WORKDIR /tmp/react

# COPY . .

# RUN rm -rf node_modules

# RUN npm install

# RUN npm run build

# RUN mkdir -p /var/www/html

# RUN cp -r build/* /var/www/html

# VOLUME /var/www/html

# WORKDIR /

# RUN rm -rf /tmp/react

# Eventos_RCC-PB_FrontEnd/Dockerfile

# Etapa de build do React
FROM node:20 AS builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Etapa final com nginx
FROM nginx:alpine

# Remover a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copiar a build do React
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar a nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

