import error from "../errors/errors.js"
import rentalsRepositories from "../repositories/rentals.repositories.js"

async function get(customerId, gameId, status, startDate, order, desc, limit, offset) {

    if (customerId || gameId) {
        const {rows: rentals} = await rentalsRepositories.getRentalById(customerId, gameId, status, startDate, order, desc, limit, offset)
        
        return rentals    
    }

    const {rows: rentals} = await rentalsRepositories.getAll(status, startDate, order, desc, limit, offset)
    
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

async function closeRental(id){

    const {rows: [existingRental]} = await rentalsRepositories.findRentalById(id)

    if(!existingRental) throw error.notFound()

    if(existingRental.returnDate !== null) throw error.badRequest()

    const gameId = existingRental.gameId

    return await rentalsRepositories.updateRentalById(id, gameId)
}

async function deleteRental(id) {

    const {rows: [existingRental]} = await rentalsRepositories.findRentalById(id)

    if(!existingRental) throw error.notFound()

    if(existingRental.returnDate === null) throw error.badRequest()

    return await rentalsRepositories.deleteRentalById(id)
}

const rentalsServices = {
    get,
    create,
    closeRental,
    deleteRental
}

export default rentalsServices