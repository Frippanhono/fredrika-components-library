# @fredrika/toasts

Tillfälliga notifieringar (toasts) som visas via en provider och nås med en hook.

## Användning

Wrappa applikationen i `ToastProvider` och anropa `useToast()` där du behöver visa meddelanden.

```jsx
import { ToastProvider, useToast } from "@fredrika/toasts";

function Root() {
  return (
    <ToastProvider position="top-right">
      <App />
    </ToastProvider>
  );
}

function SaveButton() {
  const toast = useToast();
  return (
    <button onClick={() => toast.success("Sparat!")}>Spara</button>
  );
}
```

## `ToastProvider`

| Prop       | Typ                                                              | Default       | Beskrivning                |
| ---------- | ---------------------------------------------------------------- | ------------- | -------------------------- |
| `children` | `ReactNode`                                                      | —             | Applikationsträdet.        |
| `position` | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left"`   | `"top-right"` | Position på skärmen.       |

## `useToast()`

Returnerar ett objekt med följande metoder:

| Metod                     | Beskrivning                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `show(message, options?)` | Visa en toast. Returnerar id som kan användas med `dismiss`. |
| `success(message, opts?)` | Genväg med `variant: "success"`.                             |
| `error(message, opts?)`   | Genväg med `variant: "error"`.                               |
| `info(message, opts?)`    | Genväg med `variant: "info"`.                                |
| `warning(message, opts?)` | Genväg med `variant: "warning"`.                             |
| `dismiss(id)`             | Stäng en specifik toast i förtid.                            |

`options`:

| Fält       | Typ                                                | Default  | Beskrivning                                                       |
| ---------- | -------------------------------------------------- | -------- | ----------------------------------------------------------------- |
| `variant`  | `"info" \| "success" \| "warning" \| "error"`      | `"info"` | Färgvariant.                                                      |
| `duration` | `number`                                           | `3500`   | Millisekunder innan toasten stängs. Sätt `0` för manuell stängning. |

> `useToast()` måste anropas inuti `<ToastProvider>` – annars kastas ett fel.

## Feedback

Vi förbättrar `Toast`-systemet löpande baserat på input från användare och team.

- 💬 [Lämna komponentfeedback](../../issues/new?template=component_feedback.yml&labels=feedback,toasts&title=%5BFeedback%5D+toasts%3A+)
- 🐞 [Rapportera bugg](../../issues/new?template=bug_report.yml&labels=bug,toasts&title=%5BBug%5D+toasts%3A+)
- ✨ [Föreslå förbättring](../../issues/new?template=feature_request.yml&labels=enhancement,toasts&title=%5BFeature%5D+toasts%3A+)

Se alla pågående diskussioner under labeln [`toasts`](../../issues?q=is%3Aissue+label%3Atoasts).
