export const nebulaVertex = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const nebulaFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uOpacity;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.05;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = vUv * 3.0;
  float n = fbm(p + fbm(p + uTime * 0.02));
  float mask = smoothstep(0.35, 0.8, n);
  float edge = smoothstep(0.0, 0.45, vUv.x) * smoothstep(1.0, 0.55, vUv.x) *
               smoothstep(0.0, 0.45, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
  vec3 color = mix(uColorA, uColorB, n);
  gl_FragColor = vec4(color, mask * edge * uOpacity);
}
`;
