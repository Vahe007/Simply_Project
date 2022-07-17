import { responseDataCreator, sendActivationKey } from '../../helpers/common.js'
import { ERROR_MESSAGES } from '../../helpers/constants.js'
import {
  getAllUsersDB,
  createUserDB,
  getUserByIdDB,
  updateUserDB,
  deleteUserDB,
  loginDB,
  sendKeyDB,
  verifyUserDB,
  resetPasswordDB
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



export const sendKey = async (req, res, next) => {
  const { email } = req.body;

  try {
    const data = await sendKeyDB(email);

    if (data.data) {
      sendActivationKey(email, data.data.link);
    }
    res.status(200).json(responseDataCreator(data));
  }
  catch (error) {
    next(error);
  }
}


export const verifyUser = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    const data = await verifyUserDB(+id, token);
    res.status(200).json(responseDataCreator(data));

  }
  catch (error) {
    next(error);
  }
}


export const resetPassword = async (req, res, next) => {
  const { newPass, token } = req.body;
  const { id } = req.params;
  try {
    const data = await resetPasswordDB(newPass, token, +id);
    res.status(200).json(responseDataCreator(data));
  }
  catch (error) {
    next(error);
  }
} 
