FROM node:lts

WORKDIR /app

COPY package*.json ./
RUN npm install
# RUN npm ci --only=production

COPY server/. .
EXPOSE 8080

CMD [ "node", "server.js" ]