# Idrettsbarna – lær å svømme

Nettsted for svømmekurs (baby, småbarn, barn) i Asker. React 18 + Vite +
Tailwind + React Router, SPA med prerender-steg i `npm run build`. Innhold i
`constants.ts`, Supabase + EmailJS + Gemini i `services/`.

## Modell og effort-nivå

Se den globale `~/.claude/CLAUDE.md` for regelen om å oppgi modell og nivå per
oppgave. Nivåene som er avtalt for den pågående oppryddingen står i planen
under.

## Premium-opprydding – trinnvis plan

Godkjent 7. august 2026. Lav risiko først, én bolk per commit.

1. ~~**Medium** — Serif-font (Fraunces), duplisert `animation`-nøkkel,
   scratch-filer, `?v=${Date.now()}` på hero-bildet, ubrukt
   `isScheduleVisible`.~~ Ferdig.
2. **xhigh** — Fjern `default`-temaet. 37 `theme === 'nordic'`-forgreninger
   over 14+ filer; `Hero.tsx` har to komplette render-trær. `theme`-propen,
   `DesignToggle` og toggle-knappene i Navbar/Footer må vekk samtidig.
3. **high** — Slå sammen `BaerumLandingPage`, `DrammenLandingPage` og
   `LierLandingPage` til én config-drevet komponent. 180 identiske linjer hver,
   skiller seg kun i bynavn og meta.
4. **xhigh, seksjon for seksjon** — Migrer ~1850 hardkodede fargeklasser til
   CSS-variabel-tokenene som allerede finnes i `index.css`. Halvveis migrering
   er verre enn ingen; én seksjon per commit.
5. **high** — Trekk modal-orkestreringen ut av `HomePage.tsx` (7 modaler,
   14 useState).
6. **medium/high** — Designpolering: vertikal rytme-skala, parallax → rolig
   fade/scroll-reveal, konsekvent bildebehandling.

## Beslutninger som ikke skal reverseres

**Auto-scroll til `#services` skal beholdes.** Siden scroller automatisk ned
til «Våre kurs og tider» ved innlasting; brukeren trenger ikke bli stående på
hero. Ikke foreslå å fjerne dette. Konsekvens: hero er i praksis en visuell
overgang, ikke en landingsflate — vekt designinnsatsen mot Services og
Schedule.

## Verifisering

`npx tsc --noEmit` og `npm run build` (sistnevnte prerenderer 22 sider og
feiler synlig hvis en side brekker). Dev-server: `npm run dev` på port 5173,
konfigurert i `.claude/launch.json`.
