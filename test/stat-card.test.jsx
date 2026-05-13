import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@minilogg/stat-card";

describe("StatCard", () => {
  it("renders label, value and delta with trend modifier", () => {
    render(
      <StatCard
        data-testid="stat"
        label="Aktiva barn"
        value={128}
        delta="+4"
        trend="up"
        tone="success"
      />,
    );
    const el = screen.getByTestId("stat");
    expect(el).toHaveClass("fc-card", "fc-card--stat", "fc-card--tone-success");
    expect(screen.getByText("Aktiva barn")).toHaveClass("fc-card__stat-label");
    expect(screen.getByText("128")).toHaveClass("fc-card__stat-value");
    expect(screen.getByText("+4")).toHaveClass(
      "fc-card__stat-delta",
      "fc-card__stat-delta--up",
    );
  });
});
