import { Router } from "express";
import schemasMiddleware from "../middlewares/schemas.middleware.js";
import rentalsSchemas from "../schemas/rentals.schemas.js";
import rentalsControllers from "../controllers/rentals.controllers.js";

const rentalsRoutes = Router()

rentalsRoutes.get("/rentals", rentalsControllers.getAll)
rentalsRoutes.post("/rentals", schemasMiddleware(rentalsSchemas.create), rentalsControllers.create)
rentalsRoutes.post("/rentals/:id/return", schemasMiddleware(rentalsSchemas.rentalId, "params"), rentalsControllers.closeRental)
rentalsRoutes.delete("/rentals/:id", schemasMiddleware(rentalsSchemas.rentalId, "params"), rentalsControllers.deleteRental)

export default rentalsRoutes