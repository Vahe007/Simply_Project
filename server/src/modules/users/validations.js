import Joi from 'joi';
import {joiPassword} from 'joi-password';
import {JOI_VALIDATION_MESSAGES} from "../../helpers/constants.js";

export default {
    getUserByIdSchema: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        })
    },

    createUserSchema: {
        body: Joi.object({
            firstName: Joi.string().min(2).required(),
            lastName: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: joiPassword
                .string()
                .min(4)
                .required(),
            phoneNumber: Joi.string()
                .regex(/^\d{9}$/)
                .messages(
                    {'string.pattern.base': JOI_VALIDATION_MESSAGES.PHONE_NUMBER_PATTERN}
                ),
            role: Joi.string()
                .valid('ADMIN', 'EMPLOYEE', 'GUEST'),

            isActive: Joi.boolean(),
            lastLogin: Joi.date()

        })
    },

    updateUserByIdSchema: {
        params: Joi.object({
            id: Joi.number().integer().required(),
        }),

        body: Joi.object({
            firstName: Joi.string().min(2).required(),
            lastName: Joi.string().min(2).required(),
            email: Joi.string().email().required(),
            password: joiPassword
                .string()
                .min(4)
                .required(),
            phoneNumber: Joi.string()
            .regex(/^\d{9}$/)
            .messages(
                {'string.pattern.base': JOI_VALIDATION_MESSAGES.PHONE_NUMBER_PATTERN}
            ),
            isActive: Joi.boolean(),
            lastLogin: Joi.date(),
            role: Joi.string()
                .valid('ADMIN', 'EMPLOYEE', 'GUEST')
        })
    },

    loginUserSchema: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: joiPassword
            .string()
            .min(4)
            .required(),
        }),
    },
}

