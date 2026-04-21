# Design System Adapted for Hime

## 1. Visual Theme & Atmosphere

Hime sitt visuelle uttrykk er lyst, vennlig og hjemmenært. Der Vodafone-systemet er dramatisk, mørkt og institusjonelt, skal Hime være varmt, lett og menneskelig — bygget rundt en tydelig ferskenfarge, en skarp turkis aksent og en rolig mørk petrolfarge. Opplevelsen skal føles enkel, optimistisk og tilgjengelig, med tydelig fokus på familier, hjemmet, TV og internettbruk i hverdagen.

Den visuelle identiteten skal bruke mye lys bakgrunn, god luft og et ryddig oppsett. Illustrasjoner og ikoner skal være lette, åpne og vennlige, og fotografiet skal vise lyse, glade situasjoner i og rundt hjemmet. Ferskenfargen bærer merkevaren, mens turkis brukes svært sparsomt som kontrastfarge for å trekke oppmerksomhet mot enkelte elementer. Den mørke petrolfargen gir systemet struktur i overskrifter, kort tekst og detaljer.

Typografien skal oppleves mykere og mer imøtekommende enn i Vodafone-malen. Hime bruker Raleway til all tekst, med Medium som anbefalt vekt i løpende tekst og Bold til titler, undertitler og uthevinger. Designet skal derfor lene seg mer på luftig layout, vennlig typografi og tydelig fargebruk enn på monumentale overskrifter eller tunge mørke flater.

**Key Characteristics:**
- Fersken (`#ff8278`) er hovedfargen og den tydeligste merkevarebæreren
- Raleway brukes på all tekst, med Medium til brødtekst og Bold til overskrifter og utheving
- Lyst, vennlig og hjemmenært uttrykk fremfor dramatisk og institusjonelt
- Lyse bakgrunner er standard; mørke flater brukes begrenset og kontrollert
- Illustrasjoner og ikoner følger en egen Hime-stil med mørk outline, hvitt fyll og ferskeninnslag på lyse bakgrunner
- Kontrastfargen turkis (`#00a6c1`) brukes i liten grad for ekstra oppmerksomhet
- Foto skal vise glade mennesker som ser på TV eller bruker internett hjemme

## 2. Color Palette & Roles

### Primary

- **Hime Fersken** (`#ff8278`): Hovedfarge i identiteten. Brukes i logo, primære knapper, stikktitler, utvalgte overskrifter, bakgrunnsfelter og andre merkevarebærende flater.

### Secondary & Accent

- **Kontrast Turkis** (`#00a6c1`): Brukes i liten grad som kontrastfarge når et element trenger ekstra oppmerksomhet.
- **Hvit** (`#ffffff`): Primær bakgrunnsfarge og standard for kortflater, negativ logo og lys UI.

### Surface & Background

- **Lys bakgrunn** (`#ffffff`): Hovedflate for de fleste sider og komponenter.
- **Lys gråflate** (`#dcdcdc`): Brukes for å skille felt fra hverandre, som bakgrunn i sekundære seksjoner og i ulike opasiteter der det gir mening.
- **Mørk petrolflate** (`#003c46`): Brukes til titler, korte tekster, enkelte detaljer og mørke bakgrunnsfelter der kontrasten er god.
- **Ferskenflate** (`#ff8278`): Brukes som helflate i utvalgte seksjoner og bakgrunner hvor hvit logo, hvite ikoner eller illustrasjoner i hvit/mørk variant skal vises.

### Neutrals & Text

- **Primær tekst mørk** (`#003c46`): Standard tekstfarge for overskrifter, korte tekster og viktige UI-elementer.
- **Sekundær tekst grå** (`#5f6b6d`): Anbefalt supplerende tekstfarge for metadata, hjelpetekst og mindre fremtredende innhold.
- **Lys separator** (`rgba(0,60,70,0.12)`): Diskré linjer og delere på lyse flater.

