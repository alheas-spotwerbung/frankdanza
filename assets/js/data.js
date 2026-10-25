/* Dati di esempio, sostituire con le API reali */
window.FD_DATA = {
  styles: ['Hip Hop', 'Contemporaneo', 'Classica', 'Salsa', 'Bachata', 'Tango', 'Kizomba', 'Heels', 'Breaking', 'Jazz', 'Modern', 'Popping', 'Latin', 'Waacking'],
  cities: ['Milano', 'Roma', 'Torino', 'Bologna', 'Napoli', 'Firenze', 'Bari', 'Verona'],
  dancers: [
    {
      id: 'giulia-ferraro', name: 'Giulia Ferraro', role: 'istruttore', city: 'Milano',
      styles: ['Contemporaneo', 'Modern', 'Classica'], level: 'Professionista', years: 14, rating: 4.9, reviews: 128, students: 340,
      tagline: 'Il peso del corpo come linguaggio.',
      bio: 'Formata all\'Accademia Teatro alla Scala, ha danzato per sei stagioni con compagnie di contemporaneo in Europa. Oggi insegna release technique e floor work, con un approccio che parte dal respiro e arriva alla composizione coreografica.',
      skills: [{ name: 'Tecnica', value: 96 }, { name: 'Musicalità', value: 88 }, { name: 'Improvvisazione', value: 92 }, { name: 'Coreografia', value: 94 }, { name: 'Didattica', value: 90 }, { name: 'Presenza scenica', value: 85 }],
      certs: [
        { title: 'Diploma in Danza Contemporanea', issuer: 'Accademia Teatro alla Scala', year: 2012, code: 'ATS-DC-1204', verified: true },
        { title: 'Release Technique Teacher', issuer: 'Trisha Brown Studio Programme', year: 2017, code: 'TB-RT-0331', verified: true },
        { title: 'Pilates per danzatori, Livello 2', issuer: 'FIF Fitness', year: 2019, code: 'FIF-PD2-7781', verified: true },
        { title: 'Primo soccorso BLSD', issuer: 'Croce Rossa Italiana', year: 2024, code: 'CRI-BLSD-24-0912', verified: false }
      ],
      experience: [
        { year: '2023', title: 'Coreografa, "Sottopelle"', place: 'Triennale Milano' },
        { year: '2020', title: 'Direttrice artistica', place: 'Studio Corpo Libero, Milano' },
        { year: '2016', title: 'Danzatrice solista', place: 'Compagnia Aterballetto' },
        { year: '2013', title: 'Ensemble', place: 'Les Ballets C de la B, Gent' }
      ],
      classes: [
        { day: 'Lun', time: '19:00–20:30', style: 'Contemporaneo', level: 'Intermedio', place: 'Studio Corpo Libero' },
        { day: 'Mer', time: '18:30–20:00', style: 'Floor work', level: 'Avanzato', place: 'Studio Corpo Libero' },
        { day: 'Sab', time: '11:00–13:00', style: 'Composizione', level: 'Tutti', place: 'Fabbrica del Vapore' }
      ],
      languages: ['Italiano', 'Inglese', 'Francese'], available: true, seed: 11
    },
    {
      id: 'marco-deluca', name: 'Marco De Luca', role: 'istruttore', city: 'Roma',
      styles: ['Hip Hop', 'Popping', 'Breaking'], level: 'Professionista', years: 12, rating: 4.8, reviews: 96, students: 410,
      tagline: 'Dalla cypher al palco, senza perdere il groove.',
      bio: 'B-boy dal 2008, finalista a due edizioni di Battle of the Year Italia. Insegna fondamentali hip hop e popping con un metodo strutturato per livelli, pensato per chi parte da zero e per chi prepara le battle.',
      skills: [{ name: 'Tecnica', value: 90 }, { name: 'Musicalità', value: 95 }, { name: 'Improvvisazione', value: 97 }, { name: 'Coreografia', value: 82 }, { name: 'Didattica', value: 91 }, { name: 'Presenza scenica', value: 93 }],
      certs: [
        { title: 'Istruttore Hip Hop, 2° livello', issuer: 'FIDS', year: 2015, code: 'FIDS-HH2-15-4410', verified: true },
        { title: 'Giudice Breaking', issuer: 'WDSF', year: 2021, code: 'WDSF-BRK-J-0921', verified: true },
        { title: 'Preparazione atletica per la danza', issuer: 'CONI Scuola dello Sport', year: 2018, code: 'CONI-PAD-3381', verified: true }
      ],
      experience: [
        { year: '2024', title: 'Giudice', place: 'Red Bull BC One Cypher Italia' },
        { year: '2021', title: 'Fondatore', place: 'Groove Lab Crew, Roma' },
        { year: '2019', title: 'Ballerino', place: 'Tour "Ritmo Vitale", Sanremo Giovani' }
      ],
      classes: [
        { day: 'Mar', time: '18:00–19:30', style: 'Hip Hop Foundations', level: 'Principianti', place: 'Groove Lab' },
        { day: 'Gio', time: '20:00–21:30', style: 'Popping', level: 'Intermedio', place: 'Groove Lab' },
        { day: 'Dom', time: '16:00–18:00', style: 'Battle training', level: 'Avanzato', place: 'Spazio Ex Dogana' }
      ],
      languages: ['Italiano', 'Inglese'], available: true, seed: 23
    },
    {
      id: 'sofia-marino', name: 'Sofia Marino', role: 'ballerino', city: 'Torino',
      styles: ['Classica', 'Jazz'], level: 'Avanzato', years: 9, rating: 4.7, reviews: 34, students: 0,
      tagline: 'Punte, linee e un debole per Fosse.',
      bio: 'Diplomata al Teatro Nuovo di Torino, alterna il repertorio classico al jazz di Broadway. Disponibile per produzioni, videoclip e galà, con esperienza in sala prove e in tournée.',
      skills: [{ name: 'Tecnica', value: 93 }, { name: 'Musicalità', value: 86 }, { name: 'Improvvisazione', value: 70 }, { name: 'Coreografia', value: 68 }, { name: 'Didattica', value: 55 }, { name: 'Presenza scenica', value: 91 }],
      certs: [
        { title: 'Diploma Accademico di Danza Classica', issuer: 'Teatro Nuovo Torino', year: 2019, code: 'TNT-DC-19-112', verified: true },
        { title: 'Royal Academy of Dance, Advanced 2', issuer: 'RAD London', year: 2018, code: 'RAD-A2-58821', verified: true }
      ],
      experience: [
        { year: '2024', title: 'Corpo di ballo, "Lo Schiaccianoci"', place: 'Teatro Regio Torino' },
        { year: '2022', title: 'Ensemble, "Chicago"', place: 'Teatro Sistina, Roma' }
      ],
      classes: [], languages: ['Italiano', 'Inglese', 'Spagnolo'], available: true, seed: 37
    },
    {
      id: 'carlos-rivera', name: 'Carlos Rivera', role: 'istruttore', city: 'Bologna',
      styles: ['Salsa', 'Bachata', 'Latin'], level: 'Professionista', years: 18, rating: 5.0, reviews: 211, students: 620,
      tagline: 'Cuba nel sangue, Bologna nel cuore.',
      bio: 'Nato a Santiago de Cuba, campione italiano di salsa cubana 2016. Insegna rueda de casino, son e bachata sensual. Le sue serate sociali del giovedì sono un punto di riferimento della scena latina emiliana.',
      skills: [{ name: 'Tecnica', value: 92 }, { name: 'Musicalità', value: 99 }, { name: 'Improvvisazione', value: 90 }, { name: 'Coreografia', value: 86 }, { name: 'Didattica', value: 95 }, { name: 'Presenza scenica', value: 94 }],
      certs: [
        { title: 'Maestro di Danze Caraibiche', issuer: 'FIDS', year: 2011, code: 'FIDS-DC-11-0071', verified: true },
        { title: 'Campione Italiano Salsa Cubana', issuer: 'FIDS', year: 2016, code: 'FIDS-CI-16-SC', verified: true },
        { title: 'Escuela Nacional de Arte, Folklore', issuer: 'ENA La Habana', year: 2004, code: 'ENA-FK-04-339', verified: true }
      ],
      experience: [
        { year: '2016', title: 'Campione Italiano', place: 'Salsa cubana, Rimini' },
        { year: '2012', title: 'Fondatore', place: 'Casa de la Clave, Bologna' }
      ],
      classes: [
        { day: 'Lun', time: '20:30–22:00', style: 'Salsa cubana', level: 'Principianti', place: 'Casa de la Clave' },
        { day: 'Gio', time: '21:00–00:30', style: 'Serata sociale', level: 'Tutti', place: 'Casa de la Clave' }
      ],
      languages: ['Italiano', 'Spagnolo'], available: false, seed: 41
    },
    {
      id: 'aurora-bianchi', name: 'Aurora Bianchi', role: 'ballerino', city: 'Milano',
      styles: ['Heels', 'Waacking', 'Jazz'], level: 'Avanzato', years: 7, rating: 4.8, reviews: 52, students: 0,
      tagline: 'Tacchi da 12 e zero esitazioni.',
      bio: 'Performer per eventi moda e videoclip, con esperienza in Milano Fashion Week e campagne per brand beauty. Studia waacking con la scena di Los Angeles da quattro anni.',
      skills: [{ name: 'Tecnica', value: 84 }, { name: 'Musicalità', value: 90 }, { name: 'Improvvisazione', value: 88 }, { name: 'Coreografia', value: 79 }, { name: 'Didattica', value: 60 }, { name: 'Presenza scenica', value: 98 }],
      certs: [{ title: 'Heels Choreography Intensive', issuer: 'Millennium Dance Complex LA', year: 2022, code: 'MDC-HCI-2207', verified: true }],
      experience: [
        { year: '2025', title: 'Performer', place: 'Milano Fashion Week, sfilata di apertura' },
        { year: '2023', title: 'Ballerina', place: 'Videoclip "Notte Fucsia"' }
      ],
      classes: [], languages: ['Italiano', 'Inglese'], available: true, seed: 53
    },
    {
      id: 'elena-russo', name: 'Elena Russo', role: 'istruttore', city: 'Napoli',
      styles: ['Tango'], level: 'Professionista', years: 20, rating: 4.9, reviews: 87, students: 280,
      tagline: 'L\'abbraccio prima del passo.',
      bio: 'Tanguera dal 2005, ha studiato a Buenos Aires con maestri della milonga tradizionale. Organizza la Milonga del Molo e lavora molto sulla connessione e sull\'ascolto nella coppia.',
      skills: [{ name: 'Tecnica', value: 91 }, { name: 'Musicalità', value: 97 }, { name: 'Improvvisazione', value: 89 }, { name: 'Coreografia', value: 77 }, { name: 'Didattica', value: 96 }, { name: 'Presenza scenica', value: 88 }],
      certs: [
        { title: 'Maestro di Tango Argentino', issuer: 'AITA', year: 2010, code: 'AITA-MT-10-205', verified: true },
        { title: 'Profesorado de Tango', issuer: 'Escuela Argentina de Tango', year: 2008, code: 'EAT-PT-0844', verified: true }
      ],
      experience: [{ year: '2015', title: 'Organizzatrice', place: 'Milonga del Molo, Napoli' }],
      classes: [{ day: 'Ven', time: '20:00–21:30', style: 'Tango, tecnica di coppia', level: 'Intermedio', place: 'Spazio Molo' }],
      languages: ['Italiano', 'Spagnolo'], available: true, seed: 67
    },
    {
      id: 'luca-conti', name: 'Luca Conti', role: 'ballerino', city: 'Firenze',
      styles: ['Contemporaneo', 'Breaking'], level: 'Intermedio', years: 5, rating: 4.6, reviews: 18, students: 0,
      tagline: 'Dove il pavimento diventa partner.',
      bio: 'Viene dal breaking e oggi lavora con compagnie di danza contemporanea che mescolano acrobatica e floor work. Cerca produzioni e residenze artistiche.',
      skills: [{ name: 'Tecnica', value: 78 }, { name: 'Musicalità', value: 74 }, { name: 'Improvvisazione', value: 91 }, { name: 'Coreografia', value: 66 }, { name: 'Didattica', value: 48 }, { name: 'Presenza scenica', value: 80 }],
      certs: [{ title: 'Corso di formazione professionale', issuer: 'Fondazione Fabbrica Europa', year: 2023, code: 'FFE-CFP-23-019', verified: false }],
      experience: [{ year: '2024', title: 'Danzatore', place: 'Residenza "Gravità Zero", Firenze' }],
      classes: [], languages: ['Italiano'], available: true, seed: 79
    },
    {
      id: 'nadia-esposito', name: 'Nadia Esposito', role: 'istruttore', city: 'Bari',
      styles: ['Kizomba', 'Bachata'], level: 'Professionista', years: 10, rating: 4.9, reviews: 143, students: 390,
      tagline: 'Lentezza è precisione.',
      bio: 'Insegnante e organizzatrice del Puglia Kizz Festival. Il suo lavoro si concentra sulla tecnica femminile, sulla postura e sulla guida chiara per chi conduce.',
      skills: [{ name: 'Tecnica', value: 89 }, { name: 'Musicalità', value: 93 }, { name: 'Improvvisazione', value: 85 }, { name: 'Coreografia', value: 83 }, { name: 'Didattica', value: 97 }, { name: 'Presenza scenica', value: 90 }],
      certs: [
        { title: 'Kizomba Teacher Training', issuer: 'Kizomba Academy Lisboa', year: 2016, code: 'KAL-TT-16-88', verified: true },
        { title: 'Istruttore Danze Latine', issuer: 'ASI', year: 2014, code: 'ASI-DL-14-1290', verified: true }
      ],
      experience: [{ year: '2019', title: 'Direttrice', place: 'Puglia Kizz Festival' }],
      classes: [
        { day: 'Mar', time: '20:30–22:00', style: 'Kizomba', level: 'Intermedio', place: 'Studio Levante' },
        { day: 'Ven', time: '21:00–22:30', style: 'Bachata sensual', level: 'Principianti', place: 'Studio Levante' }
      ],
      languages: ['Italiano', 'Portoghese', 'Inglese'], available: true, seed: 83
    },
    {
      id: 'tommaso-galli', name: 'Tommaso Galli', role: 'ballerino', city: 'Verona',
      styles: ['Classica', 'Modern'], level: 'Professionista', years: 13, rating: 4.8, reviews: 41, students: 0,
      tagline: 'Primo ballerino, ultimo a lasciare la sala.',
      bio: 'Primo ballerino ospite per produzioni estive in Arena. Repertorio classico e neoclassico, con particolare attenzione al partnering.',
      skills: [{ name: 'Tecnica', value: 98 }, { name: 'Musicalità', value: 87 }, { name: 'Improvvisazione', value: 64 }, { name: 'Coreografia', value: 72 }, { name: 'Didattica', value: 70 }, { name: 'Presenza scenica', value: 95 }],
      certs: [{ title: 'Diploma di Danza Classica', issuer: 'Accademia Nazionale di Danza', year: 2013, code: 'AND-DC-13-0442', verified: true }],
      experience: [{ year: '2025', title: 'Primo ballerino ospite', place: 'Arena di Verona, "Carmen"' }],
      classes: [], languages: ['Italiano', 'Inglese', 'Tedesco'], available: false, seed: 97
    },
    {
      id: 'chiara-longo', name: 'Chiara Longo', role: 'istruttore', city: 'Torino',
      styles: ['Hip Hop', 'Heels'], level: 'Avanzato', years: 8, rating: 4.7, reviews: 64, students: 230,
      tagline: 'Groove, attitudine, nessun giudizio.',
      bio: 'Insegna choreo hip hop e heels per adulti, con classi pensate anche per chi ricomincia dopo anni. Coreografa per crew giovanili che gareggiano a livello nazionale.',
      skills: [{ name: 'Tecnica', value: 82 }, { name: 'Musicalità', value: 91 }, { name: 'Improvvisazione', value: 80 }, { name: 'Coreografia', value: 92 }, { name: 'Didattica', value: 93 }, { name: 'Presenza scenica', value: 89 }],
      certs: [{ title: 'Istruttore Hip Hop, 1° livello', issuer: 'FIDS', year: 2018, code: 'FIDS-HH1-18-2207', verified: true }],
      experience: [{ year: '2024', title: 'Coreografa', place: 'Crew "Nuvola Rosa", 2ª ai campionati italiani' }],
      classes: [
        { day: 'Lun', time: '19:30–21:00', style: 'Choreo Hip Hop', level: 'Tutti', place: 'Mood Studio' },
        { day: 'Mer', time: '20:00–21:30', style: 'Heels', level: 'Intermedio', place: 'Mood Studio' }
      ],
      languages: ['Italiano', 'Inglese'], available: true, seed: 103
    },
    {
      id: 'ivan-moretti', name: 'Ivan Moretti', role: 'ballerino', city: 'Roma',
      styles: ['Latin', 'Salsa'], level: 'Avanzato', years: 11, rating: 4.6, reviews: 29, students: 0,
      tagline: 'Samba, cha cha e tanta disciplina.',
      bio: 'Danzatore di danze latine da competizione, oggi attivo come performer per spettacoli televisivi ed eventi aziendali.',
      skills: [{ name: 'Tecnica', value: 90 }, { name: 'Musicalità', value: 88 }, { name: 'Improvvisazione', value: 72 }, { name: 'Coreografia', value: 75 }, { name: 'Didattica', value: 62 }, { name: 'Presenza scenica', value: 92 }],
      certs: [{ title: 'Classe A, Danze Latine', issuer: 'FIDS', year: 2017, code: 'FIDS-A-LAT-17-55', verified: true }],
      experience: [{ year: '2023', title: 'Corpo di ballo', place: 'Programma TV del sabato sera' }],
      classes: [], languages: ['Italiano', 'Russo'], available: true, seed: 109
    },
    {
      id: 'beatrice-fontana', name: 'Beatrice Fontana', role: 'istruttore', city: 'Firenze',
      styles: ['Classica', 'Contemporaneo'], level: 'Professionista', years: 22, rating: 4.9, reviews: 102, students: 510,
      tagline: 'La sbarra è una conversazione quotidiana.',
      bio: 'Insegnante di metodo Vaganova per bambini e pre-professionali. Ha preparato allievi entrati nelle principali accademie europee.',
      skills: [{ name: 'Tecnica', value: 97 }, { name: 'Musicalità', value: 90 }, { name: 'Improvvisazione', value: 66 }, { name: 'Coreografia', value: 84 }, { name: 'Didattica', value: 99 }, { name: 'Presenza scenica', value: 82 }],
      certs: [
        { title: 'Metodo Vaganova, Insegnante', issuer: 'Accademia Vaganova San Pietroburgo', year: 2006, code: 'VAG-T-06-3110', verified: true },
        { title: 'Pedagogia della danza', issuer: 'Accademia Nazionale di Danza', year: 2004, code: 'AND-PD-04-0918', verified: true }
      ],
      experience: [{ year: '2009', title: 'Direttrice didattica', place: 'Scuola Danza Oltrarno' }],
      classes: [{ day: 'Mar', time: '17:00–18:30', style: 'Classica, propedeutica', level: 'Principianti', place: 'Danza Oltrarno' }],
      languages: ['Italiano', 'Russo', 'Inglese'], available: true, seed: 127
    }
  ],
  events: [
    { date: '2026-11-08', title: 'Open Cypher d\'autunno', city: 'Roma', style: 'Hip Hop', place: 'Spazio Ex Dogana' },
    { date: '2026-11-15', title: 'Masterclass: floor work e gravità', city: 'Milano', style: 'Contemporaneo', place: 'Fabbrica del Vapore' },
    { date: '2026-11-22', title: 'Notte Caraibica', city: 'Bologna', style: 'Salsa', place: 'Casa de la Clave' },
    { date: '2026-12-06', title: 'Milonga di San Nicola', city: 'Napoli', style: 'Tango', place: 'Spazio Molo' }
  ]
};
