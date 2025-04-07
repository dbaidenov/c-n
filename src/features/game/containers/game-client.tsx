"use client";

import { GameId } from "@/kernel/ids";
import { GameLayout } from "../ui/layout";
import { GamePlayers } from "../ui/players";
import { GameStatus } from "../ui/status";
import { GameField } from "../ui/game-field";
import { useGame } from "../model/use-game";

export function GameClient({ gameId }: { gameId: GameId }) {
  const { game, isPending } = useGame(gameId);

  if (!game || isPending) {
    return <GameLayout status={"Ожидание"} />;
  }

  return (
    <GameLayout
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game} />}
      field={<GameField game={game} />}
    />
  );
}
