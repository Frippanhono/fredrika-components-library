# @minilogg/department-overview-card

Hero/header-kort som presenterar en avdelning i en pedagogisk lärplattform. Visar avdelningens namn, antal inskrivna barn, antal pedagoger och aktuellt tema. Bygger på `@minilogg/cards`.

```jsx
import { DepartmentOverviewCard } from "@minilogg/department-overview-card";

<DepartmentOverviewCard
  name="Snäckan"
  childrenCount={16}
  teachersCount={3}
  theme="Färger och former"
/>;
```

Passar visuellt ihop med `ChildCard`, `TeacherCard`, `WeeklySchedule`, `MealStatusSelector` och `MessageCard`.
