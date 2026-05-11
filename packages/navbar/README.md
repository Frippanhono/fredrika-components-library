# @fredrika/navbar

Responsiv toppnavigering med varumärke, länkar och åtgärder.

## Användning

```jsx
import { Navbar } from "@fredrika/navbar";
import { Button } from "@fredrika/buttons";

<Navbar
  brand="Fredrika"
  activeHref="/"
  links={[
    { label: "Hem", href: "/" },
    { label: "Komponenter", href: "/components" },
    { label: "Om", href: "/about" },
  ]}
  actions={<Button size="sm">Logga in</Button>}
  onNavigate={(link) => router.push(link.href)}
/>
```

## Props

| Prop         | Typ                                       | Default | Beskrivning                                                                       |
| ------------ | ----------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `brand`      | `ReactNode`                               | —       | Logotyp eller varumärkesnamn till vänster.                                        |
| `links`      | `Array<{ label, href? }>`                 | `[]`    | Navigeringslänkar.                                                                |
| `actions`    | `ReactNode`                               | —       | Åtgärder till höger (t.ex. inloggningsknapp).                                     |
| `activeHref` | `string`                                  | —       | `href` som ska markeras som aktiv.                                                |
| `onNavigate` | `(link) => void`                          | —       | Om angiven används den istället för default-länknavigering (förhindrar omladdning). |

## Beteende

- På små skärmar kollapsas länkarna bakom en hamburgerknapp.
- Vid klick på en länk stängs den mobila menyn automatiskt.
