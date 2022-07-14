import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import { authMiddleware } from '../../middlewares/authMiddleware.js'
import { rolesMiddleware } from '../../middlewares/rolesMiddleware.js'
import {
  getAllContributors,
  createContributors,
  deleteContributor,
  getContributorById,
} from './services.js'

const router = Router()

router.get('/', getAllContributors)
router.get('/:id', getContributorById)
router.post('/', createContributors)
router.put('/:id', deleteContributor)

export { router as contributorsRouter }

// router.get('/', rolesMiddleware(['ADMIN']), getAllExhibits)
// router.get('/active', getActiveExhibits)
// router.get('/:id', validate(getExhibitByIdValidation), getExhibitById)
// router.post('/', authMiddleware, validate(createExhibitValidation), createExhibit)
// router.put('/:id', validate(updateExhibitValidation), updateExhibit)
