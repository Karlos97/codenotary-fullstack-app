FROM node:20.9.0-alpine

WORKDIR /frontend

COPY frontend/package.json frontend/yarn.lock ./

RUN yarn install

COPY frontend/ .

RUN yarn build

EXPOSE 4173
# in case nginx was needed, use steveltn container
CMD ["yarn", "start"]