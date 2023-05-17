import db from "../config/database.connection.js";

function getAll(status, startDate, order, desc, limit, offset) {

  let query = `
    SELECT r.*, 
        jsonb_build_object('id', c.id, 'name', c.name) AS customer, 
        jsonb_build_object('id', g.id, 'name', g.name) AS game 
    FROM rentals AS r 
    JOIN customers AS c ON r."customerId" = c.id
    JOIN games AS g ON r."gameId" = g.id
  `

  let whereClause = "";

  if (status === "open") {
    whereClause = ' WHERE r."returnDate" IS NULL';

  } else if (status === "closed") {
    whereClause = ' WHERE r."returnDate" IS NOT NULL';

  }

  if (whereClause && startDate){
    whereClause += ` AND r."rentDate" > '${startDate}'`
  } else if (!whereClause && startDate) {
    whereClause = `WHERE r."rentDate" > '${startDate}'`
  }

  query += whereClause

  if (order) {
    query += `
    ORDER BY "${order}" ${desc ? "DESC" : "ASC"}
    `
  }

  query += `
  LIMIT $1
  OFFSET $2
  `

  console.log(query)
  return db.query(query, [limit, offset])
}

function getRentalById(customerId, gameId, order, desc, limit, offset) {
  return db.query(`
    SELECT r.*, 
        jsonb_build_object('id', c.id, 'name', c.name) AS customer, 
        jsonb_build_object('id', g.id, 'name', g.name) AS game 
    FROM rentals AS r 
    JOIN customers AS c ON r."customerId" = c.id
    JOIN games AS g ON r."gameId" = g.id
    WHERE r."customerId" = $1
      OR r."gameId" = $2
    ORDER BY "${order ? order : "id" }" ${desc ? "DESC" : "ASC"}
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

function countRentalsOpenFromGameId(gameId) {
  return db.query(`
  SELECT COUNT(*) AS "rentalsOpened"
  FROM rentals
  WHERE "gameId" = $1 AND "returnDate" IS NULL
  `, [gameId])
}

function create(rental) {
  const rentalValuesArray = Object.values(rental);

  return db.query(
    `
    INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,
    rentalValuesArray
  );
}

function findRentalById(id){
    return db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
}

function updateRentalById(id){
    return db.query(`
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
    `, [id])
}

function deleteRentalById(id){
    return db.query(`DELETE FROM rentals WHERE id=$1`, [id])
}

const rentalsRepositories = {
    getAll,
    getRentalById,
    findGameById,
    findCustomerById,
    countRentalsOpenFromGameId,
    create,
    findRentalById,
    updateRentalById,
    deleteRentalById
};

export default rentalsRepositories;
