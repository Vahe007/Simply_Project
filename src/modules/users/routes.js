import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import validations from './validations.js'
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from './services.js'

const { getUserByIdSchema } = validations

const router = Router()

router.get('/', getAllUsers);
router.get('/:id', validate(getUserByIdSchema), getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as usersRoutes }
