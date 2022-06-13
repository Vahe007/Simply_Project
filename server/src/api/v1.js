import { Router } from 'express'

const router = Router()
import { itemsRoutes } from '../modules/items/routes.js'
import { usersRoutes } from '../modules/users/routes.js'
import { materialsRoutes } from '../modules/materials/routes.js'

router.use('/items', itemsRoutes)
router.use('/users', usersRoutes)
router.use('/materials', materialsRoutes)

export { router as v1 }
