import type { GameData, GameState } from "../types";
import { defaultGameData } from "./defaultData";

const GAME_DATA_KEY = "jeopardy-game-data";
const GAME_STATE_KEY = "jeopardy-game-state";

export function saveGameData(data: GameData): void {
  localStorage.setItem(GAME_DATA_KEY, JSON.stringify(data));
}

export function loadGameData(): GameData {
  const stored = localStorage.getItem(GAME_DATA_KEY);
  if (stored) {
    return JSON.parse(stored) as GameData;
  }
  return defaultGameData;
}

export function saveGameState(state: GameState): void {
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
}

export function loadGameState(): GameState {
  const stored = localStorage.getItem(GAME_STATE_KEY);
  if (stored) {
    return JSON.parse(stored) as GameState;
  }
  return { revealedIds: [], activeQuestionId: null };
}

export function clearGameState(): void {
  localStorage.removeItem(GAME_STATE_KEY);
}

export function exportToJSON(data: GameData): string {
  return JSON.stringify(data, null, 2);
}

export function importFromJSON(json: string): GameData {
  return JSON.parse(json) as GameData;
}
