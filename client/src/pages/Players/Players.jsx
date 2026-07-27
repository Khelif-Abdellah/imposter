import { useNavigate } from "react-router-dom";

import { PlayerForm } from "../../components/forms";

import useGame from "../../hooks/useGame";

import { generateGame } from "../../utils/gameGenerator";

// Temporary data (later fetched from backend)
const words = [
  {
    word: "Titanic",
    hint: "Ship",
  },
  {
    word: "Avatar",
    hint: "Blue",
  },
  {
    word: "Batman",
    hint: "Hero",
  },
  {
    word: "Interstellar",
    hint: "Space",
  },
];

function Players() {
  const navigate = useNavigate();

  const { settings, setPlayers, setGame, setGameStarted } = useGame();

  function handleSubmit(players) {
    // Save player names
    setPlayers(players);

    // Generate the game
    const game = generateGame(settings, players, words);

    // Save generated game
    setGame(game);

    // Mark game as started
    setGameStarted(true);

    // Go to Reveal page
    navigate("/reveal");
  }

  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-6 py-10">
      <PlayerForm
        playersCount={settings.playersCount}
        onSubmit={handleSubmit}
      />
    </section>
  );
}

export default Players;
