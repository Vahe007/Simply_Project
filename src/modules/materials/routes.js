import { Router } from "express";
import { validate } from "../../helpers/common.js";
import { getAllMaterialsDB, createMaterialDB, deleteMaterialDB, getMaterialByIdDB, updateMaterialDB } from "./db.js";
import validations from './validations.js';

const router = Router();
const { getMaterialByIdValidation }  = validations;

// , createMaterialValidation, updateMaterialValidation, deleteMaterialValidation 

router.get('/', getAllMaterialsDB);
router.get('/:id', validate(getMaterialByIdValidation), getMaterialByIdDB);
// router.post('/', validate(createMaterialValidation), createMaterialDB);
// router.put('/:id', validate(updateMaterialValidation), updateMaterialDB);
router.delete('/:id', deleteMaterialDB);


export { router as materialsRoutes }

