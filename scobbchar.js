// The Scobb character, shared by the closet, Edit look, the Scobbsino and Scobb Strike so everyone looks the same everywhere.
// drawScobb(G, e, t): e = { x, y, z, yaw, walk, look, pose: 'stand' | 'sit' | 'aim' | 'wave', bob }
// look = { body, face: { eyes, mouth, blush }, hat, hair, eyes, top, pants, back, watch, vest }, each item { c, c2, kind, pat }.

const mix = (a, b, k) => { const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)); const x = p(a), y = p(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * k).toString(16).padStart(2, '0')).join(''); };
const dark = c => mix(c || '#888888', '#000000', 0.35);
const light = c => mix(c || '#888888', '#FFFFFF', 0.45);
const ok = c => (typeof c === 'string' && /^#[0-9a-fA-F]{6}$/.test(c) ? c : '#8F96A3');
const has = (it, re) => !!(it && re.test(String(it.kind || '')));

export function drawScobb(G, e, t) {
  const L = e.look || {}, skin = ok(L.body || '#B98BFF'), yaw = e.yaw || 0, ry = -yaw, pose = e.pose || 'stand';
  const f = [Math.sin(yaw), -Math.cos(yaw)], r = [Math.cos(yaw), Math.sin(yaw)], y0 = e.y || 0;
  const P = (fw, up, rt) => [e.x + f[0] * fw + r[0] * rt, y0 + up, e.z + f[1] * fw + r[1] * rt];
  const sph = (fw, up, rt, rad, c, o) => { const q = P(fw, up, rt); G.sphere(q[0], q[1], q[2], rad, c, Object.assign({ ry }, o || {})); };
  const box = (fw, up, rt, hf, hu, hr, c, o, rnd) => { const q = P(fw, up, rt); G.box(q[0], q[1], q[2], hr, hu, hf, rnd == null ? Math.min(0.02, hr, hu, hf) : rnd, c, Object.assign({ ry }, o || {})); };
  const cyl = (fw, up, rt, rad, hh, c, o) => { const q = P(fw, up, rt); G.cyl(q[0], q[1], q[2], rad, hh, c, Object.assign({ ry }, o || {})); };
  const tor = (fw, up, rt, rad, tube, c, o) => { const q = P(fw, up, rt); G.torus(q[0], q[1], q[2], rad, c, Object.assign({ tube }, o || {})); };
  const cone = (fw, up, rt, rad, h, c, o) => { const q = P(fw, up, rt); G.cone(q[0], q[1], q[2], rad, h, c, Object.assign({ ry }, o || {})); };
  const pat = it => (it && it.pat && it.c2 ? { pat: it.pat, c2: ok(it.c2), patS: 7 } : {});
  const sit = pose === 'sit', walk = e.walk || 0, sway = sit ? 0 : Math.sin(walk * 5) * 0.13;
  const T = (sit ? 0.56 : 0.88) + (e.bob || 0), H = T + 0.57;
  const top = L.vest ? { c: '#15171C', kind: 'vest' } : L.top, pants = L.pants, hat = L.hat, hair = L.hair, gl = L.eyes, back = L.back, watch = L.watch;
  const topC = top ? ok(top.c) : skin, topA = top && top.c2 ? ok(top.c2) : dark(topC);
  const legC = pants ? ok(pants.c) : skin, legA = pants && pants.c2 ? ok(pants.c2) : dark(legC);
  G.blob(e.x, y0 + 0.02, e.z, 0.55, 0.35);

  // ---- legs and shoes ----
  const shorts = has(pants, /short/);
  for (const sg of [-1, 1]) {
    if (sit) {
      box(0.2, 0.42, 0.13 * sg, 0.24, 0.1, 0.1, legC, pat(pants), 0.05);
      box(0.44, 0.22, 0.13 * sg, 0.09, 0.22, 0.09, shorts ? skin : legC, shorts ? {} : pat(pants), 0.04);
      sph(0.5, 0.05, 0.13 * sg, 0.12, '#2A2D33', { ky: 0.55, kz: 1.25 });
      continue;
    }
    const sw = sway * sg;
    if (shorts) { cyl(sw, 0.47, 0.13 * sg, 0.118, 0.12, legC, Object.assign({ spec: 0.3 }, pat(pants))); cyl(sw, 0.2, 0.13 * sg, 0.095, 0.18, skin, { spec: 0.6 }); }
    else {
      cyl(sw, 0.31, 0.13 * sg, 0.108, 0.27, legC, Object.assign({ spec: pants ? 0.3 : 0.6 }, pat(pants)));
      if (has(pants, /jogger|track/)) tor(sw, 0.09, 0.13 * sg, 0.1, 0.028, legA, { spec: 0.3 });
      if (has(pants, /track/)) box(sw, 0.33, 0.13 * sg + 0.105 * sg, 0.012, 0.25, 0.01, ok(pants.c2 || '#FFFFFF'));
      if (has(pants, /jean/)) box(sw, 0.33, 0.13 * sg + 0.104 * sg, 0.006, 0.25, 0.006, light(legC));
      if (has(pants, /cargo/)) box(sw, 0.38, 0.13 * sg + 0.11 * sg, 0.07, 0.08, 0.025, dark(legC), {}, 0.015);
    }
    sph(sw + 0.05, 0.06, 0.13 * sg, 0.12, '#2A2D33', { ky: 0.55, kz: 1.22, spec: 0.8 });
    sph(sw + 0.12, 0.04, 0.13 * sg, 0.06, '#E8E8EC', { ky: 0.5, kz: 0.8 });
  }

  // ---- body: skin, then the top over it, then the pants waist over that ----
  sph(0, T, 0, 0.38, skin, { ky: 1.15, spec: 0.7, shiny: 50 });
  const longSleeve = has(top, /hood|jacket|bomber|varsity|tux|lava|sweat/), noSleeve = has(top, /tank|vest/);
  if (top) {
    const lava = has(top, /lava/);
    sph(0, T + 0.01, 0, 0.392, topC, Object.assign({ ky: 1.14, spec: 0.3, shiny: 20 }, pat(top), lava ? { pat: 3, c2: '#FF7A1A', patS: 6, emit: 0.15, anim: 1 } : {}));
    if (has(top, /strip/) && !top.pat) sph(0, T + 0.01, 0, 0.393, topC, { ky: 1.14, pat: 1, c2: ok(top.c2 || '#FFFFFF'), patS: 7 });
    if (has(top, /tank/)) { for (const sg of [-1, 1]) box(0.06, T + 0.38, 0.16 * sg, 0.22, 0.05, 0.035, topC, {}, 0.02); tor(0.16, T + 0.33, 0, 0.13, 0.02, dark(topC)); }
    else if (has(top, /vest/)) { box(0.37, T + 0.05, 0, 0.012, 0.3, 0.1, '#FFFFFF'); box(0.385, T + 0.33, 0, 0.012, 0.04, 0.09, '#C0392B', {}, 0.015); }
    else if (has(top, /tux/)) {
      box(0.375, T + 0.06, 0, 0.012, 0.28, 0.1, '#FFFFFF');
      for (const sg of [-1, 1]) { box(0.39, T + 0.34, 0.05 * sg, 0.012, 0.035, 0.05, '#15171C', { rz: 0.4 * sg }, 0.012); box(0.385, T + 0.14, 0.11 * sg, 0.012, 0.2, 0.03, dark(topC), { rz: -0.35 * sg }); }
      for (const k of [0, 1, 2]) sph(0.39, T - 0.02 - k * 0.09, 0, 0.012, '#15171C');
    }
    else if (has(top, /hood/)) {
      sph(-0.17, H - 0.12, 0, 0.27, topC, Object.assign({ ky: 0.85, kz: 0.75, spec: 0.3 }, pat(top)));
      tor(0.05, T + 0.36, 0, 0.17, 0.045, dark(topC));
      for (const sg of [-1, 1]) box(0.375, T + 0.18, 0.06 * sg, 0.008, 0.1, 0.008, '#F4F4F6');
      box(0.355, T - 0.16, 0, 0.03, 0.08, 0.17, dark(topC), {}, 0.03);
    }
    else if (has(top, /jacket|bomber|varsity|lava/)) {
      tor(0.03, T + 0.37, 0, 0.17, 0.05, has(top, /varsity/) ? '#F4F4F6' : dark(topC));
      box(0.39, T, 0, 0.006, 0.33, 0.006, has(top, /lava/) ? '#FFB347' : '#C9CDD4', has(top, /lava/) ? { emit: 0.8 } : { spec: 1.2 });
      tor(0, T - 0.33, 0, 0.25, 0.035, dark(topC));
      if (has(top, /varsity/)) box(0.36, T + 0.12, -0.18, 0.02, 0.07, 0.06, '#F4F4F6', {}, 0.02);
    }
    else if (has(top, /jersey/)) {
      box(0.388, T + 0.3, 0, 0.01, 0.05, 0.06, topA, { rz: 0.78 }, 0.01);
      box(0.39, T + 0.08, -0.05, 0.008, 0.012, 0.07, '#FFFFFF'); box(0.39, T - 0.02, -0.02, 0.008, 0.11, 0.014, '#FFFFFF', { rz: -0.35 });
    }
    else tor(0.04, T + 0.36, 0, 0.16, 0.035, dark(topC));
  }
  if (pants) {
    sph(0, T - 0.25, 0, 0.37, legC, Object.assign({ ky: 0.81, spec: 0.3 }, pat(pants)));
    tor(0, T - 0.175, 0, 0.34, 0.022, has(pants, /jean|cargo/) ? '#5A3A22' : dark(legC));
    if (has(pants, /jean|cargo/)) box(0.36, T - 0.175, 0, 0.01, 0.025, 0.035, '#D9B44A', { spec: 1.4 }, 0.008);
    if (has(pants, /jogger|track/)) for (const sg of [-1, 1]) box(0.355, T - 0.25, 0.03 * sg, 0.006, 0.06, 0.006, '#F4F4F6');
  }

  // ---- arms: sleeves where the top has them, skin where it doesn't ----
  for (const sg of [-1, 1]) {
    const S = [0.05, T + 0.17, 0.37 * sg];
    let Hd;
    if (pose === 'aim') Hd = sg > 0 ? [0.32, 0.95 - 0.88 + T, 0.2] : [0.34, 0.97 - 0.88 + T, -0.04];
    else if (pose === 'wave' && sg > 0) Hd = [0.12, T + 0.85, 0.5 + Math.sin(t / 90) * 0.1];
    else if (sit) Hd = [0.46, T - 0.04, 0.3 * sg];
    else Hd = [0.12 + sway * -sg * 0.6, T - 0.16, 0.42 * sg];
    const sleeved = top && !noSleeve, sleeveC = has(top, /varsity/) ? ok(top.c2 || '#F4F4F6') : topC, reach = longSleeve ? 0.86 : sleeved ? 0.38 : 0;
    sph(S[0], S[1], S[2], 0.112, sleeved ? topC : skin, Object.assign({ spec: 0.4 }, sleeved ? pat(top) : {}));
    for (let k = 1; k <= 7; k++) { const u = k / 8, q = [S[0] + (Hd[0] - S[0]) * u, S[1] + (Hd[1] - S[1]) * u, S[2] + (Hd[2] - S[2]) * u]; sph(q[0], q[1], q[2], 0.074 - u * 0.008, u <= reach ? sleeveC : skin, { spec: u <= reach ? 0.35 : 0.6 }); }
    if (longSleeve) { const c2 = has(top, /varsity/) ? '#F4F4F6' : has(top, /tux/) ? '#FFFFFF' : dark(topC), u = 0.88; sph(S[0] + (Hd[0] - S[0]) * u, S[1] + (Hd[1] - S[1]) * u, S[2] + (Hd[2] - S[2]) * u, 0.074, c2); }
    else if (sleeved) { const u = 0.4; sph(S[0] + (Hd[0] - S[0]) * u, S[1] + (Hd[1] - S[1]) * u, S[2] + (Hd[2] - S[2]) * u, 0.08, dark(topC)); }
    sph(Hd[0], Hd[1], Hd[2], 0.088, skin, { spec: 0.7 });
    if (watch && sg < 0) drawWatch(Hd);
  }
  function drawWatch(Hd) {
    const w = watch, k = String(w.kind || ''), band = /gold|luxe/.test(k) ? '#E3B341' : /diamond/.test(k) ? '#DDE7F0' : ok(w.c);
    const q = [Hd[0] - 0.02, Hd[1] + 0.07, Hd[2]];
    tor(q[0], q[1], q[2], 0.075, 0.022, band, { spec: 1.2 });
    const face = /smart/.test(k) ? '#15171C' : /diamond/.test(k) ? '#9EF6FF' : /warp/.test(k) ? '#B98BFF' : /gold|luxe/.test(k) ? '#FFF2C0' : ok(w.c2 || '#FFFFFF');
    box(q[0] + 0.04, q[1] + 0.01, q[2], 0.03, 0.012, 0.035, face, /smart|warp|diamond/.test(k) ? { emit: /warp/.test(k) ? 0.6 + Math.sin(t / 200) * 0.4 : 0.5 } : { spec: 1.2 }, 0.01);
  }

  // ---- head and face ----
  sph(0, H, 0, 0.31, skin, { spec: 0.9, shiny: 60 });
  const F = L.face || {}, ey = F.eyes || 'dots', mo = F.mouth || 'smile';
  for (const sg of [-1, 1]) {
    const side = 0.11 * sg, x = 0.275, yy = H + 0.04;
    const wink = ey === 'wink' && sg > 0;
    if (ey === 'happy' || wink) { box(x + 0.01, yy + 0.01, side - 0.025, 0.01, 0.01, 0.035, '#15171C', { rz: 0.6 }, 0.008); box(x + 0.01, yy + 0.01, side + 0.025, 0.01, 0.01, 0.035, '#15171C', { rz: -0.6 }, 0.008); }
    else if (ey === 'sleepy') { sph(x, yy - 0.01, side, 0.05, '#15171C', { ky: 0.45 }); box(x + 0.02, yy + 0.02, side, 0.008, 0.008, 0.055, dark(skin), {}, 0.006); }
    else if (ey === 'wide') { sph(x - 0.01, yy, side, 0.072, '#FFFFFF', { spec: 0.6 }); sph(x + 0.045, yy, side, 0.04, '#15171C', { spec: 1.4 }); }
    else { sph(x, yy, side, 0.052, '#15171C', { ky: 1.3, spec: 1.4 }); sph(x + 0.035, yy + 0.025, side + 0.015, 0.014, '#FFFFFF', { emit: 0.6 }); }
    if (ey === 'angry') box(x + 0.02, yy + 0.08, side, 0.01, 0.012, 0.05, '#15171C', { rz: 0.45 * sg }, 0.008);
    if (F.blush !== false) sph(0.25, H - 0.06, 0.185 * sg, 0.045, '#FF8FB0', { spec: 0.1, kz: 0.45 });
  }
  const my = H - 0.1;
  if (mo === 'smile' || mo === 'tongue') { for (const k of [-1, 0, 1]) sph(0.295, my + Math.abs(k) * 0.02, k * 0.04, 0.016, '#3A1A1A'); if (mo === 'tongue') sph(0.29, my - 0.03, 0.01, 0.028, '#FF6F91', { ky: 0.7 }); }
  else if (mo === 'grin') { box(0.29, my, 0, 0.012, 0.025, 0.075, '#3A1A1A', {}, 0.02); box(0.298, my + 0.008, 0, 0.008, 0.01, 0.065, '#FFFFFF', {}, 0.006); }
  else if (mo === 'o') sph(0.295, my, 0, 0.028, '#3A1A1A', { kz: 0.6 });
  else if (mo === 'flat') box(0.295, my, 0, 0.008, 0.008, 0.05, '#3A1A1A', {}, 0.006);

  // ---- glasses ----
  if (gl) {
    const k = String(gl.kind || ''), c = ok(gl.c), yy = H + 0.04;
    if (/round/.test(k)) { for (const sg of [-1, 1]) { sph(0.3, yy, 0.11 * sg, 0.072, '#2A2D33', { kz: 0.18 }); sph(0.31, yy, 0.11 * sg, 0.06, mix(c, '#FFFFFF', 0.6), { kz: 0.2, a: 0.55, spec: 1.6 }); } box(0.31, yy + 0.01, 0, 0.008, 0.008, 0.03, '#2A2D33'); }
    else if (/heart/.test(k)) { for (const sg of [-1, 1]) { const s2 = 0.11 * sg; sph(0.31, yy + 0.015, s2 - 0.025, 0.035, '#E5484D', { kz: 0.35 }); sph(0.31, yy + 0.015, s2 + 0.025, 0.035, '#E5484D', { kz: 0.35 }); box(0.31, yy - 0.02, s2, 0.012, 0.038, 0.038, '#E5484D', { rz: 0.785 }, 0.01); } box(0.31, yy + 0.01, 0, 0.008, 0.008, 0.03, '#C0392B'); }
    else if (/goggle/.test(k)) { tor(0, yy, 0, 0.315, 0.025, '#2A2D33'); box(0.29, yy, 0, 0.04, 0.07, 0.2, mix(c, '#9EF6FF', 0.3), { spec: 1.8, shiny: 90 }, 0.04); }
    else if (/visor|laser/.test(k)) { tor(0, yy, 0, 0.314, 0.018, '#2A2D33'); box(0.305, yy, 0, 0.02, 0.035, 0.2, '#FF2E4D', { emit: 0.9 }, 0.02); }
    else if (/3d/.test(k)) { box(0.3, yy, 0, 0.014, 0.055, 0.2, '#F4F4F6'); box(0.312, yy, -0.1, 0.006, 0.04, 0.07, '#E5484D', { a: 0.85 }); box(0.312, yy, 0.1, 0.006, 0.04, 0.07, '#3EC1FF', { a: 0.85 }); }
    else if (/diamond/.test(k)) { for (const sg of [-1, 1]) box(0.31, yy, 0.11 * sg, 0.012, 0.05, 0.05, '#9EF6FF', { rz: 0.785, emit: 0.4 + Math.sin(t / 150 + sg) * 0.3, spec: 2 }, 0.01); box(0.31, yy + 0.01, 0, 0.008, 0.008, 0.03, '#E3B341'); }
    else { for (const sg of [-1, 1]) box(0.305, yy, 0.105 * sg, 0.015, 0.045, 0.075, mix(c, '#15171C', 0.5), { spec: 1.8, shiny: 90 }, 0.03); box(0.31, yy + 0.02, 0, 0.008, 0.008, 0.035, '#2A2D33'); }
    for (const sg of [-1, 1]) if (!/goggle|visor|laser/.test(k)) box(0.17, yy + 0.01, 0.27 * sg, 0.13, 0.008, 0.008, '#2A2D33');
  }

  // ---- hair (most of it hides under a hat) ----
  if (hair && (!hat || /long/.test(hair.kind || ''))) {
    const k = String(hair.kind || ''), c = ok(hair.c), hp = Object.assign({ spec: 0.5 }, pat(hair));
    if (/afro/.test(k)) sph(-0.15, H + 0.17, 0, 0.4, c, Object.assign({ ky: 0.92 }, hp));
    else if (/cosmic/.test(k)) { sph(-0.15, H + 0.17, 0, 0.4, '#5A2A8A', { ky: 0.9, pat: 3, c2: '#9EF6FF', patS: 6, anim: 1, emit: 0.3 }); for (let i = 0; i < 5; i++) { const a = t / 600 + i * 1.26; sph(-0.05 + Math.cos(a) * 0.45, H + 0.15 + Math.sin(a * 1.7) * 0.15, Math.sin(a) * 0.45, 0.025, '#FFFFFF', { emit: 1 }); } }
    else if (/flame/.test(k)) { sph(-0.02, H + 0.1, 0, 0.318, '#FF7A1A', { ky: 0.62, emit: 0.4 }); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2, fl = 0.18 + Math.sin(t / 110 + i) * 0.04; cone(Math.cos(a) * 0.15 - 0.03, H + 0.3, Math.sin(a) * 0.15, 0.07, fl, i % 2 ? '#FFD23F' : '#FF5A2A', { emit: 1 }); } }
    else if (!hat) {
      sph(-0.02, H + 0.09, 0, 0.318, c, Object.assign({ ky: /buzz/.test(k) ? 0.6 : 0.68 }, hp));
      if (/spik/.test(k)) for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; cone(Math.cos(a) * 0.16 - 0.04, H + 0.3, Math.sin(a) * 0.16, 0.07, 0.16, c, { spec: 0.5 }); }
      if (/curl/.test(k)) for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2; sph(Math.cos(a) * 0.2 - 0.05, H + 0.24 + (i % 2) * 0.04, Math.sin(a) * 0.2, 0.1, c, hp); }
      if (/mohawk/.test(k)) for (let i = 0; i < 8; i++) { const hgt = 0.1 - Math.abs(i - 3) * 0.012; box(0.22 - i * 0.07, H + 0.25 + hgt, 0, 0.045, hgt, 0.03, c, {}, 0.025); }
    }
    if (/long/.test(k)) sph(-0.13, H - 0.16, 0, 0.3, c, Object.assign({ ky: 1.35, kz: 0.55 }, hp));
  }

  // ---- hats ----
  if (hat) {
    const k = String(hat.kind || ''), c = ok(hat.c), a = hat.c2 ? ok(hat.c2) : dark(c), hp = pat(hat);
    if (/crown/.test(k)) { cyl(0, H + 0.33, 0, 0.24, 0.07, '#E3B341', { spec: 1.6 }); for (let i = 0; i < 5; i++) { const an = i / 5 * Math.PI * 2; cone(Math.cos(an) * 0.2, H + 0.47, Math.sin(an) * 0.2, 0.05, 0.1, '#E3B341', { spec: 1.6 }); sph(Math.cos(an) * 0.24, H + 0.33, Math.sin(an) * 0.24, 0.025, i % 2 ? '#E5484D' : '#3EC1FF', { emit: 0.3, spec: 1.6 }); } }
    else if (/halo/.test(k)) tor(0, H + 0.48 + Math.sin(t / 400) * 0.02, 0, 0.22, 0.03, '#FFE38A', { emit: 1 });
    else if (/top/.test(k)) { cyl(0, H + 0.48, 0, 0.2, 0.22, c, Object.assign({ spec: 0.8 }, hp)); cyl(0, H + 0.33, 0, 0.205, 0.04, a); cyl(0, H + 0.27, 0, 0.34, 0.02, c, { spec: 0.6 }); }
    else if (/cowboy/.test(k)) { cyl(0, H + 0.24, 0, 0.5, 0.02, c); tor(0, H + 0.27, 0, 0.48, 0.03, c); sph(0, H + 0.34, 0, 0.24, c, Object.assign({ ky: 0.72 }, hp)); tor(0, H + 0.28, 0, 0.235, 0.025, a); }
    else if (/party/.test(k)) { cone(0, H + 0.52, 0, 0.16, 0.38, c, Object.assign({ spec: 0.6, rz: 0.2 }, hat.pat ? hp : { pat: 2, c2: a, patS: 9 })); sph(0.03, H + 0.73, -0.04, 0.05, a); }
    else if (/bucket/.test(k)) { cyl(0, H + 0.3, 0, 0.27, 0.09, c, hp); cyl(0, H + 0.22, 0, 0.42, 0.018, c); tor(0, H + 0.205, 0, 0.42, 0.02, a); }
    else if (/viking/.test(k)) { sph(0, H + 0.08, 0, 0.33, '#9AA0A8', { ky: 0.72, spec: 1.6, shiny: 90 }); box(0.02, H + 0.25, 0, 0.3, 0.02, 0.025, '#6E7684', { spec: 1.2 }); tor(0, H + 0.04, 0, 0.31, 0.03, c); for (const sg of [-1, 1]) cone(0, H + 0.24, 0.36 * sg, 0.06, 0.24, '#F4E7C7', { rz: -0.7 * sg }); }
    else if (/beanie|knit/.test(k)) { sph(0, H + 0.08, 0, 0.325, c, Object.assign({ ky: 0.78 }, hp)); tor(0, H + 0.04, 0, 0.3, 0.05, a); sph(0, H + 0.36, 0, 0.08, a); }
    else { sph(0, H + 0.09, 0, 0.322, c, Object.assign({ ky: 0.66, spec: 0.5 }, hp)); box(0.3, H + 0.09, 0, 0.17, 0.015, 0.2, a, { rx: 0 }, 0.012); sph(0, H + 0.3, 0, 0.03, a); }
  }

  // ---- things on your back ----
  if (back) {
    const k = String(back.kind || ''), c = ok(back.c), a = back.c2 ? ok(back.c2) : dark(c), bp = pat(back);
    const straps = () => { for (const sg of [-1, 1]) { box(0.28, T + 0.15, 0.17 * sg, 0.02, 0.2, 0.025, dark(c), { rx: 0 }, 0.01); } };
    if (/teddy|bear/.test(k)) {
      straps();
      sph(-0.46, T + 0.02, 0, 0.21, c, { kz: 0.8, spec: 0.3 });
      sph(-0.5, T + 0.28, 0, 0.15, c, { spec: 0.3 });
      for (const sg of [-1, 1]) { sph(-0.5, T + 0.41, 0.1 * sg, 0.055, c); sph(-0.48, T + 0.41, 0.1 * sg, 0.03, light(c)); sph(-0.62, T + 0.3, 0.055 * sg, 0.022, '#15171C', { spec: 1.4 }); sph(-0.47, T - 0.12, 0.17 * sg, 0.07, c); }
      sph(-0.63, T + 0.24, 0, 0.055, light(c)); sph(-0.68, T + 0.255, 0, 0.022, '#15171C');
      sph(-0.65, T + 0.02, 0, 0.09, light(c), { kz: 0.5 });
    } else if (/shell|turtle/.test(k)) {
      sph(-0.3, T + 0.03, 0, 0.44, c, Object.assign({ ky: 1.0, kz: 0.52, spec: 0.6 }, back.pat ? bp : { pat: 2, c2: a, patS: 8 }));
    } else if (/jet/.test(k)) {
      straps();
      for (const sg of [-1, 1]) { cyl(-0.47, T + 0.05, 0.12 * sg, 0.09, 0.22, c, { spec: 1.2 }); cone(-0.47, T - 0.22, 0.12 * sg, 0.07, 0.08, '#2A2D33', { rx: Math.PI }); const fl = 0.08 + Math.abs(Math.sin(t / 70 + sg)) * 0.06; sph(-0.47, T - 0.33 - fl / 2, 0.12 * sg, 0.05 + fl * 0.3, '#FFB347', { emit: 1, a: 0.85 }); }
      box(-0.42, T + 0.08, 0, 0.06, 0.12, 0.05, '#9AA0A8', { spec: 1.2 }, 0.02);
    } else if (/wing/.test(k)) {
      const wc = /angel/.test(k) ? '#FFFFFF' : c, fl = Math.sin(t / 350) * 0.12;
      for (const sg of [-1, 1]) for (let i = 0; i < 4; i++) { const out = 0.3 + i * 0.13, up2 = T + 0.32 - i * 0.12; sph(-0.42 - i * 0.04, up2, out * sg, 0.3 - i * 0.04, i % 2 ? mix(wc, '#DDE3EA', 0.35) : wc, { ky: 1.2 - i * 0.12, kz: 0.12, ry: ry - (0.55 + fl) * sg, spec: 0.5 }); }
    } else if (/guitar/.test(k)) {
      for (const sg of [-1]) box(0.28, T + 0.1, 0.12 * sg, 0.02, 0.32, 0.025, '#3A2418', { rx: 0.45 }, 0.01);
      sph(-0.44, T - 0.15, 0.1, 0.2, c, { kz: 0.3, spec: 0.8 }); sph(-0.44, T + 0.08, 0.04, 0.15, c, { kz: 0.3, spec: 0.8 });
      sph(-0.5, T - 0.1, 0.08, 0.05, '#15171C', { kz: 0.2 });
      box(-0.46, T + 0.38, -0.08, 0.025, 0.28, 0.03, '#6A4A2E', { rx: 0.45 }, 0.01);
      box(-0.46, T + 0.66, -0.21, 0.03, 0.06, 0.04, a, { rx: 0.45 }, 0.01);
    } else {
      straps();
      box(-0.45, T + 0.02, 0, 0.12, 0.26, 0.22, c, bp, 0.07);
      box(-0.58, T - 0.08, 0, 0.03, 0.1, 0.16, a, {}, 0.04);
      box(-0.59, T + 0.05, 0, 0.005, 0.005, 0.13, '#C9CDD4', { spec: 1.2 });
    }
  }
}
