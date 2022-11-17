import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { signUpUser,logInUser } from "./controllers/authControllers.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();
export const db = mongoClient.db("mywallet");
const PORT = 5000;

app.post("/sign-up", signUpUser);
app.post("/log-in", logInUser);

app.listen(PORT, () => console.log("Running"));
