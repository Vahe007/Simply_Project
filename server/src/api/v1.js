import { Router } from 'express'
import { exhibitsRoutes } from '../modules/exhibits/routes.js'
import { usersRoutes } from '../modules/users/routes.js'
import { materialsRoutes } from '../modules/materials/routes.js'


const router = Router()

router.use('/exhibits', exhibitsRoutes)
router.use('/users', usersRoutes)
router.use('/statuses', statusRoutes)
router.use('/materials', materialsRoutes)


export { router as v1 }
