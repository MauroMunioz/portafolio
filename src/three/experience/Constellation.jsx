import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { CONSTELLATION_POS } from "../journey";
import { useSceneStore } from "../../store/scene-store";

const CYAN = "#5ef0ff";

const StarNode = ({ position, index }) => {
  const core = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 0.8 + Math.sin(t * 1.8 + index * 1.3) * 0.35;
    core.current.scale.setScalar(pulse);
  });

  return (
    <group position={position}>
      <mesh ref={core}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color="#eaf6ff" />
      </mesh>
      <pointLight color={CYAN} intensity={1.2} distance={4} />
    </group>
  );
};

const Constellation = ({ nodes = 6 }) => {
  const group = useRef();

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < nodes; i++) {
      const angle = (i / nodes) * Math.PI * 1.6 - Math.PI * 0.4;
      pts.push([
        Math.cos(angle) * (3 + (i % 2) * 1.4),
        Math.sin(angle * 1.3) * 2.2 + (i % 3) * 0.7,
        (i % 2 === 0 ? 1 : -1) * (0.8 + i * 0.15),
      ]);
    }
    return pts;
  }, [nodes]);

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.03;
    const { activeSection, sectionProgress } = useSceneStore.getState();
    const reveal =
      activeSection === "experience"
        ? sectionProgress
        : activeSection === "work" || activeSection === "contact"
        ? 1
        : 0;
    group.current.children.forEach((child, i) => {
      if (child.userData.isNode) {
        child.visible = i / group.current.children.length <= reveal + 0.2;
      }
    });
  });

  return (
    <group ref={group} position={CONSTELLATION_POS}>
      <Line
        points={points}
        color={CYAN}
        lineWidth={1}
        transparent
        opacity={0.4}
        dashed
        dashScale={2}
      />
      {points.map((p, i) => (
        <group key={i} userData={{ isNode: true }}>
          <StarNode position={p} index={i} />
        </group>
      ))}
      <Sparkles count={40} scale={[10, 7, 5]} size={1.6} speed={0.4} color={CYAN} />
    </group>
  );
};

export default Constellation;
