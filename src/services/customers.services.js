import error from "../errors/errors.js"
import customersRepositories from "../repositories/customers.repositories.js"

async function getAll() {
    const {rows: customers} = await customersRepositories.getAll()
    return customers
}

async function create(body) {
    const { name, phone, cpf, birthday } = body

    const { rows: existingCustomerCpf } = await customersRepositories.findByCpf(cpf)

    if (existingCustomerCpf[0]) throw error.conflit()

    return await customersRepositories.create(name, phone, cpf, birthday)
}


const customersService = {
    getAll,
    create,
}

export default customersService