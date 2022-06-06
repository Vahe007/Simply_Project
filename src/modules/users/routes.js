import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { getAllUsers, getUserById, createUser } from './services.js'

const { getUserByIdSchema } = validations

const router = Router()

router.get('/', getAllUsers)
router.get('/:userId', validate(getUserByIdSchema), getUserById)
router.post('/', createUser)
export { router as usersRouters }
