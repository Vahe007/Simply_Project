import {responseDataCreator, createdFilename} from '../../helpers/common.js'
import {getImagesByExhibitIdlDB, updateImageIsactiveDB, uploadFileDB} from './db.js'

export const uploadFile = async (req, res, next) => {
    const {exhibitId} = req.params
    try {
        const file = await uploadFileDB({
            itemId: +exhibitId,
            name: createdFilename,
            path: `${exhibitId}/${createdFilename}`,
        })
        res.json(responseDataCreator(file))
    } catch (error) {
        next(error)
    }
}

export const getAllImagesByExhibitId = async (req, res, next) => {
    try {
        const {exhibitId} = req.params;
        const images = await getImagesByExhibitIdlDB(exhibitId);
        res.json(responseDataCreator(images));
    } catch (error) {
        next(error);
    }
}

export const getActiveImagesByExhibitId = async (req, res, next) => {
    const isActive = true
    try {
        const {exhibitId} = req.params;
        const images = await getImagesByExhibitIdlDB(exhibitId, isActive);
        res.json(responseDataCreator(images));
    } catch (error) {
        next(error);
    }
}

export const updateImage = async (req, res, next) => {
    const {imageRowId} = req.params
    const {isActive} = req.body
    try {
        const images = await updateImageIsactiveDB(imageRowId, isActive);
        res.json(responseDataCreator(images));
    } catch (error) {
        next(error);
    }
}
