import { StatusCodes } from "http-status-codes"
import rentalsServices from "../services/rentals.services.js"

async function getAll(req, res, next){

    try {
        
        const rentals = await rentalsServices.getAll()

        return res.status(StatusCodes.OK).send(rentals)
    } catch (err) {
        next(err)
    }

}

async function create(req, res, next){
    const { body } = req

    try {
        await rentalsServices.create(body)

        return res.sendStatus(StatusCodes.CREATED)
    } catch (err) {
        next(err)
    }
}

const rentalsControllers = {
    getAll,
    create,
}

export default rentalsControllers