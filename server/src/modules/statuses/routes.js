import {Router} from 'express'
import {validate} from '../../helpers/common.js'
import {createStatus, deleteStatus, getActiveStatuses, getAllStatuses, updateStatus} from './services.js'
import validations from './validations.js'

const {
    createStatusValidation,
    updateStatusValidation,
    deleteStatusValidation,
} = validations

const router = Router()

router.get('/', getAllStatuses)
router.get('/active', getActiveStatuses)
router.post('/', validate(createStatusValidation), createStatus)
router.put('/:statusId', validate(updateStatusValidation), updateStatus)

//Only for developers
router.delete('/:statusId', validate(deleteStatusValidation), deleteStatus)

export {router as statusRoutes}
