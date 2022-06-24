import Joi from 'joi';
import {joiPassword} from 'joi-password';
import {JOI_VALIDATION_MESSAGES} from "../../helpers/constants.js";

export default {
    getUserByIdSchema: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        }),
    },

    createUserSchema: {
        body: Joi.object({
            name: Joi.string().min(2).required(),
            surname: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: joiPassword
                .string()
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(1)
                .required(),
            phoneNumber: Joi.string()
                .regex(/^\d{9}$/)
                .messages(
                    {'string.pattern.base': JOI_VALIDATION_MESSAGES.PHONE_NUMBER_PATTERN}
                ),
            role: Joi.string()
                .valid('ADMIN', 'EMPLOYEE')
        })
    },

    updateUserByIdSchema: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        }),

        body: Joi.object({
            name: Joi.string().min(3),
            surname: Joi.string().min(2),
            email: Joi.string().email(),
            phoneNumber: Joi.string().regex(/^\d{9}$/),
            isActive: Joi.boolean(),
            lastLogin: Joi.date(),
            role: Joi.string()
                .valid('ADMIN', 'EMPLOYEE')
        })
    },

    registerUserSchema: {
        body: Joi.object({
            name: Joi.string().min(3).required(),
            surname: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: joiPassword
                .string()
                .min(8)
                .max(20)
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(1)
                .required(),
            phoneNumber: Joi.string()
                .regex(/^\d{9}$/)
                .messages(
                    {'string.pattern.base': JOI_VALIDATION_MESSAGES.PHONE_NUMBER_PATTERN}
                ),
        }),
    },
    loginUserSchema: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: joiPassword
                .string()
                .min(8)
                .max(20)
                .minOfSpecialCharacters(1)
                .minOfLowercase(1)
                .minOfUppercase(1)
                .minOfNumeric(1)
                .required(),
        }),
    },
}

