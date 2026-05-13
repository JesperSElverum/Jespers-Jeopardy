import { useGame } from "../context/GameContext";
import { motion } from "framer-motion";

export default function GameBoard() {
  const { gameData, revealedIds, setActiveQuestion } = useGame();

  const pointValues = [100, 200, 300, 400, 500];

  return (
    <div className="p-4 md:p-6 overflow-x-auto">
      <div
        className="grid gap-3 min-w-[700px]"
        style={{
          gridTemplateColumns: `repeat(${gameData.categories.length}, minmax(140px, 1fr))`,
        }}
      >
        {/* Category headers */}
        {gameData.categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-blue rounded-xl p-3 text-center font-bold text-sm md:text-base"
          >
            {cat.name}
          </motion.div>
        ))}

        {/* Question tiles by point value */}
        {pointValues.map((points) =>
          gameData.categories.map((cat, catIdx) => {
            const question = cat.questions.find((q) => q.points === points);
            if (!question) return <div key={`${cat.id}-${points}`} />;

            const isRevealed = revealedIds.includes(question.id);

            return (
              <motion.button
                key={question.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: catIdx * 0.05 + (points / 100) * 0.08 }}
                whileHover={!isRevealed ? { scale: 1.08, rotate: 1 } : {}}
                whileTap={!isRevealed ? { scale: 0.95 } : {}}
                onClick={() => !isRevealed && setActiveQuestion(question.id)}
                disabled={isRevealed}
                className={`
                  rounded-xl p-4 text-center font-bold text-xl md:text-2xl transition-all duration-300
                  ${
                    isRevealed
                      ? "bg-white/5 border border-white/10 text-white/20 cursor-not-allowed"
                      : "glass-gold cursor-pointer hover:glow-gold hover:border-nor-gold/60"
                  }
                `}
              >
                {isRevealed ? "✓" : `${points}`}
              </motion.button>
            );
          }),
        )}
      </div>
    </div>
  );
}
