import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-4 text-6xl font-black tracking-widest text-white">
          IMPOSTER
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-lg text-slate-400">
          A fun party game where everyone knows the secret word... except the
          impostor. Can you discover who is pretending?
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => navigate("/settings")}
            className="w-64 py-4 text-lg"
          >
            ▶ Play
          </Button>
          <Button variant="secondary" className="w-64 py-4 text-lg">
            📖 How To Play
          </Button>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          Made with ❤️ by Khelif Abdellah
        </p>
      </div>
    </section>
  );
}

export default Home;
