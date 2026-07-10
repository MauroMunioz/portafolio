import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import { COMMS_PLANET_POS } from "../journey";
import { useSceneStore } from "../../store/scene-store";

const CYAN = "#5ef0ff";
const RADIUS = 4;

const TransmissionBeam = () => {
  const beam = useRef();
  const progress = useRef(0);

  useFrame((_state, delta) => {
    const { transmission } = useSceneStore.getState();
    if (transmission === "sent") {
      progress.current = Math.min(progress.current + delta * 0.9, 1);
    } else if (transmission === "idle") {
      progress.current = Math.max(progress.current - delta * 2, 0);
    }
    const p = progress.current;
    beam.current.visible = p > 0.01;
    beam.current.scale.set(1, p * 26, 1);
    beam.current.position.y = RADIUS + p * 13;
    beam.current.material.opacity = p < 0.9 ? 0.85 : 0.85 * (1 - (p - 0.9) * 6);
  });

  return (
    <mesh ref={beam} visible={false}>
      <cylinderGeometry args={[0.09, 0.16, 1, 12]} />
      <meshBasicMaterial color={CYAN} transparent opacity={0.85} />
    </mesh>
  );
};

const CommsPlanet = () => {
  const { scene } = useGLTF("/planet/scene.gltf");
  const spinner = useRef();
  const group = useRef();

  useFrame((_state, delta) => {
    if (spinner.current) spinner.current.rotation.y += delta * 0.08;
    const { activeSection } = useSceneStore.getState();
    if (group.current) group.current.visible = activeSection !== "work";
  });

  return (
    <group ref={group} position={COMMS_PLANET_POS}>
      <group ref={spinner} scale={RADIUS}>
        <Clone object={scene} />
      </group>

      <TransmissionBeam />

      <hemisphereLight args={["#ffffff", "#1b1035", 0.6]} />
      <pointLight color="#ffffff" intensity={12} distance={40} position={[8, 6, 10]} />
      <pointLight color={CYAN} intensity={6} distance={30} position={[-8, -4, -6]} />
    </group>
  );
};

useGLTF.preload("/planet/scene.gltf");

export default CommsPlanet;
