import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "@fredrika/dropdowns";

const items = [
  { label: "Edit", value: "edit" },
  { label: "Duplicate", value: "duplicate" },
  { label: "Delete", value: "delete", disabled: true },
  { label: "Archive", value: "archive" },
];

describe("Dropdown", () => {
  it("opens on trigger click and shows items", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Actions" items={items} />);
    const trigger = screen.getByRole("button", { name: /Actions/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
  });

  it("selecting an item calls onSelect and closes menu", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown label="A" items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /A/ }));
    await user.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelect).toHaveBeenCalledWith(items[0]);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("does not call onSelect for disabled items", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Dropdown label="A" items={items} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: /A/ }));
    const del = screen.getByRole("menuitem", { name: "Delete" });
    expect(del).toBeDisabled();
    await user.click(del);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("closes on Escape and returns focus to trigger", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="A" items={items} />);
    const trigger = screen.getByRole("button", { name: /A/ });
    await user.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("ArrowDown on trigger opens menu and focuses first enabled item", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="A" items={items} />);
    const trigger = screen.getByRole("button", { name: /A/ });
    trigger.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });

  it("ArrowDown skips disabled items when navigating", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="A" items={items} />);
    screen.getByRole("button", { name: /A/ }).focus();
    await user.keyboard("{ArrowDown}"); // open -> Edit
    await user.keyboard("{ArrowDown}"); // Duplicate
    await user.keyboard("{ArrowDown}"); // skip Delete -> Archive
    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus();
  });

  it("closes when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown label="A" items={items} />
        <button>outside</button>
      </div>,
    );
    await user.click(screen.getByRole("button", { name: /A/ }));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "outside" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
