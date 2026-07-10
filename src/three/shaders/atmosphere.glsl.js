export const atmosphereVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const atmosphereFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uIntensity;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5);
  gl_FragColor = vec4(uColor, fresnel * uIntensity);
}
`;

export const planetVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vViewDir;

void main() {
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vNormal = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPos.xyz);
  vPos = position;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

export const planetFragment = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uGlowColor;
uniform float uTime;
uniform float uAwake;
varying vec3 vNormal;
varying vec3 vPos;
varying vec3 vViewDir;

float hash(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash(i);
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));
  return mix(
    mix(mix(n000, n100, f.x), mix(n010, n110, f.x), f.y),
    mix(mix(n001, n101, f.x), mix(n011, n111, f.x), f.y),
    f.z
  );
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  float bands = fbm(vPos * 2.2 + vec3(0.0, uTime * 0.02, 0.0));
  float detail = fbm(vPos * 6.0 - vec3(uTime * 0.015));
  vec3 surface = mix(uColorA, uColorB, smoothstep(0.25, 0.75, bands + detail * 0.35));

  float light = max(dot(vNormal, normalize(vec3(0.6, 0.4, 0.8))), 0.0);
  surface *= 0.25 + light * 0.9;

  float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.0);
  surface += uGlowColor * fresnel * (0.5 + uAwake * 0.9);

  float nightSide = 1.0 - smoothstep(0.0, 0.35, light);
  float cityNoise = step(0.82, noise(vPos * 22.0));
  surface += uGlowColor * cityNoise * nightSide * uAwake * 0.9;

  gl_FragColor = vec4(surface, 1.0);
}
`;
