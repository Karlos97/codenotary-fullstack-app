FROM node:20.9-alpine

WORKDIR /backend

COPY backend/package.json backend/yarn.lock ./

RUN yarn install

COPY backend/ .

RUN yarn build
EXPOSE 3000

CMD ["yarn", "start"]
