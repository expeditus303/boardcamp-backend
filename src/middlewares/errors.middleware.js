import { StatusCodes } from 'http-status-codes';

const errorsStatusCode = {
    ConflitError: StatusCodes.CONFLICT,
    BadRequestError: StatusCodes.BAD_REQUEST,
    NotFoundError: StatusCodes.NOT_FOUND
}

function errorsMiddleware(err, req, res, next){
    const errorMessage = err.message || "Internal Server Error"
    const errorStatusCode = errorsStatusCode[err.name] || StatusCodes.INTERNAL_SERVER_ERROR

    res.status(errorStatusCode).send(errorMessage)
}

export default errorsMiddleware