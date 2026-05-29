FROM node:22 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM base AS dev

EXPOSE 3000

CMD ["npm", "run", "dev"]

FROM node:22 AS prod

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]