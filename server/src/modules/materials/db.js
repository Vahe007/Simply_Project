import {prisma} from "../../services/Prisma.js";
import {ERROR_MESSAGES} from "../../helpers/constants.js";

const {material} = prisma;

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

export const getActiveMaterialsDB = async () => {
    try {
        const activeMaterials = await material.findMany({
            where: {
                isActive: true
            }
        })
        return {
            data: activeMaterials,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const createMaterialDB = async (sentData) => {
    try {
        const createdMaterials = await material.createMany({
            data: sentData,
        })
        return {
            data: createdMaterials,
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
    const materialToBeDeleted = await material.findUnique({
        where: {
            id: +id
        }
    })
    if (!materialToBeDeleted) {
        return {
            data: null,
            error: {message: ERROR_MESSAGES.NOT_FOUND_RECORD}
        }
    }
    try {
        const deletedMaterial = await material.delete({
            where: {
                id: +id,
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
    const materialToBeUpdated = await material.findUnique({
        where: {
            id: +id
        }
    })
    if (!materialToBeUpdated) {
        return {
            data: null,
            error: {message: ERROR_MESSAGES.NOT_FOUND_RECORD}
        }
    }
    try {
        const updatedMaterial = await material.update({
            where: {
                id: +id
            },
            data
        });

        return {
            data: updatedMaterial,
            error: null
        }

    } catch (error) {
        return {
            data: null,
            error
        }
    }
}
