const { test, expect } = require('@playwright/test');

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});
test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const loginButton = await page.$('a[href="/login"]');
    const isLoginVisible = await loginButton.isVisible();
    expect(isLoginVisible).toBe(true);
});
test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isRegisterVisible = await registerButton.isVisible();
    expect(isRegisterVisible).toBe(true);
});

const { test, expect } = require('@playwright/test');

test.describe('Library Catalogue UI Tests', () => {

  test('Verify Book Details Page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=A Court of Thorns and Roses');
    await expect(page).toHaveText('h1', 'A Court of Thorns and Roses');
    await expect(page).toHaveSelector('button:has-text("Edit")');
    await expect(page).toHaveSelector('button:has-text("Delete")');
  });

  test('Verify Add Book Functionality', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=Add Book');
    await page.fill('#title', 'New Book');
    await page.fill('#description', 'A description for the new book');
    await page.fill('#imageUrl', '/images/newbook.png');
    await page.fill('#type', 'Fiction');
    await page.click('text=Submit');
    await expect(page).toHaveText('text=New Book');
  });

  test('Verify Edit Book Functionality', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=A Court of Thorns and Roses');
    await page.click('text=Edit');
    await page.fill('#title', 'Updated Title');
    await page.click('text=Submit');
    await expect(page).toHaveText('h1', 'Updated Title');
  });

  test('Verify Delete Book Functionality', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('text=A Court of Thorns and Roses');
    await page.click('text=Delete');
    await page.click('text=Confirm');
    await expect(page).not.toHaveText('text=A Court of Thorns and Roses');
  });

  test('Verify User Login and Logout', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'peter@abv.bg');
    await page.fill('#password', 'password123');
    await page.click('text=Login');
    await expect(page).toHaveText('text=Welcome, Peter');
    await page.click('text=Logout');
    await expect(page).toHaveText('text=Login');
  });

  test('Verify Registration Functionality', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('#email', 'newuser@abv.bg');
    await page.fill('#password', 'newpassword123');
    await page.click('text=Register');
    await expect(page).toHaveText('text=Login');
  });
});
