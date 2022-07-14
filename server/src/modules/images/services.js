import { responseDataCreator } from '../../helpers/common.js'
import { badRequestErrorCreator } from '../../helpers/errors.js'
import {
  getImagesByExhibitIdlDB,
  updateImageIsactiveDB,
  uploadImageDB,
  getAllImagesDB,
} from './db.js'
import path from 'path'

export const getAllImages = async (req, res, next) => {
  try {
    const allImages = await getAllImagesDB()
    res.json(responseDataCreator(allImages))
  } catch (error) {
    next(error)
  }
}

export const uploadImage = async (req, res, next) => {
  const { exhibitId } = req.params
  const { files } = req
  console.log(files)
  const baseUrl = 'http://localhost:5000/api/v1/'
  const data = files.map((file) => {
    return {
      name: file.filename,
      path: file.path.replace('public', `${baseUrl}`).replace(/\\/g, '/'),
    }
  })
  try {
    const file = await uploadImageDB(data)
    res.json(responseDataCreator(file))
  } catch (error) {
    next(error)
  }
}

export const getAllImagesByExhibitId = async (req, res, next) => {
  try {
    const { exhibitId } = req.params
    const { isActive } = req.query

    const images = await getImagesByExhibitIdlDB({ exhibitId, isActive })
    res.json(responseDataCreator(images))
  } catch (error) {
    next(error)
  }
}

export const getActiveImagesByExhibitId = async (req, res, next) => {
  const isActive = true
  try {
    const { exhibitId } = req.params
    const images = await getImagesByExhibitIdlDB(exhibitId, isActive)
    res.json(responseDataCreator(images))
  } catch (error) {
    next(error)
  }
}

export const updateImage = async (req, res, next) => {
  const { imageRowId } = req.params
  const { isActive } = req.body
  try {
    const images = await updateImageIsactiveDB(imageRowId, isActive)
    res.json(responseDataCreator(images))
  } catch (error) {
    next(error)
  }
}
