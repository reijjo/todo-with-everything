import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

describe("Navbar", async () => {
  test("renders NavLinks", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const navlinkHome = screen.getByRole("link", { name: /home/i });
    expect(navlinkHome).toBeInTheDocument();
  });
});
