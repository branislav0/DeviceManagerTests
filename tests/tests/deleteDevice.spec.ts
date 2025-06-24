import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CreateDevicePage } from '../pages/createDevicePage';

test.describe('Device Deletion – User Story 4', () => {
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

    test('should create two devices and delete them from list', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const device1 = await createDevicePage.createDevice1();

        await homePage.addNewDeviceButton.click();
        const device2 = await createDevicePage.createDevice2();

        await expect(page.getByText(device1)).toBeVisible();
        await expect(page.getByText(device2)).toBeVisible();

        await homePage.selectAllDevices.click();
        await homePage.deleteDeviceButton.click();

        await expect(page.getByText(device1)).not.toBeVisible();
        await expect(page.getByText(device2)).not.toBeVisible();
    });
});