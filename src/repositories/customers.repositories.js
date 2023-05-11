import db from "../config/database.connection.js";

function findByCpf(cpf){
    return db.query(`SELECT * FROM customers WHERE cpf = $1` , [cpf])
}

function create(name, phone, cpf, birthday) {
    return db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
}

const customersRepositories = {
    findByCpf,
    create
}

export default customersRepositories