# Build Stage
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY src/frontend/package*.json ./src/frontend/
RUN cd src/frontend && npm install

# Copy everything and build
COPY . .
WORKDIR /app/src/frontend
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
# Copy the build output to Nginx's HTML directory
COPY --from=build /app/src/frontend/dist /usr/share/nginx/html

# Copy custom Nginx config for React routing (optional but recommended)
# COPY src/frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
