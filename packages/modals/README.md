# @fredrika/modals

Tillgänglig dialogruta som renderas via portal till `document.body`.

## Användning

```jsx
import { useState } from "react";
import { Modal } from "@fredrika/modals";
import { Button } from "@fredrika/buttons";

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
