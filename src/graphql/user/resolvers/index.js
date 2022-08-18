import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  Query: {
    user: (parent, { id, pseudo,  email}, { prisma }, info) => {
      console.log("USER", id)
      return prisma.user.findFirst({
        where: {
          OR: [
            {id},
            {pseudo},
            {email},
          ]
        },
      })
    },

    currentUser: (parent, args, { auth }, info) => {
      if (!auth) {
        throw new Error('You have to be authenticated !');
      }
      return auth
    },

    users: (parent, { data }, { prisma, auth }, info) => {
      let params = {
        where: { 
          AND: [
            { NOT: { latitude: null, longitude: null } },
            { NOT: { isVisibled: false } }
          ]
        }
      }
      if (!auth) {
        throw new Error('You have to be authenticated !');
      }
      if (data?.excludeCurrentUser) {
        params.where.AND.push({NOT:{id: auth.id}})
      }
      return prisma.user.findMany(params);
    },
  },
  Mutation: {
    updateUser: async (parent, { data }, { prisma, auth }, info) => {
      const {id, ...other} = data;

      if (!auth) {
        throw new Error('You have to be authenticated !');
      }
      return prisma.user.update({
        data: other,
        where: {
          id
        },
      })
    },

    updateCurrentUser: async (parent, { data }, { prisma, auth }, info) => {
      if (!auth) {
        throw new Error('You have to be authenticated !');
      }
      return prisma.user.update({
        data,
        where: {
          id: auth.id
        },
      })
    },

    deleteUser: (parent, {id}, { prisma, auth }, info) => {
      if (!auth) {
        throw new Error('You have to be authenticated !');
      }
      return prisma.user.delete({
        where: {
          id,
        },
      })
    },

    signup: async (parent, { data: { pseudo, email, password } }, { prisma }, info) => {
      const user = await prisma.user.create({
        data: {
          pseudo,
          email,
          password : await bcrypt.hash(password, 10),
        },
      })

      user.jwt = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return user;
    },

    signin: async (parent, { data: { pseudo, email, password } }, { prisma }, info) => {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {pseudo},
            {email}
          ]
        },
      })
      const user = users && users.length === 1 ? users[0] : undefined;

      if (!user) {
        throw new Error('Wrong password and email/pseudo combination');
      }
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new Error('Wrong password and email/pseudo combination');
      }

      user.jwt = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      return user;
    },
  }
}