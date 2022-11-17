import { db } from "../app.js";
import joi from "joi";
import bcrypt from "bcrypt";

const userSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required().email(),
});

export async function signUpUser(req, res) {
  const user = req.body;
  try {
    const exists = await db.collection("users").findOne({ email: user.email });
    if (exists) {
      return res.status(409).send({message: "Usuário já cadastrado"});
    }
    const { error } = userSchema.validate(user, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }
    const hashPassword = bcrypt.hashSync(user.password, 10);
    await db.collection("users").insertOne({ ...user, password: hashPassword });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function logInUser(req,res){
  const {email,password} = req.body;
  
}
