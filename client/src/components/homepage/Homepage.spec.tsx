import { Homepage } from "./Homepage";

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";

describe("Homepage", () => {
  beforeEach(() => {
    render(<Homepage />);
  });

  test("should display the homepage", () => {
    const header = screen.getByRole("heading", { name: /to-do list/i });
    expect(header).toBeInTheDocument();
  });

  test("finds the input and button", () => {
    const input = screen.getByPlaceholderText(/what to do/i);
    const button = screen.getByRole("button", { name: /add/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("you can type on the input field", async () => {
    const input = screen.getByPlaceholderText(/what to do/i);

    fireEvent.change(input, { target: { value: "Live Love Laugh" } });
    expect(input).toHaveValue("Live Love Laugh");
  });
});
