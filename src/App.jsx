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
      </div>
    </BrowserRouter>
  );
};

export default App;
