import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { motion } from "framer-motion";

export default function Header() {
  const { gameData, resetGame } = useGame();
  const navigate = useNavigate();
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass sticky top-0 z-50 rounded-b-2xl px-6 py-3 flex items-center justify-between"
    >
      <h1 className="text-lg md:text-2xl font-bold tracking-tight">
        {gameData.title}
      </h1>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetGame();
            navigate("/");
          }}
          className="glass-red px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:glow-red transition-shadow"
        >
          Avslutt
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetGame}
          className="glass-red px-4 py-2 rounded-xl text-sm font-medium cursor-pointer hover:glow-red transition-shadow"
        >
          Start på nytt
        </motion.button>
      </div>
    </motion.header>
  );
}
