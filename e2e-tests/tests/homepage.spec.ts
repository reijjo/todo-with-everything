import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");

	console.log('Current URL!!!:', page.url());

	// const pageContent = await page.content();
  // console.log('Full Page Content:', pageContent);
});

test.describe("Homepage", () => {
  test("should display the homepage", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toHaveText(/to-do list/i);
  });


	test('adds new todo to list', async ({ page }) => {
		const newTodo = page.getByPlaceholder(/what to do/i);
		const addButton = page.getByRole('button', { name: 'Add' });
		const todoList = page.getByTestId('todo-list');

		await newTodo.fill('playwright here');
		await addButton.click();

		await expect(todoList).toContainText('playwright here');
		await expect(newTodo).toHaveValue('');
	});
});