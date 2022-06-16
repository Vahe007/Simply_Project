import Joi from 'joi'

export default {
  getExhibitByIdValidation: {
    params: Joi.object({
      id: Joi.number().integer()
    })
  },
  createExhibitValidation: {
    params: Joi.object({
      id: Joi.number().integer()
    }),
    body: Joi.object({
      fundNumber: Joi.string().required(),
      exhibitName: Joi.string().required(),
      material: Joi.any(), //not sure
      placeOfOrigin: Joi.string().required(),
      creationPeriod: Joi.string().required(),
      acquisitionPeriod: Joi.date().required(),
      width: Joi.number().integer(),
      height: Joi.number().integer(),
      length: Joi.number().integer(),
      diameter: Joi.number().integer(),
      weight: Joi.number().integer(),
      status: Joi.any(), //not sure
      description: Joi.string().min(3).max(200),
      contributors: Joi.any(), //not sure
      creator: Joi.any(), //not sure
      updater: Joi.any(), //not sure
      category: Joi.any() //not sure
    })
  },
  updateExhibitValidation: {
    body: Joi.object({
      fundNumber: Joi.string(),
      exhibitName: Joi.string(),
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
      description: Joi.string().min(3).max(200)
    })
  },
  deleteExhibitValidation: {
    params: Joi.object({
      id: Joi.number().integer()
    })
  }
}
