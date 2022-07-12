import {
  getAllContributorsDB,
  createContributorsDB,
  deleteContributorDB,
  getContributorByIdDB,
} from '../contributors/db.js'
import { responseDataCreator } from '../../helpers/common.js'

export const getAllContributors = async (req, res, next) => {
  try {
    const allContributors = await getAllContributorsDB()
    res.json(responseDataCreator(allContributors))
  } catch (error) {
    next(error)
  }
}

export const getContributorById = async (req, res, next) => {
  try {
    const allContributors = await getContributorByIdDB(+req.params.id)
    res.json(responseDataCreator(allContributors))
  } catch (error) {
    next(error)
  }
}

export const createContributors = async (req, res, next) => {
  try {
    const newContributors = await createContributorsDB(req.body)
    res.json(responseDataCreator(newContributors))
  } catch (error) {
    next(error)
  }
}

export const deleteContributor = async (req, res, next) => {
  try {
    const deletedContributor = await deleteContributorDB(+req.params.id)
    res.json(responseDataCreator(deletedContributor))
  } catch (error) {
    next(error)
  }
}
