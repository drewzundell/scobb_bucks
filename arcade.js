// ScobbBucks Arcade: 18 quick skill games. Each one gets 2 hearts.
export const HEARTS = 2;
// index.html keeps the same list of ids for the daily crate and payouts.
import { create as create3d } from './scobb3d.js?v=20261102i';

// 3D stage: a WebGL canvas where 1 world unit is 1 screen pixel, so game logic stays in pixels.
function stage3d(el, bg, opts) {
  el.style.background = bg;
  const c = document.createElement('canvas'); c.className = 'ag-3d'; el.appendChild(c);
  const W = el.clientWidth, H = el.clientHeight;
  const G = create3d(c, W, H, opts);
  return { c, G, W, H };
}
function sparks3d(el) {
  const ps = [];
  return {
    burst(x, y, col, n, sp) { for (let i = 0; i < (n || 14); i++) { const a = Math.random() * Math.PI * 2, v = (sp || 170) * (0.4 + Math.random() * 0.8); ps.push({ x, y, z: 30, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 80, vz: (Math.random() - 0.5) * 160, life: 0.55 + Math.random() * 0.35, t: 0, col, r: 2.5 + Math.random() * 3 }); } },
    text(x, y, str, col) { const d = document.createElement('div'); d.className = 'ag-float'; d.textContent = str; d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.color = col || '#fff'; el.appendChild(d); setTimeout(() => d.remove(), 850); },
    draw(G, dt) {
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]; p.t += dt; if (p.t >= p.life) { ps.splice(i, 1); continue; }
        p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt; p.vy += 520 * dt;
        const k = 1 - p.t / p.life;
        G.sphere(p.x, p.y, p.z, p.r * (0.4 + 0.6 * k), p.col, { emit: 0.55, spec: 0.6, a: Math.min(1, k * 1.6) });
      }
    }
  };
}

