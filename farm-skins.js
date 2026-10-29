// Scobb Farm skins: 8 buildings x 30 themes x 24 colors = 5,760 skins.
// Shared by index.html (shop, closet, ledger) and farm.html (drawing farms).

export const DAY_MS = 86400000;
export const DAY0 = Date.UTC(2026, 9, 26, 5, 0, 0);
export const dayOf = t => Math.floor((t - DAY0) / DAY_MS);

export const BUILDINGS = [['hall', 'Town Hall'], ['farm', 'Farm'], ['mill', 'Mill'], ['barracks', 'Barracks'], ['wall', 'Walls'], ['tower', 'Tower'], ['gate', 'Gate'], ['market', 'Market']];
const BNAME = Object.fromEntries(BUILDINGS);

export const PALS = [
  ['Cherry', 0, '#E5484D', '#FFD5D6'], ['Tangerine', 0, '#F78C3B', '#FFE1C7'], ['Lemon', 0, '#F5CF4A', '#7A5B00'],
  ['Lime', 0, '#8BCB3E', '#24410B'], ['Forest', 0, '#2F8F5B', '#CFF2DC'], ['Sky', 0, '#4BA3F2', '#E3F1FF'],
  ['Navy', 0, '#24366B', '#F2C14E'], ['Grape', 0, '#7B4FE0', '#F1E8FF'], ['Bubblegum', 0, '#F27BB0', '#FFF0F6'],
  ['Charcoal', 0, '#33333B', '#F45B69'], ['Snow', 0, '#EDEDF0', '#3A3A44'], ['Sand', 0, '#D9C29A', '#5B4426'],
  ['Teal', 1, '#1FB5A8', '#E0FFFB'], ['Coral', 1, '#FF7A66', '#2D1B4E'], ['Lavender', 1, '#B9A3F5', '#3B2A6B'],
  ['Mint', 1, '#8EE3C0', '#1C4D3A'], ['Maroon', 1, '#7A2233', '#F5D08A'],
  ['Neon Pink', 2, '#FF2E93', '#1A0A12'], ['Electric Blue', 2, '#2D6BFF', '#FFF06B'], ['Toxic Green', 2, '#5CFF3B', '#14240F'],
  ['Chrome', 3, '#C9D2DC', '#2B3440', ['#F7FAFC', '#AEB8C4', '#EEF2F6', '#7F8B98']],
  ['Rose Gold', 3, '#E8A79A', '#5A2E28', ['#FFE3DA', '#E59A8B', '#F8CFC4', '#B9706A']],
  ['Gold', 4, '#E3B341', '#5A3E0B', ['#FFF1A8', '#E3B341', '#FFE07A', '#A87A14']],
  ['Holo', 5, '#9B5CFF', '#FFFFFF', ['#FF4F8B', '#FFB347', '#5BE38A', '#3EC1FF', '#9B5CFF']]
];
const DEFAULT_PAL = ['Classic', 0, '#D9534F', '#FFFFFF'];

export const THEMES = [
  { n: 'Classic', t: 0, paint: 'roof', mat: 'wood', roof: 'peak', win: 'square', door: 'plank', top: 'flag', blade: 'wood', crop: 'jelly', fence: 'wood', wall: 'stone' },
  { n: 'Cottage', t: 0, paint: 'roof', mat: 'stone', roof: 'peak', win: 'round', door: 'round', top: 'chimney', blade: 'wood', crop: 'flower', fence: 'stone', wall: 'stone' },
  { n: 'Log Cabin', t: 0, paint: 'roof', mat: 'logs', roof: 'peak', win: 'square', door: 'plank', top: 'chimney', blade: 'wood', crop: 'jelly', fence: 'rope', wall: 'palisade' },
  { n: 'Brick House', t: 0, paint: 'roof', mat: 'brick', roof: 'peak', win: 'square', door: 'plank', top: 'chimney', blade: 'wood', crop: 'flower', fence: 'picket', wall: 'brick' },
  { n: 'Cardboard Box', t: 0, paint: 'roof', mat: 'cardboard', roof: 'flaps', win: 'scribble', door: 'flap', top: 'none', blade: 'paper', crop: 'jelly', fence: 'cardboard', wall: 'cardboard' },
  { n: 'Toy Brick', t: 1, paint: 'body', mat: 'plastic', roof: 'studs', win: 'square', door: 'slide', top: 'flag', blade: 'inflate', crop: 'pixel', fence: 'plastic', wall: 'plastic' },
  { n: 'Castle', t: 1, paint: 'roof', mat: 'stone', roof: 'battle', win: 'arch', door: 'arch', top: 'pennants', blade: 'wood', crop: 'jelly', fence: 'stone', wall: 'stone' },
  { n: 'Candy Land', t: 1, paint: 'roof', mat: 'candy', roof: 'drip', win: 'round', door: 'round', top: 'cherry', blade: 'candy', crop: 'candy', fence: 'candy', wall: 'candy', deco: 'sprinkles' },
  { n: 'Gingerbread', t: 1, paint: 'roof', mat: 'ginger', roof: 'drip', win: 'heart', door: 'arch', top: 'gumdrop', blade: 'candy', crop: 'candy', fence: 'candy', wall: 'ginger', deco: 'gumdrops' },
  { n: 'Mushroom', t: 1, paint: 'roof', mat: 'cream', roof: 'mushroom', win: 'round', door: 'round', top: 'none', blade: 'leaf', crop: 'mush', fence: 'hedge', wall: 'hedge' },
  { n: 'Treehouse', t: 1, paint: 'roof', mat: 'wood', roof: 'leafy', win: 'round', door: 'plank', top: 'none', blade: 'leaf', crop: 'flower', fence: 'rope', wall: 'hedge', deco: 'vines' },
  { n: 'Igloo', t: 1, paint: 'roof', mat: 'ice', roof: 'dome', win: 'port', door: 'arch', top: 'none', blade: 'ice', crop: 'ice', fence: 'ice', wall: 'ice' },
  { n: 'Pirate Ship', t: 2, paint: 'roof', mat: 'hull', roof: 'sail', win: 'port', door: 'hatch', top: 'skull', blade: 'sail', crop: 'gems', fence: 'rope', wall: 'palisade' },
  { n: 'Haunted', t: 2, paint: 'glow', mat: 'dark', roof: 'peak', rc: '#2A2433', win: 'glow', door: 'arch', top: 'bat', blade: 'sail', crop: 'pumpkin', fence: 'iron', wall: 'iron', deco: 'ghosts' },
  { n: 'Desert Temple', t: 2, paint: 'roof', mat: 'sand', roof: 'pyramid', win: 'none', door: 'arch', top: 'gem', blade: 'wood', crop: 'gems', fence: 'stone', wall: 'sand' },
  { n: 'Bouncy House', t: 2, paint: 'body', mat: 'inflate', roof: 'bouncy', win: 'round', door: 'round', top: 'ball', blade: 'inflate', crop: 'bubble', fence: 'inflate', wall: 'inflate', fx: 'bounce' },
  { n: 'Pizza Party', t: 2, paint: 'roof', mat: 'pizza', roof: 'slice', win: 'round', door: 'round', top: 'pepperoni', blade: 'pizza', crop: 'pepperoni', fence: 'crust', wall: 'crust' },
  { n: '8-Bit', t: 2, paint: 'body', mat: 'pixel', roof: 'pixel', win: 'pixel', door: 'pixel', top: 'pixheart', blade: 'pixel', crop: 'pixel', fence: 'pixel', wall: 'pixel' },
  { n: 'Ice Palace', t: 3, paint: 'roof', mat: 'crystal', roof: 'onion', win: 'arch', door: 'arch', top: 'star', blade: 'ice', crop: 'ice', fence: 'ice', wall: 'ice', deco: 'icicles', fx: 'sparkle' },
  { n: 'Lava Fortress', t: 3, paint: 'glow', mat: 'lava', roof: 'battle', rc: '#1E181C', win: 'glow', door: 'arch', top: 'smoke', blade: 'obsidian', crop: 'ember', fence: 'lava', wall: 'lava' },
  { n: 'Futuristic', t: 3, paint: 'glow', mat: 'metal', roof: 'saucer', rc: '#9AA5B1', win: 'neon', door: 'slide', top: 'antenna', blade: 'fan', crop: 'gems', fence: 'laser', wall: 'laser' },
  { n: 'Space Station', t: 3, paint: 'glow', mat: 'panel', roof: 'glass', rc: '#7F8B98', win: 'port', door: 'hatch', top: 'dish', blade: 'solar', crop: 'star', fence: 'laser', wall: 'laser', deco: 'stars' },
  { n: 'Underwater', t: 3, paint: 'roof', mat: 'coral', roof: 'bubble', win: 'port', door: 'round', top: 'shell', blade: 'sail', crop: 'bubble', fence: 'kelp', wall: 'coral', deco: 'bubbles' },
  { n: 'Neon Arcade', t: 3, paint: 'glow', mat: 'night', roof: 'flat', rc: '#16131F', win: 'neon', door: 'slide', top: 'sign', blade: 'neon', crop: 'pixel', fence: 'laser', wall: 'neon' },
  { n: 'Mecha', t: 3, paint: 'body', mat: 'metal', roof: 'robot', win: 'port', door: 'hatch', top: 'antenna', blade: 'prop', crop: 'gems', fence: 'metal', wall: 'metal' },
  { n: 'Disco', t: 3, paint: 'glow', mat: 'night', roof: 'flat', rc: '#16131F', win: 'disco', door: 'slide', top: 'discoball', blade: 'disco', crop: 'star', fence: 'laser', wall: 'neon', fx: 'sparkle' },
  { n: 'Cloud Kingdom', t: 4, paint: 'roof', mat: 'cloud', roof: 'cloud', win: 'arch', door: 'arch', top: 'halo', blade: 'sail', crop: 'star', fence: 'cloud', wall: 'cloud', fx: 'float' },
  { n: 'Volcano Lair', t: 4, paint: 'glow', mat: 'rock', roof: 'volcano', rc: '#3A302C', win: 'glow', door: 'arch', top: 'none', blade: 'obsidian', crop: 'ember', fence: 'lava', wall: 'lava' },
  { n: 'Jelly Dome', t: 4, paint: 'body', mat: 'jelly', roof: 'jelly', win: 'round', door: 'round', top: 'cherry', blade: 'jelly', crop: 'jelly', fence: 'jelly', wall: 'jelly', fx: 'bounce' },
  { n: 'Royal Palace', t: 4, paint: 'roof', mat: 'marble', roof: 'onion', win: 'arch', door: 'arch', top: 'crown', blade: 'gold', crop: 'gems', fence: 'gold', wall: 'gold', deco: 'gems', fx: 'sparkle' }
];
export const TOTAL = BUILDINGS.length * THEMES.length * PALS.length;

