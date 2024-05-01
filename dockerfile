FROM node:alpine

ARG DB_URL=unknown
ENV DATABASE_URL=$DB_URL
ARG AT_S=unknown
ENV ACCESS_TOKEN_SECRET=$AT_S
ARG RT_S=unknown
ENV REFRESH_TOKEN_SECRET=$RT_S
ARG E_T=unknown
ENV ENCRYPTION_TOKENL=$E_T

WORKDIR /
COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build
EXPOSE 9090
CMD ["node", "dist/src/index.js"]
