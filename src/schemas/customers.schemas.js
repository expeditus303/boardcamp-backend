import joi from "joi"


const create = joi.object({
        name: joi.string().max(120).required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().length(11).required(), 
        birthday: joi.date().required()
})

const customersSchemas = {
    create,
}

export default customersSchemas