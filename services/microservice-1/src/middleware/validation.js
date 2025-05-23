const Joi = require('joi')

const itemSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow('')
})

const validateItem = (req, res, next) => {
  const { error } = itemSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      error: 'Validation error',
      details: error.details[0].message
    })
  }
  next()
}

module.exports = {
  validateItem
}
