import { Router } from "express";
import customersRoutes from "./customers.routes.js";
import gamesRoutes from "./games.routes.js";
import rentalsRoutes from "./rentals.routes.js";

const routes = Router()

routes.use([customersRoutes, gamesRoutes, rentalsRoutes])

export default routes