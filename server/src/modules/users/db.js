import { prisma } from '../../services/Prisma.js'

const { user } = prisma


export const getAllUsersDB = async (query) => {
  const sortHandler = {
    'name [A-Z]': {
      name: 'asc'
    } ,
    'name [Z-A]': {
      name: 'desc'
    },
    'created date (new to old)': {
      createdAt: 'desc'
    } ,
    'created date (old to new)': {
      createdAt: 'asc'
    },
    'updated date (new to old)': {
      updatedAt: 'desc'
    },
    'updated date (old to new)': {
      updatedAt: 'asc'
    }
  }
  const {page = 1, limit = 10, sortBy = "name"} = query;
  try {
    const count = await user.count()
    const users = await user.findMany({
      skip: (+page - 1) * +limit,
      take: +limit,
      orderBy: sortHandler[sortBy],
      include: {
        exhibitsCreated: true,
        exhibitsUpdated: true
      }
    });

    return {
      users,
      count,
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


