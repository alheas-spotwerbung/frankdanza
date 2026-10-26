document.addEventListener('DOMContentLoaded', () => {
  const { dancers, events } = window.FD_DATA;
  const { photo, icon, esc, dancerCard, observe, reduceMotion } = window.FD;
  const M = window.FD_MEDIA;
  const $ = (s) => document.querySelector(s);

  /* ---------- Apertura: foto subito, video se presente ---------- */
  const poster = $('#hero-poster');
  poster.srcset = `${M.url(M.style.Jazz, 900, 1035, { crop: 'entropy' })} 1x, ${M.url(M.style.Jazz, 1350, 1552, { crop: 'entropy' })} 1.5x`;

  const video = $('#hero-video');
  const toggle = $('#media-toggle');
  if (!reduceMotion && video.dataset.src) {
    video.addEventListener('canplay', () => {
      video.classList.add('is-ready');
      toggle.hidden = false;
      video.play().catch(() => { toggle.hidden = true; });
    }, { once: true });
    // Se il file non c'è, resta la foto
    video.addEventListener('error', () => video.remove(), { once: true });
    video.src = video.dataset.src;
    video.load();
  } else {
    video.remove();
  }
  toggle.addEventListener('click', () => {
    const paused = video.paused;
    paused ? video.play() : video.pause();
    toggle.setAttribute('aria-label', paused ? 'Metti in pausa il video' : 'Riproduci il video');
  });

  $('#ava-1').innerHTML = photo(M.portrait['carlos-rivera'], 88, 88);

  /* ---------- Stili ---------- */
  const byStyle = {};
  dancers.forEach(d => d.styles.forEach(s => { (byStyle[s] = byStyle[s] || []).push(d); }));
  const row = $('#styles-row');
  row.innerHTML = Object.keys(M.style).map((s, i) => {
    const n = (byStyle[s] || []).length;
    return `<a class="style-tile" href="dancers.html?style=${encodeURIComponent(s)}" data-reveal="up" style="--i:${i}">
      ${photo(M.style[s], 260, 347, { crop: 'entropy' })}
      <span class="style-tile-text"><span><h3>${esc(s)}</h3><small>${n} ${n === 1 ? 'profilo' : 'profili'}</small></span><span class="go">${icon('arrow')}</span></span>
    </a>`;
  }).join('');

  const prev = document.querySelector('[data-row="prev"]');
  const next = document.querySelector('[data-row="next"]');
  const step = () => (row.firstElementChild?.offsetWidth || 260) + 16;
  const sync = () => {
    prev.disabled = row.scrollLeft < 8;
    next.disabled = row.scrollLeft + row.clientWidth > row.scrollWidth - 8;
  };
  prev.addEventListener('click', () => row.scrollBy({ left: -step() * 2, behavior: 'smooth' }));
  next.addEventListener('click', () => row.scrollBy({ left: step() * 2, behavior: 'smooth' }));
  row.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
  sync();

  /* ---------- Talenti in evidenza ---------- */
  const top = [...dancers].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 4);
  const featured = $('#featured');
  featured.innerHTML = top.map((d, i) => dancerCard(d, i)).join('');
  featured.querySelectorAll('.dcard').forEach(c => { c.dataset.reveal = 'up'; });

  /* ---------- Eventi ---------- */
  const fmtMonth = new Intl.DateTimeFormat('it-IT', { month: 'short' });
  $('#events').innerHTML = events.map((e, i) => {
    const d = new Date(e.date + 'T12:00:00');
    return `<a class="event" href="dancers.html?style=${encodeURIComponent(e.style)}&city=${encodeURIComponent(e.city)}" data-reveal="side" style="--i:${i}">
      <div class="event-date"><b>${String(d.getDate()).padStart(2, '0')}</b><span>${fmtMonth.format(d).replace('.', '')}</span></div>
      <div><h3>${esc(e.title)}</h3><p class="event-place">${icon('pin')} ${esc(e.place)}, ${esc(e.city)}</p></div>
      <span class="chip">${esc(e.style)}</span>
      <span class="event-arrow">${icon('arrowUpRight')}</span>
    </a>`;
  }).join('');

  /* ---------- Parallasse leggera sulla foto d'apertura ---------- */
  const media = $('#hero-media');
  if (!reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        media.style.translate = `0 ${(Math.min(window.scrollY, 800) * 0.06).toFixed(1)}px`;
        ticking = false;
      });
    }, { passive: true });
  }

  observe();
});
