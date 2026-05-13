import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { GameData, GameState } from "../types";
import { useLocation } from "react-router-dom";
import {
  loadGameData,
  loadGameState,
  saveGameState,
  clearGameState,
} from "../services/storage";

interface GameContextType {
  gameData: GameData;
  revealedIds: string[];
  activeQuestionId: string | null;
  revealQuestion: (id: string) => void;
  setActiveQuestion: (id: string | null) => void;
  resetGame: () => void;
  isGameComplete: boolean;
  reloadGameData: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [gameData, setGameData] = useState<GameData>(loadGameData);
  const [state, setState] = useState<GameState>(loadGameState);

  // Reload game data from localStorage on every route change
  useEffect(() => {
    setGameData(loadGameData());
  }, [location.pathname]);

  const totalQuestions = gameData.categories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0,
  );
  const isGameComplete = state.revealedIds.length >= totalQuestions;

  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const revealQuestion = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      revealedIds: prev.revealedIds.includes(id)
        ? prev.revealedIds
        : [...prev.revealedIds, id],
    }));
  }, []);

  const setActiveQuestion = useCallback((id: string | null) => {
    setState((prev) => ({ ...prev, activeQuestionId: id }));
  }, []);

  const resetGame = useCallback(() => {
    clearGameState();
    setState({ revealedIds: [], activeQuestionId: null });
  }, []);

  const reloadGameData = useCallback(() => {
    setGameData(loadGameData());
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameData,
        revealedIds: state.revealedIds,
        activeQuestionId: state.activeQuestionId,
        revealQuestion,
        setActiveQuestion,
        resetGame,
        isGameComplete,
        reloadGameData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
