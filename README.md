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

| Name          | Ip Address    | Role                      | DNS                       |
|---------------|---------------|---------------------------|---------------------------|
| dev-server    | 10.12.15.120  | Development server        | -                         |
| pub-server    | 10.12.15.121  | Production server         | -                         |
| db-server     | 10.12.15.122  | Database server           | -                         |

...

## Versjonskontroll

### Branch "main" (default)
- Nyeste ferdig versjon. Blir hostet av pub-server
### Branch "dev"
- Brukes for utvikling av serveren. Push commits til main etter endringene har blitt testet.

## Risikoanalyse

| Risiko                                    | Sannsynlighet | Alvorlighet   | Risikonivå    | Tiltak                                         |
|-------------------------------------------|---------------|---------------|---------------|------------------------------------------------|
| Uautorisert tilgang til database          | Middels       | Middels       | Middels       | Segmentert nettverk                            |


## Tidsestimat

### Tidfrist:             48 timer

- Planlegging før prosjekt: 1.5 timer
- - #### Å etablere en tydelig forståelse av prosjektets mål, avgrense funksjonalitet, sikre felles forventninger og legge grunnlaget for en strukturert utviklingsprosess. Dette inkluderer kravavklaring, gjennomgang av vurderingskriterier og utforming av en enkel systemskisse og planleggingsdokumentasjon.
- - ...

- Backend-utvikling: 10.5 timer
- - #### Å utvikle kjernesystemet som håndterer autentisering, autorisering, brukeradministrasjon og behandling av databaser. Dette innebærer å etablere datamodeller, sikre trygg passordhåndtering, programmere meningsfull kode, og implimentere catch cases.
- - ...

- Frontend-utvikling: ... Timer
- - ### Å lage et enkelt, funksjonelt og brukervennlig grensesnitt som gjør det mulig for brukere og administratorer å samhandle med systemet. Dette inkluderer EJS‑maler, CSS‑stilark og gjenbrukbare partials for konsistent design.kt
- - ...

- Drift, protocoler og brannmur: ... timer
- - ### Å sette opp en sikker og stabil produksjonsplattform. Dette innebærer konfigurering av DNS, reverse proxy, brannmurregler og nødvendige driftsrutiner for å sikre at systemet er tilgjengelig, beskyttet og riktig eksponert.
- - ...

- Brukerstøtte: ... timer
- - ### Å gjøre løsningen forståelig og tilgjengelig for brukere med ulik teknisk kompetanse. Dette inkluderer dokumentasjon, FAQ og forklaringer som reduserer behovet for direkte support og sikrer god brukeropplevelse.
- - Dokumentasjon
- - FAQ
- - Brukerveiledning

### Total utviklingstid:  ... timer

## Kommunikasjonsplan

- Kunden får ukentlige statusoppdateringer med fremdrift, eventuelle utfordringer og plan for neste uke.
- Endringer i krav, funksjonalitet eller tidsplan avtales skriftlig før implementasjon.
- Kritiske feil meldes umiddelbart og håndteres etter avtalt prioritet.
- All kommunikasjon skjer via e‑post eller annen avtalt kanal.
- Dokumentasjon og tekniske beslutninger loggføres fortløpende slik at kunden har full innsikt i utviklingsprosessen.
- Ved behov gjennomføres korte avklaringsmøter (digitalt eller fysisk) for å sikre at prosjektet holder riktig retning.
- Kunden informeres når milepæler er nådd, og får mulighet til å gi tilbakemeldinger før neste fase starter.
- Supporthenvendelser behandles innenfor avtalte tidsvinduer og etter definerte responstider.

## FAQ
### Konto & Innlogging ###

### Administratorer ###

### Sikkerhet & Personvern ###

### Tekniske spørsmål ###

### Systemdrift (for mer tekniske brukere eller dokumentasjon) ###

### Generelt ####

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