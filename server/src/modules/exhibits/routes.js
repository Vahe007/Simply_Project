import {Router} from 'express'
import {validate} from '../../helpers/common.js'
import {authMiddleware} from '../../middlewares/authMiddleware.js'
import {rolesMiddleware} from '../../middlewares/rolesMiddleware.js'
import {
    createExhibit,
    deleteExhibit, getActiveExhibits,
    getAllExhibits,
    getExhibitById,
    updateExhibit
} from './services.js'
import validations from './validations.js'


const {
    getExhibitByIdValidation,
    createExhibitValidation,
    updateExhibitValidation,
    deleteExhibitValidation,
} = validations;
const router = Router()

router.get('/', getAllExhibits)
router.get('/active', getActiveExhibits)
router.get('/:id', validate(getExhibitByIdValidation), getExhibitById)
router.post('/', validate(createExhibitValidation), createExhibit)
router.put('/:id', validate(updateExhibitValidation), updateExhibit)


//Only for developers
router.delete('/:id', validate(deleteExhibitValidation), deleteExhibit)
export {router as exhibitsRoutes}




// router.get('/', rolesMiddleware(['ADMIN']), getAllExhibits)
// router.get('/active', getActiveExhibits)
// router.get('/:id', validate(getExhibitByIdValidation), getExhibitById)
// router.post('/', authMiddleware, validate(createExhibitValidation), createExhibit)
// router.put('/:id', validate(updateExhibitValidation), updateExhibit)