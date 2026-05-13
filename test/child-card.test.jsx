import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChildCard, CHILD_STATUS_PRESETS } from "@minilogg/child-card";

describe("ChildCard", () => {
  it("renders name, department and status preset", () => {
    render(
      <ChildCard
        data-testid="child"
        name="Alma Andersson"
        department="Solrosen"
        status="present"
      />,
    );
    const el = screen.getByTestId("child");
    expect(el).toHaveClass("fc-card", "fc-card--child");
    expect(
      screen.getByRole("heading", { level: 3, name: "Alma Andersson" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Solrosen")).toHaveClass("fc-card__subtitle");
    const status = screen.getByText(CHILD_STATUS_PRESETS.present.label);
    expect(status).toHaveClass(
      "fc-card__child-status",
      "fc-card__child-status--success",
    );
  });

  it("falls back to initials when no avatar is provided", () => {
    render(<ChildCard name="Bruno Berg" />);
    expect(screen.getByText("BB")).toHaveClass("fc-card__child-avatar-initials");
  });

  it("renders an image avatar from a string src", () => {
    render(
      <ChildCard
        name="Cleo Cederlund"
        avatar="/avatars/cleo.png"
        avatarAlt="Foto av Cleo"
      />,
    );
    const img = screen.getByAltText("Foto av Cleo");
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/avatars/cleo.png");
    expect(img).toHaveClass("fc-card__child-avatar-img");
  });

  it("supports a custom status object", () => {
    render(
      <ChildCard
        name="Doris Dahl"
        status={{ label: "Hämtas 14:30", tone: "info" }}
      />,
    );
    expect(screen.getByText("Hämtas 14:30")).toHaveClass(
      "fc-card__child-status--info",
    );
  });

  it("becomes interactive when onClick is provided", () => {
    const onClick = vi.fn();
    render(
      <ChildCard data-testid="child" name="Eli Ek" onClick={onClick} />,
    );
    const el = screen.getByTestId("child");
    expect(el).toHaveClass("fc-card--interactive");
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("renders role badges: B for child and V for each guardian", () => {
    render(
      <ChildCard
        name="Adam Persson"
        guardians={["Anja Persson", "Peter Persson"]}
      />,
    );
    const childBadge = screen
      .getAllByText("B")
      .find((el) => el.classList.contains("fc-card__role-badge--child"));
    expect(childBadge).toBeTruthy();
    const guardianBadges = screen
      .getAllByText("V")
      .filter((el) => el.classList.contains("fc-card__role-badge--guardian"));
    expect(guardianBadges).toHaveLength(2);
    expect(screen.getByText("Anja Persson")).toBeInTheDocument();
    expect(screen.getByText("Peter Persson")).toBeInTheDocument();
  });

  it("omits the guardian list when none are provided", () => {
    render(<ChildCard name="Solo Solberg" />);
    expect(screen.queryByLabelText("Vårdnadshavare")).toBeNull();
  });
});
