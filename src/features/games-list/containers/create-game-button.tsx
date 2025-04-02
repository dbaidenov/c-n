"use client";

import { Button } from "@/shared/ui/button";
import { createGameAction } from "../actions/create-game";
import { mapLeft, right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";
import { startTransition } from "react";

export default function CreateGameButton() {
  const [state, action, isPending] = useActionState(
    createGameAction,
    right(undefined)
  );

  return (
    <div className="flex flex-col gap-1">
      <Button
        error={mapLeft(
          state,
          (e) =>
            ({
              ["can-create-only-one-game"]:
                "Вы можете создать только одну игру",
              ["user-not-found"]: "Пользователь не найден ",
            })[e]
        )}
        disabled={isPending}
        onClick={() => startTransition(action)}
      >
        Создать игру
      </Button>
    </div>
  );
}
