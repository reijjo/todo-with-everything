# To-do list

Just a basic to-do list

- Adding more features when feels like it

## Run project

### .env file

Rename the `envEXAMPLE` file to `.env` in both `server` and `client` folders

- Add the missing values for your project

### Frontend

`npm run dev` in the client folder

- localhost:5173

### Backend

`npm run dev` in the server folder

- localhost:3001

### PostgreSQL & pgAdmin

`docker compose up` in the server folder

- pgAdmin at localhost:5050

## Run tests

### Frontend

`npm run test` in the client folder

### Backend (there arent any tests yet)

`npm run test` in the server folder

### e2e-tests

`npm run test` in the e2e-tests folder

## Create Project (Bun)

### Frontend

- `bun create vite client` -> `React` -> `TypeScript + SMC` -> `cd client` -> `bun install`
- Modify `package.json` file:

```json
"scripts": {
  "dev": "bunx --bun vite",
  "build": "vite build",
  "serve": "vite preview"
},
```

- Start frontend with `bun run dev`

### Backend

- `mkdir server` -> `cd server` -> `bun init`
- Install `express` -> `bun add express` -> `bun add -d @types/express @types/bun`
- Add to servers `package.json` file:

```json
"scripts": {
  "dev": "bun --watch run index.ts",
  "clean": "rm -rf node_modules .bun bun.lockb dist"
},
```

- Start server with `bun run dev`

## Frontend

### React Router

- Install React Router `bun add react-router-dom`

### Icons

- Add Lucide Icons `bun add lucide-react`
- Make a `Icon` component:

```tsx
import { Suspense, lazy } from "react";

import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

interface IconProps extends Omit<LucideProps, "ref"> {
  name: keyof typeof dynamicIconImports;
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};
```

- And use it in code like this:

```tsx
<Icon name="activity" />
```

## Backend
