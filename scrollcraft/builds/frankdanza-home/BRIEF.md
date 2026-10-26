# FrankDanza home: BRIEF

Interviewed (4 answers via a structured question round on 2026-10-25). The
remaining topics are authored decisions, labelled as such, derived from the
earlier request ("community di danza per istruttori e ballerini … super
responsive, animato, svg animate, super moderno", palette #462C7D #831C91
#D552A3 #FF70BF).

## The eight topics

1. **Vibe** (authored from the original request): energica, notturna, da palcoscenico, colorata.
   References: the theatre "programma di sala" (the folded playbill handed out at the door);
   a follow-spot sweeping a dark stage; the curtain call.
2. **Scroll journey** (authored): the curtain opens on a dancer; the styles pass by; the lights go
   out; the talents take the stage one at a time; who the community is for; what is on this week;
   the curtain call and the invitation to join.
3. **Energy curve** (authored): loud open, louder styles, a hush, the peak, calm substance,
   a lift with the events, a resolved close.
4. **Feeling and the one moment** (user answer): **"I talenti in scena"**: the profiles enter
   the stage one at a time under a follow-spot that follows the cursor and the scroll.
5. **Something no site does** (authored from 4): the visitor works the follow-spot. The stage is
   dark; only the circle of light shows anything; aim it at the performer and the playbill
   tells you who they are.
6. **Range** (user answer): **Massimalista**.
7. **One world or scenes** (user answer): **Scene distinte**.
8. **Assets** (user answer): **Restare in SVG**. No photos, no footage, no generation, no spend.
   The world is the template's existing illustrated one (ribbon trails, line-drawn dancers),
   which is the brand's own illustration style, so the illustrated-world exception in worlds.md
   applies.

## Facts and honesty

FrankDanza is a fictional template brand. Profiles and events are labelled sample data.
Therefore: **no counters, no invented statistics, no testimonial**. The previous home had
"2400+ certificazioni", "3180 ballerini attivi", "38 città" and a quote; all removed.
Numbers that appear are computed from the sample data on the page (e.g. how many sample
profiles practise a style) and the page says the data is sample data.

## Grammar: "Serata a programma" (new)

A theatre evening. The page is a show bill: numbered *numeri* on one stage, framed by a
proscenium.

- **Nav:** the playbill. The header shows "In scena: <numero>" updating as the visitor moves,
  and it opens the full programme as a jump list. During the peak it names the performer
  currently lit.
- **Sequence:** each scene is a *numero* with its own staging; between them the lights change,
  never a continuous camera.
- **Ending:** the curtain call. The curtains close from the wings and the CTA is the ticket
  left on the apron, with the small print inside the same stage.
- **Bans:** `scrub` (no footage, and a filmed flight is not a stage); continuous drift across
  the whole page (each scene has its own ground); card grids as structure; a footer that begins
  after the close; centred copy in more than one scene.

Why not the eight defined grammars: filmic one-shot (user chose distinct scenes); chaptered
editorial (maximalist, not paper); live surface (the product is people, not a tool); continuous
world (user chose scenes); typographic poster (the peak needs figures on a stage); gallery
(close, but labels without a show would lose the peak); split stage (no two-sided argument);
rhythmic cutlist (bans `pin`, and the peak needs a held stage).

## Journey

1. Attesa       the curtain is half drawn on a lit dancer
2. Ritmo        the styles, loud and fast
3. Silenzio     the house lights go down
4. In scena     the talents, one by one, under the follow-spot
5. Fiducia      who it is for and how a profile works
6. Appetito     what is on this week
7. Inchino      the curtains close; the ticket is yours

## Feeling curve

| # | Act | Feeling | Cause on screen |
|---|---|---|---|
| 1 | Sipario | Anticipation | velvet curtains framing a lit dancer; scrolling draws them back, the dancer steps forward, the headline recedes behind her |
| 2 | Il ritmo | Euphoria | giant style names travelling sideways on hard-cut coloured grounds |
| 3 | Luci in sala | Hush | the colour is gone; a single small circle of light opens in the dark (authored silence, one short line) |
| 4 | In scena (PEAK) | Wonder, then intimacy | darkness everywhere except the follow-spot; performers enter from the wings one at a time; the playbill names whoever is lit |
| 5 | Per chi | Confidence | plain, well-set copy in daylight-bright panels after the dark |
| 6 | Cartellone | Appetite | the week's events wipe in like a bill being pasted |
| 7 | Inchino | Resolve | the curtains close to a gap; one line, one ticket, held |

No two adjacent rows share a feeling.

## The peak

> "the stage was completely dark, and wherever I moved the mouse a spotlight lit up a dancer
> and the programme told me who she was"

Lives in act 4. It gets the largest span on the page (4.4 vh) and the silence of act 3 in front
of it.

## Tell-someone sentence

It's the site where **you hold the follow-spot, and the dancers only exist where you shine it**.

## Authored silence

Act 3 is intentionally near-empty: a dark ground, one circle of light opening, one short line.
It is not dead scroll.

## Score

| Act | Device | Why this one |
|---|---|---|
| 1 Sipario | `pin` + layered planes driven by `--sc-p` | depth by occlusion: curtains (near), proscenium, dancer (subject), beams and haze (atmosphere), backdrop (far) |
| 2 Il ritmo | `pan` | lateral travel reads as range; the styles are a range |
| 3 Luci in sala | `reveal` (iris) | a wipe is a change of state; the light coming on is one |
| 4 In scena | `pin` + bespoke follow-spot | the stage holds, the performers advance; the light is the signature move |
| 5 Per chi | `flow` + `in` | the only act that reads like a document, so it sits after the peak |
| 6 Cartellone | `reveal` (left, per row) | a bill pasted on a wall |
| 7 Inchino | `pin` + magnet CTA | the page stops moving and closes |

Families: pin, pan, reveal, flow, pointer. No family twice in a row. Zero `scrub`.
Total pinned span 1.9 + 3.0 + 4.4 + 1.4 = 10.7 vh plus three flow sections.
