import express from "express"
import cors from "cors"
import "dotenv/config"
import routes from "./routes/app.routes.js";
import errorsMiddleware from "./middlewares/errors.middleware.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorsMiddleware)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))