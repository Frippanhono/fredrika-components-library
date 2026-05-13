# @minilogg/teacher-card

Kort för att presentera en pedagog/personal med titel, avdelning och avatar. Bygger på `@minilogg/cards`.

```jsx
import { TeacherCard, TEACHER_TITLE_PRESETS } from "@minilogg/teacher-card";

<TeacherCard
  name="Anja Jansson"
  title="forskollarare"
  department="Solrosen"
  avatar="/avatars/anja.jpg"
/>
```

Titel-presets: `forskollarare`, `barnskotare`, `specialpedagog`, `vikarie`, `rektor`, `kock`.
Skicka in en fri sträng eller `{ label, tone }` för egen titel.
