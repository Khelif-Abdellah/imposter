function Loading({ message = "Loading...", fullScreen = false }) {
  const containerClass = fullScreen
    ? "flex min-h-screen items-center justify-center px-6"
    : "flex w-full items-center justify-center py-10";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-5">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

        {/* Message */}
        <p className="text-center text-slate-400">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
