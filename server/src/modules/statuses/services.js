import {responseDataCreator} from '../../helpers/common.js'
import {createStatusDB, deleteStatusDB, getActiveStatusesDB, getAllStatusesDB, updateStatusDB,} from './db.js'
import {ERROR_MESSAGES} from "../../helpers/constants.js";

export const getAllStatuses = async (req, res, next) => {
    try {
        const allStatuses = await getAllStatusesDB()
        res.json(responseDataCreator(allStatuses))
    } catch (error) {
        next(error)
    }
}

export const getActiveStatuses = async (req, res, next) => {
    try {
        const activeStatuses = await getActiveStatusesDB()
        res.json(responseDataCreator(activeStatuses))
    } catch (error) {
        next(error)
    }
}

export const createStatus = async (req, res, next) => {
    const arrayOfStatuses = req.body.data
    try {
        const newStatuses = await createStatusDB(arrayOfStatuses)
        res.json(responseDataCreator(newStatuses))
    } catch (error) {
        next(error)
    }
}

export const updateStatus = async (req, res, next) => {
    const {statusId} = req.params
    try {
        const updatedStatus = await updateStatusDB(req.body, statusId)
        res.json(responseDataCreator(updatedStatus))
    } catch (error) {
        next(error)
    }
}

export const deleteStatus = async (req, res, next) => {
    const {statusId} = req.params
    try {
        const deletedStatus = await deleteStatusDB(statusId)
        res.json(responseDataCreator(deletedStatus))
    } catch (error) {
        next(error)
    }
}
