import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import confetti from "canvas-confetti";
import Header from "../components/Header";
import GameBoard from "../components/GameBoard";
import QuestionCard from "../components/QuestionCard";
import { motion } from "framer-motion";
import Norge_flagg from "../assets/norge_flagg.png";
import { useNavigate } from "react-router-dom";
export default function GamePage() {
  const { isGameComplete, resetGame } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (isGameComplete) {
      // Create a canvas above all overlays
      const canvas = document.createElement("canvas");
      canvas.style.cssText =
        "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none;";
      document.body.appendChild(canvas);
      const fire = confetti.create(canvas, { resize: true });

      // Big initial burst from center
      fire({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#BA0C2F", "#00205B", "#FFFFFF", "#D4AF37"],
      });

      // Continuous celebration from both sides
      const duration = 5000;
      const end = Date.now() + duration;

      const frame = () => {
        fire({
          particleCount: 8,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.6 },
          colors: ["#BA0C2F", "#00205B", "#FFFFFF", "#D4AF37"],
        });
        fire({
          particleCount: 8,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.6 },
          colors: ["#BA0C2F", "#00205B", "#FFFFFF", "#D4AF37"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Extra bursts at intervals
      setTimeout(
        () =>
          fire({
            particleCount: 100,
            spread: 120,
            origin: { x: 0.3, y: 0.3 },
            colors: ["#BA0C2F", "#D4AF37", "#FFFFFF"],
          }),
        800,
      );
      setTimeout(
        () =>
          fire({
            particleCount: 100,
            spread: 120,
            origin: { x: 0.7, y: 0.3 },
            colors: ["#00205B", "#D4AF37", "#FFFFFF"],
          }),
        1600,
      );
      setTimeout(
        () =>
          fire({
            particleCount: 200,
            spread: 160,
            startVelocity: 45,
            origin: { x: 0.5, y: 0.5 },
            colors: ["#BA0C2F", "#00205B", "#FFFFFF", "#D4AF37"],
          }),
        2500,
      );

      // Clean up canvas after celebration
      setTimeout(() => document.body.removeChild(canvas), 6000);
    }
  }, [isGameComplete]);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">
        <GameBoard />
        <QuestionCard />
      </main>

      {/* Game complete overlay */}
      {isGameComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-200 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            className="absolute inset-0 bg-black/50"
          />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="relative glass rounded-3xl p-16 text-center max-w-lg flex flex-col items-center gap-6"
          >
            <h2 className="text-4xl font-bold">🎉 Gratulerer!</h2>
            <p className="text-2xl text-white/80">Alle spørsmål er besvart!</p>
            <p className="text-2xl text-nor-gold">
              Hurra for{" "}
              <img
                src={Norge_flagg}
                alt="Norge flag"
                className="inline-block w-12 h-12 ml-2"
              />
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                resetGame();
                navigate("/");
              }}
              className="glass-red px-6 py-3 mt-4 rounded-xl text-sm font-medium cursor-pointer hover:glow-red transition-shadow"
            >
              Avslutt
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
