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

## Feedback

Vi förbättrar `Dropdown` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,dropdowns&title=%5BFeedback%5D+dropdowns%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,dropdowns&title=%5BBug%5D+dropdowns%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,dropdowns&title=%5BFeature%5D+dropdowns%3A+)

Se alla pågående diskussioner under labeln [`dropdowns`](../../issues?q=is%3Aissue+label%3Adropdowns).
