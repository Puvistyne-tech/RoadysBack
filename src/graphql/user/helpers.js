import jwt from 'jsonwebtoken';

const getUser = async (token, prisma) => {
  const response = await jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return null;
    }
    return prisma.user.findUnique({
      where: {
        id: result.id
      },
    })
  })
  return response;
};

export default getUser;