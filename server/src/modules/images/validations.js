import Joi from 'joi'

export default {
  uploadImageSchema: {},
  getAllImagesByExhibitIdSchema: {
    params: Joi.object({
      exhibitId: Joi.number().integer().required(),
    }),
  },
  getStaticImageSchema: {
    params: Joi.object({
      imageName: Joi.string().required(),
    }),
  },
  updateImageIsactiveSchema: {
    params: Joi.object({
      imageRowId: Joi.number().integer().required(),
    }),
  },

  
}
