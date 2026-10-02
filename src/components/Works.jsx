import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { getProjects } from "../constants";
import { textVariant } from "../utils/motion";
import { useSceneStore } from "../store/scene-store";
import { translations } from "../constants/i18n";
import { useLanguageStore } from "../store/language-store";
import ConfirmModal from "./ConfirmModal";

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
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].works;
  const tConfirm = translations[language].confirm;
  const projects = getProjects(language);
  const project = focused >= 0 ? projects[focused] : null;
  const [pendingDemo, setPendingDemo] = useState(null);

  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
          <span className="hud-label">{t.badge}</span>
        </div>
        <h2 className="text-ion-white font-black text-[40px] sm:text-[52px] leading-none mt-3">
          {t.heading}
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
              className="glass-panel holo-pulse p-5 rounded-xl pointer-events-auto"
            >
              <div className="flex items-center justify-between">
                <span className="hud-label text-signal-cyan">
                  {t.planet} {String(focused + 1).padStart(2, "0")}
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
              {project.live_demo_link ? (
                <button
                  type="button"
                  onClick={() =>
                    setPendingDemo({
                      name: project.name,
                      link: project.live_demo_link,
                    })
                  }
                  className="hud-label mt-4 inline-flex items-center gap-2 text-signal-cyan hover:text-ion-white transition-colors"
                >
                  {t.viewLive}
                </button>
              ) : (
                <span className="hud-label mt-4 inline-block text-[10px] text-secondary/60">
                  {project.demo_note ?? t.defaultNote}
                </span>
              )}
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
                {t.scanning}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {active === "work" && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-auto z-20 max-sm:top-auto max-sm:bottom-24 max-sm:right-1/2 max-sm:translate-x-1/2 max-sm:translate-y-0 max-sm:flex-row max-sm:gap-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPlanet(i, projects.length)}
              aria-label={t.goToPlanet(i + 1)}
              className="group flex items-center gap-2"
            >
              <span
                className={`hud-label text-[9px] transition-opacity max-sm:hidden ${
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

      <ConfirmModal
        open={!!pendingDemo}
        title={pendingDemo ? tConfirm.demo.title(pendingDemo.name) : ""}
        message={tConfirm.demo.message}
        confirmLabel={tConfirm.demo.confirm}
        cancelLabel={tConfirm.cancel}
        onCancel={() => setPendingDemo(null)}
        onConfirm={() => {
          window.open(pendingDemo.link, "_blank", "noopener,noreferrer");
          setPendingDemo(null);
        }}
      />
    </>
  );
};

export default SectionWrapper(Works, "work", "sticky top-0 !justify-start pt-28");
