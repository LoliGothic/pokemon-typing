FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD npm run build

FROM nginx:1.19-alpine
COPY --from=0 /app/build /usr/share/nginx/html
