FROM node:20

WORKDIR /tmp/react

COPY . .

RUN rm -rf node_modules

RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html

RUN cp -r build/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react

