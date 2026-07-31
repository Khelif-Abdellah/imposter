import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui";

function LeaveGameModal({ isOpen, onStay, onLeave }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onStay}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <div
            className="
              fixed
              left-1/2
              top-1/2
              z-50
              w-[92%]
              max-w-md
              -translate-x-1/2
              -translate-y-1/2
            "
          >
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-slate-900/90
                p-8
                shadow-2xl
                backdrop-blur-xl
              "
            >
              {/* Glow */}
              <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl" />

              <div className="relative">
                {/* Icon */}
                <div
                  className="
                    mx-auto
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/15
                    text-5xl
                  "
                >
                  ⚠️
                </div>

                {/* Title */}
                <h2 className="mt-6 text-center text-3xl font-black text-white">
                  Leave Game?
                </h2>

                {/* Description */}
                <p className="mt-5 text-center leading-7 text-slate-300">
                  Your current game will be lost if you leave now.
                </p>

                <p
                  dir="rtl"
                  className="mt-3 text-center leading-7 text-slate-400"
                >
                  ستفقد اللعبة الحالية إذا غادرت الآن.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-4">
                  <Button
                    onClick={onStay}
                    className="w-full py-4 text-lg font-bold"
                  >
                    🛡 Stay in Game
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={onLeave}
                    className="
                      w-full
                      border-red-500/30
                      bg-red-500/10
                      py-4
                      text-lg
                      text-red-300
                      hover:bg-red-500/20
                    "
                  >
                    🚪 Leave Game
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default LeaveGameModal;
