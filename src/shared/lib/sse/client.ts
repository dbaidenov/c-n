import { useEffect, useState } from "react";

export function useEventsSource<T>(url: string) {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown | undefined>();
  useEffect(() => {
    const gameEvents = new EventSource(url);
    gameEvents.addEventListener("message", (message) => {
      try {
        setIsPending(false);
        setData(JSON.parse(message.data));
        setError(undefined);
      } catch (error) {
        setError(error);
      }
    });

    gameEvents.addEventListener("error", (error) => {
      setError(error);
    });
    return () => {
      gameEvents.close();
    };
  }, [url]);

  return { dataStream: data, error, isPending };
}
