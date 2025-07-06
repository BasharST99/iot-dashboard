# Step 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* npm-lock.yaml* ./

RUN npm install -g npm && npm install

COPY . .

RUN npm run build

# Step 2: Serve the app
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Remove the default nginx config and copy your own if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
