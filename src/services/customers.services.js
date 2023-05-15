import error from "../errors/errors.js"
import customersRepositories from "../repositories/customers.repositories.js"

async function get(cpf, limit, offset) {

    if (cpf) {
        const { rows: customers } = await customersRepositories.getCustomerByCpf(cpf, limit, offset)
        return customers

    } else {
        const { rows: customers } = await customersRepositories.getAll(limit, offset)
        return customers
    }

}

async function getById(id) {
    const { rows: [customer] } = await customersRepositories.getById(id)

    if (!customer) throw error.notFound()

    return customer
}

async function create(body) {
    const { name, phone, cpf, birthday } = body

    const { rows: existingCustomerCpf } = await customersRepositories.findByCpf(cpf)

    if (existingCustomerCpf[0]) throw error.conflit()

    return await customersRepositories.create(name, phone, cpf, birthday)
}

async function update(id, body) {
    const { name, phone, cpf, birthday } = body

    const { rows: existingCustomerCpf } = await customersRepositories.findByIdAndCpf(id, cpf)

    if (existingCustomerCpf[0]) throw error.conflit()

    return await customersRepositories.update(id, name, phone, cpf, birthday)
}


const customersServices = {
    get,
    getById,
    create,
    update
}

export default customersServices