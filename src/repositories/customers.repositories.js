import db from "../config/database.connection.js";

function getAll(){
    return db.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers`)
}

function getById(id) {
    return db.query(`SELECT *, TO_CHAR(birthday, 'YYYY-MM-DD') AS birthday FROM customers WHERE id=$1`, [id] )
}

function findByCpf(cpf){
    return db.query(`SELECT * FROM customers WHERE cpf = $1` , [cpf])
}

function create(name, phone, cpf, birthday) {
    return db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday])
}

function findByIdAndCpf(id, cpf) {
    return db.query(`SELECT * FROM customers WHERE id<>$1 AND cpf=$2`, [id, cpf])
}

function update(id, name, phone, cpf, birthday) {
    return db.query(`UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`, [name, phone, cpf, birthday, id])
}

const customersRepositories = {
    getAll,
    getById,
    findByCpf,
    create,
    findByIdAndCpf,
    update
}

export default customersRepositories