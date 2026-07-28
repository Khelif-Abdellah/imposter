import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import backgroundMusic from "../assets/sounds/music/background.mp3";

import cardFlipSound from "../assets/sounds/effects/card-flip.mp3";

import gameEndSound from "../assets/sounds/effects/game-end.wav";

const AudioContext = createContext(null);

function AudioProvider({ children }) {
  // ----------------------------------------
  // State
  // ----------------------------------------

  const [muted, setMuted] = useState(false);

  // ----------------------------------------
  // Audio References
  // ----------------------------------------

  const backgroundAudio = useRef(null);
  const flipAudio = useRef(null);
  const gameEndAudio = useRef(null);

  // ----------------------------------------
  // Initialize Audio
  // ----------------------------------------

  useEffect(() => {
    backgroundAudio.current = new Audio(backgroundMusic);
    backgroundAudio.current.loop = true;
    backgroundAudio.current.volume = 0.25;

    flipAudio.current = new Audio(cardFlipSound);

    gameEndAudio.current = new Audio(gameEndSound);

    return () => {
      [
        backgroundAudio.current,
        flipAudio.current,
        gameEndAudio.current,
      ].forEach((audio) => {
        if (!audio) return;

        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  // ----------------------------------------
  // Helpers
  // ----------------------------------------

  function playEffect(audioRef) {
    if (muted || !audioRef.current) return;

    audioRef.current.currentTime = 0;

    audioRef.current.play().catch(() => {});
  }

  // ----------------------------------------
  // Background Music
  // ----------------------------------------

  function playBackground() {
    if (muted || !backgroundAudio.current) return;

    backgroundAudio.current.play().catch(() => {});
  }

  function stopBackground() {
    if (!backgroundAudio.current) return;

    backgroundAudio.current.pause();
    backgroundAudio.current.currentTime = 0;
  }

  function resetBackground() {
    if (!backgroundAudio.current) return;

    backgroundAudio.current.pause();
    backgroundAudio.current.currentTime = 0;
  }

  // ----------------------------------------
  // Sound Effects
  // ----------------------------------------

  function playFlip() {
    playEffect(flipAudio);
  }

  function playGameEnd() {
    playEffect(gameEndAudio);
  }

  // ----------------------------------------
  // Mute
  // ----------------------------------------

  useEffect(() => {
    [backgroundAudio.current, flipAudio.current, gameEndAudio.current].forEach(
      (audio) => {
        if (audio) {
          audio.muted = muted;
        }
      }
    );
  }, [muted]);

  function toggleMute() {
    setMuted((previous) => !previous);
  }

  // ----------------------------------------
  // Context Value
  // ----------------------------------------

  const value = useMemo(
    () => ({
      muted,

      toggleMute,

      playBackground,
      stopBackground,
      resetBackground,

      playFlip,
      playGameEnd,
    }),
    [muted]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

function useAudioContext() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudioContext must be used inside AudioProvider.");
  }

  return context;
}

export { AudioProvider, useAudioContext };
