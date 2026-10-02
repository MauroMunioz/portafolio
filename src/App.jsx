import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { translations } from "./constants/i18n";
import { useLanguageStore } from "./store/language-store";

const Scene = lazy(() => import("./three/Scene"));

const App = () => {
  useScrollProgress();
  const language = useLanguageStore((s) => s.language);
  const t = translations[language].footer;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <BrowserRouter>
      <Analytics />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <div className="relative z-10 pointer-events-none">
        <Navbar />
        <div data-scene="hero">
          <Hero />
        </div>
        <div data-scene="about">
          <About />
          <Tech />
        </div>
        <div data-scene="experience" className="min-h-[120vh]">
          <Experience />
        </div>
        <div data-scene="work" className="min-h-[240vh]">
          <Works />
        </div>
        <div data-scene="contact">
          <Contact />
        </div>
        <footer className="pointer-events-auto px-6 pb-10 pt-2 text-center">
          <p className="hud-label text-[8px] text-secondary/50 leading-[1.9]">
            {t.credit} —{" "}
            <a
              href="https://sketchfab.com/3d-models/star-wars-halcon-milenario-d2be38faf4124fb9839853bedce5bcce"
              target="_blank"
              rel="noreferrer"
              className="hover:text-signal-cyan"
            >
              {t.halcon}
            </a>{" "}
            {t.by} albertomarun,{" "}
            <a
              href="https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70"
              target="_blank"
              rel="noreferrer"
              className="hover:text-signal-cyan"
            >
              {t.planet}
            </a>{" "}
            {t.by} cmzw,{" "}
            <a
              href="https://sketchfab.com/3d-models/space-station-3-a7a6ad10261149cab31aa394bfcf8940"
              target="_blank"
              rel="noreferrer"
              className="hover:text-signal-cyan"
            >
              {t.station}
            </a>{" "}
            {t.by} re1monsen.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
