import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@minilogg/badges";

describe("Badge", () => {
  it("renders children with default classes", () => {
    render(<Badge>New</Badge>);
    const el = screen.getByText("New");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("fc-badge", "fc-badge--neutral", "fc-badge--md");
  });

  it("applies variant and size", () => {
    render(
      <Badge variant="success" size="lg">
        Ok
      </Badge>,
    );
    const el = screen.getByText("Ok");
    expect(el).toHaveClass("fc-badge--success", "fc-badge--lg");
  });

  it("merges custom className and forwards rest props", () => {
    render(
      <Badge className="extra" data-testid="b" title="hi">
        Hi
      </Badge>,
    );
    const el = screen.getByTestId("b");
    expect(el).toHaveClass("extra");
    expect(el).toHaveAttribute("title", "hi");
  });
});
