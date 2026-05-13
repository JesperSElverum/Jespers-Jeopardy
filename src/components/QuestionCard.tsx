import { useState } from "react";
import { useGame } from "../context/GameContext";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionCard() {
  const { gameData, activeQuestionId, setActiveQuestion, revealQuestion } =
    useGame();
  const [showAnswer, setShowAnswer] = useState(false);

  // Find the active question
  let activeQuestion = null;
  for (const cat of gameData.categories) {
    const found = cat.questions.find((q) => q.id === activeQuestionId);
    if (found) {
      activeQuestion = found;
      break;
    }
  }

  const handleClose = () => {
    if (activeQuestionId) {
      revealQuestion(activeQuestionId);
    }
    setActiveQuestion(null);
    setShowAnswer(false);
  };

  return (
    <AnimatePresence>
      {activeQuestion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Card */}
          <motion.div
            initial={{ scale: 0.5, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            exit={{ scale: 0.5, rotateY: 90, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="relative glass rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center"
            style={{ perspective: "1000px" }}
          >
            {/* Points badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 glass-gold rounded-full px-5 py-1 text-sm font-bold">
              {activeQuestion.points} poeng
            </div>

            {/* Question */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mt-4 mb-8"
            >
              {activeQuestion.question}
            </motion.p>

            {/* Answer (revealed) */}
            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, rotateX: -90, height: 0 }}
                  animate={{ opacity: 1, rotateX: 0, height: "auto" }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="mb-8"
                >
                  <div className="glass-gold rounded-2xl p-6">
                    <p className="text-xl md:text-2xl font-bold text-nor-gold-light">
                      {activeQuestion.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              {!showAnswer ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAnswer(true)}
                  className="glass-blue px-8 py-3 rounded-xl font-bold text-lg cursor-pointer hover:glow-blue transition-shadow"
                >
                  Vis Svar
                </motion.button>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClose}
                  className="glass-red px-8 py-3 rounded-xl font-bold text-lg cursor-pointer hover:glow-red transition-shadow"
                >
                  Tilbake
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
