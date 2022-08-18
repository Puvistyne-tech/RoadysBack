FROM node:16.15.0

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 8000
EXPOSE 8080

PORT 8000

CMD ["docker","compose", "up", "--build"]
CMD ["npm","run","prisma:merge"]
CMD ["npm","run","prisma:generate"]
CMD ["npm","run","prisma:migrate"]
CMD ["npm","run","prisma:generate"]
CMD ["npm", "start"]
