// scobb3d.js: a small WebGL engine for ScobbBucks. Real 3D meshes, soft lighting, glossy highlights,
// rim light and cast shadows. World units are screen pixels, so a point at z = 0 lands exactly where a
// 2D game would draw it. That keeps touch and mouse controls the same as before.

const VS = `
attribute vec3 aP; attribute vec3 aN;
uniform mat4 uVP; uniform mat4 uM; uniform mat3 uNM;
uniform int uMode; uniform vec3 uBox; uniform float uRad;
varying vec3 vP; varying vec3 vN; varying vec2 vUV; varying vec3 vL;
void main(){
  vec3 p = aP, n = aN;
  if (uMode == 1) { vec3 q = aP * uBox; vec3 inner = clamp(q, -(uBox - uRad), uBox - uRad); n = normalize(q - inner + aP * 1e-4); p = inner + n * uRad; }
  vUV = aP.xy; vL = p;
  vec4 w = uM * vec4(p, 1.0);
  vP = w.xyz; vN = normalize(uNM * n);
  gl_Position = uVP * w;
}`;
const FS = `
precision highp float;
precision highp int;
varying vec3 vP; varying vec3 vN; varying vec2 vUV; varying vec3 vL;
uniform int uPat; uniform float uPatS; uniform float uAnim; uniform float uTime;
float hsh(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x) { vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hsh(i), hsh(i + vec3(1,0,0)), f.x), mix(hsh(i + vec3(0,1,0)), hsh(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hsh(i + vec3(0,0,1)), hsh(i + vec3(1,0,1)), f.x), mix(hsh(i + vec3(0,1,1)), hsh(i + vec3(1,1,1)), f.x), f.y), f.z); }
uniform vec3 uColor; uniform vec3 uEye; uniform vec3 uL; uniform vec3 uSky; uniform vec3 uGround;
uniform float uSpec; uniform float uShiny; uniform float uAlpha; uniform int uMode; uniform float uEmit; uniform float uStripe; uniform vec3 uColor2; uniform vec3 uFogC; uniform float uFogD;
void main(){
  if (uMode == 2) { float d = length(vUV); float a = smoothstep(1.0, 0.0, d); gl_FragColor = vec4(0.0, 0.0, 0.0, a * a * uAlpha); return; }
  vec3 n = normalize(vN); vec3 v = normalize(uEye - vP);
  if (dot(n, v) < 0.0) n = -n;
  vec3 base = uColor;
  if (uStripe > 0.0) base = mix(uColor, uColor2, step(0.5, fract(vP.y * uStripe)));
  if (uPat > 0) {
    vec3 q = vL * uPatS; float tm = uTime * uAnim;
    if (uPat == 1) base = mix(uColor, uColor2, step(0.5, fract((q.y + q.z * 0.8 + q.x * 0.6) * 0.5 + tm * 0.35)));
    else if (uPat == 2) { vec2 c = fract(vec2(q.z + q.x, q.y + q.x) * 0.9 + vec2(tm * 0.2, 0.0)) - 0.5; base = mix(uColor, uColor2, 1.0 - step(0.26, length(c))); }
    else if (uPat == 3) { float n1 = vnoise(q * 0.6 + vec3(0.0, 0.0, tm * 0.3)), n2 = vnoise(q * 1.3 + 7.1); base = n1 > 0.55 ? uColor2 : (n2 > 0.58 ? uColor * 0.62 : uColor); }
    else if (uPat == 4) { float k = 0.5 + 0.5 * sin(q.z * 0.35 + q.y * 0.2 + tm * 1.6); base = mix(uColor, uColor2, k); }
  }
  float dif = max(dot(n, uL), 0.0);
  float wrap = max((dot(n, uL) + 0.35) / 1.35, 0.0);
  vec3 hemi = mix(uGround, uSky, n.y * 0.5 + 0.5);
  vec3 h = normalize(uL + v);
  float sp = pow(max(dot(n, h), 0.0), uShiny) * uSpec;
  float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  vec3 col = base * (hemi * 0.42 + vec3(1.0, 0.97, 0.92) * (dif * 0.62 + wrap * 0.28));
  col += sp * vec3(1.0, 0.98, 0.95);
  col += fres * mix(uSky, vec3(1.0), 0.5) * (0.18 + uSpec * 0.25);
  col = mix(col, base * 1.15, uEmit);
  float fd = length(uEye - vP); col = mix(col, uFogC, (1.0 - exp(-fd * uFogD)) * (1.0 - uEmit * 0.6));
  col = col / (col + vec3(0.62)) * 1.62;
  col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
  gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(0.95)), uAlpha);
}`;

