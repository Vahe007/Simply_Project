import {badRequestErrorCreator} from './errors.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'fs'

import {JOI_VALIDATION_MESSAGES, PUBLIC_FOLDER_PATH} from '../helpers/constants.js'

export const validate = (schema) => {
    if (typeof schema !== 'object' || schema === null) throw new Error(JOI_VALIDATION_MESSAGES.SCHEMA_OBJECT)

    return async (req, res, next) => {
        const {params, body} = req
        console.log(req.body);

        try {
            schema.params && (await schema.params.validateAsync(params))
            schema.body && (await schema.body.validateAsync(body))
            return next()
        } catch (error) {
            console.log('hii');
            next(badRequestErrorCreator(error.details))
        }
    }
}

export const responseDataCreator = (data) => ({
    ...data,
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

//exclude Property from array of objects for prisma data
export function exclude(obj, options) {
      const objClone = {...obj};
        for(const value of options) {
            delete objClone[options];            
        }
        return objClone;
  }
  