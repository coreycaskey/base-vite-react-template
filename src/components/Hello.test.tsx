import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Hello from "./Hello";

describe("Hello component", () => {
  it("renders the correct greeting", () => {
    render(<Hello name="Corey" />);
    expect(screen.getByText("Hello, Corey!")).toBeInTheDocument();
  });
});
