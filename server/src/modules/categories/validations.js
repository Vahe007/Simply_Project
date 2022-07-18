import Joi from 'joi'
import { JOI_VALIDATION_MESSAGES } from '../../helpers/constants.js'

export default {
  createCategorySchema: {
    body: Joi.object({
      data: Joi.array().items({
        categoryName: Joi.string()
          .required()
          .messages({
            'string.base': 'categoryName' + JOI_VALIDATION_MESSAGES.BASE_TYPE,
            'string.empty': 'categoryName' + JOI_VALIDATION_MESSAGES.NOT_EMPTY,
            'any.required': 'categoryName' + JOI_VALIDATION_MESSAGES.REQUIRED,
          }),
      }),
    }),
  },
  updateCategorySchema: {
    params: Joi.object({
      categoryId: Joi.number().integer().required(),
    }),
    body: Joi.object()
      .keys({
        categoryName: Joi.string(),
        isActive: Joi.boolean(),
      })
      .required()
      .length(1),
  },
  deleteCategorySchema: {
    params: Joi.object({
      categoryId: Joi.number().integer().required(),
    }),
  },
}
