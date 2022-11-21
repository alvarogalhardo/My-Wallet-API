import { Router } from "express";
import { getMovements, newEntry, newExit } from "../controllers/movementControllers.js";
import { authValidation } from "../middlewares/authValidation.js";
import { entrySchemaValidation,exitSchemaValidation } from "../middlewares/movementSchemaValidation.js";

const movementRouter = Router();

movementRouter.use(authValidation);

movementRouter.get("/movements", getMovements);
movementRouter.post("/movements/entry",entrySchemaValidation, newEntry);
movementRouter.post("/movements/exit",exitSchemaValidation, newExit);

export default movementRouter;
