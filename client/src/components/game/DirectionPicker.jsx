function DirectionPicker({ starter, direction }) {
  const isClockwise = direction === "clockwise";

  return (
    <div className="w-full rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center">
      <h2 className="mb-6 text-2xl font-bold text-white">Discussion Starts</h2>

      <div className="mb-6">
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Starting Player
        </p>

        <h3 className="mt-2 text-3xl font-black text-indigo-400">{starter}</h3>
      </div>

      <div>
        <p className="text-sm uppercase tracking-wider text-slate-400">
          Direction
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="text-4xl">{isClockwise ? "➡️" : "⬅️"}</span>

          <span className="text-2xl font-semibold text-white">
            {isClockwise ? "Clockwise" : "Counterclockwise"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DirectionPicker;
