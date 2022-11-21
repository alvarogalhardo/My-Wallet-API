import { entrySchema,exitSchema } from "../models/movementSchema.js";

export async function entrySchemaValidation (req,res,next){
    const { error } = entrySchema.validate(req.body);
    if (error) {
      res.status(400).send(error.details.map((detail) => detail.message));
    }
    next();
}

export async function exitSchemaValidation (req,res,next){
  const { error } = exitSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details.map((detail) => detail.message));
  }
  next();
}