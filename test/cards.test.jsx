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
  StatCard,
  ChildCard,
  CHILD_STATUS_PRESETS,
  ActivityCard,
  ACTIVITY_TYPE_PRESETS,
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
});

describe("StatCard", () => {
  it("renders label, value and delta with trend modifier", () => {
    render(
      <StatCard
        data-testid="stat"
        label="Aktiva barn"
        value={128}
        delta="+4"
        trend="up"
        tone="success"
      />,
    );
    const el = screen.getByTestId("stat");
    expect(el).toHaveClass("fc-card", "fc-card--stat", "fc-card--tone-success");
    expect(screen.getByText("Aktiva barn")).toHaveClass("fc-card__stat-label");
    expect(screen.getByText("128")).toHaveClass("fc-card__stat-value");
    expect(screen.getByText("+4")).toHaveClass(
      "fc-card__stat-delta",
      "fc-card__stat-delta--up",
    );
  });
});

describe("ChildCard", () => {
  it("renders name, department and status preset", () => {
    render(
      <ChildCard
        data-testid="child"
        name="Alma Andersson"
        department="Solrosen"
        status="present"
      />,
    );
    const el = screen.getByTestId("child");
    expect(el).toHaveClass("fc-card", "fc-card--child");
    expect(
      screen.getByRole("heading", { level: 3, name: "Alma Andersson" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Solrosen")).toHaveClass("fc-card__subtitle");
    const status = screen.getByText(CHILD_STATUS_PRESETS.present.label);
    expect(status).toHaveClass(
      "fc-card__child-status",
      "fc-card__child-status--success",
    );
  });

  it("falls back to initials when no avatar is provided", () => {
    render(<ChildCard name="Bruno Berg" />);
    expect(screen.getByText("BB")).toHaveClass("fc-card__child-avatar-initials");
  });

  it("renders an image avatar from a string src", () => {
    render(
      <ChildCard
        name="Cleo Cederlund"
        avatar="/avatars/cleo.png"
        avatarAlt="Foto av Cleo"
      />,
    );
    const img = screen.getByAltText("Foto av Cleo");
    expect(img.tagName).toBe("IMG");
    expect(img).toHaveAttribute("src", "/avatars/cleo.png");
    expect(img).toHaveClass("fc-card__child-avatar-img");
  });

  it("supports a custom status object", () => {
    render(
      <ChildCard
        name="Doris Dahl"
        status={{ label: "Hämtas 14:30", tone: "info" }}
      />,
    );
    expect(screen.getByText("Hämtas 14:30")).toHaveClass(
      "fc-card__child-status--info",
    );
  });

  it("becomes interactive when onClick is provided", () => {
    const onClick = vi.fn();
    render(
      <ChildCard data-testid="child" name="Eli Ek" onClick={onClick} />,
    );
    const el = screen.getByTestId("child");
    expect(el).toHaveClass("fc-card--interactive");
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("renders role badges: B for child and V for each guardian", () => {
    render(
      <ChildCard
        name="Adam Persson"
        guardians={["Anja Persson", "Peter Persson"]}
      />,
    );
    // Child badge
    const childBadge = screen
      .getAllByText("B")
      .find((el) => el.classList.contains("fc-card__role-badge--child"));
    expect(childBadge).toBeTruthy();
    // Guardian badges (one per guardian, NOT "M"/"P")
    const guardianBadges = screen
      .getAllByText("V")
      .filter((el) => el.classList.contains("fc-card__role-badge--guardian"));
    expect(guardianBadges).toHaveLength(2);
    expect(screen.getByText("Anja Persson")).toBeInTheDocument();
    expect(screen.getByText("Peter Persson")).toBeInTheDocument();
  });

  it("omits the guardian list when none are provided", () => {
    render(<ChildCard name="Solo Solberg" />);
    expect(screen.queryByLabelText("Vårdnadshavare")).toBeNull();
  });
});

describe("ActivityCard", () => {
  it("renders activity, time and icon with tone-driven color coding", () => {
    render(
      <ActivityCard
        data-testid="activity"
        activity="Alma lämnad på förskolan"
        time="08:14"
        icon="📥"
        tone="info"
      />,
    );
    const el = screen.getByTestId("activity");
    expect(el).toHaveClass(
      "fc-card",
      "fc-card--activity",
      "fc-card--tone-info",
    );
    expect(
      screen.getByRole("heading", { level: 4, name: "Alma lämnad på förskolan" }),
    ).toHaveClass("fc-card__activity-title");
    expect(screen.getByText("08:14")).toHaveClass("fc-card__meta");
    const icon = screen.getByText("📥");
    expect(icon).toHaveClass(
      "fc-card__activity-icon",
      "fc-card__activity-icon--info",
    );
  });

  it("derives icon and tone from a preset `type`", () => {
    render(
      <ActivityCard
        data-testid="activity"
        type="incident"
        activity="Snubblade på gården"
        time="10:30"
      />,
    );
    const el = screen.getByTestId("activity");
    expect(el).toHaveClass("fc-card--tone-warning");
    const icon = screen.getByText(ACTIVITY_TYPE_PRESETS.incident.icon);
    expect(icon).toHaveClass("fc-card__activity-icon--warning");
  });

  it("lets explicit icon and tone override the preset", () => {
    render(
      <ActivityCard
        data-testid="activity"
        type="meal"
        icon="🥗"
        tone="danger"
        activity="Allergi-incident vid lunch"
      />,
    );
    expect(screen.getByTestId("activity")).toHaveClass("fc-card--tone-danger");
    expect(screen.getByText("🥗")).toHaveClass(
      "fc-card__activity-icon--danger",
    );
  });

  it("renders an optional description", () => {
    render(
      <ActivityCard
        activity="Sovstund"
        description="Sov 12:30–13:45"
        type="nap"
      />,
    );
    expect(screen.getByText("Sov 12:30–13:45")).toHaveClass(
      "fc-card__activity-description",
    );
  });

  it("becomes interactive when onClick is provided", () => {
    const onClick = vi.fn();
    render(
      <ActivityCard
        data-testid="activity"
        activity="Notering"
        onClick={onClick}
      />,
    );
    const el = screen.getByTestId("activity");
    expect(el).toHaveClass("fc-card--interactive");
    fireEvent.click(el);
    fireEvent.keyDown(el, { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("omits the icon slot when neither icon nor type is given", () => {
    const { container } = render(<ActivityCard activity="Bara text" />);
    expect(container.querySelector(".fc-card__activity-icon")).toBeNull();
  });
});
