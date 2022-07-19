import { badRequestErrorCreator } from './errors.js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { JOI_VALIDATION_MESSAGES, PUBLIC_FOLDER_PATH } from '../helpers/constants.js'
import nodemailer from 'nodemailer'
import { v4 as uuid } from "uuid";



export const validate = (schema) => {
  if (typeof schema !== 'object' || schema === null)
    throw new Error(JOI_VALIDATION_MESSAGES.SCHEMA_OBJECT)

  return async (req, res, next) => {
    const { params, body } = req
    //.replace(/\\/g, '/')
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

export const generateAccessToken = (id, roles) => {
  const payload = {
    id: +id,
    roles: roles,
  }
  return jwt.sign(payload, process.env.TOKEN_SECRET)
}

const isImage = (_, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(badRequestErrorCreator('Only image is allowed'))
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `${PUBLIC_FOLDER_PATH}`
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }

    cb(null, dir)
  },
  filename: (_, file, cb) => {
    cb(null, `img-${Date.now()}${path.extname(file.originalname)}`)
  },
})

export const upload = multer({
  storage,
  fileFilter: isImage,
})

//exclude Property from array of objects for prisma data
export function exclude(obj, options) {
  const objClone = { ...obj }
  for (const value of options) {
    delete objClone[options]
  }
  return objClone
}


export const sendActivationKey = (recipient, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipient,
      subject: "Password Rest",
      html: `<button>${link}</button>`,
    }

    transporter.sendMail(mailOptions);
  }
  catch (error) {
  }
}
