import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
} from "./components";
import Scene from "./three/Scene";
import { useScrollProgress } from "./hooks/useScrollProgress";

const App = () => {
  useScrollProgress();

  return (
    <BrowserRouter>
      <Scene />
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
            Modelos 3D bajo CC BY 4.0 —{" "}
            <a
              href="https://sketchfab.com/3d-models/star-wars-halcon-milenario-d2be38faf4124fb9839853bedce5bcce"
              target="_blank"
              rel="noreferrer"
              className="hover:text-signal-cyan"
            >
              Halcon Milenario
            </a>{" "}
            por albertomarun,{" "}
            <a
              href="https://sketchfab.com/3d-models/stylized-planet-789725db86f547fc9163b00f302c3e70"
              target="_blank"
              rel="noreferrer"
              className="hover:text-signal-cyan"
            >
              Stylized planet
            </a>{" "}
            por cmzw,{" "}
            <a
              href="https://sketchfab.com/3d-models/space-station-3-a7a6ad10261149cab31aa394bfcf8940"
              target="_blank"
              rel="noreferrer"
              className="hover:text-signal-cyan"
            >
              Space Station 3
            </a>{" "}
            por re1monsen.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
