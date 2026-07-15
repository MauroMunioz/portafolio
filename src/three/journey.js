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

export const STATION_CAM_POS = [
  STATION_POS[0] - 1.5,
  STATION_POS[1] + 0.5,
  STATION_POS[2] + 11,
];
export const STATION_LOOK = [
  STATION_POS[0] - 4,
  STATION_POS[1] - 0.5,
  STATION_POS[2],
];

export const WORK_PLANET_POS = [4, 0, -60];
export const WORK_CAM_POS = [-4, 2, -46];
export const WORK_LOOK = [0.5, 0, -60];

export const SHIP_ANCHORS = {
  about: { pos: [7.5, 2.5, -15], look: STATION_POS },
  work: { pos: [-5, -2.5, -59], look: WORK_PLANET_POS },
  contact: {
    pos: [COMMS_PLANET_POS[0] - 7, COMMS_PLANET_POS[1] - 0.5, COMMS_PLANET_POS[2] + 6],
    look: COMMS_PLANET_POS,
  },
};
