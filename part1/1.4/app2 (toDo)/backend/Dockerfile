FROM node:16-alpine AS build

WORKDIR /usr/app

COPY ./frontend .

RUN npm ci --production
RUN npm run build

FROM node:16-alpine

WORKDIR /usr/app

COPY . .
COPY --from=build /usr/app/build /usr/app/build

RUN npm ci

EXPOSE 8080

CMD ["npm", "start"]