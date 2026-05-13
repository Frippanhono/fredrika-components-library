# @minilogg/message-card

Kort för meddelanden och aviseringar (`MessageCard` / `NoticeCard`). Bygger på `@minilogg/cards`.

```jsx
import { MessageCard, NoticeCard, MESSAGE_ROLE_PRESETS } from "@minilogg/message-card";

<MessageCard
  sender={{ name: "Anna Lärare", role: "teacher" }}
  recipient={{ name: "Per Persson", role: "guardian" }}
  subject="Utvecklingssamtal"
  preview="Hej Per! Vill du boka tid nästa vecka?"
  timestamp="09:42"
  unread
/>
```

Rollnycklar: `teacher`, `guardian`, `child`, `admin`, `system`.