### Semantic Guidance

- Bruk fersken som primær merkevaremarkør
- Bruk turkis kun som sparsom oppmerksomhetsfarge
- Bruk mørk petrol for struktur, lesbarhet og kontrast
- Bruk lyse flater som standard for å bevare Hime sitt lyse og vennlige uttrykk

### Gradient System

Designsystemet bør i utgangspunktet være flatt og rent. Unngå tunge gradienter. Fargeflater skal oppleves klare og konsistente, i tråd med designmanualen.

## 3. Typography Rules

### Font Family

- **Primary**: `Raleway`
- **Fallback stack**: `Raleway, "Helvetica Neue", Arial, sans-serif`
- **Usage rule**: Raleway skal brukes på all tekst

### Hierarchy

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| Display XL | 64px | 700 | 1.05 | 0 | Brukes kun ved store kampanje- eller hero-overskrifter |
| Display L | 48px | 700 | 1.10 | 0 | Store seksjonsoverskrifter |
| H1 | 40px | 700 | 1.15 | 0 | Primære sideoverskrifter |
| H2 | 32px | 700 | 1.20 | 0 | Seksjonsoverskrifter |
| H3 | 24px | 700 | 1.25 | 0 | Korttitler og tydelige undertitler |
| H4 | 20px | 700 | 1.30 | 0 | Kompakte titler |
| Lead | 20px | 500 | 1.50 | 0 | Innledningstekst |
| Body Base | 16px | 500 | 1.55 | 0 | Standard brødtekst |
| Body Small | 14px | 500 | 1.50 | 0 | Metadata, hjelpetekst |
| Label | 14px | 700 | 1.30 | 0.2px | Knapper, tags, UI-labels |
| Caption | 12px | 500 | 1.40 | 0.2px | Mikrocopy og sekundær info |

### Principles

- Bruk **Raleway Medium** til løpende tekst
- Bruk **Raleway Bold** til titler, undertitler og utheving i tekst
- Hold uttrykket vennlig, luftig og lettlest
- Unngå aggressiv bruk av uppercase som primært stilgrep
- La typografien støtte et varmt og tilgjengelig brukeruttrykk fremfor et monumentalt corporate-uttrykk

## 4. Component Stylings

### Buttons

**Primary Peach Button**
- Background: Hime Fersken (`#ff8278`)
- Text: Hvit (`#ffffff`), 14px, weight 700
- Padding: 12px vertical, 18px horizontal
- Border: 1px solid Hime Fersken (`#ff8278`)
- Border radius: 8px
- Use: Primære handlinger

**Secondary Dark Button**
- Background: Mørk petrol (`#003c46`)
- Text: Hvit (`#ffffff`), 14px, weight 700
- Padding: 12px vertical, 18px horizontal
- Border radius: 8px
- Use: Sekundære handlinger med høy kontrast

**Ghost Button**
- Background: Transparent / Hvit
- Text: Mørk petrol (`#003c46`)
- Border: 1px solid Mørk petrol (`#003c46`)
- Padding: 12px vertical, 18px horizontal
- Border radius: 8px
- Use: Sekundære handlinger på lyse flater

**Accent Button / Highlight CTA**
- Background: Kontrast Turkis (`#00a6c1`)
- Text: Hvit (`#ffffff`)
- Padding: 12px vertical, 18px horizontal
- Border radius: 8px
- Use: Kun når ekstra oppmerksomhet er ønsket

### Cards & Containers

**Standard Content Card**
- Background: Hvit (`#ffffff`)
- Border radius: 12px
- Border: 1px solid rgba(0,60,70,0.08)
- Shadow: none or very subtle
- Padding: 20px
- Use: Innholdskort, fordelsmoduler, informasjonselementer

**Soft Section Panel**
- Background: Lys grå (`#dcdcdc`) eller svært lys tint av samme
- Border radius: 16px
- Padding: 24px
- Use: Skille mellom innholdsseksjoner

