/* Feed: scheda profilo, composer, post con reazioni, commenti, sondaggi, notizie e suggerimenti */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, fmt, avatar, orgLogo, art, img, ent, toast, modal, setIn, getIn, state, save } = F;
  F.guard();

  const RX = Object.fromEntries(D.reactions.map(r => [r.id, r]));
  const posts = (state.myPosts || []).concat(D.posts);

  /* Testo con #hashtag e @menzioni evidenziati */
  const rich = (t) => esc(t).replace(/(^|\s)#([\p{L}\d_]+)/gu, '$1<a class="tag" href="#">#$2</a>').replace(/(^|\s)@([\p{L}]+ [\p{L}]+)/gu, '$1<a class="tag" href="#">@$2</a>');

  function leftCol() {
    const me = D.me;
    return `<section class="card mini-profile">
        <div class="mini-cover">${art(state.coverSeed || me.seed, { w: 400, h: 120, ribbons: 5 })}</div>
        <a href="profile.html" aria-label="Il tuo profilo">${avatar(me.id, 76)}</a>
        <h3><a href="profile.html">${esc(me.name)}</a></h3>
        <p class="hl">${esc(me.headline)}</p>
        <div class="mini-stats">
          <a class="mini-stat" href="profile.html#analisi"><span>Visualizzazioni del profilo</span><b>${fmt(me.stats.views)}</b></a>
          <a class="mini-stat" href="profile.html#analisi"><span>Impression dei post</span><b>${fmt(me.stats.impressions)}</b></a>
        </div>
        <div class="mini-links">
          <a href="jobs.html?tab=saved">${icon('bookmark')} Elementi salvati</a>
          <a href="network.html">${icon('users')} Gruppi e crew</a>
          <a href="events.html">${icon('calendar')} Eventi</a>
        </div>
      </section>
      <section class="card hide-m">
        <div class="side-nav">
          <p class="eyebrow" style="padding:8px 12px 4px">Hashtag che segui</p>
          ${['floorwork', 'contemporaneo', 'audizioni', 'danzamilano', 'coreografia'].map(h => `<a href="#">${icon('hash')} ${h}</a>`).join('')}
        </div>
      </section>`;
  }

  function composer() {
    return `<section class="card composer" id="pubblica">
      <div class="composer-top">${avatar(D.me.id, 48)}<button class="composer-open" type="button" data-compose>Racconta una prova, una lezione, un debutto…</button></div>
      <div class="composer-actions">
        <button type="button" data-compose="video"><span class="c-video">${icon('video')}</span>Video</button>
        <button type="button" data-compose="photo"><span class="c-photo">${icon('image')}</span>Foto</button>
        <button type="button" data-compose="event"><span class="c-event">${icon('calendar')}</span>Evento</button>
        <button type="button" data-compose="article" class="hide-m"><span class="c-article">${icon('article')}</span>Articolo</button>
      </div>
    </section>
    <div class="feed-sort">Ordina per: <button type="button" data-sort>${state.sort === 'recent' ? 'Più recenti' : 'Più rilevanti'} ${icon('down')}</button></div>`;
  }

  /* ---------- Post ---------- */
  function mediaBlock(p) {
    const m = p.media;
    if (!m) return '';
    if (m.type === 'grid') return `<div class="post-media post-grid">${m.items.map((r, i) => img(r, i ? 300 : 600, i ? 210 : 420)).join('')}</div>`;
    if (m.type === 'video') return `<div class="post-media ratio" data-video>${img(m.src, 900, 560)}<button class="play" type="button" aria-label="Riproduci il video">${icon('play', 'icon-fill')}</button><span class="vid-meta">${m.dur} · ${m.views} visualizzazioni</span><span class="vid-progress"><i></i></span></div>`;
    if (m.type === 'local') return `<div class="post-media ratio">${m.html}</div>`;
    return `<div class="post-media">${img(m.src, 900, 620)}</div>`;
  }

  function attachBlock(p) {
    if (p.job) {
      const j = D.jobs.find(x => x.id === p.job), org = D.pages[j.org];
      return `<div class="attach"><div class="attach-body">${orgLogo(org.name, org.seed, 48)}<div><b>${esc(j.title)}</b><small>${esc(org.name)} · ${esc(j.city)} · ${esc(j.contract)}</small><small>${j.applicants} candidature · scade il ${esc(j.deadline)}</small></div>
        <a class="btn btn-sm hide-m" href="jobs.html?id=${j.id}">Candidati</a></div></div>`;
    }
    if (p.event) {
      const ev = D.events.find(x => x.id === p.event), d = new Date(ev.date);
      const going = getIn('going', ev.id) ?? ev.me;
      return `<div class="attach"><div class="attach-cover">${img(ev.media, 900, 280)}</div>
        <div class="attach-body"><span class="date-tile"><b>${d.getDate()}</b><small>${d.toLocaleDateString('it-IT', { month: 'short' })}</small></span>
          <div><b>${esc(ev.title)}</b><small>${esc(ev.place)}, ${esc(ev.city)} · ${ev.time}</small><small>${fmt(ev.going + (going && !ev.me ? 1 : 0))} partecipanti</small></div>
          <button class="btn btn-sm ${going ? 'is-done' : 'btn-outline'}" type="button" data-going="${ev.id}">${going ? `${icon('check')} Ci sarai` : 'Partecipa'}</button></div></div>`;
    }
    if (p.article) {
      return `<a class="attach" href="#" style="text-decoration:none"><div class="attach-cover" style="height:200px">${img(p.article.media, 900, 400)}</div><div class="attach-body"><div><b>${esc(p.article.title)}</b><small>${esc(p.article.site)}</small></div></div></a>`;
    }
    if (p.poll) {
      const voted = getIn('poll', p.id);
      const total = p.poll.opts.reduce((a, o) => a + o.v, 0) + (voted !== undefined ? 1 : 0);
      return `<div class="poll ${voted !== undefined ? 'is-voted' : ''}" data-poll="${p.id}">
        <p class="poll-q">${esc(p.poll.q)}</p>
        ${p.poll.opts.map((o, i) => { const v = o.v + (voted === i ? 1 : 0), pct = Math.round(v / total * 100);
          return `<button class="poll-opt ${voted === i ? 'is-mine' : ''}" type="button" data-vote="${i}"><i class="fill" style="width:${voted !== undefined ? pct : 0}%"></i><span>${esc(o.t)} ${voted === i ? icon('check') : ''}</span><span class="pct">${pct}%</span></button>`; }).join('')}
        <p class="poll-meta">${fmt(total)} voti · ${esc(p.poll.ends)}${voted !== undefined ? ' · <button class="link" style="border:0;background:none;padding:0" type="button" data-unvote>Annulla voto</button>' : ''}</p>
      </div>`;
    }
    return '';
  }

  function reactionSummary(p) {
    const mine = getIn('rx', p.id);
    const total = p.rx.total + (mine ? 1 : 0);
    const tops = [...new Set([mine, ...p.rx.top].filter(Boolean))].slice(0, 3);
    return `<span class="rx-sum"><span class="rx-icons">${tops.map(t => `<span class="rx-dot" title="${RX[t].label}">${RX[t].emoji}</span>`).join('')}</span>
      <button type="button" data-rxlist>${mine ? `Tu e altre ${fmt(total - 1)} persone` : fmt(total)}</button></span>`;
  }

  function likeBtn(p) {
    const mine = getIn('rx', p.id);
    return mine
      ? `<span class="rx-emoji" aria-hidden="true">${RX[mine].emoji}</span><span class="lbl">${RX[mine].label}</span>`
      : `${icon('clap')}<span class="lbl">Applaudi</span>`;
  }

  function commentHTML(c, isNew) {
    const e = ent(c.who);
    const k = c.id;
    const liked = getIn('clike', k);
    return `<div class="comment ${isNew ? 'is-new' : ''}">${avatar(c.who, 40)}<div style="flex:1;min-width:0">
      <div class="comment-bubble"><a href="${F.profileUrl(e)}" style="text-decoration:none"><b>${esc(e.name)}</b></a><small>${esc(e.headline)}</small><p>${rich(c.text)}</p></div>
      <div class="comment-meta"><span>${esc(c.when)}</span><button type="button" class="${liked ? 'is-on' : ''}" data-clike="${k}">Applaudi${(c.likes || 0) + (liked ? 1 : 0) ? ` · ${(c.likes || 0) + (liked ? 1 : 0)}` : ''}</button><button type="button" data-reply="${esc(e.name)}">Rispondi</button></div>
    </div></div>`;
  }

  function postHTML(p, i) {
    const a = ent(p.author);
    const isPage = a.kind === 'page';
    const following = getIn('follow', a.id);
    const ctx = p.ctx ? `<div class="post-ctx">${avatar(p.ctx.who, 22)}<span><b>${esc(ent(p.ctx.who).name)}</b> ${esc(p.ctx.what)}</span></div>` : '';
    const thread = (p.thread || []).map((c, n) => ({ ...c, id: c.id || `${p.id}-c${n}` })).concat((state.comments || {})[p.id] || []);
    const reposted = getIn('repost', p.id);
    return `<article class="card post" data-post="${p.id}" data-reveal style="--i:${Math.min(i, 3)}">
      ${p.mine ? '' : ctx}
      ${p.milestone ? `<div class="post-ctx">${icon('trophy')}<span><b>${esc(a.name)}</b> · ${esc(p.milestone)}</span></div>` : ''}
      <header class="post-head">
        <a href="${F.profileUrl(a)}" tabindex="-1" aria-hidden="true">${avatar(a, 50)}</a>
        <div class="post-who">
          <a href="${F.profileUrl(a)}"><b>${esc(a.name)}</b></a> ${!isPage && !a.isMe ? `<span class="deg">· ${F.degLabel(a.deg)}</span>` : ''}
          <small>${isPage ? `${fmt(a.followers)} follower` : esc(a.headline)}</small>
          <small>${esc(p.when)} · ${icon('globe')}</small>
        </div>
        ${!a.isMe && (isPage || a.deg > 1) ? `<button class="follow-btn ${following ? 'is-on' : ''}" type="button" data-follow="${a.id}">${following ? `${icon('check')} Segui già` : `${icon('plus')} Segui`}</button>` : ''}
        <button class="icon-btn" type="button" aria-label="Altre azioni" data-postmenu>${icon('more')}</button>
      </header>
      <div class="post-text is-clamped">${rich(p.text)}</div>
      <button class="more-btn" type="button" data-more>…altro</button>
      ${attachBlock(p)}
      ${mediaBlock(p)}
      <div class="post-stats">${reactionSummary(p)}<span><button type="button" data-toggle-comments>${fmt(p.comments + thread.length - (p.thread || []).length)} commenti</button> · ${fmt(p.reposts + (reposted ? 1 : 0))} diffusioni</span></div>
      <div class="post-actions">
        <div style="position:relative;display:grid">
          <button class="pa ${getIn('rx', p.id) ? 'is-on' : ''}" type="button" data-like aria-pressed="${!!getIn('rx', p.id)}">${likeBtn(p)}</button>
          <div class="rx-picker" role="menu" aria-label="Reazioni">${D.reactions.map(r => `<button type="button" role="menuitem" data-rx="${r.id}" data-label="${r.label}" aria-label="${r.label}">${r.emoji}</button>`).join('')}</div>
        </div>
        <button class="pa" type="button" data-toggle-comments>${icon('comment')}<span class="lbl">Commenta</span></button>
        <button class="pa ${reposted ? 'is-on' : ''}" type="button" data-repost>${icon('repost')}<span class="lbl">${reposted ? 'Diffuso' : 'Diffondi'}</span></button>
        <button class="pa" type="button" data-send>${icon('send')}<span class="lbl">Invia</span></button>
      </div>
      <div class="comments" ${thread.length && i < 1 ? '' : 'hidden'}>
        <div class="comment-form">${avatar(D.me.id, 40)}<form class="comment-input" data-comment><label class="sr-only" for="c-${p.id}">Aggiungi un commento</label><input id="c-${p.id}" placeholder="Aggiungi un commento…" autocomplete="off"><button class="icon-btn" type="button" aria-label="Emoji" data-emoji>${icon('smile')}</button><button class="btn" type="submit" hidden>Pubblica</button></form></div>
        <div class="c-list">${thread.map(c => commentHTML(c)).join('')}</div>
        ${p.comments > (p.thread || []).length ? `<button class="more-btn" type="button" style="margin:0;padding:0" data-loadmore>Carica altri commenti</button>` : ''}
      </div>
    </article>`;
  }

  function rightCol() {
    const sugg = ['page:linea-ombra', 'carlos-rivera', 'page:danza-oltrarno'];
    return `<section class="card news">
        <div class="card-head"><h2>Dalla scena</h2><button class="icon-btn" type="button" aria-label="Informazioni" data-soon>${icon('spark')}</button></div>
        <p class="sub muted" style="padding:2px 22px 0;font-size:.82rem">Le notizie della danza scelte dalla redazione</p>
        <div class="news-list">${D.news.map(n => `<a class="news-item" href="#"><b>${esc(n.t)}</b><small>${esc(n.m)}</small></a>`).join('')}</div>
      </section>
      <section class="card">
        <div class="card-head"><h2 style="font-size:1.15rem">Aggiungi al tuo feed</h2></div>
        <div style="padding:6px 0 4px">${sugg.map(id => { const e = ent(id), on = getIn('follow', e.id);
          return `<div class="suggest">${avatar(e, 48)}<div><b>${esc(e.name)}</b><small>${esc(e.headline)}</small><button class="btn btn-ghost btn-sm ${on ? 'is-done' : ''}" type="button" data-follow="${e.id}">${on ? `${icon('check')} Segui già` : `${icon('plus')} Segui`}</button></div></div>`; }).join('')}</div>
        <a class="card-foot" href="network.html">Mostra tutti i suggerimenti ${icon('arrow')}</a>
      </section>
      <section class="card promo">
        <div class="promo-art">${art(77, { w: 400, h: 320, ribbons: 5, animated: true })}</div>
        <div class="promo-body"><span class="eyebrow" style="color:#B9C1FF">Audizioni per te</span><h3>7 nuove audizioni per il tuo profilo</h3><p>Contemporaneo e coreografia, tra Milano, Torino e Roma.</p><a class="btn btn-sm" style="background:#fff;color:var(--ink)" href="jobs.html">Vedi le audizioni</a></div>
      </section>
      ${F.footer()}`;
  }

  function render() {
    $('#main').innerHTML = `<div class="wrap page"><div class="layout layout-feed">
      <aside class="col hide-m" aria-label="Il tuo profilo">${leftCol()}</aside>
      <div class="col" id="feed-col">${composer()}<div class="col" id="posts">${sortPosts().map(postHTML).join('')}</div></div>
      <aside class="col col-right sticky hide-m" aria-label="Notizie e suggerimenti">${rightCol()}</aside>
    </div></div>`;
    afterRender($('#main'));
  }
  const sortPosts = () => state.sort === 'recent' ? posts.slice().sort((a, b) => (b.mine ? 1 : 0) - (a.mine ? 1 : 0)) : posts;

  function afterRender(root) {
    $$('.post-text.is-clamped', root).forEach(t => { if (t.scrollHeight <= t.clientHeight + 2) { t.classList.remove('is-clamped'); t.nextElementSibling.remove(); } });
    F.observe(root);
  }

  function rerenderPost(id) {
    const el = $(`[data-post="${id}"]`), p = posts.find(x => x.id === id);
    const open = !el.querySelector('.comments').hidden;
    const tmp = document.createElement('div');
    tmp.innerHTML = postHTML(p, 9);
    const fresh = tmp.firstElementChild;
    fresh.classList.add('is-in');
    fresh.querySelector('.comments').hidden = !open;
    const clampOpen = !el.querySelector('.post-text').classList.contains('is-clamped');
    el.replaceWith(fresh);
    if (clampOpen) { fresh.querySelector('.post-text').classList.remove('is-clamped'); fresh.querySelector('[data-more]')?.remove(); }
    else afterRender(fresh.parentElement);
    return fresh;
  }

  /* ---------- Composer ---------- */
  function openComposer(kind) {
    const styles = ['Contemporaneo', 'Hip Hop', 'Classica', 'Salsa', 'Tango', 'Heels', 'Workshop', 'Audizione'];
    let attached = kind === 'photo' || kind === 'video' ? kind : null;
    modal({
      title: 'Crea un post',
      body: `<div class="compose-who">${avatar(D.me.id, 52)}<div><b>${esc(D.me.name)}</b><br><button class="audience" type="button" data-aud>${icon('globe')} <span>Tutti</span> ${icon('down')}</button></div></div>
        <label class="sr-only" for="compose">Testo del post</label>
        <textarea class="compose-text" id="compose" placeholder="${kind === 'event' ? 'Racconta l\'evento: data, luogo, per chi è…' : kind === 'article' ? 'Titolo e prime righe del tuo articolo…' : 'Di cosa vuoi parlare? Una prova, una lezione, un debutto…'}" autofocus></textarea>
        <div class="compose-preview" ${attached ? '' : 'hidden'}>${art(Date.now() % 997, { w: 800, h: 450, ribbons: 6 })}<button class="icon-btn" type="button" data-unattach aria-label="Rimuovi allegato">${icon('close')}</button></div>
        <div><p class="eyebrow" style="margin-bottom:8px">Aggiungi uno stile</p><div class="style-picks">${styles.map(s => `<button class="chip" type="button" data-style="${s}" aria-pressed="false">#${s.replace(' ', '')}</button>`).join('')}</div></div>`,
      foot: `<div class="compose-tools" style="margin-right:auto">
          <button class="icon-btn" type="button" data-attach="photo" aria-label="Aggiungi foto">${icon('image')}</button>
          <button class="icon-btn" type="button" data-attach="video" aria-label="Aggiungi video">${icon('video')}</button>
          <button class="icon-btn" type="button" data-soon aria-label="Crea evento">${icon('calendar')}</button>
          <button class="icon-btn" type="button" data-soon aria-label="Sondaggio">${icon('chart')}</button>
          <button class="icon-btn" type="button" data-soon aria-label="Musica">${icon('music')}</button>
        </div>
        <button class="btn" type="button" data-publish disabled>Pubblica</button>`,
      onOpen(m, close) {
        const ta = m.querySelector('#compose'), pub = m.querySelector('[data-publish]'), prev = m.querySelector('.compose-preview');
        const sync = () => { pub.disabled = !ta.value.trim() && !attached; };
        ta.addEventListener('input', sync);
        m.addEventListener('click', (e) => {
          const s = e.target.closest('[data-style]');
          if (s) { const on = s.getAttribute('aria-pressed') !== 'true'; s.setAttribute('aria-pressed', on); s.classList.toggle('is-active', on); }
          const at = e.target.closest('[data-attach]');
          if (at) { attached = at.dataset.attach; prev.hidden = false; sync(); }
          if (e.target.closest('[data-unattach]')) { attached = null; prev.hidden = true; sync(); }
          const aud = e.target.closest('[data-aud]');
          if (aud) { const sp = aud.querySelector('span'); sp.textContent = sp.textContent === 'Tutti' ? 'Solo collegamenti' : 'Tutti'; }
        });
        sync();
        pub.addEventListener('click', () => {
          const tags = $$('[data-style][aria-pressed="true"]', m).map(b => b.textContent).join(' ');
          const text = ta.value.trim() + (tags ? `\n\n${tags}` : '');
          const p = { id: 'm' + Date.now(), mine: true, author: D.me.id, when: 'Adesso', text, rx: { total: 0, top: [] }, comments: 0, reposts: 0, thread: [] };
          if (attached) p.media = { type: 'local', html: prev.querySelector('svg').outerHTML };
          posts.unshift(p);
          state.myPosts = [{ ...p, media: undefined }].concat(state.myPosts || []); save();
          const tmp = document.createElement('div'); tmp.innerHTML = postHTML(p, 0);
          $('#posts').prepend(tmp.firstElementChild); afterRender($('#posts'));
          close(); toast('Post pubblicato', { action: { label: 'Visualizza', run: () => $(`[data-post="${p.id}"]`).scrollIntoView({ block: 'center' }) } });
        });
      }
    });
  }

  function sendModal(p) {
    const people = Object.keys(D.people).filter(id => D.people[id].deg === 1);
    modal({
      title: 'Invia in privato', size: 'sm',
      body: `<input class="input" placeholder="Cerca un collegamento" data-filter>
        <div class="side-nav" style="padding:0;max-height:300px;overflow:auto">${people.map(id => `<label class="menu-item" style="cursor:pointer" data-name="${esc(D.people[id].name.toLowerCase())}">${avatar(id, 36)}<span style="flex:1"><b style="display:block;color:var(--ink)">${esc(D.people[id].name)}</b><small class="muted" style="font-size:.78rem">${esc(D.people[id].headline.slice(0, 48))}…</small></span><input type="checkbox" value="${id}" style="accent-color:var(--accent);width:18px;height:18px"></label>`).join('')}</div>
        <textarea class="textarea" placeholder="Scrivi un messaggio (facoltativo)" style="min-height:70px"></textarea>`,
      foot: `<button class="btn" type="button" data-go>Invia</button>`,
      onOpen(m, close) {
        m.querySelector('[data-filter]').addEventListener('input', (e) => { const q = e.target.value.toLowerCase(); $$('[data-name]', m).forEach(l => { l.hidden = !l.dataset.name.includes(q); }); });
        m.querySelector('[data-go]').addEventListener('click', () => {
          const n = $$('input[type=checkbox]:checked', m).length;
          if (!n) { toast('Scegli almeno un collegamento', { ico: 'flag' }); return; }
          close(); toast(`Post inviato a ${n} ${n === 1 ? 'persona' : 'persone'}`, { ico: 'send' });
        });
      }
    });
  }

  function reactionList(p) {
    const ids = Object.keys(D.people).slice(0, 8);
    modal({
      title: 'Reazioni', size: 'sm',
      body: `<div class="tabs">${['Tutte ' + fmt(p.rx.total), ...p.rx.top.map(t => RX[t].emoji + ' ' + fmt(Math.round(p.rx.total / (p.rx.top.indexOf(t) + 2))))].map((t, i) => `<span class="chip ${i ? '' : 'is-active'}">${t}</span>`).join('')}</div>
        <div>${ids.map((id, i) => `<div class="suggest" style="padding-inline:0;align-items:center"><span class="ava-wrap">${avatar(id, 44)}<span class="dot" style="background:var(--surface);display:grid;place-items:center;width:20px;height:20px;font-size:.7rem">${RX[p.rx.top[i % p.rx.top.length]].emoji}</span></span><div><b>${esc(D.people[id].name)}</b><small>${esc(D.people[id].headline)}</small></div></div>`).join('')}</div>`
    });
  }

  /* ---------- Interazioni ---------- */
  let pressTimer, hoverTimer;
  const closePickers = () => $$('.rx-picker.is-open').forEach(x => x.classList.remove('is-open'));

  function react(postEl, rxId) {
    const id = postEl.dataset.post;
    const cur = getIn('rx', id);
    setIn('rx', id, rxId === undefined ? (cur ? undefined : 'clap') : (cur === rxId ? undefined : rxId));
    const fresh = rerenderPost(id);
    if (getIn('rx', id)) { const b = fresh.querySelector('[data-like]'); b.classList.add('pop'); }
    closePickers();
  }

  document.addEventListener('DOMContentLoaded', () => {
    render();
    const main = $('#main');
    if (location.hash === '#pubblica') setTimeout(() => openComposer(), 250);

    main.addEventListener('click', (e) => {
      const t = e.target;
      const postEl = t.closest('[data-post]');
      const id = postEl && postEl.dataset.post;
      const p = id && posts.find(x => x.id === id);

      if (t.closest('[data-compose]')) { openComposer(t.closest('[data-compose]').dataset.compose); return; }
      if (t.closest('[data-sort]')) { state.sort = state.sort === 'recent' ? 'top' : 'recent'; save(); render(); toast(state.sort === 'recent' ? 'Ordinati per più recenti' : 'Ordinati per più rilevanti', { ico: 'sliders' }); return; }
      if (t.closest('[data-more]')) { postEl.querySelector('.post-text').classList.remove('is-clamped'); t.closest('[data-more]').remove(); return; }
      if (t.closest('[data-rx]')) { react(postEl, t.closest('[data-rx]').dataset.rx); return; }
      if (t.closest('[data-like]')) { react(postEl); return; }
      if (t.closest('[data-rxlist]')) { reactionList(p); return; }
      if (t.closest('[data-toggle-comments]')) { const c = postEl.querySelector('.comments'); c.hidden = !c.hidden; if (!c.hidden) c.querySelector('input').focus(); return; }
      if (t.closest('[data-repost]')) {
        const on = !getIn('repost', id); setIn('repost', id, on || undefined); rerenderPost(id);
        if (on) toast('Post diffuso nella tua rete', { ico: 'repost', action: { label: 'Annulla', run: () => { setIn('repost', id, undefined); rerenderPost(id); } } });
        return;
      }
      if (t.closest('[data-send]')) { sendModal(p); return; }
      const fb = t.closest('[data-follow]');
      if (fb) {
        const fid = fb.dataset.follow, on = !getIn('follow', fid); setIn('follow', fid, on || undefined);
        $$(`[data-follow="${fid}"]`).forEach(b => { b.classList.toggle('is-on', on); b.classList.toggle('is-done', on && b.classList.contains('btn')); b.innerHTML = on ? `${icon('check')} Segui già` : `${icon('plus')} Segui`; });
        toast(on ? `Ora segui ${esc(ent(fid).name)}` : `Non segui più ${esc(ent(fid).name)}`);
        return;
      }
      const g = t.closest('[data-going]');
      if (g) { const ev = D.events.find(x => x.id === g.dataset.going); const on = !(getIn('going', ev.id) ?? ev.me); setIn('going', ev.id, on); rerenderPost(id); toast(on ? `Parteciperai a “${esc(ev.title)}”` : 'Partecipazione annullata', { ico: 'calendar' }); return; }
      const v = t.closest('[data-vote]');
      if (v) { setIn('poll', id, Number(v.dataset.vote)); const fresh = rerenderPost(id); requestAnimationFrame(() => fresh.querySelectorAll('.fill').forEach(f => { const w = f.style.width; f.style.width = '0'; requestAnimationFrame(() => { f.style.width = w; }); })); toast('Voto registrato. Grazie!', { ico: 'chart' }); return; }
      if (t.closest('[data-unvote]')) { setIn('poll', id, undefined); rerenderPost(id); return; }
      const vid = t.closest('[data-video]');
      if (vid) { vid.classList.toggle('is-playing'); return; }
      const cl = t.closest('[data-clike]');
      if (cl) { const k = cl.dataset.clike; setIn('clike', k, getIn('clike', k) ? undefined : 1); rerenderPost(id); return; }
      const rp = t.closest('[data-reply]');
      if (rp) { const inp = postEl.querySelector('.comment-input input'); inp.value = `@${rp.dataset.reply} `; inp.focus(); inp.dispatchEvent(new Event('input')); return; }
      if (t.closest('[data-emoji]')) { const inp = postEl.querySelector('.comment-input input'); inp.value += '👏'; inp.focus(); inp.dispatchEvent(new Event('input')); return; }
      if (t.closest('[data-loadmore]')) { t.closest('[data-loadmore]').textContent = 'Nessun altro commento da mostrare nel prototipo'; return; }
      const pm = t.closest('[data-postmenu]');
      if (pm) {
        const saved = getIn('saved', id);
        const box = document.createElement('div');
        box.className = 'menu is-open'; box.style.cssText = 'right:12px;top:56px';
        box.innerHTML = `<button class="menu-item" type="button" data-save-post>${icon('bookmark')} ${saved ? 'Rimuovi dai salvati' : 'Salva'}</button>
          <button class="menu-item" type="button" data-copy>${icon('link')} Copia link al post</button>
          <button class="menu-item" type="button" data-hide>${icon('close')} Non mi interessa</button>
          <button class="menu-item" type="button" data-soon>${icon('flag')} Segnala post</button>`;
        $$('.menu.post-menu').forEach(x => x.remove());
        box.classList.add('post-menu');
        postEl.append(box);
        setTimeout(() => document.addEventListener('click', function off(ev) { if (!box.contains(ev.target)) { box.remove(); document.removeEventListener('click', off); } }), 0);
        box.addEventListener('click', (ev) => {
          if (ev.target.closest('[data-save-post]')) { setIn('saved', id, saved ? undefined : 1); toast(saved ? 'Rimosso dai salvati' : 'Post salvato', { ico: 'bookmark' }); }
          if (ev.target.closest('[data-copy]')) toast('Link al post copiato', { ico: 'link' });
          if (ev.target.closest('[data-hide]')) { postEl.style.display = 'none'; toast('Vedrai meno post come questo', { ico: 'eye', action: { label: 'Annulla', run: () => { postEl.style.display = ''; } } }); }
          box.remove();
        });
      }
    });

    /* Picker delle reazioni: hover prolungato su desktop, pressione lunga su touch */
    main.addEventListener('pointerover', (e) => {
      const b = e.target.closest('[data-like]'); if (!b || e.pointerType !== 'mouse') return;
      clearTimeout(hoverTimer); hoverTimer = setTimeout(() => { closePickers(); b.nextElementSibling.classList.add('is-open'); }, 450);
    });
    main.addEventListener('pointerout', (e) => {
      const wrap = e.target.closest('[data-like]')?.parentElement || e.target.closest('.rx-picker')?.parentElement;
      if (!wrap || wrap.contains(e.relatedTarget)) return;
      clearTimeout(hoverTimer); setTimeout(() => { if (!wrap.matches(':hover')) wrap.querySelector('.rx-picker').classList.remove('is-open'); }, 250);
    });
    main.addEventListener('pointerdown', (e) => {
      const b = e.target.closest('[data-like]'); if (!b || e.pointerType === 'mouse') return;
      pressTimer = setTimeout(() => { b.nextElementSibling.classList.add('is-open'); }, 420);
    });
    main.addEventListener('pointerup', () => clearTimeout(pressTimer));
    main.addEventListener('contextmenu', (e) => { if (e.target.closest('[data-like]')) e.preventDefault(); });
    main.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && e.target.closest('[data-like]')) { e.preventDefault(); const pk = e.target.nextElementSibling; pk.classList.add('is-open'); pk.querySelector('button').focus(); }
      if (e.key === 'Escape') closePickers();
    });

    main.addEventListener('input', (e) => {
      const f = e.target.closest('[data-comment]'); if (!f) return;
      f.querySelector('.btn').hidden = !e.target.value.trim();
    });
    main.addEventListener('submit', (e) => {
      const f = e.target.closest('[data-comment]'); if (!f) return;
      e.preventDefault();
      const input = f.querySelector('input'), text = input.value.trim(); if (!text) return;
      const postEl = f.closest('[data-post]'), id = postEl.dataset.post;
      const c = { id: `${id}-u${Date.now()}`, who: D.me.id, when: 'Adesso', text, likes: 0 };
      state.comments = state.comments || {}; state.comments[id] = (state.comments[id] || []).concat(c); save();
      postEl.querySelector('.c-list').insertAdjacentHTML('beforeend', commentHTML(c, true));
      input.value = ''; f.querySelector('.btn').hidden = true;
      const btn = postEl.querySelector('.post-stats [data-toggle-comments]'); btn.textContent = btn.textContent.replace(/[\d.]+/, (n) => fmt(Number(n.replace(/\./g, '')) + 1));
    });
  });
})();
