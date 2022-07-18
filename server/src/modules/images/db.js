import { prisma } from '../../services/Prisma.js'

const { image } = prisma
export const getAllImagesDB = async () => {
  try {
    const data = await image.findMany()
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
export const uploadImageDB = async (data) => {
  const imagePath = data.path
  try {
    const file = await image.create({
      data,
    })

    return {
      imageInfo: file,
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

export const getImagesByExhibitIdlDB = async ({ exhibitId, isActive }) => {
  const whereObj = {
    exhibitId: +exhibitId,
  }

  if (isActive === 'true') {
    whereObj.isActive = true
  } else if (isActive === 'false') {
    whereObj.isActive = false
  } else {
    whereObj.isActive = undefined
  }

  try {
    const images = await image.findMany({
      where: whereObj,
    })

    return {
      data: images,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const updateImageIsactiveDB = async (exhibitId, isActive) => {
  try {
    const updatedImage = await image.update({
      where: {
        id: +exhibitId,
      },
      data: {
        isActive,
      },
    })

    return {
      data: updatedImage,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}
