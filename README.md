# node-server-template

# 20260602-exam

Git: https://github.com/danibir/20260602-exam
Backend: Node.js, Express
Frontend: EJS, CSS
Database: MongoDB
Drift: PM2, Nginx (reverse proxy), UFW
Versjonskontroll: Git + GitHub

## Om systemet

Denne nodeserveren er en norsk webapplikasjon der elever kan registrere utfordringer de møter i undervisningen. Lærere kan deretter svare på innleggene og hjelpe elever. Applikasjonen presenterer hver utfordring med kategorier som igjenspeiler hvor kritisk utfordringen er.

## Funksjonelle krav

- Registrering av utfordringer
- Kategorisering av utfordringer (e.g. status)
- Vise frem utfordringer til lærere
- - Sortering basert på kategorier
- - Statusendring fra lærer(e)

- Full administrative funksjoner til systemadmin brukere
- - Fjerne data fra database
- - Opprette brukere
- - Slette brukere
- - Oppgradere brukere

## Driftplan

| Name          | Ip Address    | Role                      | DNS                           |
|---------------|---------------|---------------------------|-------------------------------|
| dev-server    | 10.12.15.120  | Development server        | eksamenserverdev.ikt-fag.no   |
| pub-server    | 10.12.15.121  | Production server         | eksamenserver.ikt-fag.no      |
| db-server     | 10.12.15.122  | Database server           | -                             |
| dns           | 10.12.15.10   | Dns server                | -                             |


## Versjonskontroll

### Branch "main" (default)
- Nyeste ferdig versjon. Blir hostet av pub-server
### Branch "dev"
- Brukes for utvikling av serveren. Push commits til main etter endringene har blitt testet.

## Risikoanalyse

| Risiko                                    | Sannsynlighet | Alvorlighet   | Risikonivå    | Tiltak                        |
|-------------------------------------------|---------------|---------------|---------------|-------------------------------|
| Uautorisert tilgang til database          | Middels       | Middels       | Middels       | Segmentert nettverk           |
| DDos-angrep mot webserver                 | Lav-middels   | Høy           | Høy           | Reverseproxy, rating limiting |
| Sårbarheter i tredjeparts-pakker          | Høy           | Middels       | Høy           | npm audit                     |
| Feilkonfigurert brannmur                  | Lav           | Høy           | Middels       | UFW                           |
| Serverkræsj                               | Middels       | Middels       | Middels       | PM2 startup                   |


## Tidsestimat

### Tidfrist:             48 timer

- Planlegging før prosjekt: 1.5 timer
- - #### Å etablere en tydelig forståelse av prosjektets mål, avgrense funksjonalitet, sikre felles forventninger og legge grunnlaget for en strukturert utviklingsprosess. Dette inkluderer kravavklaring, gjennomgang av vurderingskriterier og utforming av en enkel systemskisse og planleggingsdokumentasjon.
- - Kravspesifikasjon, avklare funksjoner, roller og brukerflyt
- - Systemskisse, tegne enkel arkitektur og datamodeller
- - Plan for versjonskontroll, definere branching‑strategi
- - Risikovurdering, identifisere tekniske og organisatoriske risikoer

- Backend-utvikling: 15 timer
- - #### Å utvikle kjernesystemet som håndterer autentisering, autorisering, brukeradministrasjon og behandling av databaser. Dette innebærer å etablere datamodeller, sikre trygg passordhåndtering, programmere meningsfull kode, og implimentere catch cases.
- - Oppsett av Express‑server
- - Datamodeller i MongoDB
- - Autentisering og autorisering
- - Admin‑funksjoner, opprette/slette/oppgradere brukere
- - CRUD for utfordringer
- - Validering og feilhåndtering
- - Logging
- - Sikkerhet 
- - - Helmet
- - - Rate limiting
- - - Passordhash
- - Catch cases og formvalidering

- Frontend-utvikling: 4 Timer
- - ### Å lage et enkelt, funksjonelt og brukervennlig grensesnitt som gjør det mulig for brukere og administratorer å samhandle med systemet. Dette inkluderer EJS‑maler, CSS‑stilark og gjenbrukbare partials for konsistent design.kt
- - EJS sider
- - - Partials
- - CSS design
- - UI

- Drift, protocoler og brannmur: 4 timer
- - ### Å sette opp en sikker og stabil produksjonsplattform. Dette innebærer konfigurering av DNS, reverse proxy, brannmurregler og nødvendige driftsrutiner for å sikre at systemet er tilgjengelig, beskyttet og riktig eksponert.
- - Nginx reverse proxy
- - PM2 oppsett
- - UFW konfigurasjon
- - DNS
- - Versionskontroll

- Brukerstøtte: 2 timer
- - ### Å gjøre løsningen forståelig og tilgjengelig for brukere med ulik teknisk kompetanse. Dette inkluderer dokumentasjon, guider og forklaringer som reduserer behovet for direkte support og sikrer god brukeropplevelse.
- - Dokumentasjon
- - Brukerveiledning
- - Logging i terminal

### Total utviklingstid:  26.5 timer

## Installasjon
- git
- npm
- pm2 (server)
- nodemon (lokal)

```bash
#For å clone repo-et
git clone https://github.com/danibir/20260602-exam.git
cd 20260602-exam
npm i
```
```bash
#For å starte programmet på server
pm2 start app.js
```
```bash
#For å sjekke statusen av programmet på server
pm2 status app.js
```
```bash
#For å opdatere repoet på server
git fetch && git pull && npm i && pm2 restart
```
```bash
#For å starte programmet lokalt
nodemon app.js
```