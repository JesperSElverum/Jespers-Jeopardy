import { memo } from "react";
import { useGame } from "../context/GameContext";
import { motion } from "framer-motion";

const hoverActive = { scale: 1.08, rotate: 1 };
const hoverDisabled = {};
const tapActive = { scale: 0.95 };
const tapDisabled = {};

const Tile = memo(function Tile({
  questionId,
  points,
  isRevealed,
  onClick,
}: {
  questionId: string;
  points: number;
  isRevealed: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      key={questionId}
      whileHover={isRevealed ? hoverDisabled : hoverActive}
      whileTap={isRevealed ? tapDisabled : tapActive}
      onClick={onClick}
      disabled={isRevealed}
      className={`
        rounded-xl p-4 text-center font-bold text-2xl md:text-4xl transition-shadow duration-200 flex items-center justify-center
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
});

export default function GameBoard() {
  const { gameData, revealedIds, setActiveQuestion } = useGame();

  const pointValues = [100, 200, 300, 400, 500];

  return (
    <div className="p-4 md:p-6 flex-1 flex flex-col overflow-hidden">
      <div
        className="grid gap-3 flex-1"
        style={{
          gridTemplateColumns: `repeat(${gameData.categories.length}, minmax(140px, 1fr))`,
          gridTemplateRows: `auto repeat(${pointValues.length}, 1fr)`,
        }}
      >
        {/* Category headers */}
        {gameData.categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-blue rounded-xl p-4 text-center font-bold text-lg md:text-2xl flex items-center justify-center"
          >
            {cat.name}
          </motion.div>
        ))}

        {/* Question tiles by point value */}
        {pointValues.map((points) =>
          gameData.categories.map((cat) => {
            const question = cat.questions.find((q) => q.points === points);
            if (!question) return <div key={`${cat.id}-${points}`} />;

            const isRevealed = revealedIds.includes(question.id);

            return (
              <Tile
                key={question.id}
                questionId={question.id}
                points={question.points}
                isRevealed={isRevealed}
                onClick={() => !isRevealed && setActiveQuestion(question.id)}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
