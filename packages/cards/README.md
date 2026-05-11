# @fredrika/cards

Kortkomponenter för att gruppera relaterat innehåll.

## Användning

```jsx
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from "@fredrika/cards";
import { Button } from "@fredrika/buttons";

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
