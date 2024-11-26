import supertest from "supertest";
import { describe, it, expect, afterEach } from "vitest";
import app from '../app';
import { beforeEach } from "node:test";
import { TodoModel } from "../models";

const api = supertest(app);

beforeEach(async () => {
	await TodoModel.destroy({ where: {}, cascade: true });
})

afterEach(async () => {
  await TodoModel.destroy({ where: {} });
});

describe('Todo API', () => {
  it('todos are returned as json', async () => {
   await api
      .get('/api/todos')
      .expect(200)
      .expect('Content-Type', /application\/json/);
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

			expect(response.body.data).toHaveLength(2)
	})

	it('set todo as done', async () => {
		const todo1 = { content: 'new todo' };
		const response = await api.post('/api/todos').send(todo1).expect(201);

		const { data } = response.body;
		expect(data.done).toBe(false);

		const updated = await api.patch(`/api/todos/${data.id}`).expect(200);
		const { data: todoDone } = updated.body;
		expect(todoDone.done).toBe(true);
	})

	it('delete todo', async () => {
		const todo1 = { content: 'new todo' };
		await api.post('/api/todos').send(todo1).expect(201);

		const response = await api.get('/api/todos').expect(200);
		expect(response.body.data).toHaveLength(1);

		await api.delete(`/api/todos/${response.body.data[0].id}`).expect(200);

		const deleted = await api.get('/api/todos').expect(200);
		expect(deleted.body.data).toHaveLength(0)

	})
});

// afterEach(async () => {
// 	await sequelize.drop();
// 	await sequelize.sync({ force: true });
// })

// 	afterAll(async () => {
// 	await sequelize.close();
// });