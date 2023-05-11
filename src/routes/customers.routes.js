import { Router } from "express";
import schemasMiddleware from "../middlewares/schemas.middleware.js";
import customersSchemas from "../schemas/customers.schemas.js";
import customersControllers from "../controllers/customers.controllers.js";

const customersRoutes = Router()

customersRoutes.post("/customers", schemasMiddleware(customersSchemas.create), customersControllers.create)

export default customersRoutes