import { GameDomain } from "@/entities/game/server";
import { routes } from "@/kernel/routes";
import { useEventsSource } from "@/shared/lib/sse/client";

export function useGame(gameId: string) {
  const { dataStream, isPending } = useEventsSource<GameDomain.GameEntity>(
    routes.gameStream(gameId)
  );

  return {
    game: dataStream,
    isPending,
  };
}
