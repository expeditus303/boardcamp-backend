function errorCreator(name, message) {
    return { name, message }
}

function conflit (message = "Conflit") {
    return errorCreator("ConflitError", message)
}

function badRequest( message = "Bad Request"){
    return errorCreator ("BadRequestError", message)
}

function notFound(message = "Not Found"){
    return errorCreator("NotFoundError", message)
}

const error = {
    conflit,
    badRequest,
    notFound
}

export default error