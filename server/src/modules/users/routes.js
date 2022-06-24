import {Router} from 'express'
import {validate} from '../../helpers/common.js'

import {getAllUsers, getUserById, createUser, updateUser, deleteUser, registration, login} from './services.js'
import validations from './validations.js';


const {getUserByIdSchema, createUserSchema, updateUserByIdSchema, registerUserSchema, loginUserSchema} = validations;

const router = Router()

router.get('/', getAllUsers);
router.get('/:id', validate(getUserByIdSchema), getUserById);
router.post('/registration', validate(registerUserSchema), registration)
router.post('/login', validate(loginUserSchema), login)
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserByIdSchema), updateUser);

// Only for developers
router.delete('/:id', deleteUser);

export {router as usersRoutes}
