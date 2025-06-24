import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { CreateDevicePage } from '../pages/createDevicePage';

test.describe('Device Creation – User Story 4', () => {
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

    test('should create device and delete it in device list', async ({ page }) => {
        await homePage.addNewDeviceButton.click();
        const deviceName1 = await createDevicePage.createDevice1();
        await homePage.addNewDeviceButton.click();
        const deviceName2 = await createDevicePage.createDevice2();

        await expect(page.getByText(deviceName1)).toBeVisible();
        await expect(page.getByText(deviceName2)).toBeVisible();

        await homePage.selectAllDevices.click();
        await homePage.deleteDeviceButton.click();
        await page.waitForTimeout(1000);
        await expect(page.getByText(deviceName1)).not.toBeVisible();
        await expect(page.getByText(deviceName2)).not.toBeVisible();
    });

});
