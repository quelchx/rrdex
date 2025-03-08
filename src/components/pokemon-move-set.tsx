import { useState } from "react";
import { Move } from "@/constants/types";
import { PokemonMove } from "./pokemon-move";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export function PokemonMoveSet({ moves }: { moves: Move[] }) {
  const [minimized, setMinimized] = useState(true);
  return moves.length > 0 ? (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {moves.slice(0, minimized ? 4 : moves.length).map((move, index) => (
          <PokemonMove key={index} move={move} />
        ))}
      </div>
      {moves.length > 4 && (
        <Card
          className="border-dashed"
          onClick={() => setMinimized(!minimized)}
        >
          <CardContent className="p-4 text-center text-muted-foreground">
            <CardDescription>
              {minimized ? `+ ${moves.length - 4} more TMs` : "Show less"}
            </CardDescription>
          </CardContent>
        </Card>
      )}
    </>
  ) : (
    <Card className="border-dashed">
      <CardContent className="p-4 text-center text-muted-foreground">
        <CardDescription>No moves found</CardDescription>
      </CardContent>
    </Card>
  );
}
