document.addEventListener('DOMContentLoaded', () => {
  const { dancers } = window.FD_DATA;
  const { art, photo, icon, initials, roleLabel, esc, dancerCard, observe, counters } = window.FD;
  const M = window.FD_MEDIA || { portrait: {}, gallery: {} };
  const main = document.getElementById('main');

  const id = new URLSearchParams(location.search).get('id');
  const d = id ? dancers.find(x => x.id === id) : dancers[0];

  if (!d) {
    main.innerHTML = `<section class="not-found wrap">
      <div>
        <h1>Questo profilo è uscito di scena</h1>
        <p>Il link potrebbe essere vecchio oppure il profilo è stato rimosso. Cerca tra gli altri talenti della community.</p>
        <a class="btn" href="dancers.html">Torna ai talenti ${icon('arrow')}</a>
      </div></section>`;
    return;
  }

  document.title = `${d.name} · ${roleLabel(d.role)} di ${d.styles[0]} a ${d.city} · FrankDanza`;
  const [first, ...rest] = d.name.split(' ');
  const verifiedCount = d.certs.filter(c => c.verified).length;
  const isTeacher = d.role === 'istruttore';

  /* ---------- Radar delle skill ---------- */
  function radar(skills) {
    const cx = 200, cy = 200, R = 130, n = skills.length;
    const pt = (i, r) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    };
    const rings = [.25, .5, .75, 1].map(f =>
      `<polygon class="grid-ring" points="${skills.map((_, i) => pt(i, R * f).join(',')).join(' ')}"/>`).join('');
    const axes = skills.map((_, i) => { const [x, y] = pt(i, R); return `<line class="axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`; }).join('');
    const shapePts = skills.map((s, i) => pt(i, R * s.value / 100).join(',')).join(' ');
    const nodes = skills.map((s, i) => { const [x, y] = pt(i, R * s.value / 100); return `<circle class="node" cx="${x}" cy="${y}" r="4.5"/>`; }).join('');
    const labels = skills.map((s, i) => {
      const [x, y] = pt(i, R + 26);
      const anchor = Math.abs(x - cx) < 4 ? 'middle' : x > cx ? 'start' : 'end';
      return `<text x="${x}" y="${y + 7}" text-anchor="${anchor}">${esc(s.name)}</text>`;
    }).join('');
    return `<svg class="radar" viewBox="-130 20 660 360" role="img" aria-label="Grafico delle skill">
      ${rings}${axes}<polygon class="shape-glow" points="${shapePts}"/><polygon class="shape" points="${shapePts}"/>${nodes}${labels}</svg>`;
  }

  const medal = (verified) => `<svg class="cert-medal" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <circle class="medal-ring" cx="32" cy="32" r="29" stroke="${verified ? '#3346FF' : '#8A8A94'}" stroke-width="2" stroke-dasharray="3 6"/>
    <circle cx="32" cy="32" r="22" fill="${verified ? 'rgba(51,70,255,.1)' : 'rgba(18,18,20,.05)'}"/>
    <g transform="translate(20 20)" stroke="${verified ? '#3346FF' : '#8A8A94'}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="9" r="5.5"/><path d="m8.6 13.4-1.6 7.1 5-2.6 5 2.6-1.6-7.1"/>
    </g></svg>`;

  const seal = `<svg class="verified-seal" viewBox="0 0 100 100" aria-label="Profilo verificato" role="img">
    <defs><path id="seal-c" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1 -76 0"/></defs>
    <circle cx="50" cy="50" r="48" fill="rgba(18,18,20,.55)"/>
    <g class="ring-text"><text><textPath href="#seal-c">Profilo verificato • FrankDanza •</textPath></text></g>
    <circle cx="50" cy="50" r="20" fill="#3346FF"/>
    <path d="m41 50.5 6 6L59.5 44" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const sections = [
    { id: 'chi', label: 'Chi è' },
    { id: 'skill', label: 'Skill' },
    { id: 'certificazioni', label: 'Certificazioni' },
    { id: 'esperienza', label: 'Esperienza' },
    { id: 'lezioni', label: isTeacher ? 'Lezioni' : 'Disponibilità' },
    { id: 'galleria', label: 'Galleria' },
    { id: 'contatta', label: 'Contatta' }
  ];

  const similar = dancers
    .filter(x => x.id !== d.id)
    .map(x => ({ x, score: x.styles.filter(s => d.styles.includes(s)).length * 2 + (x.city === d.city ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || b.x.rating - a.x.rating)
    .slice(0, 4).map(o => o.x);

  main.innerHTML = `
  <section class="profile-hero wrap">
    <a class="back-link" href="dancers.html">${icon('back')} Tutti i talenti</a>
    <div class="profile-top">
      <div class="portrait">
        ${photo(M.portrait[d.id], 440, 550, { alt: `${d.name}, ${roleLabel(d.role).toLowerCase()} di ${d.styles[0]}`, eager: true, seed: d.seed })}
        ${M.portrait[d.id] ? '' : `<span class="portrait-initials" aria-hidden="true">${initials(d.name)}</span>`}
        <span class="role-tag role-${d.role}">${roleLabel(d.role)}</span>
        ${verifiedCount ? seal : ''}
      </div>
      <div class="profile-info">
        <h1><span><span>${esc(first)}</span></span><span><span>${esc(rest.join(' '))}</span></span></h1>
        <p class="tagline">${esc(d.tagline)}</p>
        <div class="profile-meta">
          <span>${icon('pin')} ${esc(d.city)}</span>
          <span>${icon('star', 'icon-fill')} ${d.rating.toFixed(1)} · ${d.reviews} recensioni</span>
          <span>${icon('award')} Livello ${esc(d.level.toLowerCase())}</span>
          <span>${d.available ? '<span class="avail-dot" style="display:inline-block"></span> Disponibile per ingaggi' : `${icon('clock')} Agenda piena fino a gennaio`}</span>
        </div>
        <ul class="profile-styles">${d.styles.map(s => `<li><a class="chip" href="dancers.html?style=${encodeURIComponent(s)}">${esc(s)}</a></li>`).join('')}</ul>
        <div class="profile-actions">
          <a class="btn" href="#contatta">${isTeacher ? 'Prenota una lezione' : 'Proponi un ingaggio'} ${icon('arrow')}</a>
          <a class="btn btn-ghost" href="#" aria-label="Instagram di ${esc(d.name)}">${icon('instagram')} Instagram</a>
        </div>
      </div>
    </div>

    <div class="facts">
      <div class="fact"><b data-count="${d.years}">0</b><span>anni di danza</span></div>
      <div class="fact"><b data-count="${d.certs.length}">0</b><span>certificazioni</span></div>
      <div class="fact"><b data-count="${isTeacher ? d.students : d.experience.length}">0</b><span>${isTeacher ? 'allievi formati' : 'produzioni'}</span></div>
      <div class="fact"><b data-count="${d.rating.toFixed(1)}">0</b><span>valutazione media</span></div>
    </div>
  </section>

  <div class="wrap profile-layout">
    <nav class="toc" aria-label="Sezioni del profilo">
      ${sections.map(s => `<a href="#${s.id}">${s.label}</a>`).join('')}
    </nav>
    <div class="profile-sections">
      <section id="chi">
        <h2 data-reveal="clip">Chi è</h2>
        <p class="bio" data-reveal="up">${esc(d.bio)}</p>
        <p class="langs">${icon('globe')} Parla ${d.languages.map(esc).join(', ')}</p>
      </section>

      <section id="skill">
        <h2 data-reveal="clip">Skill</h2>
        <div class="skills" data-reveal>
          ${radar(d.skills)}
          <div class="skill-list">
            ${d.skills.map((s, i) => `<div class="skill-row">
              <header><b>${esc(s.name)}</b><span>${s.value}</span></header>
              <div class="bar" role="meter" aria-valuenow="${s.value}" aria-valuemin="0" aria-valuemax="100" aria-label="${esc(s.name)}"><i style="--v:${s.value}%;--i:${i}"></i></div>
            </div>`).join('')}
          </div>
        </div>
      </section>

      <section id="certificazioni">
        <h2 data-reveal="clip">Certificazioni</h2>
        <div class="certs">
          ${d.certs.map((c, i) => `<article class="cert" data-reveal="up" style="--i:${i}">
            ${medal(c.verified)}
            <div>
              <h3>${esc(c.title)}</h3>
              <p>${esc(c.issuer)}</p>
              <code>${esc(c.code)}</code>
            </div>
            <div class="cert-side">
              <span class="cert-year">${c.year}</span>
              ${c.verified
                ? `<span class="badge badge-ok">${icon('shield')} Verificata</span>`
                : `<span class="badge badge-wait">${icon('clock')} In verifica</span>`}
            </div>
          </article>`).join('')}
        </div>
      </section>

      <section id="esperienza">
        <h2 data-reveal="clip">Esperienza</h2>
        <ol class="timeline" data-reveal>
          ${d.experience.map((e, i) => `<li class="tl-item" data-reveal="side" style="--i:${i + 1}">
            <time>${esc(e.year)}</time><h3>${esc(e.title)}</h3><p>${esc(e.place)}</p>
          </li>`).join('')}
        </ol>
      </section>

      <section id="lezioni">
        <h2 data-reveal="clip">${isTeacher ? 'Lezioni settimanali' : 'Disponibilità'}</h2>
        ${d.classes.length ? `<div class="schedule">
          ${d.classes.map((c, i) => `<div class="class-row" data-reveal="up" style="--i:${i}">
            <span class="class-day">${esc(c.day)}</span>
            <div><h3>${esc(c.style)}</h3><p>${icon('pin')} ${esc(c.place)}</p></div>
            <span class="class-time">${icon('clock')} ${esc(c.time)} · ${esc(c.level)}</span>
            <a class="btn btn-ghost btn-sm" href="#contatta" data-class="${esc(c.style)}, ${esc(c.day)} ${esc(c.time)}">Iscriviti</a>
          </div>`).join('')}
        </div>` : `<div class="empty-inline" data-reveal="up">${icon('calendar')}
          <p>${d.available
            ? `${esc(first)} non tiene corsi regolari ed è disponibile per produzioni, videoclip ed eventi. Scrivi le date nel modulo qui sotto.`
            : `${esc(first)} al momento non accetta nuovi ingaggi. Puoi comunque inviare una richiesta per i prossimi mesi.`}</p></div>`}
      </section>

      <section id="galleria">
        <h2 data-reveal="clip">Galleria</h2>
        <div class="gallery">
          ${[['showreel', 'Showreel 2026'], ['prove', 'Prove'], ['backstage', 'Backstage'], ['palco', 'Sul palco'], ['workshop', 'Workshop']].map(([key, cap], i) => `<figure data-reveal="scale" style="--i:${i}">
            ${photo(M.gallery[key], i === 0 ? 640 : 320, i === 0 ? 400 : 260, { alt: cap, seed: d.seed * 7 + i * 13 })}
            ${i === 0 ? `<span class="play" aria-hidden="true">${icon('play', 'icon-fill')}</span>` : ''}
            <figcaption>${cap}</figcaption>
          </figure>`).join('')}
        </div>
      </section>

      <section id="contatta">
        <div class="contact" data-reveal="blur">
          <svg class="contact-art" viewBox="0 0 400 300" fill="none" aria-hidden="true">
            <path d="M0 250C80 100 160 300 240 160S360 40 400 80" stroke="#FF70BF" stroke-width="18" stroke-linecap="round">
              <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0 250C80 100 160 300 240 160S360 40 400 80;M0 220C90 140 150 260 250 190S350 60 400 110;M0 250C80 100 160 300 240 160S360 40 400 80"/>
            </path>
          </svg>
          <div>
            <h2>Scrivi a ${esc(first)}</h2>
            <p>${isTeacher ? 'Chiedi informazioni su lezioni private, corsi o workshop.' : 'Racconta il progetto: date, luogo, tipo di performance e compenso previsto.'} Di solito risponde entro 24 ore.</p>
          </div>
          <form class="form" id="contact-form" novalidate>
            <label>Nome e cognome<input class="input" name="name" autocomplete="name" required><span class="err"></span></label>
            <label>Email<input class="input" name="email" type="email" autocomplete="email" required><span class="err"></span></label>
            <label>Tipo di richiesta
              <select class="select" name="type">
                ${isTeacher ? '<option>Lezione di prova</option><option>Lezione privata</option><option>Workshop</option>' : ''}
                <option>Ingaggio</option><option>Collaborazione</option>
              </select>
            </label>
            <label>Data indicativa<input class="input" name="date" type="date"></label>
            <label class="full">Messaggio<textarea name="message" required minlength="20" placeholder="Ciao ${esc(first)}, vorrei…"></textarea><span class="err"></span></label>
            <div class="full"><button class="btn" type="submit">Invia richiesta ${icon('arrow')}</button></div>
            <div class="form-status" role="status">
              <svg viewBox="0 0 34 34" fill="none" aria-hidden="true"><circle cx="17" cy="17" r="16" fill="rgba(27,138,76,.14)"/><path d="m10 17.5 4.5 4.5L24 12.5" stroke="#1B8A4C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>Richiesta inviata. ${esc(first)} riceverà una notifica e ti risponderà via email.</span>
            </div>
          </form>
        </div>
      </section>
    </div>
  </div>

  <section class="featured section" aria-labelledby="sim-title" style="padding-bottom:0">
    <div class="wrap section-head"><h2 id="sim-title" class="section-title" data-reveal="clip">Potrebbero interessarti</h2></div>
    <div class="rail">${similar.map((x, i) => dancerCard(x, i)).join('')}</div>
  </section>`;

  /* ---------- Indice attivo ---------- */
  const tocLinks = [...document.querySelectorAll('.toc a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      tocLinks.forEach(a => {
        const on = a.getAttribute('href') === `#${e.target.id}`;
        a.classList.toggle('is-active', on);
        if (on && window.innerWidth < 960) a.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
      });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach(s => spy.observe(document.getElementById(s.id)));

  /* ---------- Modulo di contatto ---------- */
  const form = document.getElementById('contact-form');
  const msgs = {
    name: 'Scrivi il tuo nome, così sa chi la contatta.',
    email: 'Serve un indirizzo email valido per ricevere la risposta.',
    message: 'Racconta un po\' di più: almeno 20 caratteri.'
  };
  const check = (el) => {
    const ok = el.checkValidity();
    el.setAttribute('aria-invalid', String(!ok));
    const err = el.parentElement.querySelector('.err');
    if (err) err.textContent = ok ? '' : msgs[el.name];
    return ok;
  };
  form.querySelectorAll('[required]').forEach(el => el.addEventListener('blur', () => check(el)));

  document.querySelectorAll('[data-class]').forEach(a => a.addEventListener('click', () => {
    form.message.value = `Ciao ${first}, vorrei iscrivermi a: ${a.dataset.class}.`;
    if (form.type.options[0]) form.type.selectedIndex = 0;
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll('[required]')];
    const valid = fields.map(check).every(Boolean);
    if (!valid) { fields.find(f => f.getAttribute('aria-invalid') === 'true')?.focus(); return; }
    const btn = form.querySelector('button[type="submit"]');
    btn.classList.add('is-loading');
    // Simulazione invio: sostituire con la chiamata API reale
    setTimeout(() => {
      btn.classList.remove('is-loading');
      form.querySelector('.form-status').classList.add('is-shown');
      form.reset();
    }, 1200);
  });

  observe();
  counters();
});
