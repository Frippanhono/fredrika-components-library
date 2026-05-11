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
