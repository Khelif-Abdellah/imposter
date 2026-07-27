function ProgressBar({ current = 1, total = 1 }) {
  const percentage = (current / total) * 100;

  return (
    <div className="mx-auto mb-8 w-full max-w-md">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">
          Player {current} of {total}
        </span>

        <span className="text-sm font-semibold text-indigo-400">
          {Math.round(percentage)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
