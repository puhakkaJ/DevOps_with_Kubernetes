FROM node:alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY . .

ENV PORT=8080
ENV WDS_SOCKET_PORT=0

CMD ["npm", "start"]