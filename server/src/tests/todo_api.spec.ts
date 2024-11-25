import supertest from "supertest";
import { describe, it, expect, afterEach } from "vitest";
import app from '../app';
import { beforeEach } from "node:test";
import { TodoModel } from "../models";

const api = supertest(app);

// beforeAll(async () => {
//   // Any additional setup you need
// 	try {
//     await sequelize.authenticate();
//     console.log("Database connection established for tests.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
//   console.log('Test environment configured with mock Bun');
// });

beforeEach(async () => {
	await TodoModel.destroy({ where: {}, cascade: true });
})

afterEach(async () => {
  // Optionally, you can add additional cleanup here
  await TodoModel.destroy({ where: {} });

});

describe('Todo API', () => {
  it('todos are returned as json', async () => {
   const response = await api
      .get('/api/todos')
      .expect(200)
      .expect('Content-Type', /application\/json/);

		const { data } = response.body

		console.log('data', data)
  });

	it('a valid todo can be added', async () => {
		const newTodo = { content: 'new todo' };

		const response = await api
			.post('/api/todos')
			.send(newTodo)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const { data } = response.body;

		expect(data.content).toBe(newTodo.content);
	});

	it('check todos length', async () => {
		const todo1 = { content: 'new todo' };
		const todo2 = { content: 'new todo 2' };

		await api.post('/api/todos').send(todo1).expect(201);
		await api.post('/api/todos').send(todo2).expect(201);

		const response = await api
			.get('/api/todos')
			.expect(200)
			.expect('Content-Type', /application\/json/);
			console.log('data', response)

			expect(response.body.data).toHaveLength(2)
	})
});

// afterEach(async () => {
// 	await sequelize.drop();
// 	await sequelize.sync({ force: true });
// })

// 	afterAll(async () => {
// 	await sequelize.close();
// });