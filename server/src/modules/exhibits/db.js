import {prisma} from '../../services/Prisma.js'

const {exhibit} = prisma

const exhibitObj = {
    select: {
        id: true,
        fundNumber: true,
        exhibitName: true,
        placeOfOrigin: true,
        creationPeriod: true,
        acquisitionPeriod: true,
        width: true,
        height: true,
        length: true,
        diameter: true,
        weight: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        material: true,
        status: true,
        creator: {
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                phoneNumber: true,
                isActive: true,
            }
        },
        updater: {
            select: {
                id: true,
                name: true,
                surname: true,
                email: true,
                phoneNumber: true,
                isActive: true,
            }
        },
        category: true,
    },

}
export const getAllExhibitsDB = async (query) => {
    const sortHandler = {
        'A-Z': {
            fundNumber: 'asc'
        },
        'Z-A': {
            fundNumber: 'desc'
        },
        'created-new': {
            createdAt: 'desc'
        },
        'created-old': {
            createdAt: 'asc'
        },
        'updated-new': {
            updatedAt: 'desc'
        },
        'updated-old': {
            updatedAt: 'asc'
        }
    }
    const {page = 1, limit = 10, isActive = false, sortBy = {fundNumber: 'asc'}, ...rest} = query;

    let whereObject = {}

    if (isActive) {
        whereObject.isActive = true
    }
    whereObject = {...whereObject, ...rest}
    const allExhibitsObj = {...exhibitObj}
    allExhibitsObj.where = whereObject
    console.log('whereObject', whereObject)
    try {
        const allExhibits = await exhibit.findMany(allExhibitsObj)
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

export const createExhibitDB = async (userId, sentData) => {
    sentData.creatorId = userId
    try {
        const newExhibit = await exhibit.create({
            data: sentData,
        })
        return {
            data: newExhibit,
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
        const exhibitByIdObj = {...exhibitObj, where: {id: +id}}
        const data = await exhibit.findUnique(exhibitByIdObj)

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

