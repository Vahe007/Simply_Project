import {prisma} from '../../services/Prisma.js'

const {image} = prisma

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

export const getImagesByExhibitIdlDB = async (exhibitId, isActive = false) => {
    const whereObj = {
        itemId: +exhibitId
    }
    if (isActive) {
        whereObj.isActive = true
    }

    try {
        console.log('whereObj', whereObj)
        const images = await image.findMany({
            where: whereObj
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
                id: +exhibitId
            },
            data: {
                isActive
            }
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
