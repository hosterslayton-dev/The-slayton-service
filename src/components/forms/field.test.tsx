import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import { Field } from "./field";
import { Input } from "./input";

describe("Field", () => {
  it("wires label, hint, and error to the control", () => {
    render(
      <Field label="ZIP code" hint="5 digits." error="Enter a ZIP like 37066." required>
        <Input name="zip" />
      </Field>,
    );
    const input = screen.getByLabelText(/zip code/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription(/enter a zip like 37066/i);
    expect(input).toBeRequired();
  });

  it("announces errors via role=alert", () => {
    render(
      <Field label="Email" error="Enter an email like name@example.com.">
        <Input name="email" />
      </Field>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(/name@example.com/i);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Field label="City" hint="Where the home is.">
        <Input name="city" />
      </Field>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
