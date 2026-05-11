import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, Textarea } from "@fredrika/inputs";

describe("Input", () => {
  it("links label to input via generated id", () => {
    render(<Input label="Name" />);
    const input = screen.getByLabelText("Name");
    expect(input).toBeInTheDocument();
    expect(input.id).toBeTruthy();
  });

  it("renders hint linked via aria-describedby", () => {
    render(<Input label="Email" hint="We never share" />);
    const input = screen.getByLabelText("Email");
    const hintId = input.getAttribute("aria-describedby");
    expect(hintId).toBeTruthy();
    expect(document.getElementById(hintId)).toHaveTextContent("We never share");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("renders error, sets aria-invalid and prefers error over hint", () => {
    render(<Input label="Email" hint="hint" error="Required" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    const id = input.getAttribute("aria-describedby");
    expect(document.getElementById(id)).toHaveTextContent("Required");
    expect(screen.queryByText("hint")).not.toBeInTheDocument();
    expect(input.parentElement).toHaveClass("has-error");
  });

  it("calls onChange and respects controlled value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input label="N" value="abc" onChange={onChange} />);
    const input = screen.getByLabelText("N");
    expect(input).toHaveValue("abc");
    await user.type(input, "d");
    expect(onChange).toHaveBeenCalled();
  });

  it("respects explicit id prop", () => {
    render(<Input id="my-id" label="L" />);
    expect(screen.getByLabelText("L").id).toBe("my-id");
  });

  it("uses provided type", () => {
    render(<Input label="Pw" type="password" />);
    expect(screen.getByLabelText("Pw")).toHaveAttribute("type", "password");
  });
});

describe("Textarea", () => {
  it("renders textarea with label and rows", () => {
    render(<Textarea label="Msg" rows={6} />);
    const ta = screen.getByLabelText("Msg");
    expect(ta.tagName).toBe("TEXTAREA");
    expect(ta).toHaveAttribute("rows", "6");
  });

  it("shows error styling", () => {
    render(<Textarea label="Msg" error="bad" />);
    const ta = screen.getByLabelText("Msg");
    expect(ta).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("bad")).toBeInTheDocument();
  });
});
