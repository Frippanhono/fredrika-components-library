import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  MessageCard,
  NoticeCard,
  MESSAGE_ROLE_PRESETS,
} from "@minilogg/message-card";

describe("MessageCard / NoticeCard", () => {
  it("renders sender, subject, preview and timestamp", () => {
    render(
      <MessageCard
        data-testid="msg"
        sender={{ name: "Anna Lärare", role: "teacher" }}
        subject="Utvecklingssamtal"
        preview="Hej Per! Vill du boka tid?"
        timestamp="09:42"
      />,
    );
    const el = screen.getByTestId("msg");
    expect(el).toHaveClass("fc-card", "fc-card--message");
    expect(screen.getByText("Anna Lärare")).toHaveClass("fc-card__msg-sender");
    expect(screen.getByText("Utvecklingssamtal")).toHaveClass(
      "fc-card__msg-subject",
    );
    expect(screen.getByText("Hej Per! Vill du boka tid?")).toHaveClass(
      "fc-card__msg-preview",
    );
    expect(screen.getByText("09:42").tagName).toBe("TIME");
  });

  it("renders role badge for teacher sender", () => {
    render(
      <MessageCard
        sender={{ name: "Anna", role: "teacher" }}
        subject="Hej"
      />,
    );
    const badge = screen
      .getAllByText(MESSAGE_ROLE_PRESETS.teacher.short)
      .find((el) => el.classList.contains("fc-card__role-badge--teacher"));
    expect(badge).toBeTruthy();
    expect(badge).toHaveAttribute("aria-label", "Pedagog");
  });

  it("renders recipient with role badge", () => {
    render(
      <MessageCard
        sender={{ name: "Anna", role: "teacher" }}
        recipient={{ name: "Per Persson", role: "guardian" }}
        subject="Hej"
      />,
    );
    expect(screen.getByText("Till:")).toHaveClass(
      "fc-card__msg-recipient-label",
    );
    expect(screen.getByText("Per Persson")).toHaveClass(
      "fc-card__msg-recipient",
    );
    const guardianBadges = screen
      .getAllByText("V")
      .filter((el) => el.classList.contains("fc-card__role-badge--guardian"));
    expect(guardianBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("marks unread messages and adds info tone by default", () => {
    render(
      <MessageCard
        data-testid="msg"
        sender="Anna"
        subject="Hej"
        unread
      />,
    );
    const el = screen.getByTestId("msg");
    expect(el).toHaveClass(
      "fc-card--message-unread",
      "fc-card--tone-info",
    );
    expect(screen.getByLabelText("Oläst")).toHaveClass(
      "fc-card__msg-unread-dot",
    );
  });

  it("shows priority badge and warning tone for high priority", () => {
    render(
      <MessageCard
        data-testid="msg"
        sender="Anna"
        subject="Stängt"
        priority="high"
      />,
    );
    const el = screen.getByTestId("msg");
    expect(el).toHaveClass(
      "fc-card--message-priority",
      "fc-card--tone-warning",
    );
    expect(screen.getByText("Viktigt")).toHaveClass("fc-card__msg-priority");
  });

  it("renders attachments count with pluralization", () => {
    render(
      <MessageCard sender="Anna" subject="Foton" attachments={3} />,
    );
    expect(screen.getByText("3 bilagor")).toBeInTheDocument();
  });

  it("uses singular form for one attachment", () => {
    render(
      <MessageCard sender="Anna" subject="Foto" attachments={1} />,
    );
    expect(screen.getByText("1 bilaga")).toBeInTheDocument();
  });

  it("falls back to initials when no avatar is provided", () => {
    render(
      <MessageCard
        sender={{ name: "Anna Lärare" }}
        subject="Hej"
      />,
    );
    expect(screen.getByText("AL")).toHaveClass(
      "fc-card__msg-avatar-initials",
    );
  });

  it("renders an image avatar when sender.avatar is a string", () => {
    render(
      <MessageCard
        sender={{ name: "Anna", avatar: "/a.png" }}
        subject="Hej"
      />,
    );
    const img = screen.getByAltText("Anna");
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/a.png");
  });

  it("becomes interactive when onClick is provided", () => {
    const onClick = vi.fn();
    render(
      <MessageCard
        data-testid="msg"
        sender="Anna"
        subject="Hej"
        onClick={onClick}
      />,
    );
    const el = screen.getByTestId("msg");
    expect(el).toHaveClass("fc-card--interactive");
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("renders custom actions in the footer", () => {
    render(
      <MessageCard
        sender="Anna"
        subject="Hej"
        actions={<button>Svara</button>}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Svara" }).parentElement,
    ).toHaveClass("fc-card__footer");
  });

  it("exports NoticeCard as an alias of MessageCard", () => {
    expect(NoticeCard).toBe(MessageCard);
  });
});
