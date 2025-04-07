import { GameId, UserId } from "@/kernel/ids";

export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity;
  status: "idle";
  field: Field;
};

export type GameInProgressEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "inProgress";
};

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOver";
  winner: PlayerEntity;
};

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[];
  field: Field;
  status: "gameOverDraw";
};

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = (GameSymbol | null)[];

export type GameSymbol = string;

export const GameSymbol = {
  X: "X",
  O: "O",
};

export const getGameCurrentSymbol = (
  game: GameInProgressEntity | GameOverEntity | GameOverDrawEntity
) => {
  const sybmolds = game.field.filter((s) => s !== null).length;

  return sybmolds % 2 === 0 ? GameSymbol.X : GameSymbol.O;
};

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  if (gameSymbol === GameSymbol.X) {
    return GameSymbol.O;
  }
  return GameSymbol.X;
};
