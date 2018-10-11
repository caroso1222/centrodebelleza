FROM node:9-alpine
WORKDIR /usr/src/app
COPY .bowerrc ./
COPY bower.json ./
COPY package*.json ./
RUN apk add --no-cache git
RUN npm i -g bower
RUN npm i
COPY . .
RUN bower install --allow-root
EXPOSE 80
CMD [ "npm", "start" ]