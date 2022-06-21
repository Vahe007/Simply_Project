import {prisma} from "../../services/Prisma.js";

const {category} = prisma;

export const getAllcategoriesDB = async () => {
    try {
        const allCategories = await category.findMany()
        return {
            data: allCategories,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const getActiveCategoriesDB = async () => {
    try {
        const activeCategories = await category.findMany({
            where: {
                isActive: true
            }
        })
        return {
            data: activeCategories,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const createCategoryDB = async (sentData) => {
    try {
        const newCategory = await category.createMany({
            data: sentData,
        })
        return {
            data: newCategory,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const deleteCategorylDB = async (id) => {
    try {
        const deletedCategory = await category.delete({
            where: {
                id: +id,
            }
        })
        return {
            data: deletedCategory,
            error: null,
        }
    } catch (error) {
        return {
            data: null,
            error,
        }
    }
}

export const updateCategoryDB = async (data, id) => {
    try {
        const updatedCategory = await category.update({
            where: {
                id
            },
            data
        });

        return {
            data: updatedCategory,
            error: null
        }

    } catch (error) {
        return {
            data: null,
            error
        }
    }
}

