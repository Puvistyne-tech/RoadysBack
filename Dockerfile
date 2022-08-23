FROM node:16.15

WORKDIR /api

COPY package.json /api/package.json
COPY package-lock.json /api/package-lock.json
COPY yarn.lock /api/yarn.lock

RUN yarn install

COPY . /api/
