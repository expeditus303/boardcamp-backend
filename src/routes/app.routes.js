import { Router } from "express";
import customersRoutes from "./customers.routes.js";

const routes = Router()

routes.use([customersRoutes])

export default routes