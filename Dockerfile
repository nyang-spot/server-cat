FROM node:16.4.2-alpine AS base
WORKDIR /app
COPY package-lock.json package.json ./
COPY tsconfig.json ./
RUN npm ci
COPY src src
COPY .env ./
COPY prisma prisma
RUN npm run build
RUN npx prisma generate
# RUN npx prisma push

USER node
CMD ["npm", "start"]
