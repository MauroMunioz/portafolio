import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { technologies } from "../constants";
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";

// Estrellas de Sagitario (el "teapot") proyectadas a 2D, ajustadas al panel:
// mu, lambda, phi, sigma, xi2, omicron, pi, tau, zeta, delta, gamma, epsilon, eta
const NODES = [
  { x: 22, y: 12 },
  { x: 38, y: 31 },
  { x: 59, y: 38 },
  { x: 71, y: 36 },
  { x: 74, y: 12 },
  { x: 83, y: 16 },
  { x: 88, y: 12 },
  { x: 84, y: 42 },
  { x: 80, y: 51 },
  { x: 30, y: 51 },
  { x: 12, y: 54 },
  { x: 34, y: 72 },
  { x: 27, y: 82 },
];

const LABELS = [
  "HTML",
  "CSS",
  "JS",
  "TS",
  "React",
  "Redux",
  "Tailwind",
  "Node",
  "MongoDB",
  "Three.js",
  "Git",
  "Figma",
  "Docker",
];

const EDGES = [
  [10, 9],
  [9, 1],
  [9, 11],
  [11, 8],
  [8, 7],
  [7, 3],
  [3, 2],
  [2, 1],
  [2, 8],
  [1, 0],
  [3, 4],
  [4, 5],
  [5, 6],
  [11, 12],
];

const Corner = ({ className }) => (
  <span
    className={`pointer-events-none absolute w-5 h-5 border-signal-cyan/50 ${className}`}
  />
);

const Tech = () => {
  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.1, 0.7)}
      className="relative mx-auto w-full max-w-5xl pointer-events-auto"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        perspective={1400}
        scale={1.01}
        transitionSpeed={1400}
        glareEnable
        glareMaxOpacity={0.12}
        glareColor="#5ef0ff"
        glarePosition="all"
        glareBorderRadius="24px"
        className="relative rounded-3xl border border-signal-cyan/25 bg-void/90 backdrop-blur-xl overflow-hidden shadow-[0_0_60px_rgba(94,240,255,0.1)] [transform-style:preserve-3d]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="tech-nebula absolute inset-0" />
          <div className="tech-starfield absolute inset-0 opacity-80" />
          <div className="tech-starfield-color absolute inset-0" />
          <span className="tech-comet" />
          <span className="tech-comet tech-comet--amber" />
        </div>

        <Corner className="top-0 left-0 border-t-2 border-l-2 rounded-tl-3xl" />
        <Corner className="top-0 right-0 border-t-2 border-r-2 rounded-tr-3xl" />
        <Corner className="bottom-0 left-0 border-b-2 border-l-2 rounded-bl-3xl" />
        <Corner className="bottom-0 right-0 border-b-2 border-r-2 rounded-br-3xl" />

        <div className="flex flex-wrap items-end justify-between gap-4 px-6 sm:px-8 pt-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-signal-cyan hud-blink" />
              <span className="hud-label">Onboard Systems</span>
            </div>
            <h2 className="text-ion-white font-black text-[34px] sm:text-[46px] leading-none mt-3">
              Instruments.
            </h2>
            <p className="mt-2 text-secondary text-[13px] max-w-md">
              Cada estrella es una tecnología de mi arsenal.
            </p>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan hud-blink" />
            <span className="hud-label text-[9px] text-secondary">
              All systems online
            </span>
          </div>
        </div>

        <div className="mt-5 mx-6 sm:mx-8 h-px bg-gradient-to-r from-signal-cyan/40 to-transparent" />

        <div
          className="relative h-[330px] sm:h-[380px] m-3 sm:m-5"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,240,255,0.07),transparent_60%)]" />

          <svg
            className="absolute inset-0 w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={`${NODES[a].x}%`}
                y1={`${NODES[a].y}%`}
                x2={`${NODES[b].x}%`}
                y2={`${NODES[b].y}%`}
                stroke="#5ef0ff"
                strokeWidth="1"
                strokeOpacity="0.5"
                className="tech-link"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </svg>

          {technologies.map((tech, i) => {
            const node = NODES[i] ?? { x: 50, y: 50 };
            return (
              <div
                key={tech.name}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className="tech-star grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#eaf6ff]/95 border border-signal-cyan/60 transition-transform duration-300 group-hover:scale-125 group-hover:border-signal-cyan"
                  style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                >
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                  />
                </div>
                <span className="mt-1.5 text-[10px] font-semibold tracking-wide text-ion-white whitespace-nowrap">
                  {LABELS[i] ?? tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </Tilt>
    </motion.div>
  );
};

export default SectionWrapper(Tech, "");
