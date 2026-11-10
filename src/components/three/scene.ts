import * as THREE from "three";

/**
 * "Business in motion" - one particle cloud that re-forms into what the software does:
 *   0 sphere   – your whole business, connected
 *   1 coins    – sales at the counter
 *   2 boxes    – stock in the warehouse
 *   3 bars     – reports and numbers
 *   4 network  – branches and growth
 * Every particle carries its position in all five shapes; the shader blends between them.
 */

export const SHAPE_COUNT = 5;

type V = [number, number, number];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[(Math.random() * arr.length) | 0];

function sphere(n: number): V[] {
  const out: V[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    const R = 2.25 + (Math.random() < 0.12 ? rand(0.15, 0.6) : rand(-0.03, 0.03));
    out.push([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R]);
  }
  return out;
}

function coins(n: number): V[] {
  // Two stacks of Taka coins and one rolling coin.
  const stacks: { x: number; z: number; count: number }[] = [
    { x: -0.85, z: 0.1, count: 9 },
    { x: 0.95, z: -0.2, count: 6 },
  ];
  const R = 0.82;
  const T = 0.15;
  const G = 0.045;
  const all: { cx: number; cy: number; cz: number; tilt: number }[] = [];
  for (const s of stacks) {
    for (let k = 0; k < s.count; k++) all.push({ cx: s.x + rand(-0.04, 0.04), cy: -2 + k * (T + G) + T / 2, cz: s.z + rand(-0.04, 0.04), tilt: 0 });
  }
  all.push({ cx: 0.2, cy: 0.9, cz: 0.7, tilt: 1.15 }); // coin standing up, mid-roll
  const out: V[] = [];
  for (let i = 0; i < n; i++) {
    const c = pick(all);
    const a = rand(0, Math.PI * 2);
    let x: number, y: number, z: number;
    const u = Math.random();
    if (u < 0.55) {
      // rim
      x = Math.cos(a) * R;
      z = Math.sin(a) * R;
      y = rand(-T / 2, T / 2);
    } else {
      // faces, denser toward the edge, plus an inner ring (the coin's embossing)
      const rr = u < 0.75 ? R * Math.sqrt(Math.random()) : R * 0.72;
      x = Math.cos(a) * rr;
      z = Math.sin(a) * rr;
      y = Math.random() < 0.5 ? T / 2 : -T / 2;
    }
    if (c.tilt) {
      const ct = Math.cos(c.tilt), st = Math.sin(c.tilt);
      const y2 = y * ct - z * st;
      z = y * st + z * ct;
      y = y2;
    }
    out.push([x + c.cx, y + c.cy, z + c.cz]);
  }
  return out;
}

/** Points on the edges (mostly) and faces of a box. */
function boxPoint(cx: number, cy: number, cz: number, sx: number, sy: number, sz: number, edgeBias = 0.7): V {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  if (Math.random() < edgeBias) {
    const axis = (Math.random() * 3) | 0;
    const s1 = Math.random() < 0.5 ? -1 : 1;
    const s2 = Math.random() < 0.5 ? -1 : 1;
    if (axis === 0) return [cx + rand(-hx, hx), cy + s1 * hy, cz + s2 * hz];
    if (axis === 1) return [cx + s1 * hx, cy + rand(-hy, hy), cz + s2 * hz];
    return [cx + s1 * hx, cy + s2 * hy, cz + rand(-hz, hz)];
  }
  const face = (Math.random() * 6) | 0;
  const s = face % 2 ? 1 : -1;
  if (face < 2) return [cx + s * hx, cy + rand(-hy, hy), cz + rand(-hz, hz)];
  if (face < 4) return [cx + rand(-hx, hx), cy + s * hy, cz + rand(-hz, hz)];
  return [cx + rand(-hx, hx), cy + rand(-hy, hy), cz + s * hz];
}

function boxes(n: number): V[] {
  // Warehouse rack: 3 wide × 3 high × 2 deep, a few slots empty.
  const cells: V[] = [];
  for (let x = -1; x <= 1; x++)
    for (let y = 0; y < 3; y++)
      for (let z = 0; z < 2; z++) {
        if ((x === 1 && y === 2 && z === 0) || (x === -1 && y === 2 && z === 1)) continue;
        cells.push([x * 1.05, -1.6 + y * 1.05, (z - 0.5) * 1.05]);
      }
  const out: V[] = [];
  for (let i = 0; i < n; i++) {
    const [cx, cy, cz] = pick(cells);
    out.push(boxPoint(cx, cy, cz, 0.86, 0.86, 0.86, 0.72));
  }
  return out;
}

