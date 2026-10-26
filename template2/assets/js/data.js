/* Dati di esempio dell'area riservata, sostituire con le API reali.
   Le foto delle persone arrivano da FD_MEDIA.portrait (stesso id); chi non ha foto riceve un artwork con le iniziali. */
window.FD_DATA = {
  today: '2026-10-26',

  me: {
    id: 'giulia-ferraro', name: 'Giulia Ferraro', pronouns: 'lei',
    headline: 'Coreografa e insegnante di danza contemporanea · Direttrice artistica di Studio Corpo Libero',
    city: 'Milano, Lombardia', email: 'giulia@frankdanza.it', url: 'frankdanza.it/in/giulia-ferraro',
    connections: 512, followers: 2418, seed: 11, verified: true,
    stats: { views: 184, viewsDelta: 23, impressions: 3902, impressionsDelta: 41, searches: 61 },
    openTo: { title: 'Disponibile per', roles: ['Workshop', 'Lezioni private', 'Produzioni teatrali', 'Residenze'], area: 'Milano e in trasferta in Europa' },
    hiring: { title: 'Cerca nuovi insegnanti', roles: ['Insegnante Floor work', 'Assistente coreografa'] },
    about: 'Formata all\'Accademia Teatro alla Scala, ho danzato per sei stagioni con compagnie di contemporaneo in Europa, tra Gent e Reggio Emilia.\n\nOggi insegno release technique e floor work, con un approccio che parte dal respiro e arriva alla composizione coreografica. Dirigo Studio Corpo Libero a Milano, dove ogni anno passano più di 300 allieve e allievi tra corsi, intensivi e residenze.\n\nCollaboro con teatri e festival come coreografa ospite e cerco sempre danzatori curiosi con cui costruire nuovi lavori. Scrivimi per workshop, lezioni private o progetti di creazione.',
    topSkills: ['Contemporaneo', 'Floor work', 'Composizione coreografica', 'Release technique', 'Didattica'],
    featured: [
      { kind: 'Video', title: 'Showreel 2026: "Sottopelle" e altri lavori', meta: '3:42 · 12.430 visualizzazioni', media: 'gallery.palco', video: true },
      { kind: 'Post', title: 'Cosa ho imparato in dieci anni di floor work', meta: '842 reazioni · 96 commenti', media: 'style.Contemporaneo' },
      { kind: 'Link', title: 'Intensivo estivo 2027: aperte le iscrizioni', meta: 'studiocorpolibero.it', media: 'gallery.workshop' }
    ],
    experience: [
      { org: 'Studio Corpo Libero', seed: 201, place: 'Milano', roles: [
        { title: 'Direttrice artistica', type: 'Tempo pieno', from: 'gen 2020', to: 'presente', dur: '6 anni 10 mesi', desc: 'Ho fondato lo studio e ne curo la programmazione: 14 corsi settimanali, tre intensivi l\'anno e una residenza per giovani coreografi.', skills: ['Direzione artistica', 'Didattica', 'Composizione coreografica'] },
        { title: 'Insegnante di contemporaneo e floor work', type: 'Part-time', from: 'set 2018', to: 'dic 2019', dur: '1 anno 4 mesi', desc: '', skills: ['Floor work', 'Release technique'] }
      ] },
      { org: 'Triennale Milano', seed: 211, place: 'Milano', roles: [
        { title: 'Coreografa ospite, "Sottopelle"', type: 'Freelance', from: 'mar 2023', to: 'nov 2023', dur: '9 mesi', desc: 'Creazione per sei danzatori e musica dal vivo. Debutto a novembre 2023, 11 repliche sold out.', skills: ['Coreografia', 'Regia'], media: ['gallery.palco', 'gallery.prove'] }
      ] },
      { org: 'Compagnia Aterballetto', seed: 223, place: 'Reggio Emilia', roles: [
        { title: 'Danzatrice solista', type: 'Contratto stagionale', from: 'set 2016', to: 'lug 2019', dur: '2 anni 11 mesi', desc: 'Repertorio contemporaneo e nuove creazioni, tournée in Italia, Francia, Germania e Spagna.', skills: ['Repertorio contemporaneo', 'Partnering'] }
      ] },
      { org: 'Les Ballets C de la B', seed: 233, place: 'Gent, Belgio', roles: [
        { title: 'Danzatrice, ensemble', type: 'Contratto stagionale', from: 'set 2013', to: 'giu 2016', dur: '2 anni 10 mesi', desc: '', skills: ['Improvvisazione', 'Teatro danza'] }
      ] }
    ],
    education: [
      { org: 'Accademia Teatro alla Scala', seed: 241, title: 'Diploma, Danza contemporanea', when: '2008 – 2012', desc: 'Votazione: con lode. Corso di composizione con laboratorio finale al Piccolo Teatro.' },
      { org: 'Università degli Studi di Milano', seed: 251, title: 'Laurea triennale, Scienze dei beni culturali, indirizzo spettacolo', when: '2012 – 2016', desc: '' }
    ],
    certs: [
      { title: 'Release Technique Teacher', issuer: 'Trisha Brown Studio Programme', seed: 261, when: 'Rilasciato mag 2017', code: 'TB-RT-0331', verified: true },
      { title: 'Pilates per danzatori, Livello 2', issuer: 'FIF Fitness', seed: 271, when: 'Rilasciato feb 2019', code: 'FIF-PD2-7781', verified: true },
      { title: 'Primo soccorso BLSD', issuer: 'Croce Rossa Italiana', seed: 281, when: 'Rilasciato set 2024 · Scadenza set 2026', code: 'CRI-BLSD-24-0912', verified: false }
    ],
    skills: [
      { name: 'Danza contemporanea', ctx: '3 esperienze in Studio Corpo Libero e altre', n: 87, by: ['marco-deluca', 'beatrice-fontana', 'luca-conti'] },
      { name: 'Floor work', ctx: 'Insegnante di contemporaneo e floor work in Studio Corpo Libero', n: 54, by: ['luca-conti', 'chiara-longo'] },
      { name: 'Composizione coreografica', ctx: 'Coreografa ospite in Triennale Milano', n: 41, by: ['elena-russo', 'tommaso-galli'] },
      { name: 'Release technique', ctx: 'Release Technique Teacher, Trisha Brown Studio Programme', n: 33, by: ['nadia-esposito'] },
      { name: 'Didattica della danza', ctx: 'Direttrice artistica in Studio Corpo Libero', n: 29, by: ['beatrice-fontana', 'sofia-marino'] },
      { name: 'Improvvisazione', ctx: 'Danzatrice in Les Ballets C de la B', n: 18, by: ['aurora-bianchi'] }
    ],
    recommendations: {
      received: [
        { from: 'beatrice-fontana', rel: '12 marzo 2025, Beatrice ha lavorato con Giulia in team diversi', text: 'Ho mandato a Giulia tre delle mie allieve più promettenti per l\'intensivo estivo. Sono tornate con un\'altra idea del peso, del pavimento e soprattutto dell\'ascolto. Giulia sa spiegare con chiarezza cose che di solito si imparano solo in anni di palco.' },
        { from: 'luca-conti', rel: '4 novembre 2024, Luca era allievo di Giulia', text: 'Venivo dal breaking e non sapevo come portare quella fisicità nel contemporaneo. In un anno a Corpo Libero ho trovato un linguaggio mio. Severa quando serve, generosa sempre.' }
      ],
      given: [
        { from: 'marco-deluca', rel: '20 gennaio 2026, Giulia ha collaborato con Marco', text: 'Marco ha curato la parte urban di "Sottopelle" con una precisione rara: musicalità, pazienza con i danzatori, zero ego. Lo richiamerei domani.' }
      ]
    },
    languages: [
      { name: 'Italiano', level: 'Madrelingua o bilingue' },
      { name: 'Inglese', level: 'Competenza professionale completa' },
      { name: 'Francese', level: 'Competenza professionale' }
    ],
    classes: [
      { day: 'Lun', time: '19:00–20:30', style: 'Contemporaneo', level: 'Intermedio', place: 'Studio Corpo Libero', spots: 4, total: 18 },
      { day: 'Mer', time: '18:30–20:00', style: 'Floor work', level: 'Avanzato', place: 'Studio Corpo Libero', spots: 0, total: 14 },
      { day: 'Sab', time: '11:00–13:00', style: 'Composizione', level: 'Tutti', place: 'Fabbrica del Vapore', spots: 9, total: 20 }
    ],
    awards: [
      { title: 'Premio Danza&Danza, Coreografa emergente', issuer: 'Danza&Danza', when: '2023', seed: 291 },
      { title: 'Finalista, Concorso Coreografico "Nuove Rotte"', issuer: 'Festival Corpi Urbani', when: '2021', seed: 301 }
    ],
    activity: [
      { kind: 'post', when: '2 g', text: 'Ultima settimana per iscriversi all\'intensivo di floor work di dicembre. Restano 6 posti, priorità a chi ha già fatto il livello base.', stat: '214 reazioni · 31 commenti' },
      { kind: 'comment', when: '4 g', text: 'Ha commentato un post di Marco De Luca: "La cypher di sabato è stata una lezione di ascolto per tutti. Grazie per averci ospitati."', stat: '48 reazioni' },
      { kind: 'post', when: '1 sett', text: 'Prove aperte di "Corpi d\'acqua" il 14 novembre in Fabbrica del Vapore. Ingresso libero fino a esaurimento posti.', stat: '532 reazioni · 64 commenti' },
      { kind: 'video', when: '3 sett', text: 'Tre minuti di improvvisazione guidata su "Spiegel im Spiegel": il riscaldamento che facciamo ogni lunedì.', stat: '1.204 visualizzazioni' }
    ]
  },

  /* Persone e pagine: deg = grado di collegamento (1 = già collegato) */
  people: {
    'marco-deluca': { name: 'Marco De Luca', headline: 'Insegnante hip hop e popping · Giudice WDSF Breaking · Fondatore Groove Lab Crew', city: 'Roma', deg: 1, mutual: 48, seed: 23, followers: 3120, online: true },
    'sofia-marino': { name: 'Sofia Marino', headline: 'Ballerina classica e jazz · Corpo di ballo Teatro Regio Torino', city: 'Torino', deg: 1, mutual: 21, seed: 37, followers: 980 },
    'carlos-rivera': { name: 'Carlos Rivera', headline: 'Maestro di salsa cubana e bachata · Campione italiano 2016 · Casa de la Clave', city: 'Bologna', deg: 2, mutual: 12, seed: 41, followers: 5410 },
    'aurora-bianchi': { name: 'Aurora Bianchi', headline: 'Heels performer per moda e videoclip · Waacking', city: 'Milano', deg: 1, mutual: 33, seed: 53, followers: 7800, online: true },
    'elena-russo': { name: 'Elena Russo', headline: 'Maestra di tango argentino · Organizzatrice Milonga del Molo', city: 'Napoli', deg: 2, mutual: 7, seed: 67, followers: 1650 },
    'luca-conti': { name: 'Luca Conti', headline: 'Danzatore contemporaneo e b-boy · In cerca di residenze e produzioni', city: 'Firenze', deg: 1, mutual: 19, seed: 79, followers: 610 },
    'nadia-esposito': { name: 'Nadia Esposito', headline: 'Insegnante di kizomba e bachata · Direttrice Puglia Kizz Festival', city: 'Bari', deg: 2, mutual: 9, seed: 83, followers: 4230 },
    'tommaso-galli': { name: 'Tommaso Galli', headline: 'Primo ballerino ospite · Repertorio classico e neoclassico', city: 'Verona', deg: 1, mutual: 26, seed: 97, followers: 2210 },
    'chiara-longo': { name: 'Chiara Longo', headline: 'Coreografa hip hop e heels · Mood Studio', city: 'Torino', deg: 2, mutual: 15, seed: 103, followers: 1890 },
    'ivan-moretti': { name: 'Ivan Moretti', headline: 'Danzatore di danze latine, classe A · Performer TV', city: 'Roma', deg: 3, mutual: 2, seed: 109, followers: 720 },
    'beatrice-fontana': { name: 'Beatrice Fontana', headline: 'Insegnante metodo Vaganova · Direttrice didattica Scuola Danza Oltrarno', city: 'Firenze', deg: 1, mutual: 31, seed: 127, followers: 2940 },
    'davide-serra': { name: 'Davide Serra', headline: 'Direttore del casting · Compagnia Linea d\'Ombra', city: 'Torino', deg: 2, mutual: 11, seed: 137, followers: 1340 },
    'martina-greco': { name: 'Martina Greco', headline: 'Allieva del corso professionale · Contemporaneo e modern', city: 'Milano', deg: 2, mutual: 6, seed: 149, followers: 210 },
    'paolo-rinaldi': { name: 'Paolo Rinaldi', headline: 'Fisioterapista per danzatori · Prevenzione infortuni', city: 'Milano', deg: 2, mutual: 14, seed: 151, followers: 880 },
    'irene-valli': { name: 'Irene Valli', headline: 'Light designer per danza e teatro', city: 'Bologna', deg: 2, mutual: 8, seed: 163, followers: 530 },
    'samuele-ricci': { name: 'Samuele Ricci', headline: 'Compositore per la danza · Musica dal vivo in sala', city: 'Milano', deg: 2, mutual: 17, seed: 173, followers: 1120 },
    'anna-lombardi': { name: 'Anna Lombardi', headline: 'Organizzatrice Festival Corpi Urbani', city: 'Roma', deg: 2, mutual: 10, seed: 181, followers: 3010 }
  },

  pages: {
    'studio-corpo-libero': { name: 'Studio Corpo Libero', headline: 'Scuola di danza contemporanea · Milano', seed: 201, followers: 4120 },
    'linea-ombra': { name: 'Compagnia Linea d\'Ombra', headline: 'Compagnia di danza contemporanea · Torino', seed: 311, followers: 8640 },
    'corpi-urbani': { name: 'Festival Corpi Urbani', headline: 'Festival di danza urbana e contemporanea · Roma', seed: 301, followers: 12300 },
    'groove-lab': { name: 'Groove Lab', headline: 'Hip hop school & crew · Roma', seed: 321, followers: 6020 },
    'danza-oltrarno': { name: 'Scuola Danza Oltrarno', headline: 'Danza classica, metodo Vaganova · Firenze', seed: 331, followers: 2780 },
    'teatro-civico': { name: 'Teatro Civico di Lambrate', headline: 'Teatro e danza contemporanea · Milano', seed: 341, followers: 5300 },
    'mood-studio': { name: 'Mood Studio', headline: 'Hip hop, heels e commercial · Torino', seed: 351, followers: 3940 }
  },

  /* Reazioni a tema danza */
  reactions: [
    { id: 'clap', emoji: '👏', label: 'Applauso' },
    { id: 'fire', emoji: '🔥', label: 'Fuoco' },
    { id: 'heart', emoji: '❤️', label: 'Cuore' },
    { id: 'bis', emoji: '🎭', label: 'Bis!' },
    { id: 'idea', emoji: '💡', label: 'Ispirante' },
    { id: 'wow', emoji: '😮', label: 'Wow' }
  ],

  posts: [
    { id: 'p1', author: 'marco-deluca', when: '2 h', ctx: { who: 'aurora-bianchi', what: 'ha reagito con 🔥' },
      text: 'Sabato all\'Ex Dogana abbiamo fatto la cypher più bella dell\'anno: 140 persone in cerchio, dai 9 ai 56 anni.\n\nLa cosa che mi porto a casa? Nessuno ha guardato il telefono per tre ore. Si ballava, si ascoltava, si tifava per chi entrava nel cerchio per la prima volta.\n\nGrazie a tutte le crew che sono salite da Napoli e da Firenze. Prossimo appuntamento l\'8 novembre, stessa ora, stessa energia. #hiphop #cypher #roma',
      media: { type: 'grid', items: ['gallery.showreel', 'style.Breaking', 'style.Hip Hop'] },
      rx: { total: 486, top: ['fire', 'clap', 'heart'] }, comments: 52, reposts: 18,
      thread: [
        { who: 'luca-conti', when: '1 h', text: 'Ero lì per la prima volta, il cerchio finale con tutti i bambini dentro non me lo dimentico.', likes: 14 },
        { who: 'anna-lombardi', when: '45 min', text: 'Vi aspettiamo anche al Festival Corpi Urbani, avete il palco della domenica se lo volete 🙌', likes: 9 }
      ] },
    { id: 'p2', author: 'page:linea-ombra', when: '5 h', sponsored: false,
      text: 'AUDIZIONE · Stagione 2027\nCerchiamo 2 danzatrici e 2 danzatori (20–32 anni) per la nuova creazione di Lucia Neri, debutto a Torino a marzo 2027 e tournée europea.\n\nContratto stagionale CCNL, alloggio in tournée a carico della compagnia. Candidature tramite FrankDanza entro il 15 novembre.',
      job: 'j1', rx: { total: 1204, top: ['clap', 'fire', 'idea'] }, comments: 138, reposts: 241, thread: [] },
    { id: 'p3', author: 'beatrice-fontana', when: '1 g', poll: { q: 'Quanti minuti di sbarra fate fare a chi ricomincia da adulto?', opts: [{ t: 'Meno di 20', v: 38 }, { t: '20–30 minuti', v: 151 }, { t: '30–45 minuti', v: 212 }, { t: 'Lezione intera alla sbarra', v: 46 }], ends: 'Mancano 3 giorni' },
      text: 'Domanda per colleghe e colleghi che insegnano classica agli adulti. Da noi in Oltrarno stiamo ripensando il corso "Ritorno alla sbarra" e vorrei capire come lavorate voi.',
      rx: { total: 132, top: ['idea', 'clap'] }, comments: 47, reposts: 3, thread: [] },
    { id: 'p4', author: 'aurora-bianchi', when: '1 g',
      text: 'Backstage di ieri sera per l\'apertura della sfilata. 12 cm di tacco, 4 minuti di coreografia e una passerella scivolosa come una pista di pattinaggio. Ce l\'abbiamo fatta.\n\nGrazie a tutte le ragazze del cast, siete state incredibili.',
      media: { type: 'video', src: 'portrait.aurora-bianchi', dur: '0:58', views: '8.912' },
      rx: { total: 2310, top: ['fire', 'heart', 'wow'] }, comments: 164, reposts: 72, thread: [] },
    { id: 'p5', author: 'page:corpi-urbani', when: '2 g',
      text: 'Il programma del Festival Corpi Urbani 2026 è online. Tre giorni, 40 compagnie, 12 workshop gratuiti per chi ha meno di 25 anni.',
      event: 'e3', rx: { total: 671, top: ['clap', 'heart'] }, comments: 39, reposts: 88, thread: [] },
    { id: 'p6', author: 'tommaso-galli', when: '3 g', milestone: 'Ha iniziato una nuova posizione',
      text: 'Felice di annunciare che questa estate sarò primo ballerino ospite all\'Arena per "Carmen". Ventidue anni fa ero in quella stessa arena, in ultima fila, con mio nonno. Grazie a chi mi ha accompagnato fin qui.',
      media: { type: 'image', src: 'portrait.tommaso-galli' },
      rx: { total: 1893, top: ['clap', 'heart', 'bis'] }, comments: 211, reposts: 14, thread: [] },
    { id: 'p7', author: 'paolo-rinaldi', when: '4 g',
      text: 'Tre esercizi da 5 minuti per proteggere le caviglie prima delle punte, spiegati senza giri di parole. Li faccio fare a tutte le compagnie con cui lavoro.',
      article: { title: 'Caviglie da palco: la prevenzione che funziona davvero', site: 'Blog di Paolo Rinaldi · 6 min di lettura', media: 'gallery.backstage' },
      rx: { total: 318, top: ['idea', 'clap'] }, comments: 22, reposts: 61, thread: [] }
  ],

  news: [
    { t: 'Le audizioni d\'autunno tornano in presenza', m: '1 g fa · 4.210 lettori' },
    { t: 'Nuovo contratto nazionale per i danzatori', m: '2 g fa · 2.988 lettori' },
    { t: 'Il breaking dopo le Olimpiadi: cosa resta', m: '3 g fa · 1.704 lettori' },
    { t: 'Milano apre tre nuove sale prova pubbliche', m: '4 g fa · 1.122 lettori' },
    { t: 'Tango, la UNESCO celebra le milonghe italiane', m: '5 g fa · 860 lettori' }
  ],

  invitations: [
    { who: 'martina-greco', when: '1 g', note: 'Ciao Giulia, ho seguito il tuo intensivo di luglio. Mi piacerebbe restare in contatto per le prossime audizioni del corso professionale.' },
    { who: 'samuele-ricci', when: '3 g', note: '' },
    { who: 'irene-valli', when: '1 sett', note: 'Ho visto "Sottopelle" in Triennale: le luci erano mie! Sarebbe bello collaborare ancora.' }
  ],

  /* Annunci: kind = Audizione | Insegnamento | Produzione | Workshop */
  jobs: [
    { id: 'j1', title: 'Danzatrici e danzatori, nuova creazione 2027', org: 'linea-ombra', city: 'Torino', mode: 'In sede', kind: 'Audizione', contract: 'Contratto stagionale', pay: '1.900–2.300 € / mese', posted: '5 h', applicants: 138, easy: true, promoted: true, styles: ['Contemporaneo', 'Partnering'], deadline: '15 novembre 2026', poster: 'davide-serra',
      about: 'La Compagnia Linea d\'Ombra cerca 4 interpreti per la nuova creazione di Lucia Neri, con debutto al Teatro Astra di Torino a marzo 2027 e tournée in Francia, Belgio e Germania.',
      tasks: ['Prove da gennaio 2027, cinque giorni a settimana', 'Partecipazione al processo creativo con improvvisazioni guidate', 'Tournée di circa 30 date tra marzo e giugno'],
      reqs: ['Formazione accademica in danza classica e contemporanea', 'Esperienza in compagnia di almeno 2 stagioni', 'Solida tecnica di floor work e partnering', 'Inglese di base'],
      match: [['Contemporaneo', true], ['Floor work', true], ['Partnering', true], ['Età 20–32 anni', false]] },
    { id: 'j2', title: 'Insegnante di contemporaneo, corso pre-professionale', org: 'danza-oltrarno', city: 'Firenze', mode: 'In sede', kind: 'Insegnamento', contract: 'Part-time', pay: '35 € / ora', posted: '1 g', applicants: 24, easy: true, styles: ['Contemporaneo', 'Modern'], deadline: '30 novembre 2026', poster: 'beatrice-fontana',
      about: 'Cerchiamo un\'insegnante di contemporaneo per il corso pre-professionale (14–18 anni), due pomeriggi a settimana.',
      tasks: ['Due lezioni da 90 minuti a settimana', 'Preparazione del saggio di fine anno', 'Colloqui trimestrali con le famiglie'],
      reqs: ['Diploma accademico in danza', 'Almeno 3 anni di esperienza didattica con adolescenti'],
      match: [['Contemporaneo', true], ['Didattica', true], ['Disponibilità a Firenze', false]] },
    { id: 'j3', title: 'Ballerini e ballerine per videoclip pop', org: 'mood-studio', city: 'Milano', mode: 'In sede', kind: 'Produzione', contract: 'Gettone', pay: '450 € / giornata', posted: '2 g', applicants: 311, easy: false, styles: ['Commercial', 'Heels', 'Hip Hop'], deadline: '8 novembre 2026', poster: 'chiara-longo',
      about: 'Due giornate di riprese a Milano per il videoclip di un artista pop italiano. Coreografia di Chiara Longo.',
      tasks: ['Una giornata di prove, due di riprese', 'Fitting costumi il giorno prima'], reqs: ['Esperienza su set', 'Ottima memoria coreografica'],
      match: [['Milano', true], ['Heels', false], ['Commercial', false]] },
    { id: 'j4', title: 'Coreografa ospite per il gala di fine anno', org: 'teatro-civico', city: 'Milano', mode: 'In sede', kind: 'Produzione', contract: 'Freelance', pay: 'Da concordare', posted: '3 g', applicants: 17, easy: true, styles: ['Contemporaneo'], deadline: '20 novembre 2026', poster: 'samuele-ricci',
      about: 'Il Teatro Civico di Lambrate cerca una coreografa per un pezzo di 12 minuti per 8 allievi della scuola, in scena il 20 dicembre.',
      tasks: ['8 incontri di creazione tra novembre e dicembre'], reqs: ['Portfolio di creazioni per giovani interpreti'],
      match: [['Composizione coreografica', true], ['Contemporaneo', true], ['Milano', true]] },
    { id: 'j5', title: 'Workshop leader, Festival Corpi Urbani', org: 'corpi-urbani', city: 'Roma', mode: 'In sede', kind: 'Workshop', contract: 'Prestazione occasionale', pay: '600 € + viaggio', posted: '4 g', applicants: 42, easy: true, styles: ['Contemporaneo', 'Urban'], deadline: '10 novembre 2026', poster: 'anna-lombardi',
      about: 'Cerchiamo 6 insegnanti per i workshop gratuiti under 25 del festival, ciascuno di 3 ore.',
      tasks: ['Un workshop di 3 ore', 'Partecipazione alla jam di chiusura'], reqs: ['Esperienza di insegnamento a gruppi numerosi'],
      match: [['Didattica', true], ['Contemporaneo', true], ['Disponibilità a Roma', true]] },
    { id: 'j6', title: 'Insegnante di hip hop bambini (6–10 anni)', org: 'groove-lab', city: 'Roma', mode: 'In sede', kind: 'Insegnamento', contract: 'Part-time', pay: '28 € / ora', posted: '1 sett', applicants: 33, easy: true, styles: ['Hip Hop'], deadline: '1 dicembre 2026', poster: 'marco-deluca',
      about: 'Due classi il sabato mattina per i più piccoli.', tasks: ['Due lezioni da 60 minuti'], reqs: ['Esperienza con bambini'],
      match: [['Hip Hop', false], ['Didattica', true]] },
    { id: 'j7', title: 'Danzatori per opera lirica, "Aida"', org: 'teatro-civico', city: 'Verona', mode: 'In sede', kind: 'Audizione', contract: 'Contratto a termine', pay: '1.700 € / mese', posted: '1 sett', applicants: 204, easy: false, styles: ['Classica', 'Modern'], deadline: '18 novembre 2026', poster: 'tommaso-galli',
      about: 'Corpo di ballo per la nuova produzione estiva.', tasks: ['Prove da maggio 2027'], reqs: ['Formazione classica solida'],
      match: [['Classica', true], ['Modern', true], ['Verona', false]] }
  ],

  conversations: [
    { id: 'c1', with: 'davide-serra', unread: true, label: 'Audizione', messages: [
      { me: false, at: '2026-10-25T18:20', text: 'Ciao Giulia, sono Davide, curo il casting per Linea d\'Ombra.' },
      { me: false, at: '2026-10-25T18:21', text: 'Lucia ha visto "Sottopelle" e vorrebbe parlarti di un ruolo da assistente coreografa per la creazione 2027. Hai dieci minuti questa settimana per una call?' }
    ] },
    { id: 'c2', with: 'marco-deluca', unread: true, messages: [
      { me: true, at: '2026-10-24T10:02', text: 'Marco! Grazie ancora per sabato, i ragazzi sono tornati entusiasti.' },
      { me: false, at: '2026-10-26T09:14', text: 'Grazie a voi 🙏 Senti, per l\'8 novembre ti va di aprire la cypher con un warm-up di floor work? 15 minuti, poi il cerchio.' }
    ] },
    { id: 'c3', with: 'martina-greco', messages: [
      { me: false, at: '2026-10-22T21:40', text: 'Buonasera Giulia, volevo chiederle se l\'intensivo di dicembre è adatto a chi ha fatto solo un anno di contemporaneo.' },
      { me: true, at: '2026-10-23T08:12', text: 'Ciao Martina, sì: c\'è un gruppo per il livello base. Ti mando il programma.' },
      { me: true, at: '2026-10-23T08:13', text: 'Programma intensivo dicembre.pdf', file: true }
    ] },
    { id: 'c4', with: 'paolo-rinaldi', messages: [
      { me: false, at: '2026-10-19T16:30', text: 'Ti confermo giovedì alle 15 per la valutazione del gruppo avanzato.' },
      { me: true, at: '2026-10-19T16:45', text: 'Perfetto, ci vediamo in sala B.' }
    ] },
    { id: 'c5', with: 'beatrice-fontana', messages: [
      { me: false, at: '2026-10-12T11:00', text: 'Ti ho lasciato una raccomandazione, se ti va ricambia quando hai tempo 😊' }
    ] },
    { id: 'c6', with: 'irene-valli', messages: [
      { me: false, at: '2026-10-02T19:12', text: 'Per le prove aperte ti preparo un piazzato semplice: tre tagli e un controluce. Va bene?' }
    ] }
  ],

  notifications: [
    { id: 'n1', kind: 'view', who: 'davide-serra', when: '35 min', unread: true, text: '<b>Davide Serra</b>, direttore del casting di Compagnia Linea d\'Ombra, ha visualizzato il tuo profilo.', cta: ['Vedi tutte le visualizzazioni', 'profile.html#analisi'] },
    { id: 'n2', kind: 'react', who: 'marco-deluca', when: '1 h', unread: true, text: '<b>Marco De Luca</b> e altre <b>213 persone</b> hanno reagito al tuo post.', quote: 'Ultima settimana per iscriversi all\'intensivo di floor work di dicembre…', group: 'posts' },
    { id: 'n3', kind: 'job', page: 'linea-ombra', when: '5 h', unread: true, text: 'Nuova audizione per te: <b>Danzatrici e danzatori, nuova creazione 2027</b> di Compagnia Linea d\'Ombra, Torino.', cta: ['Vedi audizione', 'jobs.html?id=j1'], group: 'jobs' },
    { id: 'n4', kind: 'endorse', who: 'luca-conti', when: '1 g', unread: false, text: '<b>Luca Conti</b> ha confermato la tua competenza in <b>Floor work</b>.' },
    { id: 'n5', kind: 'mention', who: 'anna-lombardi', when: '1 g', unread: false, text: '<b>Anna Lombardi</b> ti ha menzionato in un commento.', quote: 'Con @Giulia Ferraro abbiamo pensato un workshop per chi non ha mai ballato contemporaneo.', group: 'mentions' },
    { id: 'n6', kind: 'birthday', who: 'sofia-marino', when: '2 g', unread: false, text: 'Oggi è il compleanno di <b>Sofia Marino</b>. Falle gli auguri.', cta: ['Invia gli auguri', 'messages.html'] },
    { id: 'n7', kind: 'comment', who: 'beatrice-fontana', when: '2 g', unread: false, text: '<b>Beatrice Fontana</b> ha commentato il tuo post.', quote: 'Le mie allieve sono già iscritte 😊 Grazie per aver tenuto un gruppo base.', group: 'posts' },
    { id: 'n8', kind: 'search', when: '3 g', unread: false, text: 'Sei apparsa in <b>61 ricerche</b> questa settimana. Le parole più cercate: <b>floor work</b>, <b>coreografa Milano</b>.', cta: ['Scopri chi ti cerca', 'profile.html#analisi'] },
    { id: 'n9', kind: 'event', page: 'corpi-urbani', when: '4 g', unread: false, text: '<b>Festival Corpi Urbani</b> inizia tra 2 settimane. Hai confermato la partecipazione.', group: 'events' },
    { id: 'n10', kind: 'work', who: 'tommaso-galli', when: '5 g', unread: false, text: 'Fai le congratulazioni a <b>Tommaso Galli</b> per il nuovo ruolo di primo ballerino ospite all\'Arena di Verona.', cta: ['Congratulati', 'messages.html'] },
    { id: 'n11', kind: 'repost', who: 'chiara-longo', when: '1 sett', unread: false, text: '<b>Chiara Longo</b> ha diffuso il tuo video "Tre minuti di improvvisazione guidata".', group: 'posts' }
  ],

  events: [
    { id: 'e1', title: 'Open Cypher d\'autunno', date: '2026-11-08', time: '16:00', city: 'Roma', place: 'Spazio Ex Dogana', style: 'Hip Hop', host: 'groove-lab', going: 214, media: 'style.Breaking', online: false, me: true },
    { id: 'e2', title: 'Masterclass: floor work e gravità', date: '2026-11-15', time: '10:30', city: 'Milano', place: 'Fabbrica del Vapore', style: 'Contemporaneo', host: 'studio-corpo-libero', going: 86, media: 'style.Contemporaneo', online: false, mine: true },
    { id: 'e3', title: 'Festival Corpi Urbani 2026', date: '2026-11-13', time: '18:00', city: 'Roma', place: 'Mattatoio', style: 'Urban e contemporaneo', host: 'corpi-urbani', going: 1830, media: 'gallery.palco', online: false, me: true },
    { id: 'e4', title: 'Notte Caraibica', date: '2026-11-22', time: '21:30', city: 'Bologna', place: 'Casa de la Clave', style: 'Salsa', host: 'carlos-rivera', going: 340, media: 'style.Salsa', online: false },
    { id: 'e5', title: 'Webinar: contratti e diritti per danzatori freelance', date: '2026-11-27', time: '19:00', city: 'Online', place: 'Diretta su FrankDanza', style: 'Professione', host: 'corpi-urbani', going: 612, media: 'gallery.workshop', online: true },
    { id: 'e6', title: 'Milonga di San Nicola', date: '2026-12-06', time: '21:00', city: 'Napoli', place: 'Spazio Molo', style: 'Tango', host: 'elena-russo', going: 128, media: 'style.Bachata', online: false }
  ]
};
