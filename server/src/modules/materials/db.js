import {prisma} from "../../services/Prisma.js";
import {ERROR_MESSAGES} from "../../helpers/constants.js";

const {material} = prisma;

export const getAllMaterialsDB = async () => {
    try {
        const allMaterials = await material.findMany({
            include: {
                exhibit: true
            }
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

export const createMaterialDB = async (data) => {
    try {
        const newMaterials = await material.createMany({
            data: data.map(value => ({materialName: value}))
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
    console.log(data)
    try {
        const updatedMaterial = await material.update({
            where: {
                id
            },
            data
        });

        return {
            data: updatedMaterial,
            error: null
        }

    } catch (error) {
        console.log('eddvervferwwerwef');
        return {
            data: null,
            error
        }
    }
}


