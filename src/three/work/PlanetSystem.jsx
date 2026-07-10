import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GltfPlanet from "../GltfPlanet";
import { WORK_PLANET_POS } from "../journey";
import { projects } from "../../constants";
import { useSceneStore } from "../../store/scene-store";

const PALETTES = [
  { glowColor: "#5ef0ff", ringColor: null },
  { glowColor: "#ff8a3d", ringColor: "#ff8a3d" },
  { glowColor: "#9fb4ff", ringColor: null },
  { glowColor: "#7dffc4", ringColor: null },
  { glowColor: "#c49fff", ringColor: "#c49fff" },
];

const PlanetSystem = () => {
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const group = useRef();
  const scaleGroup = useRef();
  const ringRef = useRef();
  const hover = useRef(false);
  const idxRef = useRef(0);
  const shown = useRef(0);
  const pushedRef = useRef(-2);

  const handleOver = (e) => {
    e.stopPropagation();
    if (!group.current?.visible) return;
    hover.current = true;
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    hover.current = false;
    document.body.style.cursor = "auto";
  };

  useFrame((_state, delta) => {
    const { activeSection, sectionProgress } = useSceneStore.getState();
    const inWork = activeSection === "work";

    const idx = inWork
      ? Math.min(count - 1, Math.max(0, Math.floor(sectionProgress * count)))
      : idxRef.current;

    if (idx !== idxRef.current) {
      idxRef.current = idx;
      setIndex(idx);
    }

    const desiredFocus = inWork ? idx : -1;
    if (desiredFocus !== pushedRef.current) {
      pushedRef.current = desiredFocus;
      useSceneStore.getState().setFocusedProject(desiredFocus);
    }

    const targetShown = inWork ? 1 : 0;
    shown.current = THREE.MathUtils.damp(shown.current, targetShown, 5, delta);
    group.current.visible = shown.current > 0.01;

    const boost = hover.current ? 0.15 : 0;
    scaleGroup.current.scale.setScalar(shown.current + boost);

    if (ringRef.current) {
      const ring = PALETTES[idx].ringColor;
      ringRef.current.visible = !!ring;
      if (ring) ringRef.current.material.color.set(ring);
    }
  });

  return (
    <group
      ref={group}
      position={WORK_PLANET_POS}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
    >
      <group ref={scaleGroup}>
        <GltfPlanet
          radius={3.4}
          glowColor={PALETTES[index].glowColor}
          glowIntensity={0.85}
          spin={0.06}
          hoverRef={hover}
        />
        <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0.2, 0]} visible={false}>
          <torusGeometry args={[3.4 * 1.9, 0.06, 8, 90]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
};

export default PlanetSystem;