function hex(c) { if (Array.isArray(c)) return c; const n = parseInt(c.slice(1), 16); return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; }
function mul(a, b) { const o = new Float32Array(16); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let s = 0; for (let k = 0; k < 4; k++) s += a[k * 4 + j] * b[i * 4 + k]; o[i * 4 + j] = s; } return o; }
function persp(fov, asp, n, f) { const t = 1 / Math.tan(fov / 2), o = new Float32Array(16); o[0] = t / asp; o[5] = t; o[10] = (f + n) / (n - f); o[11] = -1; o[14] = 2 * f * n / (n - f); return o; }
function lookAt(e, c, u) {
  const z = norm([e[0] - c[0], e[1] - c[1], e[2] - c[2]]), x = norm(cross(u, z)), y = cross(z, x);
  return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1]);
}
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
// Rotation (x, then y, then z) combined with scale. Returns the model matrix and the matching normal matrix.
function model(x, y, z, rx, ry, rz, sx, sy, sz) {
  const cx = Math.cos(rx), snx = Math.sin(rx), cy = Math.cos(ry), sny = Math.sin(ry), cz = Math.cos(rz), snz = Math.sin(rz);
  const r = [
    cy * cz, cy * snz, -sny,
    snx * sny * cz - cx * snz, snx * sny * snz + cx * cz, snx * cy,
    cx * sny * cz + snx * snz, cx * sny * snz - snx * cz, cx * cy
  ];
  const m = new Float32Array([r[0] * sx, r[1] * sx, r[2] * sx, 0, r[3] * sy, r[4] * sy, r[5] * sy, 0, r[6] * sz, r[7] * sz, r[8] * sz, 0, x, y, z, 1]);
  const nm = new Float32Array([r[0] / sx, r[1] / sx, r[2] / sx, r[3] / sy, r[4] / sy, r[5] / sy, r[6] / sz, r[7] / sz, r[8] / sz]);
  return { m, nm };
}

