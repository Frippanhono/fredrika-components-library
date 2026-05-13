import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MealStatusSelector } from "@minilogg/meal-status-selector";

describe("MealStatusSelector", () => {
  it("renders three radio buttons inside a radiogroup", () => {
    render(<MealStatusSelector label="Hur gick måltiden?" />);
    const group = screen.getByRole("radiogroup", {
      name: "Hur gick måltiden?",
    });
    expect(group).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(radios.map((r) => r.textContent.trim())).toEqual([
      expect.stringContaining("Bra"),
      expect.stringContaining("Okej"),
      expect.stringContaining("Inte bra"),
    ]);
  });

  it("respects defaultValue and updates on click (uncontrolled)", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MealStatusSelector defaultValue="bra" onChange={onChange} />,
    );
    const bra = screen.getByRole("radio", { name: /Bra/ });
    const okej = screen.getByRole("radio", { name: /Okej/ });
    expect(bra).toHaveAttribute("aria-checked", "true");
    expect(okej).toHaveAttribute("aria-checked", "false");

    await user.click(okej);
    expect(onChange).toHaveBeenCalledWith("okej");
    expect(okej).toHaveAttribute("aria-checked", "true");
    expect(bra).toHaveAttribute("aria-checked", "false");
  });

  it("does not change internal state when controlled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MealStatusSelector value="bra" onChange={onChange} />,
    );
    await user.click(screen.getByRole("radio", { name: /Inte bra/ }));
    expect(onChange).toHaveBeenCalledWith("inte-bra");
    // value stays "bra" because parent didn't update it
    expect(screen.getByRole("radio", { name: /Bra/ })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("supports arrow key navigation", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <MealStatusSelector defaultValue="bra" onChange={onChange} />,
    );
    const bra = screen.getByRole("radio", { name: /Bra/ });
    bra.focus();
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("okej");
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("inte-bra");
    await user.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith("bra");
    await user.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith("inte-bra");
    await user.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith("bra");
  });

  it("does not respond when disabled", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<MealStatusSelector disabled onChange={onChange} />);
    await user.click(screen.getByRole("radio", { name: /Okej/ }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
