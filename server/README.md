# Testing
## Install packages
- `bun add -d vitest supertest @types/supertest`
- Create `vitest.config.ts` file:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/tests/setup.ts'], // This will run the Bun mock setup
    globals: true
  }
});
```

- Create `src/tests/setup.ts` file:
```ts
import { beforeAll } from "vitest";


global.Bun = {
  env: {
    NODE_ENV: 'test',
    DATABASE_URL: 'postgres://tester:test@localhost:5432/todos',
    DATABASE_TEST_URL: 'postgres://tester:test@localhost:5433/test_todos',
    PORT: '3001',
    TEST_PORT: '3000'
  }
} as any;

beforeAll(() => {
  // Any additional setup you need
  console.log('Test environment configured with mock Bun');
});
```

- Make first test  `src/tests/todo_api.spec.ts`:
```ts
import supertest from "supertest";
import { describe, it, expect } from "vitest";
import app from '../app';

const api = supertest(app);

describe('Todo API', () => {
  it('todos are returned as json', async () => {
   const response = await api
      .get('/api/todos')
      .expect(200)
      .expect('Content-Type', /application\/json/);

		const { data } = response.body

		console.log('data', data)

  });
});
```

## Package.json
### Add scripts to your `package.json`:
```json
  "scripts": {
    "start": "NODE_ENV=test bun run src/index.ts",
    "dev": "NODE_ENV=development bun --watch run src/index.ts",
    "build:front": "rm -rf dist && cd ../client && rm -rf dist && VITE_NODE_ENV=testcicd npm run build && cp -r dist ../server",
    "build:back": "rm -rf out && bun build ./src/index.ts --outdir ./out --target node",
    "build": "bun run build:front && bun run build:back",
    "prod": "NODE_ENV=production bun run out/index.js",
    "test": "NODE_ENV=test vitest",
		"test:ci": "bun run out/index.js",
    "test:cicd": "NODE_ENV=testcicd bun run out/index.js",
    "clean": "rm -rf node_modules .bun bun.lockb dist out database database_test && bun install"
  },
```
- `test` is just to run test locally
- `test:ci` for GitHub Actions
- `test:cicd` for e2e-tests locally



# Server

## Setup

- `mkdir server` -> `cd server` -> `bun init`
- create `src` folder in the root of the `server` folder and move `index.ts` in the `src` folder

### Install dependencies

- Normal dependencies `bun add DEPENDENCY_NAME`
- Dev dependencies `bun add DEPENDENCY_NAME -d`

#### Install these for example now

- `bun add cors express colorette`
- `bun add @types/cors @types/express @types/morgan morgan -d`

### .env file

Create `.env` file in the root of the `server` folder:

```.env
# Port
PORT = 3000
```

### package.json

Add scripts to the file so it should look like this:

```json
{
  "name": "server",
  "module": "src/index.ts",
  "type": "module",
  "scripts": {
    "dev": "NODE_ENV=development bun --watch run src/index.ts",
    "clean": "rm -rf node_modules .bun bun.lockb dist"
  },
  "devDependencies": {
		...
	}
}
```

### src folder

- create `app.ts` file:

```ts
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("hello todo");
});

export default app;
```

- and `index.ts` should look like this:

```ts
import * as http from "http";
import { cyanBright, yellowBright } from "colorette";

import app from "./app";

const { PORT } = Bun.env;

const server = http.createServer(app);

const start = async () => {
  server.listen(PORT, () => {
    console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
    console.log(cyanBright(`Server on port ${PORT}.`));
  });
};

start();
```

- Start server with `bun run dev`

### utils folder

Copy the `types.ts` file from the frontend `utils` folder to backend `src/utils` folder

```ts
export type TodoContent = {
  id: number;
  content: string;
  done: boolean;
};

export type TodoLists = {
  id: number;
  title: string;
  todos: TodoContent[];
};
```

## PostgreSQL & Docker PART 1

### Start Postgres Docker Image

- Open a new terminal:
  `docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres`
- Check your container (open another terminal) `docker ps` -> It should give something like this:

```
reijjo@MacBookAir ~ » docker ps
CONTAINER ID   IMAGE      COMMAND                  CREATED          STATUS          PORTS                    NAMES
ab7a72295a72   postgres   "docker-entrypoint.s…"   54 seconds ago   Up 53 seconds   0.0.0.0:5432->5432/tcp   boring_shaw
```

- Go inside the container `docker exec -it CONTAINER_ID psql -U postgres postgres`
- Command `\d` shows what the database contains (still empty):

```
postgres=# \d
Did not find any relations.
```

### Add table to postgres docker image:

```sql
CREATE TABLE TodoLists (
	id SERIAL PRIMARY KEY,
	title text NOT NULL
);
```

- Check that table is created `\d`

```sql
postgres=# \d
                List of relations
 Schema |       Name       |   Type   |  Owner
--------+------------------+----------+----------
 public | todolists        | table    | postgres
 public | todolists_id_seq | sequence | postgres
(2 rows)
```

- Command `\d todolists` show more about that table

```sql
postgres=# \d todolists
                            Table "public.todolists"
 Column |  Type   | Collation | Nullable |                Default
--------+---------+-----------+----------+---------------------------------------
 id     | integer |           | not null | nextval('todolists_id_seq'::regclass)
 title  | text    |           | not null |
Indexes:
    "todolists_pkey" PRIMARY KEY, btree (id)
```

- Let's add some stuff to that table:

```sql
insert into todolists (title) values ('Eka lista');
insert into todolists (title) values ('Toka lista');

```

- And make sure that everything is there (`select * from todolists;`):

```sql
postgres=# select * from todolists;
 id |   title
----+------------
  1 | Eka lista
  2 | Toka lista
(2 rows)
```

- Drop (delete) the table `drop table todolists`

```sql
postgres=# drop table todolists;
DROP TABLE
postgres=# \d
Did not find any relations.
postgres=#
```

## Sequelize PART 1

### Starting sequelize

- Add `DATABASE_URL` to `.env` file:

```.env
# PostgreSQL
DATABASE_URL = postgres://postgres:mysecretpassword@localhost:5432/postgres
```

- Create `utils/config.ts` file:

```ts
type EnvConfig = {
  PORT: number;
  DATABASE_URL: string;
};

const { PORT, DATABASE_URL } = Bun.env;

export const config: EnvConfig = {
  PORT: PORT ? parseInt(PORT) : 3000,
  DATABASE_URL: DATABASE_URL as string,
};
```

- Install dependencies `bun add pg sequelize`
- Create `utils/db.ts` file for the database connection:

```ts
import { Sequelize } from "sequelize";
import { config } from "./config";
import { cyanBright } from "colorette";

const { DATABASE_URL } = config;

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(cyanBright("Connected to database."));
  } catch (error: unknown) {
    console.error("Unable to connect to the database:", error);
    return process.exit(1);
  }

  return null;
};
```

- And modify `index.ts`:

```ts
import * as http from "http";
import { magentaBright, yellowBright } from "colorette";
import { connectToDB } from "./utils/db";
import app from "./app";
import { config } from "./utils/config";

const { PORT } = config;

const server = http.createServer(app);

const start = async () => {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(yellowBright(`ENV = '${Bun.env.NODE_ENV}'`));
    console.log(magentaBright(`Server on port ${PORT}.`));
  });
};

start();
```

### Create models
