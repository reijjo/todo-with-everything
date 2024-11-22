import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

	console.log('Current URL!!!:', page.url());

	// const pageContent = await page.content();
  // console.log('Full Page Content:', pageContent);
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
