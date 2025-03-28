"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default function GameCard({
  login,
  rating,
}: {
  login: string;
  rating: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Организатор: {login}</CardTitle>
      </CardHeader>
      <CardContent>Рейтинг: {rating}</CardContent>
    </Card>
  );
}
