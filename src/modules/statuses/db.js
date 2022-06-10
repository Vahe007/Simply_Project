import { prisma } from '../../services/Prisma.js'
import { itemsRoutes } from '../items/routes.js'

const { status } = prisma

export const getAllStatusesDB = async () => {
  try {
    const allStatuses = await status.findMany()
    return {
      data: allStatuses,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

// CRUD ordering below
// create
export const createStatusDB = async (sentData) => {
  try {
    const newStatus = await status.create({
      data: sentData,
    })
    return {
      data: newStatus,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

// read
export const getStatusByIdDB = async (id) => {
  try {
    const data = await status.findUnique({
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

// update
export const updateStatusDB = async (data, id) => {
  try {
    const updatedStatus = await status.update({
      where: {
        id: +id,
      },
      data,
    })

    return {
      data: updatedStatus,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
