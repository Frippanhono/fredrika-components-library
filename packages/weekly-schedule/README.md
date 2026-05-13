# @minilogg/weekly-schedule

En enkel veckovy med kort, tider, layout och responsivitet. Inte ett fullt
kalendersystem – fokus ligger på att visa en överskådlig vecka.

## Användning

```jsx
import { WeeklySchedule } from "@minilogg/weekly-schedule";

<WeeklySchedule
  title="Vecka 19"
  events={[
    { day: "mon", start: "09:00", end: "10:30", title: "Samling", tone: "info" },
    { day: "wed", start: "14:00", title: "Skapande verkstad", tone: "success" },
    { day: "fri", start: "11:30", title: "Lunch & vila" },
  ]}
/>;
```

## Komponenter

| Komponent         | Beskrivning                                                |
| ----------------- | ---------------------------------------------------------- |
| `WeeklySchedule`  | Container som visar dagar i en grid och händelser per dag. |
| `ScheduleEvent`   | Ett enskilt händelsekort (tid, titel, beskrivning, ton).   |
| `WEEKDAYS_SV`     | Standarduppsättning veckodagar mån–sön på svenska.         |

## Props – `WeeklySchedule`

| Prop         | Typ                                                            | Default                    | Beskrivning                                              |
| ------------ | -------------------------------------------------------------- | -------------------------- | -------------------------------------------------------- |
| `days`       | `Array<{ key, short, label }>`                                 | `WEEKDAYS_SV.slice(0, 5)`  | Dagar som ska visas (mån–fre som standard).              |
| `events`     | `Array<Event>`                                                 | `[]`                       | Händelser där `day` matchar någon `days[i].key`.         |
| `title`      | `ReactNode`                                                    | –                          | Valfri rubrik ovanför schemat.                           |
| `emptyLabel` | `ReactNode`                                                    | `"Inga händelser"`         | Text som visas i dagar utan händelser.                   |

### Event-objekt

| Fält          | Typ                                                              | Beskrivning                              |
| ------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| `day`         | `string`                                                         | Måste matcha `days[i].key`.              |
| `title`       | `ReactNode`                                                      | Händelsens rubrik.                       |
| `start`       | `string`                                                         | T.ex. `"09:00"` (sortering sker på den). |
| `end`         | `string`                                                         | T.ex. `"10:30"`.                         |
| `description` | `ReactNode`                                                      | Valfri beskrivning.                      |
| `tone`        | `"neutral" \| "info" \| "success" \| "warning" \| "danger"`      | Färgton på kortet.                       |
| `onClick`     | `(e) => void`                                                    | Gör kortet klickbart (Enter/Space).      |

## Responsivitet

- Bred skärm: en kolumn per dag (CSS-grid med `repeat(N, 1fr)`).
- Smal skärm (≤ 720 px): staplas till en kolumn. Då visas fullt dagsnamn
  (`label`) som rubrik i stället för den korta etiketten (`short`).
