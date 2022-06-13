import { badRequestErrorCreator } from './errors.js'
import jwt from "jsonwebtoken";

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

export const responseDataCreator = (data) => ({
  data,
  count: data.length,
})

export const getPagination = ({ page = 1, limit = 10}) => ({
  skip: (+page - 1) * +limit,
  take: +limit,
})

export const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}