function buildMeshes(gl) {
  const mk = (pos, nrm, idx) => {
    const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    const nb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, nb); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(nrm), gl.STATIC_DRAW);
    const ib = gl.createBuffer(); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(idx), gl.STATIC_DRAW);
    return { b, nb, ib, n: idx.length };
  };
  const M = {};
  { // sphere
    const P = [], N = [], I = [], SEG = 36, RING = 24;
    for (let i = 0; i <= RING; i++) { const v = i / RING * Math.PI; for (let j = 0; j <= SEG; j++) { const u = j / SEG * Math.PI * 2; const x = Math.sin(v) * Math.cos(u), y = Math.cos(v), z = Math.sin(v) * Math.sin(u); P.push(x, y, z); N.push(x, y, z); } }
    for (let i = 0; i < RING; i++) for (let j = 0; j < SEG; j++) { const a = i * (SEG + 1) + j, b = a + SEG + 1; I.push(a, b, a + 1, b, b + 1, a + 1); }
    M.sphere = mk(P, N, I);
  }
  { // rounded box: a subdivided cube that the vertex shader rounds off
    const P = [], N = [], I = [], S = 8;
    const faces = [[0, 1, 2, 1], [0, 1, 2, -1], [1, 2, 0, 1], [1, 2, 0, -1], [2, 0, 1, 1], [2, 0, 1, -1]];
    for (const [a, b, c, sgn] of faces) {
      const base = P.length / 3;
      for (let i = 0; i <= S; i++) for (let j = 0; j <= S; j++) {
        const v = [0, 0, 0]; v[a] = -1 + 2 * i / S; v[b] = -1 + 2 * j / S; v[c] = sgn;
        const t = v.map(k => Math.sign(k) * Math.pow(Math.abs(k), 1)); P.push(t[0], t[1], t[2]); N.push(0, 0, 0);
      }
      for (let i = 0; i < S; i++) for (let j = 0; j < S; j++) { const p0 = base + i * (S + 1) + j, p1 = p0 + S + 1; if (sgn > 0) I.push(p0, p1, p0 + 1, p1, p1 + 1, p0 + 1); else I.push(p0, p0 + 1, p1, p1, p0 + 1, p1 + 1); }
    }
    M.rbox = mk(P, N, I);
  }
  { // cylinder along y, radius 1, height 2, with flat caps
    const P = [], N = [], I = [], SEG = 40;
    for (let j = 0; j <= SEG; j++) { const u = j / SEG * Math.PI * 2, x = Math.cos(u), z = Math.sin(u); P.push(x, -1, z, x, 1, z); N.push(x, 0, z, x, 0, z); }
    for (let j = 0; j < SEG; j++) { const a = j * 2; I.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    for (const yy of [1, -1]) {
      const c = P.length / 3; P.push(0, yy, 0); N.push(0, yy, 0);
      for (let j = 0; j <= SEG; j++) { const u = j / SEG * Math.PI * 2; P.push(Math.cos(u), yy, Math.sin(u)); N.push(0, yy, 0); }
      for (let j = 0; j < SEG; j++) I.push(c, c + 1 + j, c + 2 + j);
    }
    M.cyl = mk(P, N, I);
  }
  { // cone along y, tip at +1
    const P = [], N = [], I = [], SEG = 40;
    for (let j = 0; j <= SEG; j++) { const u = j / SEG * Math.PI * 2, x = Math.cos(u), z = Math.sin(u), n = norm([x, 0.5, z]); P.push(x, -1, z, 0, 1, 0); N.push(n[0], n[1], n[2], n[0], n[1], n[2]); }
    for (let j = 0; j < SEG; j++) { const a = j * 2; I.push(a, a + 1, a + 2); }
    const c = P.length / 3; P.push(0, -1, 0); N.push(0, -1, 0);
    for (let j = 0; j <= SEG; j++) { const u = j / SEG * Math.PI * 2; P.push(Math.cos(u), -1, Math.sin(u)); N.push(0, -1, 0); }
    for (let j = 0; j < SEG; j++) I.push(c, c + 1 + j, c + 2 + j);
    M.cone = mk(P, N, I);
  }
  { // torus in the xz plane, ring radius 1, tube radius 0.25
    const P = [], N = [], I = [], SEG = 40, TS = 16, r = 0.25;
    for (let i = 0; i <= SEG; i++) { const u = i / SEG * Math.PI * 2; for (let j = 0; j <= TS; j++) { const v = j / TS * Math.PI * 2; const cx = Math.cos(u), cz = Math.sin(u); P.push((1 + r * Math.cos(v)) * cx, r * Math.sin(v), (1 + r * Math.cos(v)) * cz); N.push(Math.cos(v) * cx, Math.sin(v), Math.cos(v) * cz); } }
    for (let i = 0; i < SEG; i++) for (let j = 0; j < TS; j++) { const a = i * (TS + 1) + j, b = a + TS + 1; I.push(a, b, a + 1, b, b + 1, a + 1); }
    M.torus = mk(P, N, I);
  }
  { // flat square in xy for shadows
    M.quad = mk([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0], [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], [0, 1, 2, 1, 3, 2]);
  }
  return M;
}

