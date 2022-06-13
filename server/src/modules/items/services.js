import { responseDataCreator } from '../../helpers/common.js'
import { createItemDB, deleteItemDB, getAllItemsDB, getItemByIdDB, updateItemDB } from './db.js'

export const getAllItems = async (req, res, next) => {
  try {
    const allItems = await getAllItemsDB()
    res.json(responseDataCreator(allItems))
  } catch (error) {
    next(error)
  }
}

export const createItem = async (req, res, next) => {
  try {
    const newItem = await createItemDB(req.body)
    res.json(responseDataCreator(newItem))
  } catch (error) {
    next(error)
  }
}

export const deleteItem = async (req, res, next) => {
  try {
    const deletedItem = await deleteItemDB(req.params.id)
    res.json(responseDataCreator(deletedItem))
  } catch (error) {
    next(error)
  }
}

export const updateItem = async (req, res, next) => {
  try {
    const updatedItem = await updateItemDB(req.body, req.params.id)
    res.json(responseDataCreator(updatedItem))
  } catch (error) {
    next(error)
  }
}

export const getItemById = async (req, res, next) => {
  try {
    const item = await getItemByIdDB(req.params.id)
    res.json(responseDataCreator(item))
  } catch (error) {
    next(error)
  }
}
