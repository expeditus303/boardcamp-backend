import { StatusCodes } from 'http-status-codes';
import customersService from '../services/customers.services.js';


async function getAll(req, res, next) {

  try {

    const customers = await customersService.getAll()

    res.status(StatusCodes.OK).send(customers)
  } catch (err) {
    next(err)
  }

}

async function create(req, res, next) {

    const { body } = req

  try {

    await customersService.create(body)
    
    return res.sendStatus(StatusCodes.CREATED)

  } catch (err) {
    next(err)
  }
}

const customersControllers = {
  getAll,  
  create
}

export default customersControllers
