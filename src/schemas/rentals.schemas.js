import joi from "joi";

const create = joi.object({
  customerId: joi.number().positive().integer().required(),
  gameId: joi.number().positive().integer().required(),
  daysRented: joi.number().positive().integer().required(),
});

const rentalsSchemas = {
  create
}

export default rentalsSchemas