import { Router } from 'express'
import { itemsRoutes } from '../modules/items/routes.js'
const router = Router()


// router.use('/user', itemsRoutes)
router.use('/items', itemsRoutes)


export { router as v1 }
