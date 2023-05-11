import { StatusCodes } from "http-status-codes"
import gamesServices from "../services/games.services.js"

async function create(req, res, next){
    const { body } = req

    try {
        await gamesServices.create(body)

        res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
        next(err)
    }
}

const gamesControllers = {
    create
}

export default gamesControllers