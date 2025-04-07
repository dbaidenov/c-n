import { GameId } from "@/kernel/ids";
import { GameEntity, GameIdleEntity, PlayerEntity } from "../domain";
import { prisma } from "@/shared/lib/db";
import { removePassword } from "@/shared/lib/password";
import { Game, Prisma, User } from "@prisma/client";
import { z } from "zod";

function dbGameToGameEntity(
  game: Game & {
    players: User[];
    winner?: User | null;
  }
): GameEntity {
  const players = game.players.map(removePassword);

  switch (game.status) {
    case "idle": {
      const [creator] = players;

      if (!creator) {
        throw new Error("creator should be in game idle");
      }

      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw": {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }
    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner should be in game over");
      }
      return {
        id: game.id,
        players: players,
        field: fieldSchema.parse(game.field),
        status: game.status,
        winner: removePassword(game.winner),
      };
    }
  }
}

async function startGame(gameId: GameId, player: PlayerEntity) {
  return dbGameToGameEntity(
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        players: {
          connect: {
            id: player.id,
          },
        },
        status: "inProgress",
      },
      include: {
        winner: true,
        players: true,
      },
    })
  );
}

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntity);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        connect: {
          id: game.creator.id,
        },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntity(createdGame);
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: {
      winner: true,
      players: true,
    },
  });
  if (game) {
    return dbGameToGameEntity(game);
  }
  return undefined;
}

export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
};
