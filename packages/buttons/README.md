# @fredrika/buttons

Standardknapp med varianter och storlekar.

## Användning

```jsx
import { Button } from "@fredrika/buttons";

<Button variant="primary" onClick={handleSave}>Spara</Button>
<Button variant="danger" disabled>Ta bort</Button>
```

## Props

| Prop        | Typ                                                | Default      | Beskrivning                                   |
| ----------- | -------------------------------------------------- | ------------ | --------------------------------------------- |
| `children`  | `ReactNode`                                        | —            | Knappens etikett.                             |
| `variant`   | `"primary" \| "secondary" \| "ghost" \| "danger"`  | `"primary"`  | Visuell stil som signalerar åtgärdens vikt.   |
| `size`      | `"sm" \| "md" \| "lg"`                             | `"md"`       | Storlek.                                      |
| `type`      | `"button" \| "submit" \| "reset"`                  | `"button"`   | HTML-knapptyp.                                |
| `disabled`  | `boolean`                                          | `false`      | Inaktiverar knappen.                          |
| `onClick`   | `(e) => void`                                      | —            | Klickhanterare.                               |
| `className` | `string`                                           | `""`         | Extra CSS-klasser.                            |

## Riktlinjer

- Använd `primary` för den primära åtgärden i en vy – endast en per vy.
- Använd `danger` för destruktiva åtgärder (t.ex. radera) och bekräfta i en `Modal`.
- `ghost` passar för sekundära åtgärder i tät UI (t.ex. toolbars).

## Feedback

Vi förbättrar `Button` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,buttons&title=%5BFeedback%5D+buttons%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,buttons&title=%5BBug%5D+buttons%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,buttons&title=%5BFeature%5D+buttons%3A+)

Se alla pågående diskussioner under labeln [`buttons`](../../issues?q=is%3Aissue+label%3Abuttons).
