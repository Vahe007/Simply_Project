import jwt from 'jsonwebtoken'
import {MIDDLEWARE_MESSAGES} from '../helpers/constants.js'

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: MIDDLEWARE_MESSAGES.NOT_AUTHORIZED})
        }
        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decodedData
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({message: MIDDLEWARE_MESSAGES.NOT_AUTHORIZED})
    }
}
