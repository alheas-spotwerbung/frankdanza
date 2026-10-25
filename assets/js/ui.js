/* Componenti condivisi: icone, artwork generativi, navigazione, animazioni */
(function () {
  const PALETTE = ['#3346FF', '#121214', '#6A6A73', '#E4E7FF'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sprite icone (24×24, tratto 1.75) ---------- */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    back: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    star: '<path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z"/>',
    award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.4-1.6 7.1 5-2.6 5 2.6-1.6-7.1"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.9.7 3.1 2.4 3.5 5.2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".9"/><circle cx="4.5" cy="12" r=".9"/><circle cx="4.5" cy="18" r=".9"/>',
    shield: '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5Z"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
    play: '<path d="M8 5.5v13l10.5-6.5Z"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    sliders: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>'
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

  /* ---------- PRNG deterministico ---------- */
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* Catmull-Rom → Bézier: stessi comandi per ogni variante, così SMIL può interpolare */
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
  /* Artwork generativo: nastri di movimento che "respirano" */
  function art(seed, { w = 400, h = 500, ribbons = 5, animated = true } = {}) {
    const r = rng(seed * 9973);
    const uid = `a${seed}-${artCount++}`;
    const bgA = PALETTE[Math.floor(r() * 2)];
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
        ? `<animate attributeName="d" dur="${dur}s" repeatCount="indefinite" values="${d1};${d2};${d1}" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"/>`
        : '';
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
      <circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="${(w * 0.45).toFixed(0)}" fill="url(#${uid}-glow)">${animated && !reduceMotion ? `<animate attributeName="r" dur="7s" repeatCount="indefinite" values="${(w * .4).toFixed(0)};${(w * .55).toFixed(0)};${(w * .4).toFixed(0)}"/>` : ''}</circle>
      ${paths}
    </svg>`;
  }

  /* ---------- Utility ---------- */
  const initials = (name) => name.split(' ').map(p => p[0]).slice(0, 2).join('');
  const roleLabel = (role) => role === 'istruttore' ? 'Istruttore' : 'Ballerino';
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Foto responsive dal CDN; se manca, ripiega sull'artwork generativo */
  function photo(m, w, h, { alt = '', cls = '', crop, eager = false, seed = 1 } = {}) {
    const M = window.FD_MEDIA;
    if (!m || !M) return art(seed, { w, h, ribbons: 4 });
    const u = (k) => M.url(m, Math.round(w * k), h ? Math.round(h * k) : 0, { crop });
    return `<img class="photo ${cls}" src="${u(1)}" srcset="${u(1)} 1x, ${u(2)} 2x" width="${w}" height="${h || Math.round(w * .75)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  }

  function dancerCard(d, i = 0) {
    const m = window.FD_MEDIA && window.FD_MEDIA.portrait[d.id];
    return `<article class="dcard" style="--i:${i}">
      <a class="dcard-link" href="dancer.html?id=${encodeURIComponent(d.id)}" aria-label="Profilo di ${esc(d.name)}">
        <div class="dcard-art">${photo(m, 320, 300, { seed: d.seed })}
          ${m ? '' : `<span class="dcard-initials" aria-hidden="true">${initials(d.name)}</span>`}
          <span class="role-tag role-${d.role}">${roleLabel(d.role)}</span>
          ${d.available ? '<span class="avail" title="Disponibile per ingaggi"><span class="avail-dot"></span>Disponibile</span>' : ''}
        </div>
        <div class="dcard-body">
          <h3 class="dcard-name">${esc(d.name)}</h3>
          <p class="dcard-meta">${icon('pin')} ${esc(d.city)} <span class="sep" aria-hidden="true"></span> ${d.years} anni di esperienza</p>
          <ul class="dcard-styles">${d.styles.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
          <div class="dcard-foot">
            <span class="rating">${icon('star', 'icon-fill')} <b>${d.rating.toFixed(1)}</b> <span>(${d.reviews})</span></span>
            <span class="dcard-cta">Vedi profilo ${icon('arrow')}</span>
          </div>
        </div>
      </a>
    </article>`;
  }

  /* ---------- Navigazione ---------- */
  function initNav() {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const drawer = document.getElementById('mobile-nav');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    if (toggle && drawer) {
      const setOpen = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
        drawer.classList.toggle('is-open', open);
        document.body.classList.toggle('no-scroll', open);
      };
      toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
      drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
      window.matchMedia('(min-width: 900px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
    }
  }

  /* ---------- Rivelazioni allo scroll ---------- */
  let io;
  function observe(root = document) {
    const els = root.querySelectorAll('[data-reveal]:not(.is-in)');
    if (reduceMotion || !('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('is-in')); return; }
    io = io || new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    els.forEach(el => io.observe(el));
  }

  /* Contatori numerici */
  function counters(root = document) {
    root.querySelectorAll('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split('.')[1] || '').length;
      const fmt = (v) => v.toLocaleString('it-IT', { minimumFractionDigits: dec, maximumFractionDigits: dec });
      if (reduceMotion) { el.textContent = fmt(target); return; }
      const run = () => {
        const t0 = performance.now(), dur = 1400;
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          el.textContent = fmt(target * (1 - Math.pow(2, -10 * p)));
          if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
        };
        requestAnimationFrame(step);
      };
      const o = new IntersectionObserver((en) => { if (en[0].isIntersecting) { run(); o.disconnect(); } }, { threshold: .5 });
      o.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    injectSprite();
    initNav();
    // Il riempimento dei bottoni parte dal punto in cui entra il cursore
    document.addEventListener('pointerover', (e) => {
      const b = e.target.closest?.('.btn');
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  });

  window.FD = { art, photo, icon, initials, roleLabel, esc, dancerCard, observe, counters, reduceMotion, PALETTE };
})();
