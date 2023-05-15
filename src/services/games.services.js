import error from "../errors/errors.js";
import gamesRepositories from "../repositories/games.repositories.js";

async function get(gameName, limit, offset) {
  if (gameName) {

    const { rows: games } = await gamesRepositories.getGameByName(gameName, limit, offset);

    return games;

  } else {
    const { rows: games } = await gamesRepositories.getAll(limit, offset);

    return games;
  }
}

async function create(body) {
  const { name, image, stockTotal, pricePerDay } = body;

  const { rows: existingGameName } = await gamesRepositories.findByName(name);

  if (existingGameName[0]) throw error.conflit();

  return await gamesRepositories.create(name, image, stockTotal, pricePerDay);
}

const gamesServices = {
  get,
  create,
};

export default gamesServices;
