import { useState } from "react";
import { Button, Select } from "../ui";
import { validateSettings } from "../../utils/validators";

function SettingsForm({ categories = [], onSubmit }) {
  const [formData, setFormData] = useState({
    playersCount: 4,
    impostersCount: 1,
    category: "All",
    useHint: true,
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validation = validateSettings({
      ...formData,
      playersCount: Number(formData.playersCount),
      impostersCount: Number(formData.impostersCount),
    });

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onSubmit({
      ...formData,
      playersCount: Number(formData.playersCount),
      impostersCount: Number(formData.impostersCount),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mx-auto
        w-full
        max-w-2xl
        rounded-3xl
        border
        border-slate-800
        bg-slate-900/80
        backdrop-blur-xl
        p-6
        shadow-2xl
        sm:p-10
      "
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-400">
          Game Setup
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          Configure Your Match
        </h2>

        <p className="mx-auto mt-4 max-w-md leading-7 text-slate-400">
          Choose your game settings before revealing the secret word.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* Players */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold tracking-wide text-slate-300">
            👥 Number of Players
          </label>

          <Select
            name="playersCount"
            value={formData.playersCount}
            onChange={handleChange}
            options={Array.from({ length: 17 }, (_, index) => ({
              value: index + 4,
              label: `${index + 4} Players`,
            }))}
          />
        </div>

        {/* Imposters */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold tracking-wide text-slate-300">
            🕵 Number of Imposters
          </label>

          <Select
            name="impostersCount"
            value={formData.impostersCount}
            onChange={handleChange}
            options={Array.from({ length: 5 }, (_, index) => ({
              value: index + 1,
              label: `${index + 1} Imposter${index ? "s" : ""}`,
            }))}
          />
        </div>

        {/* Category */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold tracking-wide text-slate-300">
            📂 Secret Word Category
          </label>

          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              {
                value: "All",
                label: "Random Category",
              },
              ...categories.map((category) => ({
                value: category,
                label: category,
              })),
            ]}
          />
        </div>

        {/* Hint */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-6
            rounded-2xl
            border
            border-slate-700
            bg-slate-800/40
            p-6
          "
        >
          <div>
            <h3 className="font-semibold text-white">💡 Enable Hint</h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              The imposter receives a small clue instead of the secret word.
            </p>
          </div>

          <input
            type="checkbox"
            name="useHint"
            checked={formData.useHint}
            onChange={handleChange}
            className="
              h-6
              w-6
              cursor-pointer
              accent-indigo-600
            "
          />
        </div>

        {/* Error */}
        {error && (
          <div
            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              px-4
              py-3
              text-center
              text-sm
              font-medium
              text-red-400
            "
          >
            {error}
          </div>
        )}

        {/* Button */}
        <div className="pt-2">
          <Button type="submit" fullWidth className="py-4 text-lg font-bold">
            Continue →
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SettingsForm;
