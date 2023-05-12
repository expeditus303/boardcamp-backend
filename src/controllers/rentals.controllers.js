import { StatusCodes } from "http-status-codes"
import rentalsServices from "../services/rentals.services.js"


async function create(req, res, next){
    const { body } = req

    try {
        await rentalsServices.create(body)

        res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
        next(err)
    }
}

const rentalsControllers = {
    create
}

export default rentalsControllers