const R = (a, b) => a + Math.random() * (b - a);
const RI = (a, b) => Math.floor(R(a, b + 1));
const PICK = a => a[RI(0, a.length - 1)];
const SHUF = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = RI(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const COLS = ['#FF5DA2', '#FFC233', '#5BE38A', '#3EC1FF', '#B98BFF', '#FF7A1A'];
function timers() {
  const list = [];
  return {
    t(fn, ms) { const id = setTimeout(fn, ms); list.push(id); return id; },
    i(fn, ms) { const id = setInterval(fn, ms); list.push(id); return id; },
    clear() { list.forEach(id => { clearTimeout(id); clearInterval(id); }); list.length = 0; }
  };
}
function canvas(el) {
  const c = document.createElement('canvas');
  const dpr = Math.min(2, window.devicePixelRatio || 1), W = el.clientWidth, H = el.clientHeight;
  c.width = W * dpr; c.height = H * dpr; c.style.width = W + 'px'; c.style.height = H + 'px';
  el.appendChild(c);
  const x = c.getContext('2d');
  x.scale(dpr, dpr);
  return { c, x, W, H };
}
function loop(fn) {
  let on = true, last = performance.now();
  const f = now => { if (!on) return; const dt = Math.min(0.05, (now - last) / 1000); last = now; fn(dt); if (on) requestAnimationFrame(f); };
  requestAnimationFrame(f);
  return () => { on = false; };
}
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16), c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 'rgb(' + c.map(v => Math.round(f >= 0 ? v + (255 - v) * f : v * (1 + f))).join(',') + ')';
}
// A glossy 3D jelly ball with a soft contact shadow, rim light and shiny eyes.
function drawScobb(x, cx, cy, r, col, sx, sy) {
  sx = sx || 1; sy = sy || 1;
  x.save();
  x.fillStyle = 'rgba(0,0,0,.18)'; x.beginPath(); x.ellipse(cx, cy + r * sy + 4, r * 0.85 * sx, r * 0.22, 0, 0, 7); x.fill();
  x.translate(cx, cy); x.scale(sx, sy);
  const g = x.createRadialGradient(-r * 0.4, -r * 0.45, r * 0.1, 0, 0, r * 1.05);
  g.addColorStop(0, shade(col, 0.55)); g.addColorStop(0.45, col); g.addColorStop(1, shade(col, -0.38));
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = Math.max(1, r * 0.08); x.beginPath(); x.arc(0, 0, r * 0.9, 0.2 * Math.PI, 0.75 * Math.PI); x.stroke();
  for (const ex of [-0.35, 0.35]) {
    x.fillStyle = '#1E1B24'; x.beginPath(); x.ellipse(r * ex, -r * 0.08, r * 0.15, r * 0.19, 0, 0, 7); x.fill();
    x.fillStyle = '#fff'; x.beginPath(); x.arc(r * ex - r * 0.05, -r * 0.15, r * 0.06, 0, 7); x.fill();
  }
  x.fillStyle = 'rgba(255,255,255,.75)'; x.beginPath(); x.ellipse(-r * 0.38, -r * 0.55, r * 0.28, r * 0.14, -0.5, 0, 7); x.fill();
  x.restore();
}
// A spinning gold coin: the face narrows as it turns and shows its edge.
function drawCoin(x, cx, cy, r, phase) {
  const w = Math.max(0.12, Math.abs(Math.cos(phase)));
  x.save();
  x.fillStyle = 'rgba(0,0,0,.16)'; x.beginPath(); x.ellipse(cx + 3, cy + r + 3, r * 0.8 * w + 2, r * 0.18, 0, 0, 7); x.fill();
  x.fillStyle = '#A87A14'; x.beginPath(); x.ellipse(cx + (1 - w) * r * 0.35, cy, r * w + 1, r, 0, 0, 7); x.fill();
  const g = x.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  g.addColorStop(0, '#FFF3B0'); g.addColorStop(0.45, '#F2C14E'); g.addColorStop(1, '#B8860B');
  x.fillStyle = g; x.beginPath(); x.ellipse(cx, cy, r * w, r, 0, 0, 7); x.fill();
  x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 1.4; x.beginPath(); x.ellipse(cx, cy, r * w * 0.74, r * 0.74, 0, 0, 7); x.stroke();
  if (w > 0.45) { x.fillStyle = 'rgba(122,82,0,.85)'; x.font = `800 ${Math.round(r * 1.05)}px system-ui, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.save(); x.translate(cx, cy + 1); x.scale(w, 1); x.fillText('S', 0, 0); x.restore(); }
  x.restore();
}
// A block with a lit top face, a shaded front and a darker side, like a little 3D brick.
function drawBlock(x, bx, by, w, h, col, depth) {
  const d = depth == null ? Math.min(8, h * 0.45) : depth;
  x.save();
  x.fillStyle = 'rgba(0,0,0,.14)'; x.fillRect(bx + 4, by + 5, w, h);
  x.fillStyle = shade(col, -0.35);
  x.beginPath(); x.moveTo(bx + w, by); x.lineTo(bx + w + d * 0.6, by - d * 0.6); x.lineTo(bx + w + d * 0.6, by + h - d * 0.6); x.lineTo(bx + w, by + h); x.closePath(); x.fill();
  x.fillStyle = shade(col, 0.3);
  x.beginPath(); x.moveTo(bx, by); x.lineTo(bx + d * 0.6, by - d * 0.6); x.lineTo(bx + w + d * 0.6, by - d * 0.6); x.lineTo(bx + w, by); x.closePath(); x.fill();
  const g = x.createLinearGradient(0, by, 0, by + h);
  g.addColorStop(0, shade(col, 0.08)); g.addColorStop(1, shade(col, -0.18));
  x.fillStyle = g; x.fillRect(bx, by, w, h);
  x.fillStyle = 'rgba(255,255,255,.22)'; x.fillRect(bx + 2, by + 2, Math.max(0, w - 4), Math.max(1, h * 0.18));
  x.restore();
}
function sky(x, W, H, top, bottom) { const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bottom); x.fillStyle = g; x.fillRect(0, 0, W, H); }
// Little bursts of particles for hits, catches and landings.
function sparks() {
  const ps = [];
  return {
    burst(px, py, col, n, speed) { for (let i = 0; i < (n || 14); i++) { const a = Math.random() * Math.PI * 2, v = (speed || 160) * (0.4 + Math.random() * 0.8); ps.push({ x: px, y: py, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, life: 0.6 + Math.random() * 0.3, t: 0, col, r: 2 + Math.random() * 2.5 }); } },
    text(px, py, str, col) { ps.push({ x: px, y: py, vx: 0, vy: -70, life: 0.8, t: 0, col, str }); },
    draw(x, dt) {
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]; p.t += dt; if (p.t >= p.life) { ps.splice(i, 1); continue; }
        p.x += p.vx * dt; p.y += p.vy * dt; if (!p.str) p.vy += 420 * dt;
        const a = 1 - p.t / p.life;
        x.globalAlpha = a;
        if (p.str) { x.fillStyle = p.col; x.font = '800 18px system-ui, sans-serif'; x.textAlign = 'center'; x.fillText(p.str, p.x, p.y); }
        else { x.fillStyle = p.col; x.beginPath(); x.arc(p.x, p.y, p.r * (0.5 + a * 0.5), 0, 7); x.fill(); }
        x.globalAlpha = 1;
      }
    }
  };
}
function steer(c, W, onX) {
  const keys = {};
  const mv = e => { const r = c.getBoundingClientRect(); onX(Math.max(24, Math.min(W - 24, e.clientX - r.left))); };
  const kd = e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { keys[e.key] = e.type === 'keydown'; e.preventDefault(); } };
  c.addEventListener('pointermove', mv); c.addEventListener('pointerdown', mv);
  document.addEventListener('keydown', kd); document.addEventListener('keyup', kd);
  return { keys, off() { document.removeEventListener('keydown', kd); document.removeEventListener('keyup', kd); } };
}
function panel(el, html) { const d = document.createElement('div'); d.className = 'ag-center'; d.innerHTML = html; el.appendChild(d); return d; }
function countdown(T, bar, secs, onOut) {
  let left = secs;
  const id = T.i(() => { left -= 0.1; bar.style.width = Math.max(0, (left / secs) * 100) + '%'; if (left <= 0) { clearInterval(id); onOut(); } }, 100);
  return () => clearInterval(id);
}
const WORDS = ['jelly', 'scobb', 'farm', 'coin', 'mythic', 'castle', 'dragon', 'market', 'legend', 'vault', 'trade', 'closet', 'pizza', 'bounce', 'spear', 'rocket', 'sprint', 'meadow', 'cannon', 'tower', 'gold', 'shield', 'wizard', 'crown'];
const INKS = [['Red', '#E5484D'], ['Blue', '#3E7BF2'], ['Green', '#2F9E44'], ['Yellow', '#E0A800'], ['Purple', '#8B4FE0']];
const CARDS = ['🍮', '🪙', '🐷', '🐉', '🍕', '👑', '🌈', '🚀'];

export const GAMES = {
  tap: {
    name: 'Coin pop', emoji: '🎯', how: 'Coins pop up all over. Tap each one before it disappears. Missing a coin or tapping empty space costs a heart. Pop 15.',
    start(el, api) {
      const T = timers(); let hits = 0;
      const spawn = () => {
        const b = document.createElement('button'), s = 50;
        b.className = 'ag-target'; b.textContent = 'S';
        b.style.left = R(4, el.clientWidth - s - 4) + 'px'; b.style.top = R(4, el.clientHeight - s - 4) + 'px';
        el.appendChild(b);
        const life = Math.max(560, 950 - hits * 30);
        const t = T.t(() => { b.remove(); api.heart(); }, life);
        b.onpointerdown = e => { e.preventDefault(); clearTimeout(t); b.remove(); hits++; api.status(`${hits}/15`); if (hits >= 15) api.win(); };
        T.t(spawn, Math.max(330, 650 - hits * 22));
      };
      const miss = e => { if (e.target === el) { e.preventDefault(); api.heart(); } };
      el.addEventListener('pointerdown', miss);
      api.status('0/15'); spawn();
      return () => { T.clear(); el.removeEventListener('pointerdown', miss); };
    }
  },
  react: {
    name: 'Quick draw', emoji: '⚡', how: 'Wait for the pad to turn green, then tap it fast. Tapping early, or taking longer than 0.33 seconds, costs a heart. Get 5.',
    start(el, api) {
      const T = timers(); let n = 0, state = 'x', go = 0;
      const pad = document.createElement('button'); pad.className = 'ag-pad'; el.appendChild(pad);
      const round = () => {
        state = 'wait'; pad.style.background = '#E5484D'; pad.textContent = 'Wait…';
        T.t(() => {
          if (state !== 'wait') return;
          state = 'go'; go = performance.now(); pad.style.background = '#2F9E44'; pad.textContent = 'TAP!';
          T.t(() => { if (state === 'go') { state = 'x'; pad.style.background = '#6B6280'; pad.textContent = 'Too slow!'; if (api.heart()) T.t(round, 800); } }, 330);
        }, R(1200, 3400));
      };
      pad.onpointerdown = e => {
        e.preventDefault();
        if (state === 'wait') { state = 'x'; T.clear(); pad.style.background = '#6B6280'; pad.textContent = 'Too early!'; if (api.heart()) T.t(round, 900); }
        else if (state === 'go') { state = 'x'; n++; api.status(`${n}/5`); pad.textContent = `${Math.round(performance.now() - go)} ms`; if (n >= 5) api.win(); else T.t(round, 800); }
      };
      api.status('0/5'); round();
      return () => T.clear();
    }
  },
  simon: {
    name: 'Scobb says', emoji: '🎵', how: 'Watch the pads light up, then repeat the pattern. Patterns get longer. Finish 4. A wrong pad costs a heart.',
    start(el, api) {
      const T = timers(); let seq = [], len = 4, pos = 0, input = false, done = 0;
      const box = document.createElement('div'); box.className = 'ag-simon'; el.appendChild(box);
      const pads = [0, 1, 2, 3].map(i => { const b = document.createElement('button'); b.style.background = COLS[i]; box.appendChild(b); return b; });
      const flash = (i, ms) => { pads[i].classList.add('lit'); T.t(() => pads[i].classList.remove('lit'), ms); };
      const show = () => { input = false; pos = 0; seq.forEach((v, k) => T.t(() => flash(v, 220), 450 + k * 340)); T.t(() => { input = true; }, 450 + seq.length * 340); };
      const fresh = () => { seq = Array.from({ length: len }, () => RI(0, 3)); show(); };
      pads.forEach((b, i) => { b.onpointerdown = e => {
        e.preventDefault();
        if (!input) return;
        flash(i, 180);
        if (seq[pos] !== i) { input = false; if (api.heart()) T.t(show, 800); return; }
        pos++;
        if (pos >= seq.length) { input = false; done++; api.status(`${done}/4`); if (done >= 4) return api.win(); len++; T.t(fresh, 800); }
      }; });
      api.status('0/4'); fresh();
      return () => T.clear();
    }
  },
  bar: {
    name: 'Stop the bar', emoji: '🛑', how: 'Tap Stop (or press space) when the slider is in the green zone. It gets faster and the zone shrinks. Hit it 6 times. A miss costs a heart.',
    start(el, api) {
      const wrap = document.createElement('div'); wrap.className = 'ag-bar'; wrap.innerHTML = '<i class="z"></i><i class="m"></i>'; el.appendChild(wrap);
      const tap = document.createElement('button'); tap.className = 'btn btn-grape ag-tapbtn'; tap.textContent = 'Stop!'; el.appendChild(tap);
      const z = wrap.querySelector('.z'), m = wrap.querySelector('.m');
      let n = 0, x = 0, dir = 1, zs = 0, zw = 0, sp = 1.1, pause = 0;
      const setZone = () => { zw = Math.max(0.055, 0.15 - n * 0.02); zs = R(0.04, 0.96 - zw); z.style.left = zs * 100 + '%'; z.style.width = zw * 100 + '%'; };
      setZone();
      const stop = loop(dt => { if (pause > 0) { pause -= dt; return; } x += dir * sp * dt; if (x > 1) { x = 1; dir = -1; } if (x < 0) { x = 0; dir = 1; } m.style.left = `calc(${x * 100}% - 3px)`; });
      const hit = () => { if (pause > 0) return; pause = 0.5; if (x >= zs && x <= zs + zw) { n++; api.status(`${n}/6`); if (n >= 6) return api.win(); sp += 0.22; setZone(); } else if (api.heart()) setZone(); };
      tap.onpointerdown = e => { e.preventDefault(); hit(); };
      const key = e => { if (e.code === 'Space') { e.preventDefault(); hit(); } };
      document.addEventListener('keydown', key);
      api.status('0/6');
      return () => { stop(); document.removeEventListener('keydown', key); };
    }
  },
  catch: {
    name: 'Coin catcher', emoji: '🧺', how: 'Slide your finger or mouse (or use the arrow keys) to move the basket. Catch the falling coins. Each one you miss costs a heart. Catch 15.',
    start(el, api) {
      const { c, G, W, H } = stage3d(el, 'radial-gradient(130% 100% at 50% 0%, #343A7A 0%, #181A3C 55%, #0D0E22 100%)', { sky: '#9AA8FF', ground: '#2B2547', fov: 34 });
      let bx = W / 2, coins = [], next = 0.4, got = 0, clock = 0;
      const fx = sparks3d(el), s = steer(c, W, v => { bx = v; });
      api.status('0/15');
      const stop = loop(dt => {
        clock += dt; next -= dt;
        if (s.keys.ArrowLeft) bx = Math.max(30, bx - 460 * dt);
        if (s.keys.ArrowRight) bx = Math.min(W - 30, bx + 460 * dt);
        if (next <= 0) { coins.push({ x: R(20, W - 20), y: -16, v: 245 + got * 16 + R(0, 60), ph: R(0, 6), spin: R(4, 8) }); next = Math.max(0.38, 0.75 - got * 0.03); }
        G.begin();
        for (let i = 0; i < 22; i++) G.sphere((i * 97) % W, (i * 53) % (H * 0.75), -160, 1.8, '#FFFFFF', { emit: 1, a: 0.35 + 0.3 * Math.sin(clock * 2 + i) });
        for (const k of coins.slice()) {
          k.y += k.v * dt; k.ph += k.spin * dt;
          if (k.y > H - 52 && k.y < H - 18 && Math.abs(k.x - bx) < 34) { coins.splice(coins.indexOf(k), 1); got++; fx.burst(k.x, H - 44, '#FFD34D', 14); fx.text(k.x, H - 80, '+1', '#FFE38A'); api.status(`${got}/15`); if (got >= 15) return api.win(); }
          else if (k.y > H + 16) { coins.splice(coins.indexOf(k), 1); fx.burst(k.x, H - 8, '#FF5A5F', 12, 140); if (!api.heart()) return; }
        }
        for (const k of coins) { G.shadow(k.x, k.y, 17, 17, 0.25); G.coin(k.x, k.y, 0, 14, k.ph); }
        const by = H - 30;
        G.shadow(bx, by + 6, 48, 18, 0.4);
        G.cyl(bx, by, 0, 34, 15, '#C58A4E', { spec: 0.35, stripe: 0.22, c2: '#9C6534' });
        G.sphere(bx, by - 15, 0, 30, '#3A2412', { ky: 0.12, spec: 0.1 });
        G.torus(bx, by - 15, 0, 35, '#E9BE85', { tube: 6, spec: 0.6 });
        fx.draw(G, dt);
      });
      return () => { stop(); s.off(); G.destroy(); };
    }
  },
  dodge: {
    name: 'Block dodge', emoji: '🧱', how: 'Move your scobb left and right (finger, mouse or arrow keys) to dodge falling blocks. Survive 20 seconds. Each hit costs a heart.',
    start(el, api) {
      const { c, G, W, H } = stage3d(el, 'linear-gradient(#F4F5FB, #C9CFE4)', { sky: '#FFFFFF', ground: '#8E97B8' });
      let px = W / 2, blocks = [], t = 0, next = 0, inv = 0;
      const fx = sparks3d(el), s = steer(c, W, v => { px = v; });
      const stop = loop(dt => {
        t += dt; inv -= dt; next -= dt;
        if (s.keys.ArrowLeft) px = Math.max(20, px - 360 * dt);
        if (s.keys.ArrowRight) px = Math.min(W - 20, px + 360 * dt);
        if (next <= 0) { blocks.push({ x: R(0, W - 50), y: -30, w: R(34, 70), v: 280 + t * 16, rot: R(-0.5, 0.5), spin: R(-2, 2) }); next = Math.max(0.15, 0.42 - t * 0.02); }
        for (const b of blocks) { b.y += b.v * dt; b.rot += b.spin * dt; }
        blocks = blocks.filter(b => b.y < H + 40);
        const py = H - 30;
        if (inv <= 0 && blocks.some(b => px + 14 > b.x && px - 14 < b.x + b.w && py + 14 > b.y && py - 14 < b.y + 26)) {
          inv = 1.1;
          fx.burst(px, py, '#FF6B6F', 20, 220);
          if (!api.heart()) return;
          blocks = blocks.filter(b => b.y < H - 160);
        }
        api.status(`${Math.max(0, Math.ceil(20 - t))}s left`);
        if (t >= 20) return api.win();
        G.begin();
        for (const b of blocks) { G.shadow(b.x + b.w / 2, b.y + 13, b.w * 0.6, 18, 0.22); G.box(b.x + b.w / 2, b.y + 13, 0, b.w / 2, 13, 14, 6, '#7C4DEB', { ry: b.rot, rx: 0.35, spec: 0.7 }); }
        G.shadow(px, py, 20, 18, 0.3);
        if (inv <= 0 || Math.floor(inv * 10) % 2) G.scobb(px, py, 10, 15, '#3EC1FF');
        fx.draw(G, dt);
      });
      return () => { stop(); s.off(); G.destroy(); };
    }
  },
  jump: {
    name: 'Scobb jump', emoji: '🦘', how: 'Your scobb bounces on its own. Steer left and right (finger, mouse or arrow keys) to land on platforms and climb. Some platforms move. Reach platform 30. Falling off the bottom costs a heart.',
    start(el, api) {
      const { c, G, W, H } = stage3d(el, 'linear-gradient(#8FCBFF, #EAF5FF)', { sky: '#FFFFFF', ground: '#7FA3C9' });
      const GOAL = 30, PW = 56, BOUNCE = -640, GRAV = 1550;
      let plats = [], nextY = H - 30, id = 0, camY = 0, best = 0, tx = W / 2, squash = 0;
      const fx = sparks3d(el);
      const addPlat = () => {
        const gap = Math.min(108, 66 + id * 1.7);
        plats.push({ id, x: id === 0 ? W / 2 - PW / 2 : R(4, W - PW - 4), y: nextY, vx: id > 4 && Math.random() < 0.55 ? PICK([-1, 1]) * R(70, 115 + id * 3.5) : 0 });
        id++; nextY -= gap;
      };
      while (nextY > -H) addPlat();
      let last = plats[0];
      const pl = { x: W / 2, y: H - 60, vy: BOUNCE };
      const s = steer(c, W, v => { tx = v; });
      api.status(`0/${GOAL}`);
      const stop = loop(dt => {
        if (s.keys.ArrowLeft) tx = Math.max(14, tx - 460 * dt);
        if (s.keys.ArrowRight) tx = Math.min(W - 14, tx + 460 * dt);
        pl.x += (tx - pl.x) * Math.min(1, dt * 9);
        const prevY = pl.y;
        pl.vy += GRAV * dt; pl.y += pl.vy * dt;
        for (const p of plats) if (p.vx) { p.x += p.vx * dt; if (p.x < 0) { p.x = 0; p.vx *= -1; } if (p.x + PW > W) { p.x = W - PW; p.vx *= -1; } }
        if (pl.vy > 0) for (const p of plats) {
          if (prevY + 14 <= p.y + 1 && pl.y + 14 >= p.y && pl.x > p.x - 8 && pl.x < p.x + PW + 8) {
            pl.vy = BOUNCE; pl.y = p.y - 14; last = p; squash = 1; fx.burst(pl.x, p.y - camY, p.vx ? '#7CD3FF' : '#7EE0A2', 10, 110);
            if (p.id > best) { best = p.id; api.status(`${Math.min(best, GOAL)}/${GOAL}`); if (best >= GOAL) return api.win(); }
            break;
          }
        }
        camY = Math.min(camY, pl.y - H * 0.42);
        while (nextY > camY - 120) addPlat();
        plats = plats.filter(p => p.y < camY + H + 40 || p === last);
        if (pl.y - camY > H + 30) {
          if (!api.heart()) return;
          pl.x = last.x + PW / 2; tx = pl.x; pl.y = last.y - 14; pl.vy = BOUNCE; last.vx = 0;
          camY = last.y - H * 0.62;
        }
        squash = Math.max(0, squash - dt * 5);
        G.begin();
        for (let i = 0; i < 6; i++) { const cy = ((i * 170 - camY * 0.3) % (H + 140) + H + 140) % (H + 140) - 70, cx = (i * 131) % W; for (const [ox, oy, rr] of [[0, 0, 26], [24, -8, 20], [-22, 4, 18]]) G.sphere(cx + ox, cy + oy, -120, rr, '#FFFFFF', { spec: 0.1, ky: 0.75 }); }
        for (const p of plats) {
          const sy = p.y - camY;
          if (sy < -30 || sy > H + 30) continue;
          const col = p.id === GOAL ? '#F2B531' : p.vx ? '#3E9BFF' : '#3FBF77';
          G.shadow(p.x + PW / 2, sy + 6, PW * 0.6, 10, 0.22);
          G.box(p.x + PW / 2, sy + 5, 0, PW / 2, 5, 16, 4, col, { spec: 0.6, rx: 0.5 });
          if (p.id === GOAL) { G.cyl(p.x + PW / 2, sy - 18, 0, 2, 22, '#6B4426'); G.box(p.x + PW / 2 + 12, sy - 32, 0, 11, 7, 1.5, 1.5, '#E5484D', { ry: 0.3 }); }
        }
        const stretch = pl.vy < 0 ? Math.min(0.18, -pl.vy / 4000) : 0;
        G.shadow(pl.x, pl.y - camY, 18, 16, 0.25);
        G.scobb(pl.x, pl.y - camY, 14, 15, '#B98BFF', { kx: 1 + squash * 0.25 - stretch, ky: 1 - squash * 0.22 + stretch });
        fx.draw(G, dt);
      });
      return () => { stop(); s.off(); G.destroy(); };
    }
  },
  count: {
    name: 'Quick count', emoji: '🔢', how: 'Dots flash for a moment. Pick how many there were. Get 5 right. A wrong answer costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0;
      const round = () => {
        el.innerHTML = '';
        const want = RI(11 + n * 2, 16 + n * 2), W = el.clientWidth, H = el.clientHeight, pts = [];
        let tries = 0;
        while (pts.length < want && tries++ < 3000) { const p = { x: R(18, W - 18), y: R(18, H - 18) }; if (pts.every(q => Math.hypot(q.x - p.x, q.y - p.y) > 30)) pts.push(p); }
        pts.forEach(p => { const d = document.createElement('i'); d.className = 'ag-dot'; d.style.left = p.x - 10 + 'px'; d.style.top = p.y - 10 + 'px'; d.style.background = PICK(COLS); el.appendChild(d); });
        const real = pts.length;
        T.t(() => {
          el.innerHTML = '';
          const set = new Set([real]); while (set.size < 4) set.add(Math.max(1, real + PICK([-1, 1]) * RI(1, 3)));
          const box = panel(el, `<div class="ag-q">How many?</div><div class="ag-opts">${SHUF([...set]).map(o => `<button class="btn btn-ghost" data-v="${o}">${o}</button>`).join('')}</div>`);
          box.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { if (Number(b.dataset.v) === real) { n++; api.status(`${n}/5`); if (n >= 5) return api.win(); round(); } else { b.classList.add('ag-wrong'); if (api.heart()) T.t(round, 600); } }; });
        }, 750);
      };
      api.status('0/5'); round();
      return () => T.clear();
    }
  },
  odd: {
    name: 'Odd one out', emoji: '🎨', how: 'One square is a slightly different color. Tap it within 4 seconds. Get 7. A wrong tap or running out of time costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0, tm = 0;
      const round = () => {
        el.innerHTML = ''; clearTimeout(tm);
        const size = Math.min(6, 3 + Math.floor(n / 2)), hue = RI(0, 359), d = Math.max(4, 14 - n * 2), odd = RI(0, size * size - 1);
        const g = document.createElement('div'); g.className = 'ag-grid ag-sq'; g.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        for (let i = 0; i < size * size; i++) {
          const b = document.createElement('button');
          b.style.background = `hsl(${hue} 70% ${i === odd ? 52 + d : 52}%)`;
          b.onclick = () => { clearTimeout(tm); if (i === odd) { n++; api.status(`${n}/7`); if (n >= 7) return api.win(); round(); } else { b.classList.add('ag-wrong'); if (api.heart()) T.t(round, 450); } };
          g.appendChild(b);
        }
        el.appendChild(g);
        tm = T.t(() => { if (api.heart()) round(); }, 4000);
      };
      api.status('0/7'); round();
      return () => T.clear();
    }
  },
  type: {
    name: 'Speed typer', emoji: '⌨️', how: 'Type each word before the timer runs out. Get 6 words. Running out of time costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0, word = '', stopT = null;
      const box = panel(el, `<div class="ag-q" id="ag-w"></div><div class="ag-timer"><i></i></div><input class="ag-input" id="ag-in" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Type the word">`);
      const inp = box.querySelector('#ag-in'), wEl = box.querySelector('#ag-w'), bar = box.querySelector('.ag-timer i');
      const next = () => { if (stopT) stopT(); word = PICK(WORDS); wEl.textContent = word; inp.value = ''; stopT = countdown(T, bar, Math.max(2.8, 4.3 - n * 0.3), () => { if (api.heart()) next(); }); inp.focus(); };
      inp.oninput = () => { if (inp.value.trim().toLowerCase() === word) { stopT(); n++; api.status(`${n}/6`); if (n >= 6) return api.win(); next(); } };
      api.status('0/6'); next();
      return () => T.clear();
    }
  },
  flappy: {
    name: 'Flappy scobb', emoji: '🐤', how: 'Tap or press space to flap. Fly through 8 gaps. Hitting a pipe, the ground or the sky costs a heart.',
    start(el, api) {
      const { c, G, W, H } = stage3d(el, 'linear-gradient(#7CC8FF, #E6F6FF)', { sky: '#FFFFFF', ground: '#6E9F7A' });
      const GAP = Math.max(104, H * 0.24), SPD = 210, PX = 70;
      let y = H / 2, v = 0, pipes = [], passed = 0, grace = 1.2, scroll = 0;
      const fx = sparks3d(el);
      const add = px => pipes.push({ x: px, gy: R(50, H - 50 - GAP), done: false });
      add(W + 40); add(W + 240);
      const flap = e => { if (e) e.preventDefault(); v = -300; };
      c.addEventListener('pointerdown', flap);
      const key = e => { if (e.code === 'Space') flap(e); };
      document.addEventListener('keydown', key);
      api.status('0/8');
      const stop = loop(dt => {
        grace -= dt; scroll += SPD * dt;
        v += 900 * dt; y += v * dt;
        for (const p of pipes) { p.x -= SPD * dt; if (!p.done && p.x + 52 < PX - 13) { p.done = true; passed++; fx.burst(PX + 10, y, '#FFE38A', 12, 130); api.status(`${passed}/8`); if (passed >= 8) return api.win(); } }
        if (pipes.length && pipes[0].x < -60) pipes.shift();
        if (!pipes.length || pipes[pipes.length - 1].x < W - 190) add(pipes.length ? pipes[pipes.length - 1].x + 200 : W + 40);
        let hit = y > H - 13 || y < 13;
        for (const p of pipes) if (PX + 12 > p.x && PX - 12 < p.x + 52 && (y - 12 < p.gy || y + 12 > p.gy + GAP)) hit = true;
        if (grace > 0) { y = Math.min(Math.max(y, 20), H - 20); }
        else if (hit) {
          fx.burst(PX, y, '#FF6B6F', 20, 220);
          if (!api.heart()) return;
          y = H / 2; v = 0; grace = 1.2;
          pipes = pipes.filter(p => p.x > PX + 40);
        }
        G.begin();
        for (let i = 0; i < 5; i++) { const hx = ((i * 160 - scroll * 0.25) % (W + 320) + W + 320) % (W + 320) - 160; G.sphere(hx, H + 30, -160, 95, i % 2 ? '#9ED7A9' : '#86C995', { spec: 0.1, ky: 0.6 }); }
        for (const p of pipes) {
          const cx = p.x + 26;
          G.cyl(cx, p.gy / 2, 0, 24, p.gy / 2, '#43A853', { spec: 0.8, shiny: 30 });
          G.cyl(cx, p.gy - 8, 0, 29, 8, '#5BC36A', { spec: 0.9, shiny: 30 });
          const bh = H - p.gy - GAP;
          G.cyl(cx, p.gy + GAP + bh / 2, 0, 24, bh / 2, '#43A853', { spec: 0.8, shiny: 30 });
          G.cyl(cx, p.gy + GAP + 8, 0, 29, 8, '#5BC36A', { spec: 0.9, shiny: 30 });
        }
        if (grace <= 0 || Math.floor(grace * 10) % 2) G.scobb(PX, y, 20, 15, '#FFC233', { rz: -Math.max(-0.5, Math.min(0.8, v / 600)), face: 0.6 });
        fx.draw(G, dt);
      });
      return () => { stop(); document.removeEventListener('keydown', key); G.destroy(); };
    }
  },
  whack: {
    name: 'Whack-a-scobb', emoji: '🔨', how: 'Tap scobbs when they pop up, but never tap a bomb. Letting a scobb escape or tapping a bomb costs a heart. Whack 15.',
    start(el, api) {
      const T = timers(); let n = 0;
      const g = document.createElement('div'); g.className = 'ag-grid ag-holes ag-sq'; g.style.gridTemplateColumns = 'repeat(3, 1fr)'; el.appendChild(g);
      const holes = Array.from({ length: 9 }, () => { const b = document.createElement('button'); b.className = 'ag-hole'; g.appendChild(b); return b; });
      const clear = b => { b.dataset.k = ''; b.innerHTML = ''; };
      const pop = () => {
        const free = holes.filter(b => !b.dataset.k);
        if (free.length) {
          const b = PICK(free), bomb = Math.random() < 0.36;
          b.dataset.k = bomb ? 'bomb' : 'scobb';
          b.innerHTML = bomb ? '<span class="ag-bomb">💣</span>' : '<i class="ag-sc"></i>';
          b._t = T.t(() => { const k = b.dataset.k; clear(b); if (k === 'scobb') api.heart(); }, Math.max(460, 780 - n * 20));
        }
        T.t(pop, Math.max(290, 560 - n * 15));
      };
      holes.forEach(b => { b.onpointerdown = e => { e.preventDefault(); const k = b.dataset.k; if (!k) return; clearTimeout(b._t); clear(b); if (k === 'bomb') api.heart(); else { n++; api.status(`${n}/15`); if (n >= 15) api.win(); } }; });
      api.status('0/15'); pop();
      return () => T.clear();
    }
  },
  grid: {
    name: 'Tile memory', emoji: '🧠', how: 'Some tiles light up. Remember them, then tap all of them. Clear 5 rounds. A wrong tile costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0, want = new Set(), got = new Set(), input = false;
      const g = document.createElement('div'); g.className = 'ag-grid ag-mem ag-sq'; g.style.gridTemplateColumns = 'repeat(4, 1fr)'; el.appendChild(g);
      const tiles = Array.from({ length: 16 }, () => { const b = document.createElement('button'); g.appendChild(b); return b; });
      const round = () => {
        input = false; got = new Set();
        const k = 4 + n; want = new Set(SHUF([...Array(16).keys()]).slice(0, k));
        tiles.forEach((b, i) => { b.className = want.has(i) ? 'lit' : ''; });
        T.t(() => { tiles.forEach(b => { b.className = ''; }); input = true; }, 700 + k * 75);
      };
      tiles.forEach((b, i) => { b.onpointerdown = e => {
        e.preventDefault();
        if (!input || got.has(i)) return;
        if (want.has(i)) { got.add(i); b.className = 'good'; if (got.size === want.size) { input = false; n++; api.status(`${n}/5`); if (n >= 5) return api.win(); T.t(round, 700); } }
        else { b.className = 'bad'; input = false; if (api.heart()) T.t(round, 800); }
      }; });
      api.status('0/5'); round();
      return () => T.clear();
    }
  },
  stack: {
    name: 'Stacker', emoji: '🏗️', how: 'Tap (or press space) to drop the sliding block on the tower. Only the part that lands stays. Missing the tower costs a heart. Stack 10.',
    start(el, api) {
      const { c, G, W, H } = stage3d(el, 'radial-gradient(120% 90% at 50% 0%, #FFFFFF 0%, #E4DEFA 60%, #CFC6F3 100%)', { sky: '#FFFFFF', ground: '#9C92C9' });
      const BH = Math.min(28, (H - 20) / 12), base = Math.min(150, W * 0.45);
      let stack = [{ x: W / 2 - base / 2, w: base }], cur, dir = 1, sp = 210, pause = 0, debris = [];
      const fx = sparks3d(el);
      const newBlock = () => { const top = stack[stack.length - 1]; cur = { x: 0, w: top.w }; dir = 1; sp = 210 + stack.length * 26; };
      newBlock();
      const drop = e => {
        if (e) e.preventDefault();
        if (pause > 0) return;
        const top = stack[stack.length - 1], l = Math.max(cur.x, top.x), r = Math.min(cur.x + cur.w, top.x + top.w);
        pause = 0.25;
        const yy = H - (stack.length + 1) * BH, col = COLS[stack.length % COLS.length];
        if (r - l <= 3) { debris.push({ x: cur.x, y: yy, w: cur.w, vy: 0, rot: 0, col }); if (!api.heart()) return; newBlock(); return; }
        if (cur.x < l) debris.push({ x: cur.x, y: yy, w: l - cur.x, vy: 0, rot: 0, col });
        if (cur.x + cur.w > r) debris.push({ x: r, y: yy, w: cur.x + cur.w - r, vy: 0, rot: 0, col });
        if (r - l > top.w - 4) fx.text(l + (r - l) / 2, yy - 24, 'Perfect!', '#6B3FD9');
        fx.burst(l + (r - l) / 2, yy + BH / 2, '#FFFFFF', 10, 90);
        stack.push({ x: l, w: r - l }); api.status(`${stack.length - 1}/10`);
        if (stack.length - 1 >= 10) return api.win();
        newBlock();
      };
      c.addEventListener('pointerdown', drop);
      const key = e => { if (e.code === 'Space') drop(e); };
      document.addEventListener('keydown', key);
      api.status('0/10');
      const blk = (x, y, w, col, o) => G.box(x + w / 2, y + (BH - 2) / 2, 0, w / 2, (BH - 2) / 2, 24, 4, col, Object.assign({ rx: 0.42, spec: 0.55 }, o));
      const stop = loop(dt => {
        pause -= dt;
        cur.x += dir * sp * dt;
        if (cur.x + cur.w > W) { cur.x = W - cur.w; dir = -1; } if (cur.x < 0) { cur.x = 0; dir = 1; }
        G.begin();
        G.shadow(W / 2, H - 4, base * 0.7, 18, 0.25);
        stack.forEach((b, i) => blk(b.x, H - (i + 1) * BH, b.w, COLS[i % COLS.length]));
        blk(cur.x, H - (stack.length + 1) * BH, cur.w, COLS[stack.length % COLS.length]);
        for (let i = debris.length - 1; i >= 0; i--) { const d = debris[i]; d.vy += 900 * dt; d.y += d.vy * dt; d.rot += dt * 2.4; if (d.y > H + 50) { debris.splice(i, 1); continue; } blk(d.x, d.y, d.w, d.col, { rz: d.rot * (d.x < W / 2 ? 1 : -1) }); }
        fx.draw(G, dt);
      });
      return () => { stop(); document.removeEventListener('keydown', key); G.destroy(); };
    }
  },
  stroop: {
    name: 'Color clash', emoji: '🌈', how: 'Tap the color the word is painted in, not what the word says. Get 10. You have about 2 seconds each. A miss costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0, stopT = null;
      const box = panel(el, '');
      const q = () => {
        if (stopT) stopT();
        const word = PICK(INKS), ink = PICK(INKS.filter(c => c !== word));
        const opts = SHUF([ink, ...SHUF(INKS.filter(c => c !== ink)).slice(0, 3)]);
        box.innerHTML = `<div class="ag-q ag-word" style="color:${ink[1]}">${word[0].toUpperCase()}</div><div class="ag-timer"><i></i></div><div class="ag-opts">${opts.map(o => `<button class="btn btn-ghost" data-v="${o[0]}">${o[0]}</button>`).join('')}</div>`;
        stopT = countdown(T, box.querySelector('.ag-timer i'), Math.max(1.3, 1.9 - n * 0.06), () => { if (api.heart()) q(); });
        box.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { stopT(); if (b.dataset.v === ink[0]) { n++; api.status(`${n}/10`); if (n >= 10) return api.win(); q(); } else { b.classList.add('ag-wrong'); if (api.heart()) T.t(q, 400); } }; });
      };
      api.status('0/10'); q();
      return () => T.clear();
    }
  },
  hoop: {
    name: 'Hoop shot', emoji: '🏀', how: 'The power meter swings up and down. Tap Shoot (or press space) when it’s in the green band. Make 5 shots. A miss costs a heart.',
    start(el, api) {
      const wrap = document.createElement('div'); wrap.className = 'ag-hoop';
      wrap.innerHTML = '<div class="ag-meter"><i class="z"></i><i class="m"></i></div><div class="ag-court"><div class="ag-rim"></div><div class="ag-ball">🏀</div><div class="ag-say"></div></div>';
      el.appendChild(wrap);
      const tap = document.createElement('button'); tap.className = 'btn btn-grape ag-tapbtn'; tap.textContent = 'Shoot!'; el.appendChild(tap);
      const z = wrap.querySelector('.z'), m = wrap.querySelector('.m'), ball = wrap.querySelector('.ag-ball'), say = wrap.querySelector('.ag-say');
      let n = 0, y = 0, dir = 1, sp = 1.3, zs = 0, zw = 0, pause = 0;
      const setZone = () => { zw = Math.max(0.06, 0.13 - n * 0.017); zs = R(0.45, 0.92 - zw); z.style.bottom = zs * 100 + '%'; z.style.height = zw * 100 + '%'; };
      setZone();
      const stop = loop(dt => { if (pause > 0) { pause -= dt; if (pause <= 0) { ball.className = 'ag-ball'; say.textContent = ''; } return; } y += dir * sp * dt; if (y > 1) { y = 1; dir = -1; } if (y < 0) { y = 0; dir = 1; } m.style.bottom = `calc(${y * 100}% - 3px)`; });
      const shoot = () => {
        if (pause > 0) return;
        pause = 0.9;
        const make = y >= zs && y <= zs + zw;
        ball.className = 'ag-ball ' + (make ? 'make' : y > zs ? 'long' : 'short');
        say.textContent = make ? 'Swish!' : 'Miss!';
        if (make) { n++; api.status(`${n}/5`); if (n >= 5) return api.win(); sp += 0.2; setZone(); } else if (api.heart()) setZone();
      };
      tap.onpointerdown = e => { e.preventDefault(); shoot(); };
      const key = e => { if (e.code === 'Space') { e.preventDefault(); shoot(); } };
      document.addEventListener('keydown', key);
      api.status('0/5');
      return () => { stop(); document.removeEventListener('keydown', key); };
    }
  },
  pairs: {
    name: 'Card match', emoji: '🃏', how: 'Memorize the cards, then flip two at a time to find all 6 pairs. A wrong pair costs a heart.',
    start(el, api) {
      const T = timers(); let open = [], found = 0, lock = true;
      const deck = SHUF(SHUF(CARDS).slice(0, 6).flatMap(c => [c, c]));
      const g = document.createElement('div'); g.className = 'ag-grid ag-cards'; g.style.gridTemplateColumns = 'repeat(4, 1fr)'; el.appendChild(g);
      const cards = deck.map(face => { const b = document.createElement('button'); b.dataset.f = face; b.innerHTML = `<span class="fc"><span class="fr">${face}</span><span class="bk"></span></span>`; b.className = 'up'; g.appendChild(b); return b; });
      T.t(() => { cards.forEach(b => { b.className = ''; }); lock = false; }, 1600);
      cards.forEach(b => { b.onpointerdown = e => {
        e.preventDefault();
        if (lock || b.className) return;
        b.className = 'up'; open.push(b);
        if (open.length < 2) return;
        const [a, c] = open; open = [];
        if (a.dataset.f === c.dataset.f) { a.className = c.className = 'done'; found++; api.status(`${found}/6`); if (found >= 6) api.win(); }
        else { lock = true; T.t(() => { a.className = c.className = ''; lock = false; }, 650); api.heart(); }
      }; });
      api.status('0/6');
      return () => T.clear();
    }
  },
  order: {
    name: 'Number rush', emoji: '🔟', how: 'Tap the numbers from 1 to 16 in order within 11 seconds. A wrong tap costs a heart. Running out of time costs a heart and reshuffles.',
    start(el, api) {
      const T = timers(); let next = 1, stopT = null;
      const box = panel(el, '<div class="ag-timer"><i></i></div><div class="ag-grid ag-nums" style="grid-template-columns:repeat(4,1fr)"></div>');
      const g = box.querySelector('.ag-nums'), bar = box.querySelector('.ag-timer i');
      const deal = () => {
        if (stopT) stopT();
        next = 1; api.status('0/16');
        g.innerHTML = SHUF([...Array(16).keys()].map(i => i + 1)).map(v => `<button data-v="${v}">${v}</button>`).join('');
        g.querySelectorAll('button').forEach(b => { b.onpointerdown = e => {
          e.preventDefault();
          if (b.classList.contains('good')) return;
          if (Number(b.dataset.v) === next) { b.classList.add('good'); api.status(`${next}/16`); next++; if (next > 16) { stopT(); api.win(); } }
          else { b.classList.add('ag-wrong'); T.t(() => b.classList.remove('ag-wrong'), 300); api.heart(); }
        }; });
        stopT = countdown(T, bar, 11, () => { if (api.heart()) deal(); });
      };
      deal();
      return () => T.clear();
    }
  }
};
export const IDS = Object.keys(GAMES);

