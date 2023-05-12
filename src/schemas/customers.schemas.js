import joi from "joi"


const create = joi.object({
        name: joi.string().max(120).required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().pattern(/^[0-9]+$/).length(11).required().messages({
            'string.pattern.base': '\"cpf\" must contain only numbers',
          }), 
        birthday: joi.date().required()
})

const getById = joi.object({
    id: joi.number()
})

const customersSchemas = {
    create,
    getById
}

export default customersSchemas