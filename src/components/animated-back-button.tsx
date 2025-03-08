import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rabbit } from "lucide-react";
import { motion } from "framer-motion";
import { useSelectedPokemonStore } from "@/store";

export default function AnimatedBackButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { setPokemonDialog } = useSelectedPokemonStore();

  return (
    <div className="flex justify-end">
      <Button
        className="flex items-center gap-0.5 overflow-hidden"
        onClick={() => setPokemonDialog(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="relative flex items-center mr-1"
          initial="idle"
          animate={isHovered ? "running" : "idle"}
          variants={{
            idle: {
              y: 0,
              x: 0,
              transition: { duration: 0.3 },
            },
            running: {
              y: [0, -4, 0],
              x: [0, -2, 0],
              transition: {
                repeat: Number.POSITIVE_INFINITY,
                duration: 0.35,
                ease: "easeInOut",
              },
            },
          }}
        >
          <motion.div
            variants={{
              idle: { rotate: 0 },
              running: {
                rotate: [-5, 5, -5],
                transition: { repeat: Number.POSITIVE_INFINITY, duration: 0.5 },
              },
            }}
          >
            <Rabbit size={18} className="transform -scale-x-100" />
          </motion.div>
        </motion.div>

        <span>Back to Pokedex</span>
      </Button>
    </div>
  );
}
