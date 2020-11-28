FROM node:14.15.1

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:ssr

RUN rm -rf .npmrc

EXPOSE 44795

ENV PORT=44795

ENTRYPOINT [ "npm", "run", "serve:ssr" ]