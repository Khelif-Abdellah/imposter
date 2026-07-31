import {
  createContext,
  useCallback,
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

const STORAGE_KEY = "imposter-audio-muted";

export function AudioProvider({ children }) {
  const [muted, setMuted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? false;
    } catch {
      return false;
    }
  });

  const backgroundAudio = useRef(null);
  const flipAudio = useRef(null);
  const gameEndAudio = useRef(null);

  const getAudios = useCallback(
    () => [backgroundAudio.current, flipAudio.current, gameEndAudio.current],
    []
  );

  useEffect(() => {
    backgroundAudio.current = new Audio(backgroundMusic);
    backgroundAudio.current.loop = true;
    backgroundAudio.current.volume = 0.25;
    backgroundAudio.current.preload = "auto";

    flipAudio.current = new Audio(cardFlipSound);
    flipAudio.current.preload = "auto";

    gameEndAudio.current = new Audio(gameEndSound);
    gameEndAudio.current.preload = "auto";

    return () => {
      getAudios().forEach((audio) => {
        if (!audio) return;

        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      });
    };
  }, [getAudios]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(muted));

    getAudios().forEach((audio) => {
      if (audio) {
        audio.muted = muted;
      }
    });
  }, [muted, getAudios]);

  const playEffect = useCallback(
    (audioRef) => {
      if (muted) return;

      const audio = audioRef.current;

      if (!audio) return;

      audio.currentTime = 0;

      audio.play().catch(() => {});
    },
    [muted]
  );

  const playBackground = useCallback(() => {
    if (muted) return;

    const audio = backgroundAudio.current;

    if (!audio) return;

    audio.play().catch(() => {});
  }, [muted]);

  const stopBackground = useCallback(() => {
    const audio = backgroundAudio.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const resetBackground = useCallback(() => {
    const audio = backgroundAudio.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const playFlip = useCallback(() => {
    playEffect(flipAudio);
  }, [playEffect]);

  const playGameEnd = useCallback(() => {
    playEffect(gameEndAudio);
  }, [playEffect]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

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
    [
      muted,
      toggleMute,
      playBackground,
      stopBackground,
      resetBackground,
      playFlip,
      playGameEnd,
    ]
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);

  if (!context) {
    throw new Error("useAudioContext must be used inside AudioProvider.");
  }

  return context;
}
