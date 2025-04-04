"use server";

import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import GameCard from "../ui/game-card";
import CreateGameButton from "../ui/create-game-button";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout actions={<CreateGameButton />}>
      {games.map((game) => {
        return (
          <GameCard
            login={game.creator.login}
            rating={game.creator.rating}
            key={game.id}
          />
        );
      })}
    </Layout>
  );
}
