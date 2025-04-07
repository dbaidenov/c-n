"use server";

import { getIdleGames } from "@/entities/game/server";
import { Layout } from "../ui/layout";
import GameCard from "../ui/game-card";
import CreateGameButton from "../ui/create-game-button";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { routes } from "@/kernel/routes";

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
            actions={
              <Link href={routes.game(game.id)}>
                <Button>Подключиться</Button>
              </Link>
            }
          />
        );
      })}
    </Layout>
  );
}
