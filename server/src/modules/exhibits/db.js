import { prisma } from '../../services/Prisma.js'

const { exhibit } = prisma

export const getAllExhibitsDB = async () => {
  try {
    const allExhibits = await exhibit.findMany()
    return {
      data: allExhibits,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createExhibitDB = async (sentData) => {
  console.log(sentData);
  try {
    await exhibit.create({
      data: sentData,
    })
    return {
      data: 'user created',
      error: null,
    }
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error,
    }
  }
}

export const deleteExhibitDB = async (id) => {
  try {
    const deletedExhibit = await exhibit.delete({
      where: {
        id: +id,
      },
    })
    return {
      data: deletedExhibit,
      error: null,
    }
  } catch (error) {
      console.log(error);
      return {
      data: null,
      error,
    }
  }
}

export const updateExhibitDB = async (data, id) => {
  try {
    const updatedExhibit = await exhibit.update({
      where: {
        id: +id,
      },
      data,
    })

    return {
      data: updatedExhibit,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const getExhibitByIdDB = async (id) => {
  try {
    const data = await exhibit.findUnique({
      where: {
        id: +id,
      },
    })

    return {
      data,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

