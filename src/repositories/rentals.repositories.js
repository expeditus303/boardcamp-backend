import db from "../config/database.connection.js";

function getAll() {
  return db.query(`
    SELECT r.*, 
        json_build_object('id', c.id, 'name', c.name) AS customer, 
        json_build_object('id', g.id, 'name', g.name) AS game 
    FROM rentals AS r 
    JOIN customers AS c ON r."customerId" = c.id
    JOIN games AS g ON r."gameId" = g.id
    `);
}

function findGameById(gameId) {
  return db.query(`SELECT * FROM games WHERE id=$1`, [gameId]);
}

function findCustomerById(customerId) {
  return db.query(`SELECT * FROM customers WHERE id=$1`, [customerId]);
}

function create(rental) {
  const rentalValuesArray = Object.values(rental);

  return db.query(
    `
    WITH inserted_rental AS (
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    )
    UPDATE games 
    SET "stockTotal" = "stockTotal" - 1
    WHERE id = $2
    `,
    rentalValuesArray
  );
}

const rentalsRepositories = {
    getAll,
    findGameById,
    findCustomerById,
    create,
};

export default rentalsRepositories;
