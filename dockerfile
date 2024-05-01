FROM node:alpine

ARG DB_URL=unknown
ENV DATABASE_URL=$DB_URL

WORKDIR /
COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9090
CMD ["node", "dist/src/index.js"]
