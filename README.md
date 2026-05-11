# Fredrika Components Library

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
| [@fredrika/badges](packages/badges)          | Etiketter för status, kategori och räknare.              |
| [@fredrika/buttons](packages/buttons)        | Knappar med varianter och storlekar.                     |
| [@fredrika/cards](packages/cards)            | Kortlayout med header, body och footer.                  |
| [@fredrika/dropdowns](packages/dropdowns)    | Tillgängliga menyer som öppnas vid klick.                |
| [@fredrika/inputs](packages/inputs)          | Textfält och textarea med etikett, hint och fel.         |
| [@fredrika/modals](packages/modals)          | Dialogrutor renderade via portal.                        |
| [@fredrika/navbar](packages/navbar)          | Responsiv toppnavigering.                                |
| [@fredrika/tabs](packages/tabs)              | Flikar för att växla mellan paneler.                     |
| [@fredrika/toasts](packages/toasts)          | Toast-notifieringar via provider och `useToast`-hook.    |

Varje paket har en egen README med detaljerad API-dokumentation och exempel. Varje exporterad komponent har även JSDoc-kommentarer som visas av redigeraren vid hover/autocomplete.

## Konventioner

- **CSS-klasser** använder prefixet `fc-` (Fredrika Components) och BEM-liknande modifierare, t.ex. `fc-btn--primary`.
- **Props**: `className` kompletterar (skriver inte över) interna klasser. Övriga props vidarebefordras till det underliggande DOM-elementet där det är meningsfullt.
- **Tillgänglighet**: ARIA-attribut sätts automatiskt i komponenter som `Modal`, `Dropdown`, `Tabs` och `Input`.
