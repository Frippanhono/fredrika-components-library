import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
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
});
