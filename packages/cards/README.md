# @minilogg/cards

Kortkomponenter för att gruppera relaterat innehåll.

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
  StatCard,
} from "@minilogg/cards";
import { Button } from "@minilogg/buttons";

<Card>
  <CardHeader>
    <CardTitle>Profil</CardTitle>
  </CardHeader>
  <CardBody>
    Namn, e-post och inställningar.
  </CardBody>
  <CardFooter>
    <Button>Redigera</Button>
  </CardFooter>
</Card>
```

## Komponenter

| Komponent       | Beskrivning                                                   |
| --------------- | ------------------------------------------------------------- |
| `Card`          | Yttre container. Stödjer `variant`, `tone`, `interactive`, `selected`. |
| `CardHeader`    | Övre sektion (rubrik, media, meta, åtgärder).                 |
| `CardTitle`     | Semantisk rubrik (`<h3>` som default, byts med `as`).         |
| `CardSubtitle`  | Sekundär etikett under rubriken.                              |
| `CardMedia`     | Plats för avatar, ikon eller bild.                            |
| `CardMeta`      | Diskret metadata, t.ex. tidsstämpel.                          |
| `CardActions`   | Grupp av knappar/länkar.                                      |
| `CardBody`      | Huvudinnehåll.                                                |
| `CardFooter`    | Nedre sektion, ofta knappar eller metadata.                   |
| `StatCard`      | Färdig nyckeltalsruta för dashboards.                         |
| `ChildCard`     | Pedagogiskt kort för ett barn (namn, avdelning, status, avatar). |
| `ActivityCard`  | Feedrad för en aktivitet (aktivitet, tid, ikon, färgkodning).    |

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

## Återanvändning

### Barnkort

```jsx
<Card interactive onClick={() => openChild(child.id)}>
  <CardHeader>
    <CardMedia><Avatar name={child.name} /></CardMedia>
    <div>
      <CardTitle>{child.name}</CardTitle>
      <CardSubtitle>{child.age} år · {child.group}</CardSubtitle>
    </div>
    <CardActions><Badge variant="success">Närvarande</Badge></CardActions>
  </CardHeader>
</Card>
```

### ChildCard

Färdigt, pedagogiskt kort för ett barn. Bygger ovanpå `Card` och tar de
vanligaste fälten som direkta props.

```jsx
import { ChildCard } from "@minilogg/cards";

<ChildCard
  name="Alma Andersson"
  department="Solrosen"
  status="present"
  avatar="/avatars/alma.jpg"
  onClick={() => openChild("alma")}
/>;
```

| Prop          | Typ                                                                                  | Beskrivning                                                                 |
| ------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `name`        | `string`                                                                             | Barnets namn (rubrik och underlag för initialer).                          |
| `department`  | `ReactNode`                                                                          | Avdelning eller grupp (underrubrik).                                       |
| `status`      | `"present" \| "absent" \| "sick" \| "leave" \| "arriving" \| "pickedup" \| { label, tone }` | Närvarostatus. Sträng matchar en preset, objekt ger egen etikett.   |
| `avatar`      | `ReactNode \| string`                                                                | Bild-URL eller ReactNode. Saknas avatar visas automatiska initialer.       |
| `avatarAlt`   | `string`                                                                             | Alternativtext för bild-avatar (default = namnet).                         |
| `onClick`     | `(e) => void`                                                                        | Gör kortet klickbart (Enter/Space hanteras automatiskt).                   |
| `selected`    | `boolean`                                                                            | Markera som valt.                                                          |
| `footer`      | `ReactNode`                                                                          | Valfri footer, t.ex. knappar.                                              |
| `children`    | `ReactNode`                                                                          | Valfritt extra innehåll (renderas i `CardBody`).                           |

Statuspresets exporteras som `CHILD_STATUS_PRESETS` om du vill återanvända
etiketterna någon annanstans i UI:t.

### Aktivitet

```jsx
<Card variant="ghost" tone="info">
  <CardHeader>
    <CardMedia>📌</CardMedia>
    <div>
      <CardTitle as="h4">Lämnade på förskolan</CardTitle>
      <CardSubtitle>Alma av Pappa</CardSubtitle>
    </div>
    <CardMeta>08:14</CardMeta>
  </CardHeader>
</Card>
```

### ActivityCard

Färdig feedrad för aktivitets-/händelseflödet. Visar **aktivitet**, **tid**,
**ikon** och färgkodning (`tone`) i ett kompakt kort.

```jsx
import { ActivityCard } from "@minilogg/cards";

<ActivityCard
  type="dropoff"
  activity="Alma lämnad på förskolan"
  description="Lämnad av Pappa"
  time="08:14"
/>;

<ActivityCard
  icon="🌳"
  tone="success"
  activity="Utevistelse på gården"
  time="10:00–11:00"
/>;
```

| Prop          | Typ                                                                 | Beskrivning                                                                  |
| ------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `activity`    | `ReactNode`                                                         | Aktivitetens beskrivning (rubrik, `<h4>`).                                   |
| `time`        | `ReactNode`                                                         | Tidpunkt (visas som metadata).                                               |
| `icon`        | `ReactNode`                                                         | Ikon. Saknas den används ikonen från `type`.                                 |
| `tone`        | `"neutral" \| "info" \| "success" \| "warning" \| "danger"`         | Färgkodning. Saknas den används tonen från `type`.                           |
| `type`        | `keyof ACTIVITY_TYPE_PRESETS`                                       | Fördefinierad aktivitetstyp som ger ikon + ton.                              |
| `description` | `ReactNode`                                                         | Valfri detaljtext under rubriken.                                            |
| `onClick`     | `(e) => void`                                                       | Gör kortet klickbart (Enter/Space hanteras automatiskt).                     |
| `children`    | `ReactNode`                                                         | Valfritt extra innehåll (renderas i `CardBody`).                             |
| `footer`      | `ReactNode`                                                         | Valfri footer.                                                               |

Tillgängliga presets via `ACTIVITY_TYPE_PRESETS`: `dropoff`, `pickup`, `meal`,
`nap`, `outdoor`, `note`, `message`, `incident`, `sick`.

### Meddelanden

```jsx
<Card
  interactive
  tone={message.unread ? "info" : "neutral"}
  selected={message.id === activeId}
  onClick={() => open(message.id)}
>
  <CardHeader>
    <CardTitle>{message.from}</CardTitle>
    <CardMeta>{message.time}</CardMeta>
  </CardHeader>
  <CardBody>{message.preview}</CardBody>
</Card>
```

### Dashboard

```jsx
<div className="grid-cards">
  <StatCard label="Aktiva barn" value={128} delta="+4" trend="up" tone="success" />
  <StatCard label="Meddelanden" value={12} delta="3 olästa" tone="info" />
  <StatCard label="Avvikelser" value={2} delta="−1" trend="down" tone="warning" />
</div>
```

## Feedback

Vi förbättrar `Card`-familjen löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,cards&title=%5BFeedback%5D+cards%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,cards&title=%5BBug%5D+cards%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,cards&title=%5BFeature%5D+cards%3A+)

Se alla pågående diskussioner under labeln [`cards`](../../issues?q=is%3Aissue+label%3Acards).
