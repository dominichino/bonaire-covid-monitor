FROM node:14.15.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:ssr

EXPOSE 44795

ENV PORT=44795

ENTRYPOINT [ "npm", "run", "serve:ssr" ]