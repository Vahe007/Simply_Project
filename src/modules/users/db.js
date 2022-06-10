import { prisma } from '../../services/Prisma.js'
import { getPagination } from '../../helpers/common.js';

const { user } = prisma


export const getAllUsersDB = async (query) => {
  const {page = 1, limit = 4 } = query;
  try {
    const users = await user.findMany({
      skip: (pa),
      take: +limit
    });

      return {
      data: users,
      error: null
    }
  } catch(error) {
    return {
      data: null,
      error
    }
  }
}




export const getUserByIdDB = async (id) => {
  try {
    const user = await user.findUnique({
      where: {
        id,
      },
    })
    return {
      data: user,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createUserDB = async (sendedData) => {
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
      error,


    }
  }
}

export const updateUserDB = async(data, id) => {
  try {
    const newData = await user.update({
      where: {
        id
      },
      data
    });

    return {
      data: newData,
      error: null
    }

  } catch(error) {
    return {
      data: null,
      error
    }
  }
}

export const deleteUserDB = async(id) => {
  try {
    await user.delete({
      where: {
        id
      }
    });
    return {
      data: "user successfully deleted",
      error: null
    }  
  } catch(error) {
    return {
      data: null,
      error
    }
  }
}


