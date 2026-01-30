FROM node:18
WORKDIR /backend

COPY package*.json .
RUN npm install
COPY . .
# RUN sudo npm install -g pm2

CMD ["node","server.js"]

EXPOSE 4000