import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "@minilogg/tabs";

const tabs = [
  { label: "One", content: <p>content-one</p> },
  { label: "Two", content: <p>content-two</p> },
  { label: "Three", content: <p>content-three</p> },
];

describe("Tabs", () => {
  it("renders tablist with first tab active by default", () => {
    render(<Tabs tabs={tabs} />);
    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons).toHaveLength(3);
    expect(tabButtons[0]).toHaveAttribute("aria-selected", "true");
    expect(tabButtons[1]).toHaveAttribute("aria-selected", "false");
    expect(screen.getByText("content-one")).toBeInTheDocument();
    expect(screen.queryByText("content-two")).not.toBeInTheDocument();
  });

  it("clicking a tab activates it and shows its panel", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Two" }));
    expect(onChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole("tab", { name: "Two" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("content-two")).toBeInTheDocument();
  });

  it("defaultIndex selects the correct tab", () => {
    render(<Tabs tabs={tabs} defaultIndex={2} />);
    expect(screen.getByRole("tab", { name: "Three" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("content-three")).toBeInTheDocument();
  });

  it("ArrowRight/Left navigate with wrap-around", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    const first = screen.getByRole("tab", { name: "One" });
    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Two" })).toHaveFocus();
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
  });

  it("Home/End jump to first/last", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    screen.getByRole("tab", { name: "Two" }).focus();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Three" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "One" })).toHaveFocus();
  });

  it("only active tab has tabIndex=0 (roving)", () => {
    render(<Tabs tabs={tabs} defaultIndex={1} />);
    const tabButtons = screen.getAllByRole("tab");
    expect(tabButtons[0]).toHaveAttribute("tabindex", "-1");
    expect(tabButtons[1]).toHaveAttribute("tabindex", "0");
    expect(tabButtons[2]).toHaveAttribute("tabindex", "-1");
  });
});
