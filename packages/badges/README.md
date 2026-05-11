# @fredrika/badges

Liten etikettkomponent för status, kategori eller räknare.

## Användning

```jsx
import { Badge } from "@fredrika/badges";

<Badge variant="success">Aktiv</Badge>
<Badge variant="warning" size="sm">3</Badge>
```

## Props

| Prop        | Typ                                                       | Default     | Beskrivning                          |
| ----------- | --------------------------------------------------------- | ----------- | ------------------------------------ |
| `children`  | `ReactNode`                                               | —           | Innehåll i etiketten.                |
| `variant`   | `"neutral" \| "info" \| "success" \| "warning" \| "danger"` | `"neutral"` | Färgvariant som signalerar betydelse. |
| `size`      | `"sm" \| "md" \| "lg"`                                    | `"md"`      | Storlek på etiketten.                |
| `className` | `string`                                                  | `""`        | Extra CSS-klasser.                   |

Övriga props vidarebefordras till det underliggande `<span>`-elementet.

## Feedback

Vi förbättrar `Badge` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,badges&title=%5BFeedback%5D+badges%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,badges&title=%5BBug%5D+badges%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,badges&title=%5BFeature%5D+badges%3A+)

Se alla pågående diskussioner under labeln [`badges`](../../issues?q=is%3Aissue+label%3Abadges).
