# @fredrika/dropdowns

Tillgänglig meny som öppnas vid klick.

## Användning

```jsx
import { Dropdown } from "@fredrika/dropdowns";

<Dropdown
  label="Välj språk"
  align="right"
  items={[
    { label: "Svenska", value: "sv" },
    { label: "English",  value: "en" },
    { label: "Norsk", value: "no", disabled: true },
  ]}
  onSelect={(item) => setLang(item.value)}
/>
```

## Props

| Prop       | Typ                                                              | Default  | Beskrivning                                    |
| ---------- | ---------------------------------------------------------------- | -------- | ---------------------------------------------- |
| `label`    | `string`                                                         | `"Menu"` | Text på utlösarknappen.                        |
| `items`    | `Array<{ label, value?, disabled? }>`                            | `[]`     | Menyalternativ.                                |
| `onSelect` | `(item) => void`                                                 | —        | Anropas när ett alternativ väljs.              |
| `align`    | `"left" \| "right"`                                              | `"left"` | Justering av menyn relativt utlösaren.         |

## Beteende

- Stänger automatiskt vid klick utanför eller `Escape`.
- Sätter `aria-haspopup`, `aria-expanded` och använder `role="menu"`/`menuitem` för tillgänglighet.
- Inaktiverade items kan inte väljas och triggar inte `onSelect`.
