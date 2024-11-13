FROM node:20 AS development
WORKDIR /development
COPY ./pnpm-lock.yaml ./apps/server/package*.json .
RUN npm install -g pnpm && pnpm install

FROM node:20 AS build
WORKDIR /build
RUN mkdir -p /build/server && npm install -g pnpm
COPY --from=development /development/node_modules/ /build/server/node_modules
COPY --from=development /development/pnpm-lock.yaml /build/server/
COPY ./apps/server/ /build/server/
WORKDIR /build/server
RUN npx prisma generate && npm run build && rm -rf node_modules && pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS production
WORKDIR /app
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz \
    && rm dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz
RUN apk add --no-cache openssl
COPY --from=build /build/server/node_modules ./node_modules
COPY --from=build /build/server/dist ./dist
RUN mkdir -p /app/prisma
COPY ./apps/server/prisma/ /app/prisma/

ENV DATABASE_URL=mysql://johndoe:randompassword@localhost:3306/mydb
ENV PORT=3000
EXPOSE 3000
ENTRYPOINT ["node", "./dist/src/main.js"]