import Joi from 'joi';
import { joiPassword } from 'joi-password';

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
      email: Joi.string().email(),
      password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required(),
      phoneNumber: Joi.number(),
      isLoggedIn: Joi.boolean(),
      isActive: Joi.boolean(),
      role: Joi.any(),
      lastLogin: Joi.date()
    })
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
      phoneNumber: Joi.number(),
      role: Joi.any(),
      isLoggedIn: Joi.boolean(),
      isActive: Joi.boolean(),
      lastLogin: Joi.date()
    })
  }
}