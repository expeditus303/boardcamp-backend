import error from "../errors/errors.js"
import gamesRepositories from "../repositories/games.repositories.js"

async function create(body) {
    const { name, image, stockTotal, pricePerDay } = body

    const {rows: existingGameName} = await gamesRepositories.findByName(name)

    if (existingGameName[0]) throw error.conflit()

    return await gamesRepositories.create(name, image, stockTotal, pricePerDay)
}

const gamesServices = {
    create
}

export default gamesServices