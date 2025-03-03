import { prisma } from "@/shared/lib/db";
import { GameEntity } from "../domain";

function dbGameToGameEnitiy() {}

async function gamesList(): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    include: {
      winner: true,
      players: true,
    },
  });
}

export const gamesRepository = {
  gamesList,
};
