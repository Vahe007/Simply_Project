import Joi from 'joi';

export default {
    createCategorySchema: {
        body: Joi.object({
            data: Joi.array()
                .items({
                    categoryName: Joi.string()
                        .required()
                        .messages({
                            'string.base': `"categoryName" should be a type of 'text'`,
                            'string.empty': `"categoryName" cannot be an empty`,
                            'any.required': `"categoryName" is a required field`
                        })
                }),
        })
    },
    updateCategorySchema: {
        params: Joi.object({
            categoryId: Joi.number().integer().required()
        }),
        body: Joi.object({}).keys({
            categoryName: Joi.string(),
            isActive: Joi.boolean()
        }).required().length(1)
    },
    deleteCategorySchema: {
        params: Joi.object({
            categoryId: Joi.number().integer().required()
        }),
    }

}
