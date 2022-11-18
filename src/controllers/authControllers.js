import { db } from "../database/mywallet.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { userSchema } from "../models/userModel.js";


export async function signUpUser(req, res) {
  const user = req.body;
  const exists = await db.collection("users").findOne({ email: user.email });
  if (exists) {
    return res.status(409).send({ message: "Usuário já cadastrado" });
  }
  const { error } = userSchema.validate(user, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  try {
    const hashPassword = bcrypt.hashSync(user.password, 10);
    await db.collection("users").insertOne({ ...user, password: hashPassword });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function logInUser(req, res) {
  const { email, password } = req.body;
  const user = await db.collection("users").findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await db.collection("sessions").insertOne({ userId: user._id, token });
    res.status(200).send({name:user.name,token});
  } else {
    res.sendStatus(404);    
  }
}
