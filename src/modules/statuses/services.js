import { responseDataCreator } from '../../helpers/common.js'
import {
  getAllStatusesDB,
  createStatusDB,
  getStatusByIdDB,
  updateStatusDB,
  deleteStatusDB,
} from './db.js'

export const getAllStatuses = async (req, res, next) => {
  try {
    const allStatuses = await getAllStatusesDB()
    res.json(responseDataCreator(allStatuses))
  } catch (error) {
    next(error)
  }
}

// CRUD ordering
// create
export const createStatus = async (req, res, next) => {
  try {
    const newStatus = await createStatusDB(req.body)
    res.json(responseDataCreator(newStatus))
  } catch (error) {
    next(error)
  }
}

// read
export const getStatusById = async (req, res, next) => {
  try {
    const status = await getStatusByIdDB(req.params.id)

    res.json(responseDataCreator(status))
  } catch (error) {
    next(error)
  }
}
