import { prisma } from '../../services/Prisma.js'

const { item } = prisma

export const getAllItemsDB = async () => {
  try {
    const allItems = await item.findMany()
    return {
      data: allItems,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createItemDB = async (sentData) => {
  try {
    await item.create({
      data: sentData,
    })
    return {
      data: 'user created',
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const deleteItemDB = async (id) => {
  try {
    const deletedItem = await item.delete({
      where: {
        id: +id,
      },
    })
    return {
      data: deletedItem,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const updateItemDB = async (data, id) => {
  try {
    const updatedItem = await item.update({
      where: {
        id: +id,
      },
      data,
    })

    return {
      data: updatedItem,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const getItemByIdDB = async (id) => {
  try {
    const data = await item.findUnique({
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

// export const filteredItem = async () => {

// }
