export const JOI_VALIDATION_MESSAGES = {
    BASE_TYPE: ` should be a type of 'text'`,
    NOT_EMPTY: ` cannot be an empty`,
    REQUIRED: ` is a required field`,
    MIN_VALUE: ` should have a minimum length of {#limit}`,
    MAX_VALUE: ` should have a maximum length of {#limit}`,
    SCHEMA_OBJECT: 'Schema is not an object',
    PHONE_NUMBER_PATTERN: `Phone number must have 9 digits.`
}
export const PUBLIC_FOLDER_PATH = './public/images/'

export const ERROR_MESSAGES = {
    NOT_FOUND: 'Not Found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    BAD_REQUEST: 'Bad Request',
    ITEMS_ARE_NOT_UNIQUE: 'items\' names must be unique',
    NOT_FOUND_RECORD: ' Such record not found',
    SUCH_USER_EXISTS: 'User with such email  is already registered',
    NO_USER_FOUND: 'No user fount with such email',
}

export const MIDDLEWARE_MESSAGES = {
    NOT_AUTHORIZED: 'User not authorized',
    HAS_NO_RIGHTS: 'User has no rights for such action',
}