FROM node:10
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build
RUN npm run server-build
EXPOSE 8888
cmd ["node", "be-dist/server.js"]