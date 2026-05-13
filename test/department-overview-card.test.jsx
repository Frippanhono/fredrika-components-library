import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DepartmentOverviewCard } from "@minilogg/department-overview-card";

describe("DepartmentOverviewCard", () => {
  it("renders department name, stats and theme", () => {
    render(
      <DepartmentOverviewCard
        data-testid="dept"
        name="Snäckan"
        childrenCount={16}
        teachersCount={3}
        theme="Färger och former"
      />,
    );

    const el = screen.getByTestId("dept");
    expect(el).toHaveClass("fc-card", "fc-card--department-overview");

    expect(screen.getByRole("heading", { level: 1, name: "Snäckan" })).toBeInTheDocument();
    expect(screen.getByText("16 inskrivna barn")).toBeInTheDocument();
    expect(screen.getByText("3 pedagoger")).toBeInTheDocument();
    expect(screen.getByText(/Tema arbete:/)).toBeInTheDocument();
    expect(screen.getByText("Färger och former")).toBeInTheDocument();
  });

  it("uses singular forms for count of 1", () => {
    render(
      <DepartmentOverviewCard
        name="Myran"
        childrenCount={1}
        teachersCount={1}
      />,
    );
    expect(screen.getByText("1 inskrivet barn")).toBeInTheDocument();
    expect(screen.getByText("1 pedagog")).toBeInTheDocument();
  });

  it("omits stats row and theme when not provided", () => {
    const { container } = render(<DepartmentOverviewCard name="Tomt" />);
    expect(container.querySelector(".fc-card__department-stats")).toBeNull();
    expect(container.querySelector(".fc-card__department-theme")).toBeNull();
  });
});
