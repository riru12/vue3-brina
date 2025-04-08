
import { test, expect } from '@playwright/experimental-ct-vue';
import ExerciseThree from "../src/pages/exercise3/ExerciseThree.vue";

test("should be able to add new boards", async ({ mount }) => {
    // Mount the component
    const component = await mount(ExerciseThree);

    // Check if the new table input exists
    await expect(component.locator('input[name="newBoardTitle"]')).toBeVisible();

    // Check that a new board gets created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    await expect(component.locator('.board-container')).toBeVisible();
    const boardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(boardTitle.trim()).toBe('New Board');

    // Check that a new board with the same name is not allowed to be created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    // Check that a new board with the same name is not allowed to be created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    // Verify that only one board with that name exists
    const boardCount = await component.locator('.board-container').count();
    expect(boardCount).toBe(1);

    // Check for error message
    await expect(component.locator('.error-message')).toBeVisible();

    // Create a board with a different name to verify the validation is specific to duplicate names
    await component.locator('input[name="newBoardTitle"]').fill('Different Board');
    await component.locator('button.add-button').click();

    // Verify that now we have two boards
    const updatedBoardCount = await component.locator('.board-container').count();
    expect(updatedBoardCount).toBe(2);

    // Check that both boards exist with correct titles
    const firstBoardTitle = await component.locator('.board-container').nth(0).locator('h6').textContent();
    const secondBoardTitle = await component.locator('.board-container').nth(1).locator('h6').textContent();

    expect(firstBoardTitle.trim()).toBe('New Board');
    expect(secondBoardTitle.trim()).toBe('Different Board');
});

test("should be able to add new items to boards", async ({ mount }) => {
    // Mount the component
    const component = await mount(ExerciseThree);

    // Check if the new table input exists
    await expect(component.locator('input[name="newBoardTitle"]')).toBeVisible();

    // Check that a new board gets created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    await expect(component.locator('.board-container')).toBeVisible();
    const boardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(boardTitle.trim()).toBe('New Board');

    // Check for creation of new item
    await component.locator('input[name="newItemTitle"]').fill('New Item');
    await component.locator('input[placeholder="User"]').fill('New User');
    await component.locator('button.add-item-button').click();

    const itemCount = await component.locator('.board-item').count();
    expect(itemCount).toBe(1);

    // Check for duplicate title validation blocking crreation
    await component.locator('input[name="newItemTitle"]').fill('New Item');
    await component.locator('input[placeholder="User"]').fill('New User');
    await component.locator('button.add-item-button').click();

    const updatedItemCount = await component.locator('.board-item').count();
    expect(updatedItemCount).toBe(1);
    await expect(component.locator('.error-message')).toBeVisible();

    // Check for mandatory title
    await component.locator('input[name="newItemTitle"]').fill('');
    await component.locator('input[placeholder="User"]').fill('New User');
    await component.locator('button.add-item-button').click();
    await expect(component.locator('.error-message')).toBeVisible();
});

test("should be able to edit existing boards' titles", async ({ mount }) => {
    // Mount the component
    const component = await mount(ExerciseThree);

    // Check if the new table input exists
    await expect(component.locator('input[name="newBoardTitle"]')).toBeVisible();

    // Check that a new board gets created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    await expect(component.locator('.board-container')).toBeVisible();
    const boardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(boardTitle.trim()).toBe('New Board');

    // Edit the title
    await component.locator('.board-container').first().locator('h6').click();
    const input = component.locator('.board-container').first().locator('h6').locator('input');
    await input.fill('New Title');
    await input.press('Enter');

    const newBoardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(newBoardTitle.trim()).toBe('New Title');
});

test("should be able to edit existing items' titles", async ({ mount }) => {
    // Mount the component
    const component = await mount(ExerciseThree);

    // Check if the new table input exists
    await expect(component.locator('input[name="newBoardTitle"]')).toBeVisible();

    // Check that a new board gets created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    await expect(component.locator('.board-container')).toBeVisible();
    const boardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(boardTitle.trim()).toBe('New Board');

    // Check for creation of new item
    await component.locator('input[name="newItemTitle"]').fill('New Item');
    await component.locator('input[placeholder="User"]').fill('New User');
    await component.locator('button.add-item-button').click();

    const itemCount = await component.locator('.board-item').count();
    expect(itemCount).toBe(1);

    // Check for updating of Item Title and User Name
    await component.locator('.maintenance-button', { hasText: 'Edit' }).click();
    await component.locator('.board-item').locator('.board-subgroup').locator('input').first().fill('New Item Title');
    await component.locator('.board-item').locator('.board-subgroup').locator('input').nth(1).fill('New User Name');
    await component.locator('.maintenance-button', { hasText: 'Save' }).click();

    const newItemTitle = await component.locator('.board-item').locator('.board-subgroup').locator('span').first().textContent();
    const newUserName = await component.locator('.board-item').locator('.board-subgroup').locator('span').nth(1).textContent();
    expect(newItemTitle.trim()).toBe('New Item Title');
    expect(newUserName.trim()).toBe('New User Name');
});

test("should be able to delete boards", async ({ mount }) => {
    // Mount the component
    const component = await mount(ExerciseThree);

    // Check if the new table input exists
    await expect(component.locator('input[name="newBoardTitle"]')).toBeVisible();

    // Check that a new board gets created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    await expect(component.locator('.board-container')).toBeVisible();
    const boardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(boardTitle.trim()).toBe('New Board');

    await component.locator('.del-button').click();

    // Verify that the board got deleted
    const boardCount = await component.locator('.board-container').count();
    expect(boardCount).toBe(0);
});

test("should be able to delete items in boards", async ({ mount }) => {
    // Mount the component
    const component = await mount(ExerciseThree);

    // Check if the new table input exists
    await expect(component.locator('input[name="newBoardTitle"]')).toBeVisible();

    // Check that a new board gets created
    await component.locator('input[name="newBoardTitle"]').fill('New Board');
    await component.locator('button.add-button').click();

    await expect(component.locator('.board-container')).toBeVisible();
    const boardTitle = await component.locator('.board-container').first().locator('h6').textContent();
    expect(boardTitle.trim()).toBe('New Board');

    // Check for creation of new item
    await component.locator('input[name="newItemTitle"]').fill('New Item');
    await component.locator('input[placeholder="User"]').fill('New User');
    await component.locator('button.add-item-button').click();

    let itemCount = await component.locator('.board-item').count();
    expect(itemCount).toBe(1);

    await component.locator('.maintenance-button', { hasText: 'Delete' }).click();

    itemCount = await component.locator('.board-item').count();
    expect(itemCount).toBe(0);

});
