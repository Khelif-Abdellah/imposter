import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SettingsForm } from "../../components/forms";

import useGame from "../../hooks/useGame";
import { getCategories } from "../../services/api";
import { Loading } from "../../components/ui";

function Settings() {
  const navigate = useNavigate();

  const { setSettings } = useGame();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();

        console.log(data);

        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  function handleSubmit(settings) {
    setSettings(settings);

    navigate("/players");
  }

  if (loading) {
    return (
      <section className="flex min-h-[calc(100vh-128px)] items-center justify-center">
        <Loading />
      </section>
    );
  }

  return (
    <section className="flex min-h-[calc(100vh-128px)] items-center justify-center px-6 py-10">
      <SettingsForm categories={categories} onSubmit={handleSubmit} />
    </section>
  );
}

export default Settings;
