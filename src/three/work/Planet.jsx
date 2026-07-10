import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import GltfPlanet from "../GltfPlanet";

const Planet = ({
  position,
  radius = 2,
  glowColor,
  awakeRef,
  ringColor,
  spin = 0.05,
}) => {
  const scaleGroup = useRef();
  const hover = useRef(false);

  const handleOver = (e) => {
    e.stopPropagation();
    if (!scaleGroup.current?.visible) return;
    hover.current = true;
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    hover.current = false;
    document.body.style.cursor = "auto";
  };

  useFrame((_state, delta) => {
    const awake = awakeRef?.current ?? 1;
    if (scaleGroup.current) {
      const boost = hover.current ? 0.12 : 0;
      const target = 0.2 + awake * 0.8 + boost;
      scaleGroup.current.scale.setScalar(
        THREE.MathUtils.damp(scaleGroup.current.scale.x, target, 6, delta)
      );
      scaleGroup.current.visible = awake > 0.06;
      if (!scaleGroup.current.visible) hover.current = false;
    }
  });

  return (
    <group position={position} onPointerOver={handleOver} onPointerOut={handleOut}>
      <group ref={scaleGroup}>
        <GltfPlanet
          radius={radius}
          glowColor={glowColor}
          glowIntensity={0.8}
          spin={spin}
          hoverRef={hover}
        />

        {ringColor && (
          <mesh rotation={[Math.PI / 2.6, 0.2, 0]}>
            <torusGeometry args={[radius * 1.9, 0.05, 8, 80]} />
            <meshBasicMaterial color={ringColor} transparent opacity={0.5} />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default Planet;
