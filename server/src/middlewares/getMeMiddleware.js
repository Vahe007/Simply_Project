import jwt from 'jsonwebtoken'
import {MIDDLEWARE_MESSAGES} from '../helpers/constants.js'

export const getMeMiddleWare = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: MIDDLEWARE_MESSAGES.NOT_AUTHORIZED})
        }
        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET)
        if (decodedData.id !== +req.params.id) {
            return res.status(403).json({message: MIDDLEWARE_MESSAGES.HAS_NO_RIGHTS})
        }
        req.user = decodedData
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({message: MIDDLEWARE_MESSAGES.NOT_AUTHORIZED})
    }
}
