import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { GameData, Category, Question } from "../types";
import {
  loadGameData,
  saveGameData,
  exportToJSON,
  importFromJSON,
} from "../services/storage";

export default function EditorPage() {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<GameData>(loadGameData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (saved) {
      const t = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(t);
    }
  }, [saved]);

  const updateTitle = (title: string) => {
    setGameData((prev) => ({ ...prev, title }));
  };

  const addCategory = () => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: "Ny kategori",
      questions: [100, 200, 300, 400, 500].map((points, i) => ({
        id: `q-${Date.now()}-${i}`,
        question: "",
        answer: "",
        points,
      })),
    };
    setGameData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCat],
    }));
  };

  const removeCategory = (catId: string) => {
    setGameData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== catId),
    }));
  };

  const updateCategory = (catId: string, name: string) => {
    setGameData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, name } : c,
      ),
    }));
  };

  const updateQuestion = (
    catId: string,
    qId: string,
    field: keyof Question,
    value: string | number,
  ) => {
    setGameData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              questions: c.questions.map((q) =>
                q.id === qId ? { ...q, [field]: value } : q,
              ),
            }
          : c,
      ),
    }));
  };

  const handleSave = () => {
    saveGameData(gameData);
    setSaved(true);
  };

  const handleExport = () => {
    const json = exportToJSON(gameData);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jeopardy-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = importFromJSON(ev.target?.result as string);
          setGameData(data);
          saveGameData(data);
        } catch {
          alert("Ugyldig JSON-fil");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="glass-blue px-4 py-2 rounded-xl text-sm font-medium cursor-pointer"
        >
          ← Tilbake
        </motion.button>

        <h1 className="text-xl font-bold">Rediger Spill</h1>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleImport}
            className="glass px-3 py-2 rounded-xl text-sm cursor-pointer"
          >
            📥 Importer
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="glass px-3 py-2 rounded-xl text-sm cursor-pointer"
          >
            📤 Eksporter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="glass-gold px-4 py-2 rounded-xl text-sm font-bold cursor-pointer hover:glow-gold transition-shadow"
          >
            💾 Lagre
          </motion.button>
        </div>
      </motion.div>

      {/* Saved notification */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-300 glass-gold rounded-xl px-6 py-3 font-bold"
          >
            ✅ Lagret!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title editor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-4 mb-6"
      >
        <label className="block text-sm text-white/60 mb-1">Spilltittel</label>
        <input
          type="text"
          value={gameData.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-lg outline-none focus:border-nor-gold/60 transition-colors"
        />
      </motion.div>

      {/* Categories */}
      <div className="space-y-6">
        {gameData.categories.map((cat, catIdx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + catIdx * 0.05 }}
            className="glass-blue rounded-2xl p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => updateCategory(cat.id, e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white font-bold outline-none focus:border-nor-gold/60 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeCategory(cat.id)}
                className="text-nor-red-light hover:text-nor-red text-xl cursor-pointer px-2"
                title="Slett kategori"
              >
                ✕
              </motion.button>
            </div>

            <div className="space-y-3">
              {cat.questions.map((q) => (
                <div
                  key={q.id}
                  className="glass rounded-xl p-3 grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-2 items-center"
                >
                  <div className="text-sm font-bold text-nor-gold text-center">
                    {q.points} p
                  </div>
                  <input
                    type="text"
                    placeholder="Spørsmål..."
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(cat.id, q.id, "question", e.target.value)
                    }
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-nor-gold/40 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Svar..."
                    value={q.answer}
                    onChange={(e) =>
                      updateQuestion(cat.id, q.id, "answer", e.target.value)
                    }
                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-nor-gold/40 transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add category button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={addCategory}
        className="mt-6 w-full glass rounded-2xl p-4 text-center font-bold text-lg cursor-pointer hover:glow-gold transition-shadow"
      >
        + Legg til kategori
      </motion.button>
    </div>
  );
}
