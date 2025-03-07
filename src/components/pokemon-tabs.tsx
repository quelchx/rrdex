import { useState } from "react";
import { MoveItem } from "./move-item";
import { Card, CardContent, CardDescription } from "./ui/card";
import { Move } from "@/constants/types";

export function LearnableTechnicalMachinesTabView({
  moves,
}: {
  moves: Move[];
}) {
  const [minimized, setMinimized] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {moves.slice(0, minimized ? 4 : moves.length).map((move, index) => (
          <MoveItem key={index} move={move} />
        ))}
      </div>
      <Card className="border-dashed" onClick={() => setMinimized(!minimized)}>
        <CardContent className="p-4 text-center text-muted-foreground">
          <CardDescription>
            {minimized ? `+ ${moves.length - 4} more TMs` : "Show less"}
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
}
