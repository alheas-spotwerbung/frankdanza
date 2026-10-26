# Immagini e video per FrankDanza

Metti tutti i file in questa cartella (`template/assets/media/`) con **esattamente** i nomi indicati.
Poi dimmi che sono pronti: li controllo uno per uno e li collego alle pagine.

## Regole per tutti i file

- **Foto:** JPG qualità 85–90 (va bene anche WebP), spazio colore sRGB, alla risoluzione indicata o più grande con le stesse proporzioni.
- **Ritagli** (le righe segnate **PNG trasparente**): PNG con **trasparenza vera**, non uno sfondo bianco né la scacchiera disegnata nell'immagine. Figura intera con mani e piedi, almeno 5% di margine vuoto su ogni lato. Se il tuo strumento non fa la trasparenza, generala su **verde uniforme #00FF00** e la scontorno io.
- **Video:** MP4 H.264, senza audio, 24 o 30 fps, alla risoluzione indicata.
- **Nessun testo, logo o scritta** dentro le immagini: i testi li mette la pagina.
- **Stessa luce in tutte:** luce di palco viola e magenta, fondo scuro. Usa sempre la frase di stile qui sotto, **identica**, all'inizio di ogni prompt: è quella che fa sembrare tutte le foto parte dello stesso servizio fotografico.

### Frase di stile (copiala identica in testa a ogni prompt)

```
Editorial dance photography, shot on a full-frame camera with a 50mm lens, real people, natural skin texture, sharp focus.
Dark theatre or studio, deep violet shadows (#462C7D), magenta and orchid stage light (#831C91, #D552A3), soft pink highlights (#FF70BF), light haze in the air.
Cinematic, high contrast, no text, no logos, no watermark, not 3D, not illustration, not CGI, no plastic skin.
```

---

## 1. Home: sipario (apertura)

| File | Formato | Dimensioni | Contenuto |
|---|---|---|---|
| `hero-stage.jpg` | JPG | 2400×1600 (3:2) | Palco **vuoto**, senza persone e senza sipari ai lati (quelli li disegno io). Fondale scuro, tre fasci di luce dall'alto, pavimento in legno scuro lucido, foschia. Lascia il terzo sinistro più scuro e uniforme: lì va il titolo. |
| `hero-stage-m.jpg` | JPG | 1080×1920 (9:16) | Stesso palco in verticale per il telefono. Parte alta scura e uniforme (lì va il titolo), luce concentrata nella metà bassa. |
| `hero-dancer.png` | **PNG trasparente** | 1600×2000 (4:5) | Ballerina di contemporaneo in arabesque: un braccio alzato in diagonale, gamba dietro distesa, abito leggero color orchidea in movimento. Figura intera, vista di tre quarti, luce dall'alto a destra. |

**Prompt `hero-stage.jpg`:** `[frase di stile] Wide shot of an empty theatre stage, no people, no curtains in frame, three spotlight beams from above crossing in haze, dark glossy wooden floor, deep violet backdrop, the left third of the frame darker and even.`

**Prompt `hero-dancer.png`:** `[frase di stile] Full-body contemporary dancer, woman in her 30s, arabesque with one arm raised diagonally and the back leg extended, light orchid dress flowing, three-quarter view, top-right spotlight, isolated on a transparent background, whole figure in frame with margin.`

## 2. Home: In scena (i cinque talenti sul palco buio)

Tutti **PNG trasparente**, 1200×1800 (2:3), figura intera in posa, luce dall'alto come un occhio di bue, bordo scuro intorno.

| File | Persona | Posa |
|---|---|---|
| `perf-giulia-ferraro.png` | Donna, 35 anni, contemporaneo | Arabesque o grande allungamento laterale |
| `perf-marco-deluca.png` | Uomo, 30 anni, hip hop / breaking | Freeze: una mano a terra, gambe in aria, felpa e sneakers |
| `perf-carlos-rivera.png` | Uomo cubano, 40 anni, salsa | Passo di salsa, camicia aperta, braccio teso in un giro |
| `perf-aurora-bianchi.png` | Donna, 27 anni, heels | Salto o posa decisa su tacchi alti, body nero |
| `perf-beatrice-fontana.png` | Donna, 50 anni, insegnante di classica | Pirouette in retiré, braccia in quinta, chignon |

**Prompt (cambia persona e posa):** `[frase di stile] Full-body [persona] dancing [posa], single hard spotlight from directly above, dark rim light, isolated on a transparent background, whole figure in frame with margin.`

## 3. Home: Il ritmo (un pannello per stile)

JPG 900×1600 (9:16). Una persona per foto, inquadratura verticale, sfondo scuro semplice. Io aggiungo sopra il colore del pannello, quindi conta più la silhouette dello sfondo.

| File | Stile | Spunto di posa |
|---|---|---|
| `style-classica.jpg` | Danza classica | Ballerina sulle punte, arabesque, tutù |
| `style-contemporaneo.jpg` | Contemporaneo | Danzatore a terra in una torsione, a piedi nudi |
| `style-modern.jpg` | Modern | Contrazione del busto, braccia aperte |
| `style-hip-hop.jpg` | Hip Hop | Ballerina in un passo groove, abiti larghi |
| `style-breaking.jpg` | Breaking | B-boy in freeze su una mano |
| `style-jazz.jpg` | Jazz | Salto in spaccata, mani a ventaglio |
| `style-salsa.jpg` | Salsa | Coppia nel mezzo di un giro |
| `style-bachata.jpg` | Bachata | Coppia vicina, lei con il busto in arco all'indietro |

