import Joi from 'joi'

export default {
    getContributorByIdValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        })
    },

    //many
    createExhibitValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        }),
        body: Joi.object({
            
        })
    },

    deleteExhibitValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        })
    }
}
