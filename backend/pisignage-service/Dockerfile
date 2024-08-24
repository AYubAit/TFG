FROM node:18-alpine
RUN apk update && apk add bash git ffmpeg imagemagick

ENV NODE_ENV=production

WORKDIR /pisignage-service

COPY ["package.json", "package-lock.json*", "./"]

#RUN rm -rf node_modues package-lock.json

RUN npm install --production

COPY . .
RUN chmod +x ./wait-for-it.sh

CMD [ "./wait-for-it.sh", "mongo-pisignage:27017", "--", "node", "server.js"]