import { prisma } from '../../services/Prisma.js'
import { ERROR_MESSAGES } from '../../helpers/constants.js'

const { material } = prisma

export const getAllMaterialsDB = async (query) => {
  if (query.isActive === 'true') {
    query.isActive = true
  } else if (query.isActive === 'false') {
    query.isActive = false
  } else {
    query.isActive = undefined
  }

  try {
    const allMaterials = await material.findMany({
      include: {
        exhibit: true,
      },
      where: {
        isActive: query.isActive,
      },
    })
    return {
      data: allMaterials,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const createMaterialDB = async (data) => {
  try {
    const newMaterials = await material.createMany({
      data: data.map((value) => ({ materialName: value })),
    })
    return {
      data: newMaterials,
      error: null,
    }
  } catch (error) {
   
    return {
      data: null,
      error,
    }
  }
}

export const deleteMaterialDB = async (id) => {
  try {
    const deletedMaterial = await material.delete({
      where: {
        id,
      },
    })
    return {
      data: deletedMaterial,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const updateMaterialDB = async (data, id) => {
  console.log(data)
  try {
    const updatedMaterial = await material.update({
      where: {
        id,
      },
      data,
    })

    return {
      data: updatedMaterial,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