/* ---------- catalog, prices and the daily shop ---------- */
const PRICE = [[3, 7], [2, 4], [2, 3], [1, 2], [1, 2], [1, 1]];
function hash32(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
const ITEM_CACHE = new Map();
export function farmItem(id) {
  if (typeof id !== 'string') return undefined;
  if (ITEM_CACHE.has(id)) return ITEM_CACHE.get(id);
  let it;
  const m = /^f:(hall|farm|mill|barracks|wall|tower|gate|market):(\d{1,2}):(\d{1,2})$/.exec(id);
  if (m) {
    const b = m[1], ti = +m[2], pi = +m[3], th = THEMES[ti], pal = PALS[pi];
    if (th && pal && id === `f:${b}:${ti}:${pi}`) {
      let r = Math.max(th.t, pal[1]);
      if (th.t >= 2 && pal[1] >= 2) r += 1;
      r = Math.min(5, r);
      const h = hash32(id), [lo, hi] = PRICE[r];
      it = { id, slot: 'farm', farm: true, b, bname: BNAME[b], name: `${pal[0]} ${th.n} ${BNAME[b]}`, r, n: lo + (h % (hi - lo + 1)), ti, pi };
    }
  }
  ITEM_CACHE.set(id, it);
  return it;
}
let POOL = null;
function pool() {
  if (POOL) return POOL;
  POOL = {};
  for (const [b] of BUILDINGS) { POOL[b] = [[], [], [], [], [], []]; THEMES.forEach((th, ti) => PALS.forEach((p, pi) => { const it = farmItem(`f:${b}:${ti}:${pi}`); POOL[b][it.r].push(it.id); })); }
  return POOL;
}
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function wpick(rnd, w) { const tot = w.reduce((a, b) => a + b, 0); let v = rnd() * tot; for (let i = 0; i < w.length; i++) { if (v < w[i]) return i; v -= w[i]; } return w.length - 1; }
const SHOP = new Map();
export function farmShopFor(d, salt) {
  const key = salt + ':' + d;
  if (SHOP.has(key)) return SHOP.get(key);
  const P = pool(), rnd = rng(hash32('farmshop:' + key)), out = [];
  for (const [b] of BUILDINGS) {
    let r = wpick(rnd, [40, 28, 17, 9, 4.5, 1.5]);
    for (let k = 0; k < 6; k++) { const l = P[b][r]; if (l.length) { out.push(l[Math.floor(rnd() * l.length)]); break; } r = r > 0 ? r - 1 : 1; }
  }
  SHOP.set(key, out);
  return out;
}
export function inFarmShop(id, t, salt) { return farmShopFor(dayOf(t), salt).includes(id) || farmShopFor(dayOf(t - 600000), salt).includes(id); }

/* ---------- drawing helpers ---------- */
const f = n => (Math.round(n * 10) / 10).toString();
function hexRgb(h) { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function mix(a, b, t) { const x = hexRgb(a), y = hexRgb(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join(''); }
let CTXN = 0;
export function newCtx(prefix) { return { p: (prefix || 'fk') + (++CTXN), defs: [], set: new Set() }; }
function def(ctx, id, svg) { if (!ctx.set.has(id)) { ctx.set.add(id); ctx.defs.push(svg); } }
export function defsOf(ctx) {
  def(ctx, 'fsk-glow', '<filter id="fsk-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>');
  return `<defs>${ctx.defs.join('')}</defs>`;
}
function colorsFor(ctx, key, pal, K) {
  const g = pal[4];
  const id = `${ctx.p}-${key}`;
  if (g) def(ctx, id, `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">${g.map((c, i) => `<stop offset="${(i / (g.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join('')}</linearGradient>`);
  const s = pal[2];
  return { m: g ? `url(#${id})` : s, s, d: mix(s, '#000000', 0.3), l: mix(s, '#ffffff', 0.45), a: pal[3], g: K.paint === 'glow' ? s : pal[3], tier: pal[1] };
}
const STAR = (x, y, r, c, i) => `<path class="fsk-twinkle" style="animation-delay:${((i || 0) * 0.33).toFixed(2)}s" d="M${f(x)} ${f(y - r)}L${f(x + r * .3)} ${f(y - r * .3)}L${f(x + r)} ${f(y)}L${f(x + r * .3)} ${f(y + r * .3)}L${f(x)} ${f(y + r)}L${f(x - r * .3)} ${f(y + r * .3)}L${f(x - r)} ${f(y)}L${f(x - r * .3)} ${f(y - r * .3)}Z" fill="${c}"/>`;
const wave = (x, y, w) => { let d = `M${f(x)} ${f(y)}`; for (let xx = x; xx < x + w - 0.1; xx += 4) d += `q1 -2.4 2 0t2 0`; return d; };
const L = (x1, y1, x2, y2, c, sw, o) => `<path d="M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}" stroke="${c}" stroke-width="${sw}" stroke-opacity="${o}" stroke-linecap="round" fill="none"/>`;

const MAT = {
  wood: '#C8955C', stone: '#B8C0C8', logs: '#A0683A', brick: '#B5523B', cardboard: '#C9A26B', plastic: '#E5484D', candy: '#FFF4F8',
  ginger: '#B9733A', cream: '#F4E9D6', ice: '#DDF3FF', hull: '#8B5A2B', dark: '#3B3247', sand: '#E2C48A', inflate: '#FF7AB6',
  pizza: '#F2C46B', pixel: '#7BC96F', crystal: '#CDEEFF', lava: '#2A2228', metal: '#C9D2DC', panel: '#E6EBF0', coral: '#FF9E8A',
  night: '#221E33', cloud: '#FFFFFF', rock: '#4A3F3A', jelly: '#FF7AB6', marble: '#F3EFE7'
};
function texture(mat, x, y, w, h, C, ctx) {
  let s = '';
  switch (mat) {
    case 'wood': case 'hull': case 'dark': for (let yy = y + 6; yy < y + h - 1; yy += 6) s += L(x + 1, yy, x + w - 1, yy, '#000', 1, 0.18); break;
    case 'logs': for (let yy = y, i = 0; yy < y + h; yy += 6, i++) s += `<rect x="${f(x)}" y="${f(yy)}" width="${f(w)}" height="${f(Math.min(6, y + h - yy))}" rx="2.5" fill="#000" fill-opacity="${i % 2 ? 0.05 : 0.14}"/>`; break;
    case 'stone': case 'sand': case 'marble': {
      let row = 0;
      for (let yy = y + 7; yy < y + h; yy += 7, row++) { s += L(x, yy, x + w, yy, '#000', 1, 0.14); for (let xx = x + (row % 2 ? 5 : 10); xx < x + w; xx += 12) s += L(xx, yy - 7, xx, yy, '#000', 1, 0.1); }
      if (mat === 'marble') s += L(x + 3, y + h * 0.3, x + w * 0.6, y + h * 0.85, '#9AA3AD', 0.8, 0.5);
      break;
    }
    case 'brick': { let row = 0; for (let yy = y + 5; yy < y + h; yy += 5, row++) { s += L(x, yy, x + w, yy, '#fff', 0.8, 0.35); for (let xx = x + (row % 2 ? 4 : 8); xx < x + w; xx += 8) s += L(xx, yy - 5, xx, yy, '#fff', 0.8, 0.3); } break; }
    case 'cardboard': s += `<rect x="${f(x + w * 0.42)}" y="${f(y)}" width="${f(w * 0.16)}" height="${f(h)}" fill="#E8D3A6" opacity=".85"/><path d="M${f(x + 4)} ${f(y + h - 5)}l3 -4 3 4M${f(x + 7)} ${f(y + h - 9)}v6" stroke="#6B4F2A" stroke-width="1.1" fill="none"/>`; break;
    case 'plastic': case 'inflate': case 'jelly':
      s += `<rect x="${f(x + 2)}" y="${f(y + 2)}" width="${f(Math.max(2, w * 0.16))}" height="${f(h - 4)}" rx="2" fill="#fff" fill-opacity=".32"/>`;
      if (mat === 'inflate') for (let k = 1; k < 4; k++) s += L(x + (w * k) / 4, y + 2, x + (w * k) / 4, y + h - 2, '#000', 1, 0.12);
      if (mat === 'jelly') s += `<circle cx="${f(x + w * 0.7)}" cy="${f(y + h * 0.62)}" r="${f(Math.max(1.4, w * 0.05))}" fill="#fff" fill-opacity=".55"/><circle cx="${f(x + w * 0.58)}" cy="${f(y + h * 0.34)}" r="${f(Math.max(1, w * 0.03))}" fill="#fff" fill-opacity=".55"/>`;
      break;
    case 'candy': { const id = `${ctx.p}-cs${C.s.slice(1)}`; def(ctx, id, `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="8" fill="${C.s}"/></pattern>`); s += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="3" fill="url(#${id})" opacity=".8"/>`; break; }
    case 'ginger': s += `<path d="${wave(x, y + 3, w)}" stroke="#fff" stroke-width="1.8" fill="none"/><path d="${wave(x, y + h - 3, w)}" stroke="#fff" stroke-width="1.8" fill="none"/><circle cx="${f(x + w * 0.2)}" cy="${f(y + h * 0.55)}" r="1.8" fill="#E5484D"/><circle cx="${f(x + w * 0.8)}" cy="${f(y + h * 0.55)}" r="1.8" fill="#5BE38A"/>`; break;
    case 'cream': case 'coral': s += [[0.2, 0.3], [0.78, 0.6], [0.42, 0.78]].map(([a, b]) => `<circle cx="${f(x + w * a)}" cy="${f(y + h * b)}" r="${f(Math.max(1.2, w * 0.04))}" fill="${mat === 'coral' ? '#D8604A' : '#E3D3B8'}"/>`).join(''); break;
    case 'ice': case 'crystal': s += L(x + w * 0.22, y + 2, x + w * 0.06, y + h * 0.5, '#fff', 1.2, 0.85) + L(x + w * 0.82, y + h * 0.2, x + w * 0.66, y + h * 0.8, '#fff', 1.2, 0.6) + (mat === 'ice' ? L(x, y + h / 2, x + w, y + h / 2, '#9FD3F0', 1, 0.7) : ''); break;
    case 'pizza': s += [[0.2, 0.35], [0.55, 0.25], [0.82, 0.62], [0.36, 0.72]].map(([a, b]) => `<circle cx="${f(x + w * a)}" cy="${f(y + h * b)}" r="${f(Math.max(1.6, w * 0.06))}" fill="#C8352B"/>`).join(''); break;
    case 'pixel': for (let yy = y, r = 0; yy < y + h - 1; yy += 4, r++) for (let xx = x + (r % 2) * 4; xx < x + w - 1; xx += 8) s += `<rect x="${f(xx)}" y="${f(yy)}" width="4" height="4" fill="#000" fill-opacity=".09"/>`; break;
    case 'lava': case 'rock': s += `<path class="fsk-pulse" d="M${f(x + w * 0.2)} ${f(y + 2)}l${f(w * 0.1)} ${f(h * 0.3)}l${f(-w * 0.08)} ${f(h * 0.25)}l${f(w * 0.12)} ${f(h * 0.4)}M${f(x + w * 0.7)} ${f(y + h * 0.15)}l${f(-w * 0.1)} ${f(h * 0.3)}l${f(w * 0.1)} ${f(h * 0.3)}" stroke="${C.g}" stroke-width="1.6" fill="none" stroke-linejoin="round" filter="url(#fsk-glow)"/>`; break;
    case 'metal': case 'panel': s += L(x, y + h * 0.5, x + w, y + h * 0.5, '#000', 0.8, 0.15) + [x + 3, x + w - 3].map(xx => `<circle cx="${f(xx)}" cy="${f(y + 3)}" r="1" fill="#7F8B98"/><circle cx="${f(xx)}" cy="${f(y + h - 3)}" r="1" fill="#7F8B98"/>`).join('') + (mat === 'panel' ? `<rect class="fsk-pulse" x="${f(x + w * 0.1)}" y="${f(y + h * 0.64)}" width="${f(w * 0.22)}" height="2" fill="${C.g}"/>` : ''); break;
    case 'night': s += `<rect class="fsk-pulse" x="${f(x + 1.5)}" y="${f(y + 1.5)}" width="${f(w - 3)}" height="${f(h - 3)}" rx="2" fill="none" stroke="${C.g}" stroke-width="1.4" filter="url(#fsk-glow)"/>`; break;
    case 'cloud': { const r = Math.max(3, w / 12); for (let xx = x; xx <= x + w + 0.1; xx += Math.max(6, w / 6)) s += `<circle cx="${f(xx)}" cy="${f(y + h)}" r="${f(r)}" fill="#fff"/>`; s += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="3" fill="none" stroke="#DCE6F2" stroke-width="1"/>`; break; }
    default: break;
  }
  return s;
}
function body(x, y, w, h, K, C, ctx) {
  const base = K.paint === 'body' ? C.m : (MAT[K.mat] || '#C8955C');
  const op = K.mat === 'jelly' ? ' fill-opacity=".88"' : '';
  return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${K.mat === 'inflate' || K.mat === 'jelly' || K.mat === 'cloud' ? 5 : 2}" fill="${base}"${op}/>` + texture(K.mat, x, y, w, h, C, ctx);
}

/* roofs return the svg and the top y for ornaments */
function roof(kind, x, y, w, K, C, ctx) {
  const rc = K.paint === 'roof' ? C.m : K.paint === 'body' ? C.d : (K.rc || '#2E2838');
  const tc = K.paint === 'glow' ? C.g : C.a;
  const h = w * 0.42, cx = x + w / 2;
  switch (kind) {
    case 'battle': {
      const n = Math.max(2, Math.round(w / 8)), seg = (w + 4) / n;
      let s = `<rect x="${f(x - 2)}" y="${f(y - 3)}" width="${f(w + 4)}" height="4" fill="${rc}"/>`;
      for (let i = 0; i < n; i++) s += `<rect x="${f(x - 2 + i * seg)}" y="${f(y - 8)}" width="${f(seg * 0.55)}" height="5" fill="${rc}"/>`;
      return { s: s + `<rect x="${f(x - 2)}" y="${f(y - 1)}" width="${f(w + 4)}" height="1.4" fill="${tc}" opacity=".8"/>`, top: y - 8 };
    }
    case 'flat': return { s: `<rect x="${f(x - 3)}" y="${f(y - 5)}" width="${f(w + 6)}" height="6" rx="1.5" fill="${rc}"/><rect x="${f(x - 3)}" y="${f(y - 1.6)}" width="${f(w + 6)}" height="1.6" fill="${tc}" class="${K.paint === 'glow' ? 'fsk-pulse' : ''}"/>`, top: y - 5 };
    case 'dome': return { s: `<path d="M${f(x)} ${f(y + 1)}A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(x + w)} ${f(y + 1)}Z" fill="${rc}"/><path d="M${f(x + w * 0.18)} ${f(y - w * 0.1)}A${f(w * 0.34)} ${f(w * 0.34)} 0 0 1 ${f(x + w * 0.44)} ${f(y - w * 0.38)}" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/>`, top: y - w / 2 };
    case 'onion': {
      const hh = w * 0.55;
      return { s: `<path d="M${f(x + w * 0.12)} ${f(y + 1)}C${f(x - w * 0.02)} ${f(y - hh * 0.5)} ${f(cx - w * 0.12)} ${f(y - hh * 0.85)} ${f(cx)} ${f(y - hh * 1.35)}C${f(cx + w * 0.12)} ${f(y - hh * 0.85)} ${f(x + w * 1.02)} ${f(y - hh * 0.5)} ${f(x + w * 0.88)} ${f(y + 1)}Z" fill="${rc}"/><path d="M${f(cx - w * 0.18)} ${f(y - hh * 0.4)}Q${f(cx - w * 0.12)} ${f(y - hh * 0.9)} ${f(cx - 1)} ${f(y - hh * 1.15)}" stroke="#fff" stroke-opacity=".5" stroke-width="1.6" fill="none"/><path d="M${f(cx)} ${f(y - hh * 1.35)}V${f(y - hh * 1.65)}" stroke="${tc}" stroke-width="1.4"/>`, top: y - hh * 1.65 };
    }
    case 'mushroom': {
      const hh = w * 0.5;
      return { s: `<path d="M${f(x - w * 0.22)} ${f(y + 2)}Q${f(x - w * 0.18)} ${f(y - hh * 1.3)} ${f(cx)} ${f(y - hh * 1.35)}Q${f(x + w * 1.18)} ${f(y - hh * 1.3)} ${f(x + w * 1.22)} ${f(y + 2)}Z" fill="${rc}"/>${[[0.1, 0.55], [0.48, 0.95], [0.8, 0.5], [0.3, 0.3], [0.68, 0.25]].map(([a, b]) => `<circle cx="${f(x - w * 0.15 + w * 1.3 * a)}" cy="${f(y - hh * b)}" r="${f(Math.max(1.5, w * 0.07))}" fill="#fff" fill-opacity=".9"/>`).join('')}`, top: y - hh * 1.35 };
    }
    case 'drip': {
      let s = `<path d="M${f(x - 4)} ${f(y + 2)}L${f(cx)} ${f(y - h)}L${f(x + w + 4)} ${f(y + 2)}Z" fill="${rc}"/>`;
      s += `<path d="M${f(x - 4)} ${f(y + 2)}L${f(cx)} ${f(y - h)}L${f(x + w + 4)} ${f(y + 2)}" stroke="#FFF7FB" stroke-width="3.2" fill="none" stroke-linejoin="round"/>`;
      for (let k = 1; k < 5; k++) s += `<rect x="${f(x - 4 + ((w + 8) * k) / 5 - 1.2)}" y="${f(y + 1)}" width="2.4" height="${f(3 + (k % 2) * 3)}" rx="1.2" fill="#FFF7FB"/>`;
      return { s, top: y - h };
    }
    case 'bouncy': {
      const r = Math.max(3, w / 8);
      let s = '';
      for (let xx = x + r * 0.6, i = 0; xx <= x + w - r * 0.6 + 0.1; xx += r * 1.25, i++) s += `<circle cx="${f(xx)}" cy="${f(y - r * 0.6)}" r="${f(r)}" fill="${i % 2 ? tc : rc}"/>`;
      for (const tx of [x + r * 0.3, x + w - r * 0.3]) s += `<path d="M${f(tx - r * 0.8)} ${f(y - r)}L${f(tx)} ${f(y - r * 3.2)}L${f(tx + r * 0.8)} ${f(y - r)}Z" fill="${C.l}"/><circle cx="${f(tx)}" cy="${f(y - r * 3.3)}" r="${f(r * 0.45)}" fill="${tc}"/>`;
      return { s, top: y - r * 2 };
    }
    case 'leafy': {
      const r = Math.max(4, w * 0.24);
      const cols = ['#4E9A33', '#5FAE3E', '#6CBF47'];
      const pts = [[-0.1, 0], [0.25, -0.5], [0.6, -0.55], [0.95, -0.1], [0.45, -0.95], [0.1, -0.7], [0.82, -0.75]];
      return { s: pts.map(([a, b], i) => `<circle cx="${f(x + w * a + r * 0.2)}" cy="${f(y + r * b)}" r="${f(r)}" fill="${cols[i % 3]}"/>`).join('') + `<circle cx="${f(x + w * 0.35)}" cy="${f(y - r * 0.6)}" r="${f(r * 0.3)}" fill="${rc}"/><circle cx="${f(x + w * 0.7)}" cy="${f(y - r * 0.2)}" r="${f(r * 0.25)}" fill="${rc}"/>`, top: y - r * 1.8 };
    }
    case 'pyramid': {
      let s = '';
      for (let k = 0; k < 3; k++) { const ww = w + 6 - k * (w / 3), yy = y - k * (h / 3); s += `<rect x="${f(cx - ww / 2)}" y="${f(yy - h / 3)}" width="${f(ww)}" height="${f(h / 3 + 0.5)}" fill="${k % 2 ? C.d : rc}"/>`; }
      return { s, top: y - h };
    }
    case 'saucer': return { s: `<ellipse cx="${f(cx)}" cy="${f(y - 2)}" rx="${f(w * 0.68)}" ry="${f(Math.max(2.5, w * 0.12))}" fill="${rc}"/><path d="M${f(cx - w * 0.3)} ${f(y - 3)}A${f(w * 0.3)} ${f(w * 0.3)} 0 0 1 ${f(cx + w * 0.3)} ${f(y - 3)}Z" fill="#BFE6FF" fill-opacity=".85"/>${[-0.45, -0.15, 0.15, 0.45].map(a => `<circle class="fsk-pulse" cx="${f(cx + w * a)}" cy="${f(y - 1.5)}" r="1.2" fill="${C.g}"/>`).join('')}`, top: y - w * 0.32 };
    case 'glass': return { s: `<path d="M${f(x)} ${f(y + 1)}A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(x + w)} ${f(y + 1)}Z" fill="#BFE6FF" fill-opacity=".7" stroke="${rc}" stroke-width="1.6"/><path d="M${f(cx)} ${f(y + 1)}V${f(y - w / 2)}M${f(x + w * 0.15)} ${f(y - w * 0.3)}H${f(x + w * 0.85)}" stroke="${rc}" stroke-width="1.2"/><path d="M${f(x + w * 0.2)} ${f(y - w * 0.12)}A${f(w * 0.32)} ${f(w * 0.32)} 0 0 1 ${f(x + w * 0.42)} ${f(y - w * 0.36)}" stroke="#fff" stroke-width="1.6" fill="none"/>`, top: y - w / 2 };
    case 'sail': return { s: `<path d="M${f(cx)} ${f(y + 1)}V${f(y - h * 1.7)}" stroke="#5B3A1C" stroke-width="2"/><path d="M${f(cx + 1)} ${f(y - h * 1.55)}Q${f(cx + w * 0.55)} ${f(y - h * 0.9)} ${f(cx + 1)} ${f(y - h * 0.2)}Z" fill="#F7F3E8"/><path d="M${f(cx - 1)} ${f(y - h * 1.3)}Q${f(cx - w * 0.42)} ${f(y - h * 0.8)} ${f(cx - 1)} ${f(y - h * 0.3)}Z" fill="${rc}"/>`, top: y - h * 1.7 };
    case 'cloud': {
      const r = Math.max(4, w * 0.2);
      return { s: [[0, 0], [0.28, -0.55], [0.6, -0.65], [0.92, -0.05], [0.5, -0.15]].map(([a, b]) => `<circle cx="${f(x + w * a + r * 0.3)}" cy="${f(y + r * b)}" r="${f(r)}" fill="#fff"/>`).join('') + `<path d="M${f(x)} ${f(y + 1)}H${f(x + w)}" stroke="${rc}" stroke-width="2.4"/>`, top: y - r * 1.5 };
    }
    case 'studs': { const n = Math.max(2, Math.round(w / 7)); return { s: `<rect x="${f(x - 2)}" y="${f(y - 5)}" width="${f(w + 4)}" height="6" rx="1" fill="${rc}"/>${Array.from({ length: n }, (_, i) => `<rect x="${f(x + (w * (i + 0.5)) / n - 2.2)}" y="${f(y - 8)}" width="4.4" height="3.4" rx="1" fill="${rc}"/>`).join('')}`, top: y - 8 }; }
    case 'flaps': return { s: `<path d="M${f(x)} ${f(y)}L${f(x - w * 0.18)} ${f(y - h * 0.7)}L${f(x + w * 0.42)} ${f(y - h * 0.6)}L${f(x + w * 0.5)} ${f(y)}Z" fill="#B48A55"/><path d="M${f(x + w)} ${f(y)}L${f(x + w * 1.18)} ${f(y - h * 0.7)}L${f(x + w * 0.58)} ${f(y - h * 0.6)}L${f(x + w * 0.5)} ${f(y)}Z" fill="#A87E4A"/><rect x="${f(x)}" y="${f(y - 1.5)}" width="${f(w)}" height="2" fill="${rc}"/>`, top: y - h * 0.6 };
    case 'robot': {
      const hh = Math.max(8, w * 0.42);
      return { s: `<rect x="${f(x + w * 0.12)}" y="${f(y - hh)}" width="${f(w * 0.76)}" height="${f(hh + 1)}" rx="3" fill="${rc}"/><rect x="${f(x + w * 0.2)}" y="${f(y - hh * 0.75)}" width="${f(w * 0.6)}" height="${f(hh * 0.42)}" rx="2" fill="#16131F"/><circle class="fsk-pulse" cx="${f(x + w * 0.36)}" cy="${f(y - hh * 0.54)}" r="${f(Math.max(1.4, w * 0.06))}" fill="${C.g === C.a ? '#3EC1FF' : C.g}"/><circle class="fsk-pulse" cx="${f(x + w * 0.64)}" cy="${f(y - hh * 0.54)}" r="${f(Math.max(1.4, w * 0.06))}" fill="${C.g === C.a ? '#3EC1FF' : C.g}"/>`, top: y - hh };
    }
    case 'volcano': {
      const hh = h * 1.2;
      return { s: `<path d="M${f(x - 6)} ${f(y + 2)}L${f(cx - w * 0.16)} ${f(y - hh)}H${f(cx + w * 0.16)}L${f(x + w + 6)} ${f(y + 2)}Z" fill="${rc}"/><path class="fsk-pulse" d="M${f(cx - w * 0.16)} ${f(y - hh)}H${f(cx + w * 0.16)}L${f(cx + w * 0.1)} ${f(y - hh * 0.55)}L${f(cx + w * 0.02)} ${f(y - hh * 0.75)}L${f(cx - w * 0.06)} ${f(y - hh * 0.45)}Z" fill="${C.g}" filter="url(#fsk-glow)"/><g class="fsk-float"><circle cx="${f(cx)}" cy="${f(y - hh - 5)}" r="3.2" fill="#9AA3AD" opacity=".75"/><circle cx="${f(cx + 4)}" cy="${f(y - hh - 9)}" r="2.4" fill="#B8C0C8" opacity=".6"/></g>`, top: y - hh - 10 };
    }
    case 'pixel': {
      let s = '';
      const step = Math.max(3, w / 6);
      for (let k = 0; k < 3; k++) s += `<rect x="${f(x - 2 + k * step)}" y="${f(y - (k + 1) * step * 0.7)}" width="${f(w + 4 - 2 * k * step)}" height="${f(step * 0.7 + 0.5)}" fill="${k % 2 ? C.l : rc}"/>`;
      return { s, top: y - step * 2.1 };
    }
    case 'slice': {
      const hh = h * 1.25;
      return { s: `<path d="M${f(x - 4)} ${f(y + 2)}L${f(cx)} ${f(y - hh)}L${f(x + w + 4)} ${f(y + 2)}Z" fill="#F5D27A"/><path d="M${f(x - 4)} ${f(y + 2)}H${f(x + w + 4)}" stroke="#C98A3A" stroke-width="4" stroke-linecap="round"/>${[[0.35, 0.3], [0.62, 0.42], [0.48, 0.7]].map(([a, b]) => `<circle cx="${f(x + w * a)}" cy="${f(y - hh * b)}" r="${f(Math.max(1.6, w * 0.07))}" fill="${rc}"/>`).join('')}`, top: y - hh };
    }
    case 'bubble': return { s: `<path d="M${f(x - 3)} ${f(y + 1)}A${f(w / 2 + 3)} ${f(w / 2 + 3)} 0 0 1 ${f(x + w + 3)} ${f(y + 1)}Z" fill="${C.l}" fill-opacity=".55" stroke="${rc}" stroke-width="1.5"/><path d="M${f(x + w * 0.12)} ${f(y - w * 0.12)}A${f(w * 0.35)} ${f(w * 0.35)} 0 0 1 ${f(x + w * 0.4)} ${f(y - w * 0.4)}" stroke="#fff" stroke-width="1.8" fill="none"/>`, top: y - w / 2 - 3 };
    case 'jelly': return { s: `<path d="M${f(x - 2)} ${f(y + 1)}Q${f(x - 1)} ${f(y - w * 0.62)} ${f(cx)} ${f(y - w * 0.6)}Q${f(x + w + 1)} ${f(y - w * 0.62)} ${f(x + w + 2)} ${f(y + 1)}q${f(-w * 0.12)} 3 ${f(-w * 0.25)} 0q${f(-w * 0.12)} 3 ${f(-w * 0.25)} 0q${f(-w * 0.12)} 3 ${f(-w * 0.25)} 0q${f(-w * 0.12)} 3 ${f(-w * 0.25)} 0Z" fill="${rc}" fill-opacity=".85"/><path d="M${f(x + w * 0.15)} ${f(y - w * 0.2)}Q${f(x + w * 0.2)} ${f(y - w * 0.45)} ${f(x + w * 0.4)} ${f(y - w * 0.5)}" stroke="#fff" stroke-opacity=".6" stroke-width="1.8" fill="none"/>`, top: y - w * 0.6 };
    default: return { s: `<path d="M${f(x - 4)} ${f(y + 2)}L${f(cx)} ${f(y - h)}L${f(x + w + 4)} ${f(y + 2)}Z" fill="${rc}"/><path d="M${f(x - 4)} ${f(y + 2)}L${f(cx)} ${f(y - h)}L${f(x + w + 4)} ${f(y + 2)}" stroke="${tc}" stroke-width="1.5" fill="none" stroke-linejoin="round" opacity=".7"/>`, top: y - h };
  }
}

function windows(kind, x, y, w, h, n, K, C) {
  if (kind === 'none' || n < 1) return '';
  const ws = Math.max(3, Math.min(w / (n * 2.3), h * 0.34));
  const glow = K.paint === 'glow' ? C.g : '#FFD166';
  let s = '';
  for (let i = 0; i < n; i++) {
    const cx = x + (w * (i + 1)) / (n + 1), cy = y + h * 0.36, r = ws / 2;
    switch (kind) {
      case 'round': s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="#BFE6FF" stroke="${C.a}" stroke-width="1"/>`; break;
      case 'arch': s += `<path d="M${f(cx - r)} ${f(cy + r)}V${f(cy)}A${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(cy)}V${f(cy + r)}Z" fill="#BFE6FF" stroke="#5B6470" stroke-width=".9"/>`; break;
      case 'port': s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="#9FD8FF" stroke="#7F8B98" stroke-width="${f(Math.max(1, r * 0.4))}"/>`; break;
      case 'glow': s += `<rect class="fsk-pulse" x="${f(cx - r)}" y="${f(cy - r)}" width="${f(ws)}" height="${f(ws * 1.1)}" rx="1" fill="${glow}" filter="url(#fsk-glow)"/>`; break;
      case 'neon': s += `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${f(ws)}" height="${f(ws)}" rx="1.5" fill="#16131F" stroke="${C.g}" stroke-width="1.1" filter="url(#fsk-glow)"/>`; break;
      case 'heart': s += `<path d="M${f(cx)} ${f(cy + r)}C${f(cx - r * 1.6)} ${f(cy)} ${f(cx - r)} ${f(cy - r * 1.2)} ${f(cx)} ${f(cy - r * 0.3)}C${f(cx + r)} ${f(cy - r * 1.2)} ${f(cx + r * 1.6)} ${f(cy)} ${f(cx)} ${f(cy + r)}Z" fill="#FF7FA0" stroke="#fff" stroke-width=".8"/>`; break;
      case 'pixel': s += `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${f(ws)}" height="${f(ws)}" fill="#BFE6FF"/><rect x="${f(cx - r)}" y="${f(cy - r)}" width="${f(ws / 2)}" height="${f(ws / 2)}" fill="#fff" opacity=".7"/>`; break;
      case 'scribble': s += `<path d="M${f(cx - r)} ${f(cy - r)}l${f(ws)} 0.6l-0.4 ${f(ws)}l${f(-ws)} -0.5z" fill="#3B2A1A" fill-opacity=".85" stroke="#3B2A1A" stroke-width=".8"/>`; break;
      case 'disco': s += `<rect class="fsk-disco" style="animation-delay:${(i * 0.3).toFixed(1)}s" x="${f(cx - r)}" y="${f(cy - r)}" width="${f(ws)}" height="${f(ws)}" rx="1" fill="#FF4F8B" filter="url(#fsk-glow)"/>`; break;
      default: s += `<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${f(ws)}" height="${f(ws)}" fill="#BFE6FF" stroke="#fff" stroke-width=".8"/><path d="M${f(cx)} ${f(cy - r)}V${f(cy + r)}M${f(cx - r)} ${f(cy)}H${f(cx + r)}" stroke="#fff" stroke-width=".7"/>`;
    }
  }
  return s;
}

function door(kind, cx, by, size, K, C) {
  const w = size * 0.9, h = size * 1.3, x = cx - w / 2, y = by - h;
  switch (kind) {
    case 'arch': return `<path d="M${f(x)} ${f(by)}V${f(y + w / 2)}A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(x + w)} ${f(y + w / 2)}V${f(by)}Z" fill="#3B2312"/>`;
    case 'round': return `<path d="M${f(x)} ${f(by)}V${f(y + w / 2)}A${f(w / 2)} ${f(w / 2)} 0 0 1 ${f(x + w)} ${f(y + w / 2)}V${f(by)}Z" fill="${C.d}"/><circle cx="${f(x + w * 0.75)}" cy="${f(by - h * 0.4)}" r=".9" fill="#FFD34D"/>`;
    case 'slide': return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="1" fill="#5C6570"/><path d="M${f(cx)} ${f(y)}V${f(by)}" stroke="#2E3440" stroke-width=".8"/><rect class="fsk-pulse" x="${f(x)}" y="${f(y + 1)}" width="${f(w)}" height="1.2" fill="${C.g}"/>`;
    case 'hatch': return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(w * 0.3)}" fill="#5C6570" stroke="#3B3F45" stroke-width=".8"/><circle cx="${f(cx)}" cy="${f(y + h * 0.45)}" r="${f(w * 0.22)}" fill="none" stroke="#C9D2DC" stroke-width=".9"/>`;
    case 'flap': return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="#A9824F"/><rect x="${f(x)}" y="${f(y + h * 0.35)}" width="${f(w)}" height="${f(Math.max(1.5, h * 0.15))}" fill="#E8D3A6"/>`;
    case 'pixel': return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="#5B3A1C"/><rect x="${f(x + w * 0.65)}" y="${f(y + h * 0.5)}" width="1.5" height="1.5" fill="#FFD34D"/>`;
    default: return `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(w * 0.12)}" fill="#6B4226"/><path d="M${f(x + w / 3)} ${f(y + 1)}V${f(by)}M${f(x + (w * 2) / 3)} ${f(y + 1)}V${f(by)}" stroke="#4A2B16" stroke-width=".7"/>`;
  }
}

function topper(kind, cx, ty, K, C, s) {
  s = s || 1;
  const T = (inner) => `<g transform="translate(${f(cx)} ${f(ty)}) scale(${s})">${inner}</g>`;
  switch (kind) {
    case 'flag': return T(`<path d="M0 0V-12" stroke="#5B4426" stroke-width="1.4"/><path d="M0 -12L10 -9L0 -6Z" fill="${C.a === '#FFFFFF' ? '#7B4FE0' : C.a}"/>`);
    case 'pennants': return T(`<path d="M0 0V-11" stroke="#5B4426" stroke-width="1.2"/><path d="M0 -11L9 -8L0 -5Z" fill="${C.m}"/><path d="M-12 2Q0 -4 12 2" stroke="#5B4426" stroke-width=".6" fill="none"/>${[-8, -3, 3, 8].map((x, i) => `<path d="M${x - 1.6} ${-1 + Math.abs(x) * 0.15}h3.2l-1.6 3z" fill="${['#FF5DA2', '#FFC233', '#3EC1FF', '#5BE38A'][i]}"/>`).join('')}`);
    case 'chimney': return T(`<rect x="6" y="2" width="5" height="9" fill="#8E4B3A"/><g class="fsk-float"><circle cx="9" cy="-2" r="2.6" fill="#D5DCE3" opacity=".8"/><circle cx="12" cy="-6" r="2" fill="#E3E8EE" opacity=".65"/></g>`);
    case 'antenna': return T(`<path d="M0 0V-10" stroke="#5C6570" stroke-width="1.2"/><circle class="fsk-pulse" cx="0" cy="-11" r="2" fill="${C.g}" filter="url(#fsk-glow)"/>`);
    case 'ball': return T(`<circle cx="0" cy="-5" r="5" fill="#fff"/><path d="M0 -10A5 5 0 0 1 5 -5H0Z" fill="#E5484D"/><path d="M0 0A5 5 0 0 1 -5 -5H0Z" fill="#3EC1FF"/><path d="M-5 -5A5 5 0 0 1 0 -10V-5Z" fill="#FFC233"/>`);
    case 'cherry': return T(`<path d="M0 -4Q1 -10 5 -12" stroke="#3B7A2A" stroke-width="1.2" fill="none"/><circle cx="0" cy="-3" r="3.4" fill="#D7263D"/><circle cx="-1" cy="-4.2" r="1" fill="#fff" opacity=".7"/>`);
    case 'skull': return T(`<path d="M0 0V-14" stroke="#3B2312" stroke-width="1.4"/><rect x="0" y="-14" width="11" height="7" fill="#16131F"/><circle cx="5.5" cy="-10.8" r="2" fill="#fff"/><path d="M3.5 -8.4h4" stroke="#fff" stroke-width=".8"/>`);
    case 'bat': return T(`<g class="fsk-float"><path d="M0 -8q-3 -3 -7 -1q2 1 2 3q2 -1 3 0q1 -2 2 -2q1 0 2 2q1 -1 3 0q0 -2 2 -3q-4 -2 -7 1z" fill="#16131F"/></g>`);
    case 'gem': return T(`<path d="M0 -12L4 -6L0 0L-4 -6Z" fill="${C.m}" stroke="#fff" stroke-width=".8"/>`);
    case 'star': return T(`<path d="M0 -13L2.6 -7.6L8 -7L4 -3.4L5 2L0 -0.8L-5 2L-4 -3.4L-8 -7L-2.6 -7.6Z" fill="#FFD34D" stroke="#E3A008" stroke-width=".6"/>`);
    case 'smoke': return T(`<g class="fsk-float"><circle cx="0" cy="-4" r="3.6" fill="#6E6A70" opacity=".7"/><circle cx="4" cy="-9" r="2.8" fill="#8A868C" opacity=".55"/><circle cx="-2" cy="-13" r="2.2" fill="#A39FA5" opacity=".45"/></g>`);
    case 'dish': return T(`<path d="M0 0V-6" stroke="#7F8B98" stroke-width="1.2"/><path d="M-6 -12A7 7 0 0 0 6 -6Z" fill="#E6EBF0" stroke="#7F8B98" stroke-width=".8"/><circle class="fsk-pulse" cx="1" cy="-9" r="1.2" fill="${C.g}"/>`);
    case 'shell': return T(`<path d="M-6 0Q-6 -9 0 -10Q6 -9 6 0Z" fill="#FFD1C7" stroke="#E59A8B" stroke-width=".8"/><path d="M0 -10V0M-3 -9L-2 0M3 -9L2 0" stroke="#E59A8B" stroke-width=".6"/>`);
    case 'sign': return T(`<rect x="-12" y="-11" width="24" height="9" rx="2" fill="#16131F" stroke="${C.g}" stroke-width="1" filter="url(#fsk-glow)"/><text x="0" y="-4.4" text-anchor="middle" font-family="'Baloo 2',system-ui,sans-serif" font-weight="800" font-size="6" fill="${C.g}" class="fsk-pulse">SCOBB</text>`);
    case 'discoball': return T(`<path d="M0 0V-3" stroke="#9AA5B1" stroke-width=".8"/><circle cx="0" cy="-8" r="5" fill="#C9D2DC"/><path d="M-5 -8H5M0 -13V-3M-4 -11H4M-4 -5H4" stroke="#7F8B98" stroke-width=".5"/>${STAR(-7, -12, 2.4, '#fff', 0)}${STAR(7, -6, 2, '#fff', 2)}`);
    case 'halo': return T(`<g class="fsk-float"><ellipse cx="0" cy="-7" rx="7" ry="2.2" fill="none" stroke="#FFD34D" stroke-width="2" filter="url(#fsk-glow)"/></g>`);
    case 'crown': return T(`<path d="M-6 0L-6 -8L-3 -4L0 -10L3 -4L6 -8L6 0Z" fill="#E3B341" stroke="#A87A14" stroke-width=".6"/><circle cx="0" cy="-3" r="1.2" fill="#E5484D"/>`);
    case 'gumdrop': return T(`<path d="M-4 0A4 4.5 0 0 1 4 0Z" fill="${C.s}"/>${[[-2, -1.5], [1, -2.6], [2.2, -1]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r=".5" fill="#fff"/>`).join('')}`);
    case 'pepperoni': return T(`<circle cx="0" cy="-4" r="4" fill="#C8352B"/><circle cx="-1.4" cy="-5" r=".8" fill="#E86A5E"/><circle cx="1.3" cy="-3" r=".7" fill="#E86A5E"/>`);
    case 'pixheart': return T(`${[[-3, -9], [1, -9], [-5, -7], [-1, -7], [3, -7], [-3, -5], [1, -5], [-1, -3]].map(([a, b]) => `<rect x="${a}" y="${b}" width="2" height="2" fill="#E5484D"/>`).join('')}<rect x="-3" y="-7" width="6" height="2" fill="#E5484D"/>`);
    default: return '';
  }
}

function deco(kind, box, K, C) {
  const { x, y, w, h } = box;
  switch (kind) {
    case 'sprinkles': return [[0.15, -0.15], [0.4, -0.3], [0.7, -0.12], [0.25, 0.55], [0.8, 0.7]].map(([a, b], i) => `<rect x="${f(x + w * a)}" y="${f(y + h * b)}" width="3" height="1.2" rx=".6" fill="${['#FF5DA2', '#FFC233', '#3EC1FF', '#5BE38A', '#B98BFF'][i]}" transform="rotate(${i * 37} ${f(x + w * a)} ${f(y + h * b)})"/>`).join('');
    case 'gumdrops': return [0.12, 0.38, 0.62, 0.88].map((a, i) => `<path d="M${f(x + w * a - 3)} ${f(y + h)}A3 3.4 0 0 1 ${f(x + w * a + 3)} ${f(y + h)}Z" fill="${['#FF5DA2', '#5BE38A', '#FFC233', '#3EC1FF'][i]}"/>`).join('');
    case 'vines': return `<path d="M${f(x + 2)} ${f(y + h)}C${f(x + 8)} ${f(y + h * 0.6)} ${f(x - 2)} ${f(y + h * 0.4)} ${f(x + 5)} ${f(y + 2)}" stroke="#3B7A2A" stroke-width="1.2" fill="none"/>${[[0.75], [0.45], [0.15]].map(([b]) => `<ellipse cx="${f(x + 5)}" cy="${f(y + h * b)}" rx="2.2" ry="1.2" fill="#5FAE3E"/>`).join('')}`;
    case 'ghosts': return [[x - 8, y - 2, 0], [x + w + 6, y + 4, 0.8]].map(([gx, gy, d]) => `<g class="fsk-float" style="animation-delay:${d}s"><path d="M${f(gx - 4)} ${f(gy + 5)}V${f(gy)}A4 4 0 0 1 ${f(gx + 4)} ${f(gy)}V${f(gy + 5)}l-2 -1.5l-2 1.5l-2 -1.5z" fill="#fff" fill-opacity=".85"/><circle cx="${f(gx - 1.4)}" cy="${f(gy)}" r=".8" fill="#16131F"/><circle cx="${f(gx + 1.4)}" cy="${f(gy)}" r=".8" fill="#16131F"/></g>`).join('');
    case 'icicles': { const n = Math.max(3, Math.round(w / 6)); return Array.from({ length: n }, (_, i) => `<path d="M${f(x + (w * (i + 0.5)) / n - 1.5)} ${f(y)}h3l-1.5 ${f(3 + (i % 2) * 2.5)}z" fill="#E8F7FF"/>`).join(''); }
    case 'stars': return [[x - 6, y - 6], [x + w + 6, y + 2], [x + w * 0.5, y - h * 0.9]].map(([sx, sy], i) => STAR(sx, sy, 2.4, '#FFFFFF', i)).join('');
    case 'bubbles': return [[x + w + 4, y + h * 0.4, 2], [x + w + 7, y + h * 0.1, 1.4], [x - 5, y + h * 0.3, 1.8]].map(([bx, by, r], i) => `<circle class="fsk-float" style="animation-delay:${i * 0.5}s" cx="${f(bx)}" cy="${f(by)}" r="${r}" fill="none" stroke="#fff" stroke-width=".9"/>`).join('');
    case 'gems': return [0.2, 0.5, 0.8].map((a, i) => `<path d="M${f(x + w * a)} ${f(y + h * 0.78 - 2.4)}l2 2.4l-2 2.4l-2 -2.4z" fill="${['#E5484D', '#3EC1FF', '#5BE38A'][i]}"/>`).join('');
    default: return '';
  }
}

function finish(s, K, C, box) {
  let out = s;
  if (K.fx === 'bounce') out = `<g class="fsk-bounce">${out}</g>`;
  else if (K.fx === 'float') out = `<g class="fsk-float">${out}</g>`;
  if (K.fx === 'sparkle' || C.tier >= 4) out += [[box.x - 4, box.y + 2], [box.x + box.w + 4, box.y - 4], [box.x + box.w * 0.6, box.y - box.h * 0.6]].map(([sx, sy], i) => STAR(sx, sy, 2.6, C.tier >= 5 ? ['#FF4F8B', '#FFC233', '#3EC1FF'][i] : '#FFF6C9', i)).join('');
  return out;
}

/* ---------- the eight buildings (local coordinates) ---------- */
function hall(age, K, C, ctx) {
  const W = [40, 56, 70, 86][age - 1], H = [30, 38, 44, 48][age - 1];
  const x = 50 - W / 2, by = 106, y = by - H;
  let s = '';
  if (age >= 3) {
    const tw = age === 4 ? 16 : 14, th = H + 14;
    for (const tx of [x - tw + 4, x + W - 4]) { s += body(tx, by - th, tw, th, K, C, ctx) + roof(K.roof, tx, by - th, tw, K, C, ctx).s + windows(K.win, tx, by - th, tw, th, 1, K, C); }
  }
  s += body(x, y, W, H, K, C, ctx) + windows(K.win, x, y, W, H, age <= 2 ? 2 : 4, K, C) + door(K.door, 50, by, age === 1 ? 10 : 14, K, C);
  const r = roof(K.roof, x, y, W, K, C, ctx);
  s += r.s + topper(K.top, 50, r.top, K, C, age >= 3 ? 1.3 : 1) + deco(K.deco, { x, y, w: W, h: H }, K, C);
  return finish(s, K, C, { x, y: r.top, w: W, h: by - r.top });
}
const SOIL = { jelly: '#8B5E3C', flower: '#7A5232', candy: '#FFD6E8', mush: '#6B4A2E', pixel: '#5E9E3A', gems: '#5A4636', ice: '#F2FAFF', pumpkin: '#4A3A2A', ember: '#2A2228', bubble: '#1E6FA0', star: '#2B2350', pepperoni: '#F2C46B' };
const JELLY = ['#FF5DA2', '#FFC233', '#5BE38A', '#3EC1FF', '#B98BFF'];
function crop(kind, x, y, i, C) {
  switch (kind) {
    case 'flower': return `<circle cx="${f(x)}" cy="${f(y)}" r="2.3" fill="${i % 2 ? C.s : '#FF7FA0'}"/><circle cx="${f(x)}" cy="${f(y)}" r=".9" fill="#FFE066"/>`;
    case 'candy': return `<path d="M${f(x)} ${f(y)}v3.4" stroke="#fff" stroke-width=".8"/><circle cx="${f(x)}" cy="${f(y)}" r="2.4" fill="${i % 2 ? C.s : '#FF5DA2'}"/><path d="M${f(x - 1.2)} ${f(y)}a1.2 1.2 0 0 1 2.4 0" stroke="#fff" stroke-width=".7" fill="none"/>`;
    case 'mush': return `<rect x="${f(x - 0.7)}" y="${f(y)}" width="1.4" height="2.4" fill="#F4E9D6"/><path d="M${f(x - 2.6)} ${f(y + 0.4)}A2.6 2.6 0 0 1 ${f(x + 2.6)} ${f(y + 0.4)}Z" fill="#E5484D"/><circle cx="${f(x)}" cy="${f(y - 1)}" r=".5" fill="#fff"/>`;
    case 'pixel': return `<rect x="${f(x - 2)}" y="${f(y - 2)}" width="4" height="4" fill="${i % 3 ? '#8BDA5E' : C.s}"/>`;
    case 'gems': return `<path d="M${f(x)} ${f(y - 2.6)}l2 2.6l-2 2.6l-2 -2.6z" fill="${i % 2 ? C.s : '#9EF6FF'}" stroke="#fff" stroke-width=".4"/>`;
    case 'ice': return `<path d="M${f(x)} ${f(y - 2.6)}l1.6 2.6l-1.6 2.6l-1.6 -2.6z" fill="#BFE6FF" stroke="#fff" stroke-width=".4"/>`;
    case 'pumpkin': return `<ellipse cx="${f(x)}" cy="${f(y)}" rx="2.6" ry="2.1" fill="#F78C3B"/><path d="M${f(x)} ${f(y - 2)}v-1.2" stroke="#3B7A2A" stroke-width=".8"/>`;
    case 'ember': return `<circle class="fsk-pulse" style="animation-delay:${(i * 0.13).toFixed(2)}s" cx="${f(x)}" cy="${f(y)}" r="2.2" fill="${C.g}" filter="url(#fsk-glow)"/>`;
    case 'bubble': return `<circle cx="${f(x)}" cy="${f(y)}" r="2.3" fill="${C.l}" fill-opacity=".4" stroke="#fff" stroke-width=".7"/>`;
    case 'star': return STAR(x, y, 2.4, i % 2 ? '#FFD34D' : C.l, i);
    case 'pepperoni': return `<circle cx="${f(x)}" cy="${f(y)}" r="2.6" fill="#C8352B"/>`;
    default: return `<circle cx="${f(x)}" cy="${f(y)}" r="2.9" fill="${JELLY[i % JELLY.length]}"/>`;
  }
}
function fence(kind, C) {
  const R = (stroke, sw, extra) => `<rect x="0" y="0" width="46" height="30" rx="6" fill="none" stroke="${stroke}" stroke-width="${sw}" ${extra || ''}/>`;
  switch (kind) {
    case 'picket': return R('#F4F3EE', 2) + Array.from({ length: 8 }, (_, i) => `<path d="M${3 + i * 5.7} 1v-3l1 -1l1 1v3z" fill="#F4F3EE"/>`).join('');
    case 'stone': return R('#9AA3AD', 3, 'stroke-dasharray="5 2"');
    case 'rope': return R('#B9895A', 1.4, 'stroke-dasharray="2 2"');
    case 'cardboard': return R('#A9824F', 2.6);
    case 'plastic': return R(C.s, 2.6) + R('#fff', 1, 'stroke-dasharray="0 6" stroke-linecap="round" stroke-opacity=".7"');
    case 'candy': return R('#fff', 3) + R('#E5484D', 3, 'stroke-dasharray="3 3"');
    case 'hedge': return R('#4E9A33', 4, 'stroke-linejoin="round"');
    case 'ice': return R('#BFE6FF', 2.6);
    case 'iron': return R('#2E2838', 1.6) + R('#2E2838', 3, 'stroke-dasharray="1 4"');
    case 'inflate': return R(C.s, 4) + R('#fff', 1, 'stroke-opacity=".5"');
    case 'crust': return R('#C98A3A', 3.6);
    case 'pixel': return R('#3B7A2A', 2.2, 'stroke-dasharray="3 1"');
    case 'laser': return R(C.g, 1.4, 'filter="url(#fsk-glow)" class="fsk-pulse"');
    case 'kelp': return R('#2F8F5B', 2, 'stroke-dasharray="4 2"');
    case 'metal': return R('#7F8B98', 2.2);
    case 'cloud': return R('#fff', 5, 'stroke-dasharray="0 6" stroke-linecap="round"');
    case 'lava': return R('#2A2228', 3) + R('#FF7A1A', 1, 'filter="url(#fsk-glow)" class="fsk-pulse"');
    case 'jelly': return R(C.s, 3, 'stroke-opacity=".75"');
    case 'gold': return R('#E3B341', 2.6);
    default: return R('#6B4429', 2);
  }
}
function plot(K, C) {
  let s = `<rect x="0" y="0" width="46" height="30" rx="6" fill="${SOIL[K.crop] || '#8B5E3C'}"/>`;
  for (let r = 0, i = 0; r < 3; r++) for (let c = 0; c < 5; c++, i++) s += crop(K.crop, 6 + c * 8.5, 7 + r * 8, i + r, C);
  return finish(s + fence(K.fence, C), K, C, { x: 0, y: 0, w: 46, h: 30 });
}
function blades(kind, C) {
  const rot = shape => [0, 90, 180, 270].map(a => `<g transform="rotate(${a} 20 16)">${shape}</g>`).join('');
  switch (kind) {
    case 'pizza': return rot(`<path d="M20 16L16 2Q20 0 24 2Z" fill="#F5D27A"/><path d="M16 2Q20 0 24 2" stroke="#C98A3A" stroke-width="1.6" fill="none"/><circle cx="20" cy="7" r="1.3" fill="#C8352B"/>`);
    case 'fan': return rot(`<path d="M20 16Q15 8 19 1Q24 6 20 16Z" fill="#C9D2DC" stroke="#7F8B98" stroke-width=".6"/>`);
    case 'candy': return rot(`<path d="M20 16V3Q20 0 23 1" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M20 16V3Q20 0 23 1" stroke="#E5484D" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-dasharray="2 2"/>`);
    case 'leaf': return rot(`<path d="M20 16Q14 8 20 1Q26 8 20 16Z" fill="#5FAE3E"/><path d="M20 15V3" stroke="#3B7A2A" stroke-width=".6"/>`);
    case 'ice': return rot(`<path d="M20 16L17.5 6L20 1L22.5 6Z" fill="#BFE6FF" stroke="#fff" stroke-width=".6"/>`);
    case 'sail': return rot(`<path d="M20 16V1L25 4Z" fill="#F7F3E8" stroke="#B9A988" stroke-width=".5"/>`);
    case 'paper': return [0, 90, 180, 270].map((a, i) => `<g transform="rotate(${a} 20 16)"><path d="M20 16V2L27 9Z" fill="${['#FF5DA2', '#FFC233', '#3EC1FF', '#5BE38A'][i]}"/></g>`).join('');
    case 'inflate': return rot(`<rect x="17.5" y="1" width="5" height="14" rx="2.5" fill="${C.s}"/><rect x="18.4" y="2.5" width="1.4" height="9" rx=".7" fill="#fff" opacity=".45"/>`);
    case 'prop': return [0, 180].map(a => `<g transform="rotate(${a} 20 16)"><path d="M20 16Q16 9 18 0Q23 1 21.5 16Z" fill="#7F8B98"/></g>`).join('') + [90, 270].map(a => `<g transform="rotate(${a} 20 16)"><path d="M20 16V4" stroke="transparent"/></g>`).join('');
    case 'solar': return rot(`<rect x="16.5" y="1" width="7" height="11" fill="#1F3A7A" stroke="#C9D2DC" stroke-width=".6"/><path d="M20 1V12M16.5 6.5H23.5" stroke="#3EC1FF" stroke-width=".4"/>`);
    case 'obsidian': return rot(`<path d="M20 16L17 5L20 0L23 5Z" fill="#1E181C"/><path d="M20 0L23 5L20 16" stroke="${C.g}" stroke-width=".7" fill="none" filter="url(#fsk-glow)"/>`);
    case 'neon': return rot(`<path d="M20 15V2" stroke="${C.g}" stroke-width="1.6" stroke-linecap="round" filter="url(#fsk-glow)"/>`);
    case 'disco': return rot(`<rect x="18" y="1" width="4" height="13" rx="1" fill="#E6EBF0" stroke="#9AA5B1" stroke-width=".5"/><path d="M18 5h4M18 9h4" stroke="#9AA5B1" stroke-width=".4"/>`);
    case 'pixel': return rot(`<rect x="18" y="2" width="4" height="4" fill="${C.s}"/><rect x="18" y="7" width="4" height="4" fill="${C.l}"/>`);
    case 'jelly': return rot(`<ellipse cx="20" cy="7" rx="3.4" ry="6" fill="${C.s}" fill-opacity=".8"/><ellipse cx="19" cy="5" rx=".9" ry="2" fill="#fff" opacity=".5"/>`);
    case 'gold': return rot(`<path d="M20 16L18 2H22Z" fill="#E3B341" stroke="#A87A14" stroke-width=".5"/>`);
    default: return rot(`<rect x="18" y="1" width="4" height="13" fill="#F4EFE4" stroke="#8B5A2B" stroke-width="1"/><path d="M18 5h4M18 9h4" stroke="#8B5A2B" stroke-width=".6"/>`);
  }
}
function mill(K, C, ctx) {
  let s = body(13, 22, 14, 24, K, C, ctx) + roof(K.roof, 13, 22, 14, K, C, ctx).s + door(K.door, 20, 46, 6, K, C);
  s += `<g class="fsk-spin">${blades(K.blade, C)}</g><circle cx="20" cy="16" r="2.4" fill="#3B2312"/>`;
  return finish(s, K, C, { x: 8, y: 2, w: 24, h: 44 });
}
function barracks(K, C, ctx) {
  let s = body(5, 20, 46, 24, K, C, ctx);
  const r = roof(K.roof, 5, 20, 46, K, C, ctx);
  s += r.s + door(K.door, 28, 44, 11, K, C);
  s += `<path d="M10 25L17 32M17 25L10 32M39 25L46 32M46 25L39 32" stroke="${K.paint === 'glow' ? C.g : '#F2C14E'}" stroke-width="2" stroke-linecap="round"/>`;
  s += topper(K.top === 'none' ? 'flag' : K.top, 28, r.top, K, C, 0.9);
  return finish(s, K, C, { x: 5, y: r.top, w: 46, h: 44 - r.top });
}
function market(K, C, ctx) {
  let s = body(6, 24, 44, 18, K, C, ctx);
  const aw = K.paint === 'glow' ? C.g : C.m;
  s += `<path d="M2 24L8 10H48L54 24Z" fill="${aw}"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${f(10 + i * 7)} 10L${f(7 + i * 7.6)} 24H${f(11 + i * 7.6)}L${f(13 + i * 7)} 10Z" fill="#fff" opacity="${K.paint === 'glow' ? 0.15 : 0.7}"/>`;
  for (let i = 0; i < 8; i++) s += `<circle cx="${f(5.4 + i * 6.5)}" cy="24.5" r="3.3" fill="${aw}"/>`;
  s += `<rect x="12" y="30" width="9" height="7" rx="1.5" fill="#B98BFF"/><rect x="24" y="31" width="9" height="6" rx="1.5" fill="#FFC233"/><rect x="36" y="30" width="8" height="7" rx="1.5" fill="#5BE38A"/>`;
  if (K.deco) s += deco(K.deco, { x: 6, y: 24, w: 44, h: 18 }, K, C);
  return finish(s, K, C, { x: 2, y: 10, w: 52, h: 32 });
}
function tower(K, C, ctx) {
  let s = body(5, 16, 14, 22, K, C, ctx);
  const r = roof(K.roof, 5, 16, 14, K, C, ctx);
  s += r.s + windows(K.win === 'none' ? 'arch' : K.win, 5, 16, 14, 22, 1, K, C);
  return finish(s, K, C, { x: 5, y: r.top, w: 14, h: 38 - r.top });
}
function gate(K, C, ctx) {
  const beam = K.paint === 'roof' ? C.m : K.paint === 'body' ? C.d : (K.rc || '#2E2838');
  let s = body(0, 4, 9, 22, K, C, ctx) + body(31, 4, 9, 22, K, C, ctx);
  s += `<path d="M7 9Q20 -2 33 9V13Q20 4 7 13Z" fill="${beam}"/>` + door(K.door === 'none' ? 'plank' : K.door, 20, 26, 16, K, C);
  return finish(s, K, C, { x: 0, y: 0, w: 40, h: 26 });
}
function wallStroke(style, d, w, K, C) {
  const P = (stroke, sw, extra) => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${f(sw)}" stroke-linejoin="round" ${extra || ''}/>`;
  const accent = P(C.m, Math.max(1.2, w * 0.16), 'stroke-opacity=".85"');
  switch (style) {
    case 'palisade': return P('#8B5A2B', w) + P('#5B3A1C', w * 0.5, 'stroke-dasharray="3 4"') + accent;
    case 'brick': return P('#B5523B', w) + P('#F3D9C8', w * 0.15, 'stroke-dasharray="6 4"') + accent;
    case 'cardboard': return P('#C9A26B', w) + P('#E8D3A6', w * 0.4, 'stroke-dasharray="14 22"') + accent;
    case 'plastic': return P(C.s, w, 'stroke-linecap="round"') + P('#fff', w * 0.3, 'stroke-dasharray="0 9" stroke-linecap="round" stroke-opacity=".6"');
    case 'candy': return P('#fff', w) + P(C.s, w, 'stroke-dasharray="6 6"');
    case 'ginger': return P('#B9733A', w) + P('#fff', w * 0.25, 'stroke-dasharray="4 3"') + accent;
    case 'hedge': return P('#4E9A33', w, 'stroke-linecap="round"') + P('#6CBF47', w * 0.9, 'stroke-dasharray="0 10" stroke-linecap="round"') + accent;
    case 'ice': return P('#BFE6FF', w) + P('#fff', w * 0.3, 'stroke-dasharray="4 10"') + accent;
    case 'iron': return P('#2E2838', w * 0.6) + P('#2E2838', w, 'stroke-dasharray="1.5 6"') + P(C.g, Math.max(1, w * 0.1), 'stroke-opacity=".8"');
    case 'sand': return P('#D9B97A', w) + P('#F0DCB0', w * 0.3, 'stroke-dasharray="12 6"') + accent;
    case 'inflate': return P(C.s, w, 'stroke-linecap="round"') + P('#fff', w * 0.25, 'stroke-opacity=".45"');
    case 'crust': return P('#C98A3A', w) + P('#F2C46B', w * 0.45) + P('#C8352B', w * 0.3, 'stroke-dasharray="0 12" stroke-linecap="round"');
    case 'pixel': return P(C.d, w) + P(C.s, w * 0.5, 'stroke-dasharray="4 4"');
    case 'laser': return P('#2E3440', w * 0.8) + P(C.g, w * 0.3, 'filter="url(#fsk-glow)" class="fsk-pulse"');
    case 'lava': return P('#2A2228', w) + P(C.g, w * 0.25, 'filter="url(#fsk-glow)" class="fsk-pulse"');
    case 'neon': return P('#221E33', w) + P(C.g, w * 0.2, 'filter="url(#fsk-glow)"');
    case 'coral': return P('#FF9E8A', w, 'stroke-linecap="round"') + P('#FFD1C7', w * 0.7, 'stroke-dasharray="0 9" stroke-linecap="round"') + accent;
    case 'metal': return P(C.s, w) + P('#5C6570', w * 0.2, 'stroke-dasharray="0 8" stroke-linecap="round"');
    case 'cloud': return P('#fff', w * 1.1, 'stroke-dasharray="0 8" stroke-linecap="round"') + P('#F2F6FB', w * 0.7) + accent;
    case 'jelly': return P(C.s, w, 'stroke-opacity=".75" stroke-linecap="round"') + P('#fff', w * 0.2, 'stroke-opacity=".5"');
    case 'gold': return P('#E3B341', w) + P('#FFF1A8', w * 0.3, 'stroke-dasharray="10 8"') + accent;
    default: return P('#8E98A3', w) + P('#C4CBD2', w * 0.35, 'stroke-dasharray="10 8"') + accent;
  }
}

/* ---------- public drawing API ---------- */
function skinParts(id) { const it = id ? farmItem(id) : null; return it ? { K: THEMES[it.ti], pal: PALS[it.pi], b: it.b } : null; }
export function building(b, id, ctx, opts) {
  const sp = skinParts(id);
  const K = sp && sp.b === b ? sp.K : THEMES[0], pal = sp && sp.b === b ? sp.pal : DEFAULT_PAL;
  const C = colorsFor(ctx, b, pal, K);
  switch (b) {
    case 'hall': return hall(Math.max(1, Math.min(4, (opts && opts.age) || 1)), K, C, ctx);
    case 'farm': return plot(K, C);
    case 'mill': return mill(K, C, ctx);
    case 'barracks': return barracks(K, C, ctx);
    case 'market': return market(K, C, ctx);
    case 'tower': return tower(K, C, ctx);
    case 'gate': return gate(K, C, ctx);
    default: return '';
  }
}
export function wallRing(id, level, ctx) {
  const sp = skinParts(id);
  const K = sp && sp.b === 'wall' ? sp.K : THEMES[0], pal = sp && sp.b === 'wall' ? sp.pal : DEFAULT_PAL;
  const C = colorsFor(ctx, 'wall', pal, K);
  const w = Math.min(4 + level * 1.4, 18);
  return wallStroke(K.wall, 'M46 12H314Q348 12 348 46V254Q348 288 314 288H46Q12 288 12 254V46Q12 12 46 12Z', w, K, C) + (C.tier >= 4 ? [[30, 30], [330, 40], [40, 270]].map(([x, y], i) => STAR(x, y, 3, '#FFF6C9', i)).join('') : '');
}
export function previewSVG(id, cls) {
  const it = farmItem(id);
  if (!it) return '';
  const ctx = newCtx('pv');
  let inner;
  switch (it.b) {
    case 'hall': inner = `<g transform="translate(23 18) scale(.74)">${building('hall', id, ctx, { age: 3 })}</g>`; break;
    case 'farm': inner = `<g transform="translate(14 22) scale(2)">${building('farm', id, ctx)}</g>`; break;
    case 'mill': inner = `<g transform="translate(26 6) scale(1.75)">${building('mill', id, ctx)}</g>`; break;
    case 'barracks': inner = `<g transform="translate(21 36) scale(1.4)">${building('barracks', id, ctx)}</g>`; break;
    case 'market': inner = `<g transform="translate(12 14) scale(1.72)">${building('market', id, ctx)}</g>`; break;
    case 'tower': inner = `<g transform="translate(34 8) scale(2.2)">${building('tower', id, ctx)}</g>`; break;
    case 'gate': {
      const sp = skinParts(id), C = colorsFor(ctx, 'wall', sp.pal, sp.K);
      inner = wallStroke(sp.K.wall, 'M2 80H36M84 80H118', 9, sp.K, C) + `<g transform="translate(28 40) scale(1.6)">${building('gate', id, ctx)}</g>`;
      break;
    }
    case 'wall': {
      const sp = skinParts(id), C = colorsFor(ctx, 'wall', sp.pal, sp.K);
      inner = wallStroke(sp.K.wall, 'M16 92V44Q16 20 40 20H112', 12, sp.K, C) + wallStroke(sp.K.wall, 'M40 92V64Q40 46 58 46H112', 8, sp.K, C) + (C.tier >= 4 ? STAR(96, 34, 3.4, '#FFF6C9', 0) + STAR(24, 60, 2.8, '#FFF6C9', 1) : '');
      break;
    }
    default: inner = '';
  }
  return `<svg class="fsk ${cls || ''}" viewBox="0 0 120 100" role="img" aria-label="${it.name}" xmlns="http://www.w3.org/2000/svg">${defsOf(ctx)}<rect width="120" height="100" rx="14" fill="#9BD86A"/><rect y="70" width="120" height="30" fill="#86C95A"/>${inner}</svg>`;
}

export const CSS = `
.fsk-spin { transform-box: fill-box; transform-origin: center; animation: fsk-spin 3s linear infinite; }
.fsk-bounce { transform-box: fill-box; transform-origin: 50% 100%; animation: fsk-bounce 1.6s ease-in-out infinite; }
.fsk-float { animation: fsk-float 2.4s ease-in-out infinite; }
.fsk-pulse { animation: fsk-pulse 1.4s ease-in-out infinite; }
.fsk-twinkle { transform-box: fill-box; transform-origin: center; animation: fsk-tw 1.8s ease-in-out infinite; }
.fsk-disco { animation: fsk-disco 1.2s steps(1) infinite; }
@keyframes fsk-spin { to { transform: rotate(360deg); } }
@keyframes fsk-bounce { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.04, .95); } }
@keyframes fsk-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes fsk-pulse { 0%, 100% { opacity: .65; } 50% { opacity: 1; } }
@keyframes fsk-tw { 0%, 100% { opacity: .3; transform: scale(.6); } 50% { opacity: 1; transform: scale(1); } }
@keyframes fsk-disco { 0% { fill: #FF4F8B; } 25% { fill: #FFC233; } 50% { fill: #5BE38A; } 75% { fill: #3EC1FF; } }
@media (prefers-reduced-motion: reduce) { .fsk-spin, .fsk-bounce, .fsk-float, .fsk-pulse, .fsk-twinkle, .fsk-disco { animation: none; } }
`;
