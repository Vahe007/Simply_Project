import {Router} from 'express'
import {validate} from '../../helpers/common.js'
import {createCategory, deleteCategory, getAllCategories, getActiveCategories, updateCategory} from './services.js'
import validations from './validations.js'

const router = Router()
const {createCategorySchema, updateCategorySchema, deleteCategorySchema} = validations;


router.get('/', getAllCategories)
router.get('/active', getActiveCategories)
router.post('/', validate(createCategorySchema), createCategory)
router.put('/:categoryId', validate(updateCategorySchema), updateCategory)

//Only for developers
router.delete('/:categoryId', validate(deleteCategorySchema), deleteCategory)

export {router as categoriesRoutes}