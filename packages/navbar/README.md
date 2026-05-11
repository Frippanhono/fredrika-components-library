# @fredrika/navbar

Responsiv toppnavigering med varumärke, länkar och åtgärder.

## Användning

```jsx
import { Navbar } from "@fredrika/navbar";
import { Button } from "@fredrika/buttons";

<Navbar
  brand="Fredrika"
  activeHref="/"
  links={[
    { label: "Hem", href: "/" },
    { label: "Komponenter", href: "/components" },
    { label: "Om", href: "/about" },
  ]}
  actions={<Button size="sm">Logga in</Button>}
  onNavigate={(link) => router.push(link.href)}
/>
```

## Props

| Prop         | Typ                                       | Default | Beskrivning                                                                       |
| ------------ | ----------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `brand`      | `ReactNode`                               | —       | Logotyp eller varumärkesnamn till vänster.                                        |
| `links`      | `Array<{ label, href? }>`                 | `[]`    | Navigeringslänkar.                                                                |
| `actions`    | `ReactNode`                               | —       | Åtgärder till höger (t.ex. inloggningsknapp).                                     |
| `activeHref` | `string`                                  | —       | `href` som ska markeras som aktiv.                                                |
| `onNavigate` | `(link) => void`                          | —       | Om angiven används den istället för default-länknavigering (förhindrar omladdning). |

## Beteende

- På små skärmar kollapsas länkarna bakom en hamburgerknapp.
- Vid klick på en länk stängs den mobila menyn automatiskt.

## Feedback

Vi förbättrar `Navbar` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,navbar&title=%5BFeedback%5D+navbar%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,navbar&title=%5BBug%5D+navbar%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,navbar&title=%5BFeature%5D+navbar%3A+)

Se alla pågående diskussioner under labeln [`navbar`](../../issues?q=is%3Aissue+label%3Anavbar).
