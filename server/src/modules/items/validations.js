import Joi from 'joi'

export default {
  getItemByIdValidation: {
    params: Joi.object({
      id: Joi.number().integer()
    })
  },
  createItemValidation: {
    params: Joi.object({
      id: Joi.number().integer()
    }),
    body: Joi.object({
      fundNumber: Joi.string().required(),
      itemName: Joi.string().required(),
      material: Joi.any(),
      placeOfOrigin: Joi.string().required(),
      creationPeriod: Joi.string().required(),
      acquisitionPeriod: Joi.date().required(),
      contributor: Joi.string().required(),
      width: Joi.number().integer(),
      height: Joi.number().integer(),
      length: Joi.number().integer(),
      diameter: Joi.number().integer(),
      weight: Joi.number().integer(),
      status: Joi.any(),
      diameter: Joi.number().integer(),
      description: Joi.string().min(3).max(200)
    })
  },
  updateItemValidation: {
    body: Joi.object({
      fundNumber: Joi.string(),
      itemName: Joi.string(),
      material: Joi.any(),
      placeOfOrigin: Joi.string(),
      creationPeriod: Joi.string(),
      acquisitionPeriod: Joi.date(),
      contributor: Joi.string(),
      width: Joi.number().integer(),
      height: Joi.number().integer(),
      length: Joi.number().integer(),
      diameter: Joi.number().integer(),
      weight: Joi.number().integer(),
      status: Joi.any(),
      diameter: Joi.number().integer(),
      description: Joi.string().min(3).max(200)
    })
  },
  deleteItemValidation: {
    params: Joi.object({
      id: Joi.number().integer()
    })
  }
}
