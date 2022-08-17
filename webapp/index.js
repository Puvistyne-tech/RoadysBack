import { importSchema } from 'graphql-import'
import path from 'path'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import resolvers from './graphql/resolvers'
import getUser from './graphql/user/helpers'

dotenv.config()

const typeDefs = importSchema(path.resolve(__dirname, 'graphql', 'schema.graphql'));

const prisma = new PrismaClient({
  rejectOnNotFound: {
    findFirst: {
      User: (err) => new Error(`User: ${err}`),
    },
    findMany: {
      User: (err) => new Error(`Users: ${err}`),
    },
  },
  errorFormat: 'minimal',
})

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
      req,
      prisma,
      auth: await getUser(req.headers['authorization'], prisma),
    })
});

server.listen({port: process.env.API_PORT}).then(({ url }) => {
  console.log(process.env.POSTGRES_URL)
  console.log(`🚀  Server ready at ${url}`);
});

