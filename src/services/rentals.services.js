import error from "../errors/errors.js"
import rentalsRepositories from "../repositories/rentals.repositories.js"

async function getAll() {

    const {rows: rentals} = await rentalsRepositories.getAll()
    
    return rentals
}

async function create(body){
    const { customerId, gameId, daysRented} = body

    const {rows: [existingGame]} = await rentalsRepositories.findGameById(gameId)
    const {rows: [existingUser]} = await rentalsRepositories.findCustomerById(customerId)

    if(!existingGame || !existingUser || !existingGame.stockTotal > 0) throw error.badRequest()

    const { pricePerDay } = existingGame

    const originalPrice = pricePerDay * daysRented

    const rental = {
        customerId,
        gameId,
        rentDate: 'NOW',
        daysRented,
        returnDate: null,
        originalPrice,
        delayFee: null
    }

    return await rentalsRepositories.create(rental)
}

async function returnGame(id){

    const {rows: [existingRental]} = await rentalsRepositories.findRentalById(id)

    if(!existingRental) throw error.notFound()

    if(existingRental.returnDate !== null) throw error.badRequest()

    return await rentalsRepositories.updateRentalById(id)
}

const rentalsServices = {
    getAll,
    create,
    returnGame,
}

export default rentalsServices