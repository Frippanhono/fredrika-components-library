import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  WeeklySchedule,
  ScheduleEvent,
  WEEKDAYS_SV,
} from "@minilogg/weekly-schedule";

describe("WeeklySchedule", () => {
  it("renders default Mon-Fri days", () => {
    render(<WeeklySchedule />);
    expect(screen.getByText("Mån")).toBeInTheDocument();
    expect(screen.getByText("Tis")).toBeInTheDocument();
    expect(screen.getByText("Ons")).toBeInTheDocument();
    expect(screen.getByText("Tor")).toBeInTheDocument();
    expect(screen.getByText("Fre")).toBeInTheDocument();
    expect(screen.queryByText("Lör")).not.toBeInTheDocument();
  });

  it("places events under the matching day and shows empty label otherwise", () => {
    render(
      <WeeklySchedule
        events={[
          { day: "mon", start: "09:00", end: "10:00", title: "Samling" },
        ]}
      />,
    );
    expect(screen.getByText("Samling")).toBeInTheDocument();
    expect(screen.getByText("09:00–10:00")).toBeInTheDocument();
    // Tisdag should display the empty label
    expect(screen.getAllByText("Inga händelser").length).toBeGreaterThan(0);
  });

  it("sorts events within a day by start time", () => {
    render(
      <WeeklySchedule
        events={[
          { day: "mon", start: "14:00", title: "Eftermiddag" },
          { day: "mon", start: "08:00", title: "Morgon" },
          { day: "mon", start: "11:00", title: "Lunch" },
        ]}
      />,
    );
    const titles = screen
      .getAllByText(/Morgon|Lunch|Eftermiddag/)
      .map((el) => el.textContent);
    expect(titles).toEqual(["Morgon", "Lunch", "Eftermiddag"]);
  });

  it("renders a custom set of days using the days prop", () => {
    render(
      <WeeklySchedule
        days={WEEKDAYS_SV}
        events={[{ day: "sun", start: "10:00", title: "Helg" }]}
      />,
    );
    expect(screen.getByText("Sön")).toBeInTheDocument();
    expect(screen.getByText("Helg")).toBeInTheDocument();
  });

  it("renders a title when provided", () => {
    render(<WeeklySchedule title="Vecka 19" />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Vecka 19" }),
    ).toBeInTheDocument();
  });

  it("ignores events that target an unknown day", () => {
    render(
      <WeeklySchedule
        events={[{ day: "xyz", start: "10:00", title: "Försvunnen" }]}
      />,
    );
    expect(screen.queryByText("Försvunnen")).not.toBeInTheDocument();
  });
});

describe("ScheduleEvent", () => {
  it("renders title, time range and description", () => {
    render(
      <ScheduleEvent
        title="Lunch"
        start="11:30"
        end="12:00"
        description="Köttbullar"
      />,
    );
    expect(screen.getByText("Lunch")).toBeInTheDocument();
    expect(screen.getByText("11:30–12:00")).toBeInTheDocument();
    expect(screen.getByText("Köttbullar")).toBeInTheDocument();
  });

  it("renders as a button when onClick is provided and fires click", () => {
    const onClick = vi.fn();
    render(<ScheduleEvent title="Klicka" onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /Klicka/ });
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies tone modifier class", () => {
    const { container } = render(
      <ScheduleEvent title="Info" tone="info" />,
    );
    expect(container.querySelector(".fc-week__event--info")).not.toBeNull();
  });

  it("shows only start when end is missing", () => {
    render(<ScheduleEvent title="X" start="09:00" />);
    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  it("activates on Enter and Space when interactive", () => {
    const onClick = vi.fn();
    render(<ScheduleEvent title="Tangent" onClick={onClick} />);
    const btn = screen.getByRole("button", { name: /Tangent/ });
    btn.focus();
    fireEvent.keyDown(btn, { key: "Enter" });
    fireEvent.keyDown(btn, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("integrates with WeeklySchedule via event.onClick", () => {
    const onClick = vi.fn();
    render(
      <WeeklySchedule
        events={[
          { day: "mon", start: "09:00", title: "Klickbar", onClick },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Klickbar/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
