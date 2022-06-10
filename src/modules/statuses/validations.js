import Joi from 'joi'
import { joiPassword } from 'joi-password'

export default {
  // CRUD ordering
  // create
  createStatusValidation: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
    body: Joi.object({
      name: Joi.string().required(),
    }),
  },

  // read
  getStatusByIdValidation: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
  },

  // update
  updateStatusValidation: {
    body: Joi.object({
      name: Joi.string(),
    }),
  },

  // delete
  deleteStatusValidation: {
    params: Joi.object({
      id: Joi.number().integer(),
    }),
  },
}
