function PlayerCard({ name, index, role, active = false }) {
  return (
    <div
      className={`
          flex items-center justify-between
          rounded-2xl border p-4
          transition-all duration-200
          ${
            active
              ? "border-indigo-500 bg-indigo-500/10"
              : "border-slate-700 bg-slate-900"
          }
        `}
    >
      <div className="flex items-center gap-4">
        {index && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
            {index}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>

          {active && <p className="text-sm text-indigo-400">Current Player</p>}
        </div>
      </div>

      {role && (
        <span
          className={`
              rounded-full px-3 py-1 text-sm font-semibold
              ${
                role === "imposter"
                  ? "bg-red-600 text-white"
                  : "bg-green-600 text-white"
              }
            `}
        >
          {role === "imposter" ? "😈 Imposter" : "🙂 Player"}
        </span>
      )}
    </div>
  );
}

export default PlayerCard;
