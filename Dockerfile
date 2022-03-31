FROM node:alpine3.12

WORKDIR /new-folder


COPY package*.json ./

RUN npm ci

COPY . .  

CMD [ "node", "index.js" ]