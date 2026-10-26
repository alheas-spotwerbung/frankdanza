/* Eventi: i tuoi eventi, scoperta per stile/città, partecipazione, creazione */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, fmt, avatar, img, ent, toast, modal, setIn, getIn } = F;
  F.guard();

  let filter = 'Tutti';
  const going = (ev) => getIn('going', ev.id) ?? !!ev.me;
  const host = (ev) => ent(ev.host) || ent('page:' + ev.host);

  function card(ev, i) {
    const d = new Date(ev.date + 'T' + ev.time), on = going(ev), h = host(ev);
    return `<article class="ev" data-reveal style="--i:${i % 6}">
      <div class="ev-cover">${img(ev.media, 520, 292)}<span class="badge">${ev.online ? `${icon('video')} Online` : esc(ev.style)}</span></div>
      <div class="ev-body">
        <span class="ev-when">${d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })} · ${ev.time}</span>
        <b>${esc(ev.title)}</b>
        <small>${icon('pin', 'icon')} ${esc(ev.place)}${ev.online ? '' : ', ' + esc(ev.city)}</small>
        <small>Organizzato da ${esc(h.name)}</small>
        <span class="ev-going"><span class="stack">${['marco-deluca', 'luca-conti', 'aurora-bianchi'].map(x => avatar(x, 22)).join('')}</span>${fmt(ev.going + (on && !ev.me ? 1 : 0))} partecipanti</span>
        ${ev.mine ? `<button class="btn btn-sm btn-dark" type="button" data-manage="${ev.id}">${icon('settings')} Gestisci</button>`
          : `<button class="btn btn-sm ${on ? 'is-done' : 'btn-outline'}" type="button" data-going="${ev.id}" aria-pressed="${on}">${on ? `${icon('check')} Ci sarai` : 'Partecipa'}</button>`}
      </div>
    </article>`;
  }

  function render() {
    const mine = D.events.filter(ev => ev.mine || going(ev));
    const styles = ['Tutti', 'Online', ...new Set(D.events.filter(e => !e.online).map(e => e.city))];
    const others = D.events.filter(ev => filter === 'Tutti' || (filter === 'Online' ? ev.online : ev.city === filter));
    $('#main').innerHTML = `<div class="wrap page"><div class="layout layout-main-aside wide">
      <div class="col">
        <section class="card">
          <div class="card-head"><div><h1 class="card-title">I tuoi eventi</h1><p class="sub">${mine.length} tra quelli che organizzi e quelli a cui partecipi</p></div><button class="btn btn-sm" type="button" data-create>${icon('plus')} Crea evento</button></div>
          <div class="ev-grid">${mine.map(card).join('') || '<p class="muted">Nessun evento in programma.</p>'}</div>
        </section>
        <section class="card">
          <div class="card-head"><div><h2>Scopri eventi</h2><p class="sub">Masterclass, festival, serate sociali e webinar</p></div></div>
          <div class="tabs" style="padding:14px 22px 0">${styles.map(s => `<button class="chip ${filter === s ? 'is-active' : ''}" type="button" data-f="${esc(s)}" aria-pressed="${filter === s}">${esc(s)}</button>`).join('')}</div>
          <div class="ev-grid">${others.map(card).join('')}</div>
        </section>
      </div>
      <aside class="col sticky" aria-label="Calendario">
        <section class="card"><div class="card-head"><h2 style="font-size:1.1rem">In agenda</h2></div>
          <div style="padding:8px 0 10px">${mine.slice().sort((a, b) => a.date.localeCompare(b.date)).map(ev => { const d = new Date(ev.date); return `<div class="suggest" style="align-items:center"><span class="date-tile"><b style="font-size:1.3rem">${d.getDate()}</b><small>${d.toLocaleDateString('it-IT', { month: 'short' })}</small></span><div><b>${esc(ev.title)}</b><small>${ev.time} · ${esc(ev.city)}</small></div></div>`; }).join('')}</div>
          <button class="card-foot" type="button" data-soon>Esporta nel calendario ${icon('calendar')}</button></section>
        ${F.footer()}
      </aside>
    </div></div>`;
    F.observe($('#main'));
  }

  function create() {
    modal({
      title: 'Crea un evento',
      body: `<div class="form-grid">
        <label class="field full"><span>Nome dell'evento *</span><input class="input" name="title" placeholder="Es. Open class di floor work" autofocus></label>
        <label class="field"><span>Tipo</span><select class="select" name="type"><option>In presenza</option><option>Online</option></select></label>
        <label class="field"><span>Stile</span><select class="select" name="style">${['Contemporaneo', 'Hip Hop', 'Classica', 'Salsa', 'Tango', 'Heels'].map(s => `<option>${s}</option>`).join('')}</select></label>
        <label class="field"><span>Data *</span><input class="input" type="date" name="date" min="${D.today}" value="2026-12-12"></label>
        <label class="field"><span>Ora</span><input class="input" type="time" name="time" value="19:00"></label>
        <label class="field full"><span>Luogo</span><input class="input" name="place" placeholder="Sala, indirizzo, città"></label>
        <label class="field full"><span>Descrizione</span><textarea class="textarea" placeholder="Per chi è, livello richiesto, cosa portare…"></textarea></label>
      </div>`,
      foot: `<span class="left">* Obbligatorio</span><button class="btn" type="button" data-save>Crea</button>`,
      onOpen(m, close) {
        m.querySelector('[data-save]').addEventListener('click', () => {
          const v = (n) => m.querySelector(`[name=${n}]`).value.trim();
          if (!v('title')) { m.querySelector('[name=title]').setAttribute('aria-invalid', 'true'); return; }
          const online = v('type') === 'Online';
          D.events.unshift({ id: 'u' + Date.now(), title: v('title'), date: v('date') || D.today, time: v('time') || '19:00', city: online ? 'Online' : (v('place').split(',').pop().trim() || 'Milano'), place: v('place') || (online ? 'Diretta su FrankDanza' : 'Studio Corpo Libero'), style: v('style'), host: 'studio-corpo-libero', going: 1, media: 'gallery.workshop', online, mine: true });
          close(); render(); toast('Evento creato. Invita la tua rete dal pulsante Gestisci.', { ico: 'calendar' });
        });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    $('#main').addEventListener('click', (e) => {
      const t = e.target;
      const g = t.closest('[data-going]');
      if (g) { const ev = D.events.find(x => x.id === g.dataset.going); const on = !going(ev); setIn('going', ev.id, on); render(); toast(on ? `Parteciperai a “${esc(ev.title)}”` : 'Partecipazione annullata', { ico: 'calendar' }); return; }
      const f = t.closest('[data-f]'); if (f) { filter = f.dataset.f; render(); return; }
      if (t.closest('[data-create]')) { create(); return; }
      if (t.closest('[data-manage]')) toast('Gestione evento: inviti, partecipanti e aggiornamenti nella versione completa', { ico: 'settings' });
    });
  });
})();
