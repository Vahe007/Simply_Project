import { responseDataCreator } from '../../helpers/common.js'
import {
  getAllStatusesDB,
  createStatusDB,
  getStatusByIdDB,
  updateStatusDB,
  deleteStatusDB,
} from './db.js'

export const getAllStatuses = async (req, res, next) => {
    try{
        const allStatuses = await getAllStatusesDB()
        res.json(responseDataCreator(allStatuses))
    } catch(error){
        next(error)
    }
}