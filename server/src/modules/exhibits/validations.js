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
            material: Joi.any(),
            isActive: Joi.boolean(),
            status: Joi.any(),
            creator: Joi.any(),
            updater: Joi.any(),
            category: Joi.any(),
            placeOfOrigin: Joi.string().required(),
            creationPeriod: Joi.string().required(),
            acquisitionPeriod: Joi.date().required(),
            width: Joi.number().integer(),
            height: Joi.number().integer(),
            length: Joi.number().integer(),
            diameter: Joi.number().integer(),
            weight: Joi.number().integer(),
            statusId: Joi.number().integer(),
            description: Joi.string().min(3).max(200),
            contributors: Joi.any(),
            material: Joi.any(),
            status: Joi.any(),
            categoryId: Joi.number().integer(),
            creator: Joi.any(),
            updater: Joi.any(),
            category: Joi.any(),
        })
    },
    updateExhibitValidation: {
        body: Joi.object({
            fundNumber: Joi.string(),
            exhibitName: Joi.string(),
            materialId: Joi.number().integer(),
            material: Joi.any(),
            status: Joi.any(),
            placeOfOrigin: Joi.string(),
            creationPeriod: Joi.string(),
            acquisitionPeriod: Joi.date(),
            width: Joi.number().integer(),
            height: Joi.number().integer(),
            isActive: Joi.boolean(),
            length: Joi.number().integer(),
            diameter: Joi.number().integer(),
            weight: Joi.number().integer(),
            statusId: Joi.number().integer(),
            categoryId: Joi.number().integer(),
            description: Joi.string().min(3).max(200)
        })
    },
    deleteExhibitValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        })
    }
}
