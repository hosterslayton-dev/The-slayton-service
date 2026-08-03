import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Button, IconButton } from "./button";

describe("Button", () => {
  it("renders a button by default and a link when href is set", () => {
    const { rerender } = render(<Button>Request a Free Estimate</Button>);
    expect(screen.getByRole("button", { name: /free estimate/i })).toBeInTheDocument();

    rerender(<Button href="/services">Browse Services</Button>);
    expect(screen.getByRole("link", { name: /browse services/i })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  it("defaults type to button so forms are never submitted accidentally", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("has no axe violations across variants", async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
        <IconButton label="Close dialog">
          <svg />
        </IconButton>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("gives icon buttons their accessible name from label", () => {
    render(
      <IconButton label="Close dialog">
        <svg />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument();
  });
});
