FROM node:lts

WORKDIR /app

COPY package*.json ./
# RUN npm install
RUN npm ci --only=production

# build app
COPY public/ /app/public
ADD src/ /app/src 
RUN npm run build && rm -r src && rm -r public

COPY server/. .
EXPOSE 8080

CMD [ "node", "server.js" ]