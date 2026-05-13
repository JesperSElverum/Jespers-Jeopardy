import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Norge_flagg from "../assets/norge_flagg.png";
export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Edit button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/editor")}
        className="absolute top-6 right-6 glass rounded-xl px-4 py-2 text-sm font-medium cursor-pointer hover:glow-blue transition-shadow"
      >
        ✏️ Rediger
      </motion.button>

      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 text-6xl opacity-30 select-none"
      >
        <img src={Norge_flagg} alt="Norge flagg" className="w-16 h-16" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-10 text-5xl opacity-30 select-none"
      >
        🎉
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute top-40 right-20 text-4xl opacity-20 select-none"
      >
        🌸
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
        className="glass rounded-3xl p-10 md:p-16 text-center max-w-lg w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
        >
          <img
            src={Norge_flagg}
            alt="Norge flagg"
            className="w-16 h-16 inline-block mr-2"
          />
          Lea&apos;s
          <br />
          <span className="text-nor-gold">17. mai</span>
          <br />
          Jeopardy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/60 mb-8 text-lg"
        >
          Gratulerer med dagen!
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/game")}
          className="glass-gold px-10 py-4 rounded-2xl text-xl font-bold cursor-pointer transition-shadow"
        >
          Start Spill
        </motion.button>
      </motion.div>
    </div>
  );
}
