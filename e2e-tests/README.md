# Playwright

https://playwright.dev/

## Install

- Install the Playwright in its own folder in the root of your project (for example `e2e-tests`) with command `npm init playwright@latest`
- Say yes to everything what the installer asks
- Install `dotenv` -> `bun add dotenv`
- Create `.env` file:

```
BASE_URL = http://localhost:5173
TEST_URL = http://localhost:3000
```

- Add scripts to playwright `package.json` file:

```json
  "scripts": {
    "test": "playwright test",
    "test:report": "playwright show-report",
    "test:ui": "bun run test -- --ui",
    "clean": "rm -rf node_modules && rm package-lock.json",
    "install": "npx playwright install",
    "test:cicd": "NODE_ENV=test playwright test"
  },
```

- Create `tsconfig.ts` file in the playwright folder:

```ts
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "types": ["node"],
    "resolveJsonModule": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts"]
}

```

## Usage

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

- Modify `playwright.config.ts` file:

```ts
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const BASE_URL =
  process.env.NODE_ENV === "test" ? process.env.TEST_URL : process.env.BASE_URL;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Timeout for each test */
  timeout: 3000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { outputFolder: "playwright-report" }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL ?? "http://localhost:3000",

    /* Video for failed tests */
    // video: "retain-on-failure",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
```
