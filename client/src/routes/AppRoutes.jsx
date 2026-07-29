import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import Settings from "../pages/Settings/Settings";
import Players from "../pages/Players/Players";
import Reveal from "../pages/Reveal/Reveal";
import Discussion from "../pages/Discussion/Discussion";
import Result from "../pages/Result/Result";
import HowToPlay from "../pages/HowToPlay/HowToPlay";
import NotFound from "../pages/NotFound/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Main Pages */}
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="players" element={<Players />} />
        <Route path="reveal" element={<Reveal />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="result" element={<Result />} />
        <Route path="/how-to-play" element={<HowToPlay />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
