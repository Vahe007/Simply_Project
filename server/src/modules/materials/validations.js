import Joi from 'joi';

export default {
    getMaterialByIdValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        }),
    },
    createMaterialValidation: {
        body: Joi.object({
            name: Joi.string().required()
        })
    }, 
    updateMaterialValidation: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        }),
        body: Joi.object({
            name: Joi.string().required()
        })
    }, 
    deleteMaterialValidation: {
        params: Joi.object({
            id: Joi.number().integer().required()
        })
    } 
}
