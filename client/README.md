# Testing

## Install packages

- `bun add -d vitest @testing-library/react jsdom @vitejs/plugin-react @testing-library/jest-dom @types/testing-library__jest-dom`
- Create `vitest.setup.ts` file:

```ts
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
```

- Update `vite.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

- Add types to `tsconfig.app.json` file:

```ts
{
  "compilerOptions": {
		...
    "types": ["@testing-library/jest-dom", "node"],
		...
  },
  "include": ["src"]
}
```

- And also to `tsconfig.node.json` file:

```ts
{
  "compilerOptions": {
		...
    "types": ["node"],
		...
  },
  "include": ["vite.config.ts"]
}
```

- Test with `vitest` not with `bun test`. Add to `package.json`:

```json
  "scripts": {
    ...
    "test": "NODE_ENV=test vitest"
  },
```

- And run with `bun run test`. Example test for Navbar (`Navbar.spec.tsx`):

```ts
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
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
