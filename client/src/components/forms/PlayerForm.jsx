import { useEffect, useState } from "react";
import { Button, Input } from "../ui";
import { validatePlayers } from "../../utils/validators";

function PlayerForm({ playersCount = 4, onSubmit }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  // Create empty inputs whenever the number of players changes
  useEffect(() => {
    setPlayers(Array(playersCount).fill(""));
  }, [playersCount]);

  function handleChange(index, value) {
    const updatedPlayers = [...players];

    updatedPlayers[index] = value;

    setPlayers(updatedPlayers);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedPlayers = players.map((player) => player.trim());

    const validation = validatePlayers(trimmedPlayers);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onSubmit(trimmedPlayers);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-slate-900 p-8 shadow-xl"
    >
      <h2 className="text-center text-3xl font-bold text-white">Players</h2>

      {players.map((player, index) => (
        <div key={index}>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Player {index + 1}
          </label>

          <Input
            autoComplete="off"
            maxLength={20}
            value={player}
            placeholder={`Enter Player ${index + 1} Name`}
            onChange={(event) => handleChange(index, event.target.value)}
          />
        </div>
      ))}

      {error && (
        <p className="rounded-lg bg-red-500/10 p-3 text-center text-red-400">
          {error}
        </p>
      )}

      <Button type="submit" fullWidth>
        Start Game
      </Button>
    </form>
  );
}

export default PlayerForm;
