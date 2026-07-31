import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Loading from "../components/ui/Loading";

const Home = lazy(() => import("../pages/Home/Home"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Players = lazy(() => import("../pages/Players/Players"));
const Reveal = lazy(() => import("../pages/Reveal/Reveal"));
const Discussion = lazy(() => import("../pages/Discussion/Discussion"));
const Result = lazy(() => import("../pages/Result/Result"));
const HowToPlay = lazy(() => import("../pages/HowToPlay/HowToPlay"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="players" element={<Players />} />
          <Route path="reveal" element={<Reveal />} />
          <Route path="discussion" element={<Discussion />} />
          <Route path="result" element={<Result />} />
          <Route path="how-to-play" element={<HowToPlay />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
