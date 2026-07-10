import { motion, AnimatePresence } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant } from "../utils/motion";
import { useSceneStore } from "../store/scene-store";

const scrollToPlanet = (i, count) => {
  const el = document.querySelector('[data-scene="work"]');
  if (!el) return;
  const slot = (i + 0.5) / count;
  const target = el.offsetTop + slot * el.offsetHeight - window.innerHeight * 0.5;
  window.scrollTo({ top: target, behavior: "smooth" });
};

const Works = () => {
  const focused = useSceneStore((s) => s.focusedProject);
  const active = useSceneStore((s) => s.activeSection);
  const project = focused >= 0 ? projects[focused] : null;

  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
          <span className="hud-label">Planetary Survey</span>
        </div>
        <h2 className="text-ion-white font-black text-[40px] sm:text-[52px] leading-none mt-3">
          Projects.
        </h2>
      </motion.div>

      <div className="mt-6 min-h-[240px] max-w-[420px]">
        <AnimatePresence mode="wait">
          {project ? (
            <motion.div
              key={focused}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="glass-panel holo-pulse p-5 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <span className="hud-label text-signal-cyan">
                  Planet {String(focused + 1).padStart(2, "0")}
                </span>
                <span className="hud-label text-[9px] text-secondary">
                  {focused + 1} / {projects.length}
                </span>
              </div>
              <h3 className="text-ion-white font-bold text-[24px] mt-2">
                {project.name}
              </h3>
              <p className="mt-2 text-secondary text-[13px] leading-[20px]">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="hud-label text-[10px] px-2 py-1 rounded border border-signal-cyan/25"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 pt-4"
            >
              <span className="hud-line w-16" />
              <span className="hud-label text-[9px] text-engine-amber hud-blink">
                Scanning orbit — approach a planet
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {active === "work" && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-auto z-20">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPlanet(i, projects.length)}
              aria-label={`Go to planet ${i + 1}`}
              className="group flex items-center gap-2"
            >
              <span
                className={`hud-label text-[9px] transition-opacity ${
                  focused === i ? "opacity-80" : "opacity-0 group-hover:opacity-60"
                }`}
              >
                {projects[i]?.name}
              </span>
              <span
                className={`w-3 h-3 rounded-full border transition-all ${
                  focused === i
                    ? "bg-signal-cyan border-signal-cyan scale-125 shadow-glow"
                    : "border-secondary/50 group-hover:border-signal-cyan"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default SectionWrapper(Works, "work", "sticky top-0 !justify-start pt-28");
