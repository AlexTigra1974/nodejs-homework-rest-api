const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .messages({ "any.required": `missing required name field` })
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({ "any.required": `missing required email field` })
    .required(),

  phone: Joi.string()
    .messages({ "any.required": `missing required phone field` })
    .pattern(/\(([0-9]{3})\)?([ .-])([0-9]{3})?([ .-])([0-9]{4})/)
    // .pattern(/^\d{3}-d{3}-d{4}$/)
    .required(),

  favorite: Joi.boolean().valid(false),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .messages({ "any.required": `missing required favorite field` })
    .required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
