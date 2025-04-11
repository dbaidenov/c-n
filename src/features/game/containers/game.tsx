import { GameId } from "@/kernel/ids";
import { GameClient } from "./game-client";
import { getCurrentUser, startGame } from "@/entities/user/server";
import { gameEvents } from "../service/game-events";
import { getGameById } from "@/entities/game/server";
import { redirect } from "next/navigation";

export async function Game({ gameId }: { gameId: GameId }) {
  const user = await getCurrentUser();
  let game = await getGameById(gameId);

  if (!game) {
    redirect("/");
  }

  console.log("game", game);

  if (user) {
    const startGameResult = await startGame(gameId, user);

    if (startGameResult.type === "right") {
      game = startGameResult.value;
      gameEvents.emit(startGameResult.value);
    }
  }
  return <GameClient defaultGame={game} />;
}
