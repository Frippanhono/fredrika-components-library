# @minilogg/cards

Kortprimitiver för att gruppera relaterat innehåll. Domänspecifika kort
(`StatCard`, `ChildCard`, `MessageCard`) ligger i egna paket och bygger ovanpå dessa.

## Användning

```jsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardMedia,
  CardMeta,
  CardActions,
  CardBody,
  CardFooter,
} from "@minilogg/cards";
import { Button } from "@minilogg/buttons";

<Card>
  <CardHeader>
    <CardTitle>Profil</CardTitle>
  </CardHeader>
  <CardBody>Namn, e-post och inställningar.</CardBody>
  <CardFooter>
    <Button>Redigera</Button>
  </CardFooter>
</Card>;
```

## Komponenter

| Komponent       | Beskrivning                                                            |
| --------------- | ---------------------------------------------------------------------- |
| `Card`          | Yttre container. Stödjer `variant`, `tone`, `interactive`, `selected`. |
| `CardHeader`    | Övre sektion (rubrik, media, meta, åtgärder).                          |
| `CardTitle`     | Semantisk rubrik (`<h3>` som default, byts med `as`).                  |
| `CardSubtitle`  | Sekundär etikett under rubriken.                                       |
| `CardMedia`     | Plats för avatar, ikon eller bild.                                     |
| `CardMeta`      | Diskret metadata, t.ex. tidsstämpel.                                   |
| `CardActions`   | Grupp av knappar/länkar.                                               |
| `CardBody`      | Huvudinnehåll.                                                         |
| `CardFooter`    | Nedre sektion, ofta knappar eller metadata.                            |
| `getInitials`   | Helper som returnerar 1–2 versaler från ett namn.                      |

Alla komponenter tar `children` och `className` och vidarebefordrar övriga props till det underliggande elementet.

### Props på `Card`

| Prop          | Typ                                                              | Default     | Beskrivning                                |
| ------------- | ---------------------------------------------------------------- | ----------- | ------------------------------------------ |
| `variant`     | `"default" \| "elevated" \| "outline" \| "ghost"`                | `"default"` | Visuell stil.                              |
| `tone`        | `"neutral" \| "info" \| "success" \| "warning" \| "danger"`      | `"neutral"` | Accentfärg på vänsterkanten.               |
| `interactive` | `boolean`                                                        | `false`     | Klickbart kort med fokus och tangentbord.  |
| `selected`    | `boolean`                                                        | `false`     | Visuell markering för valt/aktivt kort.    |
| `as`          | `keyof JSX.IntrinsicElements`                                    | `"div"`     | Underliggande element.                     |
| `onClick`     | `(e) => void`                                                    | –           | Aktiverar tangentbordsstöd (Enter/Space).  |

## Domänkort

Färdiga kort som bygger på primitiverna i det här paketet finns som egna paket:

- [`@minilogg/stat-card`](../stat-card) – `StatCard`, nyckeltal för dashboards.
- [`@minilogg/child-card`](../child-card) – `ChildCard` med status, vårdnadshavare och avatar.
- [`@minilogg/message-card`](../message-card) – `MessageCard` / `NoticeCard` för meddelanden och aviseringar.

## Delad design

`Card` exponerar även basklassen `.fc-card__role-badge` (samt modifierare
för `--guardian`, `--child`, `--teacher`, `--admin`, `--system`). Den
används av domänkort för att rendera färgade rollmarkörer med ett
konsekvent utseende.
