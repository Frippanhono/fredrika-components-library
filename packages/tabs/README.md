# @minilogg/tabs

Flikkomponent som växlar mellan paneler.

## Användning

```jsx
import { Tabs } from "@minilogg/tabs";

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

## Feedback

Vi förbättrar `Tabs` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,tabs&title=%5BFeedback%5D+tabs%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,tabs&title=%5BBug%5D+tabs%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,tabs&title=%5BFeature%5D+tabs%3A+)

Se alla pågående diskussioner under labeln [`tabs`](../../issues?q=is%3Aissue+label%3Atabs).
