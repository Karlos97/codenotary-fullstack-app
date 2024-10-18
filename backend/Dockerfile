FROM node:20.9-alpine

WORKDIR /backend

COPY backend/package.json ./

RUN yarn install

COPY backend/ .

RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]
