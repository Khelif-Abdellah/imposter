import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-8xl font-black text-indigo-500">404</h1>

        <h2 className="mt-4 text-4xl font-bold text-white">Page Not Found</h2>

        <p className="mx-auto mt-4 max-w-md text-slate-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-10 flex justify-center">
          <Button onClick={() => navigate("/")}>🏠 Back to Home</Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
