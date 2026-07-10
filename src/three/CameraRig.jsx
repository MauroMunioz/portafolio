import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { easing } from "maath";
import { useSceneStore } from "../store/scene-store";
import {
  journeyPoint,
  SHIP_LEAD,
  COMMS_PLANET_POS,
  WORK_CAM_POS,
  WORK_LOOK,
} from "./journey";

const commsParkPos = new THREE.Vector3(
  COMMS_PLANET_POS[0] - 6,
  COMMS_PLANET_POS[1] + 2,
  COMMS_PLANET_POS[2] + 13
);
const commsLook = new THREE.Vector3(
  COMMS_PLANET_POS[0] - 4,
  COMMS_PLANET_POS[1],
  COMMS_PLANET_POS[2]
);
const workParkPos = new THREE.Vector3(...WORK_CAM_POS);
const workLook = new THREE.Vector3(...WORK_LOOK);

const CameraRig = () => {
  const camPos = useRef(new THREE.Vector3(0, 1.4, 8));
  const lookTarget = useRef(new THREE.Vector3());
  const smoothedLook = useRef(new THREE.Vector3());
  const shake = useRef(0);

  useFrame((state, delta) => {
    const { globalProgress, transmission, activeSection } =
      useSceneStore.getState();

    if (activeSection === "contact") {
      camPos.current.copy(commsParkPos);
      lookTarget.current.copy(commsLook);
    } else if (activeSection === "work") {
      camPos.current.copy(workParkPos);
      lookTarget.current.copy(workLook);
    } else {
      journeyPoint(globalProgress, camPos.current);
      camPos.current.y += 1.4;
      journeyPoint(Math.min(globalProgress + SHIP_LEAD, 1), lookTarget.current);
    }

    camPos.current.x += state.pointer.x * 0.8;
    camPos.current.y += state.pointer.y * 0.4;

    if (transmission === "sending") {
      shake.current = Math.min(shake.current + delta * 2, 1);
    } else {
      shake.current = Math.max(shake.current - delta * 2, 0);
    }
    if (shake.current > 0) {
      const now = state.clock.elapsedTime;
      camPos.current.x += Math.sin(now * 33) * 0.06 * shake.current;
      camPos.current.y += Math.cos(now * 29) * 0.06 * shake.current;
    }

    easing.damp3(state.camera.position, camPos.current, 0.35, delta);
    easing.damp3(smoothedLook.current, lookTarget.current, 0.4, delta);
    state.camera.lookAt(smoothedLook.current);
  });

  return null;
};

export default CameraRig;
