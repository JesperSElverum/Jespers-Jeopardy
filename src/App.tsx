import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
