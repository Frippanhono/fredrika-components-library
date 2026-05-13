# MiniLogg Components Library

Ett komponentbibliotek i React, organiserat som ett monorepo under `packages/`. Varje paket är fristående och kan användas oberoende.

## Installation och utveckling

```bash
npm install
npm run dev
```

Detta startar Vite-demosajten (`src/`) där alla komponenter visas.

## Paket

| Paket                                        | Beskrivning                                              |
| -------------------------------------------- | -------------------------------------------------------- |
| [@minilogg/badges](packages/badges)          | Etiketter för status, kategori och räknare.              |
| [@minilogg/buttons](packages/buttons)        | Knappar med varianter och storlekar.                     |
| [@minilogg/cards](packages/cards)            | Kortprimitiver (Card, Header, Body, Footer, m.fl.).      |
| [@minilogg/child-card](packages/child-card)  | Pedagogiskt kort för ett barn (namn, status, avatar).  |
| [@minilogg/department-overview-card](packages/department-overview-card) | Hero-kort för en avdelning (barn, pedagoger, tema). |
| [@minilogg/dropdowns](packages/dropdowns)    | Tillgängliga menyer som öppnas vid klick.                |
| [@minilogg/inputs](packages/inputs)          | Textfält och textarea med etikett, hint och fel.         |
| [@minilogg/meal-status-selector](packages/meal-status-selector) | Väljare för måltidsstatus: Bra, Okej, Inte bra. |
| [@minilogg/message-card](packages/message-card) | Meddelande-/aviseringskort med roller och prioritet.  |
| [@minilogg/modals](packages/modals)          | Dialogrutor renderade via portal.                        |
| [@minilogg/navbar](packages/navbar)          | Responsiv toppnavigering.                                |
| [@minilogg/stat-card](packages/stat-card)    | Kompakt nyckeltalskort för dashboards.                  |
| [@minilogg/tabs](packages/tabs)              | Flikar för att växla mellan paneler.                     |
| [@minilogg/teacher-card](packages/teacher-card) | Kort för pedagog/personal med titel och avdelning.    |
| [@minilogg/toasts](packages/toasts)          | Toast-notifieringar via provider och `useToast`-hook.    |
| [@minilogg/weekly-schedule](packages/weekly-schedule) | Överskådlig veckovy med tider och responsiv layout. |

Varje paket har en egen README med detaljerad API-dokumentation och exempel. Varje exporterad komponent har även JSDoc-kommentarer som visas av redigeraren vid hover/autocomplete.

## Konventioner

- **CSS-klasser** använder prefixet `fc-` (MiniLogg Components) och BEM-liknande modifierare, t.ex. `fc-btn--primary`.
- **Props**: `className` kompletterar (skriver inte över) interna klasser. Övriga props vidarebefordras till det underliggande DOM-elementet där det är meningsfullt.
- **Tillgänglighet**: ARIA-attribut sätts automatiskt i komponenter som `Modal`, `Dropdown`, `Tabs` och `Input`.

## Feedback och vidareutveckling

Komponenterna utvecklas iterativt utifrån feedback från användare och teammedlemmar. Insikter om vad som fungerar och vad som kan förbättras är avgörande för bibliotekets kvalitet.

### Lämna feedback

Välj rätt mall så att rätt komponent får rätt label automatiskt:

- 💬 **Komponentfeedback** – generella intryck, smärtor eller idéer. [Skapa](.github/ISSUE_TEMPLATE/component_feedback.yml)
- 🐞 **Bugg** – något fungerar inte som dokumenterat. [Skapa](.github/ISSUE_TEMPLATE/bug_report.yml)
- ✨ **Funktionsönskemål** – nya props, varianter eller komponenter. [Skapa](.github/ISSUE_TEMPLATE/feature_request.yml)

Varje pakets README har också direktlänkar förfyllda med rätt komponent-label.

### Så hanteras feedback

1. Nya issues triageras veckovis och får labels (`bug`, `enhancement`, `feedback`) samt komponent-label (`buttons`, `modals`, …).
2. Återkommande teman sammanställs som underlag för nästa iteration av komponenten.
3. Breaking changes diskuteras öppet i issuen innan de planeras in.
4. När en förändring landar länkas den tillbaka i issuen så att den som gav feedback ser resultatet.

> Tips: Skärmdumpar, kodsnuttar och konkreta användningsfall gör feedback betydligt mer användbar.
