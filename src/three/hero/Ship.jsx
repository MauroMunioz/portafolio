import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { journeyPoint, SHIP_LEAD } from "../journey";
import { useSceneStore } from "../../store/scene-store";

const CYAN = "#5ef0ff";
const AMBER = "#ff8a3d";
const TARGET_SIZE = 5.5;

const Ship = () => {
  const { scene } = useGLTF("/halcon/scene.gltf");
  const group = useRef();
  const pos = useRef(new THREE.Vector3());
  const ahead = useRef(new THREE.Vector3());
  const aim = useMemo(() => new THREE.Object3D(), []);

  const { normScale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const center = new THREE.Vector3();
    box.getCenter(center);
    return { normScale: TARGET_SIZE / maxDim, offset: center.multiplyScalar(-1) };
  }, [scene]);

  useFrame((state, delta) => {
    const { globalProgress: g, activeSection } = useSceneStore.getState();
    const hidden = activeSection === "contact" || activeSection === "work";
    group.current.visible = !hidden;
    if (hidden) return;

    const t = Math.min(g + SHIP_LEAD, 1);
    journeyPoint(t, pos.current);
    journeyPoint(Math.min(t + 0.03, 1), ahead.current);

    const hover = Math.sin(state.clock.elapsedTime * 0.9) * 0.14;
    pos.current.y += hover;

    group.current.position.lerp(pos.current, 0.1);

    aim.position.copy(pos.current);
    aim.lookAt(ahead.current);
    const turn = ahead.current.x - pos.current.x;
    aim.rotateZ(-turn * 0.25);
    aim.rotateX(0.05);
    easing.dampQ(group.current.quaternion, aim.quaternion, 0.4, delta);
  });

  return (
    <group ref={group}>
      <group scale={normScale} rotation={[0, Math.PI, 0]}>
        <group position={offset}>
          <Clone object={scene} />
        </group>
      </group>
      <pointLight position={[3, 4, -3]} color="#dfeeff" intensity={70} distance={22} />
      <pointLight position={[-3, 1, 2]} color="#5ea0ff" intensity={30} distance={16} />
      <pointLight position={[0, 0, 3]} color={AMBER} intensity={6} distance={8} />
      <pointLight position={[0, 1.5, 0]} color={CYAN} intensity={3} distance={9} />
    </group>
  );
};

useGLTF.preload("/halcon/scene.gltf");

export default Ship;
