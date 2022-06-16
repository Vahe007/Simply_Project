import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import { getAllStatuses, createStatus, getStatusById, updateStatus, deleteStatus } from './services.js'
import validations from './validations.js'
const {
  createStatusValidation,
  getStatusByIdValidation,
  updateStatusValidation,
  deleteStatusValidation,
} = validations

const router = Router()

router.get('/', getAllStatuses)
router.post('/', validate(createStatusValidation), createStatus)
router.get('/:id', validate(getStatusByIdValidation), getStatusById)
router.put('/:id', validate(updateStatusValidation), updateStatus)
router.delete('/:id', validate(deleteStatusValidation), deleteStatus)

export { router as statusRoutes }
