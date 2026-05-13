import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import confetti from "canvas-confetti";
import Header from "../components/Header";
import GameBoard from "../components/GameBoard";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";

export default function GamePage() {
  const { isGameComplete } = useGame();

  useEffect(() => {
    if (isGameComplete) {
      // Fire confetti celebration!
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#BA0C2F", "#00205B", "#FFFFFF", "#D4AF37"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#BA0C2F", "#00205B", "#FFFFFF", "#D4AF37"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isGameComplete]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GameBoard />
        <QuestionCard />
      </main>

      {/* Game complete overlay */}
      {isGameComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="relative glass rounded-3xl p-12 text-center max-w-md"
          >
            <h2 className="text-4xl font-bold mb-4">🎉 Gratulerer!</h2>
            <p className="text-xl mb-6 text-white/80">
              Alle spørsmål er besvart!
            </p>
            <p className="text-lg text-nor-gold">Hurra for 17. mai! 🇳🇴</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
