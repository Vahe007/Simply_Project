import Joi from 'joi'
import {JOI_VALIDATION_MESSAGES} from "../../helpers/constants.js";

export default {
    createStatusValidation: {
        body: Joi.object({
            data: Joi.array()
                .items({
                    statusName: Joi.string()
                        .required()
                        .messages({
                            'string.base': 'statusName' + JOI_VALIDATION_MESSAGES.BASE_TYPE,
                            'string.empty': 'statusName' + JOI_VALIDATION_MESSAGES.NOT_EMPTY,
                            'any.required': 'statusName' + JOI_VALIDATION_MESSAGES.REQUIRED
                        })
                }),
        })
    },

    updateStatusValidation: {
        params: Joi.object({
            statusId: Joi.number().integer(),
        }),
        body: Joi.object().keys({
            statusName: Joi.string(),
            isActive: Joi.boolean()
        }).required().length(1)
    },

    deleteStatusValidation: {
        params: Joi.object({
            statusId: Joi.number().integer(),
        }),
    },
}
