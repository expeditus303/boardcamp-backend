import db from "../config/database.connection.js";

function getAll(limit, offset) {

  return db.query(`
    SELECT r.*, 
        jsonb_build_object('id', c.id, 'name', c.name) AS customer, 
        jsonb_build_object('id', g.id, 'name', g.name) AS game 
    FROM rentals AS r 
    JOIN customers AS c ON r."customerId" = c.id
    JOIN games AS g ON r."gameId" = g.id
    LIMIT $1
    OFFSET $2
    `, [limit, offset]);
}

function getRentalById(customerId, gameId, limit, offset) {
  return db.query(`
    SELECT r.*, 
        jsonb_build_object('id', c.id, 'name', c.name) AS customer, 
        jsonb_build_object('id', g.id, 'name', g.name) AS game 
    FROM rentals AS r 
    JOIN customers AS c ON r."customerId" = c.id
    JOIN games AS g ON r."gameId" = g.id
    WHERE r."customerId" = $1
      OR r."gameId" = $2
    LIMIT $3
    OFFSET $4
    `, [customerId, gameId, limit, offset]);
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

function findRentalById(id){
    return db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
}

function updateRentalById(id, gameId){
    return db.query(`
    WITH update_rental AS (
      UPDATE rentals
      SET "returnDate" = CASE  
              WHEN "returnDate" IS NULL THEN
                  NOW()
              ELSE "returnDate"
          END,
          "delayFee" = CASE
              WHEN CURRENT_DATE > ("rentDate" + "daysRented") THEN
                  ("originalPrice" / "daysRented") * (CURRENT_DATE - ("rentDate" + "daysRented"))
              ELSE "delayFee"
          END
      WHERE rentals.id = $1
  )
  UPDATE games 
  SET "stockTotal" = "stockTotal" + 1
  WHERE id = $2;
  
    `, [id, gameId])
}

function deleteRentalById(id){
    return db.query(`DELETE FROM rentals WHERE id=$1`, [id])
}

const rentalsRepositories = {
    getAll,
    getRentalById,
    findGameById,
    findCustomerById,
    create,
    findRentalById,
    updateRentalById,
    deleteRentalById
};

export default rentalsRepositories;
