# @minilogg/child-card

Pedagogiskt kort för att presentera ett barn (namn, avdelning, status, avatar, vårdnadshavare). Bygger på `@minilogg/cards`.

```jsx
import { ChildCard, CHILD_STATUS_PRESETS } from "@minilogg/child-card";

<ChildCard
  name="Adam Persson"
  department="Solrosen"
  status="present"
  guardians={["Anja Persson", "Peter Persson"]}
/>
```

Statusnycklar: `present`, `absent`, `sick`, `leave`, `arriving`, `pickedup`. Skicka in `{ label, tone }` för egen status.
