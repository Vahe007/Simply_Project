import { Router } from 'express'
import { validate } from '../../helpers/common'

import { getAllStatuses, createStatus, getStatusById, updateStatus, deleteStatus } from './services'

const {
  createStatusValidation,
  getStatusByIdValidation,
  updateStatusValidation,
  deleteStatusValidation,
} = validations

const router = Router()

router.get('/', getAllStatuses)
// create
router.post('/', validate(createStatusValidation), createStatus)
// read
router.get('/:id', validate(getStatusByIdValidation), getStatusById)
// update
router.put('/:id', validate(updateStatusValidation), updateStatus)
// delete
router.delete('/:id', validate(deleteStatusValidation), deleteStatus)

export { router as statusRouter }
