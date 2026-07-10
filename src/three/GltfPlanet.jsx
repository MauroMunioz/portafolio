import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import * as THREE from "three";
import { atmosphereVertex, atmosphereFragment } from "./shaders/atmosphere.glsl";

const GltfPlanet = ({
  radius = 2.5,
  glowColor = "#5ef0ff",
  glowIntensity = 0.7,
  spin = 0.05,
  tilt = 0.35,
  hoverRef,
}) => {
  const { scene } = useGLTF("/planet/scene.gltf");
  const spinner = useRef();

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(glowColor) },
      uIntensity: { value: glowIntensity },
    }),
    []
  );
  const targetColor = useMemo(() => new THREE.Color(glowColor), [glowColor]);

  useFrame((_state, delta) => {
    const boost = hoverRef?.current ? 1 : 0;
    if (spinner.current) {
      spinner.current.rotation.y += delta * spin * (1 + boost * 3.5);
    }
    atmosphereUniforms.uColor.value.lerp(targetColor, 0.08);
    atmosphereUniforms.uIntensity.value = THREE.MathUtils.damp(
      atmosphereUniforms.uIntensity.value,
      glowIntensity * (1 + boost * 1.1),
      7,
      delta
    );
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={spinner} scale={radius}>
        <Clone object={scene} />
      </group>

      <mesh scale={radius * 1.18}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload("/planet/scene.gltf");

export default GltfPlanet;
