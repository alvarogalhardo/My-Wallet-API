import { db } from "../database/mywallet.js";
import { movementSchema } from "../models/movementShcema.js";

export async function getMovements(req, res) {
  const { authorization } = req.headers;
  console.log(authorization, 'auth')
  const token = authorization?.replace("Bearer ", "");
  console.log(token, 'token');
  if (!token) return res.sendStatus(401);
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);
  const {email} = await db.collection("users").findOne({_id:session.userId})
  
}
