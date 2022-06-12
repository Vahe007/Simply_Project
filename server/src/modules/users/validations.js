import Joi from 'joi'
import { joiPassword } from 'joi-password'

export default {
  getUserByIdSchema: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },

  createUserSchema: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      surname: Joi.string().min(2).required(),
      email: Joi.string().email(),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required(),
      phone: Joi.number(),
      role: Joi.any(),
    }),
  },
  registerUserSchema: {
    body: Joi.object({
      name: Joi.string().min(3).required(),
      surname: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .required(),
      phone: Joi.number(),
      roleId: Joi.number(),
    }),
  },
  loginUserSchema: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: joiPassword.string().required(),
    }),
  },

  updateUserByIdSchema: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),

    body: Joi.object({
      name: Joi.string().min(3).required(),
      surname: Joi.string().min(2).required(),
      email: Joi.string().email(),
      password: Joi.string(),
      phone: Joi.number(),
      role: Joi.any(),
    }),
  },
}
