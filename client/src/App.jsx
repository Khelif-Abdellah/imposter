import AppRoutes from "./routes/AppRoutes";
import AnimatedBackground from "./components/effects/AnimatedBackground";
import FloatingParticles from "./components/effects/FloatingParticles";

function App() {
  return (
    <>
      <AnimatedBackground />
      <FloatingParticles />
      <AppRoutes />
    </>
  );
}

export default App;
