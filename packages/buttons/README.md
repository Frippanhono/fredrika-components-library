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
