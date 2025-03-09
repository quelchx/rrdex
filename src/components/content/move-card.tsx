import { getTypeColor } from "@/lib/utils";
import { Zap, Target, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { MoveDetails } from "@/constants/types";

type MoveCardProps = { move: MoveDetails };
const splitNames = ["Physical", "Special", "Status"];

const targetNames = [
  { name: "Selected Pokémon", value: 0 },
  { name: "Specific Move", value: 1 },
  { name: "Ally", value: 2 },
  { name: "User's Field", value: 3 },
  { name: "User or Ally", value: 4 },
  { name: "Opponents Field", value: 5 },
  { name: "User", value: 6 },
  { name: "Random Opponent", value: 7 },
  { name: "All Opponents", value: 8 },
  { name: "All Other Pokémon", value: 9 },
  { name: "All Pokémon", value: 10 },
  { name: "Effect", value: 16 },
  { name: "Destructive", value: 32 },
  { name: "Entry Hazard", value: 64 },
];

export function MoveCard(props: MoveCardProps) {
  const { move } = props;
  return (
    <Card className="border-2 transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{move.name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            #{move.ID}
          </Badge>
        </div>
        <div className="flex mt-1 gap-2">
          <Badge className={`${getTypeColor(move.type)}`}>{move.type}</Badge>
          <Badge variant="outline">{splitNames[move.split]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{move.description}</p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {move.power > 0 && (
            <div className="col-span-1">
              <div className="flex items-center mb-1 text-sm gap-1">
                <Zap className="w-4 h-4" />
                <span>Power</span>
              </div>
              <div className={`h-2 bg-gray-200 rounded-md overflow-hidden`}>
                <div
                  className={`h-full bg-blue-500 dark:bg-blue-400`}
                  style={{
                    width: `${(move.power / 150) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-1 text-xs text-right">{move.power}</div>
            </div>
          )}

          <div className="col-span-1">
            <div className="flex items-center mb-1 text-sm gap-1">
              <Target className="w-4 h-4" />
              <span>Accuracy</span>
            </div>

            <div className={`h-2 bg-gray-200 rounded-md overflow-hidden`}>
              <div
                className={`h-full dark:bg-green-400 bg-green-500`}
                style={{
                  width: `${(move.power / 100) * 100}%`,
                }}
              />
            </div>
            <div className="mt-1 text-xs text-right">{move.accuracy}%</div>
          </div>

          <div className="col-span-1">
            <div className="flex items-center mb-1 text-sm gap-1">
              <Clock className="w-4 h-4" />
              <span>PP</span>
            </div>
            <div className={`h-2 bg-gray-200 rounded-md overflow-hidden`}>
              <div
                className={`h-full dark:bg-orange-400 bg-orange-500`}
                style={{
                  width: `${(move.pp / 40) * 100}%`,
                }}
              />
            </div>
            <div className="mt-1 text-xs text-right">{move.pp}</div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="text-sm">
            <span className="font-medium">Target:</span>
            <span className="ml-1 text-xs">
              {targetNames.find((target) => target.value === move.target)
                ?.name || "Unknown"}
            </span>
          </div>
          {move.priority !== 0 && (
            <div className="text-sm">
              <span className="font-medium">Priority:</span>
              <span
                className={`text-xs ml-1 ${
                  move.priority > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {move.priority > 0 ? "+" : ""}
                {move.priority}
              </span>
            </div>
          )}
          {move.secondaryEffectChance > 0 && (
            <div className="text-sm">
              <span className="font-medium">Effect Chance:</span>
              <span className="ml-1 text-xs">
                {move.secondaryEffectChance}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
