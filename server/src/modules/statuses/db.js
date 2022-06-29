import {prisma} from '../../services/Prisma.js'
import {ERROR_MESSAGES} from "../../helpers/constants.js";

const {status} = prisma

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

export const getActiveStatusesDB = async () => {
    try {
        const activeStatuses = await status.findMany({
            where: {
                isActive: true
            }
        })
        return {
            data: activeStatuses,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const createStatusDB = async (sentData) => {
    try {
        const newStatus = await status.createMany({
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


export const updateStatusDB = async (data, id) => {
    const statusToBeUpdated = await status.findUnique({
        where: {
            id: +id
        }
    })
    if (!statusToBeUpdated) {
        return {
            data: null,
            error: {message: ERROR_MESSAGES.NOT_FOUND_RECORD}
        }
    }
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


export const deleteStatusDB = async (id) => {
    try {
        const deletedStatus = await status.delete({
            where: {
                id: +id,
            },
        })
        return {
            data: deletedStatus,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}
