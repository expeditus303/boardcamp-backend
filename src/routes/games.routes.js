import { Router } from "express";
import schemasMiddleware from "../middlewares/schemas.middleware.js";
import gamesSchemas from "../schemas/games.schemas.js";
import gamesControllers from "../controllers/games.controllers.js";

const gamesRoutes = Router()

gamesRoutes.post("/games", schemasMiddleware(gamesSchemas.create), gamesControllers.create)

export default gamesRoutes