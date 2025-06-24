import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CreateDevicePage } from '../pages/createDevicePage';

test.describe('Device Creation – User Story 2', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let createDevicePage: CreateDevicePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        createDevicePage = new CreateDevicePage(page);
        await loginPage.gotoLoginPage();
        await loginPage.loginCorrectCredentials();
    });

    test('should create device, display it in list, then remove it', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const deviceName = await createDevicePage.createDevice1();

        await expect(page.getByText(deviceName)).toBeVisible();

        await page.getByRole('row', { name: deviceName }).locator('span').nth(2).click();
        await homePage.deleteDeviceButton.click();
    });

    test('should keep Save button visible when required fields are empty', async ({ page }) => {
        let apiRequestMade = false;

        page.on('request', request => {
            if (request.method() === 'POST' && request.url().includes('/devices')) {
                apiRequestMade = true;
            }
        });

        await homePage.addNewDeviceButton.click();
        await createDevicePage.saveDeviceButton.click();

        await expect(createDevicePage.nameInput).toHaveValue('');
        await expect(createDevicePage.osTypeInput).toHaveValue('');
        await expect(createDevicePage.countryCodeInput).toHaveValue('');
        await expect(createDevicePage.saveDeviceButton).toBeVisible();

        expect(apiRequestMade).toBeFalsy();
    });
});
