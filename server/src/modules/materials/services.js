import {responseDataCreator} from '../../helpers/common.js';
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
    try {
        const materials = await createMaterialDB(req.body);
        res.json(responseDataCreator(materials));
    } catch (error) {
        next(error);
    }
}

export const updateMaterial = async (req, res, next) => {
    try {
        const {materialId} = req.params;
        const material = await updateMaterialDB(req.body, +materialId);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}

export const deleteMaterial = async (req, res, next) => {
    try {
        const { materialId } = req.params;
        const material = await deleteMaterialDB(+materialId);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}

export const updateMaterials = async (req, res, next) => {
    const { materialIds } = req.params;
    console.log(req.params);
    const {isActive} = req.body;
    const materialIdsArr = materialIds.split(',').map(id => +id);
    console.log(materialIdsArr);
    try {
        const material = await updateManyMaterialsDB({
            ids: materialIdsArr,
            isActive
        });
        res.json(responseDataCreator(material));
    } catch(error) {
        next(error)
    }
}