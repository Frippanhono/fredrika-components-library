import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "@fredrika/toasts";

function Trigger({ onReady }) {
  const toast = useToast();
  onReady(toast);
  return null;
}

describe("Toasts", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws when useToast is used outside provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger onReady={() => {}} />)).toThrow(
      /useToast must be used within/,
    );
    spy.mockRestore();
  });

  it("shows a toast and auto-dismisses after duration", async () => {
    let api;
    render(
      <ToastProvider>
        <Trigger onReady={(a) => (api = a)} />
      </ToastProvider>,
    );
    act(() => {
      api.success("Saved!");
    });
    expect(screen.getByText("Saved!")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.queryByText("Saved!")).not.toBeInTheDocument();
  });

  it("error/warning use role=alert (assertive)", () => {
    let api;
    render(
      <ToastProvider>
        <Trigger onReady={(a) => (api = a)} />
      </ToastProvider>,
    );
    act(() => {
      api.error("Oops");
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Oops");
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  it("dismiss(id) removes toast immediately", () => {
    let api;
    let id;
    render(
      <ToastProvider>
        <Trigger onReady={(a) => (api = a)} />
      </ToastProvider>,
    );
    act(() => {
      id = api.info("Hello");
    });
    expect(screen.getByText("Hello")).toBeInTheDocument();
    act(() => {
      api.dismiss(id);
    });
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("close button on toast removes it", async () => {
    vi.useRealTimers();
    const user = userEvent.setup();
    let api;
    render(
      <ToastProvider>
        <Trigger onReady={(a) => (api = a)} />
      </ToastProvider>,
    );
    act(() => {
      api.show("Ping", { duration: 0 });
    });
    expect(screen.getByText("Ping")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Stäng notifiering/i }));
    expect(screen.queryByText("Ping")).not.toBeInTheDocument();
  });

  it("duration=0 means no auto-dismiss", () => {
    let api;
    render(
      <ToastProvider>
        <Trigger onReady={(a) => (api = a)} />
      </ToastProvider>,
    );
    act(() => {
      api.show("Sticky", { duration: 0 });
    });
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByText("Sticky")).toBeInTheDocument();
  });
});
