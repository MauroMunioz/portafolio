import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Trail } from "@react-three/drei";
import * as THREE from "three";
import * as random from "maath/random";
import { nebulaVertex, nebulaFragment } from "../shaders/nebula.glsl";
import { useSceneStore } from "../../store/scene-store";
import { JOURNEY_LENGTH } from "../journey";

const STREAK_COUNT = 400;

const Warp = () => {
  const ref = useRef();
  const speed = useRef(0);
  const prev = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const seeds = useMemo(() => {
    const arr = [];
    for (let i = 0; i < STREAK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 16;
      arr.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 10 - Math.random() * (JOURNEY_LENGTH + 20),
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const g = useSceneStore.getState().globalProgress;
    const inst = Math.abs(g - prev.current) / Math.max(delta, 0.0001);
    prev.current = g;
    speed.current = THREE.MathUtils.damp(
      speed.current,
      Math.min(inst, 4),
      6,
      delta
    );

    const stretch = 0.3 + speed.current * 26;
    const cam = state.camera.position;

    for (let i = 0; i < STREAK_COUNT; i++) {
      const s = seeds[i];
      dummy.position.set(cam.x * 0.6 + s.x, cam.y * 0.6 + s.y, s.z);
      dummy.scale.set(0.03, 0.03, stretch);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.material.opacity = Math.min(0.15 + speed.current * 0.5, 0.8);
  });

  return (
    <instancedMesh ref={ref} args={[null, null, STREAK_COUNT]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color="#bfe9ff"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

const StarLayer = ({ count, radius, size, color, speed }) => {
  const ref = useRef();
  const positions = useMemo(
    () => random.inSphere(new Float32Array(count * 3), { radius }),
    [count, radius]
  );

  useFrame((_state, delta) => {
    ref.current.rotation.y -= delta * speed;
    ref.current.rotation.x -= delta * speed * 0.4;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const NebulaPlane = ({ position, rotation, scale, colorA, colorB, opacity }) => {
  const material = useRef();
  const uniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uTime: { value: 0 },
      uOpacity: { value: opacity },
    }),
    [colorA, colorB, opacity]
  );

  useFrame((state) => {
    material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={material}
        vertexShader={nebulaVertex}
        fragmentShader={nebulaFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const Comet = () => {
  const ref = useRef();
  const state = useRef({ t: Math.random() * 20 });

  useFrame((_frame, delta) => {
    const s = state.current;
    s.t += delta;
    if (s.t > 14) {
      s.t = 0;
      s.startY = 20 + Math.random() * 15;
      s.startX = -60 + Math.random() * 40;
      s.z = -60 - Math.random() * 60;
    }
    const progress = s.t / 4;
    if (progress <= 1 && s.startY !== undefined) {
      ref.current.visible = true;
      ref.current.position.set(
        s.startX + progress * 120,
        s.startY - progress * 30,
        s.z
      );
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <Trail width={1.6} length={8} color="#9fd8ff" attenuation={(t) => t * t}>
      <mesh ref={ref} visible={false}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#eaf6ff" />
      </mesh>
    </Trail>
  );
};

const SpaceBackdrop = () => {
  return (
    <group>
      <StarLayer count={3000} radius={120} size={0.35} color="#eaf6ff" speed={0.004} />
      <StarLayer count={2000} radius={80} size={0.22} color="#9fd8ff" speed={0.007} />
      <StarLayer count={1200} radius={50} size={0.12} color="#c9b8ff" speed={0.011} />

      <NebulaPlane
        position={[-45, 20, -110]}
        rotation={[0, 0.4, 0]}
        scale={[140, 90, 1]}
        colorA="#1b1035"
        colorB="#3a1e6d"
        opacity={0.55}
      />
      <NebulaPlane
        position={[55, -15, -130]}
        rotation={[0, -0.5, 0.3]}
        scale={[160, 100, 1]}
        colorA="#101c3a"
        colorB="#1e4a6d"
        opacity={0.45}
      />
      <NebulaPlane
        position={[0, 40, -160]}
        rotation={[0.2, 0, 0.1]}
        scale={[200, 80, 1]}
        colorA="#241040"
        colorB="#5ef0ff"
        opacity={0.12}
      />

      <Comet />
      <Comet />

      <Warp />
    </group>
  );
};

export default SpaceBackdrop;
