import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { STATION_POS } from "../journey";

const HULL = "#232840";
const CYAN = "#5ef0ff";

const HoloPanel = ({ position, rotation, scale = 1 }) => {
  const mat = useRef();

  useFrame((state) => {
    mat.current.opacity =
      0.28 + Math.sin(state.clock.elapsedTime * 1.5 + position[0] * 2) * 0.12;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[1.4, 0.9]} />
        <meshBasicMaterial ref={mat} color={CYAN} transparent side={2} />
      </mesh>
    </Float>
  );
};

const Station = () => {
  const ring = useRef();
  const inner = useRef();

  useFrame((_state, delta) => {
    ring.current.rotation.z += delta * 0.08;
    inner.current.rotation.y += delta * 0.15;
  });

  return (
    <group position={STATION_POS}>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[4.2, 0.28, 12, 64]} />
        <meshStandardMaterial
          color={HULL}
          metalness={0.8}
          roughness={0.3}
          emissive={CYAN}
          emissiveIntensity={0.12}
        />
      </mesh>

      <group ref={inner}>
        <mesh>
          <cylinderGeometry args={[0.7, 0.7, 2.6, 16]} />
          <meshStandardMaterial color={HULL} metalness={0.75} roughness={0.35} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.55, 16, 16]} />
          <meshStandardMaterial
            color="#0e2b3a"
            emissive={CYAN}
            emissiveIntensity={0.6}
            metalness={0.4}
            roughness={0.2}
          />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i * Math.PI) / 2) * 1.6,
              0,
              Math.sin((i * Math.PI) / 2) * 1.6,
            ]}
            rotation={[0, -(i * Math.PI) / 2, 0]}
          >
            <boxGeometry args={[0.06, 1.1, 1.8]} />
            <meshStandardMaterial
              color={HULL}
              metalness={0.7}
              roughness={0.4}
              emissive={CYAN}
              emissiveIntensity={0.2}
            />
          </mesh>
        ))}
      </group>

      <HoloPanel position={[3.2, 1.4, 1.6]} rotation={[0, -0.7, 0]} />
      <HoloPanel position={[-3.4, 0.8, 2.0]} rotation={[0, 0.6, 0]} scale={0.8} />
      <HoloPanel position={[0.6, 2.6, 2.6]} rotation={[-0.3, 0, 0]} scale={0.65} />

      <pointLight color={CYAN} intensity={6} distance={16} position={[0, 2, 3]} />
      <pointLight color="#3a1e6d" intensity={4} distance={20} position={[-4, -2, -2]} />
    </group>
  );
};

export default Station;
