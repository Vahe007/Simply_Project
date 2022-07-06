import Joi from 'joi';
import {JOI_VALIDATION_MESSAGES} from "../../helpers/constants.js";

export default {
    createMaterialValidation: {
        body: Joi.array()
                .items(Joi.string()
                        .required()
                        .messages({
                            'string.base': 'materialName' + JOI_VALIDATION_MESSAGES.BASE_TYPE,
                            'string.empty': 'materialName' + JOI_VALIDATION_MESSAGES.NOT_EMPTY,
                            'any.required': 'materialName' + JOI_VALIDATION_MESSAGES.REQUIRED
                        })
                ,
        )
    },
    updateMaterialValidation: {
        params: Joi.object({
            materialId: Joi.number().integer().required(),
        }),
        body: Joi.object({
            materialName: Joi.string(),
            isActive: Joi.boolean()
        }).required()
    },

    updateMaterialsValidation: {
        params: Joi.object({
            materialIds: Joi.array().items(Joi.number())
        }),
    },

    deleteMaterialValidation: {
        params: Joi.object({
            materialId: Joi.number().integer().required()
        })
    }
}
