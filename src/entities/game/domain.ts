export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity;

type GameIdleEntity = {
  id: string;
  players: PlayerEntity[];
  status: "idle";
};

type GameInProgressEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field[];
  status: "inProgress";
};

type GameOverEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field[];
  status: "gameOver";
  winner?: PlayerEntity;
};

type GameOverDrawEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field[];
  status: "gameOverDraw";
};

type PlayerEntity = {
  id: string;
  login: string;
  rating: string;
};

export type Field = Cell;

export type Cell = string | null;

export type GameSymbol = string;
