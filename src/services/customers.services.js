import error from "../errors/errors.js"
import customersRepositories from "../repositories/customers.repositories.js"

async function create(body) {
    const { name, phone, cpf, birthday } = body

    const { rows: existingCustomerCpf } = await customersRepositories.findByCpf(cpf)

    if (existingCustomerCpf[0]) throw error.conflit()

    return await customersRepositories.create(name, phone, cpf, birthday)
}


const customersService = {
    create,
}

export default customersService