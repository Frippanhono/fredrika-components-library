# @fredrika/tabs

Flikkomponent som växlar mellan paneler.

## Användning

```jsx
import { Tabs } from "@fredrika/tabs";

<Tabs
  defaultIndex={0}
  onChange={(i) => console.log("Aktiv flik:", i)}
  tabs={[
    { label: "Översikt", content: <p>Sammanfattning…</p> },
    { label: "Detaljer", content: <p>Mer information…</p> },
    { label: "Historik", content: <p>Tidigare händelser…</p> },
  ]}
/>
```

## Props

| Prop           | Typ                                          | Default | Beskrivning                              |
| -------------- | -------------------------------------------- | ------- | ---------------------------------------- |
| `tabs`         | `Array<{ label, content }>`                  | `[]`    | Flikar att visa.                         |
| `defaultIndex` | `number`                                     | `0`     | Index på flik som visas initialt.        |
| `onChange`     | `(index: number) => void`                    | —       | Anropas när användaren byter flik.       |

## Tillgänglighet

Komponenten använder `role="tablist"`, `role="tab"`, `role="tabpanel"` och `aria-selected`.
