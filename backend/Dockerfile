FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# For development with hot-reload
CMD ["npm", "run", "dev"]

# For production would use:
# RUN npm run build
# CMD ["npm", "start"]