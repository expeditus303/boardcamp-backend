import { StatusCodes } from "http-status-codes"
import gamesServices from "../services/games.services.js"

async function getAll(req, res, next) {

    const { name: gameName, order, desc, limit, offset } = req.query

    try {
        const games = await gamesServices.get(gameName, order, desc, limit, offset)

        res.status(StatusCodes.OK).send(games)
    } catch (err) {
        next(err)
    }
}

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
    getAll,
    create,
}

export default gamesControllers