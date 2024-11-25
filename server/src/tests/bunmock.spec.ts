import { describe, it, expect } from "vitest";

describe("Global Bun mock", () => {
  it("should have Bun globally defined", () => {
    console.log("Global Bun:", global.Bun);
    expect(global.Bun).toBeDefined();
    expect(global.Bun.env.NODE_ENV).toBe("test");
  });
});