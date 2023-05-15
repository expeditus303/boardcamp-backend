import { StatusCodes } from "http-status-codes"
import rentalsServices from "../services/rentals.services.js"

async function getAll(req, res, next){

    const { customerId, gameId, limit, offset} = req.query

    try {
        
        const rentals = await rentalsServices.get(customerId, gameId, limit, offset)

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

async function closeRental(req, res, next){
    const { id } = req.params

    try {

        await rentalsServices.closeRental(id)

        return res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}

async function deleteRental(req, res, next){
    const { id } = req.params

    try {
        await rentalsServices.deleteRental(id)

        res.sendStatus(StatusCodes.OK)
    } catch (err) {
        next(err)
    }
}

const rentalsControllers = {
    getAll,
    create,
    closeRental,
    deleteRental
}

export default rentalsControllers