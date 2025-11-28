# GEO-rapport: Idrettsbarna

Denne rapporten dokumenterer arbeidet med Generative Engine Optimization (GEO) for å gjøre nettstedet lett å forstå og sitere av AI-svarmotorer.

## 1. Kartlegging
- **Nettsted:** Idrettsbarna (Babysvømming og svømmekurs i Asker)
- **Viktige sider:** Forsiden (`/`), Kurssider (`/kurs/:id`), Vilkår (`/vilkar`)

### Identifiserte mangler (før start):
- Mangler eksplisitte "AI-sammendrag" øverst på sidene.
- FAQ-seksjoner kan utvides med konkrete spørsmål (navle, oppstart).
- `FAQPage` schema mangler.

## 2. Endringer per side

### Forsiden (`/`)
- [x] AI-vennlig sammendrag lagt til (skjult for visuelle brukere, synlig for crawlere).
- [x] FAQPage schema implementert.
- [x] `Organization` schema implementert.

### Kurssider (`/kurs/:id`)
- [x] AI-vennlig sammendrag lagt til (dynamisk basert på kursinfo).
- [x] Spesifikke FAQs lagt til (Navel, Pris, Sted) i hovedinnholdet.
- [x] `Course` schema implementert.

## 3. Teknisk
- [x] `llms.txt` opprettet (`/public/llms.txt`).
- [x] `robots.txt` verifisert og oppdatert til `idrettsbarna.no`.
- [x] `sitemap.xml` verifisert og oppdatert til `idrettsbarna.no`.

## 4. Anbefalinger videre
- **Overvåkning:** Sjekk Google Search Console om noen uker for å se om "Course" og "FAQ" rich results dukker opp.
- **Innhold:** Fortsett å utvide FAQ-seksjonen basert på faktiske spørsmål fra kunder.

