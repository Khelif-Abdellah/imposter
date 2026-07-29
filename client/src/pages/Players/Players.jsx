import { useNavigate } from "react-router-dom";

import { PlayerForm } from "../../components/forms";

import useGame from "../../hooks/useGame";

import { generateGame } from "../../services/api";

function Players() {
  const navigate = useNavigate();

  const {
    settings,
    setPlayers,
    setGame,
    setGameStarted,
    setCurrentPlayerIndex,
  } = useGame();

  async function handleSubmit(players) {
    try {
      // Save player names
      setPlayers(players);

      console.log({
        players,
        categories: settings.categories,
        impostersCount: settings.impostersCount,
        useHint: settings.useHint,
      });

      // Generate game from the backend
      const game = await generateGame({
        players,
        categories: settings.categories,
        impostersCount: settings.impostersCount,
        useHint: settings.useHint,
      });

      // Save generated game
      setGame(game);

      // Reset reveal progress
      setCurrentPlayerIndex(0);

      // Mark game as started
      setGameStarted(true);

      // Navigate to reveal page
      navigate("/reveal");
    } catch (error) {
      console.error("Failed to generate game:", error);

      alert(
        error.response?.data?.message ||
          "Unable to generate the game. Please try again."
      );
    }
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
