FROM registry.access.redhat.com/ubi9/nodejs-20:latest AS builder
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM registry.access.redhat.com/ubi9/nginx-124:latest
COPY --from=builder /opt/app-root/src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
