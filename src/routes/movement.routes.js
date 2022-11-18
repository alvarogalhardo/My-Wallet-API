import { Router } from "express";
import { getMovements } from "../controllers/movementControllers.js";

const movementRouter = Router();

movementRouter.get("/movements", getMovements);

export default movementRouter;
