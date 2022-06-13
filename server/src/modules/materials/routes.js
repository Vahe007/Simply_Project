import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import { getAllMaterials, createMaterial, deleteMaterial, getMaterialById, updateMaterial } from './services.js'
import validations from './validations.js'

const router = Router()
const { getMaterialByIdValidation, createMaterialValidation, updateMaterialValidation, deleteMaterialValidation }  = validations;



router.get('/', getAllMaterials)
router.get('/:id', validate(getMaterialByIdValidation), getMaterialById)
router.post('/', validate(createMaterialValidation), createMaterial)
router.put('/:id', validate(updateMaterialValidation), updateMaterial)
router.delete('/:id', validate(deleteMaterialValidation), deleteMaterial)

export { router as materialsRoutes }