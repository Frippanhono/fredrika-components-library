# @minilogg/cards

Kortkomponenter för att gruppera relaterat innehåll.

## Användning

```jsx
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "@minilogg/cards";
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

| Komponent    | Beskrivning                                              |
| ------------ | -------------------------------------------------------- |
| `Card`       | Yttre container med ram och bakgrund.                    |
| `CardHeader` | Övre sektion, lämplig för rubrik och åtgärder.           |
| `CardTitle`  | Semantisk `<h3>`-rubrik.                                 |
| `CardBody`   | Huvudinnehåll.                                           |
| `CardFooter` | Nedre sektion, ofta knappar eller metadata.              |

Alla komponenter tar `children` och `className` och vidarebefordrar övriga props till det underliggande elementet.

## Feedback

Vi förbättrar `Card`-familjen löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,cards&title=%5BFeedback%5D+cards%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,cards&title=%5BBug%5D+cards%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,cards&title=%5BFeature%5D+cards%3A+)

Se alla pågående diskussioner under labeln [`cards`](../../issues?q=is%3Aissue+label%3Acards).
