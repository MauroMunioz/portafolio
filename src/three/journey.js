import * as THREE from "three";

export const JOURNEY_LENGTH = 170;
export const SHIP_LEAD = 0.05;

export function journeyPoint(t, target = new THREE.Vector3()) {
  const c = Math.max(0, Math.min(1, t));
  const z = 8 - c * JOURNEY_LENGTH;
  const x = Math.sin(c * Math.PI * 1.8) * 2.1;
  const y = Math.sin(c * Math.PI * 1.4 + 0.5) * 1.0;
  return target.set(x, y, z);
}

const place = (t, ox, oy, oz) =>
  journeyPoint(t, new THREE.Vector3())
    .add(new THREE.Vector3(ox, oy, oz))
    .toArray();

export const STATION_T = 0.18;
export const CONSTELLATION_T = 0.4;
export const COMMS_T = 0.92;

export const STATION_POS = place(STATION_T, 11, 3, 0);
export const CONSTELLATION_POS = place(CONSTELLATION_T, -12, 5, 0);
export const COMMS_PLANET_POS = place(COMMS_T, 7, 0.5, 0);

export const WORK_PLANET_POS = [4, 0, -60];
export const WORK_CAM_POS = [-4, 2, -46];
export const WORK_LOOK = [0.5, 0, -60];
