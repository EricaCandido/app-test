# Build step
FROM node:20.10.0-alpine as build

WORKDIR /app/src

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build


# Serve step
FROM node:20.10.0-alpine

WORKDIR /usr/app

COPY --from=build /app/src/dist/wind-sed-portal-ui ./

CMD node ./server/server.mjs
EXPOSE 4000