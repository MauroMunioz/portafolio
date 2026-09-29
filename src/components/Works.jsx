import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { getProjects } from "../constants";
import { textVariant } from "../utils/motion";
import { useSceneStore } from "../store/scene-store";
import { translations } from "../constants/i18n";
import { useLanguageStore } from "../store/language-store";
import ConfirmModal from "./ConfirmModal";

const ShipIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2 L19 20 L12 16 L5 20 Z" />
  </svg>
);

const getHostname = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

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
  const [preview, setPreview] = useState(null);
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
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-auto z-20">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPlanet(i, projects.length)}
              aria-label={t.goToPlanet(i + 1)}
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

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/50 p-4 sm:p-8 pointer-events-auto"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="glass-panel w-full h-full max-w-5xl flex flex-col overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-signal-cyan/15 bg-black-200/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-engine-amber/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-signal-cyan/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary/50" />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-black-200/70 border border-signal-cyan/15 rounded-full px-3 py-1.5 min-w-0">
                  <ShipIcon className="w-3.5 h-3.5 text-signal-cyan shrink-0" />
                  <span className="hud-label text-[10px] text-secondary truncate">
                    {getHostname(preview.link)}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={preview.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hud-label text-[10px] text-secondary hover:text-signal-cyan transition-colors whitespace-nowrap"
                  >
                    {t.openNewTab}
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    aria-label={t.close}
                    className="hud-label text-signal-cyan hover:text-ion-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                src={preview.link}
                title={preview.name}
                className="w-full flex-1 bg-black-200"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmModal
        open={!!pendingDemo}
        title={pendingDemo ? tConfirm.demo.title(pendingDemo.name) : ""}
        message={tConfirm.demo.message}
        confirmLabel={tConfirm.demo.confirm}
        cancelLabel={tConfirm.cancel}
        onCancel={() => setPendingDemo(null)}
        onConfirm={() => {
          setPreview(pendingDemo);
          setPendingDemo(null);
        }}
      />
    </>
  );
};

export default SectionWrapper(Works, "work", "sticky top-0 !justify-start pt-28");
