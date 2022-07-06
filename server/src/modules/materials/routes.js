import {Router} from 'express'
import {validate} from '../../helpers/common.js'
import {createMaterial, deleteMaterial, updateMaterials, getActiveMaterials, getAllMaterials, updateMaterial} from './services.js'
import validations from './validations.js'

const router = Router()
const {
    createMaterialValidation,
    updateMaterialValidation,
    deleteMaterialValidation,
} = validations;

router.get('/', getAllMaterials)
router.get('/active', getActiveMaterials)
router.post('/', validate(createMaterialValidation), createMaterial)
router.put('/:materialId', validate(updateMaterialValidation), updateMaterial)
//Only for developers
router.delete('/:materialId', validate(deleteMaterialValidation), deleteMaterial)

export {router as materialsRoutes}