### Inputs & Forms

- Background: Hvit (`#ffffff`)
- Text: Mørk petrol (`#003c46`)
- Border: 1px solid rgba(0,60,70,0.18)
- Border radius: 8px
- Padding: 12px 14px
- Focus state: border skifter til Kontrast Turkis (`#00a6c1`) eller Hime Fersken (`#ff8278`) avhengig av kontekst
- Error state: border og hjelpetekst kan bruke Hime Fersken (`#ff8278`)

### Navigation

**Top bar**
- Background: Hvit (`#ffffff`) som standard
- Height: cirka 64px desktop, 56px mobile
- Logo: Hime-logo i fersken på lys bakgrunn, hvit logo på fersken eller mørk bakgrunn
- Nav links: 16px Raleway Medium i mørk petrol (`#003c46`)
- Active state: fersken eller turkis detalj, brukt kontrollert

**Mobile navigation**
- Bakgrunn: Hvit (`#ffffff`)
- Link rows: 18px Raleway Medium
- Padding: 16px per rad

### Image Treatment

- **Fotostil**: Lyse, glade bilder med mennesker som ser på TV eller bruker internett i ulike settinger hjemme eller rundt hjemmet
- **Color tie-in**: Bilder kan gjerne ha innslag av ferskenfarge i klær eller detaljer
- **Illustrasjoner**: På lyse bakgrunner brukes versjoner med innslag av fersken; på ferskenfarget bakgrunn brukes kun hvit og mørk farge
- **Ikoner**: På lyse bakgrunner brukes ikonvarianter med ferskeninnslag; de skal ikke brukes på mørke bakgrunner

### Tags / Badges

**Primary Tag**
- Background: rgba(255,130,120,0.12)
- Text: Mørk petrol (`#003c46`)
- Border: 1px solid Hime Fersken (`#ff8278`)
- Padding: 6px 10px
- Border radius: 999px

**Neutral Tag**
- Background: Lys grå (`#dcdcdc`)
- Text: Mørk petrol (`#003c46`)
- Padding: 6px 10px
- Border radius: 999px

## 5. Layout Principles

### Spacing System

Base unit: **8px**

| Token | Value | Typical Use |
|-------|-------|-------------|
| xs | 4px | Tette mellomrom |
| sm | 8px | Basisluft |
| md | 12px | Tett komponentluft |
| base | 16px | Standard innvendig spacing |
| lg | 20px | Komfortabel komponentluft |
| xl | 24px | Seksjonsinternt mellomrom |
| 2xl | 32px | Luft mellom større moduler |
| 3xl | 48px | Seksjonsluft |
| section | 64-80px | Mellom hovedseksjoner |

### Grid & Container

- Max content width: 1200-1280px
- Desktop horizontal padding: 32px
- Tablet horizontal padding: 24px
- Mobile horizontal padding: 16px
- Card grid: 3-up desktop, 2-up tablet, 1-up mobile
- Gutters: 24px desktop, 16px mobile

### Whitespace Philosophy

Hime skal ha mye luft, spesielt på lyse flater. Layouten skal føles ryddig, vennlig og lett å navigere. Unngå tunge eller kompakte oppsett som gir et hardt eller institusjonelt inntrykk.

### Border Radius Scale

| Token | Value | Typical Use |
|-------|-------|-------------|
| tight | 8px | Knapper og inputfelt |
| card | 12px | Kort og innholdsbeholdere |
| panel | 16px | Større flater og seksjoner |
| pill | 999px | Tags og små badges |
| circle | 50% | Ikonbeholdere |

## 6. Depth & Elevation

Hime sitt system bør være rent og rolig, med svært moderat dybdebruk.

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 — Flat | Ingen skygge | Standardflater |
| 1 — Soft separation | 1px border eller svært svak shadow | Kort på lyse flater |
| 2 — Interactive focus | Tydelig border/fokusfarge | Inputs og interaktive elementer |

