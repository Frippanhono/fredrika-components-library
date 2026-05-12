import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@minilogg/navbar";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

describe("Navbar", () => {
  it("renders brand, links and actions with landmark", () => {
    render(
      <Navbar
        brand="Brand"
        links={links}
        actions={<button>Login</button>}
        activeHref="/"
      />,
    );
    expect(
      screen.getByRole("navigation", { name: "Huvudnavigering" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("toggle button updates aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Navbar brand="B" links={links} />);
    const toggle = screen.getByLabelText(/ppna meny/);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(screen.getByLabelText(/ng meny/)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("calls onNavigate and prevents default when provided", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<Navbar brand="B" links={links} onNavigate={onNavigate} />);
    await user.click(screen.getByRole("link", { name: "Home" }));
    expect(onNavigate).toHaveBeenCalledWith(links[0]);
  });

  it("uses custom aria-label", () => {
    render(<Navbar brand="B" links={links} ariaLabel="Main" />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });
});
