import Joi from 'joi'

export default {
    getExhibitByIdValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        }),
    },
    getAllExhibitsValidation: {
        query: {
            fundNumber: Joi.string(),
            exhibitName: Joi.string()
        }
    },
    createExhibitValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        }),
        body: Joi.object({
            fundNumber: Joi.string().required(),
            exhibitName: Joi.string().required(),
            materialId: Joi.number().integer(),
            placeOfOrigin: Joi.string().required(),
            creationPeriod: Joi.string().required(),
            acquisitionPeriod: Joi.date().required(),
            width: Joi.number().integer(),
            height: Joi.number().integer(),
            length: Joi.number().integer(),
            diameter: Joi.number().integer(),
            weight: Joi.number().integer(),
            statusId: Joi.number().integer().required(),
            description: Joi.string().min(3).max(200),
            contributors: Joi.any(),
            categoryId: Joi.number().integer(),
        })
    },
    updateExhibitValidation: {
        body: Joi.object({
            fundNumber: Joi.string().required(),
            exhibitName: Joi.string().required(),
            materialId: Joi.number().integer(),
            placeOfOrigin: Joi.string().required(),
            creationPeriod: Joi.string().required(),
            acquisitionPeriod: Joi.date().required(),
            width: Joi.number().integer(),
            height: Joi.number().integer(),
            isActive: Joi.boolean(),
            length: Joi.number().integer(),
            diameter: Joi.number().integer(),
            weight: Joi.number().integer(),
            statusId: Joi.number().integer().required(),
            categoryId: Joi.number().integer(),
            description: Joi.string().min(3).max(200).required()
        })
    },
    deleteExhibitValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        })
    }
}
