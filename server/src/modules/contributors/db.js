import {prisma} from '../../services/Prisma.js'

const {contributor} = prisma;

export const getAllContributorsDB = async () => {
    try {
        const contributors = await contributor.findMany({
            include: {
                exhibits: true
            }
        })
        return {
            data: contributors,
            error: null
        }
    }
    catch(error) {
        return {
            data: null,
            error,
        }
    }
}

export const getContributorByIdDB = async (id) => {
    try {
        const foundContributor = await contributor.findUnique({
            where: {
                id
            }
        })
        return {
            data: foundContributor,
            error: null
        }
    }
    catch(error) {
        return {
            data: null,
            error
        }
    }
}

export const createContributorsDB = async (sentData) => {
    try {
        const contributors = await contributor.createMany({
            data: sentData
        })
        return {
            data: contributors,
            error: null
        }
    }
    catch(error) {
        return {
            data: null,
            error
        }
    }
}

export const updateContributorsDB = async (data) => {
    try {
        const updatedContributors = await contributor.updateMany({
            data: {
                
            }
        })
    }
    catch(error) {
        return {
            data: null,
            error
        }
    }
}

export const deleteContributorDB = async (id) => {
    try {
        const deletedContributors = await contributor.delete({
            where: {
                id 
            }
        })
        return {
            data: deletedContributors,
            error: null
        }
    }
    catch(error) {
        return {
            data: null,
            error
        }
    }
}
