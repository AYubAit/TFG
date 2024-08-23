FROM node:12.22.12
WORKDIR /app
COPY app/package*.json ./
 
RUN rm -rf node_modules package-lock.json && npm install 
COPY app/ .
EXPOSE 3000
CMD ["node", "index.js"]