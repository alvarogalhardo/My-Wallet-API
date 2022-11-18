import express from "express";
import cors from "cors";
import userRouter from "./routes/users.routes.js";
import movementRouter from "./routes/movement.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(movementRouter)
const PORT = 5000;

app.listen(PORT, () => console.log("Running"));
