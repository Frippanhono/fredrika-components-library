# @minilogg/inputs

Formulärfält med inbyggd etikett, hjälptext och felhantering.

## Användning

```jsx
import { Input, Textarea } from "@minilogg/inputs";

<Input
  label="E-post"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  hint="Vi delar aldrig din adress"
  error={emailError}
/>

<Textarea label="Beskrivning" rows={6} />
```

## Komponenter

### `Input`

| Prop        | Typ          | Default  | Beskrivning                                        |
| ----------- | ------------ | -------- | -------------------------------------------------- |
| `label`     | `ReactNode`  | —        | Etikett ovanför fältet.                            |
| `hint`      | `ReactNode`  | —        | Hjälptext (göms när `error` visas).                |
| `error`     | `ReactNode`  | —        | Felmeddelande; markerar fältet som ogiltigt.       |
| `type`      | `string`     | `"text"` | HTML input-typ (`text`, `email`, `password`, …).   |
| `id`        | `string`     | auto     | Valfritt id; annars genereras ett unikt.           |
| `className` | `string`     | `""`     | Extra CSS-klasser på wrappern.                     |

Övriga props (`value`, `onChange`, `placeholder`, …) vidarebefordras till `<input>`.

### `Textarea`

Samma props som `Input` förutom `type`, plus:

| Prop   | Typ      | Default | Beskrivning             |
| ------ | -------- | ------- | ----------------------- |
| `rows` | `number` | `4`     | Antal synliga textrader. |

## Tillgänglighet

- `label` kopplas till fältet via `htmlFor`/`id`.
- `aria-invalid` och `aria-describedby` sätts automatiskt baserat på `error`/`hint`.

## Feedback

Vi förbättrar `Input` och `Textarea` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,inputs&title=%5BFeedback%5D+inputs%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,inputs&title=%5BBug%5D+inputs%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,inputs&title=%5BFeature%5D+inputs%3A+)

Se alla pågående diskussioner under labeln [`inputs`](../../issues?q=is%3Aissue+label%3Ainputs).