// Runs one game inside `root`. cb.end(result) gets 'win', 'lose' or 'quit'. cb.onHeart(left) fires on every lost heart.
export function play(root, id, cb, startHearts) {
  const G = GAMES[id];
  let hearts = startHearts == null ? HEARTS : Math.min(HEARTS, startHearts), done = false, cleanup = null;
  root.innerHTML = `<div class="ag-top"><b class="ag-name">${cb.icon || G.emoji} ${G.name}</b><span class="ag-hearts" aria-live="polite"></span><span class="ag-status"></span></div><div class="ag-stage"></div>`;
  const stage = root.querySelector('.ag-stage'), hEl = root.querySelector('.ag-hearts'), sEl = root.querySelector('.ag-status');
  const drawHearts = () => { hEl.innerHTML = Array.from({ length: HEARTS }, (_, i) => i).map(i => `<span class="${i < hearts ? 'on' : 'off'}${i === hearts && typeof lastH !== 'undefined' && lastH > hearts ? ' pop' : ''}">♥</span>`).join(''); hEl.setAttribute('aria-label', `${hearts} hearts left`); };
  drawHearts();
  const end = res => { if (done) return; done = true; if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } } cb.end(res); };
  let lastH = hearts;
  const api = {
    heart() {
      if (done) return 0;
      hearts -= 1; drawHearts();
      stage.classList.remove('ag-hurt'); void stage.offsetWidth; stage.classList.add('ag-hurt');
      if (cb.onHeart) cb.onHeart(hearts);
      if (hearts <= 0) { end('lose'); return 0; }
      return hearts;
    },
    win() {
      if (done) return;
      done = true;
      if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } cleanup = null; }
      const cf = document.createElement('div'); cf.className = 'ag-win';
      cf.innerHTML = '<b>Cleared!</b>' + Array.from({ length: 28 }, (_, i) => `<i style="left:${(i * 37) % 100}%;background:${COLS[i % COLS.length]};animation-delay:${(i % 7) * 0.04}s;--dx:${((i * 53) % 120) - 60}px"></i>`).join('');
      stage.appendChild(cf);
      setTimeout(() => cb.end('win'), 1100);
    },
    status(t) { sEl.textContent = t; }
  };
  if (hearts <= 0) { end('lose'); return { quit() {} }; }
  stage.innerHTML = `<div class="ag-intro"><div class="ag-big">${cb.iconBig || G.emoji}</div><p>${G.how}</p><button type="button" class="btn btn-grape" id="ag-go">Start</button></div>`;
  stage.querySelector('#ag-go').onclick = () => { stage.innerHTML = ''; cleanup = G.start(stage, api) || null; };
  return { quit() { end('quit'); } };
}

