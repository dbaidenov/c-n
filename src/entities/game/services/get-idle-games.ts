import { gameRepository } from "../repositories/game";

export const getIdleGames = async () => {
  const games = await gameRepository.gamesList();
  return games.filter((game) => game.status === "idle");
};
