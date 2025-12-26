# 1️⃣ Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# 2️⃣ Production stage
FROM nginx:alpine

# 3️⃣ Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# 4️⃣ Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf


# ⬇️ copy env file BEFORE build
COPY .env.production .env.production

# 5️⃣ Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
