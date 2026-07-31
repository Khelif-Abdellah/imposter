import { useNavigate } from "react-router-dom";

import { Button } from "../../components/ui";

function HowToPlay() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: "🎯",
      title: "Goal",
      en: "Find the Imposter before the discussion ends. The Imposter must blend in without revealing their identity.",
      ar: "اكتشف المحتال قبل نهاية النقاش. يجب على المحتال أن يندمج مع الآخرين دون كشف هويته.",
    },
    {
      icon: "👥",
      title: "Setup",
      en: "Each player secretly receives a role. Most players receive the same secret word, while the Imposter receives only a hint or nothing depending on the settings.",
      ar: "يحصل كل لاعب سراً على دوره. يحصل معظم اللاعبين على نفس الكلمة السرية، بينما يحصل المحتال على تلميح فقط أو لا يحصل على شيء حسب الإعدادات.",
    },
    {
      icon: "🎭",
      title: "Roles",
      en: "Citizens know the secret word. The Imposter does not know it and must guess by listening carefully.",
      ar: "يعرف اللاعبون العاديون الكلمة السرية، بينما لا يعرفها المحتال ويحاول تخمينها من خلال الاستماع.",
    },
    {
      icon: "🗣️",
      title: "Discussion",
      en: "Take turns describing the secret word without saying it directly. Avoid giving clues that are too obvious.",
      ar: "يتحدث اللاعبون بالتناوب عن الكلمة السرية دون ذكرها مباشرة، مع تجنب إعطاء تلميحات واضحة جداً.",
    },
    {
      icon: "🗳️",
      title: "Vote",
      en: "After the discussion, everyone votes for the player they believe is the Imposter.",
      ar: "بعد انتهاء النقاش، يصوت الجميع للاعب الذي يعتقدون أنه المحتال.",
    },
    {
      icon: "🏆",
      title: "Winning",
      en: "Citizens win if they correctly identify the Imposter. The Imposter wins if they avoid suspicion or correctly guess the secret word.",
      ar: "يفوز اللاعبون إذا اكتشفوا المحتال. ويفوز المحتال إذا نجا من التصويت أو تمكن من تخمين الكلمة السرية.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="text-7xl">📖</div>

          <h1 className="mt-4 bg-linear-to-r from-white via-indigo-200 to-white bg-clip-text text-5xl font-black text-transparent">
            How To Play
          </h1>

          <p className="mt-3 text-lg text-slate-400">
            Learn the rules in less than one minute.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-3xl">
                  {section.icon}
                </div>

                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm uppercase tracking-widest text-indigo-300">
                    English
                  </p>

                  <p className="mt-2 leading-7 text-slate-200">{section.en}</p>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-sm uppercase tracking-widest text-indigo-300">
                    العربية
                  </p>

                  <p
                    dir="rtl"
                    className="mt-2 leading-8 text-right text-slate-200"
                  >
                    {section.ar}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            className="min-w-52 py-4 text-lg"
            onClick={() => navigate(-1)}
          >
            ← Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
