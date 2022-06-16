import express, { Router } from 'express'
import path from 'path'
import { __dirname } from '../../app.js'

// import { upload, validate } from '../../helpers/common.js'
// import { uploadFile } from './services.js'
// import validations from './validations.js'

// const { uploadFileSchema } = validations

const router = Router()
// router.post('/', validate(uploadFileSchema), upload.single('file'), uploadFile)
// router.post(
//   '/',
//   upload.single('file'),
//   (req, res, next) => {
//     console.log('Testing next')
//     next()
//   },
//   uploadFile
// )
router.use('/', express.static(path.join(__dirname, 'public/images')))

export { router as imagesRoutes }
