import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone, Float } from "@react-three/drei";
import * as THREE from "three";
import { STATION_POS } from "../journey";

const CYAN = "#5ef0ff";
const TARGET_SIZE = 15;

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
  const { scene } = useGLTF("/space_station/scene.gltf");
  const spinner = useRef();

  const { normScale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const center = new THREE.Vector3();
    box.getCenter(center);
    return { normScale: TARGET_SIZE / maxDim, offset: center.multiplyScalar(-1) };
  }, [scene]);

  useFrame((_state, delta) => {
    if (spinner.current) spinner.current.rotation.y += delta * 0.05;
  });

  return (
    <group position={STATION_POS} rotation={[0.3, 0, 0.15]}>
      <group ref={spinner} scale={normScale}>
        <group position={offset}>
          <Clone object={scene} />
        </group>
      </group>

      <HoloPanel position={[6, 3, 3]} rotation={[0, -0.7, 0]} />
      <HoloPanel position={[-6.2, 1.6, 3.4]} rotation={[0, 0.6, 0]} scale={0.8} />
      <HoloPanel position={[1, 4.6, 4.2]} rotation={[-0.3, 0, 0]} scale={0.65} />

      <hemisphereLight args={["#dfeaff", "#241542", 1.1]} />
      <directionalLight color="#ffffff" intensity={3.2} position={[6, 8, 12]} />
      <directionalLight color="#ffffff" intensity={2.2} position={[-3, 2, 14]} />
      <directionalLight color="#9fc0ff" intensity={1.4} position={[-8, -2, 4]} />
      <pointLight color={CYAN} intensity={28} distance={40} position={[2, 4, 10]} />
      <pointLight color="#ffd9a0" intensity={14} distance={36} position={[10, 5, 6]} />
    </group>
  );
};

useGLTF.preload("/space_station/scene.gltf");

export default Station;
