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

		console.log('00000000000000000')
		console.log('data', data)
		console.log('00000000000000000')
  });
});