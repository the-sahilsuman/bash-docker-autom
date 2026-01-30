FROM node:18 AS build
WORKDIR /frontend

COPY package*.json .
RUN npm install 

COPY . .
RUN npm run build
# RUN apt apdate && apt upgrade

FROM nginx:alpine AS serving
# RUN rm /usr/share/nginx/html/*
COPY --from=build /frontend/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# RUN npm install -g serve
# CMD ["serve","-s","dist"]
# EXPOSE 3000