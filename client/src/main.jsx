import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { GameProvider } from "./context/GameContext";
import { AudioProvider } from "./context/AudioContext";

import PerformanceMonitor from "./components/PerformanceMonitor";

import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <GameProvider>
          <PerformanceMonitor />
          <App />
        </GameProvider>
      </AudioProvider>
    </BrowserRouter>
  </React.StrictMode>
);
