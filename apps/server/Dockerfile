FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npx prisma generate && npm run build && rm -rf node_modules && npm install --production && npm cache clean --force

FROM node:20-slim
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV DATABASE_URL=mysql://johndoe:randompassword@localhost:3306/mydb
EXPOSE 3000
ENTRYPOINT ["node", "./dist/src/main.js"]