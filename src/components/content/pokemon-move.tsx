import { Move } from "@/constants/types";
import { getTypeColor, getCategoryColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type PokemonMoveProps = {
  move: Move;
};

export const PokemonMove = (props: PokemonMoveProps) => {
  const { move } = props;
  return (
    <div className="border rounded-md p-3 mb-2 hover:bg-muted/50 transition-colors">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
        <div className="flex items-center gap-2">
          {move.level && (
            <Badge variant="outline" className="text-xs">
              Lv. {move.level}
            </Badge>
          )}
          <h4 className="font-semibold">{move.name}</h4>
        </div>
        <div className="flex gap-1">
          <Badge className={`${getTypeColor(move.type)}`}>{move.type}</Badge>
          <Badge className={`${getCategoryColor(move.category)}`}>
            {move.category.charAt(0).toUpperCase() + move.category.slice(1)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mb-1">
        <span>Power: {move.power}</span>
        {move.accuracy && <span>Accuracy: {move.accuracy}</span>}
      </div>
      <p className="text-sm">{move.desc}</p>
    </div>
  );
};
