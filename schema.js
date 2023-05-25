const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// customize extention to validate the entered HTMl
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

const userSchema = Joi.object({
  user: Joi.object({
    email: Joi.string().required().escapeHTML(),
    username: Joi.string().required().escapeHTML(),
    password: Joi.string().required().escapeHTML(),
  }).required(),
});

module.exports = {  userSchema };
