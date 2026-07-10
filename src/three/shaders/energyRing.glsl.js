export const energyRingVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const energyRingFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uTime;
uniform float uSpeed;
uniform float uIntensity;
varying vec2 vUv;

void main() {
  float flow = fract(vUv.x * 3.0 - uTime * uSpeed);
  float pulse = smoothstep(0.0, 0.15, flow) * smoothstep(0.55, 0.15, flow);
  float base = 0.18;
  float energy = base + pulse * uIntensity;
  gl_FragColor = vec4(uColor * energy, energy);
}
`;
