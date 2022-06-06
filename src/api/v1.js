import { Router } from 'express'
import { companiesRoutes } from '../modules/companies/routes.js'
import { usersRouters } from '../modules/users/routes.js'
const router = Router()

router.use('/companies', companiesRoutes)
router.use('/users', usersRouters)
export { router as v1 }
