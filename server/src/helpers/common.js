import {badRequestErrorCreator} from './errors.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'fs'

import {JOI_VALIDATION_MESSAGES, PUBLIC_FOLDER_PATH} from '../helpers/constants.js'

export const validate = (schema) => {
    if (typeof schema !== 'object' || schema === null) throw new Error(JOI_VALIDATION_MESSAGES.SCHEMA_OBJECT)

    return async (req, res, next) => {
        const {params, body} = req

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
    ...data,
})

export const getPagination = ({page = 1, limit = 10}) => ({
    skip: (+page - 1) * +limit,
    take: +limit,
})

export const generateAccessToken = (id, roles) => {
    const payload = {
        id: +id,
        roles: roles
    }
    return jwt.sign(payload, process.env.TOKEN_SECRET)
}

export let createdFilename = ''
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const {exhibitId} = req.params
        const dir = PUBLIC_FOLDER_PATH + `${exhibitId}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        createdFilename = Date.now() + file.originalname
        cb(null, createdFilename)
    },
})

export const upload = multer({storage})

export const areItemsUniqueByFieldname = (array, fieldName) => {
    const uniqueValues = new Set(array.map(item => item[fieldName]))
    return uniqueValues.size === array.length
}
