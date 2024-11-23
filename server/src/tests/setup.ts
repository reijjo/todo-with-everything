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