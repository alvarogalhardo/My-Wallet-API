import joi from "joi";

export const entrySchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("entry"),
})

export const exitSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("exit"),
})

