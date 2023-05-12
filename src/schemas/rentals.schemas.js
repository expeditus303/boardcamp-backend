import joi from "joi";

const create = joi.object({
  customerId: joi.number().positive().integer().required(),
  gameId: joi.number().positive().integer().required(),
  daysRented: joi.number().positive().integer().required(),
});

const rentalId = joi.object({
  id: joi.number()
})

const rentalsSchemas = {
  create,
  rentalId
}

export default rentalsSchemas