export const CSS = `
.ag-top { display: flex; align-items: center; gap: 10px; padding: 4px 0 10px; }
.ag-name { font-size: 18px; font-weight: 700; flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; }
.ag-hearts { font-size: 24px; letter-spacing: 2px; }
.ag-hearts .on { color: #E0457F; }
.ag-hearts .off { color: var(--line); }
.ag-status { font-weight: 800; min-width: 54px; text-align: right; }
.ag-stage { background: radial-gradient(120% 90% at 30% 0%, var(--card) 0%, var(--card-2) 100%); box-shadow: inset 0 1px 0 rgba(255,255,255,.6), 0 12px 30px -18px rgba(0,0,0,.35); container-type: size; position: relative; width: 100%; height: min(62vh, 520px); border-radius: 22px; background: var(--card); border: 1px solid var(--line); overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; }
.ag-stage canvas { display: block; }
.ag-hurt { animation: ag-hurt .35s ease; }
@keyframes ag-hurt { 0%, 100% { transform: none; } 25% { transform: translateX(-8px); box-shadow: 0 0 0 4px #E9453C inset; } 75% { transform: translateX(8px); } }
.ag-intro { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; gap: 14px; padding: 24px; }
.ag-intro p { font-size: 17px; line-height: 1.4; max-width: 420px; margin: 0 auto; }
.ag-big { font-size: 64px; line-height: 1; }
.ag-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 20px; }
.ag-q { font-size: 40px; font-weight: 700; letter-spacing: -0.02em; text-align: center; }
.ag-word { font-size: 52px; letter-spacing: 2px; }
.ag-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: min(100%, 360px); }
.ag-opts .btn { width: 100%; font-size: 20px; }
.ag-timer { width: min(100%, 360px); height: 10px; border-radius: 6px; background: var(--line); overflow: hidden; }
.ag-timer i { display: block; height: 100%; width: 100%; background: var(--grape); }
.ag-input { width: min(100%, 360px); font-size: 24px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: var(--bg); color: var(--ink); text-align: center; }
.ag-wrong { animation: ag-hurt .3s ease; background: #E9453C !important; color: #fff !important; }
.ag-target { position: absolute; width: 50px; height: 50px; border-radius: 50%; border: 0; background: radial-gradient(circle at 35% 30%, #FFF1A8, #F2C14E 60%, #B8860B); color: #7A5200; font-weight: 800; font-size: 24px; box-shadow: 0 4px 0 #9A6B00; animation: ag-pop .18s ease-out; }
@keyframes ag-pop { from { transform: scale(.3); } to { transform: scale(1); } }
.ag-pad { position: absolute; inset: 16px; border: 0; border-radius: 18px; color: #fff; font-size: 42px; font-weight: 800; }
.ag-simon { position: absolute; inset: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.ag-simon button { border: 0; border-radius: 20px; opacity: .45; transition: opacity .1s, transform .1s; }
.ag-simon button.lit { opacity: 1; transform: scale(1.04); box-shadow: 0 0 24px rgba(255,255,255,.7); }
.ag-bar { position: absolute; left: 20px; right: 20px; top: 38%; height: 44px; border-radius: 14px; background: var(--line); }
.ag-bar .z { position: absolute; top: 0; bottom: 0; background: #5BE38A; border-radius: 10px; }
.ag-bar .m { position: absolute; top: -10px; bottom: -10px; width: 6px; border-radius: 3px; background: var(--ink); }
.ag-tapbtn { position: absolute; left: 20px; right: 20px; bottom: 20px; width: auto; font-size: 22px; }
.ag-dot { position: absolute; width: 20px; height: 20px; border-radius: 50%; }
.ag-grid { position: absolute; inset: 14px; display: grid; gap: 8px; grid-auto-rows: 1fr; }
.ag-grid button { border: 0; border-radius: 12px; min-height: 0; padding: 0; font-weight: 800; font-size: 22px; color: var(--ink); }
.ag-sq { inset: auto; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(94%, 94cqh, 380px); aspect-ratio: 1; }
.ag-holes .ag-hole { background: #6B4F3A; border-radius: 50%; display: grid; place-items: center; box-shadow: inset 0 8px 0 rgba(0,0,0,.25); }
.ag-sc { display: block; width: 60%; aspect-ratio: 1; border-radius: 50%; background: #B98BFF; box-shadow: inset -6px -6px 0 rgba(0,0,0,.12); animation: ag-pop .15s ease-out; position: relative; }
.ag-sc::before, .ag-sc::after { content: ''; position: absolute; top: 38%; width: 12%; aspect-ratio: 1; border-radius: 50%; background: #1E1B24; }
.ag-sc::before { left: 28%; } .ag-sc::after { right: 28%; }
.ag-bomb { font-size: 34px; animation: ag-pop .15s ease-out; }
.ag-mem button { background: var(--line); }
.ag-mem button.lit { background: #FFC233; }
.ag-mem button.good { background: #5BE38A; }
.ag-mem button.bad { background: #E9453C; }
.ag-cards button { background: var(--grape); color: #fff; font-size: 30px; }
.ag-cards button.up { background: var(--card); border: 2px solid var(--line); }
.ag-cards button.done { background: #5BE38A; opacity: .65; }
.ag-nums { position: static; width: min(100%, 380px); aspect-ratio: 1; }
.ag-nums button { background: var(--line); }
.ag-nums button.good { background: #5BE38A; opacity: .5; }
.ag-hoop { position: absolute; inset: 16px 16px 90px; display: flex; gap: 14px; }
.ag-meter { position: relative; width: 44px; border-radius: 14px; background: var(--line); }
.ag-meter .z { position: absolute; left: 0; right: 0; background: #5BE38A; border-radius: 10px; }
.ag-meter .m { position: absolute; left: -8px; right: -8px; height: 6px; border-radius: 3px; background: var(--ink); }
.ag-court { position: relative; flex: 1; border-radius: 14px; background: linear-gradient(#FFE8C9, #F7C58A); overflow: hidden; }
.ag-rim { position: absolute; right: 14%; top: 22%; width: 64px; height: 10px; border-radius: 5px; background: #E9453C; box-shadow: 0 -40px 0 -2px #fff; }
.ag-ball { position: absolute; left: 10%; bottom: 8%; font-size: 40px; transition: none; }
.ag-ball.make { left: calc(86% - 52px); bottom: 70%; transition: left .5s ease-out, bottom .5s cubic-bezier(.2,1.6,.4,1); }
.ag-ball.long { left: 92%; bottom: 82%; transition: all .5s ease-out; }
.ag-ball.short { left: 50%; bottom: 40%; transition: all .5s ease-out; }
.ag-say { position: absolute; left: 0; right: 0; top: 40%; text-align: center; font-size: 34px; font-weight: 800; color: #1F2A14; }
@media (prefers-reduced-motion: reduce) { .ag-hurt, .ag-target, .ag-sc, .ag-bomb { animation: none; } }
/* ===== 3D polish ===== */
.ag-3d { display: block; touch-action: none; }
.ag-float { position: absolute; transform: translate(-50%, 0); font-weight: 800; font-size: 20px; pointer-events: none; text-shadow: 0 2px 0 rgba(0,0,0,.25), 0 6px 14px rgba(0,0,0,.25); animation: ag-floatup .85s ease-out forwards; }
@keyframes ag-floatup { from { opacity: 0; transform: translate(-50%, 6px) scale(.7); } 20% { opacity: 1; transform: translate(-50%, 0) scale(1.1); } to { opacity: 0; transform: translate(-50%, -34px) scale(1); } }
.ag-hearts span { display: inline-block; transition: transform .2s; }
.ag-hearts .on { text-shadow: 0 2px 0 #A8264F, 0 4px 8px rgba(224,69,127,.35); }
.ag-hearts .pop { animation: ag-heart .5s ease-out; }
@keyframes ag-heart { 0% { transform: scale(1.6) rotate(-12deg); color: #E0457F; } 100% { transform: none; } }
.ag-intro .btn, .ag-tapbtn { box-shadow: 0 4px 0 rgba(0,0,0,.25), 0 10px 18px -8px rgba(0,0,0,.4) !important; }
.ag-target { background: radial-gradient(circle at 32% 28%, #FFF7C9 0%, #F7D166 30%, #E2A82B 65%, #9A6B00 100%); box-shadow: inset 0 -4px 0 rgba(122,82,0,.45), inset 0 3px 0 rgba(255,255,255,.55), 0 6px 0 #7A5200, 0 12px 16px -6px rgba(0,0,0,.45); text-shadow: 0 1px 0 rgba(255,255,255,.6); animation: ag-coin-in .28s cubic-bezier(.2,1.6,.4,1); }
@keyframes ag-coin-in { 0% { transform: perspective(300px) rotateY(90deg) scale(.4); } 100% { transform: perspective(300px) rotateY(0) scale(1); } }
.ag-pad { box-shadow: inset 0 -10px 0 rgba(0,0,0,.18), inset 0 6px 0 rgba(255,255,255,.18), 0 10px 24px -10px rgba(0,0,0,.5); transition: transform .08s; text-shadow: 0 3px 0 rgba(0,0,0,.25); }
.ag-pad:active { transform: translateY(4px) scale(.99); }
.ag-simon button { opacity: .55; box-shadow: inset 0 -10px 0 rgba(0,0,0,.2), inset 0 6px 0 rgba(255,255,255,.25), 0 8px 18px -8px rgba(0,0,0,.5); background-image: radial-gradient(circle at 30% 25%, rgba(255,255,255,.45), transparent 55%) !important; }
.ag-simon button.lit { opacity: 1; transform: translateY(2px) scale(1.03); box-shadow: inset 0 -6px 0 rgba(0,0,0,.15), 0 0 0 3px rgba(255,255,255,.7), 0 0 34px rgba(255,255,255,.75); }
.ag-bar { background: linear-gradient(#D9DDE6, #EEF0F5); box-shadow: inset 0 3px 6px rgba(0,0,0,.18); }
.ag-bar .z { background: linear-gradient(#7EE8A8, #2FBF71); box-shadow: inset 0 2px 0 rgba(255,255,255,.5), 0 0 16px rgba(47,191,113,.45); }
.ag-bar .m { box-shadow: 0 4px 10px rgba(0,0,0,.35); background: linear-gradient(#3A3F4A, #15171C); }
.ag-dot { background-image: radial-gradient(circle at 32% 28%, rgba(255,255,255,.85), transparent 45%) !important; box-shadow: inset 0 -3px 4px rgba(0,0,0,.25), 0 3px 6px rgba(0,0,0,.25); animation: ag-pop .2s cubic-bezier(.2,1.6,.4,1); }
.ag-grid button { box-shadow: inset 0 -4px 0 rgba(0,0,0,.14), inset 0 2px 0 rgba(255,255,255,.35), 0 4px 10px -6px rgba(0,0,0,.4); transition: transform .12s; }
.ag-grid button:active { transform: translateY(2px); }
.ag-holes .ag-hole { background: radial-gradient(ellipse at 50% 35%, #2C1A0F 0%, #4A2E1B 55%, #7A5233 100%); box-shadow: inset 0 10px 14px rgba(0,0,0,.55), 0 3px 0 #9C7652; overflow: hidden; }
.ag-sc { background: radial-gradient(circle at 32% 28%, #E9DCFF 0%, #B98BFF 40%, #6F45C9 100%); box-shadow: inset 0 -5px 8px rgba(0,0,0,.18), 0 4px 6px rgba(0,0,0,.3); animation: ag-up .22s cubic-bezier(.2,1.6,.4,1); }
@keyframes ag-up { from { transform: translateY(70%) scale(.8); } to { transform: none; } }
.ag-bomb { display: inline-block; animation: ag-up .22s cubic-bezier(.2,1.6,.4,1); filter: drop-shadow(0 4px 4px rgba(0,0,0,.4)); }
.ag-mem button { transition: transform .25s, background .2s; transform-style: preserve-3d; }
.ag-mem button.lit { transform: perspective(400px) rotateX(180deg); background: linear-gradient(#FFD86B, #F2B21B); box-shadow: 0 0 18px rgba(242,178,27,.6); }
.ag-mem button.good { background: linear-gradient(#7EE8A8, #2FBF71); transform: perspective(400px) rotateX(360deg); }
.ag-mem button.bad { background: linear-gradient(#FF8A8E, #E5484D); }
.ag-cards { perspective: 800px; }
.ag-cards button { background: none !important; box-shadow: none !important; padding: 0; }
.ag-cards .fc { position: relative; display: block; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .45s cubic-bezier(.3,1.3,.5,1); transform: rotateY(180deg); }
.ag-cards button.up .fc, .ag-cards button.done .fc { transform: rotateY(0); }
.ag-cards .fr, .ag-cards .bk { position: absolute; inset: 0; border-radius: 12px; backface-visibility: hidden; -webkit-backface-visibility: hidden; display: grid; place-items: center; font-size: 30px; }
.ag-cards .fr { background: linear-gradient(#FFFFFF, #EEF0F5); box-shadow: inset 0 -3px 0 rgba(0,0,0,.08), 0 6px 12px -6px rgba(0,0,0,.4); }
.ag-cards .bk { transform: rotateY(180deg); background: repeating-linear-gradient(45deg, #5A4AF0 0 6px, #4433D0 6px 12px); box-shadow: inset 0 0 0 3px rgba(255,255,255,.85), 0 6px 12px -6px rgba(0,0,0,.4); }
.ag-cards button.done .fr { background: linear-gradient(#DFF7E8, #BDEDCF); }
.ag-nums button { background: linear-gradient(var(--card), var(--card-2, var(--card))); color: var(--ink); font-weight: 800; font-size: clamp(18px, 6cqmin, 30px); }
.ag-nums button.good { background: linear-gradient(#7EE8A8, #2FBF71); color: #fff; transform: translateY(2px); box-shadow: inset 0 2px 4px rgba(0,0,0,.2); }
.ag-opts .btn { box-shadow: 0 4px 0 var(--line), 0 10px 16px -10px rgba(0,0,0,.4) !important; }
.ag-opts .btn:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--line) !important; }
.ag-q { text-shadow: 0 2px 0 var(--line), 0 6px 14px rgba(0,0,0,.12); }
.ag-meter { background: linear-gradient(90deg, #D9DDE6, #EEF0F5); box-shadow: inset 0 3px 6px rgba(0,0,0,.2); }
.ag-meter .z { background: linear-gradient(90deg, #2FBF71, #7EE8A8); box-shadow: 0 0 14px rgba(47,191,113,.5); }
.ag-court { background: radial-gradient(120% 80% at 50% 100%, #F7C58A, #FFE8C9 70%); box-shadow: inset 0 0 0 2px rgba(0,0,0,.05); }
.ag-rim { background: linear-gradient(#FF6B5F, #C7332A); box-shadow: 0 -40px 0 -2px #fff, 0 6px 8px rgba(0,0,0,.25); }
.ag-ball { filter: drop-shadow(0 8px 6px rgba(0,0,0,.35)); }
.ag-ball.make { transition: left .55s ease-out, bottom .55s cubic-bezier(.2,1.6,.4,1), transform .55s; transform: rotate(540deg); }
.ag-ball.long, .ag-ball.short { transform: rotate(360deg); transition: all .5s ease-out; }
.ag-win { position: absolute; inset: 0; display: grid; place-items: center; background: radial-gradient(circle, rgba(255,255,255,.85), rgba(255,255,255,.4)); animation: ag-fade .25s ease-out; z-index: 5; overflow: hidden; }
.ag-win b { font-size: 44px; font-weight: 800; letter-spacing: -0.02em; color: #15171C; text-shadow: 0 3px 0 #FFD34D, 0 10px 24px rgba(0,0,0,.2); animation: ag-zoom .5s cubic-bezier(.2,1.6,.4,1); }
.ag-win i { position: absolute; top: 45%; width: 10px; height: 14px; border-radius: 3px; animation: ag-confetti 1s cubic-bezier(.2,.7,.4,1) forwards; }
@keyframes ag-fade { from { opacity: 0; } }
@keyframes ag-zoom { from { transform: scale(.3) rotate(-8deg); } }
@keyframes ag-confetti { 0% { transform: translate(0, 0) rotate(0); opacity: 1; } 100% { transform: translate(var(--dx), 260px) rotate(540deg); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ag-target, .ag-sc, .ag-bomb, .ag-dot, .ag-win, .ag-win b, .ag-win i, .ag-hearts .pop { animation: none; } .ag-cards .fc, .ag-mem button { transition: none; } }
`;