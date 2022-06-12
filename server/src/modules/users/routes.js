import { Router } from 'express'
import { validate } from '../../helpers/common.js'

import { getAllUsers, getUserById, createUser, updateUser, deleteUser, registration, login } from './services.js'
import validations from './validations.js';


const { getUserByIdSchema, createUserSchema } = validations;

const router = Router()

router.get('/', getAllUsers);
router.get('/:id', validate(getUserByIdSchema), getUserById);

router.post('/', validate(createUserSchema), createUser);
router.post('/registration', registration)
router.post('/login', login)
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export { router as usersRoutes }
