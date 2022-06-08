import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from './services.js'

const { getCompanyByIdSchema } = validations

const router = Router()

//req.body
//req.params.id

// router.get('/', getAllCompanies)
// router.get('/:companyId', validate(getCompanyByIdSchema), getCompanyById)

router.get('/', getAllItems)
router.get('/:id', getItemById)
router.post('/', createItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)


export { router as itemsRoutes }
