// ScobbBucks Arcade: 18 quick skill games. Each one gets 2 hearts.
export const HEARTS = 2;
// index.html keeps the same list of ids for the daily crate and payouts.

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
function drawScobb(x, cx, cy, r, col) {
  x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
  x.fillStyle = '#1E1B24'; x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.12, r * 0.14, 0, 7); x.arc(cx + r * 0.35, cy - r * 0.12, r * 0.14, 0, 7); x.fill();
  x.fillStyle = 'rgba(255,255,255,.5)'; x.beginPath(); x.ellipse(cx - r * 0.35, cy - r * 0.55, r * 0.3, r * 0.16, 0, 0, 7); x.fill();
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
        const life = Math.max(650, 1100 - hits * 35);
        const t = T.t(() => { b.remove(); api.heart(); }, life);
        b.onpointerdown = e => { e.preventDefault(); clearTimeout(t); b.remove(); hits++; api.status(`${hits}/15`); if (hits >= 15) api.win(); };
        T.t(spawn, Math.max(380, 750 - hits * 25));
      };
      const miss = e => { if (e.target === el) { e.preventDefault(); api.heart(); } };
      el.addEventListener('pointerdown', miss);
      api.status('0/15'); spawn();
      return () => { T.clear(); el.removeEventListener('pointerdown', miss); };
    }
  },
  react: {
    name: 'Quick draw', emoji: '⚡', how: 'Wait for the pad to turn green, then tap it fast. Tapping early, or taking longer than 0.38 seconds, costs a heart. Get 5.',
    start(el, api) {
      const T = timers(); let n = 0, state = 'x', go = 0;
      const pad = document.createElement('button'); pad.className = 'ag-pad'; el.appendChild(pad);
      const round = () => {
        state = 'wait'; pad.style.background = '#E5484D'; pad.textContent = 'Wait…';
        T.t(() => {
          if (state !== 'wait') return;
          state = 'go'; go = performance.now(); pad.style.background = '#2F9E44'; pad.textContent = 'TAP!';
          T.t(() => { if (state === 'go') { state = 'x'; pad.style.background = '#6B6280'; pad.textContent = 'Too slow!'; if (api.heart()) T.t(round, 800); } }, 380);
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
      const show = () => { input = false; pos = 0; seq.forEach((v, k) => T.t(() => flash(v, 260), 500 + k * 400)); T.t(() => { input = true; }, 500 + seq.length * 400); };
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
      let n = 0, x = 0, dir = 1, zs = 0, zw = 0, sp = 0.95, pause = 0;
      const setZone = () => { zw = Math.max(0.06, 0.17 - n * 0.022); zs = R(0.04, 0.96 - zw); z.style.left = zs * 100 + '%'; z.style.width = zw * 100 + '%'; };
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
      const { c, x, W, H } = canvas(el); let bx = W / 2, coins = [], next = 0.4, got = 0;
      const s = steer(c, W, v => { bx = v; });
      api.status('0/15');
      const stop = loop(dt => {
        next -= dt;
        if (s.keys.ArrowLeft) bx = Math.max(30, bx - 460 * dt);
        if (s.keys.ArrowRight) bx = Math.min(W - 30, bx + 460 * dt);
        if (next <= 0) { coins.push({ x: R(20, W - 20), y: -12, v: 215 + got * 14 + R(0, 50) }); next = Math.max(0.42, 0.85 - got * 0.03); }
        x.clearRect(0, 0, W, H);
        for (const k of coins.slice()) {
          k.y += k.v * dt;
          if (k.y > H - 48 && k.y < H - 18 && Math.abs(k.x - bx) < 34) { coins.splice(coins.indexOf(k), 1); got++; api.status(`${got}/15`); if (got >= 15) return api.win(); }
          else if (k.y > H + 12) { coins.splice(coins.indexOf(k), 1); if (!api.heart()) return; }
        }
        for (const k of coins) { x.fillStyle = '#F2C14E'; x.beginPath(); x.arc(k.x, k.y, 12, 0, 7); x.fill(); x.fillStyle = '#9A6B00'; x.font = 'bold 13px sans-serif'; x.textAlign = 'center'; x.fillText('S', k.x, k.y + 5); }
        x.fillStyle = '#8B5A2B'; x.fillRect(bx - 32, H - 34, 64, 24); x.fillStyle = '#C9A27A'; x.fillRect(bx - 32, H - 34, 64, 6);
      });
      return () => { stop(); s.off(); };
    }
  },
  dodge: {
    name: 'Block dodge', emoji: '🧱', how: 'Move your scobb left and right (finger, mouse or arrow keys) to dodge falling blocks. Survive 20 seconds. Each hit costs a heart.',
    start(el, api) {
      const { c, x, W, H } = canvas(el); let px = W / 2, blocks = [], t = 0, next = 0, inv = 0;
      const s = steer(c, W, v => { px = v; });
      const stop = loop(dt => {
        t += dt; inv -= dt; next -= dt;
        if (s.keys.ArrowLeft) px = Math.max(20, px - 360 * dt);
        if (s.keys.ArrowRight) px = Math.min(W - 20, px + 360 * dt);
        if (next <= 0) { blocks.push({ x: R(0, W - 50), y: -30, w: R(34, 70), v: 250 + t * 14 }); next = Math.max(0.17, 0.48 - t * 0.02); }
        x.clearRect(0, 0, W, H);
        for (const b of blocks) b.y += b.v * dt;
        blocks = blocks.filter(b => b.y < H + 40);
        const py = H - 30;
        if (inv <= 0 && blocks.some(b => px + 14 > b.x && px - 14 < b.x + b.w && py + 14 > b.y && py - 14 < b.y + 26)) {
          inv = 1.1;
          if (!api.heart()) return;
          blocks = blocks.filter(b => b.y < H - 160);
        }
        api.status(`${Math.max(0, Math.ceil(20 - t))}s left`);
        if (t >= 20) return api.win();
        x.fillStyle = '#6B4F9A'; for (const b of blocks) x.fillRect(b.x, b.y, b.w, 26);
        if (inv <= 0 || Math.floor(inv * 10) % 2) drawScobb(x, px, py, 14, '#7CC4F2');
      });
      return () => { stop(); s.off(); };
    }
  },
  jump: {
    name: 'Scobb jump', emoji: '🦘', how: 'Your scobb bounces on its own. Steer left and right (finger, mouse or arrow keys) to land on platforms and climb. Some platforms move. Reach platform 30. Falling off the bottom costs a heart.',
    start(el, api) {
      const { c, x, W, H } = canvas(el);
      const GOAL = 30, PW = 56, BOUNCE = -640, GRAV = 1550;
      let plats = [], nextY = H - 30, id = 0, camY = 0, best = 0, tx = W / 2;
      const addPlat = () => {
        const gap = Math.min(100, 62 + id * 1.5);
        plats.push({ id, x: id === 0 ? W / 2 - PW / 2 : R(4, W - PW - 4), y: nextY, vx: id > 6 && Math.random() < 0.45 ? PICK([-1, 1]) * R(60, 100 + id * 3) : 0 });
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
            pl.vy = BOUNCE; pl.y = p.y - 14; last = p;
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
        x.clearRect(0, 0, W, H);
        x.fillStyle = '#E8F4FF'; x.fillRect(0, 0, W, H);
        for (const p of plats) {
          const sy = p.y - camY;
          if (sy < -20 || sy > H + 20) continue;
          x.fillStyle = p.id === GOAL ? '#E3B341' : p.vx ? '#3EC1FF' : '#5BE38A';
          x.fillRect(p.x, sy, PW, 10);
          if (p.id === GOAL) { x.fillStyle = '#5B3A1C'; x.fillRect(p.x + PW / 2, sy - 30, 2, 30); x.fillStyle = '#E5484D'; x.fillRect(p.x + PW / 2 + 2, sy - 30, 16, 10); }
        }
        drawScobb(x, pl.x, pl.y - camY, 14, '#B98BFF');
      });
      return () => { stop(); s.off(); };
    }
  },
  count: {
    name: 'Quick count', emoji: '🔢', how: 'Dots flash for a moment. Pick how many there were. Get 5 right. A wrong answer costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0;
      const round = () => {
        el.innerHTML = '';
        const want = RI(9 + n * 2, 14 + n * 2), W = el.clientWidth, H = el.clientHeight, pts = [];
        let tries = 0;
        while (pts.length < want && tries++ < 3000) { const p = { x: R(18, W - 18), y: R(18, H - 18) }; if (pts.every(q => Math.hypot(q.x - p.x, q.y - p.y) > 30)) pts.push(p); }
        pts.forEach(p => { const d = document.createElement('i'); d.className = 'ag-dot'; d.style.left = p.x - 10 + 'px'; d.style.top = p.y - 10 + 'px'; d.style.background = PICK(COLS); el.appendChild(d); });
        const real = pts.length;
        T.t(() => {
          el.innerHTML = '';
          const set = new Set([real]); while (set.size < 4) set.add(Math.max(1, real + PICK([-1, 1]) * RI(1, 3)));
          const box = panel(el, `<div class="ag-q">How many?</div><div class="ag-opts">${SHUF([...set]).map(o => `<button class="btn btn-ghost" data-v="${o}">${o}</button>`).join('')}</div>`);
          box.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { if (Number(b.dataset.v) === real) { n++; api.status(`${n}/5`); if (n >= 5) return api.win(); round(); } else { b.classList.add('ag-wrong'); if (api.heart()) T.t(round, 600); } }; });
        }, 900);
      };
      api.status('0/5'); round();
      return () => T.clear();
    }
  },
  odd: {
    name: 'Odd one out', emoji: '🎨', how: 'One square is a slightly different color. Tap it within 5 seconds. Get 7. A wrong tap or running out of time costs a heart.',
    start(el, api) {
      const T = timers(); let n = 0, tm = 0;
      const round = () => {
        el.innerHTML = ''; clearTimeout(tm);
        const size = Math.min(6, 3 + Math.floor(n / 2)), hue = RI(0, 359), d = Math.max(5, 17 - n * 2.2), odd = RI(0, size * size - 1);
        const g = document.createElement('div'); g.className = 'ag-grid ag-sq'; g.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        for (let i = 0; i < size * size; i++) {
          const b = document.createElement('button');
          b.style.background = `hsl(${hue} 70% ${i === odd ? 52 + d : 52}%)`;
          b.onclick = () => { clearTimeout(tm); if (i === odd) { n++; api.status(`${n}/7`); if (n >= 7) return api.win(); round(); } else { b.classList.add('ag-wrong'); if (api.heart()) T.t(round, 450); } };
          g.appendChild(b);
        }
        el.appendChild(g);
        tm = T.t(() => { if (api.heart()) round(); }, 5000);
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
      const next = () => { if (stopT) stopT(); word = PICK(WORDS); wEl.textContent = word; inp.value = ''; stopT = countdown(T, bar, Math.max(3.2, 5 - n * 0.35), () => { if (api.heart()) next(); }); inp.focus(); };
      inp.oninput = () => { if (inp.value.trim().toLowerCase() === word) { stopT(); n++; api.status(`${n}/6`); if (n >= 6) return api.win(); next(); } };
      api.status('0/6'); next();
      return () => T.clear();
    }
  },
  flappy: {
    name: 'Flappy scobb', emoji: '🐤', how: 'Tap or press space to flap. Fly through 8 gaps. Hitting a pipe, the ground or the sky costs a heart.',
    start(el, api) {
      const { c, x, W, H } = canvas(el);
      const GAP = Math.max(112, H * 0.26), SPD = 190, PX = 70;
      let y = H / 2, v = 0, pipes = [], passed = 0, grace = 1.2;
      const add = px => pipes.push({ x: px, gy: R(50, H - 50 - GAP), done: false });
      add(W + 40); add(W + 240);
      const flap = e => { if (e) e.preventDefault(); v = -300; };
      c.addEventListener('pointerdown', flap);
      const key = e => { if (e.code === 'Space') flap(e); };
      document.addEventListener('keydown', key);
      api.status('0/8');
      const stop = loop(dt => {
        grace -= dt;
        v += 900 * dt; y += v * dt;
        for (const p of pipes) { p.x -= SPD * dt; if (!p.done && p.x + 52 < PX - 13) { p.done = true; passed++; api.status(`${passed}/8`); if (passed >= 8) return api.win(); } }
        if (pipes.length && pipes[0].x < -60) pipes.shift();
        if (!pipes.length || pipes[pipes.length - 1].x < W - 190) add(pipes.length ? pipes[pipes.length - 1].x + 200 : W + 40);
        let hit = y > H - 13 || y < 13;
        for (const p of pipes) if (PX + 12 > p.x && PX - 12 < p.x + 52 && (y - 12 < p.gy || y + 12 > p.gy + GAP)) hit = true;
        if (grace > 0) { y = Math.min(Math.max(y, 20), H - 20); }
        else if (hit) {
          if (!api.heart()) return;
          y = H / 2; v = 0; grace = 1.2;
          pipes = pipes.filter(p => p.x > PX + 40);
        }
        x.clearRect(0, 0, W, H);
        x.fillStyle = '#BFE6FF'; x.fillRect(0, 0, W, H);
        x.fillStyle = '#3E9B2F'; for (const p of pipes) { x.fillRect(p.x, 0, 52, p.gy); x.fillRect(p.x, p.gy + GAP, 52, H - p.gy - GAP); }
        if (grace <= 0 || Math.floor(grace * 10) % 2) drawScobb(x, PX, y, 14, '#FFC233');
      });
      return () => { stop(); document.removeEventListener('keydown', key); };
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
          const b = PICK(free), bomb = Math.random() < 0.33;
          b.dataset.k = bomb ? 'bomb' : 'scobb';
          b.innerHTML = bomb ? '<span class="ag-bomb">💣</span>' : '<i class="ag-sc"></i>';
          b._t = T.t(() => { const k = b.dataset.k; clear(b); if (k === 'scobb') api.heart(); }, Math.max(520, 880 - n * 22));
        }
        T.t(pop, Math.max(330, 620 - n * 16));
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
        T.t(() => { tiles.forEach(b => { b.className = ''; }); input = true; }, 850 + k * 90);
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
      const { c, x, W, H } = canvas(el); const BH = Math.min(28, (H - 20) / 12);
      const base = Math.min(150, W * 0.45);
      let stack = [{ x: W / 2 - base / 2, w: base }], cur, dir = 1, sp = 180, pause = 0;
      const newBlock = () => { const top = stack[stack.length - 1]; cur = { x: 0, w: top.w }; dir = 1; sp = 180 + stack.length * 22; };
      newBlock();
      const drop = e => {
        if (e) e.preventDefault();
        if (pause > 0) return;
        const top = stack[stack.length - 1], l = Math.max(cur.x, top.x), r = Math.min(cur.x + cur.w, top.x + top.w);
        pause = 0.25;
        if (r - l <= 3) { if (!api.heart()) return; newBlock(); return; }
        stack.push({ x: l, w: r - l }); api.status(`${stack.length - 1}/10`);
        if (stack.length - 1 >= 10) return api.win();
        newBlock();
      };
      c.addEventListener('pointerdown', drop);
      const key = e => { if (e.code === 'Space') drop(e); };
      document.addEventListener('keydown', key);
      api.status('0/10');
      const stop = loop(dt => {
        pause -= dt;
        cur.x += dir * sp * dt;
        if (cur.x + cur.w > W) { cur.x = W - cur.w; dir = -1; } if (cur.x < 0) { cur.x = 0; dir = 1; }
        x.clearRect(0, 0, W, H);
        stack.forEach((b, i) => { x.fillStyle = COLS[i % COLS.length]; x.fillRect(b.x, H - (i + 1) * BH, b.w, BH - 2); });
        x.fillStyle = COLS[stack.length % COLS.length]; x.fillRect(cur.x, H - (stack.length + 1) * BH, cur.w, BH - 2);
      });
      return () => { stop(); document.removeEventListener('keydown', key); };
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
        stopT = countdown(T, box.querySelector('.ag-timer i'), Math.max(1.5, 2.2 - n * 0.07), () => { if (api.heart()) q(); });
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
      let n = 0, y = 0, dir = 1, sp = 1.1, zs = 0, zw = 0, pause = 0;
      const setZone = () => { zw = Math.max(0.07, 0.15 - n * 0.02); zs = R(0.45, 0.92 - zw); z.style.bottom = zs * 100 + '%'; z.style.height = zw * 100 + '%'; };
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
      const cards = deck.map(face => { const b = document.createElement('button'); b.dataset.f = face; b.textContent = face; b.className = 'up'; g.appendChild(b); return b; });
      T.t(() => { cards.forEach(b => { b.className = ''; b.textContent = ''; }); lock = false; }, 2000);
      cards.forEach(b => { b.onpointerdown = e => {
        e.preventDefault();
        if (lock || b.className) return;
        b.className = 'up'; b.textContent = b.dataset.f; open.push(b);
        if (open.length < 2) return;
        const [a, c] = open; open = [];
        if (a.dataset.f === c.dataset.f) { a.className = c.className = 'done'; found++; api.status(`${found}/6`); if (found >= 6) api.win(); }
        else { lock = true; T.t(() => { a.className = c.className = ''; a.textContent = c.textContent = ''; lock = false; }, 650); api.heart(); }
      }; });
      api.status('0/6');
      return () => T.clear();
    }
  },
  order: {
    name: 'Number rush', emoji: '🔟', how: 'Tap the numbers from 1 to 16 in order within 13 seconds. A wrong tap costs a heart. Running out of time costs a heart and reshuffles.',
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
        stopT = countdown(T, bar, 13, () => { if (api.heart()) deal(); });
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
  root.innerHTML = `<div class="ag-top"><b class="ag-name">${G.emoji} ${G.name}</b><span class="ag-hearts" aria-live="polite"></span><span class="ag-status"></span></div><div class="ag-stage"></div>`;
  const stage = root.querySelector('.ag-stage'), hEl = root.querySelector('.ag-hearts'), sEl = root.querySelector('.ag-status');
  const drawHearts = () => { hEl.innerHTML = Array.from({ length: HEARTS }, (_, i) => i).map(i => `<span class="${i < hearts ? 'on' : 'off'}">♥</span>`).join(''); hEl.setAttribute('aria-label', `${hearts} hearts left`); };
  drawHearts();
  const end = res => { if (done) return; done = true; if (cleanup) { try { cleanup(); } catch (e) { /* ignore */ } } cb.end(res); };
  const api = {
    heart() {
      if (done) return 0;
      hearts -= 1; drawHearts();
      stage.classList.remove('ag-hurt'); void stage.offsetWidth; stage.classList.add('ag-hurt');
      if (cb.onHeart) cb.onHeart(hearts);
      if (hearts <= 0) { end('lose'); return 0; }
      return hearts;
    },
    win() { end('win'); },
    status(t) { sEl.textContent = t; }
  };
  if (hearts <= 0) { end('lose'); return { quit() {} }; }
  stage.innerHTML = `<div class="ag-intro"><div class="ag-big">${G.emoji}</div><p>${G.how}</p><button type="button" class="btn btn-grape" id="ag-go">Start</button></div>`;
  stage.querySelector('#ag-go').onclick = () => { stage.innerHTML = ''; cleanup = G.start(stage, api) || null; };
  return { quit() { end('quit'); } };
}

