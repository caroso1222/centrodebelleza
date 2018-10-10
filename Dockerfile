FROM node:9-alpine
WORKDIR /usr/src/app
COPY .bowerrc ./
COPY bower.json ./
COPY package*.json ./
RUN apk add --no-cache git
RUN npm i -g bower
RUN npm i
RUN bower install --allow-root
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]