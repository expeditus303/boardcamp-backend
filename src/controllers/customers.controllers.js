import { StatusCodes } from 'http-status-codes';
import customersServices from '../services/customers.services.js';


async function getAll(req, res, next) {

  const { cpf, order, desc, limit, offset } = req.query

  try {

    const customers = await customersServices.get(cpf, order, desc, limit, offset)

    res.status(StatusCodes.OK).send(customers)
  } catch (err) {
    next(err)
  }

}

async function getById(req, res, next) {

  const { id } = req.params

  try {
    const customer = await customersServices.getById(id)

    res.status(StatusCodes.OK).send(customer)
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {

  const { body } = req

  try {

    await customersServices.create(body)

    return res.sendStatus(StatusCodes.CREATED)

  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {

  const { id } = req.params
  const { body } = req

  try {
    await customersServices.update(id, body)

    return res.sendStatus(StatusCodes.OK)
  } catch (err) {
    next(err)
  }

}

const customersControllers = {
  getAll,
  getById,
  create,
  update
}

export default customersControllers
