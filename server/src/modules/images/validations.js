import Joi from 'joi'

export default {
    uploadFileSchema: {
        params: Joi.object({
            exhibitId: Joi.number().integer().required(),
        }),
    },
    getAllImagesByExhibitIdSchema: {
        params: Joi.object({
            exhibitId: Joi.number().integer().required(),
        }),
    },
    getStaticImageSchema: {
        params: Joi.object({
            exhibitId: Joi.number().integer().required(),
            imageName: Joi.string().required()
        }),
    },
    updateImageIsactiveSchema: {
        params: Joi.object({
            imageRowId: Joi.number().integer().required(),
        }),
    },
}
