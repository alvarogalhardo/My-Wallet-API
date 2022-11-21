import { ObjectId } from "mongodb";
import { db } from "../database/mywallet.js";
import dayjs from "dayjs";

export async function getMovements(req, res) {
  const { user } = res.locals;
  const { _id } = user;
  const movements = await db
    .collection("movements")
    .find({ userId: _id })
    .toArray();
  res.status(200).send(movements);
}

export async function newEntry(req, res) {
  const { user } = res.locals;
  const { _id } = user;
  const date = dayjs().locale("pt").format("DD/MM").replace("-", "/");
  await db
    .collection("movements")
    .insertOne({ userId: _id, ...req.body, date });
  res.sendStatus(200);
}

export async function newExit(req, res) {
  const { user } = res.locals;
  const { _id } = user;
  const date = dayjs().locale("pt").format("DD/MM").replace("-", "/");
  await db
    .collection("movements")
    .insertOne({ userId: _id, ...req.body, date });
  res.sendStatus(200);
}
