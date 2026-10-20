import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// GPU particle sphere for the hero: points on a Fibonacci sphere, displaced by
// 3D simplex noise in the vertex shader, tilted toward the cursor.

const NOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
      i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
      i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uIntro;
  uniform vec3 uPointer;
  uniform float uScatter;
  attribute float aRandom;
  varying float vNoise;
  varying float vDepth;
  varying float vFade;
  ${NOISE}
  void main() {
    vec3 dir = normalize(position);
    float n = snoise(dir * 1.4 + vec3(uTime * 0.12));
    float n2 = snoise(dir * 3.2 - vec3(uTime * 0.2));
    // Bulge toward the cursor direction
    float pull = pow(max(dot(dir, normalize(uPointer)), 0.0), 6.0) * 0.35 * length(uPointer.xy);
    float radius = (1.0 + n * 0.22 + n2 * 0.06 + pull) * uIntro;
    // Scroll-driven dispersal: each particle drifts along its own random direction
    vec3 drift = normalize(vec3(aRandom - 0.5, fract(aRandom * 13.73) - 0.5, fract(aRandom * 71.37) - 0.5));
    vec3 pos = dir * radius * (1.0 + uScatter * 0.6) + drift * uScatter * (1.5 + aRandom * 2.5);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.6 + aRandom * 0.8) * (1.0 / -mv.z);
    vNoise = n;
    vDepth = smoothstep(-4.2, -1.8, mv.z);
    vFade = 1.0 - uScatter * 0.85;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vNoise;
  varying float vDepth;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.1, d);
    vec3 color = mix(uColorB, uColorA, smoothstep(-0.1, 0.55, vNoise));
    gl_FragColor = vec4(color, alpha * uOpacity * (0.25 + vDepth * 0.75) * vFade);
  }
`;

function readColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    accent: new THREE.Color(s.getPropertyValue('--accent').trim() || '#ff6a2b'),
    base: new THREE.Color(s.getPropertyValue('--heading').trim() || '#fafafa'),
    dark: document.documentElement.dataset.theme !== 'light',
  };
}

export default function HeroScene({ ready = true }) {
  const mountRef = useRef(null);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const small = window.matchMedia('(max-width: 768px)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
    camera.position.z = 4.2;

    // Fibonacci sphere
    const count = small ? 5000 : 11000;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      positions.set([Math.cos(theta) * r, y, Math.sin(theta) * r], i * 3);
      randoms[i] = Math.random();
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    const colors = readColors();
    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: (small ? 16 : 20) * renderer.getPixelRatio() },
      uIntro: { value: 0 },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uScatter: { value: 0 },
      uColorA: { value: colors.accent },
      uColorB: { value: colors.base },
      uOpacity: { value: colors.dark ? 0.85 : 0.55 },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: colors.dark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const sphere = new THREE.Points(geometry, material);

    // Thin orbit ring for depth
    const ringCount = small ? 600 : 1400;
    const ringPos = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const a = (i / ringCount) * Math.PI * 2;
      const rr = 1.6 + (Math.random() - 0.5) * 0.1;
      ringPos.set([Math.cos(a) * rr, (Math.random() - 0.5) * 0.04, Math.sin(a) * rr], i * 3);
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3));
    const ringMat = new THREE.PointsMaterial({ size: 0.012, color: colors.base, transparent: true, opacity: 0.22, depthWrite: false });
    const ring = new THREE.Points(ringGeo, ringMat);
    ring.rotation.set(1.15, 0, 0.35);

    const group = new THREE.Group();
    group.add(sphere, ring);
    scene.add(group);

    // Layout: sphere sits right of the headline on wide screens, top-right on phones
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const wide = w >= 1024;
      group.position.set(wide ? 1.15 * camera.aspect * 0.55 : 0.75, wide ? 0.25 : 0.95, 0);
      group.scale.setScalar(wide ? 0.8 : 0.62);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer → rotation + bulge (smoothed in the loop)
    const target = { x: 0, y: 0 };
    const onPointer = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Follow theme changes
    const mo = new MutationObserver(() => {
      const c = readColors();
      uniforms.uColorA.value = c.accent;
      uniforms.uColorB.value = c.base;
      uniforms.uOpacity.value = c.dark ? 0.85 : 0.55;
      material.blending = c.dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      material.needsUpdate = true;
      ringMat.color = c.base;
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Only render while visible
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(mount);

    const timer = new THREE.Timer();
    const pointer = { x: 0, y: 0 };
    let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      timer.update();
      if (!visible || document.hidden) return;
      const dt = Math.min(timer.getDelta(), 0.05);
      const t = timer.getElapsed();
      pointer.x += (target.x - pointer.x) * 0.05;
      pointer.y += (target.y - pointer.y) * 0.05;
      uniforms.uTime.value = t;
      if (readyRef.current) uniforms.uIntro.value += (1 - uniforms.uIntro.value) * 0.035;
      const scatter = Math.min(window.scrollY / (mount.clientHeight * 0.9), 1);
      uniforms.uScatter.value += (scatter - uniforms.uScatter.value) * 0.08;
      uniforms.uPointer.value.set(pointer.x, pointer.y, 0.6);
      sphere.rotation.y += dt * 0.08;
      group.rotation.x = pointer.y * 0.25;
      group.rotation.y = pointer.x * 0.35;
      ring.rotation.z += dt * 0.05;
      renderer.render(scene, camera);
    };
    tick();
    requestAnimationFrame(() => mount.classList.add('ready'));

    return () => {
      cancelAnimationFrame(raf);
      timer.dispose();
      ro.disconnect();
      mo.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
}
