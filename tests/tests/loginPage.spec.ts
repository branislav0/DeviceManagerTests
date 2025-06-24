import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';

test.describe('Login and Logout functionality – Story 1', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await page.goto('https://homework-fe.fly.dev/');
    });

    test('should login with valid admin credentials', async ({ page }) => {
        await loginPage.loginCorrectCredentials();
        await expect(page).toHaveURL('https://homework-fe.fly.dev/devices');
    });

    test('should NOT login without entering credentials', async ({ page }) => {
        await loginPage.loginButton.click();
        await expect(page).toHaveURL('https://homework-fe.fly.dev');
    });

    test('should NOT login with invalid credentials', async ({ page }) => {
        await loginPage.usernameInput.fill('wrongUser');
        await loginPage.passwordInput.fill('wrongPass');
        await loginPage.loginButton.click();
        await expect(page).toHaveURL('https://homework-fe.fly.dev');
    });

    test('should block access to /devices after logout and reload (404 shown)', async ({ page }) => {
        await loginPage.loginCorrectCredentials();
        await expect(page).toHaveURL('https://homework-fe.fly.dev/devices');
        await page.context().storageState({ path: 'auth/state.json' });
        await homePage.logoutButton.click();
        await page.reload();
        await expect(page.locator('text=404 page not found')).toBeVisible();
    });
});
