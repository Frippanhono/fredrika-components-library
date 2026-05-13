import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "@minilogg/navbar";

const links = [
  { label: "Home", href: "/", icon: <span data-testid="home-icon">H</span> },
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

  it("renders an icon when provided on a link", () => {
    render(<Navbar brand="B" links={links} />);
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
  });

  it("renders a featured item with avatar image", () => {
    const featuredLinks = [
      { label: "Hem", href: "/" },
      {
        label: "Clara",
        href: "/clara",
        avatar: "/clara.jpg",
        featured: true,
      },
    ];
    render(<Navbar links={featuredLinks} activeHref="/clara" />);
    const featuredLink = screen.getByRole("link", { name: "Clara" });
    expect(featuredLink).toHaveAttribute("aria-current", "page");
    const img = featuredLink.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("src", "/clara.jpg");
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
