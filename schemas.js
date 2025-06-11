const Joi = require("joi")

module.exports.journalSchema = Joi.object({
    journal : Joi.object({
      username:Joi.string().required(),
      entry:Joi.string().max(350).min(10).required(),
      date:Joi.string().required().max(10),
      time:Joi.string().required().max(5),
      color:Joi.string().required().max(7),
      status:Joi.string().required().max(7),
      question:Joi.string().required().max(100)
      }).required()
  })
