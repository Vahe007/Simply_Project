import { prisma } from '../../services/Prisma.js'

const { image } = prisma

export const uploadFileDB = async (imageInfo) => {
  try {
    const file = await image.create({
      data: imageInfo,
    })

    return {
      data: file,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