**Prompt:** `[frase di stile] Vertical full-body shot of [stile, posa], dark simple background, strong silhouette, subject centered in the lower two thirds.`

## 4. Home: Per chi

| File | Formato | Dimensioni | Contenuto |
|---|---|---|---|
| `who-teach.jpg` | JPG | 1600×1200 (4:3) | Insegnante che corregge la postura di un'allieva in una sala prove con specchio e sbarra, altri allievi sfocati dietro. Parte bassa più scura (lì vanno i testi). |

## 5. Lista e profili: un ritratto per ogni persona

JPG 1200×1500 (4:5). Dalla vita in su, in sala prove o sul palco, sguardo in camera o di profilo. **Il viso nel terzo superiore** dell'immagine, perché nelle card della lista la foto viene tagliata quasi quadrata.

| File | Persona |
|---|---|
| `portrait-giulia-ferraro.jpg` | Donna, 35 anni, contemporanea, capelli raccolti, Milano |
| `portrait-marco-deluca.jpg` | Uomo, 30 anni, b-boy, felpa con cappuccio, Roma |
| `portrait-sofia-marino.jpg` | Donna, 26 anni, ballerina classica, chignon, Torino |
| `portrait-carlos-rivera.jpg` | Uomo cubano, 40 anni, maestro di salsa, sorriso, Bologna |
| `portrait-aurora-bianchi.jpg` | Donna, 27 anni, performer heels, trucco deciso, Milano |
| `portrait-elena-russo.jpg` | Donna, 45 anni, tanguera, abito nero, Napoli |
| `portrait-luca-conti.jpg` | Uomo, 24 anni, contemporaneo e breaking, Firenze |
| `portrait-nadia-esposito.jpg` | Donna, 33 anni, insegnante di kizomba, Bari |
| `portrait-tommaso-galli.jpg` | Uomo, 32 anni, primo ballerino classico, Verona |
| `portrait-chiara-longo.jpg` | Donna, 29 anni, hip hop e heels, Torino |
| `portrait-ivan-moretti.jpg` | Uomo, 30 anni, danze latine da competizione, Roma |
| `portrait-beatrice-fontana.jpg` | Donna, 50 anni, insegnante di classica, Firenze |

**Prompt:** `[frase di stile] Waist-up portrait of [persona], in a dance studio, face in the upper third of the frame, confident expression, soft magenta key light from the side.`

## 6. Profili: galleria (le stesse 5 per tutti, cambio io l'ordine)

| File | Formato | Dimensioni | Contenuto |
|---|---|---|---|
| `gallery-showreel.jpg` | JPG | 1600×1000 (16:10) | Ballerino a mezz'aria sul palco, controluce. Fa da copertina del video. |
| `gallery-prove.jpg` | JPG | 1200×900 (4:3) | Sala prove, gruppo che prova davanti allo specchio |
| `gallery-backstage.jpg` | JPG | 1200×900 (4:3) | Dietro le quinte: scarpette, costumi appesi, luci dello specchio |
| `gallery-palco.jpg` | JPG | 1200×900 (4:3) | Spettacolo visto dalla platea, ensemble in scena |
| `gallery-workshop.jpg` | JPG | 1200×900 (4:3) | Workshop affollato, insegnante al centro |

## 7. Video (facoltativi ma consigliati)

| File | Formato | Dimensioni | Durata | Contenuto |
|---|---|---|---|---|
| `hero-haze.mp4` | MP4 H.264, senza audio | 1920×1080 | 6–8 s, **in loop senza stacco** | Solo foschia e fasci di luce che si muovono lentamente sul palco vuoto (stessa scena di `hero-stage.jpg`). Va dietro la ballerina come atmosfera. |
| `hero-haze-m.mp4` | MP4 H.264, senza audio | 1080×1920 | come sopra | Versione verticale per il telefono |
| `showreel.mp4` | MP4 H.264, senza audio | 1920×1080 | 8–12 s | Montaggio di passi di danza (classica, hip hop, salsa) con le luci viola e magenta. Parte quando si clicca sulla copertina nella galleria. |

Per i video da immagine: parti da `hero-stage.jpg` con un movimento di camera quasi fermo (solo la foschia si muove), così il loop si chiude bene.

## 8. Condivisione social

| File | Formato | Dimensioni | Contenuto |
|---|---|---|---|
| `og-image.jpg` | JPG | 1200×630 | Ballerina sul palco con la luce del sipario, spazio vuoto a sinistra (lì metto il logo io) |

---

## Riepilogo

- **Indispensabili:** 32 immagini (sezioni 1–6).
- **Facoltativi:** 3 video (sezione 7) e l'immagine social (sezione 8).

Se vuoi spendere meno, la priorità è:

1. `hero-stage.jpg` e `hero-dancer.png`
2. i 5 `perf-*.png`
3. i 12 ritratti
4. tutto il resto