function bars(n: number): V[] {
  const heights = [0.9, 1.5, 1.2, 2.2, 2.8, 3.7];
  const w = 0.5;
  const base = -2.0;
  const out: V[] = [];
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    if (u < 0.1) {
      // trend line rising over the bars
      const t = Math.random();
      const x = -2.1 + t * 4.2;
      out.push([x + rand(-0.02, 0.02), base + 1.3 + t * 2.9 + Math.sin(t * 9) * 0.12, 0.6 + rand(-0.02, 0.02)]);
    } else if (u < 0.18) {
      // floor grid
      out.push([rand(-2.6, 2.6), base, rand(-0.9, 0.9)]);
    } else {
      const k = (Math.random() * heights.length) | 0;
      const h = heights[k];
      const x = -2.0 + k * 0.8;
      out.push(boxPoint(x, base + h / 2, 0, w, h, w, 0.6));
    }
  }
  return out;
}

function network(n: number): V[] {
  // Head office in the middle, branches around it, outlets beyond.
  const nodes: { p: V; r: number }[] = [{ p: [0, 0, 0], r: 0.42 }];
  const edges: [number, number][] = [];
  const B = 6;
  for (let i = 0; i < B; i++) {
    const a = (i / B) * Math.PI * 2;
    nodes.push({ p: [Math.cos(a) * 1.7, Math.sin(a * 2) * 0.35, Math.sin(a) * 1.7], r: 0.2 });
    edges.push([0, nodes.length - 1]);
  }
  for (let i = 0; i < B; i++) {
    const parent = 1 + i;
    for (let j = 0; j < 2; j++) {
      const a = (i / B) * Math.PI * 2 + (j ? 0.32 : -0.32);
      nodes.push({ p: [Math.cos(a) * 2.8, rand(-0.9, 0.9), Math.sin(a) * 2.8], r: 0.1 });
      edges.push([parent, nodes.length - 1]);
    }
    edges.push([parent, 1 + ((i + 1) % B)]);
  }
  const out: V[] = [];
  for (let i = 0; i < n; i++) {
    if (Math.random() < 0.55) {
      const nd = Math.random() < 0.25 ? nodes[0] : pick(nodes);
      const a = rand(0, Math.PI * 2);
      const y = rand(-1, 1);
      const rr = Math.sqrt(1 - y * y);
      const R = nd.r * Math.cbrt(Math.random());
      out.push([nd.p[0] + Math.cos(a) * rr * R, nd.p[1] + y * R, nd.p[2] + Math.sin(a) * rr * R]);
    } else {
      const [a, b] = pick(edges);
      const t = Math.random();
      const pa = nodes[a].p, pb = nodes[b].p;
      out.push([pa[0] + (pb[0] - pa[0]) * t + rand(-0.015, 0.015), pa[1] + (pb[1] - pa[1]) * t, pa[2] + (pb[2] - pa[2]) * t]);
    }
  }
  return out;
}

