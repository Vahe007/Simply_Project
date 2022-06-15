import Joi from 'joi'
import { joiPassword } from 'joi-password'

export default {
  uploadFileSchema: {
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
}
