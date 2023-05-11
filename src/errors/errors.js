function errorCreator(name, message) {
    return { name, message }
}

function conflit (message = "Conflit") {
    return errorCreator("ConflitError", message)
}

function badRequest( message = "Bad Request"){
    return errorCreator ("BadRequestError", message)
}

const error = {
    conflit,
    badRequest
}

export default error