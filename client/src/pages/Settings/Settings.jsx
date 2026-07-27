import { useNavigate } from "react-router-dom";

import { SettingsForm } from "../../components/forms";
import useGame from "../../hooks/useGame";

function Settings() {
  const navigate = useNavigate();

  const { setSettings } = useGame();

  // Categories will come from the backend later.
  // For now we hardcode them.
  const categories = [
    "All",
    "Movies",
    "Food",
    "Football",
    "Animals",
    "Countries",
    "Jobs",
    "Cars",
    "Brands",
    "Games",
  ];

  function handleSubmit(settings) {
    setSettings(settings);

    navigate("/players");
  }

  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-6 py-10">
      <SettingsForm categories={categories} onSubmit={handleSubmit} />
    </section>
  );
}

export default Settings;
