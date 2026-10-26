/* Messaggi: elenco conversazioni con filtri, thread, invio con risposta simulata */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, avatar, ent, toast, setIn, getIn, state, save, relTime } = F;
  F.guard();

  const params = new URLSearchParams(location.search);
  const convs = D.conversations.map(c => ({ ...c, messages: c.messages.concat((state.sent || {})[c.id] || []) }));
  let filter = 'all', q = '';

  /* ?to=persona apre (o crea) la conversazione */
  const to = params.get('to');
  if (to && ent(to)) {
    let c = convs.find(x => x.with === to);
    if (!c) { c = { id: 'new-' + to, with: to, messages: (state.sent || {})['new-' + to] || [] }; convs.unshift(c); }
  }
  let current = (to && convs.find(x => x.with === to).id) || (matchMedia('(min-width: 900px)').matches ? convs[0].id : null);

  const REPLIES = ['Perfetto, grazie mille!', 'Ci sentiamo in settimana per i dettagli 🙌', 'Ottimo, lo giro anche al resto del gruppo.', 'Ricevuto! Ti confermo entro domani.'];
  const last = (c) => c.messages[c.messages.length - 1];
  const isUnread = (c) => c.unread && !getIn('read', c.id);

  function convItem(c) {
    const e = ent(c.with), m = last(c);
    return `<button class="conv ${c.id === current ? 'is-active' : ''} ${isUnread(c) ? 'is-unread' : ''}" type="button" data-conv="${c.id}">
      ${avatar(c.with, 52, { online: true })}
      <div><div class="conv-top"><b>${esc(e.name)}</b><time>${m ? relTime(m.at) : ''}</time></div>
        <p>${m ? `${m.me ? 'Tu: ' : ''}${esc(m.file ? '📎 ' + m.text : m.text)}` : 'Nuova conversazione'}</p>
        ${c.label ? `<span class="badge badge-accent tagline">${esc(c.label)}</span>` : ''}</div>
    </button>`;
  }

  function sideList() {
    return convs.filter(c => {
      if (filter === 'unread' && !isUnread(c)) return false;
      if (filter === 'work' && !c.label) return false;
      return !q || ent(c.with).name.toLowerCase().includes(q);
    }).map(convItem).join('') || '<p class="muted" style="padding:20px 16px">Nessuna conversazione.</p>';
  }

  function bubbles(c) {
    let lastDay = '';
    return c.messages.map(m => {
      const day = m.at.slice(0, 10);
      const sep = day !== lastDay ? `<span class="day-sep">${relTime(m.at + '').match(/:/) ? 'Oggi' : new Date(m.at).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</span>` : '';
      lastDay = day;
      const time = new Date(m.at).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
      return sep + `<div class="bub ${m.me ? 'me' : 'them'} ${m.isNew ? 'is-new' : ''}">${m.file ? `<a class="bub-file" href="#">${icon('article')} ${esc(m.text)}</a>` : esc(m.text)}<time>${time}</time></div>`;
    }).join('');
  }

  function thread(c) {
    if (!c) return `<div class="thread-empty"><div>${icon('chat')}<h2 style="margin-top:12px;font-size:1.3rem">Le tue conversazioni</h2><p style="margin-top:6px">Scegli una conversazione o scrivi a un collegamento.</p></div></div>`;
    const e = ent(c.with);
    return `<header class="thread-head">
        <button class="icon-btn thread-back" type="button" data-back aria-label="Torna alle conversazioni">${icon('back')}</button>
        <a href="${F.profileUrl(e)}" tabindex="-1">${avatar(c.with, 40, { online: true })}</a>
        <div><a href="${F.profileUrl(e)}"><b>${esc(e.name)}</b></a><small>${e.online ? 'Online ora' : esc(e.headline)}</small></div>
        <button class="icon-btn" type="button" data-soon aria-label="Videochiamata">${icon('video')}</button>
        <button class="icon-btn" type="button" data-star aria-label="Aggiungi ai preferiti">${icon('star', getIn('star', c.id) ? 'icon-fill' : '')}</button>
      </header>
      <div class="thread-body" id="tb">
        <div class="thread-intro">${avatar(c.with, 72)}<b>${esc(e.name)}</b><small>${esc(e.headline)}</small><a class="link" href="${F.profileUrl(e)}" style="font-size:.85rem">Visualizza profilo</a></div>
        ${bubbles(c)}
      </div>
      <div class="quick">${['Grazie mille!', 'Ci sentiamo in settimana', 'Volentieri, quando?', 'Ti mando il programma'].map(s => `<button class="chip" type="button" data-quick="${esc(s)}">${esc(s)}</button>`).join('')}</div>
      <form class="thread-form" data-form>
        <label class="sr-only" for="msg">Scrivi un messaggio</label>
        <textarea id="msg" placeholder="Scrivi un messaggio…" rows="2"></textarea>
        <div class="thread-tools">
          <button class="icon-btn" type="button" data-attach aria-label="Allega file">${icon('clip')}</button>
          <button class="icon-btn" type="button" data-attach aria-label="Allega foto">${icon('image')}</button>
          <button class="icon-btn" type="button" data-emoji aria-label="Emoji">${icon('smile')}</button>
          <button class="btn btn-sm" type="submit" data-sendbtn disabled>Invia</button>
        </div>
      </form>`;
  }

  function render() {
    const c = convs.find(x => x.id === current);
    $('#main').innerHTML = `<div class="wrap page page-msg">
      <section class="card msg-shell ${c && matchMedia('(max-width: 899px)').matches && to ? 'show-thread' : ''}" id="shell">
        <div class="msg-side">
          <div class="msg-side-head"><h1>Messaggi</h1><div><button class="icon-btn" type="button" data-soon aria-label="Opzioni">${icon('more')}</button><button class="icon-btn" type="button" data-new aria-label="Nuovo messaggio">${icon('edit')}</button></div></div>
          <div class="msg-search">${icon('search')}<label class="sr-only" for="msg-q">Cerca nei messaggi</label><input id="msg-q" type="search" placeholder="Cerca nei messaggi" value="${esc(q)}"></div>
          <div class="msg-filters">${[['all', 'Tutti'], ['unread', 'Non letti'], ['work', 'Audizioni e lavoro']].map(([k, l]) => `<button class="chip ${filter === k ? 'is-active' : ''}" type="button" data-filter="${k}" aria-pressed="${filter === k}">${l}</button>`).join('')}</div>
          <div class="convs" id="convs">${sideList()}</div>
        </div>
        <div class="thread" id="thread">${thread(c)}</div>
      </section></div>`;
    scrollBottom();
  }
  const scrollBottom = () => { const tb = $('#tb'); if (tb) tb.scrollTop = tb.scrollHeight; };

  function open(id) {
    current = id;
    setIn('read', id, 1); F.updateCounts();
    $('#convs').innerHTML = sideList();
    $('#thread').innerHTML = thread(convs.find(x => x.id === id));
    $('#shell').classList.add('show-thread');
    scrollBottom();
    if (!matchMedia('(pointer: coarse)').matches) $('#msg').focus();
  }

  function send(text, file) {
    const c = convs.find(x => x.id === current);
    const now = new Date(); const at = `${D.today}T${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const m = { me: true, at, text, file: !!file };
    c.messages.push({ ...m, isNew: true });
    state.sent = state.sent || {}; state.sent[c.id] = (state.sent[c.id] || []).concat(m); save();
    $('#tb').insertAdjacentHTML('beforeend', `<div class="bub me is-new">${file ? `<a class="bub-file" href="#">${icon('article')} ${esc(text)}</a>` : esc(text)}<time>${at.slice(11)}</time></div>`);
    $('#convs').innerHTML = sideList(); scrollBottom();
    /* Risposta simulata con indicatore di scrittura */
    const cid = c.id;
    setTimeout(() => {
      if (current !== cid) return;
      $('#tb').insertAdjacentHTML('beforeend', '<div class="typing" id="typing" aria-label="Sta scrivendo"><i></i><i></i><i></i></div>'); scrollBottom();
      setTimeout(() => {
        $('#typing')?.remove();
        if (current !== cid) return;
        const r = { me: false, at, text: REPLIES[c.messages.length % REPLIES.length] };
        c.messages.push(r); state.sent[cid] = state.sent[cid].concat(r); save();
        $('#tb').insertAdjacentHTML('beforeend', `<div class="bub them is-new">${esc(r.text)}<time>${at.slice(11)}</time></div>`);
        $('#convs').innerHTML = sideList(); scrollBottom();
      }, 1600);
    }, 700);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (current) setIn('read', current, 1);
    render();
    const main = $('#main');
    main.addEventListener('click', (e) => {
      const t = e.target;
      const cv = t.closest('[data-conv]'); if (cv) { open(cv.dataset.conv); return; }
      const fl = t.closest('[data-filter]'); if (fl) { filter = fl.dataset.filter; $$('[data-filter]').forEach(b => { b.classList.toggle('is-active', b === fl); b.setAttribute('aria-pressed', b === fl); }); $('#convs').innerHTML = sideList(); return; }
      if (t.closest('[data-back]')) { $('#shell').classList.remove('show-thread'); return; }
      const qk = t.closest('[data-quick]'); if (qk) { send(qk.dataset.quick); return; }
      if (t.closest('[data-emoji]')) { const ta = $('#msg'); ta.value += '💃'; ta.dispatchEvent(new Event('input', { bubbles: true })); ta.focus(); return; }
      if (t.closest('[data-attach]')) { send('Programma intensivo dicembre.pdf', true); return; }
      if (t.closest('[data-star]')) { const on = !getIn('star', current); setIn('star', current, on || undefined); $('#thread').innerHTML = thread(convs.find(x => x.id === current)); scrollBottom(); toast(on ? 'Conversazione aggiunta ai preferiti' : 'Rimossa dai preferiti', { ico: 'star' }); return; }
      if (t.closest('[data-new]')) { location.href = 'network.html?tab=conn'; }
    });
    main.addEventListener('input', (e) => {
      if (e.target.id === 'msg') $('[data-sendbtn]').disabled = !e.target.value.trim();
      if (e.target.id === 'msg-q') { q = e.target.value.toLowerCase(); $('#convs').innerHTML = sideList(); }
    });
    main.addEventListener('keydown', (e) => {
      if (e.target.id === 'msg' && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.target.form.requestSubmit(); }
    });
    main.addEventListener('submit', (e) => {
      if (!e.target.matches('[data-form]')) return;
      e.preventDefault();
      const ta = $('#msg'), v = ta.value.trim(); if (!v) return;
      send(v); ta.value = ''; $('[data-sendbtn]').disabled = true;
    });
  });
})();
