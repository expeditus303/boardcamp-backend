import { Router } from "express";
import customersRoutes from "./customers.routes.js";
import gamesRoutes from "./games.routes.js";

const routes = Router()

routes.use([customersRoutes, gamesRoutes])

export default routes