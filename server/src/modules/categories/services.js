import {responseDataCreator} from '../../helpers/common.js';
import {
    createCategoryDB,
    deleteCategorylDB,
    getAllcategoriesDB,
    getActiveCategoriesDB,
    updateCategoryDB
} from './db.js';

export const getAllCategories = async (req, res, next) => {
    try {
        const categories = await getAllcategoriesDB();

        res.json(responseDataCreator(categories));

    } catch (error) {
        next(error);
    }
}

export const getActiveCategories = async (req, res, next) => {
    try {
        const activeCategories = await getActiveCategoriesDB();

        res.json(responseDataCreator(activeCategories));

    } catch (error) {
        next(error);
    }
}

export const createCategory = async (req, res, next) => {
    try {
        const category = await createCategoryDB(req.body.data);
        res.json(responseDataCreator(category));
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async (req, res, next) => {
    try {
        const {categoryId} = req.params;
        const category = await updateCategoryDB(req.body, +categoryId);
        res.json(responseDataCreator(category));
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const {categoryId} = req.params;
        const category = await deleteCategorylDB(+categoryId);
        res.json(responseDataCreator(category));
    } catch (error) {
        next(error);
    }
}