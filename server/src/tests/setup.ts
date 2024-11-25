
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

beforeAll(async () => {
  // Any additional setup you need
	// try {
  //   await sequelize.authenticate();
  //   console.log("Database connection established for tests.");
  // } catch (error) {
  //   console.error("Unable to connect to the database:", error);
  // }
  console.log('Test environment configured with mock Bun');
});

// afterEach(async () => {
// 	await sequelize.models.Todo.destroy({ where: {}, cascade: true });
// })

// afterAll(async () => {
// 	await sequelize.close();
// });