export const CSS = `
.ag-top { display: flex; align-items: center; gap: 10px; padding: 4px 0 10px; }
.ag-name { font-size: 18px; flex: 1; min-width: 0; }
.ag-hearts { font-size: 24px; letter-spacing: 2px; }
.ag-hearts .on { color: #E9453C; }
.ag-hearts .off { color: var(--line); }
.ag-status { font-weight: 800; min-width: 54px; text-align: right; }
.ag-stage { container-type: size; position: relative; width: 100%; height: min(62vh, 520px); border-radius: 22px; background: var(--card); border: 2px solid var(--line); overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; }
.ag-stage canvas { display: block; }
.ag-hurt { animation: ag-hurt .35s ease; }
@keyframes ag-hurt { 0%, 100% { transform: none; } 25% { transform: translateX(-8px); box-shadow: 0 0 0 4px #E9453C inset; } 75% { transform: translateX(8px); } }
.ag-intro { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; gap: 14px; padding: 24px; }
.ag-intro p { font-size: 17px; line-height: 1.4; max-width: 420px; margin: 0 auto; }
.ag-big { font-size: 64px; line-height: 1; }
.ag-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 20px; }
.ag-q { font-size: 40px; font-weight: 800; text-align: center; }
.ag-word { font-size: 52px; letter-spacing: 2px; }
.ag-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: min(100%, 360px); }
.ag-opts .btn { width: 100%; font-size: 20px; }
.ag-timer { width: min(100%, 360px); height: 10px; border-radius: 6px; background: var(--line); overflow: hidden; }
.ag-timer i { display: block; height: 100%; width: 100%; background: var(--grape); }
.ag-input { width: min(100%, 360px); font-size: 24px; padding: 12px 14px; border-radius: 14px; border: 2px solid var(--line); background: var(--bg); color: var(--ink); text-align: center; }
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
.ag-grid { position: absolute; inset: 14px; display: grid; gap: 8px; }
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
`;
