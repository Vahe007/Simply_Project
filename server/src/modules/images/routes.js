import { Router } from 'express'
import { upload } from '../../helpers/common.js'

// import { validate } from '../../helpers/common.js'
import { uploadFile } from './services.js'
// import validations from './validations.js'

// const { uploadFileSchema } = validations

const router = Router()
// router.post('/', validate(uploadFileSchema), upload.single('file'), uploadFile)
router.post('/:exhibitId', upload.single('file'), uploadFile)

router.get('/:exhibitId/:imageName', (req, res) => {
  const { exhibitId, imageName } = req.params
  res.sendFile(imageName, { root: `./public/images/${exhibitId}` })
})
export { router as imagesRoutes }
