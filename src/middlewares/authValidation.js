
import { ObjectId } from "mongodb";
import { db } from "../database/mywallet.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);
  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.sendStatus(401);
    const user = await db.collection("users").findOne({ _id: new ObjectId(session?.userId) });
    if (!user) return res.sendStatus(401);
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
