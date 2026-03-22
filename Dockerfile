# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN sed -i 's|dev_environment|prod_environment|g' src/environments/index.ts
RUN npm install -g @angular/cli && npm run build --prod

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/cv_fe /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
