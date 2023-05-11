
import error from "../errors/errors.js"
import { StatusCodes } from 'http-status-codes';

function schemasMiddleware(schema, field = "body", statusCode = StatusCodes.UNPROCESSABLE_ENTITY) {
    return (req, res, next) => {
        const reqValues = req[field]

        const { error: errors } = schema.validate(reqValues, { abortEarly: false })

        if (errors) {
           const errorMessages = errors.details.map((detail) => detail.message)
           throw error.badRequest(errorMessages)
        }
        
        next()
    }
}

export default schemasMiddleware;