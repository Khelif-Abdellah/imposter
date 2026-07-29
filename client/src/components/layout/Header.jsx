import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import LeaveGameModal from "../ui/LeaveGameModal";
import useGame from "../../hooks/useGame";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { gameStarted, resetGame } = useGame();

  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Pages where leaving should require confirmation
  const protectedRoutes = ["/reveal", "/discussion"];

  const shouldConfirm = gameStarted && protectedRoutes.includes(pathname);

  function handleLogoClick(e) {
    if (!shouldConfirm) return;

    e.preventDefault();
    setShowLeaveModal(true);
  }

  function handleStay() {
    setShowLeaveModal(false);
  }

  function handleLeave() {
    resetGame();
    setShowLeaveModal(false);
    navigate("/");
  }

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900 shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            onClick={handleLogoClick}
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

      <LeaveGameModal
        isOpen={showLeaveModal}
        onStay={handleStay}
        onLeave={handleLeave}
      />
    </>
  );
}

export default Header;