export function create(canvas, W, H, opts) {
  opts = opts || {};
  // Browsers (Safari especially) silently stop drawing to very large canvases, so cap the pixel count.
  // On a big high-density screen this renders a little softer instead of going blank.
  const MAX_PIX = 4.2e6;
  const dpr0 = Math.min(2, window.devicePixelRatio || 1);
  const dpr = Math.min(dpr0, Math.sqrt(MAX_PIX / Math.max(1, W * H)));
  canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  const big = canvas.width * canvas.height > MAX_PIX * 0.6;
  const ctxOpts = { antialias: !big, alpha: !opts.opaque, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'high-performance', failIfMajorPerformanceCaveat: false };
  const gl = canvas.getContext('webgl', ctxOpts) || canvas.getContext('experimental-webgl', ctxOpts);
  if (!gl) { create.lastError = 'This browser could not start WebGL. In Safari, check Settings > Advanced > Feature Flags and make sure WebGL is on.'; return null; }
  let lostTimer = 0;
  canvas.addEventListener('webglcontextlost', e => {
    e.preventDefault(); api.lost = true;
    create.lastError = 'The browser turned off 3D graphics for this page. Reload the page.';
    clearTimeout(lostTimer);
    lostTimer = setTimeout(() => { if (api.lost && opts.onLost) opts.onLost(); }, 3000);
  }, false);
  canvas.addEventListener('webglcontextrestored', () => { clearTimeout(lostTimer); if (opts.onRestore) opts.onRestore(); }, false);
  if (gl.drawingBufferWidth < canvas.width * 0.99) { canvas.width = gl.drawingBufferWidth; canvas.height = gl.drawingBufferHeight; }
  const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader failed'); return s; };
  // Some phones and older Safari builds lack high precision in fragment shaders, so fall back to medium.
  const hp = gl.getShaderPrecisionFormat ? gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT) : null;
  const fsSrc = hp && hp.precision > 0 ? FS : FS.replace('precision highp float;\nprecision highp int;', 'precision mediump float;\nprecision mediump int;');
  const vsSrc = hp && hp.precision > 0 ? VS : 'precision mediump int;\n' + VS;
  const pr = gl.createProgram();
  try { gl.attachShader(pr, sh(gl.VERTEX_SHADER, vsSrc)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fsSrc)); }
  catch (err) { create.lastError = 'Shader error: ' + err.message; return null; }
  gl.bindAttribLocation(pr, 0, 'aP'); gl.bindAttribLocation(pr, 1, 'aN');
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { create.lastError = 'Link error: ' + gl.getProgramInfoLog(pr); return null; }
  gl.useProgram(pr);
  const U = {}; for (const k of ['uPat', 'uPatS', 'uAnim', 'uTime', 'uFogC', 'uFogD', 'uVP', 'uM', 'uNM', 'uMode', 'uBox', 'uRad', 'uColor', 'uColor2', 'uStripe', 'uEye', 'uL', 'uSky', 'uGround', 'uSpec', 'uShiny', 'uAlpha', 'uEmit']) U[k] = gl.getUniformLocation(pr, k);
  const aP = gl.getAttribLocation(pr, 'aP'), aN = gl.getAttribLocation(pr, 'aN');
  gl.enableVertexAttribArray(aP); gl.enableVertexAttribArray(aN);
  const meshes = buildMeshes(gl);
  const fov = (opts.fov || 38) * Math.PI / 180;
  let D = (H / 2) / Math.tan(fov / 2);
  let eye = [0, 0, D];
  let VP = mul(persp(fov, W / H, D * 0.2, D * 4), lookAt(eye, [0, 0, 0], [0, 1, 0]));
  const L = norm(opts.light || [-0.45, 0.75, 0.6]);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE);
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniformMatrix4fv(U.uVP, false, VP);
  gl.uniform3fv(U.uEye, eye); gl.uniform3fv(U.uL, L);
  gl.uniform3fv(U.uSky, hex(opts.sky || '#DDE6FF')); gl.uniform3fv(U.uGround, hex(opts.ground || '#8A8FA6'));
  let cur = null;
  const bind = mname => {
    if (cur === mname) return meshes[mname];
    const m = meshes[mname]; cur = mname;
    gl.bindBuffer(gl.ARRAY_BUFFER, m.b); gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, m.nb); gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.ib);
    return m;
  };
  // Game coordinates (pixels, y down) to world coordinates (y up).
  const wx = opts.free ? (v => v) : (px => px - W / 2), wy = opts.free ? (v => v) : (py => H / 2 - py);
  gl.uniform1f(U.uFogD, 0); gl.uniform3fv(U.uFogC, [1, 1, 1]);
  function draw(mname, o, mode) {
    const m = bind(mname);
    const mm = model(wx(o.x), wy(o.y), o.z || 0, o.rx || 0, o.ry || 0, o.rz || 0, o.sx, o.sy, o.sz);
    gl.uniformMatrix4fv(U.uM, false, mm.m); gl.uniformMatrix3fv(U.uNM, false, mm.nm);
    gl.uniform1i(U.uMode, mode || 0);
    gl.uniform3fv(U.uColor, hex(o.c || '#ffffff')); gl.uniform3fv(U.uColor2, hex(o.c2 || '#ffffff')); gl.uniform1f(U.uStripe, o.stripe || 0);
    gl.uniform1f(U.uSpec, o.spec == null ? 0.45 : o.spec); gl.uniform1f(U.uShiny, o.shiny || 40);
    gl.uniform1f(U.uAlpha, o.a == null ? 1 : o.a); gl.uniform1f(U.uEmit, o.emit || 0);
    gl.uniform1i(U.uPat, o.pat || 0); gl.uniform1f(U.uPatS, o.patS || 30); gl.uniform1f(U.uAnim, o.anim ? 1 : 0);
    gl.drawElements(gl.TRIANGLES, m.n, gl.UNSIGNED_SHORT, 0);
  }
  const api = {
    W, H, gl, wx, wy,
    bg: [0, 0, 0],
    begin() { if (opts.opaque) gl.clearColor(api.bg[0], api.bg[1], api.bg[2], 1); else gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); },
    sphere(x, y, z, r, c, o) { o = o || {}; draw('sphere', Object.assign({ x, y, z, sx: r * (o.kx || 1), sy: r * (o.ky || 1), sz: r * (o.kz || 1), c }, o)); },
    box(x, y, z, hx, hy, hz, rad, c, o) {
      o = o || {};
      gl.uniform3fv(U.uBox, [hx, hy, hz]); gl.uniform1f(U.uRad, Math.min(rad, hx, hy, hz));
      draw('rbox', Object.assign({ x, y, z, sx: 1, sy: 1, sz: 1, c }, o), 1);
    },
    cyl(x, y, z, r, hh, c, o) { o = o || {}; draw('cyl', Object.assign({ x, y, z, sx: r, sy: hh, sz: r, c }, o)); },
    cone(x, y, z, r, hh, c, o) { o = o || {}; draw('cone', Object.assign({ x, y, z, sx: r, sy: hh, sz: r, c }, o)); },
    torus(x, y, z, R, c, o) { o = o || {}; const t = o.tube ? o.tube / (0.25 * R) : 1; draw('torus', Object.assign({ x, y, z, sx: R, sy: R * t, sz: R, c }, o)); },
    // A soft shadow on a wall behind the scene, nudged away from the light.
    shadow(x, y, rx, ry, a, z) {
      gl.depthMask(false);
      draw('quad', { x: x - L[0] * 14, y: y + L[1] * 10, z: z == null ? -70 : z, sx: rx, sy: ry, sz: 1, a: a == null ? 0.22 : a }, 2);
      gl.depthMask(true);
    },
    // A scobb: a glossy jelly body with eyes, cheeks and a highlight. Squash and stretch with ky and kx.
    scobb(x, y, z, r, c, o) {
      o = o || {};
      const kx = o.kx || 1, ky = o.ky || 1, face = o.face == null ? 0.25 : o.face;
      api.sphere(x, y, z, r, c, { kx, ky, kz: kx, spec: 0.9, shiny: 60, ry: o.ry || 0, rz: o.rz || 0 });
      const ex = r * 0.34 * kx, ey = y - r * 0.12 * ky, ez = (z || 0) + r * 0.86;
      for (const s of [-1, 1]) {
        api.sphere(x + s * ex + face * r * 0.3, ey, ez, r * 0.15, '#1A1A22', { spec: 1.4, shiny: 90, ky: 1.25 });
        api.sphere(x + s * r * 0.52 * kx + face * r * 0.3, y + r * 0.22 * ky, (z || 0) + r * 0.78, r * 0.12, '#FF8FB0', { spec: 0.2, kz: 0.4 });
      }
    },
    // A gold coin, standing up, spinning around its vertical axis.
    coin(x, y, z, r, spin, o) {
      o = o || {};
      api.cyl(x, y, z, r, r * 0.13, '#F2B531', Object.assign({ rx: Math.PI / 2, ry: 0, rz: 0, spec: 1.3, shiny: 70 }, o, { ry: spin }));
      api.torus(x, y, z, r * 0.78, '#FFD86B', Object.assign({ rx: Math.PI / 2, tube: r * 0.09, spec: 1.2, shiny: 70 }, o, { ry: spin }));
    },
    // Free camera for first person: eye position, yaw (left/right) and pitch (up/down) in radians.
    view(e, yaw, pitch, fovDeg, near, far) {
      const f = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), -Math.cos(yaw) * Math.cos(pitch)];
      const P = persp((fovDeg || 75) * Math.PI / 180, W / H, near || 0.05, far || 400);
      api.P = P; api.fwd = f;
      api.VPm = mul(P, lookAt(e, [e[0] + f[0], e[1] + f[1], e[2] + f[2]], [0, 1, 0]));
      gl.uniformMatrix4fv(U.uVP, false, api.VPm);
      gl.uniform3fv(U.uEye, e);
    },
    time(t) { gl.uniform1f(U.uTime, t / 1000); },
    fog(color, density) { api.bg = hex(color); gl.uniform3fv(U.uFogC, api.bg); gl.uniform1f(U.uFogD, density); },
    // World point to screen pixels for the free camera. Returns null if the point is behind the camera.
    toScreen(x, y, z) { const m = api.VPm; if (!m) return null; const cx = m[0] * x + m[4] * y + m[8] * z + m[12], cy = m[1] * x + m[5] * y + m[9] * z + m[13], cw = m[3] * x + m[7] * y + m[11] * z + m[15]; if (cw <= 0.01) return null; return [(cx / cw * 0.5 + 0.5) * W, (1 - (cy / cw * 0.5 + 0.5)) * H]; },
    // Draws one frame's worth of nothing and reads back a pixel, to catch browsers that render a blank canvas.
    selfTest() { try { const px = new Uint8Array(4); gl.readPixels(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px); return Array.from(px); } catch (e) { return null; } },
    info() { const d = gl.getExtension('WEBGL_debug_renderer_info'); return { version: gl.getParameter(gl.VERSION), renderer: d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), size: canvas.width + 'x' + canvas.height }; },
    // Draws in camera space (x right, y up, -z forward) on top of the world, for a held weapon.
    viewmodel() { gl.clear(gl.DEPTH_BUFFER_BIT); gl.uniformMatrix4fv(U.uVP, false, api.P); gl.uniform3fv(U.uEye, [0, 0, 0]); gl.uniform1f(U.uFogD, 0); },
    blob(x, y, z, r, a) { gl.depthMask(false); draw('quad', { x, y, z, rx: -Math.PI / 2, sx: r, sy: r, sz: 1, a: a == null ? 0.35 : a }, 2); gl.depthMask(true); },
    light(dir) { gl.uniform3fv(U.uL, norm(dir)); },
    setSky(sky, ground) { gl.uniform3fv(U.uSky, hex(sky)); gl.uniform3fv(U.uGround, hex(ground)); },
    project(px, py, pz) { const x = wx(px), y = wy(py), z = pz || 0; const s = D / (D - z); return [W / 2 + x * s, H / 2 - y * s]; },
    // Resize the existing canvas and camera. Never throw the context away to resize: a canvas can't get a new one.
    resize(w, h) {
      W = w; H = h;
      const d0 = Math.min(2, window.devicePixelRatio || 1), d = Math.min(d0, Math.sqrt(MAX_PIX / Math.max(1, W * H)));
      canvas.width = Math.round(W * d); canvas.height = Math.round(H * d);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      if (!opts.free) {
        D = (H / 2) / Math.tan(fov / 2); eye = [0, 0, D];
        VP = mul(persp(fov, W / H, D * 0.2, D * 4), lookAt(eye, [0, 0, 0], [0, 1, 0]));
        gl.uniformMatrix4fv(U.uVP, false, VP); gl.uniform3fv(U.uEye, eye);
      }
      api.W = W; api.H = H;
    },
    lost: false,
    destroy() { const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); }
  };
  return api;
}
