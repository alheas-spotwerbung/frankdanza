/* Notifiche: filtri, letto/non letto, azioni rapide, rimozione con annulla */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, avatar, ent, toast, setIn, getIn, state, save } = F;
  F.guard();

  const KIND = { view: 'eye', react: 'clap', job: 'mask', endorse: 'check', mention: 'chat', birthday: 'gift', comment: 'comment', search: 'search', event: 'calendar', work: 'trophy', repost: 'repost' };
  const FILTERS = [['all', 'Tutte'], ['jobs', 'Audizioni'], ['posts', 'I miei post'], ['mentions', 'Menzioni'], ['events', 'Eventi']];
  let filter = 'all';

  const unread = (n) => n.unread && !getIn('nread', n.id) && !state.allRead;

  function item(n) {
    const who = n.who ? ent(n.who) : n.page ? ent('page:' + n.page) : null;
    const pic = who ? avatar(who, 52) : `<span class="logo" style="--s:52px;width:52px;height:52px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent)">${icon(KIND[n.kind])}</span>`;
    return `<article class="notif ${unread(n) ? 'is-unread' : ''}" data-n="${n.id}">
      <div class="n-ico">${pic}${who ? `<span class="kind" aria-hidden="true">${icon(KIND[n.kind])}</span>` : ''}</div>
      <div>
        <p>${n.text}</p>
        ${n.quote ? `<p class="quote">${esc(n.quote)}</p>` : ''}
        ${n.cta ? `<div class="n-actions"><a class="btn btn-outline btn-sm" href="${n.cta[1]}" data-go>${esc(n.cta[0])}</a></div>` : ''}
      </div>
      <div class="notif-side"><time>${esc(n.when)}</time>
        <div style="position:relative"><button class="icon-btn" type="button" data-nmenu aria-label="Opzioni notifica" aria-haspopup="menu">${icon('more')}</button></div></div>
    </article>`;
  }

  function render() {
    const removed = state.nremoved || {};
    const list = D.notifications.filter(n => !removed[n.id] && (filter === 'all' || n.group === filter));
    const n = D.notifications.filter(unread).length;
    $('#main').innerHTML = `<div class="wrap page"><div class="layout layout-feed">
      <aside class="col sticky" aria-label="Impostazioni notifiche">
        <section class="card card-pad"><p class="eyebrow">Gestisci</p><p style="margin-top:8px;font-size:.925rem;color:var(--ink-2)">Scegli quali notifiche ricevere per audizioni, post e messaggi.</p><button class="link-arrow" style="border:0;background:none;padding:0;margin-top:10px" type="button" data-soon>Impostazioni ${icon('arrow')}</button></section>
      </aside>
      <div class="col">
        <section class="card">
          <div class="card-head" style="padding-bottom:12px"><div><h1 class="card-title">Notifiche</h1><p class="sub">${n ? `${n} da leggere` : 'Sei in pari'}</p></div>${n ? `<button class="btn btn-ghost btn-sm" type="button" data-allread>${icon('check')} Segna tutte come lette</button>` : ''}</div>
          <div class="tabs" style="padding:0 22px 14px">${FILTERS.map(([k, l]) => `<button class="chip ${filter === k ? 'is-active' : ''}" type="button" data-f="${k}" aria-pressed="${filter === k}">${l}</button>`).join('')}</div>
          <div id="nlist">${list.map(item).join('') || '<p class="notif muted">Nessuna notifica in questa categoria.</p>'}</div>
        </section>
      </div>
      <aside class="col col-right sticky hide-m" aria-label="Suggerimenti">
        <section class="card promo"><div class="promo-art">${F.art(91, { w: 400, h: 320, ribbons: 5, animated: true })}</div>
          <div class="promo-body"><span class="eyebrow" style="color:#B9C1FF">Chi ti cerca</span><h3>Davide Serra ha visto il tuo profilo</h3><p>Direttore del casting di Compagnia Linea d'Ombra. Hanno un'audizione aperta.</p><a class="btn btn-sm" style="background:#fff;color:var(--ink)" href="jobs.html?id=j1">Vedi l'audizione</a></div></section>
        ${F.footer()}
      </aside>
    </div></div>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    const main = $('#main');
    main.addEventListener('click', (e) => {
      const t = e.target;
      const f = t.closest('[data-f]'); if (f) { filter = f.dataset.f; render(); return; }
      if (t.closest('[data-allread]')) { state.allRead = true; save(); render(); F.updateCounts(); toast('Tutte le notifiche sono segnate come lette'); return; }
      const nm = t.closest('[data-nmenu]');
      const el = t.closest('[data-n]');
      if (nm) {
        $$('.menu.n-menu').forEach(x => x.remove());
        const read = !unread(D.notifications.find(n => n.id === el.dataset.n));
        const box = document.createElement('div');
        box.className = 'menu n-menu is-open'; box.style.cssText = 'right:0;top:100%';
        box.innerHTML = `<button class="menu-item" type="button" data-remove>${icon('trash')} Elimina notifica</button>
          <button class="menu-item" type="button" data-toggle-read>${icon('eye')} ${read ? 'Segna come da leggere' : 'Segna come letta'}</button>
          <button class="menu-item" type="button" data-soon>${icon('bell')} Disattiva notifiche simili</button>`;
        nm.parentElement.append(box);
        setTimeout(() => document.addEventListener('click', function off(ev) { if (!box.contains(ev.target)) { box.remove(); document.removeEventListener('click', off); } }), 0);
        box.addEventListener('click', (ev) => {
          const id = el.dataset.n;
          if (ev.target.closest('[data-remove]')) {
            el.classList.add('is-leaving');
            setTimeout(() => { state.nremoved = Object.assign(state.nremoved || {}, { [id]: 1 }); save(); render(); F.updateCounts(); }, 340);
            toast('Notifica eliminata', { ico: 'trash', action: { label: 'Annulla', run: () => { delete state.nremoved[id]; save(); render(); } } });
          }
          if (ev.target.closest('[data-toggle-read]')) { setIn('nread', id, read ? undefined : 1); if (read) state.allRead = false; save(); render(); F.updateCounts(); }
          box.remove();
        });
        return;
      }
      if (el && !t.closest('a')) { setIn('nread', el.dataset.n, 1); el.classList.remove('is-unread'); F.updateCounts(); }
      if (t.closest('[data-go]') && el) setIn('nread', el.dataset.n, 1);
    });
  });
})();
