import { prisma } from '../../services/Prisma.js'

const { image } = prisma

export const uploadImageDB = async (data) => {
  const imagePaths = data.map((z) => z.path)
  try {
    const files = await image.createMany({
      data,
      
    })
    console.log(files)
    return {
      data: files,
      imagePaths,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error,
    }
  }
}

export const getImagesByExhibitIdlDB = async ({ exhibitId, isActive }) => {
  const whereObj = {
    itemId: +exhibitId,
  }

  if (isActive === 'true') {
    whereObj.isActive = true
  } else if (isActive === 'false') {
    whereObj.isActive = false
  } else {
    whereObj.isActive = undefined
  }

  try {
    console.log('whereObj', whereObj)
    const images = await image.findMany({
      where: whereObj,
    })
    console.log(images)

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
