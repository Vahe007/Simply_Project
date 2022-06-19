import Joi from 'joi'

export default {
  uploadFileSchema: {
    params: Joi.object({
      exhibitId: Joi.number().integer().required(),
    }),
  },
}
