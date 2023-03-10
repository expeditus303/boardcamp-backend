import { connection } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  const { offset, limit, customerId, order, desc, status, startDate } =
    req.query;

  let openOrClosed;
  if (status === "open") openOrClosed = false;

  if (status === "closed") openOrClosed = true;

  try {
    let rentals = await connection.query(
      `SELECT
          rentals.*,
          json_build_object('id', customers.id, 'name', customers.name) AS customer,
          json_build_object('id', games.id, 'name', games.name) AS game
        FROM
          rentals
          JOIN customers ON rentals."customerId" = customers.id
          JOIN games ON rentals."gameId" = games.id OFFSET $1 LIMIT $2;`,
      [offset, limit]
    );

    if (customerId)
      rentals = await connection.query(
        `
    SELECT
    rentals.*,
    json_build_object('id', customers.id, 'name', customers.name) AS customer,
    json_build_object('id', games.id, 'name', games.name) AS game
  FROM
    rentals
    JOIN customers ON rentals."customerId" = customers.id
    JOIN games ON rentals."gameId" = games.id WHERE rentals."customerId" = $1 OFFSET $2 LIMIT $3;`,
        [customerId, offset, limit]
      );

    if (order)
      rentals = await connection.query(
        `
        SELECT
        rentals.*,
        json_build_object('id', customers.id, 'name', customers.name) AS customer,
        json_build_object('id', games.id, 'name', games.name) AS game
      FROM
        rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id ORDER BY ${order} ${
          desc === "true" ? "DESC" : ""
        }`
      );

    if (status)
      rentals = await connection.query(
        `
      SELECT
      rentals.*,
      json_build_object('id', customers.id, 'name', customers.name) AS customer,
      json_build_object('id', games.id, 'name', games.name) AS game
      FROM
      rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id WHERE rentals."returnDate" IS ${
        openOrClosed ? "NOT" : ""
      } NULL OFFSET $1 LIMIT $2;`,
        [offset, limit]
      );

    if (startDate)
      rentals = await connection.query(
        `
      SELECT
      rentals.*,
      json_build_object('id', customers.id, 'name', customers.name) AS customer,
      json_build_object('id', games.id, 'name', games.name) AS game
      FROM
      rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id WHERE rentals."rentDate" >= $1 OFFSET $2 LIMIT $3;`,
        [startDate, offset, limit]
      );

    // SELECT * FROM your_table WHERE rentDate > '2021-06-21';

    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function insertRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerExists = await connection.query(
      "SELECT * FROM customers WHERE id=$1;",
      [customerId]
    );

    if (customerExists.rowCount === 0) return res.sendStatus(400);

    const gameExists = await connection.query(
      "SELECT * FROM games WHERE id=$1;",
      [gameId]
    );

    if (gameExists.rowCount === 0) return res.sendStatus(400);

    const games = await connection.query(
      'SELECT * FROM rentals WHERE "gameId"=$1;',
      [gameId]
    );

    if (games.rows.length >= gameExists.rows[0].stockTotal)
      return res.sendStatus(400);

    const pricePerDay = gameExists.rows[0].pricePerDay;

    const originalPrice = pricePerDay * daysRented;

    await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);',
      [customerId, gameId, new Date(), daysRented, null, originalPrice, null]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function endRental(req, res) {
  const { id } = req.params;

  const date = dayjs();

  try {
    const rentExists = await connection.query(
      "SELECT * FROM rentals WHERE id=$1;",
      [id]
    );

    const rent = rentExists.rows[0];

    if (rentExists.rowCount === 0) return res.sendStatus(404);
    if (rent.returnDate) return res.sendStatus(400);

    const diff = date.valueOf() - rent.rentDate.valueOf();
    const diffDays = Math.floor(diff / (24 * 3600 * 1000));

    console.log(diffDays);

    let delayFee = 0;
    if (diffDays > rent.daysRented) {
      delayFee =
        (diffDays - rent.daysRented) * (rent.originalPrice / rent.daysRented);
    }

    await connection.query(
      `UPDATE rentals SET "returnDate"=NOW(), "delayFee"=$1 WHERE id=$2;`,
      [delayFee, id]
    );

    await connection.query(
      'UPDATE games SET "stockTotal" = "stockTotal" + 1 WHERE id=$1;',
      [rent.gameId]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const idExists = await connection.query(
      "SELECT * FROM rentals WHERE id=$1",
      [id]
    );

    if (idExists.rowCount === 0) return res.sendStatus(404);

    const gameNotReturned = idExists.rows[0];

    if (!gameNotReturned.returnDate) return res.sendStatus(400);

    await connection.query(`DELETE FROM rentals WHERE id=$1`, [id]);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
