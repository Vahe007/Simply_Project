import { Router } from 'express'
const router = Router()
import { itemsRoutes } from '../modules/items/routes.js'

import { usersRoutes } from '../modules/users/routes.js'




// router.use('/user', itemsRoutes)

router.use('/items', itemsRoutes);
router.use('/users', usersRoutes);


export { router as v1 }
