import joi from "joi"

const create = joi.object({
    name: joi.string().max(150).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().positive().integer().required(),
    pricePerDay: joi.number().positive().integer().required(),
})

const gamesSchemas = {
    create
}

export default gamesSchemas