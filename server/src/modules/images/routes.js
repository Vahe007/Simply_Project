import express, { Router } from 'express'
// import { upload, validate } from '../../helpers/common.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
// import { uploadFile } from './services.js'
// import validations from './validations.js'

// const { uploadFileSchema } = validations

const router = Router()
// router.post('/', validate(uploadFileSchema), upload.single('file'), uploadFile)
// router.post('/', upload.single('file'), uploadFile)
router.use('/', express.static(path.join(__dirname, 'public/images')))

export { router as imagesRoutes }
