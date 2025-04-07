import { GameId } from "@/kernel/ids";
import { GameClient } from "./game-client";
import { getCurrentUser, startGame } from "@/entities/user/server";
import { gameEvents } from "../service/game-events";

export async function Game({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();
  if (user) {
    const startGameResult = await startGame(gameId, user);

    // if (startGameResult.type === "right") {
    //   gameEvents.
    // }
  }
  return <GameClient gameId={gameId} />;
}