const vertex = /* glsl */ `
  attribute vec3 p1;
  attribute vec3 p2;
  attribute vec3 p3;
  attribute vec3 p4;
  attribute float aRand;
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vColor;
  varying float vAlpha;

  float stage(float k) {
    // particles leave and arrive at slightly different times
    return smoothstep(0.0, 1.0, clamp((uMorph - (k - 1.0)) * 1.7 - aRand * 0.7, 0.0, 1.0));
  }

  void main() {
    vec3 pos = position;
    pos = mix(pos, p1, stage(1.0));
    pos = mix(pos, p2, stage(2.0));
    pos = mix(pos, p3, stage(3.0));
    pos = mix(pos, p4, stage(4.0));

    float transit = sin(3.14159 * fract(uMorph));
    float t = uTime;
    vec3 drift = vec3(
      sin(t * 0.7 + aRand * 31.0),
      cos(t * 0.6 + aRand * 17.0),
      sin(t * 0.5 + aRand * 23.0)
    );
    pos += drift * (0.025 + 0.55 * transit * aRand);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) / -mv.z;

    vColor = mix(uColorA, uColorB, smoothstep(-2.4, 2.6, pos.y * 0.8 - pos.x * 0.35));
    vAlpha = 0.45 + 0.55 * aRand;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

export type SceneApi = {
  setStep: (step: number, instant?: boolean) => void;
  setOffset: (x: number) => void;
  setActive: (on: boolean) => void;
  destroy: () => void;
};

export function createScene(canvas: HTMLCanvasElement, opts: { reduced: boolean; tween: (target: { value: number }, to: number, duration: number) => void }): SceneApi {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(dpr);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.2, 8.2);

  const small = window.innerWidth < 768;
  const N = small ? 5200 : 9000;
  const shapes = [sphere(N), coins(N), boxes(N), bars(N), network(N)];

  const geo = new THREE.BufferGeometry();
  const toAttr = (pts: V[]) => {
    const arr = new Float32Array(N * 3);
    pts.forEach((p, i) => arr.set(p, i * 3));
    return new THREE.BufferAttribute(arr, 3);
  };
  geo.setAttribute("position", toAttr(shapes[0]));
  geo.setAttribute("p1", toAttr(shapes[1]));
  geo.setAttribute("p2", toAttr(shapes[2]));
  geo.setAttribute("p3", toAttr(shapes[3]));
  geo.setAttribute("p4", toAttr(shapes[4]));
  const r = new Float32Array(N);
  for (let i = 0; i < N; i++) r[i] = Math.random();
  geo.setAttribute("aRand", new THREE.BufferAttribute(r, 1));

  const morph = { value: 0 };
  const mat = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uMorph: morph,
      uSize: { value: small ? 34 : 40 },
      uPixelRatio: { value: dpr },
      uColorA: { value: new THREE.Color("#00d4c7") },
      uColorB: { value: new THREE.Color("#8b5cf6") },
    },
  });

  const group = new THREE.Group();
  const points = new THREE.Points(geo, mat);
  group.add(points);
  scene.add(group);

  // Background dust for depth.
  const D = small ? 500 : 1100;
  const dust = new Float32Array(D * 3);
  for (let i = 0; i < D; i++) dust.set([rand(-14, 14), rand(-8, 8), rand(-12, 2)], i * 3);
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0x7fa3c9, size: 0.03, transparent: true, opacity: 0.45, depthWrite: false });
  const dustPts = new THREE.Points(dustGeo, dustMat);
  scene.add(dustPts);

  // Per-shape orientation: the sphere and network spin; boxes and bars are viewed from a 3/4 angle.
  const tilts = [0.15, 0.3, 0.42, 0.28, 0.38];

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement ?? canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.position.z = camera.aspect < 0.8 ? 11 : 8.2;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement ?? canvas);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onPointer = (e: PointerEvent) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onPointer, { passive: true });

  let offsetX = 0;
  let targetOffset = 0;
  let active = true;
  let raf = 0;
  const timer = new THREE.Timer();
  let spin = 0;

  const frame = (now?: number) => {
    timer.update(now);
    const dt = Math.min(timer.getDelta(), 0.05);
    const t = timer.getElapsed();
    mat.uniforms.uTime.value = t;
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    offsetX += (targetOffset - offsetX) * 0.05;

    const step = Math.round(morph.value);
    const spinSpeed = step === 0 || step === 4 ? 0.12 : 0.05;
    spin += dt * spinSpeed;
    const shapeYaw = step === 0 || step === 4 ? spin : -0.55 + Math.sin(t * 0.25) * 0.25;
    group.rotation.y += (shapeYaw + pointer.x * 0.35 - group.rotation.y) * 0.05;
    group.rotation.x += (tilts[step] + pointer.y * 0.18 - group.rotation.x) * 0.05;
    group.position.x = offsetX;
    group.position.y = Math.sin(t * 0.5) * 0.06;
    dustPts.rotation.y = t * 0.01;
    dustPts.position.x = -pointer.x * 0.3;
    renderer.render(scene, camera);
    if (active && !opts.reduced) raf = requestAnimationFrame(frame);
  };
  frame();

  return {
    setStep(step, instant) {
      const s = Math.max(0, Math.min(SHAPE_COUNT - 1, step));
      if (instant || opts.reduced) {
        morph.value = s;
        if (opts.reduced) frame();
      } else opts.tween(morph, s, 1.9);
    },
    setOffset(x) {
      targetOffset = x;
      if (opts.reduced) { offsetX = x; frame(); }
    },
    setActive(on) {
      if (on === active) return;
      active = on;
      cancelAnimationFrame(raf);
      if (on && !opts.reduced) { timer.reset(); raf = requestAnimationFrame(frame); }
    },
    destroy() {
      active = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      mat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      timer.dispose();
      renderer.dispose();
    },
  };
}
