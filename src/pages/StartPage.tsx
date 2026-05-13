import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Norge_flagg from "../assets/norge_flagg.png";

const floatingItems = [
  // Flags
  {
    content: "flag",
    x: "5%",
    y: "10%",
    size: "w-14 h-14",
    duration: 6,
    delay: 0,
    opacity: "opacity-60",
  },
  {
    content: "flag",
    x: "88%",
    y: "8%",
    size: "w-10 h-10",
    duration: 7,
    delay: 1.5,
    opacity: "opacity-50",
  },
  {
    content: "flag",
    x: "50%",
    y: "5%",
    size: "w-8 h-8",
    duration: 5,
    delay: 0.8,
    opacity: "opacity-40",
  },
  {
    content: "flag",
    x: "20%",
    y: "80%",
    size: "w-12 h-12",
    duration: 8,
    delay: 2,
    opacity: "opacity-50",
  },
  {
    content: "flag",
    x: "75%",
    y: "75%",
    size: "w-10 h-10",
    duration: 6,
    delay: 3,
    opacity: "opacity-40",
  },
  // Emojis
  {
    content: "🍺",
    x: "92%",
    y: "25%",
    size: "text-4xl",
    duration: 5,
    delay: 0.5,
    opacity: "opacity-70",
  },
  {
    content: "🍺",
    x: "3%",
    y: "60%",
    size: "text-3xl",
    duration: 7,
    delay: 2.5,
    opacity: "opacity-50",
  },
  {
    content: "👗",
    x: "15%",
    y: "30%",
    size: "text-5xl",
    duration: 6,
    delay: 1,
    opacity: "opacity-60",
  },
  {
    content: "👗",
    x: "80%",
    y: "50%",
    size: "text-4xl",
    duration: 8,
    delay: 3.5,
    opacity: "opacity-50",
  },
  {
    content: "🎉",
    x: "70%",
    y: "15%",
    size: "text-4xl",
    duration: 5,
    delay: 0.3,
    opacity: "opacity-60",
  },
  {
    content: "🎊",
    x: "8%",
    y: "45%",
    size: "text-3xl",
    duration: 4,
    delay: 1.8,
    opacity: "opacity-50",
  },
  {
    content: "🌭",
    x: "60%",
    y: "85%",
    size: "text-4xl",
    duration: 6,
    delay: 0.7,
    opacity: "opacity-60",
  },
  {
    content: "🍦",
    x: "35%",
    y: "88%",
    size: "text-3xl",
    duration: 5,
    delay: 2.2,
    opacity: "opacity-50",
  },
  {
    content: "🎈",
    x: "90%",
    y: "65%",
    size: "text-4xl",
    duration: 7,
    delay: 1.2,
    opacity: "opacity-60",
  },
  {
    content: "🎈",
    x: "25%",
    y: "12%",
    size: "text-3xl",
    duration: 6,
    delay: 3,
    opacity: "opacity-40",
  },
  {
    content: "🥁",
    x: "48%",
    y: "78%",
    size: "text-4xl",
    duration: 8,
    delay: 0.9,
    opacity: "opacity-50",
  },
  {
    content: "🎺",
    x: "82%",
    y: "30%",
    size: "text-3xl",
    duration: 5,
    delay: 2.7,
    opacity: "opacity-60",
  },
  {
    content: "🌷",
    x: "12%",
    y: "70%",
    size: "text-3xl",
    duration: 6,
    delay: 1.5,
    opacity: "opacity-50",
  },
  {
    content: "🌸",
    x: "65%",
    y: "55%",
    size: "text-3xl",
    duration: 4,
    delay: 0.4,
    opacity: "opacity-40",
  },
  {
    content: "⭐",
    x: "42%",
    y: "3%",
    size: "text-3xl",
    duration: 5,
    delay: 1.1,
    opacity: "opacity-50",
  },
  {
    content: "🥳",
    x: "95%",
    y: "45%",
    size: "text-4xl",
    duration: 7,
    delay: 2,
    opacity: "opacity-60",
  },
];

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Edit button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/editor")}
        className="absolute top-6 right-6 glass rounded-xl px-4 py-2 text-sm font-medium cursor-pointer hover:glow-blue transition-shadow z-10"
      >
        ✏️ Rediger
      </motion.button>

      {/* Floating decorative elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -18, 0], rotate: [0, 4, -4, 0] }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          className={`absolute select-none ${item.opacity}`}
          style={{ left: item.x, top: item.y }}
        >
          {item.content === "flag" ? (
            <img src={Norge_flagg} alt="🇳🇴" className={item.size} />
          ) : (
            <span className={item.size}>{item.content}</span>
          )}
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", damping: 15 }}
        className="glass rounded-3xl p-10 md:p-16 text-center max-w-lg w-full relative z-10"
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
          transition={{ type: "spring" }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/game")}
          className="glass-gold px-10 py-4 rounded-2xl text-xl font-bold cursor-pointer hover:scale-105"
        >
          Start Spill
        </motion.button>
      </motion.div>
    </div>
  );
}
