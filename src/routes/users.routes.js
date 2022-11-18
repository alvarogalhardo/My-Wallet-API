import { Router } from "express";
import { signUpUser, logInUser } from "../controllers/authControllers.js";

const usersRouter = Router();

usersRouter.post("/sign-ip", signUpUser);
usersRouter.post("/log-in", logInUser);

export default usersRouter;
