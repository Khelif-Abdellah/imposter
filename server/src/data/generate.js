import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoriesFolder = path.join(__dirname, "categories");
const output = {};

const files = fs.readdirSync(categoriesFolder);

for (const file of files) {
  if (!file.endsWith(".json")) continue;

  const categoryName = path.basename(file, ".json");

  const raw = JSON.parse(
    fs.readFileSync(path.join(categoriesFolder, file), "utf8")
  );

  output[categoryName] = raw.map(([en, ar, hintEn, hintAr]) => ({
    word: {
      en,
      ar,
    },
    hint: {
      en: hintEn,
      ar: hintAr,
    },
  }));
}

fs.writeFileSync(
  path.join(__dirname, "words.json"),
  JSON.stringify(output, null, 2),
  "utf8"
);

console.log("✅ words.json generated successfully!");
