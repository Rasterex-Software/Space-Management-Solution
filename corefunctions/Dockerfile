FROM node:9.11-alpine as build-step
WORKDIR /app/
COPY ["package.json", "package-lock.json", "rollup.config.js","tsconfig.json","tslint.json", "./"]
RUN npm i
COPY ["src/", "src/"]
RUN npm run build
RUN tar -zcvf node_modules.tar.gz node_modules/

# TODO decide how to use the artifacts and where to place them
FROM nginx:1.15.7-alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY --from=build-step /app/node_modules.tar.gz /usr/share/nginx/html