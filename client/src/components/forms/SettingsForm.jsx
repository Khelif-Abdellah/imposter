import { useState } from "react";
import { Button, Select } from "../ui";
import { validateSettings } from "../../utils/validators";

function SettingsForm({ categories = [], onSubmit }) {
  const [formData, setFormData] = useState({
    playersCount: 4,
    impostersCount: 1,
    category: "",
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
      className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-2xl bg-slate-900 p-8 shadow-xl"
    >
      <h2 className="text-center text-3xl font-bold text-white">
        Game Settings
      </h2>

      {/* Number of Players */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Number of Players
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

      {/* Number of Imposters */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Number of Imposters
        </label>

        <Select
          name="impostersCount"
          value={formData.impostersCount}
          onChange={handleChange}
          options={Array.from({ length: 5 }, (_, index) => ({
            value: index + 1,
            label: `${index + 1} Imposter${index > 0 ? "s" : ""}`,
          }))}
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">
          Category
        </label>

        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            {
              value: "",
              label: "Select a category",
            },
            ...categories.map((category) => ({
              value: category,
              label: category,
            })),
          ]}
        />
      </div>

      {/* Hint */}
      <div className="flex items-center justify-between rounded-xl border border-slate-700 p-4">
        <div>
          <p className="font-medium text-white">Give a Hint to the Imposter</p>

          <p className="text-sm text-slate-400">
            The imposter will receive a hint instead of the secret word.
          </p>
        </div>

        <input
          type="checkbox"
          name="useHint"
          checked={formData.useHint}
          onChange={handleChange}
          className="h-5 w-5 accent-indigo-600"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-500/10 p-3 text-center text-red-400">
          {error}
        </p>
      )}

      <Button type="submit" fullWidth>
        Next
      </Button>
    </form>
  );
}

export default SettingsForm;
