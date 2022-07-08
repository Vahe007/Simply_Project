import {responseDataCreator, createdFilename} from '../../helpers/common.js'
import {getImagesByExhibitIdlDB, updateImageIsactiveDB, uploadImageDB} from './db.js'

export const uploadImage = async (req, res, next) => {
    console.log('hiiii');
    const {exhibitId} = req.params
    try {
        const file = await uploadImageDB({
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
        const {isActive} = req.query;

        const images = await getImagesByExhibitIdlDB({exhibitId, isActive});
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
