import { prisma } from '../../services/Prisma.js'

const { material } = prisma

export const getAllMaterialsDB = async () => {
  try {
    const allMaterials = await material.findMany()
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
