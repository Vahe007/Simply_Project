import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from './services.js'
import validations from './validations.js'

const {getItemByIdValidation, createItemValidation, updateItemValidation, deleteItemValidation} = validations;
const router = Router()

router.get('/', getAllItems)
router.get('/:id', validate(getItemByIdValidation), getItemById)
router.post('/', validate(createItemValidation), createItem)
router.put('/:id', validate(updateItemValidation), updateItem)
router.delete('/:id', validate(deleteItemValidation), deleteItem)
export { router as itemsRoutes }