Shadow philosophy: bruk minimal skygge. Hierarki skal primært komme fra luft, farge og typografi.

## 7. Do's and Don'ts

### Do

- Bruk Hime Fersken (`#ff8278`) som tydeligste merkevarefarge
- Bruk Raleway konsekvent på all tekst
- Bruk Raleway Medium i løpende tekst og Bold i overskrifter og utheving
- Hold uttrykket lyst, vennlig og hjemmenært
- Bruk turkis (`#00a6c1`) sparsomt for å skape fokus
- Bruk lyse, glade bilder som viser mennesker hjemme med TV eller internett
- Sørg for god luft rundt logo og hovedelementer
- Bruk riktig logoversjon basert på bakgrunn: fersken på lys bakgrunn, hvit på fersken eller mørk bakgrunn

### Don't

- Ikke bruk andre logofarger enn de som er definert i manualen
- Ikke strekk eller manipuler logoen
- Ikke bruk ikonene på mørke bakgrunner
- Ikke overbruk turkis som hovedfarge
- Ikke gjør uttrykket mørkt, tungt eller for corporate
- Ikke bruk dramatisk hero-estetikk som bryter med Hime sitt varme uttrykk
- Ikke bruk for harde kontraster eller tunge gradients

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | ≤ 600px | 1-kolonne layout, enklere navigasjon |
| Tablet | 601-1023px | 2-kolonne kortgrid, mer luft |
| Desktop | ≥ 1024px | Full layout, 3-kolonne grid |

### Touch Targets

- Minimum 44x44px på mobile interaksjoner
- Knapper bør ha god innvendig padding og tydelig kontrast

### Collapsing Strategy

- Navigasjon kollapser til hamburger på mindre skjermer
- Kort restacker fra 3 → 2 → 1 kolonne
- Overskrifter skaleres ned uten å miste luft og lesbarhet

## 9. Agent Prompt Guide

### Quick Color Reference

- Primary brand: Hime Fersken (`#ff8278`)
- Accent: Kontrast Turkis (`#00a6c1`)
- Heading text: Mørk petrol (`#003c46`)
- Background: Hvit (`#ffffff`)
- Secondary background: Lys grå (`#dcdcdc`)

### Example Component Prompts

- "Lag en primærknapp med Hime Fersken (`#ff8278`), hvit tekst i Raleway Bold 14px, 8px radius og vennlig, tydelig CTA-uttrykk."
- "Lag et informasjonskort med hvit bakgrunn, 12px radius, mørk petrol tekst og luftig spacing."
- "Design en hero-seksjon for Hime med lys og glad livsstilsfoto fra hjemmet, Raleway Bold overskrift og ferskenfarget CTA."
- "Lag tags med lys fersken bakgrunnstint, mørk petrol tekst og pill-form."
- "Lag en seksjonsflate i lys grå (`#dcdcdc`) for å skille innholdsområder på en rolig måte."

### Iteration Guide

1. Prioriter fontbytte til Raleway først
2. Bytt hovedfarge fra Vodafone-rød til Hime Fersken
3. Fjern mørk og dramatisk Vodafone-estetikk til fordel for lyse flater
4. Juster knapper, tags og seksjonsflater til en rundere og vennligere form
5. Verifiser alltid logo- og illustrasjonsbruk mot Hime-manualen

### Known Gaps

- Eksakte digitale komponentstørrelser utover manualen er her tolket og operasjonalisert for et moderne UI-system
- Sekundær tekstgrå og enkelte border/focus-verdier er definert som praktiske systemverdier for å gjøre designfilen produksjonsklar
- Manualen beskriver identitetsregler, ikke et komplett digitalt komponentbibliotek; derfor er enkelte UI-spesifikasjoner profesjonelle anbefalinger basert på manualen
