const Joi = require('joi');

const schema = Joi.object({
    title: Joi.string().min(5).required(),
    slug: Joi.string().min(5).required(),
    content: Joi.string().min(50).required(),
    excerpt: Joi.string().min(50).required(),
    category_id: Joi.number().integer().required()
});

module.exports = schema;