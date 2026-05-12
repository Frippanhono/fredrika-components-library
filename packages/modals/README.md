# @minilogg/modals

Tillgänglig dialogruta som renderas via portal till `document.body`.

## Användning

```jsx
import { useState } from "react";
import { Modal } from "@minilogg/modals";
import { Button } from "@minilogg/buttons";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Öppna</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Bekräfta borttagning"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Avbryt</Button>
      <Button variant="danger" onClick={handleDelete}>Ta bort</Button>
    </>
  }
>
  Är du säker på att du vill ta bort posten?
</Modal>
```

## Props

| Prop       | Typ                       | Default | Beskrivning                                       |
| ---------- | ------------------------- | ------- | ------------------------------------------------- |
| `open`     | `boolean`                 | —       | Styr om dialogen visas.                           |
| `onClose`  | `() => void`              | —       | Anropas när användaren stänger dialogen.          |
| `title`    | `ReactNode`               | —       | Rubrik. Som sträng används den även som aria-label.|
| `children` | `ReactNode`               | —       | Dialogens brödinnehåll.                           |
| `footer`   | `ReactNode`               | —       | Innehåll i footern, t.ex. knappar.                |
| `size`     | `"sm" \| "md" \| "lg"`    | `"md"`  | Bredd på dialogen.                                |

## Beteende

- Stänger vid klick på bakgrunden eller `Escape`.
- Låser scrollning på `document.body` medan dialogen är öppen.
- Sätter `role="dialog"` och `aria-modal="true"`.

## Feedback

Vi förbättrar `Modal` löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,modals&title=%5BFeedback%5D+modals%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,modals&title=%5BBug%5D+modals%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,modals&title=%5BFeature%5D+modals%3A+)

Se alla pågående diskussioner under labeln [`modals`](../../issues?q=is%3Aissue+label%3Amodals).
