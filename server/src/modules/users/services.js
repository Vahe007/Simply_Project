import { responseDataCreator } from '../../helpers/common.js'
import {
  getAllUsersDB,
  createUserDB,
  getUserByIdDB,
  updateUserDB,
  deleteUserDB,
  loginDB,
} from './db.js'

export const getAllUsers = async ({ query, body }, res, next) => {
  try {
    const users = await getAllUsersDB(query)
    res.status(200).json(responseDataCreator(users))
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await getUserByIdDB(+id)

    res.status(200).json(responseDataCreator(user))
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserDB(req.body)
    res.status(200).json(responseDataCreator(user))
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await updateUserDB(req.body, +id)
    res.status(200).json(responseDataCreator(user))
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await deleteUserDB(+id)
    res.status(200).json(responseDataCreator(response))
  } catch (error) {
    next(error)
  }
}

export const login = async ({ body }, res, next) => {
  try {
    const user = await loginDB(body)
    res.status(200).json(responseDataCreator(user))
  } catch (error) {
    next(error)
  }
}
