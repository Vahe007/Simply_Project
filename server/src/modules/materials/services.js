import { responseDataCreator } from '../../helpers/common.js';
import { getAllMaterialsDB, createMaterialDB , getMaterialByIdDB, updateMaterialDB, deleteMaterialDB } from './db.js';

export const getAllMaterials = async (req, res, next) => {
    try {
        const materials = await getAllMaterialsDB();
    
        res.json(responseDataCreator(materials));

    } catch (error) {
        next(error);
    }
}

export const createMaterial = async (req, res, next) => {
    try {   
        const material = await createMaterialDB(req.body);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}

export const getMaterialById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const material = await getMaterialByIdDB(+id);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}

export const updateMaterial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const material = await updateMaterialDB(req.body, +id);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}

export const deleteMaterial = async (req, res, next) => {
    try {
        const {id} = req.params;
        const material = await deleteMaterialDB(+id);
        res.json(responseDataCreator(material));
    } catch (error) {
        next(error);
    }
}