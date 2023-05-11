import { StatusCodes } from 'http-status-codes';
import customersService from '../services/customers.services.js';

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
    create,
}

export default customersControllers
