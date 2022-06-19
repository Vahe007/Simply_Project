import express from 'express'
import logger from 'morgan'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const app = express()
app.use(cors())

const env = process.env.NODE_ENV || 'development'

const configStr = fs.readFileSync(path.resolve('src/config.json'), 'utf-8')
const config = JSON.parse(configStr)[env]

app.use(express.json())
app.use(logger('dev' /*, { skip: (req, res) => res.statusCode < 400 } */))

app.set('port', process.env.PORT)
app.set('env', env)
app.set('config', config)

export default app
