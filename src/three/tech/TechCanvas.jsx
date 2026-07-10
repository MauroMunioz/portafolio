import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import { technologies } from "../../constants";

const TechBall = ({ icon, position }) => {
  const [decal] = useTexture([icon]);

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.2} position={position}>
      <mesh castShadow receiveShadow scale={1.35}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          metalness={0.15}
          roughness={0.5}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const TechCanvas = () => {
  const layout = useMemo(() => {
    const perRow = 7;
    const spacingX = 2.6;
    const spacingY = 3;
    return technologies.map((tech, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const rowCount = Math.min(perRow, technologies.length - row * perRow);
      const x = (col - (rowCount - 1) / 2) * spacingX;
      const y = -row * spacingY + 1.5;
      return { ...tech, position: [x, y, 0] };
    });
  }, []);

  return (
    <Canvas
      className="!touch-none"
      camera={{ position: [0, -1, 30], fov: 30 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 8]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-6, -2, 4]} intensity={0.6} color="#5ef0ff" />
      <pointLight position={[0, 0, 10]} intensity={40} distance={30} color="#cfe0ff" />
      <Suspense fallback={null}>
        {layout.map((tech) => (
          <TechBall key={tech.name} icon={tech.icon} position={tech.position} />
        ))}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default TechCanvas;
