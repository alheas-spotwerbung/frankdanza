/* Shell condivisa dell'area riservata: icone, avatar, header, sessione, modali, toast */
(function () {
  const D = window.FD_DATA;
  const M = window.FD_MEDIA;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Stato persistente (solo comodità del prototipo) ---------- */
  const KEY = 'fd2_state', SKEY = 'fd2_session';
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const state = load(KEY, {});
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* storage non disponibile */ } };
  const setIn = (bucket, id, val) => { state[bucket] = state[bucket] || {}; if (val === undefined) delete state[bucket][id]; else state[bucket][id] = val; save(); };
  const getIn = (bucket, id) => (state[bucket] || {})[id];

  const session = {
    get() { return load(SKEY, null); },
    start(remember) { try { localStorage.setItem(SKEY, JSON.stringify({ id: D.me.id, at: Date.now(), remember })); } catch (e) { /* ok */ } },
    end() { try { localStorage.removeItem(SKEY); } catch (e) { /* ok */ } }
  };

  /* Le pagine dell'app richiedono l'accesso; se lo storage è bloccato si lascia entrare */
  function guard() {
    let ok = true;
    try { ok = !!localStorage.getItem(SKEY); } catch (e) { ok = true; }
    if (!ok) location.replace('index.html?next=' + encodeURIComponent(location.pathname.split('/').pop() + location.search + location.hash));
  }

  /* Le modifiche al profilo fatte nel prototipo sopravvivono al refresh */
  if (state.me) Object.assign(D.me, state.me);

  /* ---------- Icone (24×24, tratto 1.75, stesso disegno del sito pubblico) ---------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    home: '<path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-6h-6v6H5.5A1.5 1.5 0 0 1 4 19Z"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.9.7 3.1 2.4 3.5 5.2"/>',
    userPlus: '<circle cx="10" cy="8.5" r="3.5"/><path d="M3.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M19 8v6M16 11h6"/>',
    userCheck: '<circle cx="10" cy="8.5" r="3.5"/><path d="M3.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="m16 11 2 2 4-4"/>',
    mask: '<path d="M4 5c5 1.6 11 1.6 16 0v6c0 5-3.6 8.5-8 8.5S4 16 4 11Z"/><path d="M8.5 10.5c.8-.6 1.7-.6 2.5 0M13 10.5c.8-.6 1.7-.6 2.5 0M9 14.5c1.8 1.4 4.2 1.4 6 0"/>',
    chat: '<path d="M20.5 12a8 8 0 0 1-11.7 7.1L4 20.5l1.4-4.6A8 8 0 1 1 20.5 12Z"/>',
    bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15Z"/><path d="M10 20.5a2.2 2.2 0 0 0 4 0"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z"/><path d="m13.5 6.5 4 4"/>',
    more: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    back: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    clap: '<path d="M7.5 12.5 5 10a1.5 1.5 0 0 1 2.1-2.1l4.4 4.4M9.4 8.2 7.8 6.6a1.5 1.5 0 0 1 2.1-2.1l5 5M12 6.8l-.4-.4a1.5 1.5 0 0 1 2.1-2.1l4 4c2.8 2.8 2.8 6.3.4 8.6s-5.8 2.4-8.6-.4L5.3 12.3"/><path d="M17.5 3.5 18 2M20 6l1.5-.5M19.5 3.8l1-1"/>',
    comment: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 3.5V17h0A2.5 2.5 0 0 1 4 14.5Z"/>',
    repost: '<path d="M17 3.5 20.5 7 17 10.5"/><path d="M3.5 12V10a3 3 0 0 1 3-3h14M7 20.5 3.5 17 7 13.5"/><path d="M20.5 12v2a3 3 0 0 1-3 3h-14"/>',
    send: '<path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5Z"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="m20.5 16-5-5-9 9"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="m16 10.5 5-3v9l-5-3Z"/>',
    article: '<rect x="4.5" y="3.5" width="15" height="17" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    play: '<path d="M8 5.5v13l10.5-6.5Z"/>',
    bookmark: '<path d="M6.5 4h11v16.5L12 16.5l-5.5 4Z"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    shield: '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.4-1.6 7.1 5-2.6 5 2.6-1.6-7.1"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M9.5 17h5"/>',
    school: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5Z"/><path d="M6.5 11v5c3 2.5 8 2.5 11 0v-5M21.5 9v6"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5Z"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"/>',
    logout: '<path d="M14.5 4H18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3.5M10 16.5 5.5 12 10 7.5M5.5 12H16"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    smile: '<circle cx="12" cy="12" r="8.5"/><path d="M8.5 14c1.8 2 5.2 2 7 0"/><circle cx="9" cy="9.8" r=".9" fill="currentColor"/><circle cx="15" cy="9.8" r=".9" fill="currentColor"/>',
    clip: '<path d="m20 11.5-8.1 8.1a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.5 8.5a1.7 1.7 0 0 1-2.4-2.4L15 7"/>',
    filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    briefcase: '<rect x="3.5" y="7" width="17" height="12.5" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17"/>',
    hash: '<path d="M9.5 4 7.5 20M16.5 4l-2 16M4.5 9h16M3.5 15h16"/>',
    upload: '<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15"/>',
    trash: '<path d="M4.5 7h15M9.5 7V5h5v2M6.5 7l1 13h9l1-13"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
    bolt: '<path d="M13 3 5 13.5h6L10.5 21 19 10.5h-6Z"/>',
    gift: '<rect x="3.5" y="8" width="17" height="5" rx="1.5"/><path d="M5 13v7.5h14V13M12 8v12.5M12 8c-1.5-3.5-5.5-4-5.5-1.5S10 8 12 8ZM12 8c1.5-3.5 5.5-4 5.5-1.5S14 8 12 8Z"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8" fill="currentColor"/>',
    star: '<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z"/>',
    zap: '<path d="M4 14h5l-1 7 8-11h-5l1-7Z"/>'
  };

  function injectSprite() {
    const symbols = Object.entries(ICONS).map(([k, v]) =>
      `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`).join('');
    const holder = document.createElement('div');
    holder.setAttribute('aria-hidden', 'true');
    holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`;
    document.body.prepend(holder);
  }
  const icon = (name, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  /* ---------- Artwork generativo (identico al sito pubblico) ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function smoothPath(pts) {
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  }
  let artCount = 0;
  function art(seed, { w = 400, h = 500, ribbons = 5, animated = false } = {}) {
    const r = rng(seed * 9973);
    const uid = `a${seed}-${artCount++}`;
    const bgA = ['#3346FF', '#121214'][Math.floor(r() * 2)];
    const angle = Math.floor(r() * 360);
    let paths = '';
    for (let k = 0; k < ribbons; k++) {
      const n = 5 + Math.floor(r() * 2);
      const base = [], alt = [];
      const yOff = h * (0.15 + 0.7 * (k / Math.max(1, ribbons - 1)));
      const amp = h * (0.12 + r() * 0.22);
      const phase = r() * Math.PI * 2;
      for (let i = 0; i < n; i++) {
        const x = -40 + (w + 80) * (i / (n - 1));
        const y = yOff + Math.sin(phase + i * 1.3) * amp;
        base.push([x, y]);
        alt.push([x + (r() - 0.5) * 40, y + (r() - 0.5) * amp * 1.4]);
      }
      const d1 = smoothPath(base), d2 = smoothPath(alt);
      const sw = 2 + r() * (k % 2 ? 26 : 8);
      const op = k % 2 ? 0.35 + r() * 0.3 : 0.75 + r() * 0.25;
      const dur = (9 + r() * 7).toFixed(1);
      const anim = animated && !reduceMotion
        ? `<animate attributeName="d" dur="${dur}s" repeatCount="indefinite" values="${d1};${d2};${d1}" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>` : '';
      paths += `<path d="${d1}" fill="none" stroke="url(#${uid}-s${k % 2})" stroke-width="${sw.toFixed(1)}" stroke-linecap="round" opacity="${op.toFixed(2)}">${anim}</path>`;
    }
    const cx = (0.25 + r() * 0.5) * w, cy = (0.2 + r() * 0.4) * h;
    return `<svg class="art" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}-bg" gradientTransform="rotate(${angle} .5 .5)"><stop offset="0" stop-color="${bgA}"/><stop offset="1" stop-color="#121214"/></linearGradient>
        <linearGradient id="${uid}-s0" x1="0" x2="1"><stop offset="0" stop-color="#3346FF"/><stop offset=".5" stop-color="#6A7BFF"/><stop offset="1" stop-color="#B9C1FF"/></linearGradient>
        <linearGradient id="${uid}-s1" x1="0" x2="1"><stop offset="0" stop-color="#B9C1FF"/><stop offset="1" stop-color="#3346FF"/></linearGradient>
        <radialGradient id="${uid}-glow"><stop offset="0" stop-color="#3346FF" stop-opacity=".55"/><stop offset="1" stop-color="#3346FF" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#${uid}-bg)"/>
      <circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(w * 0.45).toFixed(0)}" fill="url(#${uid}-glow)"/>
      ${paths}
    </svg>`;
  }

  /* ---------- Utility ---------- */
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const initials = (name) => name.replace(/[^\p{L} ]/gu, '').split(' ').filter(Boolean).map(p => p[0]).slice(0, 2).join('');
  const fmt = (n) => Number(n).toLocaleString('it-IT');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* "gallery.palco" → voce di FD_MEDIA */
  function media(ref) {
    if (!ref || !M) return null;
    const [group, ...rest] = ref.split('.');
    return (M[group] || {})[rest.join('.')] || null;
  }
  function img(ref, w, h, { alt = '', seed = 1, eager = false, crop } = {}) {
    const m = typeof ref === 'string' ? media(ref) : ref;
    if (!m) return art(seed, { w, h, ribbons: 4 });
    const u = (k) => M.url(m, Math.round(w * k), h ? Math.round(h * k) : 0, { crop });
    return `<img class="photo" src="${u(1)}" srcset="${u(1)} 1x, ${u(2)} 2x" width="${w}" height="${h}" alt="${esc(alt || m.alt || '')}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }

  /* Persona o pagina: "page:xyz" per le pagine, altrimenti id persona */
  function ent(id) {
    if (!id) return null;
    if (id === D.me.id) return { id, ...D.me, isMe: true, kind: 'person', deg: 0 };
    if (id.startsWith('page:')) { const k = id.slice(5); return D.pages[k] && { id: k, ...D.pages[k], kind: 'page' }; }
    if (D.people[id]) return { id, ...D.people[id], kind: 'person' };
    if (D.pages[id]) return { id, ...D.pages[id], kind: 'page' };
    return null;
  }
  const profileUrl = (e) => e.kind === 'page' ? '#' : (e.isMe ? 'profile.html' : `profile.html?id=${encodeURIComponent(e.id)}`);
  const degLabel = (d) => d === 1 ? '1°' : d === 2 ? '2°' : d === 3 ? '3°+' : '';

  function avatar(id, size = 48, { online = false, cls = '' } = {}) {
    const e = typeof id === 'string' ? ent(id) : id;
    if (!e) return '';
    const isPage = e.kind === 'page';
    const p = !isPage && M && M.portrait[e.id];
    const inner = p
      ? img(p, size * 1.5, size * 1.5, { alt: '' , crop: 'faces' })
      : `${art(e.seed || 7, { w: 120, h: 120, ribbons: 3 })}<span class="ava-ini" aria-hidden="true">${esc(initials(e.name))}</span>`;
    const tag = isPage ? 'logo' : 'ava';
    const el = `<span class="${tag} ${cls}" style="--s:${size}px;width:${size}px;height:${size}px" role="img" aria-label="${esc(e.name)}">${inner}</span>`;
    return online && e.online ? `<span class="ava-wrap">${el}<span class="dot" title="Online"></span></span>` : el;
  }
  /* Logo quadrato per organizzazioni senza pagina (esperienze, certificati) */
  function orgLogo(name, seed, size = 48) {
    return `<span class="logo" style="--s:${size}px;width:${size}px;height:${size}px" role="img" aria-label="${esc(name)}">${art(seed, { w: 120, h: 120, ribbons: 3 })}<span class="ava-ini" aria-hidden="true">${esc(initials(name))}</span></span>`;
  }

  function relTime(iso) {
    const d = new Date(iso), now = new Date(D.today + 'T12:00');
    const days = Math.round((new Date(now.toDateString()) - new Date(d.toDateString())) / 864e5);
    if (days <= 0) return d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    if (days === 1) return 'Ieri';
    if (days < 7) return d.toLocaleDateString('it-IT', { weekday: 'short' });
    return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  }

  /* ---------- Toast ---------- */
  function toast(msg, { ico = 'check', action } = {}) {
    let host = $('.toasts');
    if (!host) { host = document.createElement('div'); host.className = 'toasts'; host.setAttribute('role', 'status'); host.setAttribute('aria-live', 'polite'); document.body.append(host); }
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `${icon(ico)}<span>${msg}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
    if (action) t.querySelector('button').addEventListener('click', () => { action.run(); t.remove(); });
    host.append(t);
    setTimeout(() => { t.classList.add('is-out'); setTimeout(() => t.remove(), 300); }, 3600);
  }

  /* ---------- Modale ---------- */
  function modal({ title, body, foot = '', size = '', onOpen }) {
    const last = document.activeElement;
    const m = document.createElement('div');
    m.className = 'modal';
    m.innerHTML = `<div class="modal-scrim" data-close></div>
      <div class="modal-box ${size}" role="dialog" aria-modal="true" aria-labelledby="m-title">
        <div class="modal-head"><h2 id="m-title">${title}</h2><button class="icon-btn" type="button" data-close aria-label="Chiudi">${icon('close')}</button></div>
        <div class="modal-body">${body}</div>
        ${foot ? `<div class="modal-foot">${foot}</div>` : ''}
      </div>`;
    document.body.append(m);
    document.body.classList.add('no-scroll');
    const close = () => {
      m.classList.add('is-closing');
      document.removeEventListener('keydown', onKey);
      setTimeout(() => { m.remove(); if (!$('.modal')) document.body.classList.remove('no-scroll'); last && last.focus && last.focus(); }, 200);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const f = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', m).filter(x => !x.disabled && x.offsetParent !== null);
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    m.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
    const first = m.querySelector('[autofocus]') || m.querySelector('.modal-body input, .modal-body textarea, .modal-body button');
    setTimeout(() => (first || m.querySelector('[data-close]')).focus(), 30);
    onOpen && onOpen(m, close);
    return { el: m, close };
  }

  /* ---------- Menu a tendina ---------- */
  function bindMenu(btn, menu) {
    const set = (open) => { menu.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.addEventListener('click', (e) => { e.stopPropagation(); set(!menu.classList.contains('is-open')); });
    document.addEventListener('click', (e) => { if (!menu.contains(e.target)) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { set(false); btn.focus(); } });
  }

  /* ---------- Header ---------- */
  const NAV = [
    { id: 'feed', href: 'feed.html', label: 'Home', ico: 'home' },
    { id: 'network', href: 'network.html', label: 'Rete', ico: 'users', count: () => D.invitations.filter(i => !getIn('inv', i.who)).length },
    { id: 'jobs', href: 'jobs.html', label: 'Audizioni', ico: 'mask' },
    { id: 'messages', href: 'messages.html', label: 'Messaggi', ico: 'chat', count: () => D.conversations.filter(c => c.unread && !getIn('read', c.id)).length },
    { id: 'notifications', href: 'notifications.html', label: 'Notifiche', ico: 'bell', count: () => D.notifications.filter(n => n.unread && !getIn('nread', n.id) && !state.allRead).length }
  ];

  function brandMark() {
    return `<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M9 33C10 20 14 9 30 7" stroke="#3346FF" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M8 21c6-3 13-3 21 1" stroke="#121214" stroke-width="4.5" stroke-linecap="round"/></svg>`;
  }

  function navItem(n, page) {
    const c = n.count ? n.count() : 0;
    return `<a class="tnav-item" href="${n.href}" ${n.id === page ? 'aria-current="page"' : ''} data-nav="${n.id}">
      <span class="tnav-ico">${icon(n.ico)}${c ? `<span class="count" aria-label="${c} nuovi">${c}</span>` : ''}</span>${n.label}</a>`;
  }

  function renderHeader(page) {
    const h = document.getElementById('app-header');
    if (!h) return;
    const me = D.me;
    h.innerHTML = `<div class="wrap">
      <a class="brand" href="feed.html" aria-label="FrankDanza, home">${brandMark()}</a>
      <div class="top-search" role="search">
        ${icon('search')}
        <label class="sr-only" for="top-q">Cerca persone, scuole, audizioni</label>
        <input id="top-q" type="search" placeholder="Cerca persone, scuole, audizioni" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="search-pop">
        <div class="search-pop" id="search-pop" role="listbox"></div>
      </div>
      <a class="icon-btn m-only" href="messages.html" aria-label="Messaggi">${icon('chat')}</a>
      <nav class="tnav" aria-label="Principale">
        ${NAV.map(n => navItem(n, page)).join('')}
        <div style="position:relative;display:flex">
          <button class="tnav-item tnav-me" type="button" aria-haspopup="menu" aria-expanded="false" id="me-btn">
            ${avatar(me.id, 26)}<span class="lbl">Tu ${icon('down')}</span>
          </button>
          <div class="menu me-menu" id="me-menu" role="menu">
            <div class="menu-head">${avatar(me.id, 56)}<div><b>${esc(me.name)}</b><small>${esc(me.headline)}</small></div></div>
            <a class="btn btn-outline btn-sm btn-block" href="profile.html">Visualizza profilo</a>
            <div class="menu-sep"></div>
            <div class="menu-label">Account</div>
            <button class="menu-item" type="button" data-soon>${icon('settings')} Impostazioni e privacy</button>
            <button class="menu-item" type="button" data-soon>${icon('globe')} Lingua</button>
            <button class="menu-item" type="button" data-soon>${icon('zap')} Prova FrankDanza Pro</button>
            <div class="menu-sep"></div>
            <div class="menu-label">Gestisci</div>
            <a class="menu-item" href="profile.html#attivita">${icon('article')} Post e attività</a>
            <a class="menu-item" href="jobs.html?tab=saved">${icon('bookmark')} Audizioni salvate</a>
            <a class="menu-item" href="events.html">${icon('calendar')} I tuoi eventi</a>
            <div class="menu-sep"></div>
            <button class="menu-item" type="button" data-logout>${icon('logout')} Esci</button>
          </div>
        </div>
        <span class="tnav-sep" aria-hidden="true"></span>
        <a class="tnav-item" href="events.html" ${page === 'events' ? 'aria-current="page"' : ''}>${icon('calendar')}Eventi</a>
      </nav>
    </div>`;
    bindMenu($('#me-btn'), $('#me-menu'));
    initSearch();

    const tb = document.getElementById('tabbar');
    if (tb) {
      tb.setAttribute('aria-label', 'Navigazione');
      tb.innerHTML = [NAV[0], NAV[1], { id: 'post', href: 'feed.html#pubblica', label: 'Pubblica', ico: 'plus' }, NAV[4], NAV[2]].map(n => navItem(n, page)).join('');
    }
  }

  function updateCounts() {
    NAV.forEach(n => {
      if (!n.count) return;
      const c = n.count();
      $$(`[data-nav="${n.id}"] .tnav-ico`).forEach(el => {
        const old = el.querySelector('.count');
        if (old) old.remove();
        if (c) el.insertAdjacentHTML('beforeend', `<span class="count" aria-label="${c} nuovi">${c}</span>`);
      });
    });
  }

  /* Ricerca rapida su persone, pagine e audizioni */
  function initSearch() {
    const input = $('#top-q'), pop = $('#search-pop');
    if (!input) return;
    let focus = -1;
    const all = () => [
      ...Object.keys(D.people).map(id => ({ e: ent(id), href: `profile.html?id=${id}`, sub: D.people[id].headline })),
      ...Object.keys(D.pages).map(id => ({ e: ent('page:' + id), href: '#', sub: D.pages[id].headline })),
      ...D.jobs.map(j => ({ job: j, href: `jobs.html?id=${j.id}`, sub: `${D.pages[j.org].name} · ${j.city}` }))
    ];
    const render = () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        pop.innerHTML = `<h4>Ricerche recenti</h4>
          ${['floor work Milano', 'audizioni contemporaneo', 'Carlos Rivera'].map(s => `<a class="search-item" href="#" data-q="${esc(s)}">${icon('clock')}<b>${esc(s)}</b></a>`).join('')}`;
      } else {
        const res = all().filter(r => ((r.e ? r.e.name : r.job.title) + ' ' + r.sub).toLowerCase().includes(q)).slice(0, 7);
        pop.innerHTML = res.length ? res.map(r => `<a class="search-item" role="option" href="${r.href}">
            ${r.e ? avatar(r.e, 36) : orgLogo(D.pages[r.job.org].name, D.pages[r.job.org].seed, 36)}
            <span><b>${esc(r.e ? r.e.name : r.job.title)}</b><small>${esc(r.job ? 'Audizione · ' + r.sub : r.sub)}</small></span></a>`).join('')
          : `<p class="search-empty">Nessun risultato per “${esc(input.value)}”. Prova con uno stile o una città.</p>`;
      }
      focus = -1;
    };
    const open = (v) => { pop.classList.toggle('is-open', v); input.setAttribute('aria-expanded', String(v)); };
    input.addEventListener('focus', () => { render(); open(true); });
    input.addEventListener('input', () => { render(); open(true); });
    input.addEventListener('keydown', (e) => {
      const items = $$('.search-item', pop);
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        focus = (focus + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach((it, i) => it.classList.toggle('is-focus', i === focus));
      } else if (e.key === 'Enter' && items[focus]) { e.preventDefault(); items[focus].click(); }
      else if (e.key === 'Escape') { open(false); input.blur(); }
    });
    pop.addEventListener('click', (e) => {
      const q = e.target.closest('[data-q]');
      if (q) { e.preventDefault(); input.value = q.dataset.q; render(); input.focus(); }
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.top-search')) open(false); });
  }

  /* Rivelazioni allo scroll */
  let io;
  function observe(root = document) {
    const els = root.querySelectorAll('[data-reveal]:not(.is-in)');
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.02 });
    els.forEach(el => io.observe(el));
  }

  function footer() {
    return `<footer class="app-foot">
      <a href="#">Informazioni</a><a href="#">Accessibilità</a><a href="#">Centro assistenza</a><a href="#">Privacy e condizioni</a><a href="#">Per le scuole</a><a href="#">Verifica certificati</a>
      <div><span class="brand">${brandMark()} FrankDanza</span> © ${new Date(D.today).getFullYear()}</div></footer>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectSprite();
    const page = document.body.dataset.page;
    if (page && page !== 'login') { renderHeader(page); }
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-logout]')) { session.end(); location.href = 'index.html?out=1'; }
      if (e.target.closest('[data-soon]')) toast('Disponibile nella versione completa', { ico: 'spark' });
    });
  });

  window.FD = { renderHeader, D, M, state, save, setIn, getIn, session, guard, icon, art, img, media, ent, avatar, orgLogo, profileUrl, degLabel, esc, initials, fmt, relTime, toast, modal, bindMenu, observe, updateCounts, footer, brandMark, $, $$, reduceMotion };
})();
