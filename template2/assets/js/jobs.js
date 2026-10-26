/* Audizioni e lavoro: ricerca, filtri, elenco + dettaglio, salvataggio, candidatura in tre passi */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, fmt, avatar, orgLogo, ent, toast, modal, setIn, getIn } = F;
  F.guard();

  const params = new URLSearchParams(location.search);
  const KINDS = ['Tutte', 'Audizione', 'Insegnamento', 'Produzione', 'Workshop'];
  let filter = { kind: 'Tutte', q: '', city: '', easy: false, tab: params.get('tab') || 'all' };
  let current = params.get('id') || null;

  const list = () => D.jobs.filter(j => {
    if (filter.tab === 'saved' && !getIn('savedJob', j.id)) return false;
    if (filter.tab === 'applied' && !getIn('applied', j.id)) return false;
    if (filter.kind !== 'Tutte' && j.kind !== filter.kind) return false;
    if (filter.easy && !j.easy) return false;
    const hay = (j.title + ' ' + j.styles.join(' ') + ' ' + D.pages[j.org].name).toLowerCase();
    if (filter.q && !hay.includes(filter.q.toLowerCase())) return false;
    if (filter.city && !j.city.toLowerCase().includes(filter.city.toLowerCase())) return false;
    return true;
  });

  function side() {
    const n = (b) => Object.keys((F.state[b]) || {}).length;
    return `<section class="card"><nav class="side-nav" aria-label="Le mie audizioni">
        <button type="button" data-jtab="all" ${filter.tab === 'all' ? 'aria-current="true"' : ''}>${icon('mask')} Tutte le audizioni<span class="n">${D.jobs.length}</span></button>
        <button type="button" data-jtab="saved" ${filter.tab === 'saved' ? 'aria-current="true"' : ''}>${icon('bookmark')} Salvate<span class="n">${n('savedJob')}</span></button>
        <button type="button" data-jtab="applied" ${filter.tab === 'applied' ? 'aria-current="true"' : ''}>${icon('send')} Candidature<span class="n">${n('applied')}</span></button>
        <button type="button" data-soon>${icon('bell')} Avvisi audizione</button>
        <button type="button" data-soon>${icon('briefcase')} Pubblica un annuncio</button>
      </nav></section>
      <section class="card card-pad hide-m">
        <p class="eyebrow">Il tuo profilo per i casting</p>
        <p style="margin-top:8px;font-size:.925rem;color:var(--ink-2)">Showreel, misure e rider tecnico vengono allegati in automatico alle candidature semplici.</p>
        <a class="link-arrow" style="margin-top:10px" href="profile.html">Controlla il profilo ${icon('arrow')}</a>
      </section>
      ${F.footer()}`;
  }

  function jobItem(j) {
    const org = D.pages[j.org], saved = getIn('savedJob', j.id), applied = getIn('applied', j.id);
    return `<article class="job-item ${j.id === current ? 'is-active' : ''} ${applied ? 'is-applied' : ''}" data-job="${j.id}" tabindex="0" aria-label="${esc(j.title)}, ${esc(org.name)}">
      ${orgLogo(org.name, org.seed, 52)}
      <div><h3>${esc(j.title)}</h3><p class="co">${esc(org.name)}</p><p class="loc">${esc(j.city)} · ${esc(j.mode)}</p>
        <p class="foot">${j.promoted ? '<span>Promosso</span>' : ''}<span>${esc(j.posted)} fa</span><span>${j.applicants} candidature</span>${j.easy ? `<span class="ok">${icon('bolt', 'icon')} Candidatura semplice</span>` : ''}</p></div>
      <button class="icon-btn save ${saved ? 'is-on' : ''}" type="button" data-save="${j.id}" aria-pressed="${!!saved}" aria-label="${saved ? 'Rimuovi dai salvati' : 'Salva'}">${icon('bookmark', saved ? 'icon-fill' : '')}</button>
    </article>`;
  }

  function detail(j) {
    if (!j) return `<div class="thread-empty"><div>${icon('mask')}<p style="margin-top:10px">Nessuna audizione corrisponde ai filtri.</p></div></div>`;
    const org = D.pages[j.org], saved = getIn('savedJob', j.id), applied = getIn('applied', j.id), poster = ent(j.poster);
    const okMatch = j.match.filter(m => m[1]).length;
    return `<button class="btn btn-ghost btn-sm jd-back" type="button" data-back>${icon('back')} Tutte le audizioni</button>
      <div class="crumb">${orgLogo(org.name, org.seed, 30)}<span>${esc(org.name)}</span></div>
      <h2>${esc(j.title)}</h2>
      <p class="jd-meta">${esc(j.city)} · ${esc(j.posted)} fa · <b style="color:var(--ink)">${j.applicants} candidature</b> · scade il ${esc(j.deadline)}</p>
      <div class="jd-facts">
        <p class="jd-fact">${icon('briefcase')} <span><span class="badge badge-accent">${esc(j.kind)}</span> ${esc(j.contract)} · ${esc(j.mode)}</span></p>
        <p class="jd-fact">${icon('target')} ${esc(j.pay)}</p>
        <p class="jd-fact">${icon('music')} ${j.styles.map(esc).join(' · ')}</p>
        <p class="jd-fact">${icon('users')} ${fmt(org.followers)} follower · 4 tuoi collegamenti lavorano qui</p>
      </div>
      <div class="jd-actions">
        ${applied ? `<span class="btn is-done">${icon('check')} Candidatura inviata</span>`
          : `<button class="btn" type="button" data-apply="${j.id}">${j.easy ? `${icon('bolt')} Candidatura semplice` : `Candidati sul sito ${icon('arrow')}`}</button>`}
        <button class="btn btn-outline" type="button" data-save="${j.id}">${saved ? 'Salvata' : 'Salva'}</button>
        <button class="btn btn-ghost" type="button" data-share>${icon('send')} Condividi</button>
      </div>
      <div class="jd-match">
        <h3>Il tuo profilo corrisponde a ${okMatch} requisiti su ${j.match.length}</h3>
        <ul>${j.match.map(([l, ok]) => `<li class="${ok ? '' : 'no'}">${icon(ok ? 'check' : 'close')} ${esc(l)}</li>`).join('')}</ul>
      </div>
      <div class="jd-section"><h3>Il progetto</h3><p>${esc(j.about)}</p></div>
      <div class="jd-section"><h3>Cosa farai</h3><ul>${j.tasks.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
      <div class="jd-section"><h3>Cosa cerchiamo</h3><ul>${j.reqs.map(t => `<li>${esc(t)}</li>`).join('')}</ul></div>
      ${poster ? `<div class="jd-poster">${avatar(poster, 48)}<div><b>${esc(poster.name)}</b><small>${esc(poster.headline)}</small><small>Ha pubblicato l'annuncio</small></div><a class="btn btn-outline btn-sm" href="messages.html?to=${poster.id}">Messaggio</a></div>` : ''}`;
  }

  function render() {
    const jobs = list();
    if (!jobs.find(j => j.id === current)) current = jobs[0] ? jobs[0].id : null;
    const j = D.jobs.find(x => x.id === current);
    const title = { all: 'Audizioni consigliate per te', saved: 'Audizioni salvate', applied: 'Le tue candidature' }[filter.tab];
    $('#main').innerHTML = `<div class="wrap page"><div class="layout layout-main-aside">
      <div class="col">
        <section class="card">
          <form class="job-search" role="search" data-search>
            <label class="field-ico">${icon('search')}<span class="sr-only">Ruolo, stile o compagnia</span><input class="input" name="q" placeholder="Ruolo, stile o compagnia" value="${esc(filter.q)}"></label>
            <label class="field-ico">${icon('pin')}<span class="sr-only">Città</span><input class="input" name="city" placeholder="Città o “Online”" value="${esc(filter.city)}"></label>
            <button class="btn" type="submit">Cerca</button>
          </form>
          <div class="job-filters">${KINDS.map(k => `<button class="chip ${filter.kind === k ? 'is-active' : ''}" type="button" data-kind="${k}" aria-pressed="${filter.kind === k}">${k}</button>`).join('')}
            <button class="chip ${filter.easy ? 'is-active' : ''}" type="button" data-easy aria-pressed="${filter.easy}">${icon('bolt')} Candidatura semplice</button></div>
        </section>
        <section class="card jobs-split ${params.get('id') && matchMedia('(max-width: 899px)').matches && j ? 'show-detail' : ''}" id="split">
          <div class="jobs-list">
            <div class="jobs-list-head"><b>${title}</b><small>${jobs.length} risultati in base al tuo profilo e alle tue ricerche</small></div>
            ${jobs.map(jobItem).join('') || '<p class="muted" style="padding:24px 18px">Nessun risultato. Prova a togliere un filtro.</p>'}
          </div>
          <div class="job-detail" id="detail" aria-live="polite">${detail(j)}</div>
        </section>
      </div>
      <aside class="col sticky" aria-label="Le mie audizioni">${side()}</aside>
    </div></div>`;
  }

  function select(id) {
    current = id;
    $$('.job-item').forEach(el => el.classList.toggle('is-active', el.dataset.job === id));
    $('#detail').innerHTML = detail(D.jobs.find(x => x.id === id));
    $('#detail').scrollTop = 0;
    history.replaceState(null, '', `?id=${id}${filter.tab !== 'all' ? '&tab=' + filter.tab : ''}`);
    if (matchMedia('(max-width: 899px)').matches) { $('#split').classList.add('show-detail'); $('#split').scrollIntoView(); }
  }

  /* Candidatura semplice: contatti → materiali → riepilogo */
  function apply(j) {
    const org = D.pages[j.org];
    let step = 0;
    const steps = [
      () => `<div class="steps-dots" aria-hidden="true"><i class="on"></i><i></i><i></i></div>
        <p class="eyebrow">Passo 1 di 3 · Contatti</p>
        <div class="compose-who">${avatar(D.me.id, 52)}<div><b>${esc(D.me.name)}</b><br><small class="muted">${esc(D.me.headline)}</small></div></div>
        <div class="form-grid">
          <label class="field"><span>Email *</span><input class="input" name="email" value="${esc(D.me.email)}"></label>
          <label class="field"><span>Telefono</span><input class="input" name="tel" placeholder="+39"></label>
          <label class="field"><span>Altezza (cm)</span><input class="input" name="h" inputmode="numeric" value="168"></label>
          <label class="field"><span>Disponibilità</span><select class="select"><option>Da gennaio 2027</option><option>Subito</option><option>Da concordare</option></select></label>
        </div>`,
      () => `<div class="steps-dots" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i></div>
        <p class="eyebrow">Passo 2 di 3 · Materiali</p>
        <p class="muted" style="font-size:.9rem">Scegli cosa allegare. ${esc(org.name)} chiede almeno un video.</p>
        <label class="file-pill"><span class="ft">MP4</span><span><b>Showreel 2026</b><small>3:42 · dal tuo profilo</small></span><input type="checkbox" checked></label>
        <label class="file-pill"><span class="ft" style="background:var(--ink)">PDF</span><span><b>CV artistico, Giulia Ferraro</b><small>Aggiornato a ottobre 2026</small></span><input type="checkbox" checked></label>
        <label class="file-pill"><span class="ft" style="background:var(--ok)">JPG</span><span><b>Foto in figura intera</b><small>2 foto</small></span><input type="checkbox"></label>
        <label class="upload" tabindex="0">${icon('upload')}<b>Carica un altro file</b><small>Video, PDF o foto, massimo 200 MB</small><input type="file" hidden></label>`,
      () => `<div class="steps-dots" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i></div>
        <p class="eyebrow">Passo 3 di 3 · Riepilogo</p>
        <div class="attach" style="margin:0"><div class="attach-body">${orgLogo(org.name, org.seed, 48)}<div><b>${esc(j.title)}</b><small>${esc(org.name)} · ${esc(j.city)}</small></div></div></div>
        <label class="field"><span>Messaggio per il casting (facoltativo)</span><textarea class="textarea" placeholder="Due righe su di te e su perché questo progetto ti interessa."></textarea></label>
        <label class="check"><input type="checkbox" checked> Segui ${esc(org.name)} per ricevere le prossime audizioni</label>`
    ];
    modal({
      title: `Candidati a ${esc(org.name)}`,
      body: steps[0](),
      foot: `<button class="btn btn-ghost" type="button" data-prev hidden>Indietro</button><button class="btn" type="button" data-next>Avanti</button>`,
      onOpen(m, close) {
        const body = m.querySelector('.modal-body'), next = m.querySelector('[data-next]'), prev = m.querySelector('[data-prev]');
        const draw = () => {
          body.innerHTML = steps[step](); prev.hidden = step === 0; next.textContent = step === 2 ? 'Invia candidatura' : 'Avanti';
          const up = body.querySelector('.upload'); if (up) { const fi = up.querySelector('input'); up.addEventListener('click', () => fi.click()); fi.addEventListener('change', () => { if (fi.files[0]) up.querySelector('b').textContent = fi.files[0].name; }); }
        };
        next.addEventListener('click', () => {
          if (step === 0) { const em = body.querySelector('[name=email]'); if (!/^\S+@\S+\.\S+$/.test(em.value)) { em.setAttribute('aria-invalid', 'true'); em.focus(); return; } }
          if (step < 2) { step++; draw(); return; }
          next.classList.add('is-loading');
          setTimeout(() => { setIn('applied', j.id, 1); close(); render(); toast(`Candidatura inviata a ${esc(org.name)}`, { ico: 'send' }); }, 800);
        });
        prev.addEventListener('click', () => { step--; draw(); });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    const main = $('#main');
    main.addEventListener('click', (e) => {
      const t = e.target;
      const sv = t.closest('[data-save]');
      if (sv) {
        e.stopPropagation();
        const id = sv.dataset.save, on = !getIn('savedJob', id); setIn('savedJob', id, on || undefined);
        const keep = current; render(); if (keep) select(keep);
        toast(on ? 'Audizione salvata' : 'Rimossa dai salvati', { ico: 'bookmark' });
        return;
      }
      const it = t.closest('[data-job]'); if (it) { select(it.dataset.job); return; }
      const k = t.closest('[data-kind]'); if (k) { filter.kind = k.dataset.kind; render(); return; }
      if (t.closest('[data-easy]')) { filter.easy = !filter.easy; render(); return; }
      const jt = t.closest('[data-jtab]'); if (jt) { filter.tab = jt.dataset.jtab; render(); return; }
      const ap = t.closest('[data-apply]');
      if (ap) { const j = D.jobs.find(x => x.id === ap.dataset.apply); if (j.easy) apply(j); else { setIn('applied', j.id, 1); render(); toast(`Ti abbiamo portato sul sito di ${esc(D.pages[j.org].name)}. Candidatura segnata come inviata.`, { ico: 'link' }); } return; }
      if (t.closest('[data-back]')) { $('#split').classList.remove('show-detail'); return; }
      if (t.closest('[data-share]')) toast('Link all\'audizione copiato', { ico: 'link' });
    });
    main.addEventListener('keydown', (e) => { const it = e.target.closest('[data-job]'); if (it && (e.key === 'Enter' || e.key === ' ') && e.target === it) { e.preventDefault(); select(it.dataset.job); } });
    main.addEventListener('submit', (e) => {
      if (!e.target.matches('[data-search]')) return;
      e.preventDefault();
      filter.q = e.target.q.value.trim(); filter.city = e.target.city.value.trim(); render();
    });
  });
})();
