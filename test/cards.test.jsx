import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardMedia,
  CardMeta,
  CardActions,
  CardBody,
  CardFooter,
  getInitials,
} from "@minilogg/cards";

describe("Card primitives", () => {
  it("renders structure with semantic title h3", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Hello</CardTitle>
        </CardHeader>
        <CardBody>Body text</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("fc-card");
    const title = screen.getByRole("heading", { level: 3, name: "Hello" });
    expect(title).toHaveClass("fc-card__title");
    expect(screen.getByText("Body text")).toHaveClass("fc-card__body");
    expect(screen.getByText("Footer")).toHaveClass("fc-card__footer");
  });

  it("supports custom className on every part", () => {
    render(
      <Card className="c">
        <CardHeader className="h">
          <CardTitle className="t">T</CardTitle>
        </CardHeader>
        <CardBody className="b">B</CardBody>
        <CardFooter className="f">F</CardFooter>
      </Card>,
    );
    expect(screen.getByText("T")).toHaveClass("fc-card__title", "t");
    expect(screen.getByText("B")).toHaveClass("fc-card__body", "b");
    expect(screen.getByText("F")).toHaveClass("fc-card__footer", "f");
  });

  it("applies variant and tone modifier classes", () => {
    render(
      <Card data-testid="c" variant="elevated" tone="info">
        body
      </Card>,
    );
    const el = screen.getByTestId("c");
    expect(el).toHaveClass("fc-card", "fc-card--elevated", "fc-card--tone-info");
  });

  it("renders header sub-parts (media, subtitle, meta, actions)", () => {
    render(
      <Card>
        <CardHeader>
          <CardMedia data-testid="media">M</CardMedia>
          <div>
            <CardTitle>Alma</CardTitle>
            <CardSubtitle>5 år</CardSubtitle>
          </div>
          <CardMeta data-testid="meta">09:42</CardMeta>
          <CardActions data-testid="actions">
            <button>X</button>
          </CardActions>
        </CardHeader>
      </Card>,
    );
    expect(screen.getByTestId("media")).toHaveClass("fc-card__media");
    expect(screen.getByText("5 år")).toHaveClass("fc-card__subtitle");
    expect(screen.getByTestId("meta")).toHaveClass("fc-card__meta");
    expect(screen.getByTestId("actions")).toHaveClass("fc-card__actions");
  });

  it("becomes interactive when onClick is provided (role, keyboard)", () => {
    const onClick = vi.fn();
    render(
      <Card onClick={onClick} data-testid="c">
        click me
      </Card>,
    );
    const el = screen.getByTestId("c");
    expect(el).toHaveClass("fc-card--interactive");
    expect(el).toHaveAttribute("role", "button");
    expect(el).toHaveAttribute("tabindex", "0");

    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    fireEvent.keyDown(el, { key: " " });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("marks selected cards", () => {
    render(
      <Card selected data-testid="c">
        x
      </Card>,
    );
    expect(screen.getByTestId("c")).toHaveClass("fc-card--selected");
  });

  it("allows changing the title element via `as`", () => {
    render(<CardTitle as="h2">Heading</CardTitle>);
    expect(
      screen.getByRole("heading", { level: 2, name: "Heading" }),
    ).toHaveClass("fc-card__title");
  });

  it("getInitials returns up to two uppercase letters", () => {
    expect(getInitials("Anna Lärare")).toBe("AL");
    expect(getInitials("Bruno")).toBe("BR");
    expect(getInitials("")).toBe("?");
  });
});
