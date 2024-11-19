import { test, expect } from "@playwright/test";

const BASE_URL =
  process.env.NODE_ENV === "test" ? process.env.TEST_URL : process.env.BASE_URL;

console.log("BASEURLLL", BASE_URL);

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(BASE_URL);
});

test.describe("Homepage", () => {
  test("should display the homepage", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toHaveText(/to-do list/i);
  });

  test("finds the links in the navbar", async ({ page }) => {
    const navlinkHome = page.locator("a:has-text('Home')");
    await expect(navlinkHome).toBeVisible();
  });
});
