import db from "../config/database.connection.js";

function getAll(){
    return db.query(`SELECT * FROM games`)
}

function findByName(name){
    return db.query(`SELECT * FROM games WHERE name=$1`, [name])
}

function create(name, image, stockTotal, pricePerDay) {
    return db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])
}

const gamesRepositories = {
    getAll,
    findByName,
    create
}

export default gamesRepositories