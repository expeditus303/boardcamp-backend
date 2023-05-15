import db from "../config/database.connection.js";

function getAll(limit, offset){
    return db.query(`
    SELECT * FROM games 
    LIMIT $1
    OFFSET $2`, [limit, offset])
}

function getGameByName(gameName, limit, offset){
    return db.query(`
    SELECT * FROM games 
    WHERE name ILIKE $1 || '%'
    LIMIT $2
    OFFSET $3
    `, [gameName, limit, offset])
}

function findByName(name){
    return db.query(`SELECT * FROM games WHERE name=$1`, [name])
}

function create(name, image, stockTotal, pricePerDay) {
    return db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`, [name, image, stockTotal, pricePerDay])
}

const gamesRepositories = {
    getAll,
    getGameByName,
    findByName,
    create
}

export default gamesRepositories