import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import CameraRig from "./CameraRig";
import SpaceBackdrop from "./environment/SpaceBackdrop";
import Ship from "./hero/Ship";
import Station from "./about/Station";
import Constellation from "./experience/Constellation";
import PlanetSystem from "./work/PlanetSystem";
import CommsPlanet from "./contact/CommsPlanet";

const Scene = () => {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        willChange: "transform",
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.6, 7.5], fov: 50, near: 0.1, far: 400 }}
        gl={{ antialias: true, powerPreference: "default", stencil: false }}
        frameloop="always"
      >
        <color attach="background" args={["#05040c"]} />
        <fog attach="fog" args={["#05040c", 60, 240]} />

        <ambientLight intensity={0.28} />
        <hemisphereLight args={["#9fb4ff", "#1b1035", 0.4]} />
        <directionalLight position={[10, 12, 8]} intensity={0.7} color="#cfe0ff" />

        <Suspense fallback={null}>
          <SpaceBackdrop />
          <Ship />
          <Station />
          <Constellation />
          <PlanetSystem />
          <CommsPlanet />
          <Preload all />
        </Suspense>

        <CameraRig />
      </Canvas>
    </div>
  );
};

export default Scene;
