FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8000

CMD ["./docker-compose.yml", "up", "--build"]
CMD ["prisma","generate"]
CMD ["npm","run","prisma:merge"]
CMD ["npm","run","prisma:migrate"]
CMD ["npm", "start"]
