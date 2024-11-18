# Playwright

https://playwright.dev/

## Install

- Install the Playwright in its own folder in the root of your project (for example `e2e-tests`) with command `npm init playwright@latest`
- Say yes to everything what the installer asks
- Add scripts to playwright `package.json` file:

```json
  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report",
    "test:ui": "bun run test -- --ui"
  },
```

- It has it's own example test so just run it `bun run test`
- Example for homepage test (`homepage.spec.ts`):

```ts
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
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
```

- Modify `playwright.config.ts` file (change parallel tests to false and add a timeout):

```ts
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Timeout for each test */
  timeout: 3000,
```
