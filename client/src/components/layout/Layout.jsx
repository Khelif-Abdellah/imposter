import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./Header";

import AudioToggle from "../audio/AudioToggle";
import PageTransition from "../animations/PageTransition";

function Layout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <AudioToggle />
    </div>
  );
}

export default Layout;
