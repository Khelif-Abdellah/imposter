import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white transition hover:text-indigo-400"
        >
          IMPOSTER
        </Link>

        <span className="text-sm text-slate-400">
          Made by{" "}
          <span className="font-semibold text-white">Khelif Abdellah</span>
        </span>
      </div>
    </header>
  );
}

export default Header;
