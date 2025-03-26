import { GameIdleEntity } from "../domain";
import { gameRepository } from "../repositories/game";

export const getIdleGames = async (): Promise<GameIdleEntity[]> => {
  const games = await gameRepository.gamesList({
    status: "idle",
  });
  return games as GameIdleEntity[];
};
