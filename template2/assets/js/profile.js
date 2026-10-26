/* Profilo: il proprio (modificabile, con analisi private) o quello di un'altra persona (?id=) */
(function () {
  const F = window.FD;
  const { D, $, $$, icon, esc, fmt, avatar, orgLogo, art, img, ent, toast, modal, setIn, getIn, state, save } = F;
  F.guard();

  const params = new URLSearchParams(location.search);
  const pid = params.get('id');
  const isMe = !pid || pid === D.me.id;
  let coverSeed = state.coverSeed || D.me.seed;

  /* Per gli altri profili si ricava una scheda essenziale dai dati della rete */
  function otherProfile(id) {
    const e = ent(id);
    if (!e || e.kind !== 'person') return null;
    const [role, ...rest] = e.headline.split(' · ');
    const org = rest[rest.length - 1] || 'Freelance';
    return {
      ...e,
      about: `${e.headline}.\n\nBase a ${e.city}, disponibile per collaborazioni, lezioni ed eventi in tutta Italia. Scrivimi da FrankDanza per date e preventivi.`,
      experience: [{ org, seed: e.seed + 200, place: e.city, roles: [{ title: role, type: 'Freelance', from: 'gen 2021', to: 'presente', dur: '5 anni 10 mesi', desc: '', skills: [] }] }],
      skills: [
        { name: role.split(' ').slice(0, 3).join(' '), ctx: org, n: 30 + (e.seed % 40), by: ['marco-deluca', 'beatrice-fontana'] },
        { name: 'Musicalità', ctx: '', n: 12 + (e.seed % 20), by: ['luca-conti'] },
        { name: 'Presenza scenica', ctx: '', n: 8 + (e.seed % 15), by: [] }
      ],
      languages: [{ name: 'Italiano', level: 'Madrelingua o bilingue' }, { name: 'Inglese', level: 'Competenza professionale' }],
      posts: D.posts.filter(p => p.author === id)
    };
  }

  const P = isMe ? D.me : otherProfile(pid);

  /* ---------- Blocchi ---------- */
  const sectionHead = (title, { sub = '', add, edit, id } = {}) => `
    <div class="card-head">
      <div><h2 ${id ? `id="${id}-t"` : ''}>${title}</h2>${sub ? `<p class="sub">${sub}</p>` : ''}</div>
      ${isMe && (add || edit) ? `<div class="card-head-actions">
        ${add ? `<button class="icon-btn" type="button" data-act="${add}" aria-label="Aggiungi a ${esc(title)}">${icon('plus')}</button>` : ''}
        ${edit ? `<button class="icon-btn" type="button" data-act="${edit}" aria-label="Modifica ${esc(title)}">${icon('edit')}</button>` : ''}
      </div>` : ''}
    </div>`;

  function mutualLine() {
    const ids = ['marco-deluca', 'beatrice-fontana', 'aurora-bianchi'].filter(x => x !== P.id).slice(0, 2);
    const names = ids.map(x => `<b>${esc(ent(x).name)}</b>`).join(', ');
    const rest = P.mutual - ids.length;
    return `<div class="p-mutual"><span class="stack">${ids.map(x => avatar(x, 24)).join('')}</span><span>${names}${rest > 0 ? ` e altri ${rest} collegamenti in comune` : ' in comune'}</span></div>`;
  }

  function head() {
    const conn = isMe ? P.connections : (P.mutual * 11 + 140);
    const orgs = isMe ? [[P.experience[0].org, P.experience[0].seed], [P.education[0].org, P.education[0].seed]] : [[P.experience[0].org, P.experience[0].seed]];
    const degree = !isMe ? ` <span class="p-pron">· ${F.degLabel(P.deg)}</span>` : '';
    const connected = !isMe && (P.deg === 1 || getIn('conn', P.id) === 'ok');
    const pending = !isMe && getIn('conn', P.id) === 'wait';
    return `<section class="card p-head" aria-labelledby="p-name" data-reveal>
      <div class="p-cover" id="p-cover">${art(isMe ? coverSeed : P.seed + 5, { w: 1200, h: 300, ribbons: 6, animated: true })}
        ${isMe ? `<button class="icon-btn" type="button" data-act="cover" aria-label="Cambia immagine di copertina">${icon('image')}</button>` : ''}
      </div>
      <div class="p-main">
        <div class="p-ava">${avatar(P.id, 160)}${isMe ? '<span class="open-badge">#Disponibile</span>' : ''}</div>
        ${isMe ? `<button class="icon-btn p-edit" type="button" data-act="intro" aria-label="Modifica presentazione">${icon('edit')}</button>` : ''}
        <div class="p-grid">
          <div>
            <h1 class="p-name" id="p-name">${esc(P.name)}${P.verified || isMe ? `<span class="verified" title="Certificazioni verificate">${icon('shield')}</span>` : ''}${isMe && P.pronouns ? `<span class="p-pron">(${esc(P.pronouns)})</span>` : degree}</h1>
            <p class="p-headline">${esc(P.headline)}</p>
            <p class="p-meta">${esc(P.city)} <span class="sep" aria-hidden="true"></span> <a class="link" href="#" data-act="contact">Informazioni di contatto</a></p>
            <p class="p-conn"><a href="network.html?tab=conn">${conn > 500 ? '500+' : fmt(conn)} collegamenti</a><span class="muted" style="font-weight:500">${fmt(P.followers)} follower</span></p>
            ${!isMe ? mutualLine() : ''}
            <div class="p-actions">
              ${isMe ? `
                <button class="btn btn-sm" type="button" data-act="open">Disponibile per</button>
                <button class="btn btn-outline btn-sm" type="button" data-act="section">Aggiungi sezione</button>
                <button class="btn btn-ghost btn-sm" type="button" data-act="improve">Migliora il profilo</button>
                <button class="btn btn-ghost btn-sm" type="button" data-act="share">Condividi</button>`
              : `
                ${connected ? `<a class="btn btn-sm" href="messages.html?to=${P.id}">${icon('send')} Messaggio</a>`
                  : `<button class="btn btn-sm ${pending ? 'is-done' : ''}" type="button" data-act="connect">${icon(pending ? 'clock' : 'userPlus')} ${pending ? 'In attesa' : 'Collegati'}</button>
                     <a class="btn btn-outline btn-sm" href="messages.html?to=${P.id}">Messaggio</a>`}
                <button class="btn btn-ghost btn-sm" type="button" data-act="follow">${getIn('follow', P.id) ? 'Segui già' : '+ Segui'}</button>
                <button class="btn btn-ghost btn-sm" type="button" data-act="reco">Raccomanda</button>`}
            </div>
          </div>
          <div class="p-orgs hide-m">${orgs.map(([n, s]) => `<a class="p-org" href="#">${orgLogo(n, s, 34)}<span>${esc(n)}</span></a>`).join('')}</div>
        </div>
        ${isMe ? `<div class="p-open">
          <div class="open-card"><b>${esc(P.openTo.title)} ${esc(P.openTo.roles.slice(0, 3).join(', '))}</b><p>${esc(P.openTo.area)}</p><a href="#" data-act="open">Mostra dettagli</a>
            <button class="icon-btn" type="button" data-act="open" aria-label="Modifica disponibilità">${icon('edit')}</button></div>
          <div class="open-card alt"><b>${esc(P.hiring.title)}</b><p>${esc(P.hiring.roles.join(' · '))}</p><a href="jobs.html">Gestisci gli annunci</a></div>
        </div>` : ''}
      </div>
    </section>`;
  }

  function strength() {
    const done = state.strengthDone || 0;
    return `<section class="card" data-reveal>
      ${sectionHead('Consigliato per te', { sub: `${icon('eye', 'icon')} Visibile solo a te` })}
      <div class="card-body strength">
        <p><b>Livello del profilo: Avanzato</b> · ancora un passo per <b>Completo</b></p>
        <div class="strength-bar" aria-hidden="true">${[0, 1, 2, 3, 4].map(i => `<i class="${i < 4 + done ? 'on' : ''}"></i>`).join('')}</div>
        ${done ? `<div class="strength-tip">${icon('check')}<div><b>Profilo completo</b><p>Compari più spesso nelle ricerche di scuole e compagnie.</p></div></div>`
        : `<div class="strength-tip">${icon('video')}<div><b>Aggiungi un video di repertorio</b><p>I profili con un video in evidenza ricevono 3 volte più richieste di audizione.</p></div>
          <button class="btn btn-outline btn-sm" type="button" data-act="addvideo">Aggiungi</button></div>`}
      </div>
    </section>`;
  }

  function analytics() {
    const s = P.stats;
    return `<section class="card" id="analisi" data-reveal>
      ${sectionHead('Analisi', { sub: `${icon('eye', 'icon')} Visibile solo a te` })}
      <div class="card-body" style="padding-inline:10px">
        <div class="stats3">
          <a class="stat" href="#">${icon('users')}<b class="num">${fmt(s.views)}</b><span>visualizzazioni del profilo</span><small><span class="up">+${s.viewsDelta}%</span> rispetto alla settimana scorsa</small></a>
          <a class="stat" href="#">${icon('chart')}<b class="num">${fmt(s.impressions)}</b><span>impression dei post</span><small><span class="up">+${s.impressionsDelta}%</span> negli ultimi 7 giorni</small></a>
          <a class="stat" href="#">${icon('search')}<b class="num">${fmt(s.searches)}</b><span>comparse nelle ricerche</span><small>Soprattutto per “floor work” e “coreografa Milano”</small></a>
        </div>
      </div>
      <a class="card-foot" href="#">Mostra tutte le analisi ${icon('arrow')}</a>
    </section>`;
  }

  function about() {
    return `<section class="card" aria-labelledby="about-t" data-reveal>
      ${sectionHead('Informazioni', { edit: 'about', id: 'about' })}
      <div class="card-body">
        <p class="about is-clamped" id="about-text">${esc(P.about)}</p>
        <button class="more-btn" type="button" data-act="more-about" style="padding:4px 0 0">…altro</button>
        ${P.topSkills ? `<div class="top-skills">${icon('spark')}<div><b>Competenze principali</b><p>${P.topSkills.map(esc).join(' • ')}</p></div></div>` : ''}
      </div>
    </section>`;
  }

  function featured() {
    if (!P.featured) return '';
    return `<section class="card" data-reveal>
      ${sectionHead('In evidenza', { add: 'addvideo' })}
      <div class="card-body"><div class="featured">${P.featured.map(f => `
        <a class="feat" href="#">
          <div class="feat-media">${img(f.media, 480, 300)}${f.video ? `<span class="play" aria-hidden="true">${icon('play', 'icon-fill')}</span>` : ''}</div>
          <div class="feat-body"><span class="eyebrow">${esc(f.kind)}</span><b>${esc(f.title)}</b><small>${esc(f.meta)}</small></div>
        </a>`).join('')}</div></div>
    </section>`;
  }

  function activity() {
    const items = isMe ? P.activity : P.posts.map(p => ({ kind: 'post', when: p.when, text: p.text, stat: `${fmt(p.rx.total)} reazioni · ${p.comments} commenti` }));
    const tab = state.actTab || 'post';
    const list = items.filter(a => isMe ? a.kind === tab : true);
    return `<section class="card" id="attivita" data-reveal>
      <div class="card-head">
        <div><h2>Attività</h2><p class="followers">${fmt(P.followers)} follower</p></div>
        ${isMe ? `<button class="btn btn-outline btn-sm" type="button" data-act="compose">Crea un post</button>` : ''}
      </div>
      <div class="card-body">
        ${isMe ? `<div class="tabs" role="tablist">${[['post', 'Post'], ['comment', 'Commenti'], ['video', 'Video']].map(([k, l]) =>
          `<button class="chip ${k === tab ? 'is-active' : ''}" type="button" role="tab" aria-selected="${k === tab}" data-tab="${k}">${l}</button>`).join('')}</div>` : ''}
        <div class="act-list">${list.length ? list.map(a => `
          <article class="act"><small>${esc(P.name)} ${a.kind === 'comment' ? 'ha commentato' : 'ha pubblicato'} · ${esc(a.when)}</small><p>${esc(a.text)}</p><span class="stat-line">${esc(a.stat)}</span></article>`).join('')
          : `<p class="muted" style="padding:14px 0">Nessuna attività recente.</p>`}</div>
      </div>
      <a class="card-foot" href="feed.html">Mostra tutti i post ${icon('arrow')}</a>
    </section>`;
  }

  function classes() {
    if (!P.classes) return '';
    return `<section class="card" data-reveal>
      ${sectionHead('Lezioni settimanali', { sub: 'Iscrizioni aperte da FrankDanza', add: 'addclass' })}
      <div class="card-body"><div class="classes">${P.classes.map(c => {
        const full = c.spots === 0;
        return `<div class="class-row">
          <span class="class-day">${esc(c.day)}</span>
          <div><b>${esc(c.style)}</b><small>${esc(c.time)} · ${esc(c.level)}</small></div>
          <small class="muted">${icon('pin', 'icon')} ${esc(c.place)}</small>
          <div class="spots">${full ? '<span class="badge badge-warn">Completo</span>' : `${c.spots} posti liberi`}<div class="bar"><i style="width:${Math.round((1 - c.spots / c.total) * 100)}%"></i></div></div>
        </div>`;
      }).join('')}</div></div>
    </section>`;
  }

  function experience() {
    return `<section class="card" data-reveal>
      ${sectionHead('Esperienza', { add: 'addexp', edit: 'soon' })}
      <div class="card-body"><div class="entries">${P.experience.map(x => {
        const multi = x.roles.length > 1;
        const role = (r) => `<div>
            <h3>${esc(r.title)}</h3>
            ${multi ? '' : `<p class="org">${esc(x.org)} · ${esc(r.type)}</p>`}
            <p class="when">${esc(r.from)} – ${esc(r.to)} · ${esc(r.dur)}</p>
            ${multi ? `<p class="when">${esc(r.type)}</p>` : `<p class="when">${esc(x.place)}</p>`}
            ${r.desc ? `<p class="desc">${esc(r.desc)}</p>` : ''}
            ${r.media ? `<div class="media-row">${r.media.map(m => `<span class="thumb">${img(m, 240, 144)}</span>`).join('')}</div>` : ''}
            ${r.skills && r.skills.length ? `<p class="skills-line">${icon('spark')} ${r.skills.map(esc).join(', ')}</p>` : ''}
          </div>`;
        return `<div class="entry">${orgLogo(x.org, x.seed, 52)}
          ${multi ? `<div><h3>${esc(x.org)}</h3><p class="when">${esc(x.place)}</p><div class="sub-roles">${x.roles.map(role).join('')}</div></div>` : role(x.roles[0])}
          <span></span></div>`;
      }).join('')}</div></div>
    </section>`;
  }

  function education() {
    if (!P.education) return '';
    return `<section class="card" data-reveal>
      ${sectionHead('Formazione', { add: 'soon', edit: 'soon' })}
      <div class="card-body"><div class="entries">${P.education.map(x => `
        <div class="entry">${orgLogo(x.org, x.seed, 52)}<div><h3>${esc(x.org)}</h3><p class="org">${esc(x.title)}</p><p class="when">${esc(x.when)}</p>${x.desc ? `<p class="desc">${esc(x.desc)}</p>` : ''}</div><span></span></div>`).join('')}</div></div>
    </section>`;
  }

  function certs() {
    if (!P.certs) return '';
    return `<section class="card" data-reveal>
      ${sectionHead('Licenze e certificazioni', { sub: 'Ogni certificato riceve un codice e viene controllato dal team FrankDanza', add: 'soon' })}
      <div class="card-body"><div class="entries">${P.certs.map(c => `
        <div class="entry">${orgLogo(c.issuer, c.seed, 52)}
          <div><h3>${esc(c.title)}</h3><p class="org">${esc(c.issuer)}</p><p class="when">${esc(c.when)}</p><p class="code">ID: ${esc(c.code)}</p>
            <button class="btn btn-ghost btn-sm" type="button" style="margin-top:10px" data-act="cred" data-code="${esc(c.code)}">Mostra credenziale ${icon('link')}</button></div>
          <div>${c.verified ? `<span class="badge badge-ok">${icon('shield')} Verificato</span>` : `<span class="badge badge-wait">${icon('clock')} In verifica</span>`}</div>
        </div>`).join('')}</div></div>
    </section>`;
  }

  function skills() {
    const all = P.skills.concat(state.newSkills && isMe ? state.newSkills.map(n => ({ name: n, ctx: '', n: 0, by: [] })) : []);
    const shown = state.allSkills ? all : all.slice(0, 4);
    return `<section class="card" id="competenze" data-reveal>
      ${sectionHead('Competenze', { add: 'addskill', edit: 'soon' })}
      <div class="card-body"><div>${shown.map((s, i) => {
        const on = !isMe && getIn('endorse', P.id + ':' + i);
        const n = s.n + (on ? 1 : 0);
        return `<div class="skill">
          <div class="skill-top"><h3>${esc(s.name)}</h3>
            ${!isMe ? `<button class="btn btn-ghost btn-sm endorse ${on ? 'is-on' : ''}" type="button" data-act="endorse" data-i="${i}" aria-pressed="${!!on}">${icon(on ? 'check' : 'plus')} ${on ? 'Confermata' : 'Conferma'}</button>` : ''}</div>
          ${s.ctx ? `<p class="skill-ctx">${icon('briefcase')} ${esc(s.ctx)}</p>` : ''}
          ${n ? `<p class="skill-end">${s.by.length ? `<span class="stack">${s.by.slice(0, 3).map(b => avatar(b, 22)).join('')}</span>` : icon('users')} ${n} conferme</p>` : `<p class="skill-end muted">Nessuna conferma per ora</p>`}
        </div>`;
      }).join('')}</div></div>
      ${all.length > 4 ? `<button class="card-foot" type="button" data-act="allskills">${state.allSkills ? 'Mostra meno' : `Mostra tutte le ${all.length} competenze`} ${icon('arrow')}</button>` : ''}
    </section>`;
  }

  function recos() {
    if (!P.recommendations) return '';
    const tab = state.recoTab || 'received';
    const list = P.recommendations[tab];
    return `<section class="card" data-reveal>
      ${sectionHead('Raccomandazioni')}
      <div class="card-body">
        <div class="tabs" role="tablist">${[['received', 'Ricevute'], ['given', 'Fornite']].map(([k, l]) => `<button class="chip ${k === tab ? 'is-active' : ''}" type="button" role="tab" aria-selected="${k === tab}" data-reco="${k}">${l}</button>`).join('')}</div>
        <div>${list.map(r => { const e = ent(r.from); return `
          <div class="reco">${avatar(r.from, 52)}<div><a href="${F.profileUrl(e)}" style="text-decoration:none"><b>${esc(e.name)}</b></a><small>${esc(e.headline)}</small><small>${esc(r.rel)}</small><blockquote>${esc(r.text)}</blockquote></div></div>`; }).join('')}</div>
      </div>
      <button class="card-foot" type="button" data-act="askreco">Chiedi una raccomandazione ${icon('arrow')}</button>
    </section>`;
  }

  function awards() {
    if (!P.awards) return '';
    return `<section class="card" data-reveal>
      ${sectionHead('Premi e riconoscimenti', { add: 'soon' })}
      <div class="card-body"><div class="entries">${P.awards.map(a => `
        <div class="entry"><span class="logo" style="--s:52px;width:52px;height:52px;display:grid;place-items:center;background:var(--accent-soft);color:var(--accent)">${icon('trophy')}</span><div><h3>${esc(a.title)}</h3><p class="org">${esc(a.issuer)}</p><p class="when">${esc(a.when)}</p></div><span></span></div>`).join('')}</div></div>
    </section>`;
  }

  function languages() {
    return `<section class="card" data-reveal>
      ${sectionHead('Lingue', { add: 'soon', edit: 'soon' })}
      <div class="card-body"><div class="langs">${P.languages.map(l => `<div class="lang"><b>${esc(l.name)}</b><small>${esc(l.level)}</small></div>`).join('')}</div></div>
    </section>`;
  }

  function side() {
    const pymk = Object.keys(D.people).filter(id => D.people[id].deg > 1 && id !== pid).slice(0, 5);
    const viewed = ['carlos-rivera', 'nadia-esposito', 'chiara-longo'].filter(id => id !== pid);
    const suggest = (id) => { const e = ent(id); const st = getIn('conn', id);
      return `<div class="suggest">${avatar(id, 48)}<div><a href="${F.profileUrl(e)}"><b>${esc(e.name)}</b></a><small>${esc(e.headline)}</small>
        <button class="btn btn-ghost btn-sm ${st ? 'is-done' : ''}" type="button" data-connect="${id}">${icon(st ? 'clock' : 'userPlus')} ${st ? 'In attesa' : 'Collegati'}</button></div></div>`; };
    return `
      ${isMe ? `<section class="card">
        <div class="url-row"><div><b>Lingua del profilo</b><small>Italiano</small></div><button class="icon-btn" type="button" data-soon aria-label="Modifica lingua">${icon('edit')}</button></div>
        <div class="url-row"><div><b>Profilo pubblico e URL</b><small>${esc(P.url)}</small></div><button class="icon-btn" type="button" data-act="share" aria-label="Copia URL">${icon('link')}</button></div>
      </section>` : ''}
      <section class="card">
        <div class="card-head"><h2 style="font-size:1.1rem">Altri profili visualizzati</h2></div>
        <div class="pyml" style="padding:6px 0 10px">${viewed.map(suggest).join('')}</div>
      </section>
      <section class="card">
        <div class="card-head"><div><h2 style="font-size:1.1rem">Persone che potresti conoscere</h2><p class="sub">Dalla tua scena: contemporaneo, Milano</p></div></div>
        <div class="pyml" style="padding:6px 0 4px">${pymk.slice(0, 4).map(suggest).join('')}</div>
        <a class="card-foot" href="network.html">Mostra tutto</a>
      </section>
      <section class="card promo">
        <div class="promo-art">${art(301, { w: 400, h: 300, ribbons: 5, animated: true })}</div>
        <div class="promo-body"><span class="eyebrow" style="color:#B9C1FF">FrankDanza Pro</span><h3>Scopri chi ti cerca per le audizioni</h3><p>Vedi tutte le compagnie che visitano il tuo profilo e candidati in evidenza.</p><button class="btn btn-light btn-sm" style="background:#fff;color:var(--ink)" type="button" data-soon>Prova gratis per un mese</button></div>
      </section>
      ${F.footer()}`;
  }

  function render() {
    const main = $('#main');
    if (!P) {
      main.innerHTML = `<div class="wrap page"><section class="card card-pad" style="text-align:center;padding:64px 24px"><h1>Profilo non trovato</h1><p class="muted" style="margin:10px 0 20px">Il link potrebbe essere scaduto o la persona ha reso privato il profilo.</p><a class="btn" href="network.html">Torna alla tua rete</a></section></div>`;
      return;
    }
    document.title = `${P.name} · FrankDanza`;
    main.innerHTML = `<div class="wrap page"><div class="layout layout-main-side">
      <div class="col">
        ${head()}
        ${isMe ? strength() + analytics() : ''}
        ${about()}
        ${featured()}
        ${activity()}
        ${classes()}
        ${experience()}
        ${education()}
        ${certs()}
        ${skills()}
        ${recos()}
        ${awards()}
        ${languages()}
      </div>
      <aside class="col" aria-label="Suggerimenti">${side()}</aside>
    </div></div>`;
    F.observe(main);
    const ab = $('#about-text');
    if (ab && ab.scrollHeight <= ab.clientHeight + 2) { ab.classList.remove('is-clamped'); ab.nextElementSibling.remove(); }
    if (location.hash) { const t = document.querySelector(location.hash); t && setTimeout(() => t.scrollIntoView({ block: 'start' }), 60); }
  }

  /* ---------- Modali di modifica ---------- */
  const persistMe = (patch) => { Object.assign(D.me, patch); state.me = Object.assign(state.me || {}, patch); save(); render(); };

  function editIntro() {
    modal({
      title: 'Modifica presentazione',
      body: `<div class="form-grid">
        <label class="field"><span>Nome e cognome *</span><input class="input" name="name" value="${esc(P.name)}" required></label>
        <label class="field"><span>Pronomi</span><select class="select" name="pronouns">${['', 'lei', 'lui', 'loro'].map(o => `<option value="${o}" ${o === (P.pronouns || '') ? 'selected' : ''}>${o || 'Non indicare'}</option>`).join('')}</select></label>
        <label class="field full"><span>Titolo *</span><textarea class="textarea" name="headline" maxlength="220" style="min-height:90px">${esc(P.headline)}</textarea><small class="muted"><span data-count>${P.headline.length}</span>/220 · Ruolo, stili principali e dove lavori.</small></label>
        <label class="field full"><span>Città</span><input class="input" name="city" value="${esc(P.city)}"></label>
      </div>`,
      foot: `<span class="left">* Obbligatorio</span><button class="btn" type="button" data-save>Salva</button>`,
      onOpen(m, close) {
        const ta = m.querySelector('[name=headline]');
        ta.addEventListener('input', () => { m.querySelector('[data-count]').textContent = ta.value.length; });
        m.querySelector('[data-save]').addEventListener('click', () => {
          const v = (n) => m.querySelector(`[name=${n}]`).value.trim();
          if (!v('name') || !v('headline')) { m.querySelector(!v('name') ? '[name=name]' : '[name=headline]').setAttribute('aria-invalid', 'true'); return; }
          persistMe({ name: v('name'), pronouns: v('pronouns'), headline: v('headline'), city: v('city') });
          F.renderHeader('profile');
          close(); toast('Presentazione aggiornata');
        });
      }
    });
  }

  function editAbout() {
    modal({
      title: 'Modifica informazioni',
      body: `<p class="muted" style="font-size:.9rem">Racconta formazione, stili e cosa cerchi: è la prima cosa che leggono scuole e compagnie.</p>
        <textarea class="textarea" name="about" style="min-height:240px" maxlength="2600">${esc(P.about)}</textarea>`,
      foot: `<button class="btn" type="button" data-save>Salva</button>`,
      onOpen(m, close) {
        m.querySelector('[data-save]').addEventListener('click', () => { persistMe({ about: m.querySelector('textarea').value }); close(); toast('Informazioni aggiornate'); });
      }
    });
  }

  function editOpen() {
    const all = ['Workshop', 'Lezioni private', 'Produzioni teatrali', 'Residenze', 'Videoclip', 'Audizioni di compagnia', 'Coreografie su commissione', 'Insegnamento in scuole'];
    modal({
      title: 'Disponibile per',
      body: `<p class="muted" style="font-size:.9rem">Scegli cosa mostrare a scuole, compagnie e produzioni. Il badge #Disponibile compare sulla tua foto.</p>
        <div class="style-picks">${all.map(r => `<button class="chip ${P.openTo.roles.includes(r) ? 'is-active' : ''}" type="button" aria-pressed="${P.openTo.roles.includes(r)}" data-role="${esc(r)}">${esc(r)}</button>`).join('')}</div>
        <label class="field"><span>Dove</span><input class="input" name="area" value="${esc(P.openTo.area)}"></label>
        <label class="field"><span>Chi può vederlo</span><select class="select"><option>Tutti gli iscritti a FrankDanza</option><option>Solo scuole e compagnie verificate</option></select></label>`,
      foot: `<button class="btn btn-ghost" type="button" data-close>Annulla</button><button class="btn" type="button" data-save>Salva</button>`,
      onOpen(m, close) {
        m.addEventListener('click', (e) => { const c = e.target.closest('[data-role]'); if (c) { c.classList.toggle('is-active'); c.setAttribute('aria-pressed', c.classList.contains('is-active')); } });
        m.querySelector('[data-save]').addEventListener('click', () => {
          const roles = $$('[data-role].is-active', m).map(c => c.dataset.role);
          if (!roles.length) { toast('Scegli almeno un\'opzione', { ico: 'flag' }); return; }
          persistMe({ openTo: { ...P.openTo, roles, area: m.querySelector('[name=area]').value } }); close(); toast('Disponibilità aggiornata');
        });
      }
    });
  }

  function addSkill() {
    modal({
      title: 'Aggiungi competenza', size: 'sm',
      body: `<label class="field"><span>Competenza *</span><input class="input" name="skill" placeholder="Es. Partnering, Pointe work, Lindy hop" list="skill-list" autofocus></label>
        <datalist id="skill-list">${D.styles ? '' : ''}${['Partnering', 'Pointe work', 'Acrobatica', 'Teatro danza', 'Popping', 'Waacking', 'Contact improvisation', 'Repertorio classico'].map(s => `<option value="${s}">`).join('')}</datalist>
        <p class="muted" style="font-size:.85rem">I tuoi collegamenti potranno confermarla dal tuo profilo.</p>`,
      foot: `<button class="btn" type="button" data-save>Aggiungi</button>`,
      onOpen(m, close) {
        const go = () => {
          const v = m.querySelector('[name=skill]').value.trim();
          if (!v) { m.querySelector('[name=skill]').setAttribute('aria-invalid', 'true'); return; }
          state.newSkills = (state.newSkills || []).concat(v); state.allSkills = true; save(); render(); close();
          toast(`“${esc(v)}” aggiunta alle competenze`);
        };
        m.querySelector('[data-save]').addEventListener('click', go);
        m.querySelector('[name=skill]').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
      }
    });
  }

  function addExp() {
    modal({
      title: 'Aggiungi esperienza',
      body: `<div class="form-grid">
        <label class="field full"><span>Ruolo *</span><input class="input" name="title" placeholder="Es. Danzatrice, Coreografa ospite, Insegnante" autofocus></label>
        <label class="field"><span>Tipo</span><select class="select" name="type"><option>Freelance</option><option>Contratto stagionale</option><option>Tempo pieno</option><option>Part-time</option><option>Tournée</option></select></label>
        <label class="field"><span>Compagnia, scuola o produzione *</span><input class="input" name="org"></label>
        <label class="field"><span>Inizio</span><input class="input" name="from" placeholder="mese anno"></label>
        <label class="field"><span>Città</span><input class="input" name="place"></label>
        <label class="field full"><span>Descrizione</span><textarea class="textarea" name="desc" placeholder="Repertorio, coreografi, teatri, numero di repliche…"></textarea></label>
      </div>`,
      foot: `<span class="left">* Obbligatorio</span><button class="btn" type="button" data-save>Salva</button>`,
      onOpen(m, close) {
        m.querySelector('[data-save]').addEventListener('click', () => {
          const v = (n) => m.querySelector(`[name=${n}]`).value.trim();
          let bad = false;
          ['title', 'org'].forEach(n => { const ok = !!v(n); m.querySelector(`[name=${n}]`).setAttribute('aria-invalid', String(!ok)); if (!ok) bad = true; });
          if (bad) return;
          const exp = [{ org: v('org'), seed: v('org').length * 37, place: v('place') || P.city, roles: [{ title: v('title'), type: v('type'), from: v('from') || 'ott 2026', to: 'presente', dur: '1 mese', desc: v('desc'), skills: [] }] }].concat(P.experience);
          persistMe({ experience: exp }); close(); toast('Esperienza aggiunta');
        });
      }
    });
  }

  function addSection() {
    const groups = [['Principali', ['Informazioni', 'Esperienza', 'Formazione', 'Competenze']], ['Consigliate', ['Video in evidenza', 'Licenze e certificazioni', 'Lezioni settimanali', 'Raccomandazioni']], ['Aggiuntive', ['Repertorio', 'Premi e riconoscimenti', 'Volontariato', 'Lingue', 'Rider tecnico']]];
    modal({
      title: 'Aggiungi al profilo',
      body: groups.map(([g, items]) => `<div><p class="eyebrow" style="margin-bottom:6px">${g}</p><div class="side-nav" style="padding:0">${items.map(i => `<button type="button" data-pick="${esc(i)}">${icon('plus')} ${esc(i)}</button>`).join('')}</div></div>`).join(''),
      onOpen(m, close) {
        m.addEventListener('click', (e) => {
          const b = e.target.closest('[data-pick]'); if (!b) return;
          close();
          const map = { 'Competenze': addSkill, 'Esperienza': addExp, 'Informazioni': editAbout };
          (map[b.dataset.pick] || (() => toast(`Sezione “${esc(b.dataset.pick)}”: disponibile nella versione completa`, { ico: 'spark' })))();
        });
      }
    });
  }

  function addVideo() {
    modal({
      title: 'Aggiungi un video in evidenza',
      body: `<label class="upload" tabindex="0">${icon('upload')}<b>Trascina qui il video o scegli un file</b><small>MP4 o MOV, fino a 2 minuti. Oppure incolla un link qui sotto.</small><input type="file" accept="video/*" hidden></label>
        <label class="field"><span>Link YouTube o Vimeo</span><input class="input" placeholder="https://"></label>
        <label class="field"><span>Titolo</span><input class="input" placeholder="Es. Assolo da “Sottopelle”, 2023"></label>`,
      foot: `<button class="btn" type="button" data-save>Aggiungi</button>`,
      onOpen(m, close) {
        const up = m.querySelector('.upload'), fi = up.querySelector('input');
        up.addEventListener('click', () => fi.click());
        up.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fi.click(); } });
        fi.addEventListener('change', () => { if (fi.files[0]) up.querySelector('b').textContent = fi.files[0].name; });
        m.querySelector('[data-save]').addEventListener('click', () => { state.strengthDone = 1; save(); render(); close(); toast('Video aggiunto. Il tuo profilo ora è completo'); });
      }
    });
  }

  function recommend() {
    modal({
      title: `Raccomanda ${esc(P.name.split(' ')[0])}`,
      body: `<label class="field"><span>Come vi conoscete?</span><select class="select"><option>Abbiamo lavorato nella stessa produzione</option><option>Ero insegnante di ${esc(P.name.split(' ')[0])}</option><option>Ho preso lezione da ${esc(P.name.split(' ')[0])}</option><option>Abbiamo insegnato nella stessa scuola</option></select></label>
        <label class="field"><span>Raccomandazione</span><textarea class="textarea" placeholder="Cosa rende speciale il suo lavoro in sala o sul palco?" autofocus></textarea></label>`,
      foot: `<button class="btn" type="button" data-save>Invia</button>`,
      onOpen(m, close) { m.querySelector('[data-save]').addEventListener('click', () => { close(); toast(`Raccomandazione inviata a ${esc(P.name)}. La vedrà prima della pubblicazione.`); }); }
    });
  }

  function contactInfo() {
    modal({
      title: esc(P.name), size: 'sm',
      body: `<h3 style="font-size:1.05rem">Informazioni di contatto</h3>
        <div class="side-nav" style="padding:0">
          <a href="profile.html${isMe ? '' : '?id=' + P.id}">${icon('link')} <span><b style="display:block;font-size:.85rem">Il tuo profilo</b>${esc(isMe ? P.url : 'frankdanza.it/in/' + P.id)}</span></a>
          ${isMe ? `<a href="mailto:${esc(P.email)}">${icon('mail')} <span><b style="display:block;font-size:.85rem">Email</b>${esc(P.email)}</span></a>` : ''}
          <a href="#">${icon('globe')} <span><b style="display:block;font-size:.85rem">Sito</b>${isMe ? 'studiocorpolibero.it' : 'Visibile dopo il collegamento'}</span></a>
        </div>`
    });
  }

  /* ---------- Azioni ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    render();
    const main = $('#main');
    main.addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      if (tab) { state.actTab = tab.dataset.tab; save(); render(); $('#attivita').scrollIntoView({ block: 'nearest' }); return; }
      const rt = e.target.closest('[data-reco]');
      if (rt) { state.recoTab = rt.dataset.reco; save(); render(); return; }
      const sc = e.target.closest('[data-connect]');
      if (sc) { const id = sc.dataset.connect; const on = !getIn('conn', id); setIn('conn', id, on ? 'wait' : undefined); sc.classList.toggle('is-done', on); sc.innerHTML = `${icon(on ? 'clock' : 'userPlus')} ${on ? 'In attesa' : 'Collegati'}`; if (on) toast(`Invito inviato a ${esc(ent(id).name)}`, { ico: 'userPlus', action: { label: 'Annulla', run: () => { setIn('conn', id, undefined); sc.classList.remove('is-done'); sc.innerHTML = `${icon('userPlus')} Collegati`; } } }); return; }
      const a = e.target.closest('[data-act]');
      if (!a) return;
      const act = a.dataset.act;
      if (act !== 'more-about') e.preventDefault();
      const actions = {
        intro: editIntro, about: editAbout, open: editOpen, addskill: addSkill, addexp: addExp, section: addSection, addvideo: addVideo, reco: recommend, contact: contactInfo,
        improve: () => { $('.strength-tip') ? $('.strength-tip').closest('.card').scrollIntoView({ behavior: F.reduceMotion ? 'auto' : 'smooth', block: 'center' }) : null; },
        compose: () => { location.href = 'feed.html#pubblica'; },
        share: () => { const url = 'https://' + D.me.url; (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => toast('Link al profilo copiato'), () => toast(url, { ico: 'link' })); },
        cover: () => { coverSeed = (coverSeed * 7 + 13) % 997; state.coverSeed = coverSeed; save(); $('#p-cover').firstElementChild.outerHTML = art(coverSeed, { w: 1200, h: 300, ribbons: 6, animated: true }); toast('Nuova copertina applicata', { ico: 'image' }); },
        'more-about': () => { $('#about-text').classList.remove('is-clamped'); a.remove(); },
        allskills: () => { state.allSkills = !state.allSkills; save(); render(); $('#competenze').scrollIntoView({ block: 'nearest' }); },
        endorse: () => {
          const k = P.id + ':' + a.dataset.i, on = !getIn('endorse', k);
          setIn('endorse', k, on || undefined); render();
          if (on) toast(`Hai confermato “${esc(P.skills[a.dataset.i].name)}”`, { ico: 'check' });
        },
        connect: () => { const on = getIn('conn', P.id) !== 'wait'; setIn('conn', P.id, on ? 'wait' : undefined); render(); if (on) toast(`Invito inviato a ${esc(P.name)}`, { ico: 'userPlus' }); },
        follow: () => { const on = !getIn('follow', P.id); setIn('follow', P.id, on || undefined); render(); toast(on ? `Ora segui ${esc(P.name)}` : `Non segui più ${esc(P.name)}`); },
        askreco: () => toast('Scegli un collegamento dalla tua rete: disponibile nella versione completa', { ico: 'spark' }),
        cred: () => toast(`Credenziale ${esc(a.dataset.code)} verificabile su frankdanza.it/verifica`, { ico: 'shield' }),
        addclass: () => toast('Nuova lezione: disponibile nella versione completa', { ico: 'calendar' }),
        soon: () => toast('Disponibile nella versione completa', { ico: 'spark' })
      };
      (actions[act] || actions.soon)();
    });
  });
})();
