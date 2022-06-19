import { Router } from 'express'
import { validate } from '../../helpers/common.js'

import { createExhibit, deleteExhibit, getAllExhibits, getExhibitById, updateExhibit } from './services.js'
import validations from './validations.js'

const {getExhibitByIdValidation, createExhibitValidation, updateExhibitValidation, deleteExhibitValidation} = validations;
const router = Router()

router.get('/', getAllExhibits)
router.get('/:id', validate(getExhibitByIdValidation), getExhibitById)
router.post('/', validate(createExhibitValidation), createExhibit)
router.put('/:id', validate(updateExhibitValidation), updateExhibit)
router.delete('/:id', validate(deleteExhibitValidation), deleteExhibit)
export { router as exhibitsRoutes }

