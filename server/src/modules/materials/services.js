import {areItemsUniqueByFieldname, responseDataCreator} from '../../helpers/common.js';
import {createMaterialDB, deleteMaterialDB, getActiveMaterialsDB, getAllMaterialsDB, updateMaterialDB} from './db.js';
import {ERROR_MESSAGES} from "../../helpers/constants.js";

export const getAllMaterials = async (req, res, next) => {
    try {
        const materials = await getAllMaterialsDB();
        res.json(responseDataCreator(materials));
    } catch (error) {
        next(error);
    }
}
export const getActiveMaterials = async (req, res, next) => {
    try {
        const materials = await getActiveMaterialsDB();
        res.json(responseDataCreator(materials));

    } catch (error) {
        next(error);
    }
}

export const createMaterial = async (req, res, next) => {
    const arrayOfMaterials = req.body.data
    const materialNamesAreUnique = areItemsUniqueByFieldname(arrayOfMaterials, 'materialName')
    if (!materialNamesAreUnique) {
        next({status: 403, message: ERROR_MESSAGES.ITEMS_ARE_NOT_UNIQUE})
    }
    try {
        const materials = await createMaterialDB(arrayOfMaterials);
        res.json(responseDataCreator(materials));
    } catch (error) {
        next(error);
    }
}

export const updateMaterial = async (req, res, next) => {
    try {
        const {materialId} = req.params;
        const material = await updateMaterialDB(req.body, materialId);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}

export const deleteMaterial = async (req, res, next) => {
    try {
        const {materialId} = req.params;
        const material = await deleteMaterialDB(materialId);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}