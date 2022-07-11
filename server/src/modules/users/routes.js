import {Router} from 'express'
import {validate} from '../../helpers/common.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getMeMiddleWare } from '../../middlewares/getMeMiddleware.js';
import {getAllUsers, getUserById, createUser, updateUser, deleteUser, login, getActiveUsers} from './services.js'
import validations from './validations.js';


const {getUserByIdSchema, createUserSchema, updateUserByIdSchema, loginUserSchema} = validations;

const router = Router()

router.get('/', getAllUsers);
router.get('/active', getActiveUsers);
router.get('/:id', validate(getUserByIdSchema), authMiddleware, getUserById);
router.post('/registration', validate(createUserSchema), createUser)
router.post('/login', validate(loginUserSchema), login)
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserByIdSchema), updateUser);


//get me call
router.get('/token/:id', validate(getUserByIdSchema), getMeMiddleWare, getUserById);

// Only for developers
router.delete('/:id', deleteUser);

export {router as usersRoutes}
