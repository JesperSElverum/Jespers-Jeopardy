export interface Question {
  id: string;
  question: string;
  answer: string;
  points: number;
}

export interface Category {
  id: string;
  name: string;
  questions: Question[];
}

export interface GameData {
  title: string;
  categories: Category[];
}

export interface GameState {
  revealedIds: string[];
  activeQuestionId: string | null;
}
