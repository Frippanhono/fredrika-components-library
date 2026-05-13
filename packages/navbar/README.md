# @minilogg/navbar

Ikon-baserad navigering som lägger sig som en "tab bar" längst ner på mobila
skärmar och ersätter den klassiska toppnavigeringen på större skärmar.

## Användning

```jsx
import { Navbar } from "@minilogg/navbar";

<Navbar
  brand="MiniLogg"
  activeHref="/clara"
  links={[
    { label: "Anmäla frånvaro", href: "/absence", icon: <PhoneIcon /> },
    { label: "Checka in/ut", href: "/checkin", icon: <CheckIcon /> },
    { label: "Clara", href: "/clara", avatar: "/clara.jpg", featured: true },
    { label: "Kontaktlista", href: "/contacts", icon: <ContactsIcon /> },
    { label: "Mer", href: "/more", icon: <MoreIcon /> },
  ]}
  onNavigate={(link) => router.push(link.href)}
/>
```

## Props

| Prop         | Typ                                                   | Default              | Beskrivning                                                                       |
| ------------ | ----------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------- |
| `brand`      | `ReactNode`                                           | —                    | Logotyp eller varumärkesnamn (visas endast i desktopvy).                          |
| `links`      | `Array<{ label, href?, icon?, avatar?, featured? }>`  | `[]`                 | Navigeringslänkar. `icon`/`avatar` visas ovanför `label`.                         |
| `actions`    | `ReactNode`                                           | —                    | Åtgärder i desktopvy (döljs på mobil).                                            |
| `activeHref` | `string`                                              | —                    | `href` som ska markeras som aktiv.                                                |
| `onNavigate` | `(link) => void`                                      | —                    | Om angiven används den i stället för default-länknavigering (förhindrar omladdning). |
| `ariaLabel`  | `string`                                              | `"Huvudnavigering"`  | Tillgänglig etikett för `<nav>`-landmarken.                                       |

## Beteende

- **Mobil (≤ 720px):** navbar:en är fast förankrad längst ner i vyn. `brand`
  och `actions` döljs och länkarna fyller raden jämnt.
- **Desktop (> 720px):** samma rad sitter sticky i toppen av sidan tillsammans
  med `brand` och `actions`.
- En länk med `featured: true` framhävs visuellt – tillsammans med `avatar`
  visas en cirkulär bild som lyfter ur raden (lämpligt för t.ex. ett barns
  profilbild).

## Feedback

Vi förbättrar `Navbar` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,navbar&title=%5BFeedback%5D+navbar%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,navbar&title=%5BBug%5D+navbar%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,navbar&title=%5BFeature%5D+navbar%3A+)

Se alla pågående diskussioner under labeln [`navbar`](../../issues?q=is%3Aissue+label%3Anavbar).
