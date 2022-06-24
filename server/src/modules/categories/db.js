import {prisma} from "../../services/Prisma.js";
import {ERROR_MESSAGES} from "../../helpers/constants.js";

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
    const categoryToBeDeleted = await category.findUnique({
        where: {
            id: +id
        }
    })
    if (!categoryToBeDeleted) {
        return {
            data: null,
            error: {message: ERROR_MESSAGES.NOT_FOUND_RECORD}
        }
    }
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
    const categoryToBeUpdated = await category.findUnique({
        where: {
            id: +id
        }
    })
    if (!categoryToBeUpdated) {
        return {
            data: null,
            error: {message: ERROR_MESSAGES.NOT_FOUND_RECORD}
        }
    }
    try {
        const updatedCategory = await category.update({
            where: {
                id: +id
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

