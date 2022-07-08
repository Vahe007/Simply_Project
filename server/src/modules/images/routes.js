import {Router} from 'express'
import { upload} from '../../helpers/common.js'

import {validate} from '../../helpers/common.js'
import {uploadImage, getAllImagesByExhibitId, getActiveImagesByExhibitId, updateImage} from './services.js'
import validations from './validations.js'
import {authMiddleware} from "../../middlewares/authMiddleware.js";
import {rolesMiddleware} from "../../middlewares/rolesMiddleware.js";

const {uploadImageSchema, getAllImagesByExhibitIdSchema, updateImageIsactiveSchema, getStaticImageSchema} = validations

const router = Router();

router.get('/active/:exhibitId', validate(getAllImagesByExhibitIdSchema), getActiveImagesByExhibitId)
router.get('/:exhibitId', validate(getAllImagesByExhibitIdSchema), getAllImagesByExhibitId)
router.post('/:exhibitId', validate(uploadImageSchema), uploadImage)
router.put('/:imageRowId', validate(updateImageIsactiveSchema), updateImage)
router.get('/:exhibitId/:imageName', validate(getStaticImageSchema), (req, res) => {
    const {exhibitId, imageName} = req.params
    res.sendFile(imageName, {root: `./public/images/${exhibitId}`})
})


// router.get('/active/:exhibitId', validate(getAllImagesByExhibitIdSchema), authMiddleware, getActiveImagesByExhibitId)
// router.get('/:exhibitId', validate(getAllImagesByExhibitIdSchema), rolesMiddleware(['ADMIN']), getAllImagesByExhibitId)
// router.post('/:exhibitId', authMiddleware, validate(uploadFileSchema), upload.single('file'), uploadFile)
// router.put('/:imageRowId', validate(updateImageIsactiveSchema), authMiddleware, updateImage)
// router.get('/:exhibitId/:imageName', validate(getStaticImageSchema), (req, res) => {
//     const {exhibitId, imageName} = req.params
//     res.sendFile(imageName, {root: `./public/images/${exhibitId}`})
// })
export {router as imagesRoutes}
