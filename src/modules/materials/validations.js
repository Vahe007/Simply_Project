import Joi from 'joi';

export default {
    getMaterialByIdValidation: {
        params: Joi.object({
            id: Joi.number().integer()
        }),
    },
    // createMaterialValidation: , 
    // updateMaterialValidation: , 
    // deleteMaterialValidation: 
}