import express from 'express'
import logger from 'morgan'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export let createdFilename = ''
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('req')
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    createdFilename = Date.now() + file.originalname
    cb(null, createdFilename)
  },
})
export const upload = multer({ storage })
const app = express()
app.post(
  '/test',
  (req, res, next) => {
    console.log('Testing next')
    next()
  },
  upload.single('file')
)
const env = process.env.NODE_ENV || 'development'

const configStr = fs.readFileSync(path.resolve('src/config.json'), 'utf-8')
const config = JSON.parse(configStr)[env]

app.use(express.json())
app.use(logger('dev' /*, { skip: (req, res) => res.statusCode < 400 } */))

app.set('port', process.env.PORT)
app.set('env', env)
app.set('config', config)

export default app
