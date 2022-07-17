import {Router} from 'express'
import {validate} from '../../helpers/common.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getMeMiddleWare } from '../../middlewares/getMeMiddleware.js';
import { sendKeyDB } from './db.js';
import {getAllUsers, getUserById, createUser, updateUser, deleteUser, login, verifyUser, resetPassword, sendKey } from './services.js'
import validations from './validations.js';


const {getUserByIdSchema, createUserSchema, updateUserByIdSchema, loginUserSchema} = validations;

const router = Router()

router.get('/', getAllUsers);
router.get('/:id', validate(getUserByIdSchema), getUserById);
router.post('/registration', validate(createUserSchema), createUser)
router.post('/login', validate(loginUserSchema), login)
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(updateUserByIdSchema), updateUser);

router.post('/sendKey', sendKey);
router.get('/verify/:id/:token', verifyUser);
router.put('/reset/:id', resetPassword);

//get me call
router.get('/token/:id', validate(getUserByIdSchema), getMeMiddleWare, getUserById);

// Only for developers
router.delete('/:id', deleteUser);

export {router as usersRoutes}
