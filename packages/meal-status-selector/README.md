# @minilogg/meal-status-selector

Horisontell väljare med tre rundade knappar för att rapportera hur en måltid gick: **Bra**, **Okej** eller **Inte bra**.

## Användning

```jsx
import { MealStatusSelector } from "@minilogg/meal-status-selector";

<MealStatusSelector
  defaultValue="bra"
  onChange={(value) => console.log(value)}
/>;
```

## Props

| Prop           | Typ                                | Default                | Beskrivning                                         |
| -------------- | ---------------------------------- | ---------------------- | --------------------------------------------------- |
| `value`        | `string`                           | –                      | Kontrollerat värde (`"bra"` \| `"okej"` \| `"inte-bra"`). |
| `defaultValue` | `string`                           | –                      | Initialt värde i okontrollerat läge.                |
| `onChange`     | `(value: string) => void`          | –                      | Anropas vid val.                                    |
| `label`        | `string`                           | `"Hur gick måltiden?"` | Synlig etikett för radiogroup.                      |
| `hideLabel`    | `boolean`                          | `false`                | Dölj etiketten visuellt (kvar för skärmläsare).     |
| `size`         | `"sm" \| "md" \| "lg"`             | `"md"`                 | Storlek på knapparna.                               |
| `disabled`     | `boolean`                          | `false`                | Inaktivera hela kontrollen.                         |
| `options`      | `Array`                            | Bra / Okej / Inte bra  | Anpassa knapparna (`value`, `label`, `icon`, `tone`). |

## Tillgänglighet

- `role="radiogroup"` med tre `role="radio"`-knappar och `aria-checked`.
- Tangentbord: piltangenter byter val, Home/End hoppar till första/sista.
- Färg är inte enda signalen – ikon, text och stark vald-state används tillsammans.
- Stora touch-ytor (≥ 52px höjd, `md` 64px, `lg` 84px).

## Tema

Komponenten stödjer både ljust och mörkt tema via `prefers-color-scheme` samt
manuellt override via `data-theme="light"` / `data-theme="dark"`.
