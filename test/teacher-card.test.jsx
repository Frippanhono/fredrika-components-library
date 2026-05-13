import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  TeacherCard,
  TEACHER_TITLE_PRESETS,
} from "@minilogg/teacher-card";

describe("TeacherCard", () => {
  it("renders name, title preset and department", () => {
    render(
      <TeacherCard
        data-testid="teacher"
        name="Anja Jansson"
        title="forskollarare"
        department="Solrosen"
      />,
    );
    const el = screen.getByTestId("teacher");
    expect(el).toHaveClass("fc-card", "fc-card--teacher");
    expect(
      screen.getByRole("heading", { level: 3, name: "Anja Jansson" }),
    ).toBeInTheDocument();
    const titleEl = screen.getByText(
      TEACHER_TITLE_PRESETS.forskollarare.label,
    );
    expect(titleEl).toHaveClass(
      "fc-card__teacher-title",
      "fc-card__teacher-title--primary",
    );
    expect(screen.getByText("Solrosen")).toHaveClass(
      "fc-card__teacher-department",
    );
  });

  it("falls back to initials when no avatar is provided", () => {
    render(<TeacherCard name="Lena Johansson" />);
    expect(screen.getByText("LJ")).toHaveClass(
      "fc-card__teacher-avatar-initials",
    );
  });

  it("renders an image avatar from a string src", () => {
    render(
      <TeacherCard
        name="Tove Karlsson"
        avatar="/avatars/tove.png"
        avatarAlt="Foto av Tove"
      />,
    );
    const img = screen.getByAltText("Foto av Tove");
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/avatars/tove.png");
    expect(img).toHaveClass("fc-card__teacher-avatar-img");
  });

  it("accepts a free-text title with neutral tone", () => {
    render(<TeacherCard name="Sven Sköld" title="Praktikant" />);
    const titleEl = screen.getByText("Praktikant");
    expect(titleEl).toHaveClass("fc-card__teacher-title--neutral");
  });

  it("accepts a custom title object", () => {
    render(
      <TeacherCard
        name="Maja Mo"
        title={{ label: "Tf. rektor", tone: "info" }}
      />,
    );
    expect(screen.getByText("Tf. rektor")).toHaveClass(
      "fc-card__teacher-title--info",
    );
  });

  it("becomes interactive when onClick is provided", () => {
    const onClick = vi.fn();
    render(
      <TeacherCard data-testid="teacher" name="Eli Ek" onClick={onClick} />,
    );
    const el = screen.getByTestId("teacher");
    expect(el).toHaveClass("fc-card--interactive");
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("renders a P role badge", () => {
    render(<TeacherCard name="Anja Jansson" title="forskollarare" />);
    const badge = screen
      .getAllByText("P")
      .find((el) => el.classList.contains("fc-card__role-badge--teacher"));
    expect(badge).toBeTruthy();
  });
});
