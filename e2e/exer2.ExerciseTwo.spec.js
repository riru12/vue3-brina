import { test, expect } from '@playwright/experimental-ct-vue';
import ExerciseTwo from "../src/pages/exercise2/ExerciseTwo.vue";

test("should display component with boards", async ({ mount }) => {
  // Mount the component
  const component = await mount(ExerciseTwo);
  
  // Check if the search input exists
  await expect(component.locator('input#search')).toBeVisible();
  
  // Check if the boards are rendered (we expect 2 boards based on the data)
  const boardContainer = component.locator('#board-container'); 
  const boards = boardContainer.locator(':scope > div'); // Select only direct children
  await expect(boards).toHaveCount(2);
  
  // Check board titles
  await expect(boards.nth(0).locator('h6')).toContainText('Board 1');
  await expect(boards.nth(1).locator('h6')).toContainText('Board 2');
});

test("should handle search functionality", async ({ mount }) => {
  // Mount the component
  const component = await mount(ExerciseTwo);
  
  // Type in the search box
  await component.locator('input#search').fill('Post 1');
  // Retrieve all highlighted items
  const highlightedItems = component.locator('.highlight');
  await expect(highlightedItems).toHaveCount(2);  // in our hardcoded `ExerciseTwo.vue`, we have 2 `Post 1` items
  for (let i = 0; i < await highlightedItems.count(); i++) {  // verify that each one of the retrieved items contain `Post 1`
    await expect(highlightedItems.nth(i)).toContainText('Post 1');
  }

    // Type in the search box
  await component.locator('input#search').fill('Board');
  // Retrieve all highlighted items
  const highlightedBoards = component.locator('.highlight');
  await expect(highlightedBoards).toHaveCount(2);  // in our hardcoded `ExerciseTwo.vue`, we have `Board 1` and `Board 2`
  for (let i = 0; i < await highlightedBoards.count(); i++) {  // verify that each one of the retrieved items contain `Post 1`
    await expect(highlightedBoards.nth(i)).toContainText('Board');
  }

  // Clear the search box
  await component.locator('input#search').fill('');
  const remainingHighlights = component.locator('.highlight');
  await expect(remainingHighlights).toHaveCount(0); // now, there should be no matches
});

test("should handle board color change", async ({ mount }) => {
  // Mount the component
  const component = await mount(ExerciseTwo);
  
  // Get the first board
  const boards = component.locator('#board-container > div');
  const firstBoard = boards.nth(0);
  
  const boardTitle = firstBoard.locator('h6.board-title');
  const boardElement = firstBoard.locator('.board');

  await expect(boardTitle).toHaveCSS('color', 'rgb(0, 0, 0)');  // check default color
  
  // Select color (red)
  const colorSelect = firstBoard.locator('select.board-color');
  await colorSelect.selectOption({ value: '#ff8585' });
  await expect(boardTitle).toHaveCSS('color', 'rgb(255, 133, 133)');
  await expect(boardElement).toHaveCSS('border-color', 'rgb(255, 133, 133)');
  
  // Select another color (blue)
  await colorSelect.selectOption({ value: '#7a97ff' });
  await expect(boardTitle).toHaveCSS('color', 'rgb(122, 151, 255)');
  await expect(boardElement).toHaveCSS('border-color', 'rgb(122, 151, 255)');
});