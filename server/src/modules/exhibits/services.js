import { responseDataCreator } from '../../helpers/common.js'
import { createExhibitDB, deleteExhibitDB, getAllExhibitsDB, getExhibitByIdDB, updateExhibitDB } from './db.js'

export const getAllExhibits = async (req, res, next) => {
  try {
    const allExhibits = await getAllExhibitsDB()
    res.json(responseDataCreator(allExhibits))
  } catch (error) {
    next(error)
  }
}

export const createExhibit = async (req, res, next) => {
  try {
    const newExhibit = await createExhibitDB(req.body)
    console.log(newExhibit);
    res.json(responseDataCreator(newExhibit))
  } catch (error) {
    next(error)
  }
}

export const deleteExhibit = async (req, res, next) => {
  try {
    const deletedExhibit = await deleteExhibitDB(req.params.id)
    res.json(responseDataCreator(deletedExhibit))
  } catch (error) {
    next(error)
  }
}

export const updateExhibit = async (req, res, next) => {
  try {
    const updatedExhibit = await updateExhibitDB(req.body, req.params.id)
    res.json(responseDataCreator(updatedExhibit))
  } catch (error) {
    next(error)
  }
}

export const getExhibitById = async (req, res, next) => {
  try {
    const exhibit = await getExhibitByIdDB(req.params.id)
    res.json(responseDataCreator(exhibit))
  } catch (error) {
    next(error)
  }
}
