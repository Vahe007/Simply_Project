import {Router} from 'express'
import {exhibitsRoutes} from '../modules/exhibits/routes.js'
import {usersRoutes} from '../modules/users/routes.js'
import {materialsRoutes} from '../modules/materials/routes.js'
import {imagesRoutes} from '../modules/images/routes.js'
import {statusRoutes} from '../modules/statuses/routes.js'
import {categoriesRoutes} from '../modules/categories/routes.js'

const router = Router()

router.use('/exhibits', exhibitsRoutes)
router.use('/users', usersRoutes)
router.use('/statuses', statusRoutes)
router.use('/materials', materialsRoutes)
router.use('/images', imagesRoutes)
router.use('/categories', categoriesRoutes)

export {router as v1}
