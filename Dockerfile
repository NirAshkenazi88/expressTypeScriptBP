FROM node:latest

RUN apt-get update && apt-get upgrade -yq
WORKDIR /app

COPY . .

RUN npm install -g typescript && npm install

CMD tsc && node ./build/index.js
