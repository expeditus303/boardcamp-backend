import express, { json } from "express"
import cors from "cors"
import "dotenv/config"
import "express-async-errors";

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))