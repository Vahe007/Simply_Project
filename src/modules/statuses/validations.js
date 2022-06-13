import Joi from 'joi'

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
    params: Joi.object({
      id: Joi.number().integer(),
    }),
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
