import {ERROR_MESSAGES} from '../helpers/constants.js'

export const notFoundErrorCreator = () => {
    const error = new Error(ERROR_MESSAGES.NOT_FOUND)
    error.status = 404

    return error
}

export const internalServerErrorCreator = () => {
    const error = new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR)
    error.status = 500
    return error
}

export const badRequestErrorCreator = (details) => {
    const error = new Error(ERROR_MESSAGES.BAD_REQUEST);
    error.status = 400
    error.details = details

    return error
}
