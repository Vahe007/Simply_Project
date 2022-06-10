import { badRequestErrorCreator } from './errors.js'

export const validate = (schema) => {
  if (typeof schema !== 'object' || schema === null) throw new Error('Schema is not an object')

  return async (req, res, next) => {
    const { params, body } = req

    try {
      schema.params && (await schema.params.validateAsync(params))
      schema.body && (await schema.body.validateAsync(body))
      return next()
    } catch (error) {
      next(badRequestErrorCreator(error.details))
    }
  }
}

// schema = {
//   params: Joi.object({
//       id: Joi.number().integer().required(),
//   }),
//   body: Joi.object({
//       name: Joi.string().required()
//   })
// }

export const responseDataCreator = (data) => ({
  data,
  count: data.length,
})

export const getPagination = ({page = 1, limit = 10}) => ({
  skip: (+page - 1) * +limit,
  take: +limit
})