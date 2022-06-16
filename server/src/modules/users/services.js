import { responseDataCreator } from '../../helpers/common.js'
import { getAllUsersDB, createUserDB , getUserByIdDB, updateUserDB, deleteUserDB } from './db.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersDB(req.query);
    res.json(responseDataCreator(users))
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await getUserByIdDB(+id);
    res.json(responseDataCreator(user));
  } catch(error) {
    next(error);
  }
}

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserDB(req.body);
    res.json(responseDataCreator(user));
  } catch (error) {
    next(error);
  }
}

export const updateUser = async (req, res, next) => {
  const {id} = req.params;
  try {
    const user = await updateUserDB(req.body, +id);
    res.json(responseDataCreator(user));
  } catch (error) {
    console.log('hii')
    next(error);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await deleteUserDB(+id);
    res.json(responseDataCreator(user));
  } catch (error) {
    next(error);
  }
}


