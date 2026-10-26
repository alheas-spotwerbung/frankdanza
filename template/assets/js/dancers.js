document.addEventListener('DOMContentLoaded', () => {
  const { dancers, styles, cities } = window.FD_DATA;
  const { dancerCard, esc, observe } = window.FD;

  const $ = (s) => document.querySelector(s);
  const grid = $('#grid'), empty = $('#empty'), count = $('#count');
  const q = $('#q'), city = $('#city'), level = $('#level'), sort = $('#sort');
  const segBtns = [...document.querySelectorAll('.seg button')];
  const pill = $('.seg-pill');
  const chipsWrap = $('#style-chips');

  const params = new URLSearchParams(location.search);
  const state = {
    role: params.get('role') || '',
    styles: new Set((params.get('style') || '').split(',').filter(Boolean)),
    city: params.get('city') || '',
    level: params.get('level') || '',
    q: params.get('q') || '',
    sort: params.get('sort') || 'rating',
    view: (() => { try { return localStorage.getItem('fd-view') || 'grid'; } catch { return 'grid'; } })()
  };

  city.insertAdjacentHTML('beforeend', cities.map(c => `<option>${esc(c)}</option>`).join(''));
  chipsWrap.innerHTML = styles.map(s => `<button type="button" class="chip" data-style="${esc(s)}" aria-pressed="false">${esc(s)}</button>`).join('');
  const chips = [...chipsWrap.querySelectorAll('.chip')];

  const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  function movePill() {
    const active = segBtns.find(b => b.getAttribute('aria-pressed') === 'true');
    if (!active) return;
    pill.style.width = `${active.offsetWidth}px`;
    pill.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function syncControls() {
    segBtns.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.role === state.role)));
    chips.forEach(c => c.setAttribute('aria-pressed', String(state.styles.has(c.dataset.style))));
    q.value = state.q; city.value = state.city; level.value = state.level; sort.value = state.sort;
    document.querySelectorAll('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));
    grid.classList.toggle('is-list', state.view === 'list');
    movePill();
  }

  function writeUrl() {
    const p = new URLSearchParams();
    if (state.role) p.set('role', state.role);
    if (state.styles.size) p.set('style', [...state.styles].join(','));
    if (state.city) p.set('city', state.city);
    if (state.level) p.set('level', state.level);
    if (state.q) p.set('q', state.q);
    if (state.sort !== 'rating') p.set('sort', state.sort);
    history.replaceState(null, '', p.toString() ? `?${p}` : location.pathname);
  }

  function render() {
    const needle = norm(state.q.trim());
    let list = dancers.filter(d =>
      (!state.role || d.role === state.role) &&
      (!state.city || d.city === state.city) &&
      (!state.level || d.level === state.level) &&
      (!state.styles.size || d.styles.some(s => state.styles.has(s))) &&
      (!needle || needle.split(/\s+/).filter(w => w.length > 1 || needle.length === 1)
        .every(w => norm([d.name, d.city, ...d.styles].join(' ')).includes(w)))
    );
    const sorters = {
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      years: (a, b) => b.years - a.years,
      name: (a, b) => a.name.localeCompare(b.name, 'it')
    };
    list.sort(sorters[state.sort] || sorters.rating);

    grid.innerHTML = list.map((d, i) => dancerCard(d, i)).join('');
    empty.hidden = list.length > 0;
    const label = state.role === 'istruttore' ? (list.length === 1 ? 'istruttore' : 'istruttori')
      : state.role === 'ballerino' ? (list.length === 1 ? 'ballerino' : 'ballerini')
      : (list.length === 1 ? 'profilo' : 'profili');
    count.innerHTML = `<b>${list.length}</b> ${label}`;
    writeUrl();
  }

  segBtns.forEach(b => b.addEventListener('click', () => { state.role = b.dataset.role; syncControls(); render(); }));
  chips.forEach(c => c.addEventListener('click', () => {
    const s = c.dataset.style;
    state.styles.has(s) ? state.styles.delete(s) : state.styles.add(s);
    syncControls(); render();
  }));
  let t;
  q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { state.q = q.value; render(); }, 180); });
  city.addEventListener('change', () => { state.city = city.value; render(); });
  level.addEventListener('change', () => { state.level = level.value; render(); });
  sort.addEventListener('change', () => { state.sort = sort.value; render(); });
  document.querySelectorAll('[data-view]').forEach(b => b.addEventListener('click', () => {
    state.view = b.dataset.view;
    try { localStorage.setItem('fd-view', state.view); } catch { /* storage non disponibile */ }
    syncControls(); render();
  }));
  $('#reset').addEventListener('click', () => {
    Object.assign(state, { role: '', city: '', level: '', q: '', sort: 'rating' });
    state.styles.clear();
    syncControls(); render();
  });

  const toggle = $('.filters-toggle');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    $('#filters').classList.toggle('is-expanded', open);
  });

  window.addEventListener('resize', movePill);
  document.fonts?.ready.then(movePill);

  syncControls();
  render();
  observe();
});
