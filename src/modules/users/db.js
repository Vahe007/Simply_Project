import { prisma } from '../../services/Prisma.js'

const { user } = prisma

export const getAllUsersDb = async () => {
  try {
    const users = await user.findMany()
    return {
      data: users,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
export const getUserById = async (id) => {
  try {
    const users = await user.findUnique({
      where: {
        id,
      },
    })
    return {
      data: users,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createUserDb = async (sendedData) => {
  try {
    const newUser = await user.create({
      data: sendedData,
    })
    return {
      data: newUser,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}
