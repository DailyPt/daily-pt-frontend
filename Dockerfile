FROM node:18.15 as builder

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm cache clean --force
RUN npm install
RUN npm install -g expo-cli --force

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/web-build /usr/share/nginx/html

EXPOSE 80
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
CMD ["nginx",  "-g", "daemon off;"]