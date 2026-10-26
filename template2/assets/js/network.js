/* Rete: inviti, suggerimenti di collegamento, collegamenti, pagine seguite */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, fmt, avatar, art, ent, toast, setIn, getIn, state, save } = F;
  F.guard();

  const params = new URLSearchParams(location.search);
  let tab = params.get('tab') || 'grow';
  let q = '', sort = 'recent';

  const connectedIds = () => Object.keys(D.people).filter(id => D.people[id].deg === 1 || getIn('inv', id) === 'ok');

  function sideNav() {
    const items = [
      ['grow', 'users', 'Crescita', ''],
      ['conn', 'userCheck', 'Collegamenti', fmt(D.me.connections + Object.values(state.inv || {}).filter(v => v === 'ok').length)],
      ['follow', 'eye', 'Persone e pagine seguite', fmt(36 + Object.keys(state.follow || {}).length)],
      ['groups', 'mask', 'Gruppi e crew', '6'],
      ['events', 'calendar', 'Eventi', '3'],
      ['tags', 'hash', 'Hashtag', '5']
    ];
    return `<section class="card"><div class="card-head" style="padding-bottom:6px"><h2 style="font-size:1.1rem">Gestisci la tua rete</h2></div>
      <nav class="side-nav" aria-label="Rete">${items.map(([k, ic, l, n]) => `<button type="button" data-tab="${k}" ${k === tab ? 'aria-current="true"' : ''}>${icon(ic)} ${l}<span class="n">${n}</span></button>`).join('')}</nav></section>
      <section class="card promo hide-m"><div class="promo-art">${art(131, { w: 300, h: 300, ribbons: 5, animated: true })}</div>
        <div class="promo-body"><h3>Porta la tua crew</h3><p>Invita allievi e colleghi: più la rete cresce, più audizioni giuste ti arrivano.</p><button class="btn btn-sm" style="background:#fff;color:var(--ink)" type="button" data-invite>Invita via link</button></div></section>
      ${F.footer()}`;
  }

  function invitations() {
    const list = D.invitations.filter(i => getIn('inv', i.who) !== 'no');
    const pending = list.filter(i => !getIn('inv', i.who));
    return `<section class="card" aria-labelledby="inv-t">
      <div class="card-head" style="padding-bottom:14px"><h2 id="inv-t">Inviti <span class="muted num" style="font-weight:500">(${pending.length})</span></h2><button class="link" style="border:0;background:none" type="button" data-soon>Gestisci</button></div>
      ${list.length ? list.map(i => { const e = ent(i.who), st = getIn('inv', i.who);
        return `<div class="inv ${st === 'ok' ? 'is-done' : ''}" data-inv="${i.who}">
          <a href="${F.profileUrl(e)}" tabindex="-1">${avatar(i.who, 64)}</a>
          <div>${st === 'ok' ? `<p><b>${esc(e.name)}</b> ora fa parte dei tuoi collegamenti.</p><small><a class="link" href="messages.html?to=${i.who}">Scrivi un messaggio</a></small>`
            : `<a href="${F.profileUrl(e)}" style="text-decoration:none"><b>${esc(e.name)}</b></a><small>${esc(e.headline)}</small><small>${icon('users', 'icon')} ${e.mutual} collegamenti in comune · ${esc(i.when)}</small>${i.note ? `<p class="note">${esc(i.note)}</p>` : ''}`}</div>
          ${st === 'ok' ? '' : `<div class="inv-actions"><button class="btn btn-ghost btn-sm" type="button" data-ignore>Ignora</button><button class="btn btn-outline btn-sm" type="button" data-accept>Accetta</button></div>`}
        </div>`; }).join('') : `<p class="inv muted">Nessun invito in sospeso.</p>`}
    </section>`;
  }

  function pcard(id, i) {
    const e = ent(id), st = getIn('conn', id), page = e.kind === 'page';
    const on = page ? getIn('follow', e.id) : st;
    return `<article class="pcard" data-card="${id}" data-reveal style="--i:${i % 6}">
      <button class="icon-btn dismiss" type="button" data-dismiss aria-label="Non mostrare più ${esc(e.name)}">${icon('close')}</button>
      <div class="pcard-cover">${art(e.seed + 3, { w: 300, h: 100, ribbons: 4 })}</div>
      ${avatar(e, 92)}
      <div class="pcard-body">
        <a href="${F.profileUrl(e)}"><b>${esc(e.name)}</b></a>
        <small>${esc(e.headline)}</small>
        <span class="pcard-mutual">${page ? `${fmt(e.followers)} follower` : `${avatar('marco-deluca', 20)} ${e.mutual} in comune`}</span>
        ${page ? `<button class="btn btn-sm ${on ? 'is-done' : 'btn-outline'}" type="button" data-follow="${e.id}">${on ? `${icon('check')} Segui già` : `${icon('plus')} Segui`}</button>`
        : `<button class="btn btn-sm ${on ? 'is-done' : 'btn-outline'}" type="button" data-connect="${id}">${on ? `${icon('clock')} In attesa` : `${icon('userPlus')} Collegati`}</button>`}
      </div>
    </article>`;
  }

  function grow() {
    const hidden = state.dismissed || {};
    const scene = Object.keys(D.people).filter(id => D.people[id].deg > 1 && !hidden[id] && !getIn('inv', id) && !D.invitations.some(i => i.who === id));
    const pages = Object.keys(D.pages).filter(id => id !== 'studio-corpo-libero' && !hidden['page:' + id]).map(id => 'page:' + id);
    return `${invitations()}
      <section class="card"><div class="card-head"><div><h2>Persone della tua scena</h2><p class="sub">In base a stili, città e scuole in comune</p></div></div>
        <div class="pgrid">${scene.map(pcard).join('') || '<p class="muted">Hai visto tutti i suggerimenti per oggi.</p>'}</div></section>
      <section class="card"><div class="card-head"><div><h2>Scuole, compagnie e festival da seguire</h2><p class="sub">Per ricevere audizioni e programmi nel feed</p></div></div>
        <div class="pgrid">${pages.map(pcard).join('')}</div></section>`;
  }

  function connections() {
    let ids = connectedIds().filter(id => (D.people[id].name + D.people[id].headline).toLowerCase().includes(q));
    if (sort === 'name') ids = ids.sort((a, b) => D.people[a].name.split(' ').pop().localeCompare(D.people[b].name.split(' ').pop()));
    return `<section class="card conn-list">
      <div class="card-head"><h2>${fmt(D.me.connections + Object.values(state.inv || {}).filter(v => v === 'ok').length)} collegamenti</h2></div>
      <div class="list-tools">
        <label class="field" style="display:flex;align-items:center;gap:8px"><span class="muted" style="font-weight:500">Ordina per</span>
          <select class="select" data-sort style="min-height:40px;padding-block:6px;width:auto"><option value="recent" ${sort === 'recent' ? 'selected' : ''}>Aggiunti di recente</option><option value="name" ${sort === 'name' ? 'selected' : ''}>Cognome</option></select></label>
        <input class="input" type="search" placeholder="Cerca per nome o stile" data-q value="${esc(q)}" aria-label="Cerca nei collegamenti">
      </div>
      <div id="conn-rows">${ids.map(id => { const e = ent(id); return `<div class="inv">
        <a href="${F.profileUrl(e)}" tabindex="-1">${avatar(id, 56, { online: true })}</a>
        <div><a href="${F.profileUrl(e)}" style="text-decoration:none"><b>${esc(e.name)}</b></a><small>${esc(e.headline)}</small><small>${esc(e.city)}</small></div>
        <div class="inv-actions"><a class="btn btn-outline btn-sm" href="messages.html?to=${id}">Messaggio</a><button class="icon-btn" type="button" data-soon aria-label="Altre azioni">${icon('more')}</button></div>
      </div>`; }).join('') || '<p class="inv muted">Nessun collegamento corrisponde alla ricerca.</p>'}</div>
    </section>`;
  }

  function following() {
    const ids = Object.keys(state.follow || {}).concat(['corpi-urbani', 'linea-ombra', 'carlos-rivera']).filter((v, i, a) => a.indexOf(v) === i);
    return `<section class="card"><div class="card-head"><h2>Persone e pagine che segui</h2></div>
      <div style="padding:8px 0 10px">${ids.map(id => { const e = ent(id); if (!e) return ''; return `<div class="inv">${avatar(e, 56)}<div><b>${esc(e.name)}</b><small>${esc(e.headline)}</small></div>
        <div class="inv-actions"><button class="btn btn-ghost btn-sm is-done" type="button" data-follow="${e.id}">${icon('check')} Segui già</button></div></div>`; }).join('')}</div></section>`;
  }

  function generic(title, text, cta, href) {
    return `<section class="card card-pad" style="text-align:center;padding:56px 24px">
      <h2>${title}</h2><p class="muted" style="margin:10px auto 22px;max-width:44ch">${text}</p><a class="btn" href="${href}">${cta}</a></section>`;
  }

  function render() {
    const body = { grow, conn: connections, follow: following,
      groups: () => generic('Gruppi e crew', 'Le tue crew e i gruppi di scuola: allenamenti, cypher e scambi di sala in un unico posto.', 'Scopri i gruppi', '#'),
      events: () => generic('I tuoi eventi', 'Masterclass, festival e milonghe a cui partecipi o che organizzi.', 'Vai agli eventi', 'events.html'),
      tags: () => generic('Hashtag', 'Segui #floorwork, #audizioni e gli stili che ami per ritrovarli nel feed.', 'Torna al feed', 'feed.html') }[tab] || grow;
    $('#main').innerHTML = `<div class="wrap page"><div class="layout layout-side-main">
      <aside class="col sticky" aria-label="Gestisci la rete">${sideNav()}</aside>
      <div class="col" id="net-body">${body()}</div>
    </div></div>`;
    F.observe($('#main'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    const main = $('#main');
    main.addEventListener('click', (e) => {
      const t = e.target;
      const tb = t.closest('[data-tab]');
      if (tb) { tab = tb.dataset.tab; history.replaceState(null, '', `?tab=${tab}`); render(); return; }
      const inv = t.closest('[data-inv]');
      if (inv && t.closest('[data-accept]')) { setIn('inv', inv.dataset.inv, 'ok'); render(); F.updateCounts(); toast(`${esc(ent(inv.dataset.inv).name)} ora è tra i tuoi collegamenti`, { ico: 'userCheck' }); return; }
      if (inv && t.closest('[data-ignore]')) {
        const id = inv.dataset.inv; inv.classList.add('is-leaving');
        setTimeout(() => { setIn('inv', id, 'no'); render(); F.updateCounts(); }, 380);
        toast('Invito ignorato', { ico: 'close', action: { label: 'Annulla', run: () => { setIn('inv', id, undefined); render(); F.updateCounts(); } } });
        return;
      }
      const c = t.closest('[data-connect]');
      if (c) {
        const id = c.dataset.connect, on = !getIn('conn', id); setIn('conn', id, on ? 'wait' : undefined);
        c.classList.toggle('is-done', on); c.classList.toggle('btn-outline', !on);
        c.innerHTML = on ? `${icon('clock')} In attesa` : `${icon('userPlus')} Collegati`;
        if (on) toast(`Invito inviato a ${esc(ent(id).name)}`, { ico: 'userPlus' });
        return;
      }
      const f = t.closest('[data-follow]');
      if (f) {
        const id = f.dataset.follow, on = !getIn('follow', id); setIn('follow', id, on || undefined);
        f.classList.toggle('is-done', on); f.classList.toggle('btn-outline', !on);
        f.innerHTML = on ? `${icon('check')} Segui già` : `${icon('plus')} Segui`;
        toast(on ? `Ora segui ${esc((ent(id) || ent('page:' + id)).name)}` : 'Non segui più questa pagina');
        return;
      }
      const d = t.closest('[data-dismiss]');
      if (d) {
        const card = d.closest('[data-card]'); card.classList.add('is-leaving');
        state.dismissed = Object.assign(state.dismissed || {}, { [card.dataset.card]: 1 }); save();
        setTimeout(() => card.remove(), 340);
        return;
      }
      if (t.closest('[data-invite]')) { toast('Link d\'invito copiato: frankdanza.it/invito/giulia', { ico: 'link' }); }
    });
    main.addEventListener('input', (e) => {
      if (e.target.matches('[data-q]')) {
        q = e.target.value.toLowerCase();
        const tmp = document.createElement('div'); tmp.innerHTML = connections();
        $('#conn-rows').replaceWith(tmp.querySelector('#conn-rows'));
      }
    });
    main.addEventListener('change', (e) => { if (e.target.matches('[data-sort]')) { sort = e.target.value; render(); } });
  });
})();
